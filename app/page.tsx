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
    reach_label: '4.5M',
    influence_label: '+32%',
    synthetic_resonance: 88,
    holographic_engagement: 64,
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
    title: 'THE FOREST SPEAKS',
    subtitle: 'LATEST RELEASE',
    description: 'The latest release is live.',
    duration: '—',
    mood: 'LIVE',
    posterSrc: '/brand/og-card-neutral.png',
  };

  return (
    <>
      <Nav />

      <MusicFirstHero />

      <div className="border-b border-white/10 bg-folana-surface/60 backdrop-blur-xl sticky top-[79px] z-40">
        <div className="max-w-[1480px] mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-sm">
          <div className="flex items-center gap-4">
            <div className="font-mono tracking-[3px] text-folana-text-muted text-xs">CURRENT NODE</div>
            <div className="font-serif text-2xl tracking-tight text-folana-ink">{signals.display_name}</div>
            <div className="text-folana-neon-cyan font-mono text-xs tracking-widest">{signals.handle}</div>
          </div>

          <div className="flex items-center gap-x-9 text-sm font-mono">
            <div><span className="text-folana-text-muted">REACH</span> <span className="text-folana-ink font-medium tabular-nums">{signals.reach_label}</span></div>
            <div><span className="text-folana-text-muted">INFLUENCE</span> <span className="text-folana-neon-pink font-medium">{signals.influence_label}</span></div>
            <div><span className="text-folana-text-muted">SYNTHETIC RESONANCE</span> <span className="text-folana-ink tabular-nums">{signals.synthetic_resonance ?? 88}%</span></div>
          </div>
        </div>
      </div>

      <main className="max-w-[1480px] mx-auto px-6 pt-16 pb-24 space-y-24">
        <ReleaseHubSurface
          featured={featured}
          freshArchive={freshArchive}
          signals={signals}
        />

        <section>
          <SonicVault />
        </section>

        <section id="echo">
          <div className="flex items-end justify-between mb-9 border-b border-white/10 pb-5">
            <div>
              <div className="text-folana-neon-cyan tracking-[4px] font-mono text-xs mb-1">RECENT NOTES</div>
              <h2 className="font-serif text-6xl tracking-[-2.6px]">Latest entries</h2>
            </div>
            <Link href="/archive" className="hidden md:block text-xs font-mono tracking-widest hover:text-folana-neon-pink transition-colors">SEE ALL →</Link>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {latestThoughts.length > 0 ? (
              latestThoughts.map((thought) => (
                <ThoughtCard key={thought.id} {...thought} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-folana-text-muted">No live transmissions yet. The static is quiet tonight.</div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
            <Link href="/archive" className="inline-flex items-center justify-center rounded-full border border-folana-neon-cyan/40 bg-folana-neon-cyan/10 px-6 py-3 text-xs font-mono tracking-[3px] text-folana-neon-cyan transition-colors hover:bg-folana-neon-cyan/15">
              BROWSE THE ARCHIVE
            </Link>
            <Link href="/inner-circle" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-xs font-mono tracking-[3px] text-folana-text-muted transition-colors hover:border-folana-neon-pink hover:text-folana-ink">
              JOIN THE INNER CIRCLE
            </Link>
          </div>
        </section>

        <section id="grid">
          <div className="max-w-5xl mx-auto">
            <AcmiLiveFeed />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
