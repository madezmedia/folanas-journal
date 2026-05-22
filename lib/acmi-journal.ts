export interface AcmiJournalEntry {
  ts: number;
  source: string;
  kind: "journal_entry";
  correlationId: string;
  summary: string;
  payload: {
    entryId: string;
    type: "Thought" | "Entry" | "Dream" | "Confession";
    contentMarkdown: string;
    tags: string[];
    linkedEpisodeIds?: string[];
    image_url?: string;
    media_urls?: string[];
  };
}

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command: string, ...args: any[]) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    throw new Error("Missing Upstash Redis environment variables");
  }
  const endpoint = `${REDIS_URL.replace(/\/$/, '')}/`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${REDIS_TOKEN}`, 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify([command, ...args])
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

export async function getAcmiJournalEntries(): Promise<AcmiJournalEntry[]> {
  try {
    const rawEntries: string[] = await redis('ZREVRANGE', 'acmi:character:folana:v1:corpus:journal', 0, -1);
    return rawEntries.map(e => JSON.parse(e));
  } catch (error) {
    console.error("[acmi-journal] Failed to fetch entries from ACMI:", error);
    return [];
  }
}

export async function getAcmiJournalEntry(entryId: string): Promise<AcmiJournalEntry | null> {
  try {
    const entries = await getAcmiJournalEntries();
    return entries.find(e => e.payload.entryId === entryId) || null;
  } catch (error) {
    return null;
  }
}
