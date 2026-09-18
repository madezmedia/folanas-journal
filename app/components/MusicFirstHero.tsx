'use client';

import Link from 'next/link';
import { ArrowRight, Disc3, Play } from 'lucide-react';
import { getFeaturedRealProductions } from '@/lib/music-manifest';
import { FeaturedProductionCard } from './FeaturedProductionCard';

export function MusicFirstHero() {
  const featured = getFeaturedRealProductions()[0];

  if (!featured) return null;

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(255,31,154,0.12),transparent_44%),linear-gradient(to_bottom,#050507_0%,#0c0c12_52%,#14141b_100%)] pt-24 pb-10 md:pt-28 md:pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-folana-neon-pink/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0f_1px,transparent_1px)] bg-[size:6px_6px] opacity-30" />
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-folana-neon-cyan/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1480px] px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div className="min-w-0 space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-folana-neon-cyan/30 bg-folana-neon-cyan/10 px-4 py-1.5 text-[10px] font-mono tracking-[4px] text-folana-neon-cyan">
              <Disc3 size={12} />
              RELEASE HUB
            </div>

            <div className="space-y-4 md:space-y-5">
              <p className="font-mono text-[10px] tracking-[4px] text-folana-text-muted sm:text-[11px] sm:tracking-[5px]">FEATURED FIRST / ARCHIVE SECOND</p>
              <h1 className="max-w-4xl font-serif text-4xl leading-[0.95] tracking-[-1.5px] text-white sm:text-5xl md:text-6xl md:tracking-[-4.2px] lg:text-[92px]">
                Start with the latest release.
              </h1>
              <p className="max-w-2xl font-serif text-base italic leading-relaxed text-folana-text-secondary sm:text-xl md:text-[22px]">
                QUANTUM ARC · RUST VEIN is live. Listen here. The music video follows @folana_music.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/music" className="neon-btn inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:px-8">
                <Play size={15} />
                <span className="truncate">PLAY FEATURED</span>
              </Link>
              <Link href="#sonic" className="neon-btn inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:px-8">
                <Play size={15} />
                PLAY THE VAULT
              </Link>
              <Link href="/archive" className="inline-flex items-center justify-center gap-2 rounded-full border border-folana-neon-cyan/40 bg-folana-neon-cyan/10 px-6 py-4 text-sm font-mono tracking-[3px] text-folana-neon-cyan transition-colors hover:bg-folana-neon-cyan/15 sm:px-8">
                BROWSE THE ARCHIVE
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-folana-neon-pink/20 via-transparent to-folana-neon-cyan/20 blur-2xl" />
            <div className="relative">
              <FeaturedProductionCard track={featured} featured />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
