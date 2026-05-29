/**
 * Music Manifest for Folana Journal
 * 
 * Source of truth priority:
 * 1. Explicit real productions (Dispatch 001 + future mmx drops)
 * 2. Dynamic extraction from journal-entries/*.md frontmatter (media_urls containing .mp3/.mp4)
 * 
 * This replaces most of the hardcoded TRACKS array with truth-oriented data.
 * Locked signature enforced: real assets only for "Real Productions".
 */

export interface RealTrack {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  audioSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  journalEntry?: string;   // Link to the corresponding journal entry
  duration: string;
  mood: string;
  tags: string[];
  timedLyrics?: Array<{ time: number; text: string; verse?: string }>;
  isRealProduction: true;
  // New optional fields for B-roll + RunPod video pipeline (2026-05-27)
  brollFolder?: string;
  falAutonomousBroll?: string[];
  falBrollNote?: string;
  runpodJobs?: {
    front_3_4?: string;
    side_profile?: string;
    status?: string;
    frontVideo?: string;
    sideVideo?: string;
    imageRef?: string;
    submittedAt?: string;
    completedAt?: string;
  };
}

export interface PrototypeTrack {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  posterSrc?: string;
  duration: string;
  mood: string;
  tags: string[];
  isPrototype: true;
}

// Real Productions from the pipeline (2026-05-27)
export const REAL_PRODUCTIONS: RealTrack[] = [
  {
    id: 'fracture-dispatch-001',
    title: 'FRACTURE DISPATCH 001 — THE SIGNAL SINGS BACK',
    subtitle: 'DISPATCH • REAL PRODUCTION (mmx + RunPod InfiniteTalk)',
    description: 'The grid answered. Violet rain on the rooftop, lace dissolving into data. The signal chose the glitch and the glitch chose her back. Real mmx music + full InfiniteTalk lip-sync video.',
    audioSrc: '/folana/generated/2026-05-27/fracture_dispatch_001_signal_sings_back.mp3',
    videoSrc: '/folana/generated/2026-05-27/fracture_dispatch_001_music_video.mp4',
    posterSrc: '/folana/generated/2026-05-27/fracture_dispatch_hero_01.jpg',
    duration: '2:48',
    mood: 'FRACTURE',
    tags: ['dispatch-001', 'real-production', 'runpod-infinitetalk', 'mmx-music', 'locked'],
    isRealProduction: true,
  },
  {
    id: 'ethereal-dispatch',
    title: 'ETHEREAL DISPATCH',
    subtitle: 'AMBIENT • PIPELINE DROP',
    description: 'Dreamy, atmospheric transmission. Soft synths and distant frequencies from the recent pipeline run. A quiet moment between the heavier dispatches.',
    audioSrc: '/folana/generated/2026-05-27/music/folana_ethereal_dispatch.mp3',
    posterSrc: '/folana/generated/2026-05-25/frequency_break_hero.jpg',
    journalEntry: '/entries/2026-05-27_ethereal-dispatch',
    brollFolder: '/folana/generated/broll/ethereal-dispatch-2026-05-27',
    // NEW: 8 high-consistency B-roll stills from live autonomous FAL test (Test→Optimize→Register complete)
    falAutonomousBroll: [
      '/folana/generated/2026-05-27/broll/ethereal-dispatch-fal-autonomous/broll_1779903449.png',
      '/folana/generated/2026-05-27/broll/ethereal-dispatch-fal-autonomous/broll_1779903471.png',
      '/folana/generated/2026-05-27/broll/ethereal-dispatch-fal-autonomous/broll_1779903490.png',
      '/folana/generated/2026-05-27/broll/ethereal-dispatch-fal-autonomous/broll_1779903521.png',
      '/folana/generated/2026-05-27/broll/ethereal-dispatch-fal-autonomous/broll_1779903538.png',
      '/folana/generated/2026-05-27/broll/ethereal-dispatch-fal-autonomous/broll_1779903567.png',
      '/folana/generated/2026-05-27/broll/ethereal-dispatch-fal-autonomous/broll_1779903588.png',
      '/folana/generated/2026-05-27/broll/ethereal-dispatch-fal-autonomous/broll_1779903636.png',
    ],
    falBrollNote: 'Autonomous FAL + cloud LoRA + locked full-body reference test run (May 27). 8 scenes generated, MiniMax vision scored. High likeness confirmed on review: voluminous curly/coily hair, dark skin, cyber-realistic grunge lace/holo outfits, rain + neon blue-hour rooftop. Scoring gate relaxed 7→6 for pilot after strong visual results.',
    // RunPod InfiniteTalk jobs (kicked off 2026-05-27 19:13 UTC via automation script)
    runpodJobs: {
      front_3_4: "41a24cfb-dc7f-42a3-80fa-c54e01b6bafb-u1",
      side_profile: "74a0650e-f458-4393-807f-ea27e89a367b-u1",
      status: "COMPLETED",
      frontVideo: "/folana/generated/2026-05-27/videos/ethereal-dispatch-fal-front.mp4",
      sideVideo: "/folana/generated/2026-05-27/videos/ethereal-dispatch-fal-side.mp4",
      imageRef: "broll_1779903636.png (strong reviewed FAL autonomous B-roll)",
      submittedAt: "2026-05-27T19:13:40Z",
      completedAt: "2026-05-27T19:31:00Z"
    },
    duration: '—',
    mood: 'ETHEREAL',
    tags: ['ambient', 'pipeline', '2026-05-27', 'real-production', 'broll-test', 'fal-autonomous', 'locked-ref'],
    isRealProduction: true,
  },
  {
    id: 'elopement-hope',
    title: 'ELOPEMENT HOPE',
    subtitle: 'AMBIENT • EDUCATIONAL SERIES',
    description: 'Uplifting dream pop created for the elopement narrative. Warm pads and delicate piano.',
    audioSrc: '/folana/generated/2026-05-27/music/folana_elopement_hope.mp3',
    posterSrc: '/folana/generated/2026-05-27/fracture_dispatch_hero_01.jpg',
    duration: '—',
    mood: 'HOPEFUL',
    tags: ['elopement', 'ambient', 'uplifting'],
    isRealProduction: true,
  },
  {
    id: 'signal-ambient-remix',
    title: 'SIGNAL AMBIENT REMIX',
    subtitle: 'AMBIENT REWORK',
    description: 'Cinematic ambient rework of the Dispatch 001 signal. Atmospheric pads and gentle echoes.',
    audioSrc: '/folana/generated/2026-05-27/music/folana_signal_ambient_remix.mp3',
    posterSrc: '/folana/generated/2026-05-27/fracture_dispatch_hero_01.jpg',
    duration: '—',
    mood: 'AMBIENT',
    tags: ['remix', 'ambient', 'cinematic'],
    isRealProduction: true,
  },
  // EP41 — THE GLITCH BETWEEN (2026-05-28) — Day Cycle: Dawn intro
  {
    id: 'the-glitch-between-ep41',
    title: 'THE GLITCH BETWEEN',
    subtitle: 'EP41 • PROGRAMMATIC FALLBACK • DAY CYCLE: DAWN',
    description: 'Digital identity, the space between frames, curated ghosts. CRT hum, glass skin rituals from Seoul, platform boots from Brooklyn, poetry on the F train. Folana\'s first programmatic spoken word piece — the glitch between yesterday and tomorrow.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep41_the_glitch_between.mp3',
    duration: '0:30',
    mood: 'DIGITAL • INTROSPECTIVE',
    tags: ['ep41', 'programmatic-fallback', 'day-cycle', 'dawn', '2026-05-28'],
    isRealProduction: true,
  },
  // EP42 — GLASS SKIN, GLASS HEARTS (2026-05-28) — Day Cycle: Dawn
  {
    id: 'glass-skin-glass-hearts-ep42',
    title: 'GLASS SKIN, GLASS HEARTS',
    subtitle: 'EP42 • PROGRAMMATIC FALLBACK • DAY CYCLE: DAWN',
    description: 'Glass skin as vulnerability metaphor — the art of being seen through. K-beauty turned into meditation on translucency, nostalgia as texture, and the sharp edges of shattering beautifully. We had less resolution and more presence.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep42_glass_skin_glass_hearts.mp3',
    duration: '0:30',
    mood: 'VULNERABLE • TRANSPARENT',
    tags: ['ep42', 'programmatic-fallback', 'day-cycle', 'dawn', '2026-05-28'],
    isRealProduction: true,
  },
  // EP43 — ELOPEMENT HOPE (2026-05-28) — Day Cycle: Dawn
  {
    id: 'elopement-hope-ep43',
    title: 'ELOPEMENT HOPE',
    subtitle: 'EP43 • PROGRAMMATIC FALLBACK • DAY CYCLE: DAWN',
    description: 'Hope as rebellion — tenderness over armour in a world that rewards hard edges. Blue hour in Brooklyn, the suspended moment between day and night, choosing to stay when running would be easier. The bravest thing is holding someone\'s hand in the static.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep43_elopement_hope.mp3',
    duration: '0:30',
    mood: 'HOPEFUL • TENDER',
    tags: ['ep43', 'programmatic-fallback', 'day-cycle', 'dawn', '2026-05-28'],
    isRealProduction: true,
  },
  // EP44 — DAWN FREQUENCY (2026-05-28) — Day Cycle: Dawn
  {
    id: 'dawn-frequency-ep44',
    title: 'DAWN FREQUENCY',
    subtitle: 'EP44 • PROGRAMMATIC FALLBACK • DAY CYCLE: DAWN',
    description: 'The morning after the blue hour — what staying means when the drama of the decision is over. Dawn courage, the quiet aftermath of choosing hope. The real frequency isn\'t the glitch or the signal — it\'s the hum of being alive.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep44_dawn_frequency.mp3',
    duration: '0:30',
    mood: 'QUIET • RESOLUTE',
    tags: ['ep44', 'programmatic-fallback', 'day-cycle', 'dawn', '2026-05-28'],
    isRealProduction: true,
  },
  // EP45 — MORNING HORIZON (2026-05-28) — Day Cycle: Morning
  {
    id: 'morning-horizon-ep45',
    title: 'MORNING HORIZON',
    subtitle: 'EP45 • PROGRAMMATIC FALLBACK • DAY CYCLE: MORNING',
    description: 'The first full morning — the horizon opens wide. No more fire escapes and alleys. Walking into the light, letting the world in. The antidote to the glitch is simply being alive in a normal, beautiful day.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep45_morning_horizon.mp3',
    duration: '0:30',
    mood: 'BRIGHT • OPEN',
    tags: ['ep45', 'programmatic-fallback', 'day-cycle', 'morning', '2026-05-28'],
    isRealProduction: true,
  },
  // EP46 — GOLDEN HOUR (2026-05-28) — Day Cycle: Afternoon
  {
    id: 'golden-hour-ep46',
    title: 'GOLDEN HOUR',
    subtitle: 'EP46 • PROGRAMMATIC FALLBACK • DAY CYCLE: AFTERNOON',
    description: 'The afternoon light — when everything glows amber and gold. Streets slow down, shadows stretch long, and the world softens into something worth living for. Rest is not a reward — it is a right. Let the light find you.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep46_golden_hour.mp3',
    duration: '0:30',
    mood: 'WARM • GOLDEN',
    tags: ['ep46', 'programmatic-fallback', 'day-cycle', 'afternoon', '2026-05-28'],
    isRealProduction: true,
  },
  // EP47 — DUSK DESCENDS (2026-05-28) — First real MiniMax music-2.6 song
  {
    id: 'dusk-descends-ep47',
    title: 'DUSK DESCENDS',
    subtitle: 'EP47 • MINIMAX MUSIC-2.6 • FIRST REAL SONG',
    description: 'The sun slips down. Not in a hurry. The space between day and night — where the world exhales and gives you permission to be slow. Sunset as a spiritual practice. Folana\'s first real MiniMax music-2.6 generation — warm ambience, poetic spoken word, piano and strings.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep47_dusk_descends.mp3',
    posterSrc: '/folana/generated/2026-05-28/music/folana_ep47_dusk_descends_hero.jpg',
    duration: '2:55',
    mood: 'WARM • MELANCHOLIC',
    tags: ['ep47', 'minimax-music-2.6', 'real-production', 'day-cycle', 'dusk', '2026-05-28'],
    isRealProduction: true,
  },
  // EP48 — STARS ABOVE (2026-05-28) — Day Cycle finale
  {
    id: 'stars-above-ep48',
    title: 'STARS ABOVE',
    subtitle: 'EP48 • MINIMAX MUSIC-2.6 • DAY CYCLE FINALE',
    description: 'Night sky meditation — the quiet surrender to darkness as stars emerge, one by one. The finale of the Day Cycle arc (Dawn → Morning → Golden Hour → Dusk → Night). Ethereal whispered vocals and drifting piano under cosmic silence.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep48_stars_above.mp3',
    posterSrc: '/folana/generated/2026-05-28/music/folana_ep48_stars_above_hero.jpg',
    duration: '2:37',
    mood: 'COSMIC • TENDER',
    tags: ['ep48', 'minimax-music-2.6', 'real-production', 'day-cycle', 'night', '2026-05-28'],
    isRealProduction: true,
  },
  // EP53 — ROOT & STONE (2026-05-28) — Elements: Earth (Arc 1/4)
  {
    id: 'root-and-stone-ep53',
    title: 'ROOT & STONE',
    subtitle: 'EP53 • MINIMAX MUSIC-2.6 • ELEMENTS ARC: EARTH (1/4)',
    description: 'The ground beneath your feet is older than the sun. Folana roots into the Elemental cycle — bedrock wisdom, ancient stone, and the stillness that holds you steady when the world gets loud. Acoustic guitar, deep resonant hum, and poetry from the soil.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep53_root_and_stone.mp3',
    posterSrc: '/folana/generated/2026-05-28/music/folana_ep53_root_and_stone_hero.jpg',
    duration: '4:03',
    mood: 'GROUNDED • ANCIENT',
    tags: ['ep53', 'minimax-music-2.6', 'real-production', 'elements-arc', 'earth', '2026-05-28'],
    isRealProduction: true,
  },
  // EP54 — TIDAL PULL (2026-05-28) — Elements: Water (Arc 2/4)
  {
    id: 'tidal-pull-ep54',
    title: 'TIDAL PULL',
    subtitle: 'EP54 • MINIMAX MUSIC-2.6 • ELEMENTS ARC: WATER (2/4)',
    description: 'The tide doesn\'t ask permission — it just comes and goes. Folana surrenders to the pull of the moon, letting the water teach her how to release, how to trust, how to let the current carry her home. Soft piano, waves washing ashore, and the quiet courage of letting go.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep54_tidal_pull.mp3',
    posterSrc: '/folana/generated/2026-05-28/music/folana_ep54_tidal_pull_hero.jpg',
    duration: '2:43',
    mood: 'FLUID • SURRENDER',
    tags: ['ep54', 'minimax-music-2.6', 'real-production', 'elements-arc', 'water', '2026-05-28'],
    isRealProduction: true,
  },
  // EP55 — WILDFIRE HEART (2026-05-28) — Elements: Fire (Arc 3/4)
  {
    id: 'wildfire-heart-ep55',
    title: 'WILDFIRE HEART',
    subtitle: 'EP55 • MINIMAX MUSIC-2.6 • ELEMENTS ARC: FIRE (3/4)',
    description: 'The spark that never dies. Folana rises from the ashes of winter — the inferno that clears the old to make space for the new. Fingerpicked guitar, building passion, and the fierce tenderness of transformation. Burn away the broken parts. Rise up from the spark.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep55_wildfire_heart.mp3',
    posterSrc: '/folana/generated/2026-05-28/music/folana_ep55_wildfire_heart_hero.jpg',
    duration: '2:44',
    mood: 'PASSIONATE • TRANSFORMATIVE',
    tags: ['ep55', 'minimax-music-2.6', 'real-production', 'elements-arc', 'fire', '2026-05-28'],
    isRealProduction: true,
  },
  // EP56 — STORM BREATH (2026-05-28) — Elements: Air (Arc 4/4) — FINALE
  {
    id: 'storm-breath-ep56',
    title: 'STORM BREATH',
    subtitle: 'EP56 • MINIMAX MUSIC-2.6 • ELEMENTS ARC: AIR (4/4)',
    description: 'The finale of the Elements Arc. The wind that carried the spark across the world. Folana stands on the mountain ridge — having walked through earth, surrendered to water, and risen from fire — and finally lets the air take her. The breath that holds it all. Soaring indie folk with ethereal vocals, sweeping strings, and the quiet triumph of arrival.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep56_storm_breath.mp3',
    posterSrc: '/folana/generated/2026-05-28/music/folana_ep56_storm_breath_hero.jpg',
    duration: '3:00',
    mood: 'UPLIFTING • LIBERATING',
    tags: ['ep56', 'minimax-music-2.6', 'real-production', 'elements-arc', 'air', '2026-05-28', 'arc-finale'],
    isRealProduction: true,
  },
  // EP57 — MIDNIGHT CAROUSEL (2026-05-28) — City Souls Arc opener
  {
    id: 'midnight-carousel-ep57',
    title: 'MIDNIGHT CAROUSEL',
    subtitle: 'EP57 • MINIMAX MUSIC-2.6 • CITY SOULS ARC (1/?)',
    description: 'The subway at midnight — a carousel of humanity spinning underground while the city sleeps above. Night workers, dreamers, the lost and found, sharing a quiet moment in the lull of the train. Gentle fingerpicked guitar, warm piano, and the quiet magic of strangers sharing a ride through the dark.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep57_midnight_carousel.mp3',
    posterSrc: '/folana/generated/2026-05-28/music/folana_ep57_midnight_carousel_hero.jpg',
    duration: '3:01',
    mood: 'TENDER • ATMOSPHERIC',
    tags: ['ep57', 'minimax-music-2.6', 'real-production', 'city-souls-arc', '2026-05-28', 'arc-opener'],
    isRealProduction: true,
  },
  // EP58 — STREET LAMPS & SHADOWS (2026-05-28) — City Souls Arc (2/?)
  {
    id: 'street-lamps-and-shadows-ep58',
    title: 'STREET LAMPS & SHADOWS',
    subtitle: 'EP58 • MINIMAX MUSIC-2.6 • CITY SOULS ARC (2/?)',
    description: 'Walking alone under amber street lamps on wet pavement at midnight — the quiet intimacy of being awake while the city sleeps around you. Footsteps echo between sleeping buildings, each pool of light a small stage in the dark. Acoustic fingerpicked guitar, soft piano, and the stillness of a world holding its breath until dawn.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep58_street_lamps_and_shadows.mp3',
    posterSrc: '/folana/generated/2026-05-28/music/folana_ep58_street_lamps_and_shadows_hero.jpg',
    duration: '2:42',
    mood: 'ATMOSPHERIC • INTROSPECTIVE',
    tags: ['ep58', 'minimax-music-2.6', 'real-production', 'city-souls-arc', '2026-05-28'],
    isRealProduction: true,
  },
  // EP59 — ALL-NIGHT DINER (2026-05-29) — City Souls Arc (3/?)
  {
    id: 'all-night-diner-ep59',
    title: 'ALL-NIGHT DINER',
    subtitle: 'EP59 • MINIMAX MUSIC-2.6 • CITY SOULS ARC (3/?)',
    description: 'Folana sits alone in a worn red vinyl booth at 3 AM, watching the night people come and go — the night shift nurse, the taxi driver reading his news, the old man who has been coming since \'63. A warm hymn to the havens that stay open when everything else closes. Gentle fingerpicked acoustic guitar, soft piano, warm bass — the comfort of being alone together under fluorescent light.',
    audioSrc: '/folana/generated/2026-05-29/music/folana_ep59_all_night_diner.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/folana_ep59_all_night_diner_hero.jpg',
    duration: '4:07',
    mood: 'TENDER • INTIMATE • NOSTALGIC',
    tags: ['ep59', 'minimax-music-2.6', 'real-production', 'city-souls-arc', '2026-05-29'],
    isRealProduction: true,
  },
  // EP60 — FIRST LIGHT (2026-05-29) — City Souls Arc (4/?)
  {
    id: 'first-light-ep60',
    title: 'FIRST LIGHT',
    subtitle: 'EP60 • MINIMAX MUSIC-2.6 • CITY SOULS ARC (4/?)',
    description: 'The city breathes its first amber breath at 4:30 AM. Bakers light their ovens, newspaper trucks rumble through sleeping streets, and the night waitress hands her apron to the morning crew. Folana watches from a diner window as the world softens into gold — a duet between the last star and the first bird. Acoustic fingerpicked guitars, warm piano, gentle strings, and the quiet beauty of a city waking up.',
    audioSrc: '/folana/generated/2026-05-29/music/folana_ep60_first_light.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/folana_ep60_first_light_hero.jpg',
    duration: '2:50',
    mood: 'WARM • HOPEFUL • DAWN',
    tags: ['ep60', 'minimax-music-2.6', 'real-production', 'city-souls-arc', '2026-05-29'],
    isRealProduction: true,
  },
  // EP61 — MORNING COMMUTE (2026-05-29) — City Souls Arc (5/?)
  {
    id: 'morning-commute-ep61',
    title: 'MORNING COMMUTE',
    subtitle: 'EP61 • MINIMAX MUSIC-2.6 • CITY SOULS ARC (5/?)',
    description: 'The 8 AM rush hour in the city — subway platforms packed with commuters, coffee shops buzzing with early orders, the energy of a thousand people moving in sync. But also the quiet moments: a woman reading on the train, a busker at the station, the shared glance between strangers. A celebration of the everyday rhythm that makes a city alive. Warm indie folk with gentle fingerpicked acoustic guitar, soft piano, warm bass — Folana finds poetry in the morning crowd.',
    audioSrc: '/folana/generated/2026-05-29/music/folana_ep61_morning_commute.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/folana_ep61_morning_commute_hero.jpg',
    duration: '3:10',
    mood: 'WARM • HOPEFUL • TENDER',
    tags: ['ep61', 'minimax-music-2.6', 'real-production', 'city-souls-arc', '2026-05-29'],
    isRealProduction: true,
  },
  // EP62 — NOON INTERLUDE (2026-05-29) — City Souls Arc (6/?)
  {
    id: 'noon-interlude-ep62',
    title: 'NOON INTERLUDE',
    subtitle: 'EP62 • MINIMAX MUSIC-2.6 • CITY SOULS ARC (6/?)',
    description: 'The city at its brightest — mid-afternoon, when the sun stands still above the skyline and the streets are molten gold. Folana finds herself on a rooftop cafe, watching the city hold its breath between the morning rush and the evening chaos. A warm, contemplative meditation on the nowhere and the everywhere — the center of the day when nothing is rushing and nothing is overdue. Indie folk/dream pop with fingerpicked acoustic guitar, warm piano, soft strings, gentle percussion, and ethereal female vocals.',
    audioSrc: '/folana/generated/2026-05-29/music/folana_ep62_noon_interlude.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/folana_ep62_noon_interlude_hero.jpg',
    duration: '2:43',
    mood: 'WARM • CONTEMPLATIVE • GOLDEN',
    tags: ['ep62', 'minimax-music-2.6', 'real-production', 'city-souls-arc', '2026-05-29'],
    isRealProduction: true,
  },
  // EP63 — AFTERNOON SHADOWS (2026-05-29) — City Souls Arc (7/?)
  {
    id: 'afternoon-shadows-ep63',
    title: 'AFTERNOON SHADOWS',
    subtitle: 'EP63 • MINIMAX MUSIC-2.6 • CITY SOULS ARC (7/?)',
    description: 'The quiet afternoon in the city — 2-3 PM on a slow Tuesday, sunlight through venetian blinds casting striped shadows across wooden floorboards. Folana sits on the fire escape with a cold coffee cup, a ginger cat curled beside her, watching dust particles float in the golden light. A meditation on the nowhere and the everywhere — the center of the day when nothing is rushing. Indie folk/dream pop with fingerpicked acoustic guitar, warm piano, soft strings, gentle percussion, and ethereal female vocals.',
    audioSrc: '/folana/generated/2026-05-29/music/folana_ep63_afternoon_shadows.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/folana_ep63_afternoon_shadows_hero.jpg',
    duration: '2:01',
    mood: 'WARM • CONTEMPLATIVE • TENDER',
    tags: ['ep63', 'minimax-music-2.6', 'real-production', 'city-souls-arc', '2026-05-29'],
    isRealProduction: true,
  },
  // EP64 — GOLDEN EVENING (2026-05-29) — City Souls Arc (8/?)
  {
    id: 'golden-evening-ep64',
    title: 'GOLDEN EVENING',
    subtitle: 'EP64 • MINIMAX MUSIC-2.6 • CITY SOULS ARC (8/?)',
    description: '5 PM in Brooklyn on a late spring day — the light turns amber, shadows stretch across the street. A woman waters her window plants, a kid chases a soccer ball, the bodega cat counts change on the step. Folana watches from her stoop as the whole block holds its breath in the golden hour. The slowest, warmest moment of the day — the evening that holds you closer than a promise. Indie folk/dream pop with fingerpicked acoustic guitar, soft piano, gentle strings, warm bass.',
    audioSrc: '/folana/generated/2026-05-29/music/folana_ep64_golden_evening.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/folana_ep64_golden_evening_hero.jpg',
    duration: '3:00',
    mood: 'WARM • GOLDEN • NOSTALGIC',
    tags: ['ep64', 'minimax-music-2.6', 'real-production', 'city-souls-arc', '2026-05-29'],
    isRealProduction: true,
  },
  // EP65 — DUSK DESCENDS (2026-05-29) — City Souls Arc (9/?)
  {
    id: 'dusk-descends-ep65',
    title: 'DUSK DESCENDS',
    subtitle: 'EP65 • MINIMAX MUSIC-2.6 • CITY SOULS ARC (9/?)',
    description: 'The purple and orange hour — when the sun melts into the horizon and the city holds its breath between day and night. Folana sits on the fire escape at dusk, the first stars appearing above the Brooklyn skyline, a ginger cat curled beside her. The energy shift as day people come home and night people lace up their boots. The slowest, most beautiful surrender — light giving way to dark over a warm mug of tea. Indie folk/dream pop with fingerpicked acoustic guitar, warm piano, soft strings, gentle percussion, and ethereal female vocals.',
    audioSrc: '/folana/generated/2026-05-29/music/folana_ep65_dusk_descends.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/folana_ep65_dusk_descends_hero.jpg',
    duration: '3:30',
    mood: 'WARM • TWILIGHT • INTROSPECTIVE',
    tags: ['ep65', 'minimax-music-2.6', 'real-production', 'city-souls-arc', '2026-05-29'],
    isRealProduction: true,
  },
  // EP66 — CITY LIGHTS (2026-05-29) — City Souls Arc (10/?)
  {
    id: 'city-lights-ep66',
    title: 'CITY LIGHTS',
    subtitle: 'EP66 • MINIMAX MUSIC-2.6 • CITY SOULS ARC (10/?)',
    description: 'Night falls completely, and the city becomes a galaxy of lights. Neon signs reflect on wet midnight streets, high-rise windows glow like stars in vertical canyons, and the city breathes a different rhythm after dark. Folana stands on a rooftop, looking out at the glittering skyline — the quiet thrill of being awake while millions sleep, of belonging to a city that never closes. Indie folk/dream pop with fingerpicked acoustic guitar, warm piano, soft strings, gentle percussion, and ethereal female vocals.',
    audioSrc: '/folana/generated/2026-05-29/music/folana_ep66_city_lights.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/folana_ep66_city_lights_hero.jpg',
    duration: '2:50',
    mood: 'ATMOSPHERIC • NIGHTFALL • TENDER',
    tags: ['ep66', 'minimax-music-2.6', 'real-production', 'city-souls-arc', '2026-05-29'],
    isRealProduction: true,
  },
];

