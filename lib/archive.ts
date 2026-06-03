import { REAL_PRODUCTIONS, VISUAL_PROTOTYPES, type RealTrack, type PrototypeTrack } from './music-manifest';
import { SIGILS, type Sigil } from './sigils';

export type ArchiveItemType = 'music-audio' | 'music-video' | 'visual-codex' | 'prototype';

export interface ArchiveItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: ArchiveItemType;
  src?: string;
  posterSrc?: string;
  audioSrc?: string;
  videoSrc?: string;
  date: string;
  mood: string;
  tags: string[];
  journalRef?: string;
  duration?: string;
  category?: string;
  relatedTrackIds: string[];
  relatedSigilIds: number[];
  hasAudio: boolean;
  needsVideo: boolean;
}

function normalizeDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  const months: Record<string, string> = {
    jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
    jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
  };
  const match = dateStr.toLowerCase().match(/^([a-z]+)\s+(\d+)\s+(\d+)$/);
  if (match) {
    const m = months[match[1]] || '01';
    const d = match[2].padStart(2, '0');
    const y = match[3];
    return `${y}-${m}-${d}`;
  }
  return dateStr;
}

function computeRelatedTrackIds(sigil: Sigil, tracks: RealTrack[]): string[] {
  const matched = new Set<string>();
  for (const tag of sigil.tags) {
    const lower = tag.toLowerCase();
    for (const track of tracks) {
      if (track.tags.some(t => t.toLowerCase().includes(lower) || lower.includes(t.toLowerCase()))) {
        matched.add(track.id);
      }
    }
  }
  if (sigil.journalRef) {
    for (const track of tracks) {
      if (track.journalEntry === sigil.journalRef || track.tags.some(t => t.includes(sigil.journalRef!))) {
        matched.add(track.id);
      }
    }
  }
  return Array.from(matched);
}

function computeRelatedSigilIds(track: RealTrack | PrototypeTrack, sigils: Sigil[]): number[] {
  const matched = new Set<number>();
  const searchTags = track.tags.map(t => t.toLowerCase());
  for (const sigil of sigils) {
    for (const tag of sigil.tags) {
      const lower = tag.toLowerCase();
      if (searchTags.some(st => st.includes(lower) || lower.includes(st))) {
        matched.add(sigil.id);
        break;
      }
    }
    if (track.tags.some(t => t.toLowerCase().includes(sigil.title.toLowerCase().slice(0, 6)))) {
      matched.add(sigil.id);
    }
  }
  return Array.from(matched);
}

function sigilToArchiveItem(sigil: Sigil, allTracks: RealTrack[]): ArchiveItem {
  return {
    id: `sigil-${sigil.id}`,
    title: sigil.title,
    subtitle: sigil.category,
    description: sigil.caption,
    type: sigil.src.endsWith('.mp4') ? 'music-video' : 'visual-codex',
    src: sigil.src,
    date: normalizeDate(sigil.date),
    mood: sigil.category,
    tags: sigil.tags,
    journalRef: sigil.journalRef,
    category: sigil.category,
    relatedTrackIds: computeRelatedTrackIds(sigil, allTracks),
    relatedSigilIds: [sigil.id],
    hasAudio: false,
    needsVideo: false,
  };
}

function trackToArchiveItem(track: RealTrack, allSigils: Sigil[]): ArchiveItem {
  const hasVideo = !!track.videoSrc;
  const hasAudio = !!track.audioSrc && !track.audioSrc.includes('removed');
  return {
    id: track.id,
    title: track.title,
    subtitle: track.subtitle,
    description: track.description,
    type: hasVideo ? 'music-video' : hasAudio ? 'music-audio' : 'prototype',
    src: track.posterSrc,
    posterSrc: track.posterSrc,
    audioSrc: track.audioSrc,
    videoSrc: track.videoSrc,
    date: extractDateFromTrack(track),
    mood: track.mood,
    tags: track.tags,
    journalRef: track.journalEntry,
    duration: track.duration,
    relatedTrackIds: [track.id],
    relatedSigilIds: computeRelatedSigilIds(track, allSigils),
    hasAudio,
    needsVideo: hasAudio && !hasVideo,
  };
}

function extractDateFromTrack(track: RealTrack): string {
  for (const tag of track.tags) {
    const match = tag.match(/^(\d{4}-\d{2}-\d{2})$/);
    if (match) return match[1];
  }
  return '2026-05-27';
}

export function buildUnifiedArchive(): ArchiveItem[] {
  const tracks = REAL_PRODUCTIONS;
  const sigils = SIGILS;
  const items: ArchiveItem[] = [];

  for (const sigil of sigils) {
    items.push(sigilToArchiveItem(sigil, tracks));
  }

  for (const track of tracks) {
    items.push(trackToArchiveItem(track, sigils));
  }

  return items.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function getArchiveByType(type: ArchiveItemType): ArchiveItem[] {
  return buildUnifiedArchive().filter(i => i.type === type);
}

export function getRelatedItems(item: ArchiveItem): ArchiveItem[] {
  const all = buildUnifiedArchive();
  const relatedIds = new Set([
    ...item.relatedTrackIds.map(id => id),
    ...item.relatedSigilIds.map(id => `sigil-${id}`),
  ]);
  return all.filter(i => i.id !== item.id && relatedIds.has(i.id));
}

export function searchArchive(query: string): ArchiveItem[] {
  const q = query.toLowerCase();
  return buildUnifiedArchive().filter(i =>
    i.title.toLowerCase().includes(q) ||
    i.description.toLowerCase().includes(q) ||
    i.tags.some(t => t.toLowerCase().includes(q)) ||
    i.mood.toLowerCase().includes(q)
  );
}

export function getArchiveArcs(): string[] {
  const arcs = new Set<string>();
  for (const item of buildUnifiedArchive()) {
    for (const tag of item.tags) {
      if (tag.includes('-arc') || tag.includes('arc-')) arcs.add(tag);
    }
    if (item.category) arcs.add(item.category);
  }
  return Array.from(arcs).sort();
}

export function filterByArc(arc: string): ArchiveItem[] {
  const q = arc.toLowerCase();
  return buildUnifiedArchive().filter(i =>
    i.tags.some(t => t.toLowerCase().includes(q)) ||
    (i.category && i.category.toLowerCase().includes(q))
  );
}
