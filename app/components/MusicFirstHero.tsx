'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Disc3, Play } from 'lucide-react';
import { REAL_PRODUCTIONS } from '@/lib/music-manifest';

export function MusicFirstHero() {
  const featured = REAL_PRODUCTIONS[0];

  if (!featured) return null;

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(255,31,154,0.12),transparent_44%),linear-gradient(to_bottom,#050507_0%,#0c0c12_52%,#14141b_100%)] pt-28 pb-16 md:pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-folana-neon-pink/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0f_1px,transparent_1px)] bg-[size:6px_6px] opacity-30" />
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-folana-neon-cyan/10 blur-3xl" />
      </div>

      <div className="relative max-w-[1480px] mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-folana-neon-cyan/30 bg-folana-neon-cyan/10 px-4 py-1.5 text-[10px] font-mono tracking-[4px] text-folana-neon-cyan">
              <Disc3 size={12} />
              MUSIC FIRST
            </div>

            <div className="space-y-5">
              <p className="font-mono text-[11px] tracking-[5px] text-folana-text-muted">START HERE / PLAY FIRST</p>
              <h1 className="max-w-4xl font-serif text-6xl leading-[0.9] tracking-[-4.2px] text-white md:text-[92px]">
                Start with the track.
              </h1>
              <p className="max-w-2xl text-xl font-serif italic leading-relaxed text-folana-text-secondary md:text-[22px]">
                Play the latest release first, then move into the vault or the archive. Less hunting, more listening.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="/folana/premium/ep251/" className="neon-btn inline-flex items-center justify-center gap-2 text-sm px-8 py-4" style={{ background: 'linear-gradient(135deg, #0a1f12, #1e4d36)', border: '1px solid rgba(232,169,48,0.5)' }}>
                <Play size={15} />
                ★ FEATURED: EP251 THE FOREST SPEAKS
              </a>
              <Link href="#sonic" className="neon-btn inline-flex items-center justify-center gap-2 text-sm px-8 py-4">
                <Play size={15} />
                PLAY THE VAULT
              </Link>
              <Link href="/archive" className="inline-flex items-center justify-center gap-2 rounded-full border border-folana-neon-cyan/40 bg-folana-neon-cyan/10 px-8 py-4 text-sm font-mono tracking-[3px] text-folana-neon-cyan transition-colors hover:bg-folana-neon-cyan/15">
                BROWSE THE ARCHIVE
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-mono text-[10px] tracking-[3px] text-folana-text-muted">FEATURED DROP</div>
                <div className="mt-2 font-serif text-lg text-folana-ink">{featured.title}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-mono text-[10px] tracking-[3px] text-folana-text-muted">LISTEN NOW</div>
                <div className="mt-2 font-serif text-lg text-folana-ink">{featured.duration} • {featured.mood}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-mono text-[10px] tracking-[3px] text-folana-text-muted">ARCHIVE FLOW</div>
                <div className="mt-2 font-serif text-lg text-folana-ink">Newest first, fewer clicks</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-folana-neon-pink/20 via-transparent to-folana-neon-cyan/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-folana-surface shadow-2xl">
              <div className="relative aspect-[4/5] bg-black">
                <Image
                  src={featured.posterSrc || '/brand/og-card-neutral.png'}
                  alt={featured.title}
                  fill
                  priority
                  quality={92}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/95" />
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/70 px-3 py-1 font-mono text-[10px] tracking-[3px] text-folana-neon-pink">
                  REAL PRODUCTION
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-3xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl">
                  <div className="font-mono text-[10px] tracking-[3px] text-folana-neon-cyan">NOW PLAYING</div>
                  <div className="mt-2 font-serif text-3xl leading-tight tracking-[-1.2px] text-white">
                    {featured.title}
                  </div>
                  <div className="mt-1 font-mono text-xs tracking-[2px] text-folana-text-muted">
                    {featured.subtitle} • {featured.duration}
                  </div>
                  <p className="mt-3 max-w-xl font-serif text-sm italic leading-relaxed text-folana-text-secondary">
                    {featured.description}
                  </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/music" className="inline-flex items-center gap-2 rounded-full border border-folana-neon-pink/40 bg-folana-neon-pink/10 px-4 py-2 text-[10px] font-mono tracking-[3px] text-folana-neon-pink transition-colors hover:bg-folana-neon-pink/15">
                    PLAY AUDIO
                  </Link>
                  <Link href={featured.videoSrc ? '/music' : '/archive'} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[10px] font-mono tracking-[3px] text-white/80 transition-colors hover:border-folana-neon-cyan/40 hover:text-folana-neon-cyan">
                    VIEW DETAILS
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
