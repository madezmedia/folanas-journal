'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { QUANTUM_STILLS, type RealTrack } from '@/lib/music-manifest';

export function AudioListenBar({
  src,
  label = 'LISTEN',
}: {
  src: string;
  label?: string;
}) {
  return (
    <div className="w-full min-w-0">
      <div className="mb-2 text-[10px] font-mono tracking-[2px] text-folana-text-muted">{label}</div>
      <audio
        controls
        preload="none"
        className="audio-shell w-full max-w-full accent-folana-neon-pink"
        src={src}
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

function stillLabel(src: string, index: number): string {
  const match = src.match(/quantum-q0(\d)/i);
  if (match) return `Q0${match[1]}`;
  return `STILL ${index + 1}`;
}

export function FeaturedProductionCard({
  track,
  featured = false,
  compact = false,
}: {
  track: RealTrack;
  featured?: boolean;
  compact?: boolean;
}) {
  const stills = useMemo(() => {
    if (track.gallerySrcs && track.gallerySrcs.length > 0) return track.gallerySrcs;
    if (track.id === 'quantum-arc-rust-vein') return [...QUANTUM_STILLS];
    return track.posterSrc ? [track.posterSrc] : [];
  }, [track]);

  const [active, setActive] = useState(0);
  const currentStill = stills[Math.min(active, Math.max(stills.length - 1, 0))];
  const mvPending = !track.videoSrc;
  const isQuantum = track.id === 'quantum-arc-rust-vein';

  return (
    <article
      className={`holo-frame overflow-hidden rounded-3xl border ${
        featured ? 'border-folana-neon-pink/30' : 'border-white/15'
      }`}
    >
      <div className={`grid gap-0 ${compact ? '' : 'lg:grid-cols-2'}`}>
        <div className="min-w-0 bg-black">
          <div className="relative aspect-[16/9] overflow-hidden bg-black">
            {currentStill ? (
              <img
                src={currentStill}
                alt={`${track.title} ${stillLabel(currentStill, active)}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-folana-void" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-folana-neon-pink/50 bg-black/70 px-3 py-1 text-[10px] font-mono tracking-[2px] text-folana-neon-pink">
                REAL
              </span>
              {featured && (
                <span className="rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[10px] font-mono tracking-[2px] text-white/80">
                  FEATURED
                </span>
              )}
            </div>
          </div>
          {stills.length > 1 && (
            <div className="grid grid-cols-3 gap-1 bg-black p-1">
              {stills.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`relative aspect-[16/9] overflow-hidden rounded-lg border ${
                    index === active
                      ? 'border-folana-neon-pink'
                      : 'border-white/10 opacity-80 hover:opacity-100'
                  }`}
                  aria-label={`Show ${stillLabel(src, index)}`}
                  aria-pressed={index === active}
                >
                  <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1.5 py-px text-[9px] font-mono tracking-[1.5px] text-white/90">
                    {stillLabel(src, index)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col bg-folana-surface/60 p-5 sm:p-8">
          <div className="flex-1">
            <div className="mb-2 text-[10px] font-mono uppercase tracking-[3px] text-folana-neon-cyan">
              REAL PRODUCTION
            </div>
            <h3 className="font-serif text-2xl leading-tight tracking-tight text-folana-ink sm:text-3xl">
              {track.title}
            </h3>
            <div className="mt-1 break-words font-mono text-xs text-folana-text-muted sm:text-sm">
              {track.subtitle} • {track.duration}
            </div>
            <p className="mt-4 font-serif text-sm italic leading-relaxed text-folana-text-secondary sm:text-base">
              {track.description}
            </p>
          </div>

          {track.audioSrc && (
            <div className="mt-6 border-t border-white/10 pt-5">
              <AudioListenBar src={track.audioSrc} />
            </div>
          )}

          {mvPending ? (
            <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-black/30 px-4 py-3">
              <div className="text-[10px] font-mono tracking-[2px] text-folana-neon-pink">
                MUSIC VIDEO
              </div>
              <p className="mt-1 text-sm text-folana-text-secondary">
                {isQuantum
                  ? 'MV coming @folana_music'
                  : 'Music video is not on this page yet.'}
              </p>
            </div>
          ) : (
            <div className="mt-4 text-xs">
              <Link href="/#sonic" className="font-mono tracking-[2px] text-folana-neon-cyan hover:underline">
                Watch the video in the Sonic Vault →
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
