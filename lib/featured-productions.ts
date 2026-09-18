import { REAL_PRODUCTIONS, type RealTrack } from './music-manifest';

/** Homepage featured drop + /music featured cards. QUANTUM leads; Fracture stays featured. */
export const FEATURED_REAL_PRODUCTION_IDS = [
  'quantum-arc-rust-vein',
  'fracture-dispatch-001',
] as const;

/**
 * Creative SoT REAL VIDEO lane: Fracture + Ethereal, both with in-repo mp4s.
 * Ethereal is already in REAL_PRODUCTIONS; it was previously excluded from the
 * above-fold featured list, so getArcKey() dumped it into "Other transmissions"
 * because it has no *-arc tag (only a genre tag `ambient`).
 */
export const REAL_VIDEO_PRODUCTION_IDS = [
  'fracture-dispatch-001',
  'ethereal-dispatch',
] as const;

export const OLDER_ARC_ORDER = [
  'canopy-arc',
  'threshold-arc',
  'transmission-arc',
  'resonance-arc',
  'genesis-arc',
  'source-arc',
  'broadcast-arc',
  'constellation-arc',
  'inner-circle-arc',
  'horizon-arc',
] as const;

const QUANTUM_ID = 'quantum-arc-rust-vein';

function uniqueIds(ids: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const id of ids) {
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

export function isFeaturedRealProduction(id: string): boolean {
  return (FEATURED_REAL_PRODUCTION_IDS as readonly string[]).includes(id);
}

export function isRealVideoProduction(id: string): boolean {
  return (REAL_VIDEO_PRODUCTION_IDS as readonly string[]).includes(id);
}

/** QUANTUM + Fracture + Ethereal: REAL PRODUCTIONS above the fold, not Older arcs. */
export function isAboveFoldRealProduction(id: string): boolean {
  return isFeaturedRealProduction(id) || isRealVideoProduction(id);
}

export function getAboveFoldRealProductionIds(): string[] {
  return uniqueIds([...FEATURED_REAL_PRODUCTION_IDS, ...REAL_VIDEO_PRODUCTION_IDS]);
}

export function getFeaturedRealProductions(): RealTrack[] {
  return FEATURED_REAL_PRODUCTION_IDS
    .map((id) => REAL_PRODUCTIONS.find((track) => track.id === id))
    .filter((track): track is RealTrack => Boolean(track));
}

export function getAboveFoldRealProductions(): RealTrack[] {
  return getAboveFoldRealProductionIds()
    .map((id) => REAL_PRODUCTIONS.find((track) => track.id === id))
    .filter((track): track is RealTrack => Boolean(track));
}

/**
 * QUANTUM must never receive a music-video URL until a real public YouTube
 * (or hosted) URL exists. Do not invent one.
 */
export function resolveFeaturedVideoSrc(track: Pick<RealTrack, 'id' | 'videoSrc'>): string | undefined {
  if (track.id === QUANTUM_ID) return undefined;
  return track.videoSrc;
}

export function resolveSideVideoSrc(track: Pick<RealTrack, 'id' | 'runpodJobs'>): string | undefined {
  if (track.id === QUANTUM_ID) return undefined;
  return track.runpodJobs?.sideVideo;
}

export function nativeVideoElementId(trackId: string, angle: 'front' | 'side' = 'front'): string {
  return `production-video-${trackId}-${angle}`;
}

export function getArcKey(track: RealTrack): string {
  if (track.id === 'ethereal-dispatch') return 'ethereal';
  const arcTag = track.tags.find((tag) => tag.endsWith('-arc'));
  if (arcTag) return arcTag;
  if (track.tags.includes('dispatch-001') || track.id.includes('fracture')) return 'fracture';
  if (track.tags.includes('quantum-arc')) return 'quantum-arc';
  return 'other';
}

export function formatArcLabel(arc: string): string {
  if (arc === 'other') return 'Other transmissions';
  if (arc === 'fracture') return 'Fracture';
  if (arc === 'ethereal') return 'Ethereal';
  return arc
    .split('-')
    .filter((part) => part !== 'arc')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function groupTracksByArc(tracks: RealTrack[]): Array<{ key: string; label: string; tracks: RealTrack[] }> {
  const groups = new Map<string, RealTrack[]>();
  for (const track of tracks) {
    const key = getArcKey(track);
    const existing = groups.get(key);
    if (existing) existing.push(track);
    else groups.set(key, [track]);
  }

  const preferred = OLDER_ARC_ORDER.filter((key) => groups.has(key));
  const remaining = [...groups.keys()]
    .filter((key) => !preferred.includes(key as (typeof OLDER_ARC_ORDER)[number]))
    .sort();

  return [...preferred, ...remaining].map((key) => ({
    key,
    label: formatArcLabel(key),
    tracks: groups.get(key) ?? [],
  }));
}
