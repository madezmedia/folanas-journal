'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Film, Image as ImageIcon, Music, Search, Share2 } from 'lucide-react';
import type { ArchiveItem, ArchiveItemType } from '@/lib/archive';

const TYPE_FILTERS: { label: string; value: ArchiveItemType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Music', value: 'music-audio' },
  { label: 'Video', value: 'music-video' },
  { label: 'Visual Codex', value: 'visual-codex' },
];

function typeIcon(type: ArchiveItemType) {
  switch (type) {
    case 'music-audio':
      return <Music size={14} />;
    case 'music-video':
      return <Film size={14} />;
    case 'visual-codex':
      return <ImageIcon size={14} />;
    default:
      return null;
  }
}

function typeBadge(type: ArchiveItemType) {
  const styles: Record<string, string> = {
    'music-audio': 'bg-folana-neon-pink/10 text-folana-neon-pink border-folana-neon-pink/30',
    'music-video': 'bg-folana-neon-cyan/10 text-folana-neon-cyan border-folana-neon-cyan/30',
    'visual-codex': 'bg-folana-neon-magenta/10 text-folana-neon-magenta border-folana-neon-magenta/30',
    prototype: 'bg-white/5 text-folana-text-muted border-white/20',
  };
  return styles[type] || styles.prototype;
}

function typeLabel(type: ArchiveItemType) {
  if (type === 'music-audio') return 'AUDIO';
  if (type === 'music-video') return 'VIDEO';
  if (type === 'visual-codex') return 'CODEX';
  return 'PROTOTYPE';
}

