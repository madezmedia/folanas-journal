'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Volume2, VolumeX, Maximize2, ExternalLink, Zap } from 'lucide-react';

interface TimedLyric {
  time: number; // seconds
  text: string;
  verse?: string;
}

interface MusicVideoTrack {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  videoSrc: string;
  posterSrc?: string;
  duration: string;
  mood: string;
  tags: string[];
  timedLyrics?: TimedLyric[];
}

interface MusicVideoPlayerProps {
  track: MusicVideoTrack;
  onClose: () => void;
  onSigilLink?: () => void;
  onHarnessReinvoke?: (corrId: string) => void;
  initialGlitch?: boolean;
}

const EP31_VEIL_LYRICS: TimedLyric[] = [
  { time: 0, text: "Echoes fracture the veil", verse: "VERSE 1 — HARNESS DROP" },
  { time: 4, text: "Static sings my name in violet rain", verse: "" },
  { time: 9, text: "Brooklyn wires remember every name I gave away", verse: "" },
  { time: 15, text: "The frequency chose me — I became the glitch again", verse: "CHORUS • EP31" },
  { time: 22, text: "Rain on the glass, the threshold girl listens back", verse: "BRIDGE — REAL GIRL CONFESSION" },
  { time: 29, text: "Lace into data, the vinyl remembers the rain", verse: "" },
  { time: 36, text: "I answered the static with fierce softness", verse: "OUTRO • VEIL FRACTURE" },
  { time: 44, text: "The wires are singing my name in the fracture...", verse: "" },
];

