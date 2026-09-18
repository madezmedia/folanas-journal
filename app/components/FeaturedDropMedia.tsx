import Image from 'next/image';
import type { RealTrack } from '@/lib/music-manifest';
import {
  isRealVideoProduction,
  resolveFeaturedVideoSrc,
  resolveSideVideoSrc,
} from '@/lib/featured-productions';

export function ProductionBadge({ kind }: { kind: 'real' | 'real-video' | 'prototype' }) {
  const isRealLane = kind === 'real' || kind === 'real-video';
  const label = kind === 'real-video' ? 'REAL VIDEO' : kind === 'real' ? 'REAL' : 'PROTOTYPE';
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-mono tracking-[3px] ${
        isRealLane
          ? 'border-folana-neon-pink/50 bg-black/70 text-folana-neon-pink'
          : 'border-white/20 bg-black/70 text-white/75'
      }`}
    >
      {label}
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

export function NativeProductionVideo({
  src,
  poster,
  title,
  label,
}: {
  src: string;
  poster?: string;
  title: string;
  label: string;
}) {
  return (
    <div>
      <div className="mb-2 font-mono text-[10px] tracking-[3px] text-folana-neon-pink">{label}</div>
      <video
        controls
        playsInline
        preload="none"
        poster={poster}
        src={src}
        aria-label={title}
        className="relative z-[1] aspect-video w-full bg-black object-contain"
      >
        Your browser does not support the video element.
      </video>
    </div>
  );
}

type FeaturedMediaTrack = Pick<
  RealTrack,
  'id' | 'title' | 'audioSrc' | 'videoSrc' | 'galleryStills' | 'posterSrc' | 'runpodJobs'
>;

export function PrimaryProductionMedia({
  track,
}: {
  track: FeaturedMediaTrack;
}) {
  const videoSrc = resolveFeaturedVideoSrc(track);
  const badgeKind = isRealVideoProduction(track.id) || videoSrc ? 'real-video' : 'real';

  if (videoSrc) {
    return (
      <div className="relative bg-black">
        <video
          controls
          playsInline
          preload="none"
          poster={track.posterSrc}
          src={videoSrc}
          aria-label={track.title}
          className="relative z-[1] aspect-video w-full bg-black object-contain"
        >
          Your browser does not support the video element.
        </video>
        <div className="pointer-events-none absolute left-4 top-4">
          <ProductionBadge kind={badgeKind} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] bg-black md:aspect-auto md:min-h-[280px]">
      <Image
        src={track.posterSrc || '/brand/og-card-neutral.png'}
        alt={track.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="absolute left-4 top-4">
        <ProductionBadge kind={badgeKind} />
      </div>
    </div>
  );
}

export function FeaturedDropMedia({
  track,
  showAudio = true,
  showVideoPlaceholder = true,
  showFrontVideo = false,
}: {
  track: FeaturedMediaTrack;
  showAudio?: boolean;
  showVideoPlaceholder?: boolean;
  showFrontVideo?: boolean;
}) {
  const stills = track.galleryStills ?? [];
  const videoSrc = resolveFeaturedVideoSrc(track);
  const sideVideo = resolveSideVideoSrc(track);
  const showPlaceholder = showVideoPlaceholder && !videoSrc;
  const showSide = Boolean(sideVideo && sideVideo !== videoSrc);

  return (
    <div className="space-y-4">
      {stills.length > 0 && <StillsGallery stills={stills} title={track.title} />}
      {showAudio && track.audioSrc && (
        <div>
          <div className="mb-2 font-mono text-[10px] tracking-[3px] text-folana-text-muted">LISTEN</div>
          <audio controls preload="metadata" className="w-full min-h-11 accent-folana-neon-pink" src={track.audioSrc}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      {showFrontVideo && videoSrc && (
        <NativeProductionVideo
          src={videoSrc}
          poster={track.posterSrc}
          title={track.title}
          label="REAL VIDEO"
        />
      )}
      {showSide && sideVideo && (
        <NativeProductionVideo
          src={sideVideo}
          poster={track.posterSrc}
          title={`${track.title} side angle`}
          label="SIDE ANGLE"
        />
      )}
      {showPlaceholder && <MusicVideoPlaceholder title={track.title} />}
    </div>
  );
}
