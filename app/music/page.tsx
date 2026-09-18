'use client';

import { useMemo, useState } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { AudioListenBar, FeaturedProductionCard } from '../components/FeaturedProductionCard';
import {
  getFeaturedRealProductions,
  getOlderArcTracks,
  VISUAL_PROTOTYPES,
} from '../../lib/music-manifest';

function olderArcLabel(track: ReturnType<typeof getOlderArcTracks>[number]): string {
  if (track.tags.some((tag) => tag.includes('canopy-arc'))) return 'Canopy';
  if (track.tags.some((tag) => tag.includes('threshold-arc'))) return 'Threshold';
  if (track.tags.some((tag) => tag.includes('quantum-arc'))) return 'Quantum';
  const arc = track.tags.find((tag) => tag.endsWith('-arc'));
  if (!arc) return 'Pipeline';
  return arc.replace(/-arc$/, '').replace(/-/g, ' ');
}

export default function MusicReleases() {
  const featuredTracks = useMemo(() => getFeaturedRealProductions(), []);
  const olderTracks = useMemo(() => getOlderArcTracks(), []);
  const [olderQuery, setOlderQuery] = useState('');
  const [listeningId, setListeningId] = useState<string | null>(null);

  const filteredOlder = useMemo(() => {
    if (!olderQuery.trim()) return olderTracks;
    const q = olderQuery.toLowerCase();
    return olderTracks.filter((track) =>
      [track.title, track.subtitle, track.description, ...track.tags].join(' ').toLowerCase().includes(q)
    );
  }, [olderQuery, olderTracks]);

  return (
    <>
      <Nav />

      <main className="pt-20 pb-24">
        <section className="relative border-b border-white/10 bg-folana-void py-12 md:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <div className="mb-4 inline-block rounded-full border border-folana-neon-pink/40 px-4 py-1 text-xs font-mono tracking-[3px] text-folana-neon-pink">
              TRANSMISSIONS FROM THE WIRES
            </div>
            <h1 className="mb-4 font-serif text-4xl tracking-[-1.5px] text-white sm:text-6xl md:text-7xl md:tracking-[-4.5px] lg:text-[92px]">
              Music Releases
            </h1>
            <p className="mx-auto max-w-md font-serif text-lg italic text-folana-text-secondary sm:text-xl">
              QUANTUM first. Fracture and Ethereal as real video.<br />Older arcs stay in the catalog.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 sm:pt-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="font-mono text-xs tracking-[3px] text-folana-neon-pink">REAL PRODUCTIONS</div>
            <div className="h-px flex-1 bg-gradient-to-r from-folana-neon-pink/30" />
          </div>

          <div className="mb-12 space-y-8">
            {featuredTracks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
                <div className="mb-3 font-mono text-xs tracking-[3px] text-folana-text-muted">NO FEATURED DROPS</div>
                <p className="mx-auto max-w-md text-sm text-folana-text-secondary">
                  Featured real productions will appear here.
                </p>
              </div>
            ) : (
              featuredTracks.map((track, index) => (
                <FeaturedProductionCard
                  key={track.id}
                  track={track}
                  featured={index === 0}
                />
              ))
            )}
          </div>

          <details className="mb-12 rounded-[1.75rem] border border-white/10 bg-folana-surface/40 p-4 sm:p-6">
            <summary className="cursor-pointer list-none">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-mono text-[10px] tracking-[3px] text-folana-text-muted">OLDER ARCS</div>
                  <div className="mt-1 font-serif text-2xl tracking-tight text-folana-ink sm:text-3xl">
                    Canopy, Threshold, and earlier pipeline drops
                  </div>
                </div>
                <div className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] tracking-[2px] text-folana-text-muted">
                  {olderTracks.length} TRACKS · TAP TO OPEN
                </div>
              </div>
            </summary>

            <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
              <input
                type="text"
                placeholder="Search older arcs..."
                value={olderQuery}
                onChange={(e) => setOlderQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-folana-surface/60 px-4 py-2.5 font-mono text-sm tracking-wide text-white placeholder-folana-text-muted/60 transition-all focus:border-folana-neon-pink/50 focus:outline-none focus:ring-1 focus:ring-folana-neon-pink/20"
              />
              <div className="font-mono text-[10px] tracking-[2px] text-folana-text-muted">
                Showing {filteredOlder.length} of {olderTracks.length}
              </div>

              <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
                {filteredOlder.length === 0 ? (
                  <div className="px-4 py-10 text-center text-sm text-folana-text-secondary">
                    No older-arc tracks match that search.
                  </div>
                ) : (
                  filteredOlder.map((track) => (
                    <div key={track.id} className="bg-black/20 p-4 sm:p-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        {track.posterSrc && (
                          <img
                            src={track.posterSrc}
                            alt=""
                            loading="lazy"
                            className="h-16 w-24 shrink-0 rounded-xl object-cover"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="font-mono text-[10px] uppercase tracking-[2px] text-folana-text-muted">
                            {olderArcLabel(track)}
                          </div>
                          <div className="truncate font-serif text-lg text-folana-ink">{track.title}</div>
                          <div className="truncate font-mono text-[11px] text-folana-text-muted">{track.subtitle}</div>
                        </div>
                        {track.audioSrc && (
                          <button
                            type="button"
                            onClick={() => setListeningId(listeningId === track.id ? null : track.id)}
                            className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-mono tracking-[2px] text-folana-neon-cyan hover:border-folana-neon-cyan/50"
                          >
                            {listeningId === track.id ? 'HIDE PLAYER' : 'LISTEN'}
                          </button>
                        )}
                      </div>
                      {listeningId === track.id && track.audioSrc && (
                        <div className="mt-4 min-w-0">
                          <AudioListenBar src={track.audioSrc} />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </details>

          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="font-mono text-xs tracking-[3px] text-folana-text-muted">PROTOTYPES • VISUAL CODEX</div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20" />
            </div>
            <p className="mb-8 max-w-2xl text-sm text-folana-text-secondary">
              Early visual references from pipeline development. These are not the featured real productions above.
            </p>

            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {VISUAL_PROTOTYPES.map((item) => (
                <div key={item.id} className="holo-frame group overflow-hidden rounded-2xl bg-folana-surface">
                  <div className="relative aspect-[16/9]">
                    <img src={item.posterSrc} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute left-3 top-3 rounded border border-white/20 bg-black/70 px-2 py-px font-mono text-[10px] tracking-[2px] text-white/80">
                      PROTOTYPE
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
