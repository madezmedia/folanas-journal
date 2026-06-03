'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Music, Image, Film, ArrowLeft, ArrowRight, ExternalLink, Share2 } from 'lucide-react';
import { buildUnifiedArchive, getRelatedItems, searchArchive, filterByArc, getArchiveArcs, type ArchiveItem, type ArchiveItemType } from '@/lib/archive';
import { BroadcastDialog } from './BroadcastDialog';

const TYPE_FILTERS: { label: string; value: ArchiveItemType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Music', value: 'music-audio' },
  { label: 'Video', value: 'music-video' },
  { label: 'Visual Codex', value: 'visual-codex' },
];

function typeIcon(type: ArchiveItemType) {
  switch (type) {
    case 'music-audio': return <Music size={14} />;
    case 'music-video': return <Film size={14} />;
    case 'visual-codex': return <Image size={14} />;
    default: return null;
  }
}

function typeBadge(type: ArchiveItemType) {
  const styles: Record<string, string> = {
    'music-audio': 'bg-folana-neon-pink/10 text-folana-neon-pink border-folana-neon-pink/30',
    'music-video': 'bg-folana-neon-cyan/10 text-folana-neon-cyan border-folana-neon-cyan/30',
    'visual-codex': 'bg-folana-neon-magenta/10 text-folana-neon-magenta border-folana-neon-magenta/30',
    'prototype': 'bg-white/5 text-folana-text-muted border-white/20',
  };
  return styles[type] || styles.prototype;
}

