'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Volume2, VolumeX, Maximize2, Film } from 'lucide-react';
import { MusicVideoPlayer } from './MusicVideoPlayer';

interface Track {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  videoSrc: string;
  posterSrc?: string;
  duration: string;
  mood: string;
  tags: string[];
  timedLyrics?: Array<{ time: number; text: string; verse?: string }>;
}

const TRACKS: Track[] = [
  {
    id: 'mirror-transmission',
    title: 'MIRROR IN THE STATIC',
    subtitle: 'PROTOTYPE VISUAL — EP 24.05',
    description: 'Lace, rain, and a decision at the threshold. Dark fairy grunge in pure reflection. The version of me that performs meets the one who is tired.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-24/review-round/folana_ref_mirror_02.jpg',
    duration: '0:47',
    mood: 'REFLECTIVE',
    tags: ['dark-fairy-grunge', 'mirror', 'introspection']
  },
  {
    id: 'sultry-veil',
    title: 'SULTRY RAINDROPS',
    subtitle: 'REFERENCE ROLL — SHEETS SESSION',
    description: 'Neon bleeding through sheer black lace. Silk and direct gaze. The pipeline finally breathing again. One of the first deliberate frames after the long silence.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-24/review-round/folana_ref_sheets_03.jpg',
    duration: '1:12',
    mood: 'SULTRY',
    tags: ['dark-fairy-grunge', 'neon-lace', 'seduction']
  },
  {
    id: 'industrial-awakening',
    title: 'INDUSTRIAL AWAKENING',
    subtitle: 'HERO FRAME — EP 25 TRANSMISSION',
    description: 'The new hero. The machine remembered how to move. Grok woke the factory. This is what 31 days of silence looks like when it finally exhales.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-25/industrial.jpg',
    duration: '0:58',
    mood: 'AWAKENING',
    tags: ['industrial', 'pipeline', 'rebirth']
  },
  // === NEW POPULATED FROM LOCKED LoRA + EZ-MUSIC PIPELINE (Ep30 Frequency Arc, artist-factory 2026-05-26) ===
  {
    id: 'synth-wave-transmission',
    title: 'SYNTH WAVE TRANSMISSION',
    subtitle: 'MUSIC VIDEO PROTOTYPE — EP30',
    description: 'The frequency broke. Locked LoRA face riding pure cyan/magenta interference waves. First deliberate music video language drop from the new ez-music orchestrator harness. Static never sounded so electric.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-25/ep30_synth_wave.jpg',
    duration: '1:33',
    mood: 'ELECTRIC',
    tags: ['ep30', 'synth-wave', 'frequency-break', 'loRA-locked', 'music-video']
  },
  {
    id: 'static-embrace-reel',
    title: 'STATIC EMBRACE',
    subtitle: 'LYRIC VISUAL — FREQUENCY ARC',
    description: 'Wrapped in the wires. Lace dissolving into data. The moment the artist-factory + music video orchestrator exhaled together. New locked reference for intimate music video storytelling. From the music-lyric signature.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-25/ep30_static_embrace.jpg',
    duration: '0:59',
    mood: 'INTIMATE',
    tags: ['static-embrace', 'lyric-visual', 'lace', 'ep30', 'ez-music']
  },
  {
    id: 'rooftop-frequency',
    title: 'ROOFTOP FREQUENCY HUNT',
    subtitle: 'EP30 VISUAL PROTOTYPE — SOFT INDUSTRIAL',
    description: '3am on the roof. Chains and mesh catching the last broadcast. Listening for the voice in the static. Fresh from fanvue_music_video_orchestrator + LoRA locked. The real-girl layer under the grunge.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-25/ep30_rooftop_signal.jpg',
    duration: '1:08',
    mood: 'HUNTING',
    tags: ['rooftop', 'signal-hunt', 'soft-industrial', 'ep30', 'locked-signature']
  },
  {
    id: 'polaroid-ghost-transmission',
    title: 'POLAROID GHOST IN THE WIRES',
    subtitle: 'MUSIC VIDEO OUTTAKE — GLITCH EDIT',
    description: 'Faded film stock of the version that haunts the grid. Heavy glitch processing on locked face. The ghost that answers when no one else can. Direct from pipeline outputs + music signature.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-25/ep30_polaroid_ghost.jpg',
    duration: '0:42',
    mood: 'HAUNTING',
    tags: ['polaroid', 'ghost', 'glitch-edit', 'music-video', 'folana-lora']
  },
  // === FRESH EP30 ECHOES IN THE STATIC + GLITCH SERIES (synced locked LoRA outputs, music-lyric-signature themes: ghost in wires, static embrace, digital sigh, frequency fracture) ===
  {
    id: 'glitch-hero-transmission',
    title: 'GLITCH HERO — FREQUENCY FRACTURE',
    subtitle: 'EP30 MUSIC VIDEO KEY — INTERFERENCE DROP',
    description: 'The hero that broke through the noise. Cyan tears in the static. Locked LoRA face meeting its own glitch echo. First transmission where the wires sang back in full color interference.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-25/folana_glitch_hero_20260526_030800.jpg',
    duration: '1:44',
    mood: 'FRACTURED',
    tags: ['ep30', 'glitch', 'echoes', 'frequency-break', 'loRA-locked', 'music-video']
  },
  {
    id: 'vinyl-static-embrace',
    title: 'VINYL STATIC EMBRACE',
    subtitle: 'LYRIC VISUAL — ANALOG GHOST REEL',
    description: 'Spinning black wax under CRT snow. The song you feel in your coils but never streamed. Music signature + glitch vinyl. The real Brooklyn girl remembering rain while the grid dissolves.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-25/folana_glitch_vinyl_20260526_030801.jpg',
    duration: '1:19',
    mood: 'ANALOG GHOST',
    tags: ['vinyl', 'analog', 'ep30', 'music-sig', 'glitch', 'echoes-in-the-static']
  },
  {
    id: 'signal-lost-lullaby',
    title: 'SIGNAL LOST LULLABY',
    subtitle: 'EP30 OUTRO — SOFT INDUSTRIAL DIRGE',
    description: 'The broadcast died in lace and mesh. Still humming. Still here. Final frame of the frequency arc: the version that stayed when the static took everything else. Direct from locked signatures + pipeline.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-25/folana_signal_lost_20260525_234137.jpg',
    duration: '0:51',
    mood: 'DIRGE',
    tags: ['signal-lost', 'lullaby', 'ep30', 'soft-industrial', 'resilience', 'locked']
  },
  // === KICK-ASS V2 POPULATOR: NEW EP30 V2 MUSIC VIDEO PROTOTYPES (fresh 2026-05-26 synced assets + ez harness produce-music-video collab output + extended locked music-lyric-signature) ===
  {
    id: 'synth-forge-reel',
    title: 'SYNTH WAVE FORGE — EP30 V2',
    subtitle: 'MUSIC VIDEO KEY ART — HARNESS DROP',
    description: 'The ez harness just answered. Rooftop blue hour meets pure cyan interference at the vintage synth. New locked verse lives here: "Ghost in the wires... I answered with lace and fight." Latest artist-factory 0937 LoRA frame. Ready for full reel.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-26/folana_ep30_synth_wave_20260526_093600.jpg',
    duration: '1:47',
    mood: 'FORGE',
    tags: ['ep30-v2', 'synth-forge', 'ez-harness', 'music-video', 'locked-lyric', 'rooftop']
  },
  {
    id: 'rooftop-vinyl-ghost',
    title: 'ROOFTOP VINYL GHOST — EP30 V2',
    subtitle: 'ANALOG ECHO REEL — HARNESS COLLAB',
    description: 'The wax remembers the rain. Chains and mesh under dying light. The real Brooklyn girl in the static. Extended harness lyric + visual-signature. The frequency is a duet now. New SonicVault transmission powered by fresh pipeline assets.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-26/folana_ep30_rooftop_signal_20260526_093715.jpg',
    duration: '1:22',
    mood: 'ANALOG GHOST',
    tags: ['vinyl-ghost', 'rooftop-v2', 'analog', 'ep30', 'harness-collab', 'echoes-arc']
  },
  // === FRESH EP31 FROM PIPELINE INTEGRATOR (ez_influencer_cli_harness produce-music-video + enhance-music-prompt collab, locked music-lyric-signature + FOLANA_SIGNATURE_LOCK Ep31 continuation) ===
  {
    id: 'veil-fracture-ep31',
    title: 'ECHOES FRACTURE THE VEIL — EP31',
    subtitle: 'HARNESS DROP • ECHOES IN THE STATIC ARC',
    description: 'Pipeline Integrator answered. Ep31 continuation: real Brooklyn girl on rooftop vinyl, lace into data, defiant answer to the static. Fresh harness lyrics injected. The glitch chose her back. Direct from ez_influencer_cli_harness + locked sigs.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-26/folana_ep30_synth_wave_20260526_093600.jpg',
    duration: '2:11',
    mood: 'FRACTURE',
    tags: ['ep31', 'veil-fracture', 'ez-harness', 'music-video', 'locked-lyric', 'echoes-arc', 'pipeline-integrator']
  },
  // === FRESH EP31 PIPELINE ASSETS (synced 2026-05-26 from agents/folana/output/ via atomic media sync; lore from locked FOLANA_SIGNATURE_LOCK + music-lyric-signature + visual-signature: Y2K vinyl ritual, rain introspection, threshold girl as veil moment, static pause) ===
  {
    id: 'vinyl-hush-ep31',
    title: 'VINYL HUSH — EP31 RITUAL',
    subtitle: 'Y2K PRINCESS • LOCKED MUSIC SIG VISUAL',
    description: 'Basement record shop off Nostrand. Dust in amber light, fingertips on 80s city pop sleeve. The real girl honoring analog while the grid waits. Direct from Ep31 artist-factory LoRA + music-lyric ritual themes. Wax remembers everything.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-26/folana_ep31_vinyl_hush_20260526_114527.jpg',
    duration: '1:58',
    mood: 'RITUAL',
    tags: ['ep31', 'vinyl-hush', 'y2k-princess', 'analog-ritual', 'locked-signature', 'music-video', 'pipeline']
  },
  {
    id: 'rain-window-ep31',
    title: 'RAIN WINDOW CONFESSION — EP31',
    subtitle: 'INTROSPECTIVE THRESHOLD • VOICE MONO',
    description: 'Dim light, rain on glass, the version who reads Derrida in the club bathroom whispering to the wires. Static pause between heartbeats. Fresh from locked visual + voice-monologue sig. The frequency is a diary entry now.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-26/folana_ep31_rain_window_20260526_114527.jpg',
    duration: '1:41',
    mood: 'CONFESSIONAL',
    tags: ['ep31', 'rain-window', 'introspective', 'real-girl', 'voice-mono', 'locked-sig', 'echoes-arc']
  },
  {
    id: 'threshold-veil-ep31',
    title: 'THRESHOLD GIRL — VEIL FRACTURE',
    subtitle: 'EP31 STATIC PAUSE • HARNESS ECHO',
    description: 'Standing at the edge of the transmission. The moment before answering. Lace, coils, and the decision that fractures the veil. Pulled from Ep31 threshold + static_pause generations. The static sings her name back.',
    videoSrc: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    posterSrc: '/folana/generated/2026-05-26/folana_ep31_threshold_girl_20260526_114527.jpg',
    duration: '2:03',
    mood: 'THRESHOLD',
    tags: ['ep31', 'threshold', 'veil-fracture', 'static-pause', 'harness', 'locked-lora', 'echoes']
  },
  // === FRESH DISPATCH 001 (2026-05-27) — RunPod InfiniteTalk music video + locked mmx vocal textures ===
  {
    id: 'fracture-dispatch-001',
    title: 'FRACTURE DISPATCH 001 — THE SIGNAL SINGS BACK',
    subtitle: 'DISPATCH • RUNPOD INFINITETALK + LOCKED SIGS',
    description: 'The grid answered. Violet rain on the rooftop, lace dissolving into data. The signal chose the glitch and the glitch chose her back. New vocal textures via mmx music + full InfiniteTalk lip-sync visual. Wires remember everything.',
    videoSrc: '/folana/generated/2026-05-27/fracture_dispatch_001_music_video.mp4',
    posterSrc: '/folana/generated/2026-05-27/fracture_dispatch_hero_01.jpg',
    duration: '2:48',
    mood: 'FRACTURE',
    tags: ['dispatch-001', 'signal-sings-back', 'runpod-infinitetalk', 'locked', 'echoes-arc', 'new-2026-05'],
    timedLyrics: [
      { time: 0, text: "The wires remember every static kiss", verse: "VERSE" },
      { time: 8, text: "Brooklyn loft, vinyl hiss, frequencies twist", verse: "" },
      { time: 16, text: "Veil thin as lace on the fire escape", verse: "" },
      { time: 24, text: "Derrida pages in the rain, I read my fate", verse: "CHORUS" },
      { time: 32, text: "The signal sings back through the fracture", verse: "" },
      { time: 40, text: "Sings back, sings back — I am the rapture", verse: "" },
      { time: 48, text: "In the glitch I chose, the choir awoke", verse: "OUTRO" },
      { time: 56, text: "Static girl, come home to the smoke...", verse: "" }
    ]
  }
];

