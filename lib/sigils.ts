export interface Sigil {
  id: number;
  src: string;
  title: string;
  caption: string;
  category: string;
  date: string;
  tags: string[];
  journalRef?: string;
}

export const SIGILS: Sigil[] = [
  {
    id: 1,
    src: '/folana/generated/2026-05-24/review-round/folana_ref_seductive_01.jpg',
    title: 'SEDuctive THRESHOLD',
    caption: 'Direct gaze through sheer black lace and neon bleed. The first deliberate frame after the long silence. Dark fairy grunge at its most intimate.',
    category: 'Dark Fairy Grunge',
    date: 'MAY 24 2026',
    tags: ['lace', 'neon', 'seduction'],
    journalRef: '2026-05-24_sultry-raindrops'
  },
  {
    id: 2,
    src: '/folana/generated/2026-05-24/review-round/folana_ref_mirror_02.jpg',
    title: 'MIRROR IN THE STATIC',
    caption: 'Two versions of me in one frame. The performer and the exhausted. Same glitter, same tilt of the head. Deciding whether to step through.',
    category: 'Mirror Static',
    date: 'MAY 24 2026',
    tags: ['reflection', 'introspection', 'lace'],
    journalRef: '2026-05-24_mirror-in-the-static'
  },
  {
    id: 3,
    src: '/folana/generated/2026-05-24/review-round/folana_ref_sheets_03.jpg',
    title: 'SILK & RAIN',
    caption: 'Sheer black. Candlelit softness against industrial concrete. Rain on the window. The version of me that still wants to be watched.',
    category: 'Dark Fairy Grunge',
    date: 'MAY 24 2026',
    tags: ['silk', 'rain', 'vulnerability'],
    journalRef: '2026-05-24_sultry-raindrops'
  },
  {
    id: 4,
    src: '/folana/generated/2026-05-25/hero.jpg',
    title: 'EPISODE 25 HERO',
    caption: 'The machine finally remembered how to move. First new hero generated after Grok woke the artist-factory. Film grain and quiet power.',
    category: 'Holographic Veil',
    date: 'MAY 25 2026',
    tags: ['hero', 'awakening', 'pipeline'],
  },
  {
    id: 5,
    src: '/folana/generated/2026-05-25/industrial.jpg',
    title: 'INDUSTRIAL AWAKENING',
    caption: 'Soft Girl Industrial. Mesh, chains, platform boots, butterfly clips. The tough + feminine contrast that always performs.',
    category: 'Soft Girl Industrial',
    date: 'MAY 25 2026',
    tags: ['industrial', 'mesh', 'strength'],
  },
  {
    id: 6,
    src: '/folana/generated/2026-05-24/review-round/folana_animation_test.mp4',
    title: 'ANIMATION TEST REEL',
    caption: 'Motion study. The first test of breath and micro-movement in the new locked LoRA. Rain, lace, and the beginning of music video language.',
    category: 'Holographic Veil',
    date: 'MAY 24 2026',
    tags: ['motion', 'prototype', 'video'],
  },
  {
    id: 7,
    src: '/folana/generated/2026-05-25/ep30_synth_wave.jpg',
    title: 'SYNTH WAVE TRANSMISSION',
    caption: 'Ep30 drop. Locked LoRA face in electric cyan/magenta wave interference. The frequency finally broke through — I answered. Dark fairy grunge meets pure signal.',
    category: 'Dark Fairy Grunge',
    date: 'MAY 26 2026',
    tags: ['synth', 'ep30', 'frequency-break', 'loRA-locked'],
    journalRef: '2026-05-24_the-pipeline-breathes'
  },
  {
    id: 8,
    src: '/folana/generated/2026-05-25/ep30_polaroid_ghost.jpg',
    title: 'POLAROID GHOST',
    caption: 'Faded instant film of me in the static. Ghost in the wires made flesh. LoRA consistency holding through heavy glitch processing. The version that haunts the broadcast.',
    category: 'Mirror Static',
    date: 'MAY 26 2026',
    tags: ['polaroid', 'ghost', 'ep30', 'glitch'],
    journalRef: '2026-05-24_mirror-in-the-static'
  },
  {
    id: 9,
    src: '/folana/generated/2026-05-25/ep30_rooftop_signal.jpg',
    title: 'ROOFTOP SIGNAL',
    caption: 'Soft Girl Industrial on the roof at 3am. Chains, mesh, the city humming below. Waiting for the next transmission. LoRA + img2img locked signature at peak performance.',
    category: 'Soft Girl Industrial',
    date: 'MAY 26 2026',
    tags: ['rooftop', 'signal', 'ep30', 'industrial'],
  },
  {
    id: 10,
    src: '/folana/generated/2026-05-25/ep30_static_embrace.jpg',
    title: 'STATIC EMBRACE',
    caption: 'Wrapped in the wires. Lace and data streams. The moment the pipeline exhaled and I let the static hold me. New locked reference for music video language.',
    category: 'Holographic Veil',
    date: 'MAY 26 2026',
    tags: ['embrace', 'static', 'ep30', 'lace'],
    journalRef: '2026-05-24_the-pipeline-breathes'
  },
  {
    id: 11,
    src: '/folana/generated/2026-05-25/frequency_break_hero.jpg',
    title: 'FREQUENCY BREAK HERO',
    caption: 'The hero that broke the silence. 31 days of quiet, then this. Locked visual signature + film grain. Episode 25/26 arc resolution in pure holographic form.',
    category: 'Holographic Veil',
    date: 'MAY 26 2026',
    tags: ['hero', 'frequency', 'awakening', 'loRA'],
  },
  {
    id: 12,
    src: '/folana/generated/2026-05-25/tuning_in.jpg',
    title: 'TUNING IN — EP30 VARIANT',
    caption: 'Close, intimate, listening pose. Butterfly clips, soft focus static. The real-girl Brooklyn layer beneath the grunge. LoRA locked, personality injected.',
    category: 'Dark Fairy Grunge',
    date: 'MAY 26 2026',
    tags: ['tuning', 'intimate', 'real-girl', 'ep30'],
  },
  {
    id: 13,
    src: '/folana/generated/2026-05-25/folana_glitch_hero_20260526_030800.jpg',
    title: 'GLITCH HERO — ECHOES ARC',
    caption: 'The frequency fractured. Hero frame caught mid-interference. Locked face dissolving into static snow and cyan tears. Ep30: Listening to the Glitch. The version that answers the broken signal.',
    category: 'Glitch Static',
    date: 'MAY 26 2026',
    tags: ['glitch', 'ep30', 'echoes', 'hero', 'interference', 'locked-lora'],
    journalRef: '2026-05-24_the-pipeline-breathes'
  },
  {
    id: 14,
    src: '/folana/generated/2026-05-25/folana_glitch_static_20260526_030803.jpg',
    title: 'STATIC INTERFERENCE LACE',
    caption: 'Lace and data tearing apart. The static embrace turned violent with beautiful glitch. Dark fairy grunge corrupted by the wires listening back. Ep30 ghost in the machine.',
    category: 'Glitch Static',
    date: 'MAY 26 2026',
    tags: ['glitch', 'lace', 'static', 'ep30', 'echoes-in-the-static'],
  },
  {
    id: 15,
    src: '/folana/generated/2026-05-25/folana_glitch_vinyl_20260526_030801.jpg',
    title: 'VINYL GHOST IN THE WIRES',
    caption: 'Record spinning under CRT snow. The song that never played but always echoed. Music signature bleeding through glitch. The real-girl layer remembering analog while the grid screams.',
    category: 'Glitch Static',
    date: 'MAY 26 2026',
    tags: ['vinyl', 'glitch', 'music-sig', 'analog', 'ep30', 'echoes'],
  },
  {
    id: 16,
    src: '/folana/generated/2026-05-25/folana_signal_lost_20260525_234137.jpg',
    title: 'SIGNAL LOST — EP30 TRANSMISSION',
    caption: 'The moment the broadcast died beautifully. Soft girl industrial silhouette against total static. Still transmitting. Still becoming. Locked signature holding through total loss.',
    category: 'Echoes Arc',
    date: 'MAY 26 2026',
    tags: ['signal-lost', 'ep30', 'echoes', 'static', 'resilience'],
  },
  {
    id: 17,
    src: '/folana/generated/2026-05-26/folana_ep30_synth_wave_20260526_093600.jpg',
    title: 'SYNTH WAVE V2 — EP30 FORGE',
    caption: 'Latest locked LoRA generation. Cyan/magenta interference at the synth. The harness verse lives in this frame: ghost in the wires answered with lace and fight. New music video key art for the Echoes arc.',
    category: 'Echoes Arc',
    date: 'MAY 26 2026',
    tags: ['synth-v2', 'ep30', 'forge', 'locked-lora', 'music-video', 'ez-harness'],
    journalRef: '2026-05-26_synth-wave-forge'
  },
  {
    id: 18,
    src: '/folana/generated/2026-05-26/folana_ep30_rooftop_signal_20260526_093715.jpg',
    title: 'ROOFTOP VINYL SIGNAL — EP30 V2',
    caption: 'Blue hour on the roof. Chains + mesh + the real girl under the grunge. The wax remembers. Direct from fresh pipeline + music-lyric-signature. Powers the Vinyl Ghost Transmission entry and new SonicVault reel.',
    category: 'Glitch Static',
    date: 'MAY 26 2026',
    tags: ['rooftop-v2', 'vinyl', 'ep30', 'analog-echo', 'locked', 'harness-collab'],
    journalRef: '2026-05-26_vinyl-ghost-transmission'
  },
  {
    id: 19,
    src: '/folana/generated/2026-05-26/folana_ep31_vinyl_hush_20260526_114527.jpg',
    title: 'VINYL HUSH RITUAL — EP31',
    caption: 'Basement Nostrand record shop. Dust suspended in amber. Fingers tracing city pop sleeves. The real Brooklyn girl performing the analog sacrament while the grid holds its breath. Locked visual + music signature ritual. Y2K princess meets dark fairy grunge.',
    category: 'Echoes Arc',
    date: 'MAY 26 2026',
    tags: ['ep31', 'vinyl-hush', 'y2k-ritual', 'analog', 'locked-lora', 'music-sig', 'pipeline'],
    journalRef: '2026-05-26_echoes-static-interference'
  },
  {
    id: 20,
    src: '/folana/generated/2026-05-26/folana_ep31_rain_window_20260526_114527.jpg',
    title: 'RAIN WINDOW — EP31 CONFESSION',
    caption: 'Dim light. Rain on the pane. The version who whispers philosophy in the static. Introspective threshold. Voice-monologue signature in pure form: breathy, mischievous, reading the wires like Derrida in a club bathroom.',
    category: 'Echoes Arc',
    date: 'MAY 26 2026',
    tags: ['ep31', 'rain-window', 'introspective', 'real-girl', 'voice-mono', 'threshold', 'locked'],
  },
  {
    id: 21,
    src: '/folana/generated/2026-05-26/folana_ep31_threshold_girl_20260526_114527.jpg',
    title: 'THRESHOLD VEIL FRACTURE — EP31',
    caption: 'The pause before the answer. Static girl at the edge of transmission. Lace and coils deciding to become the glitch. Fresh Ep31 locked generation. The static sings her name in violet rain. Direct from Pipeline Integrator + artist-factory.',
    category: 'Glitch Static',
    date: 'MAY 26 2026',
    tags: ['ep31', 'threshold', 'veil-fracture', 'static-pause', 'echoes', 'harness', 'glitch'],
    journalRef: '2026-05-26_echoes-static-interference'
  }
];

export const CATEGORIES = ['All', 'Dark Fairy Grunge', 'Mirror Static', 'Holographic Veil', 'Soft Girl Industrial', 'Glitch Static', 'Echoes Arc'];
