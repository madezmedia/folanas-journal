import Image from 'next/image';
import type { RealTrack } from '@/lib/music-manifest';
import {
  isRealVideoProduction,
  nativeVideoElementId,
  resolveFeaturedVideoSrc,
  resolveSideVideoSrc,
} from '@/lib/featured-productions';

export function ProductionBadge({
  kind,
  tone = 'neon',
}: {
  kind: 'real' | 'real-video' | 'prototype' | 'non-folana';
  tone?: 'neon' | 'gospel';
}) {
  const isRealLane = kind === 'real' || kind === 'real-video';
  const label =
    kind === 'real-video' ? 'REAL VIDEO' :
    kind === 'real' ? 'REAL' :
    kind === 'non-folana' ? 'NON-FOLANA' :
    'PROTOTYPE';
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-mono tracking-[3px] ${
        kind === 'non-folana'
          ? 'border-amber-400/50 bg-black/70 text-amber-200'
          : tone === 'gospel' && isRealLane
          ? 'border-[#c9b89a]/80 bg-[#1c2a44]/90 text-[#f4efe4]'
          : isRealLane
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
  labels,
  tone = 'neon',
}: {
  stills: string[];
  title: string;
  labels?: string[];
  tone?: 'neon' | 'gospel';
}) {
  if (stills.length === 0) return null;
  const labeled = Boolean(labels && labels.length > 0);

  return (
    <div>
      <div className={`mb-2 font-mono text-[10px] tracking-[3px] ${tone === 'gospel' ? 'text-[#f4efe4]' : 'text-folana-neon-cyan'}`}>
        {labeled ? 'PLACE · ROOM · EYELINE' : `STILLS${stills.length === 3 ? ' · Q01–Q03' : ''}`}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {stills.map((src, index) => (
          <a
            key={src}
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative aspect-[4/5] overflow-hidden rounded-xl bg-black ${tone === 'gospel' ? 'border border-[#6b4423]/80' : 'border border-white/10'}`}
          >
            <Image
              src={src}
              alt={labels?.[index] ? `${title} — ${labels[index]}` : `${title} still ${index + 1}`}
              fill
              sizes="(max-width: 768px) 30vw, 180px"
              className="object-cover"
            />
            {labels?.[index] && (
              <div className="absolute inset-x-0 bottom-0 bg-[#f4efe4]/95 px-1.5 py-1 font-mono text-[8px] leading-tight tracking-[0.5px] text-[#1c2a44] sm:text-[9px]">
                {labels[index]}
              </div>
            )}
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
  trackId,
  angle = 'front',
  surface = 'stage',
  tone = 'neon',
}: {
  src: string;
  poster?: string;
  title: string;
  label: string;
  trackId?: string;
  angle?: 'front' | 'side';
  surface?: string;
  tone?: 'neon' | 'gospel';
}) {
  return (
    <div>
      <div className={`mb-2 font-mono text-[10px] tracking-[3px] ${tone === 'gospel' ? 'text-[#f4efe4]' : 'text-folana-neon-pink'}`}>{label}</div>
      <video
        id={trackId ? nativeVideoElementId(trackId, angle, surface) : undefined}
        data-track-id={trackId}
        data-angle={angle}
        controls
        playsInline
        preload="metadata"
        poster={poster}
        src={src}
        aria-label={title}
        className="aspect-video w-full bg-black object-contain"
      >
        Your browser does not support the video element.
      </video>
    </div>
  );
}

type FeaturedMediaTrack = Pick<
  RealTrack,
  'id' | 'title' | 'audioSrc' | 'videoSrc' | 'galleryStills' | 'galleryLabels' | 'posterSrc' | 'heroSrc' | 'runpodJobs' | 'statusNote' | 'releaseNote' | 'flowUrl'
>;

export function PrimaryProductionMedia({
  track,
}: {
  track: FeaturedMediaTrack;
}) {
  const videoSrc = resolveFeaturedVideoSrc(track);
  const badgeKind = isRealVideoProduction(track.id) || videoSrc ? 'real-video' : 'real';
  const tone = track.heroSrc ? 'gospel' : 'neon';

  if (videoSrc) {
    return (
      <div className="relative bg-black">
        <video
          id={nativeVideoElementId(track.id, 'front')}
          data-track-id={track.id}
          data-angle="front"
          controls
          playsInline
          preload="metadata"
          poster={track.posterSrc}
          src={videoSrc}
          aria-label={track.title}
          className="aspect-video w-full bg-black object-contain"
        >
          Your browser does not support the video element.
        </video>
        <div className="pointer-events-none absolute left-3 top-3 z-10">
          <ProductionBadge kind={badgeKind} tone={tone} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black">
      <Image
        src={track.posterSrc || '/brand/og-card-neutral.png'}
        alt={track.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="absolute left-3 top-3">
        <ProductionBadge kind={badgeKind} tone={tone} />
      </div>
    </div>
  );
}

export function FeaturedDropMedia({
  track,
  showAudio = true,
  showVideoPlaceholder = true,
  showFrontVideo = false,
  compact = false,
  tone,
}: {
  track: FeaturedMediaTrack;
  showAudio?: boolean;
  showVideoPlaceholder?: boolean;
  showFrontVideo?: boolean;
  compact?: boolean;
  tone?: 'neon' | 'gospel';
}) {
  const stills = track.galleryStills ?? [];
  const labels = track.galleryLabels;
  const videoSrc = resolveFeaturedVideoSrc(track);
  const sideVideo = resolveSideVideoSrc(track);
  const showPlaceholder = showVideoPlaceholder && !videoSrc;
  const showSide = Boolean(sideVideo && sideVideo !== videoSrc);
  const dropTone = tone ?? (track.heroSrc ? 'gospel' : 'neon');

  return (
    <div className={compact ? 'space-y-2' : 'space-y-4'}>
      {track.statusNote && (
        <div className="inline-flex rounded-full border border-[#c9b89a]/70 bg-[#1c2a44] px-3 py-1 font-mono text-[10px] tracking-[2px] text-[#f4efe4]">
          {track.statusNote}
        </div>
      )}
      {stills.length > 0 && !compact && <StillsGallery stills={stills} title={track.title} labels={labels} tone={dropTone} />}
      {stills.length > 0 && compact && (
        <div className="grid grid-cols-3 gap-1">
          {stills.slice(0, 3).map((src, index) => (
            <a key={src} href={src} target="_blank" rel="noopener noreferrer" className={`relative aspect-[4/5] overflow-hidden rounded-lg bg-black ${dropTone === 'gospel' ? 'border border-[#6b4423]/80' : 'border border-white/10'}`}>
              <Image src={src} alt={labels?.[index] ? `${track.title} — ${labels[index]}` : `${track.title} still ${index + 1}`} fill sizes="80px" className="object-cover" />
              {labels?.[index] && (
                <div className="absolute inset-x-0 bottom-0 bg-[#f4efe4]/95 px-1 py-0.5 font-mono text-[7px] leading-tight tracking-[0.4px] text-[#1c2a44]">
                  {labels[index]}
                </div>
              )}
            </a>
          ))}
        </div>
      )}
      {showAudio && track.audioSrc && (
        <div>
          {!compact && <div className={`mb-2 font-mono text-[10px] tracking-[3px] ${dropTone === 'gospel' ? 'text-[#f4efe4]' : 'text-folana-text-muted'}`}>LISTEN</div>}
          <audio controls preload="none" className={`w-full min-h-11 ${dropTone === 'gospel' ? 'accent-[#6b4423]' : 'accent-folana-neon-pink'}`} src={track.audioSrc}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      {(track.releaseNote || track.flowUrl) && (
        <p className={`font-serif text-sm italic leading-relaxed ${dropTone === 'gospel' ? 'text-[#f4efe4]/90' : 'text-folana-text-secondary'}`}>
          {track.releaseNote}
          {track.releaseNote && track.flowUrl ? ' · ' : ''}
          {track.flowUrl && (
            <a href={track.flowUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Full song on Flow
            </a>
          )}
        </p>
      )}
      {showFrontVideo && videoSrc && (
        <NativeProductionVideo
          src={videoSrc}
          poster={track.posterSrc}
          title={track.title}
          label="REAL VIDEO"
          trackId={track.id}
          angle="front"
          tone={dropTone}
        />
      )}
      {showSide && sideVideo && (
        compact ? (
          <details>
            <summary className="cursor-pointer font-mono text-[10px] tracking-[2px] text-folana-neon-pink">SIDE ANGLE</summary>
            <div className="mt-2">
              <NativeProductionVideo
                src={sideVideo}
                poster={track.posterSrc}
                title={`${track.title} side angle`}
                label="SIDE ANGLE"
                trackId={track.id}
                angle="side"
              />
            </div>
          </details>
        ) : (
          <NativeProductionVideo
            src={sideVideo}
            poster={track.posterSrc}
            title={`${track.title} side angle`}
            label="SIDE ANGLE"
            trackId={track.id}
            angle="side"
          />
        )
      )}
      {showPlaceholder && <MusicVideoPlaceholder title={track.title} />}
    </div>
  );
}
