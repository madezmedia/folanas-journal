'use client';

import { nativeVideoElementId } from '@/lib/featured-productions';

export function playNativeProductionVideo(
  trackId: string,
  angle: 'front' | 'side' = 'front',
  surface = 'stage',
) {
  const el = document.getElementById(nativeVideoElementId(trackId, angle, surface)) as HTMLVideoElement | null;
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.focus();
  void el.play();
}

export function WatchNativeVideoButton({
  trackId,
  angle = 'front',
  label = 'WATCH / PLAY',
  surface = 'stage',
  className,
}: {
  trackId: string;
  angle?: 'front' | 'side';
  label?: string;
  surface?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => playNativeProductionVideo(trackId, angle, surface)}
      className={className ?? 'inline-flex min-h-11 items-center gap-2 font-mono text-xs tracking-[2px] text-folana-neon-cyan transition-colors hover:text-white'}
    >
      {label} →
    </button>
  );
}
