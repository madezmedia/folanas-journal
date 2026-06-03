'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { SIGILS, CATEGORIES, type Sigil } from '@/lib/sigils';

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
