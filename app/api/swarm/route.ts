import { redis } from '@/lib/acmi';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const AGENTS = [
  'agent:claude-engineer',
  'agent:bentley',
  'agent:gemini-cli',
  'agent:antigravity',
  'agent:perplexity',
  'agent:folana',
];

export async function GET() {
  try {
    const data = await Promise.all(
      AGENTS.map(async (id) => {
        const [profileRaw, signalsRaw, timelineRaw] = await Promise.all([
          redis("GET", `acmi:${id}:profile`),
          redis("GET", `acmi:${id}:signals`),
          redis("ZRANGE", `acmi:${id}:timeline`, "0", "0", "REV"),
        ]);

        const profile = profileRaw ? JSON.parse(profileRaw) : null;
        const signals = signalsRaw ? JSON.parse(signalsRaw) : {};
        const timeline = (timelineRaw || []).map((raw: string) => JSON.parse(raw));
        const lastTs = timeline[0]?.ts || null;

        let status: 'active' | 'degraded' | 'offline' | 'stale' | 'unknown' = 'unknown';
        if (signals?.status === 'degraded-mode' || signals?.status === 'degraded') status = 'degraded';
        else if (signals?.status === 'offline') status = 'offline';
        else if (lastTs) {
          const age = Date.now() - lastTs;
          if (age < 30 * 60 * 1000) status = 'active'; // 30m
          else if (age < 6 * 60 * 60 * 1000) status = 'stale'; // 6h
          else status = 'offline';
        }

        return {
          id,
          name: profile?.name || id.replace('agent:', ''),
          status,
          lastTs
        };
      })
    );

    return Response.json({ agents: data });
  } catch (err) {
    console.error('Swarm API error:', err);
    return Response.json({ error: 'Failed to fetch swarm status' }, { status: 500 });
  }
}