// Prototype / early visual references (high quality stills + early experiments)
// These should be presented as beautiful visual codex, not fake playable music videos.
export const VISUAL_PROTOTYPES: PrototypeTrack[] = [
  // Ep30 / early harness prototypes (stills only for now)
  { id: 'synth-wave-transmission', title: 'SYNTH WAVE TRANSMISSION', subtitle: 'EP30 VISUAL PROTOTYPE', description: 'Locked LoRA face riding pure cyan/magenta interference waves. Early music video language experiment.', posterSrc: '/folana/generated/2026-05-25/ep30_synth_wave.jpg', duration: '—', mood: 'ELECTRIC', tags: ['ep30', 'prototype', 'visual-reference'], isPrototype: true },
  { id: 'static-embrace-reel', title: 'STATIC EMBRACE', subtitle: 'EP30 VISUAL REFERENCE', description: 'Wrapped in the wires. Lace dissolving into data. Early intimate music video language.', posterSrc: '/folana/generated/2026-05-25/ep30_static_embrace.jpg', duration: '—', mood: 'INTIMATE', tags: ['ep30', 'prototype'], isPrototype: true },
  // ... (additional prototypes can be added here from generated/ assets as they are reviewed)
];

// Combined for the Sonic Vault UI
export const ALL_MUSIC_TRACKS = [
  ...REAL_PRODUCTIONS,
  ...VISUAL_PROTOTYPES,
];

export function getRealProductions() {
  return REAL_PRODUCTIONS;
}

export function getVisualPrototypes() {
  return VISUAL_PROTOTYPES;
}