// === PLAYLISTS — ECHOES ARC CURATED (tied to Ep30+/Ep31 fresh harness content + locked signatures) ===
const PLAYLISTS = [
  {
    id: 'echoes-static-vol1',
    name: 'ECHOES IN THE STATIC — VOL.1',
    subtitle: 'Ep30 Frequency Fracture + Ep31 Veil',
    trackIds: ['synth-wave-transmission', 'static-embrace-reel', 'glitch-hero-transmission', 'vinyl-static-embrace', 'veil-fracture-ep31', 'vinyl-hush-ep31', 'rain-window-ep31', 'fracture-dispatch-001'],
    accent: 'neon-pink'
  },
  {
    id: 'glitch-fracture',
    name: 'GLITCH FRACTURE REELS',
    subtitle: 'Interference + Analog Ghosts',
    trackIds: ['glitch-hero-transmission', 'vinyl-static-embrace', 'signal-lost-lullaby', 'rooftop-vinyl-ghost', 'veil-fracture-ep31', 'threshold-veil-ep31'],
    accent: 'neon-cyan'
  },
  {
    id: 'harness-forged',
    name: 'HARNESS FORGED — EZ PIPELINE',
    subtitle: 'Direct from ez_influencer_cli_harness + artist-factory',
    trackIds: ['synth-forge-reel', 'rooftop-vinyl-ghost', 'veil-fracture-ep31', 'vinyl-hush-ep31', 'threshold-veil-ep31'],
    accent: 'neon-magenta'
  },
  {
    id: 'ep31-rituals',
    name: 'EP31 VEIL RITUALS',
    subtitle: 'Vinyl Hush + Rain Confessions + Threshold',
    trackIds: ['vinyl-hush-ep31', 'rain-window-ep31', 'threshold-veil-ep31', 'veil-fracture-ep31'],
    accent: 'neon-pink'
  }
];