export function ArchiveGrid() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<ArchiveItemType | 'all'>('all');
  const [arcFilter, setArcFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);
  const [relatedItems, setRelatedItems] = useState<ArchiveItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [broadcastOpen, setBroadcastOpen] = useState(false);

  const allItems = useMemo(() => buildUnifiedArchive(), []);
  const arcs = useMemo(() => getArchiveArcs(), []);

  const filtered = useMemo(() => {
    let items = search ? searchArchive(search) : allItems;
    if (typeFilter !== 'all') items = items.filter(i => i.type === typeFilter);
    if (arcFilter) items = filterByArc(arcFilter).filter(i => items.some(x => x.id === i.id));
    return items;
  }, [search, typeFilter, arcFilter, allItems]);

  const openItem = (item: ArchiveItem) => {
    const idx = filtered.findIndex(i => i.id === item.id);
    setSelectedItem(item);
    setCurrentIndex(idx);
    setRelatedItems(getRelatedItems(item));
  };

  const closeItem = () => {
    setSelectedItem(null);
    setRelatedItems([]);
  };

  const navigate = (dir: 1 | -1) => {
    const next = (currentIndex + dir + filtered.length) % filtered.length;
    setCurrentIndex(next);
    setSelectedItem(filtered[next]);
    setRelatedItems(getRelatedItems(filtered[next]));
  };

  return (
    <div className="space-y-8">
      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-folana-text-muted" />
          <input
            type="text"
            placeholder="Search archive by title, tags, mood..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-folana-surface/80 border border-white/10 text-white placeholder-folana-text-muted/60 text-sm font-mono tracking-wide focus:outline-none focus:border-folana-neon-pink/50 focus:ring-1 focus:ring-folana-neon-pink/20 transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setTypeFilter(f.value)}
              className={`px-4 py-2 text-xs font-mono tracking-[2px] rounded-full border transition-all ${typeFilter === f.value ? 'bg-folana-neon-pink text-black border-folana-neon-pink' : 'border-white/15 hover:border-folana-neon-pink/70 text-folana-text-secondary hover:text-folana-ink'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Arc filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setArcFilter('')}
          className={`px-3 py-1 text-[10px] font-mono tracking-[2px] rounded-full border transition-all ${!arcFilter ? 'bg-folana-neon-cyan/20 text-folana-neon-cyan border-folana-neon-cyan/50' : 'border-white/10 text-folana-text-muted hover:text-folana-ink'}`}
        >
          ALL ARCS
        </button>
        {arcs.slice(0, 15).map(arc => (
          <button
            key={arc}
            onClick={() => setArcFilter(arcFilter === arc ? '' : arc)}
            className={`px-3 py-1 text-[10px] font-mono tracking-[2px] rounded-full border transition-all ${arcFilter === arc ? 'bg-folana-neon-cyan/20 text-folana-neon-cyan border-folana-neon-cyan/50' : 'border-white/10 text-folana-text-muted hover:text-folana-ink'}`}
          >
            {arc.replace(/-/g, ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="text-xs font-mono tracking-[2px] text-folana-text-muted">
        Showing {filtered.length} of {allItems.length} archive items
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(item => (
          <motion.button
            key={item.id}
            layout
            onClick={() => openItem(item)}
            whileHover={{ y: -3 }}
            className="group holo-frame rounded-3xl overflow-hidden text-left bg-folana-surface block focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
          >
            <div className="relative aspect-[16/9] bg-black">
              {item.src ? (
                <img
                  src={item.src || item.posterSrc}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 scale-[1.01] group-hover:scale-100"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-folana-void">
                  <Music size={32} className="text-folana-text-muted/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/95" />
              <div className="absolute top-3 left-3 flex gap-1.5">
                <div className={`px-3 py-px text-[9px] font-mono tracking-[2px] border rounded-full ${typeBadge(item.type)}`}>
                  <span className="flex items-center gap-1.5">
                    {typeIcon(item.type)}
                    {item.type === 'music-audio' ? 'AUDIO' : item.type === 'music-video' ? 'VIDEO' : 'CODEX'}
                  </span>
                </div>
                {item.needsVideo && (
                  <div className="px-2 py-px text-[9px] font-mono tracking-[1.5px] border rounded-full bg-amber-500/10 text-amber-400 border-amber-500/30">
                    NEEDS VIDEO
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="font-serif text-lg tracking-[-0.4px] text-folana-ink group-hover:text-folana-neon-pink transition-colors line-clamp-1">{item.title}</div>
              <div className="font-mono text-[10px] tracking-[1.5px] text-folana-text-muted">
                {item.mood} {item.duration ? `• ${item.duration}` : ''}
              </div>
              <p className="text-xs leading-snug text-folana-text-secondary/80 line-clamp-2 font-serif italic">{item.description}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {item.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[9px] font-mono tracking-[1px] px-2 py-px bg-white/5 rounded text-folana-text-muted">{tag}</span>
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
          <div className="font-mono text-xs tracking-[3px] text-folana-text-muted mb-3">NO RESULTS</div>
          <p className="text-folana-text-secondary text-sm max-w-md mx-auto">No archive items match your current filters. Try adjusting your search or clearing filters.</p>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 md:p-8" onClick={closeItem}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 30 }}
              transition={{ ease: [0.21, 0.92, 0.3, 1], duration: 0.38 }}
              className="relative w-full max-w-5xl"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={closeItem} className="absolute -top-3 -right-3 z-10 w-12 h-12 rounded-full bg-folana-void border border-white/20 flex items-center justify-center text-folana-text-secondary hover:text-white hover:border-folana-neon-pink transition-all">
                <X size={19} />
              </button>

              <div className="holo-frame rounded-[22px] overflow-hidden border border-white/10 bg-black">
                {/* Media */}
                <div className="relative bg-black max-h-[60vh] flex items-center justify-center">
                  {selectedItem.src ? (
                    selectedItem.src.endsWith('.mp4') ? (
                      <video src={selectedItem.src} controls autoPlay muted loop playsInline className="max-h-[58vh] w-full object-contain" />
                    ) : (
                      <img src={selectedItem.src || selectedItem.posterSrc} alt={selectedItem.title} className="max-h-[58vh] w-full object-contain" />
                    )
                  ) : (
                    <div className="flex items-center justify-center h-48 text-folana-text-muted/40">
                      <Music size={48} />
                    </div>
                  )}
                  <div className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-mono tracking-[2px] border rounded-full ${typeBadge(selectedItem.type)}`}>
                    {selectedItem.type.toUpperCase()}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 md:p-8 space-y-4 bg-folana-surface/80">
                  <div>
                    <div className="font-serif text-3xl tracking-[-1px] text-folana-ink">{selectedItem.title}</div>
                    <div className="font-mono text-xs tracking-[2px] text-folana-text-muted mt-1">{selectedItem.mood} {selectedItem.duration ? `• ${selectedItem.duration}` : ''}</div>
                  </div>
                  <p className="text-sm text-folana-text-secondary/90 font-serif italic leading-relaxed">{selectedItem.description}</p>

                  {/* Audio player */}
                  {selectedItem.audioSrc && (
                    <div className="pt-2">
                      <div className="text-[10px] font-mono tracking-[2px] text-folana-neon-cyan mb-2">LISTEN</div>
                      <audio controls className="w-full accent-folana-neon-pink" src={selectedItem.audioSrc}>Your browser does not support the audio element.</audio>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedItem.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono tracking-[1.5px] px-2 py-px bg-white/5 border border-white/10 rounded text-folana-grunge-lace">{tag}</span>
                    ))}
                  </div>

                  {/* Cross-reference: Related Archive Items */}
                  {/* Broadcast button */}
                  {selectedItem && (
                    <div className="pt-2">
                      <button
                        onClick={() => setBroadcastOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-[2px] border border-folana-neon-cyan/40 hover:bg-folana-neon-cyan/10 text-folana-neon-cyan rounded-full transition-all active:scale-[0.985]"
                      >
                        <Share2 size={14} /> BROADCAST TO SOCIAL
                      </button>
                    </div>
                  )}

                  {/* Broadcast Dialog */}
                  {selectedItem && (
                    <BroadcastDialog
                      isOpen={broadcastOpen}
                      onClose={() => setBroadcastOpen(false)}
                      title={selectedItem.title}
                      caption={selectedItem.description}
                      imageUrl={selectedItem.src || selectedItem.posterSrc}
                      link={selectedItem.journalRef ? `/entries/${selectedItem.journalRef}` : `/archive?id=${selectedItem.id}`}
                    />
                  )}

                  {relatedItems.length > 0 && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-[10px] font-mono tracking-[3px] text-folana-neon-cyan mb-3">RELATED ARCHIVE ITEMS ({relatedItems.length})</div>
                      <div className="flex flex-wrap gap-3">
                        {relatedItems.slice(0, 6).map(rel => (
                          <button
                            key={rel.id}
                            onClick={() => openItem(rel)}
                            className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono tracking-[1.5px] border border-white/10 hover:border-folana-neon-cyan/50 rounded-full text-folana-text-muted hover:text-folana-neon-cyan transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-folana-neon-cyan/60" />
                            {rel.title.length > 30 ? rel.title.slice(0, 30) + '…' : rel.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Journal link */}
                  {selectedItem.journalRef && (
                    <div className="pt-2">
                      <Link
                        href={`/entries/${selectedItem.journalRef}`}
                        className="inline-flex items-center gap-2 text-xs font-mono tracking-[2px] text-folana-neon-cyan hover:text-folana-neon-pink transition-colors"
                      >
                        <ExternalLink size={14} /> READ THE CORRESPONDING TRANSMISSION →
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Pagination */}
              {filtered.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button onClick={() => navigate(-1)} className="neon-btn !py-2.5 !px-6 text-xs flex items-center gap-2"><ArrowLeft size={15} /> PREV</button>
                  <span className="text-xs font-mono text-folana-text-muted">{currentIndex + 1} / {filtered.length}</span>
                  <button onClick={() => navigate(1)} className="neon-btn !py-2.5 !px-6 text-xs flex items-center gap-2">NEXT <ArrowRight size={15} /></button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
