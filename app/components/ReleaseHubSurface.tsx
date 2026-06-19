import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Megaphone, Music3, Radio } from 'lucide-react';
import type { ArchiveItem } from '@/lib/archive';
import type { ProfileSignals } from '@/lib/profile-signals';
import { ArchiveFreshRail } from './archive/ArchiveSections';

type FeaturedRelease = {
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  mood: string;
  posterSrc?: string;
};

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
      <div className="mt-2 font-serif text-2xl tracking-[-1px] text-folana-ink">{value}</div>
      <div className="mt-2 font-mono text-[10px] tracking-[2px] text-folana-text-muted">{note}</div>
    </div>
  );
}

export function ReleaseHubSurface({
  featured,
  freshArchive,
  signals,
}: {
  featured: FeaturedRelease;
  freshArchive: ArchiveItem[];
  signals: ProfileSignals;
}) {
  const archiveLead = freshArchive[0];

  return (
    <section id="release-hub" className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="text-folana-neon-cyan tracking-[4px] font-mono text-xs mb-1">RELEASE HUB</div>
          <h2 className="font-serif text-6xl tracking-[-2.6px]">What is live now</h2>
        </div>
        <div className="max-w-xl text-sm font-serif italic text-folana-text-secondary">
          One page for the newest episode, the archive, syndication, music registration, and the fleet record that ties them together.
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {statusCard({
          label: 'FEATURED EPISODE',
          value: featured.title,
          note: `${featured.duration} • ${featured.mood}`,
        })}
        {statusCard({
          label: 'ARCHIVE',
          value: `${freshArchive.length} fresh`,
          note: archiveLead ? archiveLead.title : 'Newest items indexed',
        })}
        {statusCard({
          label: 'SYNDICATION',
          value: 'Queue ready',
          note: 'Social resurfacing and back-catalog distribution',
        })}
        {statusCard({
          label: 'MUSIC REGISTRATION',
          value: 'Staged',
          note: 'CD Baby / Spotify / YouTube Music lane',
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-white/10 bg-folana-surface/60 p-5 md:p-6">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[3px] text-folana-neon-pink">
            <Radio size={12} />
            FEATURED EPISODE
          </div>
          <div className="mt-3 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black">
              <div className="relative aspect-[4/5]">
                <Image
                  src={featured.posterSrc || '/brand/og-card-neutral.png'}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div>
              <div className="font-serif text-4xl tracking-[-1.6px] text-folana-ink">{featured.title}</div>
              <div className="mt-1 font-mono text-[10px] tracking-[3px] text-folana-text-muted">
                {featured.subtitle} • {featured.duration}
              </div>
              <p className="mt-4 max-w-2xl font-serif text-base italic leading-relaxed text-folana-text-secondary">
                {featured.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/folana/premium/ep251/" className="inline-flex items-center gap-2 rounded-full border border-folana-neon-pink/40 bg-folana-neon-pink/10 px-5 py-3 text-[10px] font-mono tracking-[3px] text-folana-neon-pink transition-colors hover:bg-folana-neon-pink/15">
                  OPEN PREMIUM
                  <ExternalLink size={13} />
                </Link>
                <Link href="/music" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[10px] font-mono tracking-[3px] text-white/80 transition-colors hover:border-folana-neon-cyan/40 hover:text-folana-neon-cyan">
                  VIEW MUSIC
                </Link>
              </div>
            </div>
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
          <div className="mt-3 font-serif text-3xl tracking-[-1.2px] text-folana-ink">Resurface the catalog without losing the release lane.</div>
          <p className="mt-3 max-w-xl font-serif italic text-folana-text-secondary">
            Keep the newest episode in front while older pieces re-enter through planned posts, clip reposts, and episode reminders.
          </p>
          <div className="mt-5 space-y-3 text-sm">
            {[
              ['New release clip', 'Post the featured cut and link the premium page'],
              ['Back-catalog resurfacing', 'Queue older episodes with a clear reason to click'],
              ['ACMI ack', `Fleet sync visible with ${signals.synthetic_resonance ?? 88}% resonance`],
            ].map(([label, detail]) => (
              <div key={label} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-folana-neon-cyan" />
                <div>
                  <div className="font-mono text-[10px] tracking-[3px] text-folana-text-muted">{label}</div>
                  <div className="mt-1 font-serif italic text-folana-text-secondary">{detail}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Link href="/archive" className="inline-flex items-center gap-2 rounded-full border border-folana-neon-cyan/40 bg-folana-neon-cyan/10 px-5 py-3 text-[10px] font-mono tracking-[3px] text-folana-neon-cyan transition-colors hover:bg-folana-neon-cyan/15">
              OPEN SYNDICATION SURFACES
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-folana-surface/60 p-5 md:p-6">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[3px] text-folana-neon-cyan">
            <Music3 size={12} />
            MUSIC REGISTRATION
          </div>
          <div className="mt-3 font-serif text-3xl tracking-[-1.2px] text-folana-ink">Treat distribution as part of release, not an afterthought.</div>
          <p className="mt-3 max-w-xl font-serif italic text-folana-text-secondary">
            CD Baby, Spotify, and YouTube Music live in the same release story as the page and the clip. The lane stays visible so the team can see whether a track is staged, pending, or published.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ['CD Baby', 'Prep / register'],
              ['Spotify', 'Metadata ready'],
              ['YouTube Music', 'Asset staged'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="font-mono text-[10px] tracking-[3px] text-folana-text-muted">{label}</div>
                <div className="mt-2 font-serif text-lg text-folana-ink">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/orchestrator" className="inline-flex items-center gap-2 rounded-full border border-folana-neon-pink/40 bg-folana-neon-pink/10 px-5 py-3 text-[10px] font-mono tracking-[3px] text-folana-neon-pink transition-colors hover:bg-folana-neon-pink/15">
              OPEN PROCESS NOTES
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
