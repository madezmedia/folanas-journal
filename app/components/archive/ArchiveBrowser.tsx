'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Music } from 'lucide-react';
import { BroadcastDialog } from '../BroadcastDialog';
import { ArchiveEmptyState, ArchiveFiltersBar, ArchiveFreshRail, ArchiveModalActions, ArchivePager, ArchiveResultsCount, ArchiveResultsGrid } from './ArchiveSections';
import { buildUnifiedArchive, getRelatedItems, getArchiveArcs, type ArchiveItem, type ArchiveItemType } from '@/lib/archive';
import { ARCHIVE_FRESH_COUNT, getArchivePagination, getFilteredArchiveItems, getFreshArchiveItems, parseArchiveBrowseQuery } from '@/lib/archive-view';

function buildUrl(basePath: string, params: URLSearchParams): string {
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function ArchiveBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = useMemo(() => parseArchiveBrowseQuery(new URLSearchParams(searchParams.toString())), [searchParams]);
  const allItems = useMemo(() => buildUnifiedArchive(), []);
  const arcs = useMemo(() => getArchiveArcs(), []);

  const filtered = useMemo(() => getFilteredArchiveItems(query, allItems), [allItems, query]);
  const pagination = useMemo(() => getArchivePagination(filtered, query.page), [filtered, query.page]);
  const freshItems = useMemo(() => getFreshArchiveItems(ARCHIVE_FRESH_COUNT), []);

  const selectedItem = useMemo(() => {
    if (!query.id) return null;
    return filtered.find(item => item.id === query.id) ?? allItems.find(item => item.id === query.id) ?? null;
  }, [allItems, filtered, query.id]);

  const currentIndex = selectedItem ? filtered.findIndex(item => item.id === selectedItem.id) : -1;
  const relatedItems = useMemo(() => (selectedItem ? getRelatedItems(selectedItem) : []), [selectedItem]);
  const [broadcastOpen, setBroadcastOpen] = useState(false);

  const updateQuery = (updates: Record<string, string | null | undefined>, replace = true) => {
    const next = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === undefined || value === '') {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }

    router[replace ? 'replace' : 'push'](buildUrl(pathname, next), { scroll: false });
  };

  const openItem = (item: ArchiveItem) => {
    updateQuery({ id: item.id }, false);
  };

  const closeItem = () => {
    updateQuery({ id: null }, false);
  };

  const navigate = (direction: 1 | -1) => {
    if (filtered.length === 0 || currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + filtered.length) % filtered.length;
    updateQuery({ id: filtered[nextIndex].id }, false);
  };

  const handleSearchChange = (value: string) => {
    updateQuery({ q: value || null, page: '1' });
  };

  const handleTypeChange = (value: ArchiveItemType | 'all') => {
    updateQuery({ type: value === 'all' ? null : value, page: '1' });
  };

  const handleArcChange = (value: string) => {
    updateQuery({ arc: value || null, page: '1' });
  };

  const handlePageChange = (page: number) => {
    updateQuery({ page: String(Math.max(1, Math.min(pagination.totalPages, page))) }, false);
  };

  const selectedJournalHref = selectedItem?.journalRef ? `/entries/${selectedItem.journalRef}` : undefined;

  return (
    <div className="space-y-8">
      <ArchiveFreshRail
        items={freshItems}
        title="FRESHEST UPDATES"
        eyebrow="Newest-first archive rail"
        summary="Auto-sorted by latest date"
        onItemSelect={openItem}
      />

      <ArchiveFiltersBar
        search={query.q}
        typeFilter={query.type}
        arcFilter={query.arc}
        arcs={arcs}
        onSearchChange={handleSearchChange}
        onTypeChange={handleTypeChange}
        onArcChange={handleArcChange}
      />

      <ArchiveResultsCount
        start={filtered.length === 0 ? 0 : pagination.pageStart + 1}
        end={filtered.length === 0 ? 0 : Math.min(pagination.pageEnd, filtered.length)}
        total={filtered.length}
      />

      {filtered.length > 0 ? (
        <ArchiveResultsGrid items={pagination.pageItems} onItemSelect={openItem} />
      ) : (
        <ArchiveEmptyState
          title="NO RESULTS"
          body="No archive items match your current filters. Try adjusting your search or clearing filters."
        />
      )}

      <ArchivePager
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        pageWindow={pagination.pageWindow}
        onPageChange={handlePageChange}
      />

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
                  <div className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-mono tracking-[2px] border rounded-full ${selectedItem.type === 'music-audio' ? 'bg-folana-neon-pink/10 text-folana-neon-pink border-folana-neon-pink/30' : selectedItem.type === 'music-video' ? 'bg-folana-neon-cyan/10 text-folana-neon-cyan border-folana-neon-cyan/30' : 'bg-folana-neon-magenta/10 text-folana-neon-magenta border-folana-neon-magenta/30'}`}>
                    {selectedItem.type.toUpperCase()}
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-4 bg-folana-surface/80">
                  <div>
                    <div className="font-serif text-3xl tracking-[-1px] text-folana-ink">{selectedItem.title}</div>
                    <div className="font-mono text-xs tracking-[2px] text-folana-text-muted mt-1">{selectedItem.mood} {selectedItem.duration ? `• ${selectedItem.duration}` : ''}</div>
                  </div>
                  <p className="text-sm text-folana-text-secondary/90 font-serif italic leading-relaxed">{selectedItem.description}</p>

                  {selectedItem.audioSrc && (
                    <div className="pt-2">
                      <div className="text-[10px] font-mono tracking-[2px] text-folana-neon-cyan mb-2">LISTEN</div>
                      <audio controls className="w-full accent-folana-neon-pink" src={selectedItem.audioSrc}>Your browser does not support the audio element.</audio>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedItem.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono tracking-[1.5px] px-2 py-px bg-white/5 border border-white/10 rounded text-folana-grunge-lace">{tag}</span>
                    ))}
                  </div>

                  <ArchiveModalActions
                    relatedItems={relatedItems}
                    onRelatedItemSelect={openItem}
                    onBroadcast={() => setBroadcastOpen(true)}
                    journalHref={selectedJournalHref}
                  />

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
                </div>
              </div>

              {filtered.length > 1 && currentIndex !== -1 && (
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
