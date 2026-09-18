import Link from 'next/link';
import { ArrowRight, Megaphone, Music3, Radio } from 'lucide-react';
import type { ArchiveItem } from '@/lib/archive';
import type { RealTrack } from '@/lib/music-manifest';
import { ArchiveFreshRail } from './archive/ArchiveSections';

function statusCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="font-mono text-[10px] tracking-[3px] text-folana-text-muted">{label}</div>
      <div className="mt-2 break-words font-serif text-xl tracking-[-1px] text-folana-ink sm:text-2xl">{value}</div>
      <div className="mt-2 font-mono text-[10px] tracking-[2px] text-folana-text-muted">{note}</div>
    </div>
  );
}

export function ReleaseHubSurface({
  featured,
  freshArchive,
}: {
  featured: RealTrack;
  freshArchive: ArchiveItem[];
}) {
  const archiveLead = freshArchive[0];

  return (
    <section id="release-hub" className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="mb-1 font-mono text-xs tracking-[4px] text-folana-neon-cyan">RELEASE HUB</div>
          <h2 className="font-serif text-3xl tracking-tight sm:text-5xl md:text-6xl md:tracking-[-2.6px]">What is live now</h2>
        </div>
        <div className="max-w-xl font-serif text-sm italic text-folana-text-secondary">
          One page for the newest drop, the archive, and the lanes that keep Folana moving.
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {statusCard({
          label: 'FEATURED DROP',
          value: featured.title,
          note: `${featured.duration} • ${featured.mood}`,
        })}
        {statusCard({
          label: 'ARCHIVE',
          value: `${freshArchive.length} fresh`,
          note: archiveLead ? archiveLead.title : 'Newest items indexed',
        })}
        {statusCard({
          label: 'LISTEN',
          value: featured.audioSrc ? 'Audio live' : 'Stills live',
          note: featured.videoSrc ? 'Video in the Sonic Vault' : 'MV coming @folana_music',
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0 rounded-[2rem] border border-white/10 bg-folana-surface/60 p-4 md:p-6">
          <div className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[3px] text-folana-neon-pink">
            <Radio size={12} />
            FEATURED
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
            <div className="relative aspect-[16/9]">
              <img
                src={featured.posterSrc || featured.gallerySrcs?.[0] || '/brand/og-card-neutral.png'}
                alt={featured.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute left-3 top-3 rounded-full border border-folana-neon-pink/50 bg-black/70 px-3 py-1 font-mono text-[10px] tracking-[2px] text-folana-neon-pink">
                REAL
              </div>
            </div>
            {featured.gallerySrcs && featured.gallerySrcs.length > 1 && (
              <div className="grid grid-cols-3 gap-1 bg-black p-1">
                {featured.gallerySrcs.slice(0, 3).map((src, index) => (
                  <div key={src} className="relative aspect-[16/9] overflow-hidden rounded-lg">
                    <img src={src} alt={`Q0${index + 1}`} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 font-serif text-2xl tracking-tight text-folana-ink sm:text-3xl">{featured.title}</div>
          <div className="mt-1 font-mono text-[10px] tracking-[2px] text-folana-text-muted">
            {featured.subtitle} • {featured.duration}
          </div>
          <p className="mt-3 font-serif text-sm italic text-folana-text-secondary">{featured.description}</p>
          <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-black/30 px-4 py-3">
            <div className="font-mono text-[10px] tracking-[2px] text-folana-neon-pink">MUSIC VIDEO</div>
            <p className="mt-1 text-sm text-folana-text-secondary">MV coming @folana_music</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/music" className="inline-flex items-center gap-2 rounded-full border border-folana-neon-pink/40 bg-folana-neon-pink/10 px-5 py-3 text-[10px] font-mono tracking-[3px] text-folana-neon-pink transition-colors hover:bg-folana-neon-pink/15">
              LISTEN ON MUSIC
            </Link>
            <Link href="#sonic" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[10px] font-mono tracking-[3px] text-white/80 transition-colors hover:border-folana-neon-cyan/40 hover:text-folana-neon-cyan">
              OPEN VAULT
            </Link>
          </div>
        </div>

        <ArchiveFreshRail
          items={freshArchive}
          title="ARCHIVE"
          eyebrow="Newest archive items first"
          summary="The back catalog stays visible"
          actionHref="/archive"
          actionLabel="OPEN ARCHIVE"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-folana-surface/60 p-5 md:p-6">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[3px] text-folana-neon-cyan">
            <Megaphone size={12} />
            SOCIAL / SYNDICATION
          </div>
          <div className="mt-3 font-serif text-2xl tracking-[-1.2px] text-folana-ink sm:text-3xl">Resurface the catalog without losing the release lane.</div>
          <p className="mt-3 max-w-xl font-serif italic text-folana-text-secondary">
            Keep the newest drop in front while older pieces re-enter through planned posts, clip reposts, and episode reminders.
          </p>
          <div className="mt-5">
            <Link href="/archive" className="inline-flex items-center gap-2 rounded-full border border-folana-neon-cyan/40 bg-folana-neon-cyan/10 px-5 py-3 text-[10px] font-mono tracking-[3px] text-folana-neon-cyan transition-colors hover:bg-folana-neon-cyan/15">
              OPEN ARCHIVE
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-folana-surface/60 p-5 md:p-6">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[3px] text-folana-neon-cyan">
            <Music3 size={12} />
            MUSIC
          </div>
          <div className="mt-3 font-serif text-2xl tracking-[-1.2px] text-folana-ink sm:text-3xl">QUANTUM first. Fracture next. Older arcs stay in the catalog.</div>
          <p className="mt-3 max-w-xl font-serif italic text-folana-text-secondary">
            The music page leads with real productions. Canopy, Threshold, and the rest of the pipeline live under Older arcs.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/music" className="inline-flex items-center gap-2 rounded-full border border-folana-neon-pink/40 bg-folana-neon-pink/10 px-5 py-3 text-[10px] font-mono tracking-[3px] text-folana-neon-pink transition-colors hover:bg-folana-neon-pink/15">
              OPEN MUSIC
            </Link>
            <Link href="/inner-circle" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[10px] font-mono tracking-[3px] text-white/80 transition-colors hover:border-folana-neon-cyan/40 hover:text-folana-neon-cyan">
              AUDIENCE LANE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
