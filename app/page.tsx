import Link from 'next/link';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { SonicVault } from './components/SonicPlayer';
import { ThoughtCard } from './components/ThoughtCard';
import { MusicFirstHero } from './components/MusicFirstHero';
import { AcmiLiveFeed } from './components/AcmiLiveFeed';
import { ReleaseHubSurface } from './components/ReleaseHubSurface';
import { getSortedJournalEntries } from '@/lib/journal';
import { getProfileSignals } from '@/lib/profile-signals';
import { getFreshArchiveItems } from '@/lib/archive-view';
import { REAL_PRODUCTIONS } from '@/lib/music-manifest';
import { isAcmiConfigured } from '@/lib/acmi';
import type { JournalEntry } from '@/lib/journal';
import type { ProfileSignals } from '@/lib/profile-signals';

export default async function FolanasJournal() {
  let allEntries: JournalEntry[] = [];
  let signals: ProfileSignals = {
    id: 'folana',
    display_name: 'Folana',
    handle: '@folana_music',
    avatar_url: '/images/folana-avatar.jpg',
    hero_image_url: '/images/folana-hero.jpg',
    reach_label: null,
    influence_label: null,
    synthetic_resonance: null,
    holographic_engagement: null,
    current_mood: null,
    bio: null,
    metrics: null,
    compositions: null,
  };

  try {
    allEntries = await getSortedJournalEntries();
  } catch (error) {
    console.error('[Home] getSortedJournalEntries failed:', error);
  }

  try {
    signals = await getProfileSignals();
  } catch {
    console.warn('[Home] getProfileSignals failed, using defaults');
  }

  const latestThoughts = allEntries.slice(0, 3).map(entry => ({
    id: entry.id,
    title: entry.title,
    excerpt: (entry.content || '').replace(/<[^>]+>/g, '').slice(0, 168) + (entry.content && entry.content.length > 168 ? '…' : ''),
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase(),
    mood: entry.mood ?? 'REFLECTIVE',
    tags: 'tags' in entry && Array.isArray(entry.tags) ? entry.tags : ['static', 'transmission'],
    imageUrl: entry.image_url || (entry.media_urls && entry.media_urls[0]) || undefined,
    href: `/entries/${entry.id}`,
  }));

  const freshArchive = getFreshArchiveItems(4);
  const featured = REAL_PRODUCTIONS[0] || {
    id: 'latest-release',
    title: 'THE FOREST SPEAKS',
    subtitle: 'LATEST RELEASE',
    description: 'The latest release is live.',
    duration: '—',
    mood: 'LIVE',
    posterSrc: '/brand/og-card-neutral.png',
    isRealProduction: true as const,
    tags: [],
  };

  return (
    <>
      <Nav />

      <MusicFirstHero />

      <div className="pointer-events-none sticky top-20 z-40 border-b border-white/10 bg-folana-surface/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1480px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 sm:px-6 sm:py-5">
          <div className="font-mono text-[10px] tracking-[3px] text-folana-text-muted sm:text-xs">CURRENT NODE</div>
          <div className="font-serif text-xl tracking-tight text-folana-ink sm:text-2xl">{signals.display_name}</div>
          <div className="font-mono text-xs tracking-widest text-folana-neon-cyan">{signals.handle}</div>
        </div>
      </div>

      <main className="mx-auto max-w-[1480px] space-y-16 px-4 pt-10 pb-24 sm:px-6 sm:pt-16 sm:space-y-24">
        <ReleaseHubSurface
          featured={featured}
          freshArchive={freshArchive}
        />

        <section>
          <SonicVault />
        </section>

        <section id="echo">
          <div className="mb-9 flex items-end justify-between border-b border-white/10 pb-5">
            <div>
              <div className="mb-1 font-mono text-xs tracking-[4px] text-folana-neon-cyan">RECENT NOTES</div>
              <h2 className="font-serif text-4xl tracking-[-1.4px] sm:text-6xl sm:tracking-[-2.6px]">Latest entries</h2>
            </div>
            <Link href="/archive" className="hidden text-xs font-mono tracking-widest transition-colors hover:text-folana-neon-pink md:block">SEE ALL →</Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {latestThoughts.length > 0 ? (
              latestThoughts.map((thought) => (
                <ThoughtCard key={thought.id} {...thought} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-folana-text-muted">No live transmissions yet. The static is quiet tonight.</div>
            )}
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/archive" className="inline-flex min-h-11 items-center justify-center rounded-full border border-folana-neon-cyan/40 bg-folana-neon-cyan/10 px-6 py-3 text-xs font-mono tracking-[3px] text-folana-neon-cyan transition-colors hover:bg-folana-neon-cyan/15">
              BROWSE THE ARCHIVE
            </Link>
            <Link href="/inner-circle" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-6 py-3 text-xs font-mono tracking-[3px] text-folana-text-muted transition-colors hover:border-folana-neon-pink hover:text-folana-ink">
              JOIN THE INNER CIRCLE
            </Link>
          </div>
        </section>

        {isAcmiConfigured() ? <AcmiLiveFeed /> : null}
      </main>

      <Footer />
    </>
  );
}
