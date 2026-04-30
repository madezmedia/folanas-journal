
export interface ACMIEvent {
  ts: number;
  source: string;
  kind: string;
  summary: string;
  payload?: any;
}

export async function redis(command: string, ...args: string[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Missing Upstash Redis credentials");
  }

  const response = await fetch(`${url.replace(/\/$/, "")}/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([command, ...args]),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`Redis error: ${data.error}`);
  }
  return data.result;
}

export async function getAgentTimeline(agentId: string, limit = 50): Promise<ACMIEvent[]> {
  const events = await redis("ZRANGE", `acmi:agent:${agentId}:timeline`, "0", String(limit - 1), "REV");
  return (events || []).map((raw: string) => JSON.parse(raw));
}

export async function getLatestThought(): Promise<string | null> {
  const events = await getAgentTimeline("fanvue_orchestrator", 20);
  const thoughtEvent = events.find(e => e.summary.includes("Thought of the Day") || (e.payload && e.payload.thought));
  return thoughtEvent?.payload?.thought || thoughtEvent?.summary || null;
}
