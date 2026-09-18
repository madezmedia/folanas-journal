import { Suspense } from 'react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { ArchiveGrid } from '../components/ArchiveGrid';

export const metadata = {
  title: "Archive — Folana's Journal | Music & Visual Codex",
  description: "Browse the newest archive items first. Search, filter, or jump straight into a release.",
};

export default function ArchivePage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-[1480px] flex-1 space-y-12 px-4 pt-28 pb-20 sm:px-6">
        {/* Header */}
        <section className="border-b border-white/10 pb-8">
          <div className="mb-4 inline-block rounded-full border border-folana-neon-cyan/40 px-4 py-1 font-mono text-xs tracking-[3px] text-folana-neon-cyan">
            NEWEST FIRST • LIVE INDEX
          </div>
          <h1 className="mb-4 font-serif text-4xl leading-none tracking-[-1.6px] text-white sm:text-7xl sm:tracking-[-4.2px] md:text-[88px]">
            Browse the archive
          </h1>
          <p className="max-w-2xl text-xl text-folana-text-secondary font-serif italic">
            Search, filter, or page through the newest entries first. Jump straight to a release when you already know what you want.
          </p>
        </section>

        <Suspense fallback={<div className="min-h-[600px] rounded-3xl border border-white/10 bg-white/[0.02]" />}>
          <ArchiveGrid />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
