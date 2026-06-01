'use client'

import { useState, useMemo } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { REAL_PRODUCTIONS } from '../../lib/music-manifest';

const ARCS = [
  'day-cycle', 'elements', 'city-souls', 'ghost-frequencies',
  'broadcast', 'inner-circle', 'horizon', 'constellation',
  'full-spectrum-broadcast', 'source',
];

function formatArcLabel(arc: string): string {
  return arc.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function extractUniqueMoods(): string[] {
  const moods = new Set<string>();
  REAL_PRODUCTIONS.forEach(t => { if (t.mood) moods.add(t.mood); });
  return Array.from(moods).sort();
}

export default function MusicReleases() {
  const [searchQuery, setSearchQuery] = useState('');
  const [arcFilter, setArcFilter] = useState('');
  const [moodFilter, setMoodFilter] = useState('');

  const allMoods = useMemo(() => extractUniqueMoods(), []);

  const filteredTracks = useMemo(() => {
    return REAL_PRODUCTIONS.filter(track => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const searchable = [track.title, track.subtitle, track.description, ...track.tags].join(' ').toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      if (arcFilter) {
        const hasArc = track.tags.some(tag => tag.includes(arcFilter));
        if (!hasArc) return false;
      }
      if (moodFilter) {
        if (track.mood !== moodFilter) return false;
      }
      return true;
    });
  }, [searchQuery, arcFilter, moodFilter]);

  return (
    <>
      <Nav />

      <main className="pt-20 pb-24">
        {/* Hero for Music Section */}
        <section className="relative border-b border-white/10 bg-folana-void py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="inline-block mb-4 px-4 py-1 rounded-full border border-folana-neon-pink/40 text-xs font-mono tracking-[3px] text-folana-neon-pink">
              TRANSMISSIONS FROM THE WIRES
            </div>
            
            <h1 className="font-serif text-7xl md:text-[92px] tracking-[-4.5px] text-white mb-4">
              Music Releases
            </h1>
            <p className="max-w-md mx-auto text-xl text-folana-text-secondary font-serif italic">
              The first complete productions.<br />More coming from the pipeline.
            </p>
          </div>
        </section>

        {/* Real Productions */}
        <section className="max-w-5xl mx-auto px-6 pt-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="font-mono text-xs tracking-[3px] text-folana-neon-pink">REAL PRODUCTIONS</div>
            <div className="h-px flex-1 bg-gradient-to-r from-folana-neon-pink/30" />
          </div>

          {/* Search + Filters */}
          <div className="mb-10 space-y-4">
            <div className="flex flex-wrap gap-4 items-start">
              <div className="flex-1 min-w-[220px]">
                <input
                  type="text"
                  placeholder="Search by title, description, tags..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-folana-surface/60 border border-white/10 text-white placeholder-folana-text-muted/60 text-sm font-mono tracking-wide focus:outline-none focus:border-folana-neon-pink/50 focus:ring-1 focus:ring-folana-neon-pink/20 transition-all"
                />
              </div>
              <select
                value={arcFilter}
                onChange={e => setArcFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-folana-surface/60 border border-white/10 text-white text-sm font-mono tracking-wide focus:outline-none focus:border-folana-neon-pink/50 focus:ring-1 focus:ring-folana-neon-pink/20 transition-all appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="">All Arcs</option>
                {ARCS.map(arc => (
                  <option key={arc} value={arc}>{formatArcLabel(arc)}</option>
                ))}
              </select>
              <select
                value={moodFilter}
                onChange={e => setMoodFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-folana-surface/60 border border-white/10 text-white text-sm font-mono tracking-wide focus:outline-none focus:border-folana-neon-pink/50 focus:ring-1 focus:ring-folana-neon-pink/20 transition-all appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="">All Moods</option>
                {allMoods.map(mood => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </div>
            <div className="text-xs font-mono tracking-[2px] text-folana-text-muted">
              Showing {filteredTracks.length} of {REAL_PRODUCTIONS.length} tracks
              {filteredTracks.length !== REAL_PRODUCTIONS.length && (
                <button
                  onClick={() => { setSearchQuery(''); setArcFilter(''); setMoodFilter(''); }}
                  className="ml-4 text-folana-neon-pink hover:text-folana-neon-pink/80 transition-colors underline underline-offset-2"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* All Real Productions - Dynamically from manifest */}
          <div className="space-y-8 mb-12">
            {filteredTracks.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                <div className="font-mono text-xs tracking-[3px] text-folana-text-muted mb-3">NO RESULTS</div>
                <p className="text-folana-text-secondary text-sm max-w-md mx-auto">
                  No tracks match your current filters. Try adjusting your search or clearing filters.
                </p>
              </div>
            ) : (
              filteredTracks.map((track, index) => (
                <div key={track.id} className={`holo-frame rounded-3xl overflow-hidden border ${track.id === REAL_PRODUCTIONS[0]?.id && !searchQuery && !arcFilter && !moodFilter ? 'border-folana-neon-pink/30' : 'border-white/15'}`}>
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Visual Side */}
                    <div className="relative aspect-[16/9] md:aspect-auto bg-black">
                      <img 
                        src={track.posterSrc || '/brand/og-card-neutral.png'} 
                        alt={track.title} 
                        className="absolute inset-0 w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                      
                      {!searchQuery && !arcFilter && !moodFilter && index === 0 && (
                        <div className="absolute bottom-6 left-6">
                          <div className="px-4 py-1 rounded-full bg-black/70 text-xs font-mono tracking-widest text-folana-neon-pink border border-folana-neon-pink/40 inline-block mb-3">
                            FULL PRODUCTION • 2026-05-27
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Audio + Info Side */}
                    <div className="p-8 md:p-10 flex flex-col bg-folana-surface/60">
                      <div className="flex-1">
                        <div className="uppercase tracking-[3px] text-xs text-folana-neon-cyan mb-2">
                          PIPELINE TRANSMISSION
                        </div>
                        
                        <div className="font-serif text-3xl tracking-tight text-folana-ink mb-1">{track.title}</div>
                        <div className="font-mono text-sm text-folana-text-muted mb-4">{track.subtitle}</div>

                        <p className="text-base text-folana-text-secondary leading-relaxed font-serif italic mb-6">
                          {track.description}
                        </p>

                        <div className="space-y-1 text-sm">
                          <div><span className="text-folana-text-muted">Mood:</span> <span className="text-white">{track.mood}</span></div>
                          <div><span className="text-folana-text-muted">Tags:</span> <span className="text-white">{track.tags.join(', ')}</span></div>
                        </div>
                      </div>

                      {/* Audio Player */}
                      {track.audioSrc && (
                        <div className="mt-auto pt-6 border-t border-white/10">
                          <div className="text-xs font-mono tracking-[2px] text-folana-text-muted mb-2">LISTEN</div>
                          <audio 
                            controls 
                            className="w-full accent-folana-neon-pink"
                            src={track.audioSrc}
                          >
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}

                      {track.videoSrc && (
                        <div className="mt-3 text-xs">
                          <a href="/#sonic" className="text-folana-neon-cyan hover:underline">Watch the video in the Sonic Vault →</a>
                        </div>
                      )}

                      {/* NEW: Autonomous FAL B-roll Gallery (added after Test→Optimize→Register) */}
                      {track.falAutonomousBroll && track.falAutonomousBroll.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="font-mono text-[10px] tracking-[2px] text-folana-neon-pink">AUTONOMOUS FAL B-ROLL • LOCKED REF TEST</div>
                            <div className="h-px flex-1 bg-folana-neon-pink/20" />
                          </div>
                          <p className="text-xs text-folana-text-secondary mb-3 font-serif italic">
                            {track.falBrollNote || 'Fresh character-consistent stills from the autonomous pipeline.'}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {track.falAutonomousBroll.slice(0, 8).map((src, i) => (
                              <a 
                                key={i} 
                                href={src} 
                                target="_blank" 
                                rel="noopener"
                                className="group relative block overflow-hidden rounded-xl border border-white/10 bg-black/40 holo-frame"
                              >
                                <img 
                                  src={src} 
                                  alt={`Ethereal Dispatch autonomous FAL B-roll ${i+1}`} 
                                  className="w-full h-full object-cover aspect-[4/3] group-hover:scale-[1.04] transition-transform duration-300" 
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                  <div className="text-[10px] font-mono tracking-widest text-folana-neon-cyan/90">FAL #{i+1}</div>
                                </div>
                              </a>
                            ))}
                          </div>
                          <div className="mt-2 text-[10px] font-mono tracking-[1px] text-folana-text-muted">
                            8 scenes • FAL artist-factory + locked full-body • MiniMax scored • May 27 test run
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Video Link */}
          <div className="mb-16">
            <a 
              href="/#sonic" 
              className="group inline-flex items-center gap-3 text-sm font-mono tracking-[2px] text-folana-neon-cyan hover:text-white transition-colors"
            >
              WATCH THE FULL LIP-SYNC VIDEO IN THE SONIC VAULT 
              <span className="group-hover:translate-x-1 transition">→</span>
            </a>
          </div>

          {/* Future Releases Teaser */}
          <div className="border border-white/10 rounded-2xl p-8 text-center bg-folana-surface/40 mb-12">
            <div className="font-mono text-xs tracking-[3px] text-folana-text-muted mb-3">COMING FROM THE PIPELINE</div>
            <div className="font-serif text-3xl tracking-tight text-white mb-2">More transmissions are being forged.</div>
            <p className="text-folana-text-secondary max-w-md mx-auto">
              Additional real music drops will appear here as they are completed through the mmx + RunPod workflow.
            </p>
          </div>

          {/* Visual Reels / Codex Section (per design subagent codex recommendation) */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="font-mono text-xs tracking-[3px] text-folana-neon-cyan">VISUAL REELS • EARLY CODEX</div>
              <div className="h-px flex-1 bg-gradient-to-r from-folana-neon-cyan/30" />
            </div>
            <p className="text-sm text-folana-text-secondary mb-8 max-w-2xl">
              High-quality visual references and prototype reels from the development phase. These are the artistic foundations that led to the real productions above.
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                { src: '/folana/generated/2026-05-25/ep30_synth_wave.jpg', title: 'Synth Wave Transmission', subtitle: 'EP30 Visual Prototype' },
                { src: '/folana/generated/2026-05-25/ep30_static_embrace.jpg', title: 'Static Embrace', subtitle: 'EP30 Lyric Visual' },
                { src: '/folana/generated/2026-05-26/folana_ep31_rain_window_20260526_114527.jpg', title: 'Rain Window Confession', subtitle: 'EP31 Introspective' },
              ].map((item, i) => (
                <div key={i} className="group holo-frame rounded-2xl overflow-hidden bg-folana-surface">
                  <div className="relative aspect-[16/9]">
                    <img src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="font-serif text-xl tracking-tight text-folana-ink">{item.title}</div>
                    <div className="text-xs font-mono tracking-widest text-folana-text-muted mt-0.5">{item.subtitle}</div>
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
