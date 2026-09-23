'use client'

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { FeaturedDropMedia, PrimaryProductionMedia, ProductionBadge } from '../components/FeaturedDropMedia';
import { WatchNativeVideoButton } from '../components/WatchNativeVideoButton';
import { REAL_PRODUCTIONS, type RealTrack } from '../../lib/music-manifest';
import {
  formatArcLabel,
  getArcKey,
  groupTracksByArc,
  isAboveFoldRealProduction,
  isFeaturedRealProduction,
  resolveFeaturedVideoSrc,
} from '../../lib/featured-productions';

function extractUniqueArcs(): string[] {
  const arcs = new Set<string>();
  for (const track of REAL_PRODUCTIONS) {
    arcs.add(getArcKey(track));
  }
  return Array.from(arcs).sort();
}

function extractUniqueMoods(): string[] {
  const moods = new Set<string>();
  REAL_PRODUCTIONS.forEach(t => { if (t.mood) moods.add(t.mood); });
  return Array.from(moods).sort();
}

function RealProductionCard({
  track,
  featured = false,
}: {
  track: RealTrack;
  featured?: boolean;
}) {
  const gospel = Boolean(track.heroSrc);
  return (
    <div id={track.id} className={`flex h-full flex-col overflow-hidden rounded-2xl border ${gospel ? 'border-[#6b4423]/80 bg-[#14110e]' : `holo-frame ${featured ? 'border-folana-neon-pink/30' : 'border-white/15'}`}`}>
      <PrimaryProductionMedia track={track} />
      <div className={`flex flex-1 flex-col p-4 ${gospel ? 'bg-[#1c2a44]/55' : 'bg-folana-surface/60'}`}>
        <div className={`mb-1 font-mono text-[10px] tracking-[3px] ${gospel ? 'text-[#f4efe4]' : 'text-folana-neon-cyan'}`}>
          {featured ? 'FEATURED • REAL PRODUCTION' : 'REAL PRODUCTION'}
        </div>
        <div className="font-serif text-xl leading-tight tracking-tight text-folana-ink">{track.title}</div>
        <div className="mt-1 line-clamp-2 font-mono text-[10px] tracking-[1.5px] text-folana-text-muted">{track.subtitle}</div>
        <div className="mt-3">
          <FeaturedDropMedia track={track} compact />
        </div>
        {resolveFeaturedVideoSrc(track) && (
          <div className="mt-3">
            <WatchNativeVideoButton
              trackId={track.id}
              className={gospel ? 'inline-flex min-h-11 items-center gap-2 font-mono text-xs tracking-[2px] text-[#f4efe4] transition-colors hover:text-[#e7c6d4]' : undefined}
            />
          </div>
        )}
        {track.falAutonomousBroll && track.falAutonomousBroll.length > 0 && (
          <details className="mt-3 border-t border-white/10 pt-3">
            <summary className="cursor-pointer font-mono text-[10px] tracking-[2px] text-folana-neon-pink">
              FAL B-ROLL GALLERY
            </summary>
            <div className="mt-3 grid grid-cols-4 gap-1">
              {track.falAutonomousBroll.slice(0, 8).map((src, i) => (
                <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="overflow-hidden rounded-lg border border-white/10">
                  <img src={src} alt={`${track.title} B-roll ${i + 1}`} className="aspect-[4/3] h-full w-full object-cover" />
                </a>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}

function OlderArcRow({ track }: { track: RealTrack }) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/10 py-4 last:border-b-0 sm:flex-row sm:items-center">
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black sm:h-16 sm:w-28">
        <img
          src={track.posterSrc || '/brand/og-card-neutral.png'}
          alt={track.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-serif text-lg leading-tight tracking-tight text-folana-ink">{track.title}</div>
        <div className="mt-1 font-mono text-[10px] tracking-[2px] text-folana-text-muted">
          {track.subtitle} • {track.duration}
        </div>
      </div>
      {track.audioSrc && (
        <audio controls preload="none" className="w-full min-h-11 accent-folana-neon-pink sm:max-w-xs" src={track.audioSrc}>
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default function MusicReleases() {
  const [searchQuery, setSearchQuery] = useState('');
  const [arcFilter, setArcFilter] = useState('');
  const [moodFilter, setMoodFilter] = useState('');

  const allMoods = useMemo(() => extractUniqueMoods(), []);
  const allArcs = useMemo(() => extractUniqueArcs(), []);
  const hasActiveFilters = Boolean(searchQuery || arcFilter || moodFilter);

  const filteredTracks = useMemo(() => {
    return REAL_PRODUCTIONS.filter(track => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const searchable = [track.title, track.subtitle, track.description, ...track.tags].join(' ').toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      if (arcFilter) {
        if (getArcKey(track) !== arcFilter && !track.tags.some(tag => tag.includes(arcFilter))) return false;
      }
      if (moodFilter) {
        if (track.mood !== moodFilter) return false;
      }
      return true;
    });
  }, [searchQuery, arcFilter, moodFilter]);

  const aboveFoldTracks = filteredTracks.filter((track) => isAboveFoldRealProduction(track.id));
  const olderTracks = filteredTracks.filter((track) => !isAboveFoldRealProduction(track.id));
  const olderGroups = groupTracksByArc(olderTracks);

  return (
    <>
      <Nav />

      <main className="pt-20 pb-24">
        <section className="relative border-b border-white/10 bg-folana-void py-4 md:py-5">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="mb-1 font-mono text-[10px] tracking-[3px] text-folana-neon-pink">TRANSMISSIONS FROM THE WIRES</div>
                <h1 className="font-serif text-3xl tracking-[-1px] text-white sm:text-4xl">Music Releases</h1>
              </div>
              <p className="max-w-md font-serif text-sm italic text-folana-text-secondary">
                SIXTEEN SECONDS leads. QUANTUM, Fracture, and Ethereal stay above the fold. Older arcs stay collapsed.
              </p>
            </div>
          </div>
        </section>

        <section id="featured" className="mx-auto max-w-[1280px] scroll-mt-24 px-4 pt-5 sm:px-6">
          <div className="mb-4 flex items-center gap-4">
            <div className="font-mono text-xs tracking-[3px] text-folana-neon-pink">REAL PRODUCTIONS</div>
            <div className="h-px flex-1 bg-gradient-to-r from-folana-neon-pink/30" />
          </div>

          <div className="mb-8">
            {filteredTracks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
                <div className="mb-3 font-mono text-xs tracking-[3px] text-folana-text-muted">NO RESULTS</div>
                <p className="mx-auto max-w-md text-sm text-folana-text-secondary">
                  No tracks match your current filters. Try adjusting your search or clearing filters.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 lg:grid-cols-3">
                  {aboveFoldTracks.map((track) => (
                    <RealProductionCard
                      key={track.id}
                      track={track}
                      featured={!hasActiveFilters && isFeaturedRealProduction(track.id)}
                    />
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="min-w-[220px] flex-1">
                      <input
                        type="text"
                        placeholder="Search by title, description, tags..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-folana-surface/60 px-4 py-2.5 font-mono text-sm tracking-wide text-white placeholder-folana-text-muted/60 transition-all focus:border-folana-neon-pink/50 focus:outline-none focus:ring-1 focus:ring-folana-neon-pink/20"
                      />
                    </div>
                    <select
                      value={arcFilter}
                      onChange={e => setArcFilter(e.target.value)}
                      className="min-h-11 min-w-[160px] cursor-pointer appearance-none rounded-xl border border-white/10 bg-folana-surface/60 px-4 py-2.5 font-mono text-sm tracking-wide text-white transition-all focus:border-folana-neon-pink/50 focus:outline-none focus:ring-1 focus:ring-folana-neon-pink/20"
                    >
                      <option value="">All Arcs</option>
                      {allArcs.map(arc => (
                        <option key={arc} value={arc}>{formatArcLabel(arc)}</option>
                      ))}
                    </select>
                    <select
                      value={moodFilter}
                      onChange={e => setMoodFilter(e.target.value)}
                      className="min-h-11 min-w-[160px] cursor-pointer appearance-none rounded-xl border border-white/10 bg-folana-surface/60 px-4 py-2.5 font-mono text-sm tracking-wide text-white transition-all focus:border-folana-neon-pink/50 focus:outline-none focus:ring-1 focus:ring-folana-neon-pink/20"
                    >
                      <option value="">All Moods</option>
                      {allMoods.map(mood => (
                        <option key={mood} value={mood}>{mood}</option>
                      ))}
                    </select>
                  </div>
                  <div className="font-mono text-xs tracking-[2px] text-folana-text-muted">
                    Showing {filteredTracks.length} of {REAL_PRODUCTIONS.length} tracks
                    {hasActiveFilters && (
                      <button
                        onClick={() => { setSearchQuery(''); setArcFilter(''); setMoodFilter(''); }}
                        className="ml-4 text-folana-neon-pink underline underline-offset-2 transition-colors hover:text-folana-neon-pink/80"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                </div>

                {olderTracks.length > 0 && (
                  <details className="older-arcs mt-8 rounded-3xl border border-white/10 bg-folana-surface/40" open={hasActiveFilters || undefined}>
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6">
                      <div>
                        <div className="font-mono text-xs tracking-[3px] text-folana-text-muted">OLDER ARCS</div>
                        <div className="mt-1 font-serif text-xl text-folana-ink">Canopy, Threshold, and earlier transmissions</div>
                      </div>
                      <div className="shrink-0 font-mono text-[10px] tracking-[2px] text-folana-text-muted">
                        {olderTracks.length} tracks
                      </div>
                    </summary>
                    <div className="space-y-8 border-t border-white/10 px-5 py-6 sm:px-6">
                      {olderGroups.map((group) => (
                        <div key={group.key}>
                          <div className="mb-3 flex items-center gap-3">
                            <div className="font-mono text-[10px] tracking-[3px] text-folana-neon-cyan">{group.label.toUpperCase()}</div>
                            <div className="h-px flex-1 bg-gradient-to-r from-folana-neon-cyan/20" />
                            <div className="font-mono text-[10px] tracking-[2px] text-folana-text-muted">{group.tracks.length}</div>
                          </div>
                          <div>
                            {group.tracks.map((track) => (
                              <OlderArcRow key={track.id} track={track} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </>
            )}
          </div>

          <div className="mb-16">
            <Link
              href="/#sonic"
              className="group inline-flex min-h-11 items-center gap-3 font-mono text-sm tracking-[2px] text-folana-neon-cyan transition-colors hover:text-white"
            >
              WATCH THE FULL LIP-SYNC VIDEO IN THE SONIC VAULT
              <span className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="mb-12 rounded-2xl border border-white/10 bg-folana-surface/40 p-8 text-center">
            <div className="mb-3 font-mono text-xs tracking-[3px] text-folana-text-muted">COMING FROM THE PIPELINE</div>
            <div className="mb-2 font-serif text-3xl tracking-tight text-white">More transmissions are being forged.</div>
            <p className="mx-auto max-w-md text-folana-text-secondary">
              Additional real music drops will appear here as they are completed through the mmx + RunPod workflow.
            </p>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="font-mono text-xs tracking-[3px] text-folana-neon-cyan">VISUAL REELS • EARLY CODEX</div>
              <div className="h-px flex-1 bg-gradient-to-r from-folana-neon-cyan/30" />
            </div>
            <p className="mb-8 max-w-2xl text-sm text-folana-text-secondary">
              High-quality visual references and prototype reels from the development phase. These are the artistic foundations that led to the real productions above.
            </p>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                { src: '/folana/generated/2026-05-25/ep30_synth_wave.jpg', title: 'Synth Wave Transmission', subtitle: 'EP30 Visual Prototype' },
                { src: '/folana/generated/2026-05-25/ep30_static_embrace.jpg', title: 'Static Embrace', subtitle: 'EP30 Lyric Visual' },
                { src: '/folana/generated/2026-05-26/folana_ep31_rain_window_20260526_114527.jpg', title: 'Rain Window Confession', subtitle: 'EP31 Introspective' },
              ].map((item) => (
                <div key={item.title} className="holo-frame group overflow-hidden rounded-2xl bg-folana-surface">
                  <div className="relative aspect-[16/9]">
                    <img src={item.src} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute left-3 top-3">
                      <ProductionBadge kind="prototype" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-serif text-xl tracking-tight text-folana-ink">{item.title}</div>
                    <div className="mt-0.5 font-mono text-xs tracking-widest text-folana-text-muted">{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
