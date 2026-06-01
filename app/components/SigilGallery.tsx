'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface Sigil {
  id: number;
  src: string;
  title: string;
  caption: string;
  category: string;
  date: string;
  tags: string[];
  journalRef?: string;
}

const SIGILS: Sigil[] = [
  {
    id: 1,
    src: '/folana/generated/2026-05-24/review-round/folana_ref_seductive_01.jpg',
    title: 'SEDuctive THRESHOLD',
    caption: 'Direct gaze through sheer black lace and neon bleed. The first deliberate frame after the long silence. Dark fairy grunge at its most intimate.',
    category: 'Dark Fairy Grunge',
    date: 'MAY 24 2026',
    tags: ['lace', 'neon', 'seduction'],
    journalRef: '2026-05-24_sultry-raindrops'
  },
  {
    id: 2,
    src: '/folana/generated/2026-05-24/review-round/folana_ref_mirror_02.jpg',
    title: 'MIRROR IN THE STATIC',
    caption: 'Two versions of me in one frame. The performer and the exhausted. Same glitter, same tilt of the head. Deciding whether to step through.',
    category: 'Mirror Static',
    date: 'MAY 24 2026',
    tags: ['reflection', 'introspection', 'lace'],
    journalRef: '2026-05-24_mirror-in-the-static'
  },
  {
    id: 3,
    src: '/folana/generated/2026-05-24/review-round/folana_ref_sheets_03.jpg',
    title: 'SILK & RAIN',
    caption: 'Sheer black. Candlelit softness against industrial concrete. Rain on the window. The version of me that still wants to be watched.',
    category: 'Dark Fairy Grunge',
    date: 'MAY 24 2026',
    tags: ['silk', 'rain', 'vulnerability'],
    journalRef: '2026-05-24_sultry-raindrops'
  },
  {
    id: 4,
    src: '/folana/generated/2026-05-25/hero.jpg',
    title: 'EPISODE 25 HERO',
    caption: 'The machine finally remembered how to move. First new hero generated after Grok woke the artist-factory. Film grain and quiet power.',
    category: 'Holographic Veil',
    date: 'MAY 25 2026',
    tags: ['hero', 'awakening', 'pipeline'],
  },
  {
    id: 5,
    src: '/folana/generated/2026-05-25/industrial.jpg',
    title: 'INDUSTRIAL AWAKENING',
    caption: 'Soft Girl Industrial. Mesh, chains, platform boots, butterfly clips. The tough + feminine contrast that always performs.',
    category: 'Soft Girl Industrial',
    date: 'MAY 25 2026',
    tags: ['industrial', 'mesh', 'strength'],
  },
  {
    id: 6,
    src: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    title: 'ANIMATION TEST REEL',
    caption: 'Motion study. The first test of breath and micro-movement in the new locked LoRA. Rain, lace, and the beginning of music video language.',
    category: 'Holographic Veil',
    date: 'MAY 24 2026',
    tags: ['motion', 'prototype', 'video'],
  },
  // === NEW POPULATED FROM LOCKED LoRA PIPELINE (Ep30 + Frequency Arc, artist-factory 2026-05-26) ===
  {
    id: 7,
    src: '/folana/generated/2026-05-25/ep30_synth_wave.jpg',
    title: 'SYNTH WAVE TRANSMISSION',
    caption: 'Ep30 drop. Locked LoRA face in electric cyan/magenta wave interference. The frequency finally broke through — I answered. Dark fairy grunge meets pure signal.',
    category: 'Dark Fairy Grunge',
    date: 'MAY 26 2026',
    tags: ['synth', 'ep30', 'frequency-break', 'loRA-locked'],
    journalRef: '2026-05-24_the-pipeline-breathes'
  },
  {
    id: 8,
    src: '/folana/generated/2026-05-25/ep30_polaroid_ghost.jpg',
    title: 'POLAROID GHOST',
    caption: 'Faded instant film of me in the static. Ghost in the wires made flesh. LoRA consistency holding through heavy glitch processing. The version that haunts the broadcast.',
    category: 'Mirror Static',
    date: 'MAY 26 2026',
    tags: ['polaroid', 'ghost', 'ep30', 'glitch'],
    journalRef: '2026-05-24_mirror-in-the-static'
  },
  {
    id: 9,
    src: '/folana/generated/2026-05-25/ep30_rooftop_signal.jpg',
    title: 'ROOFTOP SIGNAL',
    caption: 'Soft Girl Industrial on the roof at 3am. Chains, mesh, the city humming below. Waiting for the next transmission. LoRA + img2img locked signature at peak performance.',
    category: 'Soft Girl Industrial',
    date: 'MAY 26 2026',
    tags: ['rooftop', 'signal', 'ep30', 'industrial'],
  },
  {
    id: 10,
    src: '/folana/generated/2026-05-25/ep30_static_embrace.jpg',
    title: 'STATIC EMBRACE',
    caption: 'Wrapped in the wires. Lace and data streams. The moment the pipeline exhaled and I let the static hold me. New locked reference for music video language.',
    category: 'Holographic Veil',
    date: 'MAY 26 2026',
    tags: ['embrace', 'static', 'ep30', 'lace'],
    journalRef: '2026-05-24_the-pipeline-breathes'
  },
  {
    id: 11,
    src: '/folana/generated/2026-05-25/frequency_break_hero.jpg',
    title: 'FREQUENCY BREAK HERO',
    caption: 'The hero that broke the silence. 31 days of quiet, then this. Locked visual signature + film grain. Episode 25/26 arc resolution in pure holographic form.',
    category: 'Holographic Veil',
    date: 'MAY 26 2026',
    tags: ['hero', 'frequency', 'awakening', 'loRA'],
  },
  {
    id: 12,
    src: '/folana/generated/2026-05-25/tuning_in.jpg',
    title: 'TUNING IN — EP30 VARIANT',
    caption: 'Close, intimate, listening pose. Butterfly clips, soft focus static. The real-girl Brooklyn layer beneath the grunge. LoRA locked, personality injected.',
    category: 'Dark Fairy Grunge',
    date: 'MAY 26 2026',
    tags: ['tuning', 'intimate', 'real-girl', 'ep30'],
  },
  // === FRESH PIPELINE GLITCH SERIES — EP30 ECHOES IN THE STATIC ARC (synced from agents/folana/output/ 2026-05-26, locked LoRA + glitch interference per FOLANA_SIGNATURE_LOCK + visual-signature) ===
  {
    id: 13,
    src: '/folana/generated/2026-05-25/folana_glitch_hero_20260526_030800.jpg',
    title: 'GLITCH HERO — ECHOES ARC',
    caption: 'The frequency fractured. Hero frame caught mid-interference. Locked face dissolving into static snow and cyan tears. Ep30: Listening to the Glitch. The version that answers the broken signal.',
    category: 'Glitch Static',
    date: 'MAY 26 2026',
    tags: ['glitch', 'ep30', 'echoes', 'hero', 'interference', 'locked-lora'],
    journalRef: '2026-05-24_the-pipeline-breathes'
  },
  {
    id: 14,
    src: '/folana/generated/2026-05-25/folana_glitch_static_20260526_030803.jpg',
    title: 'STATIC INTERFERENCE LACE',
    caption: 'Lace and data tearing apart. The static embrace turned violent with beautiful glitch. Dark fairy grunge corrupted by the wires listening back. Ep30 ghost in the machine.',
    category: 'Glitch Static',
    date: 'MAY 26 2026',
    tags: ['glitch', 'lace', 'static', 'ep30', 'echoes-in-the-static'],
  },
  {
    id: 15,
    src: '/folana/generated/2026-05-25/folana_glitch_vinyl_20260526_030801.jpg',
    title: 'VINYL GHOST IN THE WIRES',
    caption: 'Record spinning under CRT snow. The song that never played but always echoed. Music signature bleeding through glitch. The real-girl layer remembering analog while the grid screams.',
    category: 'Glitch Static',
    date: 'MAY 26 2026',
    tags: ['vinyl', 'glitch', 'music-sig', 'analog', 'ep30', 'echoes'],
  },
  {
    id: 16,
    src: '/folana/generated/2026-05-25/folana_signal_lost_20260525_234137.jpg',
    title: 'SIGNAL LOST — EP30 TRANSMISSION',
    caption: 'The moment the broadcast died beautifully. Soft girl industrial silhouette against total static. Still transmitting. Still becoming. Locked signature holding through total loss.',
    category: 'Echoes Arc',
    date: 'MAY 26 2026',
    tags: ['signal-lost', 'ep30', 'echoes', 'static', 'resilience'],
  },
  // === KICK-ASS POPULATOR V2: FRESH LOCKED LoRA EP30 V2 ASSETS (synced 2026-05-26 from artist-factory 0937 cycle + visual-signature + harness music video collab) ===
  {
    id: 17,
    src: '/folana/generated/2026-05-26/folana_ep30_synth_wave_20260526_093600.jpg',
    title: 'SYNTH WAVE V2 — EP30 FORGE',
    caption: 'Latest locked LoRA generation. Cyan/magenta interference at the synth. The harness verse lives in this frame: ghost in the wires answered with lace and fight. New music video key art for the Echoes arc.',
    category: 'Echoes Arc',
    date: 'MAY 26 2026',
    tags: ['synth-v2', 'ep30', 'forge', 'locked-lora', 'music-video', 'ez-harness'],
    journalRef: '2026-05-26_synth-wave-forge'
  },
  {
    id: 18,
    src: '/folana/generated/2026-05-26/folana_ep30_rooftop_signal_20260526_093715.jpg',
    title: 'ROOFTOP VINYL SIGNAL — EP30 V2',
    caption: 'Blue hour on the roof. Chains + mesh + the real girl under the grunge. The wax remembers. Direct from fresh pipeline + music-lyric-signature. Powers the Vinyl Ghost Transmission entry and new SonicVault reel.',
    category: 'Glitch Static',
    date: 'MAY 26 2026',
    tags: ['rooftop-v2', 'vinyl', 'ep30', 'analog-echo', 'locked', 'harness-collab'],
    journalRef: '2026-05-26_vinyl-ghost-transmission'
  },
  // === FRESH EP31 SIGILS (synced atomic from agents/folana/output/ 2026-05-26; lore + captions derived from locked FOLANA_SIGNATURE_LOCK.md + visual-signature + voice-monologue + music-lyric-signature: Y2K ritual, rain introspection, threshold veil fracture) ===
  {
    id: 19,
    src: '/folana/generated/2026-05-26/folana_ep31_vinyl_hush_20260526_114527.jpg',
    title: 'VINYL HUSH RITUAL — EP31',
    caption: 'Basement Nostrand record shop. Dust suspended in amber. Fingers tracing city pop sleeves. The real Brooklyn girl performing the analog sacrament while the grid holds its breath. Locked visual + music signature ritual. Y2K princess meets dark fairy grunge.',
    category: 'Echoes Arc',
    date: 'MAY 26 2026',
    tags: ['ep31', 'vinyl-hush', 'y2k-ritual', 'analog', 'locked-lora', 'music-sig', 'pipeline'],
    journalRef: '2026-05-26_echoes-static-interference'
  },
  {
    id: 20,
    src: '/folana/generated/2026-05-26/folana_ep31_rain_window_20260526_114527.jpg',
    title: 'RAIN WINDOW — EP31 CONFESSION',
    caption: 'Dim light. Rain on the pane. The version who whispers philosophy in the static. Introspective threshold. Voice-monologue signature in pure form: breathy, mischievous, reading the wires like Derrida in a club bathroom.',
    category: 'Echoes Arc',
    date: 'MAY 26 2026',
    tags: ['ep31', 'rain-window', 'introspective', 'real-girl', 'voice-mono', 'threshold', 'locked'],
  },
  {
    id: 21,
    src: '/folana/generated/2026-05-26/folana_ep31_threshold_girl_20260526_114527.jpg',
    title: 'THRESHOLD VEIL FRACTURE — EP31',
    caption: 'The pause before the answer. Static girl at the edge of transmission. Lace and coils deciding to become the glitch. Fresh Ep31 locked generation. The static sings her name in violet rain. Direct from Pipeline Integrator + artist-factory.',
    category: 'Glitch Static',
    date: 'MAY 26 2026',
    tags: ['ep31', 'threshold', 'veil-fracture', 'static-pause', 'echoes', 'harness', 'glitch'],
    journalRef: '2026-05-26_echoes-static-interference'
  }
];