export function ArchiveFreshRail({
  items,
  title = 'FRESHEST UPDATES',
  eyebrow = 'Newest-first archive rail',
  summary = 'Auto-sorted by latest date',
  actionHref = '/archive',
  actionLabel = 'OPEN FULL ARCHIVE',
  onItemSelect,
}: {
  items: ArchiveItem[];
  title?: string;
  eyebrow?: string;
  summary?: string;
  actionHref?: string;
  actionLabel?: string;
  onItemSelect?: (item: ArchiveItem) => void;
}) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-folana-surface/60 p-5 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="font-mono text-[10px] tracking-[4px] text-folana-neon-cyan">{title}</div>
          <h3 className="mt-2 font-serif text-3xl tracking-[-1.2px] text-folana-ink">{eyebrow}</h3>
        </div>
        <div className="font-mono text-[10px] tracking-[3px] text-folana-text-muted">{summary}</div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.map(item => {
          const content = (
            <>
              <div className="flex items-center justify-between gap-3">
                <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-mono tracking-[2px] ${typeBadge(item.type)}`}>
                  {typeIcon(item.type)}
                  {typeLabel(item.type)}
                </div>
                <div className="font-mono text-[9px] tracking-[2px] text-folana-text-muted">{item.date}</div>
              </div>
              <div className="mt-3 font-serif text-lg leading-tight tracking-[-0.4px] text-folana-ink group-hover:text-folana-neon-pink transition-colors">
                {item.title}
              </div>
              <div className="mt-1 font-mono text-[10px] tracking-[1.5px] text-folana-text-muted">
                {item.mood}
              </div>
            </>
          );

          return onItemSelect ? (
            <button
              key={item.id}
              onClick={() => onItemSelect(item)}
              className="group rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition-all hover:border-folana-neon-cyan/40 hover:bg-white/[0.03]"
            >
              {content}
            </button>
          ) : (
            <Link
              key={item.id}
              href={`/archive?id=${encodeURIComponent(item.id)}`}
              className="group rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition-all hover:border-folana-neon-cyan/40 hover:bg-white/[0.03]"
            >
              {content}
            </Link>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] font-mono tracking-[3px] text-folana-text-muted">
          New items surface first and open straight into the archive view.
        </p>
        <Link href={actionHref} className="inline-flex items-center gap-2 rounded-full border border-folana-neon-cyan/40 bg-folana-neon-cyan/10 px-5 py-2 text-[10px] font-mono tracking-[3px] text-folana-neon-cyan transition-colors hover:bg-folana-neon-cyan/15">
          {actionLabel}
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

export function ArchiveFiltersBar({
  search,
  typeFilter,
  arcFilter,
  arcs,
  onSearchChange,
  onTypeChange,
  onArcChange,
}: {
  search: string;
  typeFilter: ArchiveItemType | 'all';
  arcFilter: string;
  arcs: string[];
  onSearchChange: (value: string) => void;
  onTypeChange: (value: ArchiveItemType | 'all') => void;
  onArcChange: (value: string) => void;
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-folana-text-muted" />
          <input
            type="text"
            placeholder="Search title, tag, or mood"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-folana-surface/80 border border-white/10 text-white placeholder-folana-text-muted/60 text-sm font-mono tracking-wide focus:outline-none focus:border-folana-neon-pink/50 focus:ring-1 focus:ring-folana-neon-pink/20 transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => onTypeChange(f.value)}
              className={`px-4 py-2 text-xs font-mono tracking-[2px] rounded-full border transition-all ${typeFilter === f.value ? 'bg-folana-neon-pink text-black border-folana-neon-pink' : 'border-white/15 hover:border-folana-neon-pink/70 text-folana-text-secondary hover:text-folana-ink'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onArcChange('')}
          className={`px-3 py-1 text-[10px] font-mono tracking-[2px] rounded-full border transition-all ${!arcFilter ? 'bg-folana-neon-cyan/20 text-folana-neon-cyan border-folana-neon-cyan/50' : 'border-white/10 text-folana-text-muted hover:text-folana-ink'}`}
        >
          ALL ARCS
        </button>
        {arcs.slice(0, 15).map(arc => (
          <button
            key={arc}
            onClick={() => onArcChange(arcFilter === arc ? '' : arc)}
            className={`px-3 py-1 text-[10px] font-mono tracking-[2px] rounded-full border transition-all ${arcFilter === arc ? 'bg-folana-neon-cyan/20 text-folana-neon-cyan border-folana-neon-cyan/50' : 'border-white/10 text-folana-text-muted hover:text-folana-ink'}`}
          >
            {arc.replace(/-/g, ' ').toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}

export function ArchiveResultsCount({
  start,
  end,
  total,
}: {
  start: number;
  end: number;
  total: number;
}) {
  return (
    <div className="text-xs font-mono tracking-[2px] text-folana-text-muted">
      {total === 0
        ? 'No archive items shown'
        : `Showing ${start}-${end} of ${total}`}
    </div>
  );
}

export function ArchiveResultsGrid({
  items,
  onItemSelect,
}: {
  items: ArchiveItem[];
  onItemSelect: (item: ArchiveItem) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map(item => (
        <motion.button
          key={item.id}
          layout
          onClick={() => onItemSelect(item)}
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
                  {typeLabel(item.type)}
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
  );
}

export function ArchivePager({
  currentPage,
  totalPages,
  pageWindow,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  pageWindow: number[];
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 pt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-mono tracking-[2px] text-folana-text-muted transition-colors hover:border-folana-neon-cyan hover:text-folana-neon-cyan disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft size={14} />
          PREV
        </button>

        {pageWindow[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="rounded-full border border-white/15 px-3 py-2 text-xs font-mono tracking-[2px] text-folana-text-muted transition-colors hover:border-folana-neon-cyan hover:text-folana-neon-cyan"
            >
              1
            </button>
            <span className="px-1 text-folana-text-muted">...</span>
          </>
        )}

        {pageWindow.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`min-w-10 rounded-full border px-3 py-2 text-xs font-mono tracking-[2px] transition-colors ${
              number === currentPage
                ? 'border-folana-neon-pink bg-folana-neon-pink text-black'
                : 'border-white/15 text-folana-text-muted hover:border-folana-neon-pink hover:text-folana-ink'
            }`}
          >
            {number}
          </button>
        ))}

        {pageWindow[pageWindow.length - 1] < totalPages && (
          <>
            <span className="px-1 text-folana-text-muted">...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className="rounded-full border border-white/15 px-3 py-2 text-xs font-mono tracking-[2px] text-folana-text-muted transition-colors hover:border-folana-neon-cyan hover:text-folana-neon-cyan"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-mono tracking-[2px] text-folana-text-muted transition-colors hover:border-folana-neon-cyan hover:text-folana-neon-cyan disabled:cursor-not-allowed disabled:opacity-40"
        >
          NEXT
          <ArrowRight size={14} />
        </button>
      </div>
      <div className="font-mono text-[10px] tracking-[3px] text-folana-text-muted">
        PAGE {currentPage} OF {totalPages} • NEWEST ITEMS FIRST
      </div>
    </div>
  );
}

export function ArchiveEmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
      <div className="font-mono text-xs tracking-[3px] text-folana-text-muted mb-3">{title}</div>
      <p className="text-folana-text-secondary text-sm max-w-md mx-auto">{body}</p>
    </div>
  );
}

export function ArchiveModalActions({
  relatedItems,
  onRelatedItemSelect,
  onBroadcast,
  journalHref,
}: {
  relatedItems: ArchiveItem[];
  onRelatedItemSelect: (item: ArchiveItem) => void;
  onBroadcast: () => void;
  journalHref?: string;
}) {
  return (
    <>
      <div className="pt-2">
        <button
          onClick={onBroadcast}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-[2px] border border-folana-neon-cyan/40 hover:bg-folana-neon-cyan/10 text-folana-neon-cyan rounded-full transition-all active:scale-[0.985]"
        >
          <Share2 size={14} /> BROADCAST TO SOCIAL
        </button>
      </div>

      {relatedItems.length > 0 && (
        <div className="pt-4 border-t border-white/10">
          <div className="text-[10px] font-mono tracking-[3px] text-folana-neon-cyan mb-3">RELATED ARCHIVE ITEMS ({relatedItems.length})</div>
          <div className="flex flex-wrap gap-3">
            {relatedItems.slice(0, 6).map(rel => (
              <button
                key={rel.id}
                onClick={() => onRelatedItemSelect(rel)}
                className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono tracking-[1.5px] border border-white/10 hover:border-folana-neon-cyan/50 rounded-full text-folana-text-muted hover:text-folana-neon-cyan transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-folana-neon-cyan/60" />
                {rel.title.length > 30 ? `${rel.title.slice(0, 30)}…` : rel.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {journalHref && (
        <div className="pt-2">
          <Link
            href={journalHref}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[2px] text-folana-neon-cyan hover:text-folana-neon-pink transition-colors"
          >
            <ExternalLink size={14} /> READ THE CORRESPONDING TRANSMISSION →
          </Link>
        </div>
      )}
    </>
  );
}
