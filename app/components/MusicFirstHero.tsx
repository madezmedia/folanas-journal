'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Disc3, Play } from 'lucide-react';
import { REAL_PRODUCTIONS } from '@/lib/music-manifest';
import { resolveFeaturedVideoSrc } from '@/lib/featured-productions';
import { FeaturedDropMedia, NativeProductionVideo, ProductionBadge } from './FeaturedDropMedia';
import { WatchNativeVideoButton } from './WatchNativeVideoButton';

export function MusicFirstHero() {
  const featured = REAL_PRODUCTIONS[0];

  if (!featured) return null;

  const videoSrc = resolveFeaturedVideoSrc(featured);

  if (featured.heroSrc && featured.heroPortraitSrc) {
    return (
      <section className="relative overflow-hidden border-b border-[#6b4423]/50 bg-[#14110e] pt-24 pb-12 md:pt-28 md:pb-16">
        <Image
          src={featured.heroSrc}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14110e] via-[#14110e]/72 to-[#1c2a44]/35" />

        <div className="relative mx-auto max-w-[1480px] px-4 sm:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
            <div className="space-y-6 sm:space-y-7">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#c9b89a]/70 bg-[#1c2a44]/80 px-4 py-1.5 text-[10px] font-mono tracking-[3px] text-[#f4efe4]">
                FEATURED · REAL PRODUCTION
              </div>
              {featured.statusNote && (
                <div className="font-mono text-[10px] tracking-[3px] text-[#f4efe4]/80">{featured.statusNote}</div>
              )}
              <div className="space-y-4">
                <h1 className="max-w-4xl font-serif text-[2.6rem] leading-[0.92] tracking-[-1.6px] text-[#f4efe4] sm:text-6xl sm:tracking-[-3px] md:text-[80px]">
                  {featured.title}
                </h1>
                <p className="font-mono text-[11px] tracking-[3px] text-[#f4efe4]/75">
                  {featured.subtitle}
                </p>
                <p className="max-w-2xl font-serif text-base italic leading-relaxed text-[#f4efe4]/90 sm:text-xl">
                  {featured.description}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {videoSrc && (
                  <WatchNativeVideoButton
                    trackId={featured.id}
                    surface="hero"
                    label="WATCH"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#c9b89a] bg-[#1c2a44] px-8 py-4 text-sm font-mono tracking-[3px] text-[#f4efe4] transition-colors hover:bg-[#243456]"
                  />
                )}
                <Link href="/music#featured" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#6b4423] bg-[#6e2a4a]/80 px-8 py-4 text-sm font-mono tracking-[3px] text-[#f4efe4] transition-colors hover:bg-[#6e2a4a]">
                  <Play size={15} />
                  PLAY AUDIO
                </Link>
                <Link href="/archive" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#f4efe4]/30 px-8 py-4 text-sm font-mono tracking-[3px] text-[#f4efe4] transition-colors hover:border-[#f4efe4]/70">
                  BROWSE THE ARCHIVE
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-[1.25rem] border-[10px] border-[#6b4423] bg-[#1c2a44] shadow-2xl">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={featured.heroPortraitSrc}
                    alt={featured.title}
                    fill
                    priority
                    quality={92}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-5 rounded-[1.5rem] border border-[#6b4423]/70 bg-[#1c2a44]/82 p-4 backdrop-blur-md sm:p-5">
            {videoSrc && (
              <NativeProductionVideo
                src={videoSrc}
                poster={featured.posterSrc}
                title={featured.title}
                label="PASS CUT"
                trackId={featured.id}
                surface="hero"
                tone="gospel"
              />
            )}
            <FeaturedDropMedia track={featured} showVideoPlaceholder={false} tone="gospel" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(255,31,154,0.12),transparent_44%),linear-gradient(to_bottom,#050507_0%,#0c0c12_52%,#14141b_100%)] pt-24 pb-12 md:pt-28 md:pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-folana-neon-pink/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0f_1px,transparent_1px)] bg-[size:6px_6px] opacity-30" />
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-folana-neon-cyan/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1480px] px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div className="relative order-first lg:order-last">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-folana-neon-pink/20 via-transparent to-folana-neon-cyan/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-folana-surface shadow-2xl sm:rounded-[2rem]">
              <div className="relative aspect-[4/5] max-h-[48vh] bg-black sm:max-h-none">
                <Image
                  src={featured.posterSrc || '/brand/og-card-neutral.png'}
                  alt={featured.title}
                  fill
                  priority
                  quality={92}
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/95" />
                <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                  <ProductionBadge kind="real" />
                </div>
                <div className="absolute right-3 bottom-3 left-3 rounded-2xl border border-white/10 bg-black/70 p-3 backdrop-blur-xl sm:right-4 sm:bottom-4 sm:left-4 sm:rounded-3xl sm:p-4">
                  <div className="font-mono text-[10px] tracking-[3px] text-folana-neon-cyan">NOW PLAYING</div>
                  <div className="mt-2 font-serif text-2xl leading-tight tracking-[-1px] text-white sm:text-3xl sm:tracking-[-1.2px]">
                    {featured.title}
                  </div>
                  <div className="mt-1 font-mono text-[10px] tracking-[2px] text-folana-text-muted sm:text-xs">
                    {featured.subtitle} • {featured.duration}
                  </div>
                  <p className="mt-3 hidden max-w-xl font-serif text-sm italic leading-relaxed text-folana-text-secondary sm:block">
                    {featured.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                    <Link href="/music#featured" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-folana-neon-pink/40 bg-folana-neon-pink/10 px-4 py-2 text-[10px] font-mono tracking-[3px] text-folana-neon-pink transition-colors hover:bg-folana-neon-pink/15">
                      PLAY AUDIO
                    </Link>
                    <Link href="/music#featured" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[10px] font-mono tracking-[3px] text-white/80 transition-colors hover:border-folana-neon-cyan/40 hover:text-folana-neon-cyan">
                      VIEW DETAILS
                    </Link>
                  </div>
                </div>
              </div>
              <div className="space-y-4 border-t border-white/10 bg-black/40 p-4 sm:p-5">
                <FeaturedDropMedia track={featured} />
              </div>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-folana-neon-cyan/30 bg-folana-neon-cyan/10 px-4 py-1.5 text-[10px] font-mono tracking-[4px] text-folana-neon-cyan">
              <Disc3 size={12} />
              RELEASE HUB
            </div>

            <div className="space-y-4 sm:space-y-5">
              <p className="font-mono text-[10px] tracking-[4px] text-folana-text-muted sm:text-[11px] sm:tracking-[5px]">FEATURED FIRST / ARCHIVE SECOND / OPS THIRD</p>
              <h1 className="max-w-4xl font-serif text-[2.35rem] leading-[0.95] tracking-[-1.6px] text-white sm:text-6xl sm:leading-[0.9] sm:tracking-[-4.2px] md:text-[92px]">
                Start with the latest release.
              </h1>
              <p className="max-w-2xl text-base font-serif italic leading-relaxed text-folana-text-secondary sm:text-xl md:text-[22px]">
                {featured.title} leads the hub. Face-lock stills and the real audio stay up front. A music-video slot stays empty until a real public URL exists.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/music#featured" className="neon-btn inline-flex min-h-12 items-center justify-center gap-2 px-8 py-4 text-sm">
                <Play size={15} />
                PLAY FEATURED: {featured.title}
              </Link>
              <Link href="#sonic" className="neon-btn inline-flex min-h-12 items-center justify-center gap-2 px-8 py-4 text-sm">
                <Play size={15} />
                PLAY THE VAULT
              </Link>
              <Link href="/archive" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-folana-neon-cyan/40 bg-folana-neon-cyan/10 px-8 py-4 text-sm font-mono tracking-[3px] text-folana-neon-cyan transition-colors hover:bg-folana-neon-cyan/15">
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
        </div>
      </div>
    </section>
  );
}