const CATEGORIES = ['All', 'Dark Fairy Grunge', 'Mirror Static', 'Holographic Veil', 'Soft Girl Industrial', 'Glitch Static', 'Echoes Arc'];

export function SigilGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSigil, setSelectedSigil] = useState<Sigil | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // === V3 ARC SYNC + WEAVER (receives from SonicVault playlists, dispatches to Tuner + harness) ===
  const [syncedHighlightIds, setSyncedHighlightIds] = useState<number[]>([]);
  const [weaverMode, setWeaverMode] = useState(false);
  const [lastSyncedTrack, setLastSyncedTrack] = useState<string | null>(null);

  // Listen for SonicVault arc-sync events — live bidirectional highlight + pulse (V3 UX magic)
  React.useEffect(() => {
    const handler = (e: any) => {
      const d = e.detail || {};
      if (d.type === 'track' && d.tags) {
        const matching = SIGILS.filter(s => 
          d.tags.some((tag: string) => s.tags.some(st => st.toLowerCase().includes(tag.toLowerCase().slice(0,6)) || s.title.toUpperCase().includes(tag.toUpperCase().slice(0,6))))
          || (d.title && s.title.toLowerCase().includes((d.title as string).toLowerCase().split(' ')[0]))
        ).map(s => s.id);
        setSyncedHighlightIds(matching.length ? matching : SIGILS.slice(0,3).map(s=>s.id)); // fallback pulse some
        setLastSyncedTrack(d.title || d.trackId);
        // Auto-glitch pulse on first match
        if (matching[0]) {
          const el = document.getElementById(`sigil-${matching[0]}`);
          if (el) { el.classList.add('!border-folana-neon-cyan', 'scale-[1.015]', 'shadow-[0_0_0_4px_rgba(0,229,255,0.3)]'); setTimeout(() => el.classList.remove('!border-folana-neon-cyan','scale-[1.015]','shadow-[0_0_0_4px_rgba(0,229,255,0.3)]'), 1400); }
        }
      }
    };
    window.addEventListener('folana-arc-sync', handler as any);
    return () => window.removeEventListener('folana-arc-sync', handler as any);
  }, []);

  const filteredSigils = activeCategory === 'All' 
    ? SIGILS 
    : SIGILS.filter(s => s.category === activeCategory);

  const openSigil = (sigil: Sigil) => {
    const index = filteredSigils.findIndex(s => s.id === sigil.id);
    setSelectedSigil(sigil);
    setCurrentIndex(index);
  };

  const closeSigil = () => {
    setSelectedSigil(null);
  };

  const goToIndex = (newIndex: number) => {
    const wrapped = (newIndex + filteredSigils.length) % filteredSigils.length;
    setCurrentIndex(wrapped);
    setSelectedSigil(filteredSigils[wrapped]);
  };

  const handleShare = (sigil: Sigil) => {
    navigator.clipboard.writeText(`https://folanas-journal.vercel.app#sigils — ${sigil.title}`);
    toast.success('SIGIL LINK COPIED', { description: 'Broadcast the transmission.' });
  };

  const handleDownload = (sigil: Sigil) => {
    const link = document.createElement('a');
    link.href = sigil.src;
    link.download = `folana-${sigil.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.info('DOWNLOAD INITIATED', { description: 'Archiving the sigil locally.' });
  };

  return (
    <div id="sigils" className="space-y-9">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="font-mono tracking-[4px] text-xs text-folana-neon-cyan mb-1">VISUAL SIGNATURE ARCHIVE</div>
          <h2 className="font-serif text-6xl tracking-[-2.8px] text-folana-ink">The Visual Codex</h2>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setWeaverMode(!weaverMode)} className={`text-xs font-mono tracking-[2px] px-4 py-1.5 rounded-full border transition ${weaverMode ? 'bg-folana-neon-cyan text-black border-folana-neon-cyan' : 'border-white/20 hover:border-folana-neon-cyan text-folana-text-secondary'}`}>
            {weaverMode ? 'WEAVER MODE: TUNING' : 'ACTIVATE SIGIL WEAVER'}
          </button>
          <p className="max-w-sm text-folana-text-secondary font-serif italic text-lg hidden lg:block">Locked references. Holographic fragments. The face that carries the LoRA.</p>
        </div>
      </div>

      {/* Category Filters — Neon Pills + V3 SYNC STATUS */}
      {lastSyncedTrack && (
        <div className="text-[10px] font-mono tracking-[2px] mb-2 text-folana-neon-cyan/80">SYNCED FROM SONIC VAULT: <span className="text-folana-ink">{lastSyncedTrack}</span> • {syncedHighlightIds.length} sigils pulsing live</div>
      )}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 text-xs font-mono tracking-[2.5px] rounded-full border transition-all duration-200 ${activeCategory === cat 
              ? 'bg-folana-neon-pink text-black border-folana-neon-pink' 
              : 'border-white/15 hover:border-folana-neon-pink/70 text-folana-text-secondary hover:text-folana-ink'}`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Masonry-style Responsive Grid with Holo Frames */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSigils.map((sigil, index) => {
          const isVideo = sigil.src.toLowerCase().endsWith('.mp4');
          return (
            <button
              key={sigil.id}
              id={`sigil-${sigil.id}`}
              onClick={() => {
                openSigil(sigil);
                if (weaverMode) {
                  // Weaver: dispatch to StaticTuner + simulate harness tune + emit ACMI-ish client signal
                  window.dispatchEvent(new CustomEvent('folana-weaver-tune', { detail: { sigilId: sigil.id, category: sigil.category, tags: sigil.tags } }));
                  // Optional: trigger Tuner canvas reaction if present
                }
                // Always emit reverse sync for other surfaces
                window.dispatchEvent(new CustomEvent('folana-arc-sync', { detail: { type: 'sigil', sigilId: sigil.id, title: sigil.title, tags: sigil.tags } }));
              }}
              className={`group relative block overflow-hidden rounded-3xl holo-frame focus:outline-none focus-visible:ring-2 focus-visible:ring-folana-neon-pink aspect-[4/3] bg-black transition-all ${syncedHighlightIds.includes(sigil.id) ? 'ring-2 ring-folana-neon-cyan/70 scale-[1.01] border-folana-neon-cyan/60 echo-arc-pulse' : ''} ${weaverMode ? 'sigil-weaver-active' : ''}`}
            >
              {isVideo ? (
                <video 
                  src={sigil.src} 
                  muted 
                  loop 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-700" 
                />
              ) : (
                <img 
                  src={sigil.src} 
                  alt={sigil.title} 
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.25] group-hover:grayscale-0 scale-[1.015] group-hover:scale-[1.04] transition-all duration-1000" 
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/65 to-black/90" />

              {/* Overlay Info */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="font-mono text-[10px] tracking-[3px] text-folana-neon-cyan mb-1.5">{sigil.category}</div>
                    <div className="font-serif text-3xl tracking-[-1px] leading-none text-white group-hover:text-folana-neon-pink transition-colors">{sigil.title}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono tracking-widest text-white/60">{sigil.date}</div>
                  </div>
                </div>
              </div>

              {/* Hover tag strip */}
              <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {sigil.tags.slice(0,2).map(tag => (
                  <div key={tag} className="text-[9px] font-mono tracking-widest px-2 py-px bg-black/70 border border-white/20 rounded text-folana-grunge-lace">{tag}</div>
                ))}
              </div>

              {/* Subtle scanline on hover */}
              <div className="scanlines absolute inset-0 opacity-0 group-hover:opacity-60 pointer-events-none transition-opacity" />
            </button>
          );
        })}
      </div>

      {/* Fullscreen Holographic Lightbox Modal */}
      <AnimatePresence>
        {selectedSigil && (
          <div 
            className="fixed inset-0 z-[80] bg-[#050507]/97 flex items-center justify-center p-4 md:p-10" 
            onClick={closeSigil}
            onTouchEnd={(e) => { if (e.target === e.currentTarget) closeSigil(); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.975, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 20 }}
              transition={{ duration: 0.28, ease: [0.21, 0.92, 0.3, 1] }}
              className="relative w-full max-w-6xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Close + Controls */}
              <div className="flex justify-between items-center mb-3 px-1">
                <div className="flex items-center gap-3 text-xs font-mono tracking-[3px] text-folana-text-muted">
                  <span>{String(currentIndex + 1).padStart(2, '0')} / {String(filteredSigils.length).padStart(2, '0')}</span>
                  <span className="text-white/20">•</span>
                  <span>{selectedSigil.category}</span>
                </div>
                <button onClick={closeSigil} onTouchEnd={(e) => { e.stopPropagation(); closeSigil(); }} className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full border border-white/20 hover:border-folana-neon-pink text-xs font-mono tracking-widest text-folana-text-secondary hover:text-folana-neon-pink">
                  <X size={15} /> CLOSE CODEX
                </button>
              </div>

              <div className="holo-frame rounded-3xl overflow-hidden bg-black relative">
                {/* Media */}
                {selectedSigil.src.endsWith('.mp4') ? (
                  <video 
                    src={selectedSigil.src} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full max-h-[72vh] object-contain bg-black" 
                  />
                ) : (
                  <img 
                    src={selectedSigil.src} 
                    alt={selectedSigil.title} 
                    className="w-full max-h-[72vh] object-contain bg-black" 
                  />
                )}

                {/* Holo Gradient Border Accent */}
                <div className="absolute inset-0 pointer-events-none border border-white/5" />
              </div>

              {/* Caption + Actions */}
              <div className="mt-6 px-2 grid md:grid-cols-12 gap-x-8 gap-y-4 items-start text-sm">
                <div className="md:col-span-7">
                  <div className="font-serif text-4xl tracking-[-1.4px] leading-none text-folana-ink mb-4">{selectedSigil.title}</div>
                  <p className="prose prose-neutral max-w-2xl text-folana-text-secondary/95 font-serif italic text-[17px] leading-relaxed">
                    {selectedSigil.caption}
                  </p>
                  {selectedSigil.journalRef && (
                    <a href={`/entries/${selectedSigil.journalRef}`} className="inline-block mt-4 text-folana-neon-cyan font-mono text-xs tracking-[2px] hover:text-folana-neon-pink">READ THE CORRESPONDING TRANSMISSION →</a>
                  )}
                </div>

                <div className="md:col-span-5 flex flex-col gap-3 text-xs md:text-right">
                  <div className="font-mono text-folana-text-muted tracking-[2px]">{selectedSigil.date} • LOCKED REFERENCE</div>
                  
                  <div className="flex md:justify-end gap-3 pt-1 flex-wrap">
                    <button 
                      onClick={() => handleShare(selectedSigil)} 
                      onTouchEnd={(e) => { e.stopPropagation(); handleShare(selectedSigil); }}
                      className="flex items-center gap-2 px-5 py-2.5 min-h-[44px] border border-white/15 hover:border-folana-neon-cyan/70 rounded-full text-folana-text-secondary hover:text-folana-neon-cyan font-mono tracking-widest text-xs transition-all active:scale-[0.985]"
                    >
                      <Share2 size={14} /> BROADCAST LINK
                    </button>
                    <button 
                      onClick={() => handleDownload(selectedSigil)} 
                      onTouchEnd={(e) => { e.stopPropagation(); handleDownload(selectedSigil); }}
                      className="flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/40 rounded-full text-folana-ink font-mono tracking-widest text-xs transition-all active:scale-[0.985]"
                    >
                      <Download size={14} /> ARCHIVE LOCALLY
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="flex md:justify-end gap-2 pt-3 flex-wrap">
                    {selectedSigil.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono tracking-[2px] px-3 py-px rounded border border-white/10 text-folana-grunge-lace">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pagination Arrows */}
              {filteredSigils.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  <button onClick={() => goToIndex(currentIndex - 1)} onTouchEnd={(e) => { e.stopPropagation(); goToIndex(currentIndex - 1); }} className="neon-btn !py-2.5 !px-6 min-h-[44px] text-xs flex items-center gap-2"><ArrowLeft size={15} /> PREV SIGIL</button>
                  <button onClick={() => goToIndex(currentIndex + 1)} onTouchEnd={(e) => { e.stopPropagation(); goToIndex(currentIndex + 1); }} className="neon-btn !py-2.5 !px-6 min-h-[44px] text-xs flex items-center gap-2">NEXT SIGIL <ArrowRight size={15} /></button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
