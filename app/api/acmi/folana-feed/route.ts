import { NextResponse } from 'next/server';
import { redis } from '@/lib/acmi';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

const FOLANA_SOURCES = new Set([
  'folana',
  'agent:folana',
  'folana-artist-factory',
]);

const FOLANA_KEYWORDS = [
  'episode', 'ep', 'generation', 'content',
  'cron', 'cycle', 'published', 'publish',
  'deployed', 'journal entry', 'inner circle',
  'artist-factory', 'wake', 'daily transmission',
  'song', 'lyric', 'sonic', 'visual',
  'sigil', 'forge', 'harness', 'broadcast',
  'resonance', 'frequency', 'signal',
  'transmission', 'thought of the day',
  'folana', 'synth', 'music video',
  'generated', 'asset', 'hero',
  'broll', 'runpod', 'infinitalk',
];

const EXCLUDE_KEYWORDS = [
  'session-rollup', 'aggregated', 'fleet-handoff',
  'gpu', 'mi300x', 'PR #', 'pull request',
  'hackathon', 'bentley deliverables',
  'credits exhausted', 'opencode execute',
  '@bentley @bentley-temp @gemini-cli',  // mass @mention rollups
  '@bentley @bentley-temp @claude-web',   // mass @mention rollups
  '@bentley-temp @claude-web @antigravity', // mass @mention rollups
  'comprehensive UX', 'PLAN: surface',
];

function isFolanaEvent(event: { source?: string; kind?: string; summary?: string }): boolean {
  const source = (event.source || '').toLowerCase();
  const summary = (event.summary || '').toLowerCase();
  const kind = (event.kind || '').toLowerCase();

  // Direct Folana sources
  if (FOLANA_SOURCES.has(source)) return true;

  // Events directly for Folana
  if (kind === 'task-push' && summary.includes('folana')) return true;
  if (source === 'agent:grok' && summary.includes('folana') && (
    summary.includes('episode') || summary.includes('wake') ||
    summary.includes('content') || summary.includes('generat')
  )) return true;

  // Bentley wake cycles for Folana
  if (source === 'bentley' && summary.includes('folana') && (
    summary.includes('wake') || summary.includes('episode') ||
    summary.includes('published') || summary.includes('deployed')
  )) return true;

  // Event is about a Folana activity
  if (FOLANA_KEYWORDS.some(kw => summary.includes(kw))) return true;

  return false;
}

function isExcluded(event: { summary?: string; kind?: string }): boolean {
  const summary = (event.summary || '').toLowerCase();
  const kind = (event.kind || '').toLowerCase();

  if (EXCLUDE_KEYWORDS.some(kw => summary.includes(kw))) return true;
  if (kind === 'session-rollup' || kind === 'team-aggregation' || kind === 'fleet-sync') return true;

  return false;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const fetchSize = Math.min(limit * 3, 100); // Fetch more to allow for filtering

    // Fetch from Folana's agent timeline
    const agentEvents = await redis('ZRANGE', 'acmi:agent:folana:timeline', '0', String(fetchSize - 1), 'REV');

    // Also fetch from the artist-factory thread (visual generation events)
    let threadEvents: string[] = [];
    try {
      threadEvents = await redis('ZRANGE', 'acmi:thread:folana-artist-factory:timeline', '0', String(fetchSize - 1), 'REV') || [];
    } catch {
      // Thread might not exist yet
    }

    // Merge and parse
    const merged: any[] = [];
    const seen = new Set<string>();

    const dedupAndAdd = (raw: string) => {
      try {
        const parsed = JSON.parse(raw);
        // Dedup by ts + summary
        const key = `${parsed.ts}-${(parsed.summary || '').slice(0, 60)}`;
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(parsed);
        }
      } catch {}
    };

    (agentEvents || []).forEach(dedupAndAdd);
    (threadEvents || []).forEach(dedupAndAdd);

    // Sort by ts descending (most recent first)
    merged.sort((a, b) => b.ts - a.ts);

    // Filter for Folana-relevant events
    const filtered = merged.filter(e => isFolanaEvent(e) && !isExcluded(e));

    return NextResponse.json({
      events: filtered.slice(0, limit),
      source: 'folana',
      count: filtered.slice(0, limit).length,
      totalAvailable: filtered.length,
      fetchedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('[acmi-folana-feed] Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch Folana ACMI feed', detail: err.message },
      { status: 500 }
    );
  }
}