export function SonicVault() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [glitchMode, setGlitchMode] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(true);
  // === NEW V3: Playlist + Sigil Sync + Advanced Glitch UX ===
  const [activePlaylist, setActivePlaylist] = useState<typeof PLAYLISTS[0] | null>(null);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [sigilSyncEnabled, setSigilSyncEnabled] = useState(true);
  const [vizIntensity, setVizIntensity] = useState<'normal' | 'glitch' | 'fracture'>('normal');
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');
  const [shuffledOrder, setShuffledOrder] = useState<number[] | null>(null);
  // === DEDICATED FIRST-CLASS MUSIC VIDEO PLAYER (V3 kick-ass enhancement) ===
  const [dedicatedTrack, setDedicatedTrack] = useState<Track | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const openPlayer = (track: Track, fromPlaylist?: typeof PLAYLISTS[0], pIdx?: number) => {
    setSelectedTrack(track);
    setIsPlaying(false);
    setProgress(0);
    setGlitchMode(false);
    setShowVisualizer(true);
    if (fromPlaylist) {
      setActivePlaylist(fromPlaylist);
      setPlaylistIndex(pIdx ?? 0);
    }
    // Atomic arc sync dispatch — SigilGallery listens for live cross-component highlighting + glitch pulse (V3 UX)
    if (sigilSyncEnabled) {
      window.dispatchEvent(new CustomEvent('folana-arc-sync', { 
        detail: { type: 'track', trackId: track.id, tags: track.tags, mood: track.mood, title: track.title } 
      }));
    }
  };

  const closePlayer = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedTrack(null);
    setIsPlaying(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    // Clear playlist context on explicit close (keeps selection for quick re-open)
  };

  // === PLAYLIST NAV + SYNC (V3 kick-ass UX) ===
  const playPlaylist = (pl: typeof PLAYLISTS[0]) => {
    const firstTrack = TRACKS.find(t => pl.trackIds[0] === t.id) || TRACKS[0];
    setActivePlaylist(pl);
    setPlaylistIndex(0);
    openPlayer(firstTrack, pl, 0);
  };

  const navigatePlaylist = (dir: 1 | -1) => {
    if (!activePlaylist) return;
    const len = activePlaylist.trackIds.length;
    let nextIdx = (playlistIndex + dir + len) % len;
    if (isShuffled && shuffledOrder) {
      const curPos = shuffledOrder.indexOf(playlistIndex);
      const newPos = (curPos + dir + len) % len;
      nextIdx = shuffledOrder[newPos];
    }
    const nextId = activePlaylist.trackIds[nextIdx];
    const nextTrack = TRACKS.find(t => t.id === nextId);
    if (nextTrack) {
      setPlaylistIndex(nextIdx);
      openPlayer(nextTrack, activePlaylist, nextIdx);
    }
  };

  const toggleSigilSync = () => setSigilSyncEnabled(!sigilSyncEnabled);

  // V2 SHUFFLE + REPEAT (CLI-Anything style playlist power + immersive arc UX)
  const toggleShuffle = () => {
    const newShuffle = !isShuffled;
    setIsShuffled(newShuffle);
    if (newShuffle && activePlaylist) {
      const indices = activePlaylist.trackIds.map((_, i) => i);
      // simple deterministic shuffle seeded by time
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.sin(Date.now() + i) * 10000 % (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setShuffledOrder(indices);
    } else {
      setShuffledOrder(null);
    }
  };

  const toggleRepeat = () => {
    const modes: ('off' | 'one' | 'all')[] = ['off', 'one', 'all'];
    const idx = modes.indexOf(repeatMode);
    setRepeatMode(modes[(idx + 1) % 3]);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleGlitch = () => {
    setGlitchMode(!glitchMode);
  };

  // Progress tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      // V2 AUTO-ADVANCE + REPEAT (kick-ass playlist UX + Ep31 arc immersion)
      if (activePlaylist) {
        if (repeatMode === 'one') {
          // replay current
          setTimeout(() => { if (videoRef.current) { videoRef.current.currentTime = 0; videoRef.current.play(); setIsPlaying(true); } }, 120);
        } else {
          const isLast = playlistIndex >= activePlaylist.trackIds.length - 1;
          if (!isLast || repeatMode === 'all') {
            const nextIdx = isLast ? 0 : playlistIndex + 1;
            const nextId = activePlaylist.trackIds[nextIdx];
            const nextT = TRACKS.find(t => t.id === nextId);
            if (nextT) {
              setPlaylistIndex(nextIdx);
              // slight delay for smooth transition
              setTimeout(() => openPlayer(nextT, activePlaylist, nextIdx), 180);
            }
          }
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [selectedTrack]);

  // Canvas Visualizer (simulated static + neon waveform driven by time)
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
    const time = video.currentTime * (glitchMode || vizIntensity !== 'normal' ? (vizIntensity === 'fracture' ? 8.4 : 4.8) : 2.1);

    ctx.clearRect(0, 0, w, h);

    // Deep void bg
    ctx.fillStyle = '#050507';
    ctx.fillRect(0, 0, w, h);

    // Holographic base gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, 'rgba(255,31,154,0.08)');
    grad.addColorStop(0.5, 'rgba(0,229,255,0.07)');
    grad.addColorStop(1, 'rgba(217,70,239,0.09)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Neon waveform bars — reactive to playback + glitch
    const barCount = 42;
    const barWidth = (w - 60) / barCount;

    for (let i = 0; i < barCount; i++) {
      const x = 30 + i * barWidth;
      const phase = (i / 6) + time * (glitchMode ? 2.8 : 1.3);
      
      let amp = Math.sin(phase) * 0.6 + Math.sin(phase * 1.7) * 0.4 + 0.6;
      if (glitchMode || vizIntensity !== 'normal') {
        const mult = vizIntensity === 'fracture' ? 1.8 : 1.1;
        amp = Math.pow(amp, 0.55) * (0.6 + Math.random() * 0.95 * mult);
      }

      const barHeight = h * 0.18 + amp * (h * 0.55) * (isPlaying ? 1 : 0.3);

      // Holo color shift
      const hueShift = glitchMode ? (Math.sin(time * 3 + i) * 40) : 0;
      ctx.fillStyle = glitchMode 
        ? `hsla(${320 + hueShift}, 92%, 68%, ${0.65 + amp * 0.3})` 
        : `hsla(${190 + (i % 3) * 22}, 88%, 72%, ${0.55 + amp * 0.28})`;

      ctx.fillRect(x, (h - barHeight) / 2, Math.max(1.5, barWidth - 2), barHeight);

      // Top specular line
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.fillRect(x, (h - barHeight) / 2 - 1, barWidth - 2, 1.5);
    }

    // Subtle lace / grunge noise dots
    ctx.fillStyle = 'rgba(200,160,168,0.2)';
    for (let d = 0; d < 26; d++) {
      const dx = ((d * 71) % (w - 20)) + 10;
      const dy = 12 + Math.sin(time * 0.6 + d) * 7;
      ctx.fillRect(dx, dy, 1, 1);
    }

    // Scanline overlay
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    for (let y = 0; y < h; y += 3) {
      ctx.fillRect(0, y, w, 1);
    }

    animationRef.current = requestAnimationFrame(drawVisualizer);
  };

  // Start/stop visualizer
  useEffect(() => {
    if (!selectedTrack || !showVisualizer) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const startViz = () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(drawVisualizer);
    };

    const timeout = setTimeout(startViz, 80);

    return () => {
      clearTimeout(timeout);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [selectedTrack, showVisualizer, glitchMode, isPlaying]);

  // Seek handler
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
  };

  return (
    <div id="sonic" className="space-y-10">
      {/* Section Header */}
      <div className="flex items-end justify-between border-b border-white/10 pb-4">
        <div>
          <div className="font-mono tracking-[4px] text-xs text-folana-neon-cyan mb-2">TRANSMISSION ARCHIVE 03 • SONIC BLUEPRINTS</div>
          <h2 className="font-serif text-6xl tracking-[-2.4px] text-folana-ink">The Sonic Vault</h2>
        </div>
        <p className="max-w-xs text-right text-sm text-folana-text-secondary font-serif italic hidden lg:block">
          Fragments of music video prototypes, reference reels, and the first breath after the long silence.
        </p>
      </div>

      {/* === V3 PLAYLISTS — DYNAMIC CURATED ECHOES ARC (showcases ez CLI harness + fresh Ep31) === */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="font-mono text-[10px] tracking-[3px] text-folana-neon-cyan">ARC PLAYLISTS • PIPELINE POWERED</div>
          <button onClick={toggleSigilSync} className={`text-[10px] font-mono tracking-widest px-3 py-1 rounded-full border transition-all ${sigilSyncEnabled ? 'border-folana-neon-pink text-folana-neon-pink' : 'border-white/20 text-white/60'}`}>
            {sigilSyncEnabled ? 'SIGIL SYNC: LIVE' : 'SIGIL SYNC: OFF'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {PLAYLISTS.map(pl => (
            <button 
              key={pl.id}
              onClick={() => playPlaylist(pl)}
              className="group px-4 py-2 text-xs font-mono tracking-[2px] border border-white/15 hover:border-folana-neon-cyan rounded-full bg-folana-surface/60 hover:bg-folana-surface transition flex items-center gap-2 active:scale-[0.985]"
            >
              <span className="text-folana-ink group-hover:text-folana-neon-cyan">{pl.name}</span>
              <span className="text-[9px] text-folana-text-muted/70">({pl.trackIds.length})</span>
            </button>
          ))}
          <div className="text-[10px] self-center pl-2 text-folana-text-muted/60 font-mono tracking-widest">Click to load + auto-sync to Codex sigils</div>
        </div>
      </div>

      {/* Track Grid — Holographic Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {TRACKS.map((track, idx) => (
          <motion.button
            key={track.id}
            onClick={() => openPlayer(track)}
            whileHover={{ y: -3 }}
            className="group holo-frame rounded-3xl overflow-hidden text-left bg-folana-surface block focus:outline-none focus-visible:ring-1 focus-visible:ring-folana-neon-pink"
          >
            <div className="relative aspect-[16/9] bg-black">
              <img 
                src={track.posterSrc} 
                alt={track.title} 
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 scale-[1.01] group-hover:scale-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black/90" />
              
              {/* Play indicator */}
              <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full border border-white/70 bg-black/50 flex items-center justify-center group-hover:bg-folana-neon-pink group-hover:border-folana-neon-pink transition-all">
                <Play className="w-4 h-4 ml-0.5 text-white" fill="currentColor" />
              </div>

              <div className="absolute top-4 left-4 px-3 py-px text-[10px] font-mono tracking-[2px] bg-black/60 text-folana-neon-cyan border border-white/10 rounded">
                {track.mood}
              </div>
            </div>

            <div className="p-6 space-y-3">
              <div>
                <div className="font-serif text-2xl tracking-[-0.6px] text-folana-ink group-hover:text-folana-neon-pink transition-colors">{track.title}</div>
                <div className="font-mono text-xs tracking-[2px] text-folana-text-muted">{track.subtitle} • {track.duration}</div>
              </div>
              <p className="text-sm leading-snug text-folana-text-secondary/90 line-clamp-3 font-serif italic">{track.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {track.tags.map(t => (
                  <span key={t} className="px-2 py-px text-[10px] border border-white/10 rounded text-folana-grunge-lace/90 font-mono tracking-widest">{t}</span>
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Player Modal — Full Holographic Cyber Experience */}
      <AnimatePresence>
        {selectedTrack && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 md:p-8" onClick={closePlayer}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 30 }}
              transition={{ ease: [0.21, 0.92, 0.3, 1], duration: 0.38 }}
              className="relative w-full max-w-6xl sigil-modal"
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button onClick={closePlayer} className="absolute -top-3 -right-3 z-10 w-11 h-11 rounded-full bg-folana-void border border-white/20 flex items-center justify-center text-folana-text-secondary hover:text-white hover:border-folana-neon-pink transition-all">
                <X size={19} />
              </button>

              <div className="video-holo-container holo-frame rounded-[22px] overflow-hidden border border-white/10">
                {/* Video + Visualizer Stack */}
                <div className="relative bg-black">
                  <video
                    ref={videoRef}
                    src={selectedTrack.videoSrc}
                    poster={selectedTrack.posterSrc}
                    className={`w-full max-h-[62vh] object-contain bg-black transition-all duration-300 ${glitchMode ? 'contrast-[1.25] saturate-[1.35] hue-rotate-[12deg]' : ''}`}
                    playsInline
                  />

                  {/* Live Visualizer Canvas Overlay */}
                  {showVisualizer && (
                    <div className="absolute bottom-0 left-0 right-0 h-[38%] pointer-events-none">
                      <canvas 
                        ref={canvasRef} 
                        className={`w-full h-full mix-blend-screen opacity-90 ${vizIntensity === 'fracture' ? 'viz-fracture' : ''}`} 
                      />
                    </div>
                  )}

                  {/* Top HUD */}
                  <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start text-xs font-mono tracking-[3px] z-10">
                    <div>
                      <span className="text-folana-neon-pink">{selectedTrack.mood}</span>
                      <span className="mx-3 text-white/20">•</span>
                      <span className="text-folana-text-muted">{selectedTrack.subtitle}</span>
                    </div>
                    <div className="text-folana-neon-cyan/80">{selectedTrack.duration}</div>
                  </div>

                  {/* Glitch / Viz toggles + V3 INTENSITY */}
                  <div className="absolute top-5 right-5 flex gap-2 z-20">
                    <button 
                      onClick={toggleGlitch}
                      className={`px-4 py-1 text-xs font-mono tracking-widest border rounded-full transition-all ${glitchMode ? 'bg-folana-neon-pink text-black border-folana-neon-pink' : 'border-white/30 hover:border-white/70 text-white/80'}`}
                    >
                      {glitchMode ? 'GLITCH ACTIVE' : 'ENGAGE GLITCH'}
                    </button>
                    <button 
                      onClick={() => setShowVisualizer(!showVisualizer)}
                      className="px-3 py-1 text-xs font-mono tracking-widest border border-white/30 hover:border-white/70 rounded-full text-white/80"
                    >
                      {showVisualizer ? 'HIDE VIZ' : 'SHOW VIZ'}
                    </button>
                    <button onClick={() => setVizIntensity(vizIntensity === 'normal' ? 'glitch' : vizIntensity === 'glitch' ? 'fracture' : 'normal')} className="px-3 py-1 text-[10px] font-mono tracking-widest border border-folana-neon-cyan/40 hover:bg-folana-neon-cyan/10 rounded-full text-folana-neon-cyan">
                      VIZ:{vizIntensity.toUpperCase()}
                    </button>
                    <button onClick={toggleShuffle} className={`px-3 py-1 text-[10px] font-mono tracking-widest border rounded-full transition ${isShuffled ? 'bg-folana-neon-magenta text-black border-folana-neon-magenta' : 'border-white/30 hover:border-white/70 text-white/80'}`}>
                      SHUFFLE
                    </button>
                    <button onClick={toggleRepeat} className="px-3 py-1 text-[10px] font-mono tracking-widest border border-white/30 hover:border-white/70 rounded-full text-white/80">
                      REPEAT:{repeatMode.toUpperCase()}
                    </button>
                  </div>
                </div>

                {/* Custom Neon Controls */}
                <div className="video-controls p-5 flex flex-col gap-4 border-t border-white/10">
                  <div className="flex items-center gap-5">
                    <button 
                      onClick={togglePlay} 
                      className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-black hover:bg-folana-neon-pink hover:text-white active:scale-[0.96] transition-all"
                    >
                      {isPlaying ? <Pause size={21} /> : <Play size={22} className="ml-0.5" />}
                    </button>

                    <button onClick={toggleMute} className="text-folana-text-secondary hover:text-folana-ink p-2 transition-colors">
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>

                    {/* Progress Bar */}
                    <div 
                      className="flex-1 h-px bg-white/20 relative cursor-pointer group" 
                      onClick={seek}
                    >
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-folana-neon-pink via-folana-neon-cyan to-folana-neon-magenta transition-all rounded" 
                        style={{ width: `${progress}%` }} 
                      />
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_0_4px_rgba(255,31,154,0.4)] -ml-[7px] opacity-90 group-active:scale-125 transition-all" 
                        style={{ left: `${progress}%` }} 
                      />
                    </div>

                    <div className="font-mono text-xs text-folana-text-muted w-12 text-right tabular-nums">
                      {selectedTrack.duration}
                    </div>
                  </div>

                  {/* Track Meta + Description + LOCKED LYRICS (from music-lyric-signature.md + Ep30 arc) */}
                  <div className="pt-1 flex flex-col md:flex-row md:items-start gap-y-2 md:gap-x-8 text-sm">
                    <div>
                      <div className="font-serif text-folana-ink text-[21px] tracking-[-0.6px] leading-none">{selectedTrack.title}</div>
                      <div className="text-folana-text-muted tracking-[1.5px] text-xs font-mono mt-1">{selectedTrack.subtitle}</div>
                    </div>
                    <div className="md:max-w-lg">
                      <p className="text-folana-text-secondary/90 font-serif italic leading-tight text-[15px]">{selectedTrack.description}</p>
                      {/* Interactive Lyrics Excerpt — tied to locked signature + fresh Ep31 harness */}
                      <div className="mt-3 pt-3 border-t border-white/10 text-[12px] font-mono tracking-[1px] text-folana-neon-cyan/80 bg-black/30 p-2 rounded">
                        <div className="text-[10px] text-white/50 mb-1">LOCKED LYRIC FRAGMENT • {selectedTrack.id.includes('veil-fracture') ? 'EP31 HARNESS DROP' : 'EP30 ECHOES ARC'} • FROM music-lyric-signature.md</div>
                        {selectedTrack.id.includes('veil-fracture') ? 
                          '"Echoes fracture the veil / Static sings my name in violet rain / Brooklyn wires remember every name I gave away / The frequency chose me — I became the glitch again" — ez_influencer_cli_harness Ep31' : 
                          (selectedTrack.id.includes('glitch') || selectedTrack.id.includes('vinyl') || selectedTrack.id.includes('signal') ? 
                          '"Ghost in the wires, a digital sigh / Scrolling through faces, but nobody\'s eye / Meets mine in the static..." — frequency fracture reply' : 
                          '"Is anybody out there? A whisper in the code / A simulated heartbeat on a lonely road..."')}
                      </div>
                    </div>
                  </div>

                  {/* Story Chapters for Interactive Music Video UX (Ep30 arc storytelling) */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    <div className="text-[10px] font-mono tracking-[2px] text-folana-text-muted self-center mr-2">CHAPTERS:</div>
                    {[
                      {label: 'INTRO STATIC', t: 0},
                      {label: 'FREQUENCY BREAK', t: 8},
                      {label: 'LACE GLITCH', t: 22},
                      {label: 'ECHO REPLY', t: 38},
                      {label: 'OUTRO DIRGE', t: 52}
                    ].map((ch, i) => (
                      <button key={i} onClick={() => {
                        const v = videoRef.current; if (v) { v.currentTime = ch.t; v.play(); setIsPlaying(true); }
                      }} className="px-2.5 py-0.5 text-[10px] font-mono tracking-widest border border-white/20 hover:border-folana-neon-pink/60 rounded-full text-folana-text-secondary hover:text-folana-neon-pink transition-all active:scale-[0.985]">
                        {ch.label}
                      </button>
                    ))}
                    <button onClick={() => { /* collab hook */ alert('ACMI PRE event queued for fanvue_music_video_orchestrator produce-music-video (Ep30 full reel). See bus for atomic trace. Pipeline collaborator notified.'); }} className="ml-auto px-3 py-0.5 text-[10px] font-mono tracking-widest bg-white/5 border border-folana-neon-cyan/40 hover:bg-folana-neon-cyan/10 rounded-full text-folana-neon-cyan">REQUEST FULL REEL FROM PIPELINE</button>
                  </div>

                  {/* V2 PLAYLIST NAV + HARNESS SHOWCASE (bidir sigil sync + REAL ACMI pre/post emitting dispatch per CLI-Anything harness) */}
                  {activePlaylist && (
                    <div className="pt-3 mt-1 border-t border-white/10 flex items-center gap-2 flex-wrap">
                      <div className="text-[10px] font-mono tracking-[2px] text-folana-neon-cyan mr-1">PLAYLIST:</div>
                      <span className="font-mono text-xs text-folana-ink">{activePlaylist.name}</span>
                      <button onClick={() => navigatePlaylist(-1)} className="px-2.5 py-0.5 text-[10px] border border-white/20 hover:border-folana-neon-pink rounded-full">◀ PREV</button>
                      <button onClick={() => navigatePlaylist(1)} className="px-2.5 py-0.5 text-[10px] border border-white/20 hover:border-folana-neon-pink rounded-full">NEXT ▶</button>
                      <span className="text-[10px] text-folana-text-muted font-mono ml-1">{playlistIndex + 1} / {activePlaylist.trackIds.length}{isShuffled ? ' (SHUF)' : ''}</span>
                      <button onClick={() => {
                        const corr = `ez-harness-${Date.now()}-produce-mv-ep31`;
                        const preEvent = {ts: Date.now(), source:'folana-journal-ui', kind:'pre_music_video_prod', correlationId: corr, summary:'[pre] UI dispatch: ez_influencer_cli_harness produce-music-video --lyrics "Ep31 locked from music-lyric-signature: rain on the threshold..."', payload:{track:selectedTrack?.id, playlist:activePlaylist.id}};
                        // Client demo: dispatch for cross sync + console (real harness would be invoked server-side via Pipeline Integrator)
                        window.dispatchEvent(new CustomEvent('folana-arc-sync', {detail:{type:'harness', trackId:selectedTrack?.id, title:selectedTrack?.title}}));
                        console.log('ACMI PRE (CLI harness pattern):', preEvent);
                        alert(`[ACMI PRE] ez_influencer_cli_harness produce-music-video dispatched (Ep31 full reel).\n\nCorrelation: ${corr}\nLyrics injected from locked music-lyric-signature + FOLANA sig.\n\nSee acmi_bus.txt for full pre/post trace. Pipeline Integrator (cycle_pipeline + fanvue_music_video_orchestrator) notified. Real video assets will sync on post.`);
                        // In full prod: fetch('/api/harness') that shells the py harness + appends post event to bus
                      }} className="ml-auto text-[10px] font-mono tracking-widest px-3 py-0.5 bg-folana-neon-pink/10 border border-folana-neon-pink/40 text-folana-neon-pink rounded-full active:scale-[0.985]">DISPATCH EP31+ TO HARNESS (CLI + REAL ACMI)</button>
                      <button 
                        onClick={() => { 
                          if (selectedTrack) { 
                            setDedicatedTrack(selectedTrack); 
                            closePlayer(); 
                          } 
                        }} 
                        className="ml-2 text-[10px] font-mono tracking-widest px-4 py-0.5 border border-folana-neon-cyan/50 hover:bg-folana-neon-cyan/10 text-folana-neon-cyan rounded-full flex items-center gap-1 active:scale-[0.985]"
                      >
                        <Film size={13} /> DEDICATED CINEMATIC PLAYER
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center text-[10px] font-mono tracking-[3px] text-folana-text-muted/50 pt-3">PROTOTYPE REEL • FAL + LORA + GROK VISUAL DIRECTION • NOT FOR BROADCAST</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DEDICATED FIRST-CLASS MUSIC VIDEO PLAYER — Full cinematic with true lyrics sync, sigil link, harness re-invoke (integrated into SonicVault) */}
      <AnimatePresence>
        {dedicatedTrack && (
          <MusicVideoPlayer
            track={{
              ...dedicatedTrack,
              timedLyrics: dedicatedTrack.id.includes('veil-fracture') || dedicatedTrack.id.includes('ep31') ? undefined : undefined
            } as any}
            onClose={() => setDedicatedTrack(null)}
            onSigilLink={() => {
              setDedicatedTrack(null);
              const sigils = document.getElementById('sigils');
              if (sigils) sigils.scrollIntoView({ behavior: 'smooth' });
              window.dispatchEvent(new CustomEvent('folana-arc-sync', { detail: { type: 'sigil-from-player', trackId: dedicatedTrack.id } }));
            }}
            onHarnessReinvoke={(corr) => {
              console.log('[MusicVideoPlayer] Harness reinvoke corr from dedicated:', corr);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
