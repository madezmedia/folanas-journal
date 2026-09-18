import Image from 'next/image';
import type { RealTrack } from '@/lib/music-manifest';

export function ProductionBadge({ kind }: { kind: 'real' | 'prototype' }) {
  const isReal = kind === 'real';
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-mono tracking-[3px] ${
        isReal
          ? 'border-folana-neon-pink/50 bg-black/70 text-folana-neon-pink'
          : 'border-white/20 bg-black/70 text-white/75'
      }`}
    >
      {isReal ? 'REAL' : 'PROTOTYPE'}
    </span>
  );
}

export function MusicVideoPlaceholder({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-black/40 p-4">
      <div className="font-mono text-[10px] tracking-[3px] text-folana-text-muted">MUSIC VIDEO</div>
      <p className="mt-2 font-serif text-sm italic leading-relaxed text-folana-text-secondary">
        The locking-director cut for {title} is not on YouTube yet. Public URL follows — no embed until then.
      </p>
    </div>
  );
}

export function StillsGallery({
  stills,
  title,
}: {
  stills: string[];
  title: string;
}) {
  if (stills.length === 0) return null;

  return (
    <div>
      <div className="mb-2 font-mono text-[10px] tracking-[3px] text-folana-neon-cyan">
        STILLS{stills.length === 3 ? ' · Q01–Q03' : ''}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {stills.map((src, index) => (
          <a
            key={src}
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-black"
          >
            <Image
              src={src}
              alt={`${title} still ${index + 1}`}
              fill
              sizes="(max-width: 768px) 30vw, 180px"
              className="object-cover"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

type FeaturedMediaTrack = Pick<RealTrack, 'title' | 'audioSrc' | 'videoSrc' | 'galleryStills' | 'posterSrc'>;

export function FeaturedDropMedia({
  track,
  showAudio = true,
  showVideoPlaceholder = true,
}: {
  track: FeaturedMediaTrack;
  showAudio?: boolean;
  showVideoPlaceholder?: boolean;
}) {
  const stills = track.galleryStills ?? [];
  const showPlaceholder = showVideoPlaceholder && !track.videoSrc;

  return (
    <div className="space-y-4">
      {stills.length > 0 && <StillsGallery stills={stills} title={track.title} />}
      {showAudio && track.audioSrc && (
        <div>
          <div className="mb-2 font-mono text-[10px] tracking-[3px] text-folana-text-muted">LISTEN</div>
          <audio controls preload="none" className="w-full min-h-11 accent-folana-neon-pink" src={track.audioSrc}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      {showPlaceholder && <MusicVideoPlaceholder title={track.title} />}
    </div>
  );
}
