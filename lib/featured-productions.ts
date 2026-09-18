import { REAL_PRODUCTIONS, type RealTrack } from './music-manifest';

export const FEATURED_REAL_PRODUCTION_IDS = [
  'quantum-arc-rust-vein',
  'fracture-dispatch-001',
  'ethereal-dispatch',
] as const;

/** SITE-REFRESH-PLAN-v1.md — verified files under public/. QUANTUM must not appear here. */
export const REAL_VIDEO_INVENTORY = {
  'fracture-dispatch-001': '/folana/generated/2026-05-27/fracture_dispatch_001_music_video.mp4',
  'ethereal-dispatch': '/folana/generated/2026-05-27/videos/ethereal-dispatch-fal-front.mp4',
} as const;

export const ETHEREAL_SIDE_VIDEO = '/folana/generated/2026-05-27/videos/ethereal-dispatch-fal-side.mp4';

export function resolveFeaturedVideoSrc(track: { id: string; videoSrc?: string }): string | undefined {
  if (track.id === 'quantum-arc-rust-vein') return undefined;
  if (track.id === 'fracture-dispatch-001') return REAL_VIDEO_INVENTORY['fracture-dispatch-001'];
  if (track.id === 'ethereal-dispatch') return REAL_VIDEO_INVENTORY['ethereal-dispatch'];
  return track.videoSrc;
}

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

export function isFeaturedRealProduction(id: string): boolean {
  return (FEATURED_REAL_PRODUCTION_IDS as readonly string[]).includes(id);
}

export function getFeaturedRealProductions(): RealTrack[] {
  return FEATURED_REAL_PRODUCTION_IDS
    .map((id) => REAL_PRODUCTIONS.find((track) => track.id === id))
    .filter((track): track is RealTrack => Boolean(track));
}

export function getArcKey(track: RealTrack): string {
  const arcTag = track.tags.find((tag) => tag.endsWith('-arc'));
  if (arcTag) return arcTag;
  if (track.tags.includes('dispatch-001') || track.id.includes('fracture')) return 'fracture';
  if (track.tags.includes('quantum-arc')) return 'quantum-arc';
  return 'other';
}

export function formatArcLabel(arc: string): string {
  if (arc === 'other') return 'Other transmissions';
  if (arc === 'fracture') return 'Fracture';
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