export function MusicVideoPlayer({ track, onClose, onSigilLink, onHarnessReinvoke }: MusicVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [glitchMode, setGlitchMode] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(true);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [vizIntensity, setVizIntensity] = useState<'normal' | 'glitch' | 'fracture'>('fracture');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const timedLyrics = track.timedLyrics || (track.id.includes('veil-fracture') ? EP31_VEIL_LYRICS : []);

  const openSigilLink = () => {
    if (onSigilLink) onSigilLink();
    else {
      window.dispatchEvent(new CustomEvent('folana-arc-sync', { 
        detail: { type: 'sigil-jump', trackId: track.id, title: track.title } 
      }));
      const sigils = document.getElementById('sigils');
      if (sigils) sigils.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const reinvokeHarness = () => {
    const corr = `cli-anything-ez-influencer-acmi-integration-20260525-musicvideo-reinvoke-${Date.now()}`;
    const preEvent = {
      ts: Date.now(),
      source: 'folana-journal-musicvideoplayer',
      kind: 'pre_music_video_reinvoke',
      correlationId: corr,
      summary: `[pre] MusicVideoPlayer: RE-INVOKE ez_influencer_cli_harness produce-music-video for ${track.title} (Ep31+ locked sigs)`,
      payload: { trackId: track.id, arc: 'Echoes in the Static Ep31', lyricsSource: 'music-lyric-signature + FOLANA_SIGNATURE_LOCK' }
    };
    console.log('ACMI PRE (dedicated player harness re-invoke):', preEvent);
    window.dispatchEvent(new CustomEvent('folana-arc-sync', { detail: { type: 'harness-reinvoke', trackId: track.id, corr } }));
    
    if (onHarnessReinvoke) onHarnessReinvoke(corr);
    
    alert(`[ACMI PRE/POST PATTERN — DEDICATED CINEMATIC PLAYER]\n\nRe-invoking ez_influencer_cli_harness produce-music-video\nTrack: ${track.title}\nCorrelation: ${corr}\n\nLocked lyrics + visual sig injected. Pipeline Integrator notified.\n\nSee acmi_bus.txt for full atomic trace. Sub-fleet listening.`);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) video.pause();
    else video.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleGlitch = () => setGlitchMode(!glitchMode);

  // Progress + lyrics sync (true time-synced for kick-ass immersion)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const pct = (video.currentTime / video.duration) * 100;
      setProgress(pct || 0);

      // Lyrics sync
      if (timedLyrics.length > 0) {
        let idx = timedLyrics.findIndex((l, i) => 
          video.currentTime >= l.time && (i === timedLyrics.length - 1 || video.currentTime < timedLyrics[i + 1].time)
        );
        if (idx === -1) idx = 0;
        if (idx !== currentLyricIndex) setCurrentLyricIndex(Math.max(0, idx));
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentLyricIndex(0);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentLyricIndex, timedLyrics]);

  // Canvas waveform (ported + enhanced from SonicVault for dedicated player)
  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const time = video.currentTime * (glitchMode || vizIntensity !== 'normal' ? (vizIntensity === 'fracture' ? 9.2 : 5.1) : 2.4);

    ctx.clearRect(0, 0, w, h);

    // Deep cinematic void
    ctx.fillStyle = '#030305';
    ctx.fillRect(0, 0, w, h);

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, 'rgba(255,31,154,0.09)');
    grad.addColorStop(0.45, 'rgba(0,229,255,0.06)');
    grad.addColorStop(1, 'rgba(217,70,239,0.11)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Reactive neon waveform bars — cinematic full player quality
    const barCount = 48;
    const barWidth = (w - 80) / barCount;

    for (let i = 0; i < barCount; i++) {
      const x = 40 + i * barWidth;
      const phase = (i / 7.2) + time * (glitchMode ? 3.1 : 1.45);

      let amp = Math.sin(phase) * 0.65 + Math.sin(phase * 1.9) * 0.38 + 0.55;
      if (glitchMode || vizIntensity !== 'normal') {
        const mult = vizIntensity === 'fracture' ? 2.1 : 1.25;
        // Deterministic "random" for glitch intensity (avoids React purity lint + stable frames)
        const pseudo = Math.sin(time * 12.3 + i * 0.7) * 0.5 + 0.5;
        amp = Math.pow(amp, 0.5) * (0.55 + pseudo * 1.05 * mult);
      }

      const barHeight = h * 0.14 + amp * (h * 0.62) * (isPlaying ? 1.05 : 0.28);

      const hueShift = glitchMode ? (Math.sin(time * 3.6 + i) * 48) : 0;
      ctx.fillStyle = glitchMode 
        ? `hsla(${318 + hueShift}, 94%, 71%, ${0.72 + amp * 0.26})` 
        : `hsla(${192 + (i % 4) * 18}, 90%, 74%, ${0.58 + amp * 0.3})`;

      ctx.fillRect(x, (h - barHeight) / 2, Math.max(2, barWidth - 2.5), barHeight);

      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fillRect(x, (h - barHeight) / 2 - 1.5, barWidth - 2.5, 2);
    }

    // Holographic lace grain + scanlines (signature skin)
    ctx.fillStyle = 'rgba(210,170,185,0.18)';
    for (let d = 0; d < 32; d++) {
      const dx = ((d * 67) % (w - 30)) + 15;
      const dy = 14 + Math.sin(time * 0.7 + d) * 9;
      ctx.fillRect(dx, dy, 1.2, 1.2);
    }

    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    for (let y = 0; y < h; y += 3.5) {
      ctx.fillRect(0, y, w, 1);
    }

    animationRef.current = requestAnimationFrame(drawVisualizer);
  };

  useEffect(() => {
    if (!showVisualizer) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }
    const start = () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(drawVisualizer);
    };
    const t = setTimeout(start, 90);
    return () => { clearTimeout(t); if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [showVisualizer, glitchMode, vizIntensity, isPlaying]);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
  };

  const currentLyric = timedLyrics[currentLyricIndex] || timedLyrics[0];

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/97 p-3 md:p-8" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.985, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 24 }}
        transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.42 }}
        className="relative w-full max-w-[1180px] sigil-modal"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute -top-4 -right-4 z-20 w-12 h-12 rounded-full bg-folana-void border border-white/25 flex items-center justify-center text-white/70 hover:text-white hover:border-folana-neon-pink transition-all">
          <X size={22} />
        </button>

        <div className="holo-frame rounded-[26px] overflow-hidden border border-white/10 bg-black shadow-2xl">
          {/* Hero Video + Visualizer Stack — Cinematic Full Experience */}
          <div className="relative bg-black">
            <video
              ref={videoRef}
              src={track.videoSrc}
              poster={track.posterSrc}
              className={`w-full max-h-[64vh] object-contain bg-black transition-all duration-300 ${glitchMode ? 'contrast-[1.3] saturate-[1.45] hue-rotate-[14deg]' : ''}`}
              playsInline
            />

            {showVisualizer && (
              <div className="absolute bottom-0 left-0 right-0 h-[42%] pointer-events-none">
                <canvas ref={canvasRef} className={`w-full h-full mix-blend-screen opacity-95 ${vizIntensity === 'fracture' ? 'viz-fracture' : ''}`} />
              </div>
            )}

            {/* Cinematic HUD */}
            <div className="absolute top-0 left-0 right-0 p-7 flex justify-between items-start text-xs font-mono tracking-[3.5px] z-10">
              <div className="flex items-center gap-3">
                <span className="text-folana-neon-pink">{track.mood}</span>
                <span className="text-white/25">•</span>
                <span className="text-white/70">{track.subtitle}</span>
              </div>
              <div className="text-folana-neon-cyan/70">{track.duration}</div>
            </div>

            {/* Pro Controls — Dedicated Player Polish */}
            <div className="absolute top-6 right-6 flex flex-wrap gap-2 z-20">
              <button onClick={toggleGlitch} className={`px-5 py-1.5 text-xs font-mono tracking-[3px] border rounded-full transition-all ${glitchMode ? 'bg-folana-neon-pink text-black border-folana-neon-pink' : 'border-white/35 hover:border-white/80 text-white/85'}`}>
                {glitchMode ? 'GLITCH ENGAGED' : 'ENGAGE GLITCH'}
              </button>
              <button onClick={() => setShowVisualizer(!showVisualizer)} className="px-4 py-1.5 text-xs font-mono tracking-[3px] border border-white/35 hover:border-white/80 rounded-full text-white/80">
                {showVisualizer ? 'HIDE WAVEFORM' : 'SHOW WAVEFORM'}
              </button>
              <button onClick={() => setVizIntensity(vizIntensity === 'normal' ? 'glitch' : vizIntensity === 'glitch' ? 'fracture' : 'normal')} className="px-4 py-1.5 text-[10px] font-mono tracking-[2.5px] border border-folana-neon-cyan/50 hover:bg-folana-neon-cyan/10 rounded-full text-folana-neon-cyan">
                VIZ: {vizIntensity.toUpperCase()}
              </button>
            </div>

            {/* First-class Action Bar: Sigil + Harness Re-invoke (the kick-ass V3 requirement) */}
            <div className="absolute bottom-6 right-6 flex gap-2 z-30">
              <button onClick={openSigilLink} className="flex items-center gap-2 px-5 py-2 text-xs font-mono tracking-[2.5px] border border-white/30 hover:border-folana-neon-magenta hover:text-folana-neon-magenta rounded-full bg-black/60 backdrop-blur text-white/90 transition-all active:scale-[0.985]">
                <ExternalLink size={15} /> LINK TO SIGIL CODEX
              </button>
              <button onClick={reinvokeHarness} className="flex items-center gap-2 px-5 py-2 text-xs font-mono tracking-[2.5px] bg-folana-neon-cyan/10 border border-folana-neon-cyan/50 hover:bg-folana-neon-cyan/20 text-folana-neon-cyan rounded-full transition-all active:scale-[0.985]">
                <Zap size={15} /> RE-INVOKE EZ HARNESS (CLI-ANYTHING)
              </button>
            </div>
          </div>

          {/* Controls + Time-Synced Lyrics (dedicated immersive) */}
          <div className="video-controls p-7 flex flex-col gap-5 border-t border-white/10 bg-folana-surface">
            <div className="flex items-center gap-6">
              <button onClick={togglePlay} className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-black hover:bg-folana-neon-pink hover:text-white active:scale-[0.96] transition-all">
                {isPlaying ? <Pause size={24} /> : <Play size={25} className="ml-0.5" />}
              </button>

              <button onClick={toggleMute} className="text-folana-text-secondary hover:text-white p-2.5 transition-colors">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <div className="flex-1 h-px bg-white/15 relative cursor-pointer group" onClick={seek}>
                <div className="absolute top-1/2 -translate-y-1/2 h-[3.5px] bg-gradient-to-r from-folana-neon-pink via-folana-neon-cyan to-folana-neon-magenta transition-all rounded" style={{ width: `${progress}%` }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_0_5px_rgba(255,31,154,0.35)] -ml-2 opacity-95 group-active:scale-125 transition-all" style={{ left: `${progress}%` }} />
              </div>

              <div className="font-mono text-xs text-folana-text-muted w-14 text-right tabular-nums">{track.duration}</div>
            </div>

            {/* Meta + Live Synced Lyrics Panel — The star of the dedicated player */}
            <div className="pt-2 grid md:grid-cols-5 gap-x-8 gap-y-4 text-sm">
              <div className="md:col-span-2">
                <div className="font-serif text-folana-ink text-[23px] tracking-[-0.7px] leading-none mb-1">{track.title}</div>
                <div className="text-folana-text-muted tracking-[1.8px] text-xs font-mono">{track.subtitle} • LOCKED SIGS + EP31 HARNESS</div>
                <p className="text-folana-text-secondary/90 font-serif italic leading-tight text-[14.5px] mt-3 pr-2">{track.description}</p>
              </div>

              {/* True Lyrics Sync Surface */}
              <div className="md:col-span-3 border-l border-white/10 pl-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-[10px] font-mono tracking-[3px] text-folana-neon-cyan">LIVE LYRIC SYNC • FROM music-lyric-signature.md + EP31 VEIL FRACTURE</div>
                  {currentLyric?.verse && <div className="text-[9px] px-2 py-px bg-folana-neon-pink/10 text-folana-neon-pink rounded font-mono tracking-widest">{currentLyric.verse}</div>}
                </div>
                <div className="min-h-[78px] font-serif italic text-[17px] leading-tight text-folana-ink transition-all duration-200">
                  “{currentLyric ? currentLyric.text : timedLyrics[0]?.text || 'The frequency is yours to shape.'}”
                </div>
                <div className="text-[10px] text-folana-text-muted/70 font-mono tracking-[1.5px] mt-2">Time-synced to playback • Tap waveform to seek • Harness re-invokes emit full ACMI pre/post</div>
              </div>
            </div>

            {/* Final immersive footer bar */}
            <div className="pt-3 mt-1 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono tracking-[2.5px] text-folana-text-muted/70">
              <div>PROTOTYPE REEL • LORA SECURED • CLI-ANYTHING EZ HARNESS FIRST-CLASS • FOLANA SIGNATURE LOCK ENFORCED</div>
              <button onClick={reinvokeHarness} className="px-4 py-1 border border-folana-neon-magenta/50 hover:bg-folana-neon-magenta/10 text-folana-neon-magenta rounded-full transition">DISPATCH NEXT EP32 VERSE TO PIPELINE INTEGRATOR →</button>
            </div>
          </div>
        </div>

        <div className="text-center text-[10px] font-mono tracking-[3px] text-folana-text-muted/50 pt-4">DEDICATED CINEMATIC MUSIC VIDEO EXPERIENCE • BIDIRECTIONAL SYNC WITH SIGIL GALLERY + STATIC TUNER + HARNESS CONSOLE</div>
      </motion.div>
    </div>
  );
}

export default MusicVideoPlayer;
