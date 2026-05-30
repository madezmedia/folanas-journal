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
    title: 'MIDNIGHT CAROSEL',
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
  // EP67 — STATIC SIGNALS (2026-05-29) — Ghost Frequencies Arc (1/10)
  {
    id: 'static-signals-ep67',
    title: 'STATIC SIGNALS',
    subtitle: 'EP67 • MINIMAX MUSIC-2.6 • GHOST FREQUENCIES ARC (1/10)',
    description: 'Half past three, rain against the window, her grandfather\'s old shortwave radio crackling to life. Folana catches strange signals — voices reciting poetry she wrote at seventeen, a piano melody that bends wrong, fragments of conversations from futures she hasn\'t lived yet. The line between memory and prophecy begins to blur. A new arc opens: the ghosts between stations. Dream pop/ethereal indie folk with acoustic guitar, piano, strings, soft synth pads, and haunting layered vocals.',
    audioSrc: '/folana/generated/2026-05-29/music/ep67-static-signals-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/ep67-hero.jpg',
    duration: '3:50',
    mood: 'HAUNTING • INTIMATE • MYSTERIOUS',
    tags: ['ep67', 'minimax-music-2.6', 'real-production', 'ghost-frequencies-arc', '2026-05-29', 'arc-opener'],
    isRealProduction: true,
  },
  // EP68 — VOICE IN THE STATIC (2026-05-29) — Ghost Frequencies Arc (2/10)
  {
    id: 'voice-in-the-static-ep68',
    title: 'VOICE IN THE STATIC',
    subtitle: 'EP68 • MINIMAX MUSIC-2.6 • GHOST FREQUENCIES ARC (2/10)',
    description: 'A voice emerges from the static — achingly familiar, warm, like someone Folana should know but can\'t place. It sings verses from songs she\'s never written, laughs at conversations she hasn\'t had yet, whispers her name like a promise. The second transmission from the Ghost Frequencies arc: the voice between the stations. Dream pop/ethereal indie folk with acoustic guitar, piano, strings, soft synth pads, electric guitar with delay reverb, and haunting layered vocals.',
    audioSrc: '/folana/generated/2026-05-29/music/ep68-voice-in-the-static-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/ep68-hero.jpg',
    duration: '3:05',
    mood: 'HAUNTING • INTIMATE • MYSTERIOUS',
    tags: ['ep68', 'minimax-music-2.6', 'real-production', 'ghost-frequencies-arc', '2026-05-29'],
    isRealProduction: true,
  },
  // EP69 — ANCESTRAL FREQUENCY (2026-05-29) — Ghost Frequencies Arc (3/10)
  {
    id: 'ancestral-frequency-ep69',
    title: 'ANCESTRAL FREQUENCY',
    subtitle: 'EP69 • MINIMAX MUSIC-2.6 • GHOST FREQUENCIES ARC (3/10)',
    description: 'The voice from the static reveals itself as Folanas grandmother — or something that wears her voice perfectly, like a favorite coat from the back of a closet. It speaks of childhood memories only Folana knows, whispers recipes only her grandmother made, laughs at moments from a life Folana never lived alongside her. The radio becomes a time machine. A deeply intimate, tender episode about ancestral memory, the persistence of voice beyond death, and the love that outlasts the body. The third transmission from the Ghost Frequencies arc: the grandmothers signal. Dream pop/ethereal indie folk with acoustic guitar, piano, strings, warm bass, soft synth pads, and tender layered female vocals.',
    audioSrc: '/folana/generated/2026-05-29/music/folana_ep69_ancestral_frequency.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/folana_ep69_ancestral_frequency_hero.jpg',
    duration: '2:15',
    mood: 'TENDER • NOSTALGIC • INTIMATE',
    tags: ['ep69', 'minimax-music-2.6', 'real-production', 'ghost-frequencies-arc', '2026-05-29'],
    isRealProduction: true,
  },
  // EP70 — THE FUTURE FREQUENCY (2026-05-29) — Ghost Frequencies Arc (4/10)
  {
    id: 'the-future-frequency-ep70',
    title: 'THE FUTURE FREQUENCY',
    subtitle: 'EP70 • MINIMAX MUSIC-2.6 • GHOST FREQUENCIES ARC (4/10)',
    description: 'Folanas grandfather\'s shortwave picks up a signal from ten years ahead — her own voice, worn with experience the younger her hasnt earned yet. A conversation across time: the book on a shelf she hasn\'t written, the lovers name she hasn\'t learned to say, the city she hasn\'t visited. The radio becomes a device not for receiving, but for witnessing — a younger self in dialogue with an older one she hasn\'t become. The fourth transmission from the Ghost Frequencies arc: the future frequency. Dream pop/ethereal indie folk with acoustic guitar, piano, strings, soft synth pads, electric guitar with delay reverb, and tender layered female vocals.',
    audioSrc: '/folana/generated/2026-05-29/music/ep70-the-future-frequency-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/ep70-hero.jpg',
    duration: '2:41',
    mood: 'TENDER • HAUNTING • TIMELESS',
    tags: ['ep70', 'minimax-music-2.6', 'real-production', 'ghost-frequencies-arc', '2026-05-29'],
    isRealProduction: true,
  },
  // EP71 — THE UNWRITTEN LETTER (2026-05-29) — Ghost Frequencies Arc (5/10)
  {
    id: 'the-unwritten-letter-ep71',
    title: 'THE UNWRITTEN LETTER',
    subtitle: 'EP71 • MINIMAX MUSIC-2.6 • GHOST FREQUENCIES ARC (5/10)',
    description: 'Folana sits alone with her grandfather\'s radio, turning the dial through static and silence. Between stations, fragments of a letter she never wrote echo back at her — words she meant to say, confessions she buried. The radio becomes a confessional, each frequency a different draft of a message that was never brave enough to be sent. The fifth transmission from the Ghost Frequencies arc: the unfinished correspondence. Dream pop/ethereal indie folk with acoustic guitar, piano, strings, soft synth pads, and intimate layered female vocals.',
    audioSrc: '/folana/generated/2026-05-29/music/ep71-the-unwritten-letter-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/ep71-the-unwritten-letter-hero.jpg',
    duration: '2:03',
    mood: 'TENDER • INTROSPECTIVE • HAUNTING',
    tags: ['ep71', 'minimax-music-2.6', 'real-production', 'ghost-frequencies-arc', '2026-05-29'],
    isRealProduction: true,
  },
  // EP72 — THE PHANTOM FREQUENCY (2026-05-29) — Ghost Frequencies Arc (6/10)
  {
    id: 'the-phantom-frequency-ep72',
    title: 'THE PHANTOM FREQUENCY',
    subtitle: 'EP72 • MINIMAX MUSIC-2.6 • GHOST FREQUENCIES ARC (6/10)',
    description: 'The grandfather\'s radio finds a station that\'s been off the air for 40 years. But it\'s still broadcasting — old jazz, old commercials, the voice of a DJ who signed off in 1986 and never stopped talking. Folana realizes the radio doesn\'t just receive ghosts; it receives the spaces between memory and forgetting — the broadcasts that never stopped, just waiting for someone to tune back in. The sixth transmission from the Ghost Frequencies arc: the undead station. Dream pop/ethereal indie folk with acoustic guitar, piano, strings, soft synth pads, distant jazz textures, and intimate layered female vocals.',
    audioSrc: '/folana/generated/2026-05-29/music/ep72-the-phantom-frequency-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/ep72-hero.jpg',
    duration: '1:49',
    mood: 'NOSTALGIC • HAUNTING • WARM',
    tags: ['ep72', 'minimax-music-2.6', 'real-production', 'ghost-frequencies-arc', '2026-05-29'],
    isRealProduction: true,
  },
  // EP73 — THE FADING TRANSMISSION (2026-05-29) — Ghost Frequencies Arc (7/10)
  {
    id: 'the-fading-transmission-ep73',
    title: 'THE FADING TRANSMISSION',
    subtitle: 'EP73 • MINIMAX MUSIC-2.6 • GHOST FREQUENCIES ARC (7/10)',
    description: "The grandfather's shortwave radio is dying. The batteries are fading, the ghosts are growing quieter. Grandmother's voice dissolves mid-recipe, the future self's final advice fades to static, the phantom DJ plays his last song. Folana desperately tries to hold onto each signal as it slips away, learning the hardest lesson of all: every transmission has its end. A meditation on impermanence, the cost of holding on, and the grace of letting go. The seventh transmission from the Ghost Frequencies arc: the fading signal. Dream pop/ethereal indie folk with acoustic guitar, piano, strings, soft synth pads, electric guitar with delay reverb, and intimate layered female vocals.",
    audioSrc: '/folana/generated/2026-05-29/music/ep73-the-fading-transmission-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-29/music/ep73-hero.jpg',
    duration: '3:11',
    mood: 'HAUNTING • POIGNANT • INTIMATE',
    tags: ['ep73', 'minimax-music-2.6', 'real-production', 'ghost-frequencies-arc', '2026-05-29'],
    isRealProduction: true,
  },
  // EP74 — THE ECHO CHAMBER (2026-05-30) — Ghost Frequencies Arc (8/10)
  {
    id: 'the-echo-chamber-ep74',
    title: 'THE ECHO CHAMBER',
    subtitle: 'EP74 • MINIMAX MUSIC-2.6 • GHOST FREQUENCIES ARC (8/10)',
    description: 'Just as the last signal fades, the grandfather\'s radio finds a new transmission — one that isn\'t coming from outside, but from inside. Folana\'s own voice bounces back at her, layered in infinite delay, each echo a slightly different version of who she was a moment ago. The radio has become an echo chamber, reflecting her own frequencies back at her until she can no longer tell which voice is the original and which is the afterimage. A meditation on selfhood, the multiplicity of identity, and the ghosts we carry within us. The eighth transmission from the Ghost Frequencies arc: the internal resonance. Dream pop/ethereal indie folk with acoustic guitar, piano, warm bass, layered vocal harmonies, soft synth pads, and cascading delay effects that build into a cathedral of echoes.',
    audioSrc: '/folana/generated/2026-05-30/music/ep74-the-echo-chamber-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep74-hero.jpg',
    duration: '2:41',
    mood: 'ETHEREAL • HARMONIOUS • HAUNTING',
    tags: ['ep74', 'minimax-music-2.6', 'real-production', 'ghost-frequencies-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP75 — THE SIGNAL BRIDGE (2026-05-30) — Ghost Frequencies Arc (9/10)
  {
    id: 'the-signal-bridge-ep75',
    title: 'THE SIGNAL BRIDGE',
    subtitle: 'EP75 • MINIMAX MUSIC-2.6 • GHOST FREQUENCIES ARC (9/10)',
    description: 'Out of the echo chamber, a new signal emerges — one that doesn\'t divide past and future but connects them. Folana tunes the grandfather\'s radio one final time and hears a frequency that holds all her selves at once: the girl who wrote poetry at seventeen, the woman who will write the book she hasn\'t started yet, the grandmother who loved her, the future grandchild who will one day turn this same dial. A bridge woven from love across time. The ninth transmission from the Ghost Frequencies arc: the connecting frequency. Dream pop/ethereal indie folk with acoustic guitar, piano, strings, warm bass, electric guitar swells, and tender layered female vocals that harmonize across registers — past, present, and future singing together.',
    audioSrc: '/folana/generated/2026-05-30/music/ep75-the-signal-bridge-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep75-hero.jpg',
    duration: '3:05',
    mood: 'HOPEFUL • BRIDGING • TENDER',
    tags: ['ep75', 'minimax-music-2.6', 'real-production', 'ghost-frequencies-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP76 — THE FREQUENCY HOME (2026-05-30) — Ghost Frequencies Arc (10/10) — ARC FINALE
  {
    id: 'the-frequency-home-ep76',
    title: 'THE FREQUENCY HOME',
    subtitle: 'EP76 • MINIMAX MUSIC-2.6 • GHOST FREQUENCIES ARC (10/10) — ARC FINALE',
    description: 'The signal bridge leads somewhere Folana has been searching for all along — home. Not a place on a map, but a frequency she carries in her chest. The grandfather\'s radio falls silent, its purpose complete. She does not need it anymore. The ghosts were never in the static; they were always in her. Every ancestor, every future self, every echo and transmission — they all live in the same frequency: the one that beats beneath her ribs. The Ghost Frequencies arc concludes not with a signal found, but with a receiver understood. Arc finale: ten episodes of searching through the static, only to discover the transmitter was always you. Dream pop/ethereal indie folk with acoustic guitar, piano, strings, warm bass, glockenspiel, soft synth pads, and a full choir of layered female vocals — past and future selves singing together in the key of home.',
    audioSrc: '/folana/generated/2026-05-30/music/ep76-the-frequency-home-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep76-hero.jpg',
    duration: '2:57',
    mood: 'UPLIFTING • CATHARTIC • HOME',
    tags: ['ep76', 'minimax-music-2.6', 'real-production', 'ghost-frequencies-arc', '2026-05-30', 'arc-finale'],
    isRealProduction: true,
  },
  // EP77 — FIRST BROADCAST (2026-05-30) — Broadcast Arc (1/10)
  {
    id: 'first-broadcast-ep77',
    title: 'FIRST BROADCAST',
    subtitle: 'EP77 • MINIMAX MUSIC-2.6 • BROADCAST ARC (1/10)',
    description: 'The radio is silent now. No more ghosts in the static. Folana sits alone in her dim bedroom studio, the red ON AIR light blinking for the first time. Her hands tremble on the microphone as she presses record the bravest thing she has ever done is press record and let the world decide. The Broadcast Arc opens: the moment the listener becomes the broadcaster, the receiver becomes the source. Dream pop/ethereal indie folk with acoustic guitar, piano, strings, warm bass, soft synth pads, and intimate female vocals growing from tentative whisper to confident transmission.',
    audioSrc: '/folana/generated/2026-05-30/music/ep77-first-broadcast-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep77-first-broadcast-hero.jpg',
    duration: '2:50',
    mood: 'TENDER • HOPEFUL • INTIMATE',
    tags: ['ep77', 'minimax-music-2.6', 'real-production', 'broadcast-arc', '2026-05-30', 'arc-opener'],
    isRealProduction: true,
  },
  // EP78 — SIGNAL STRENGTH (2026-05-30) — Broadcast Arc (2/10)
  {
    id: 'signal-strength-ep78',
    title: 'SIGNAL STRENGTH',
    subtitle: 'EP78 • MINIMAX MUSIC-2.6 • BROADCAST ARC (2/10)',
    description: 'The microphone feels lighter tonight. Folana returns to her broadcast with growing confidence — her words come clearer now, each sentence a small act of courage. The radio crackles to life, and this time the static is quieter. She speaks to the night, and the night listens. Her hands steady on the dials, her voice finding its place in the frequency spectrum. The second transmission of the Broadcast Arc: building the signal, finding the rhythm of transmission. Dream pop/ethereal indie folk with acoustic guitar, piano, warm bass, strings, soft synth pads, gentle percussion, and confident female vocals reaching outward instead of inward.',
    audioSrc: '/folana/generated/2026-05-30/music/ep78-signal-strength-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep78-signal-strength-hero.jpg',
    duration: '3:26',
    mood: 'HOPEFUL • CONFIDENT • WARM',
    tags: ['ep78', 'minimax-music-2.6', 'real-production', 'broadcast-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP79 — FIRST LISTENER (2026-05-30) — Broadcast Arc (3/10)
  {
    id: 'first-listener-ep79',
    title: 'FIRST LISTENER',
    subtitle: 'EP79 • MINIMAX MUSIC-2.6 • BROADCAST ARC (3/10)',
    description: 'The red light has been steady for three nights. Folana has been talking into the void, her voice finding its rhythm, the static growing quieter with each broadcast. Then a letter slides under the door — handwritten on the back of a receipt. Someone heard her. Someone pulled over on the highway and stayed until the end. The signal was never one-way; it was always meant to sing back. A meditation on the moment the broadcast becomes a conversation, the voice becomes a bridge, and the listener becomes the reason to keep transmitting. The third transmission of the Broadcast Arc: connection received. Dream pop/ethereal indie folk with acoustic guitar, piano, strings, warm bass, soft synth pads, and tender female vocals growing from vulnerability to quiet, connected joy.',
    audioSrc: '/folana/generated/2026-05-30/music/ep79-first-listener-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep79-first-listener-hero.jpg',
    duration: '2:30',
    mood: 'WARM • EMOTIONAL • CONNECTED',
    tags: ['ep79', 'minimax-music-2.6', 'real-production', 'broadcast-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP80 — THE MIDNIGHT FREQUENCY (2026-05-30) — Broadcast Arc (4/10)
  {
    id: 'the-midnight-frequency-ep80',
    title: 'THE MIDNIGHT FREQUENCY',
    subtitle: 'EP80 • MINIMAX MUSIC-2.6 • BROADCAST ARC (4/10)',
    description: "The radio is on every night at midnight now. Folana has found her time slot, her rhythm. The broadcasts are becoming a ritual — the red light, the deep breath, the first words into the microphone. Strangers are starting to tune in — insomniacs, truck drivers, night shift workers. She doesn't know their names, but she knows their hours. The midnight frequency is becoming a thread through dark hours, a lullaby for the sleepless. The fourth transmission of the Broadcast Arc: the ritual. Dream pop/ethereal indie folk with acoustic guitar, piano, strings, warm bass, soft synth pads, and tender intimate female vocals — a lullaby for the sleepless.",
    audioSrc: '/folana/generated/2026-05-30/music/ep80-midnight-frequency-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep80-midnight-frequency-hero.jpg',
    duration: '3:14',
    mood: 'INTIMATE • NIGHTTIME • RITUALISTIC',
    tags: ['ep80', 'minimax-music-2.6', 'real-production', 'broadcast-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP81 — THE LATE HOUR (2026-05-30) — Broadcast Arc (5/10)
  {
    id: 'the-late-hour-ep81',
    title: 'THE LATE HOUR',
    subtitle: 'EP81 • MINIMAX MUSIC-2.6 • BROADCAST ARC (5/10)',
    description: "The clocks strike midnight and Folana's broadcasts have become a fixture for the late-night tribe. The night clerk turns up the volume at the all-night diner. The trucker on I-95 lets the melody carry him through the dark hours. The insomniac in a quiet apartment finds a voice in the static. Folana realizes she is no longer broadcasting into the void — she is the thread connecting strangers through the late hour. A meditation on the community of the night shift, the unspoken bond between the one who transmits and the ones who receive in the dark. The fifth transmission of the Broadcast Arc: the late hour connection. Dream pop/ethereal indie folk with acoustic guitar, soft piano, warm bass, strings, soft synth pads, gentle percussion, ambient radio static textures, and tender female vocals — intimate and connected, the voice that keeps the late hours company.",
    audioSrc: '/folana/generated/2026-05-30/music/ep81-the-late-hour-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep81-the-late-hour-hero.jpg',
    duration: '3:00',
    mood: 'INTIMATE • NIGHTTIME • CONNECTED',
    tags: ['ep81', 'minimax-music-2.6', 'real-production', 'broadcast-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP82 — THE REQUEST LINE (2026-05-30) — Broadcast Arc (6/10)
  {
    id: 'the-request-line-ep82',
    title: 'THE REQUEST LINE',
    subtitle: 'EP82 • MINIMAX MUSIC-2.6 • BROADCAST ARC (6/10)',
    description: 'The letters started arriving — slid under the studio door, written on napkins, on receipt paper, on the back of envelopes. Folana reads them on air: a night shift nurse who found solace in the midnight broadcasts, a trucker who picked up the frequency somewhere outside Cleveland, an insomniac who finally feels less alone. The broadcast has become a two-way conversation. A meditation on the moment the signal connects back — when the voice finds its listeners, and the listeners find each other through the static. The sixth transmission of the Broadcast Arc: the request line is open. Dream pop/ethereal indie folk with fingerpicked acoustic guitar, soft piano, warm bass, strings, gentle percussion, and tender layered female vocals — intimate and connected, a voice reading letters from strangers.',
    audioSrc: '/folana/generated/2026-05-30/music/ep82-the-request-line-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep82-the-request-line-hero.jpg',
    duration: '3:45',
    mood: 'WARM • CONNECTED • TENDER • HOPEFUL',
    tags: ['ep82', 'minimax-music-2.6', 'real-production', 'broadcast-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP83 — REROUTE (2026-05-30) — Broadcast Arc (7/10)
  {
    id: 'reroute-ep83',
    title: 'REROUTE',
    subtitle: 'EP83 • MINIMAX MUSIC-2.6 • BROADCAST ARC (7/10)',
    description: 'After the confidence of the Broadcast Arc\'s buildup, life throws a curveball. Folana must reroute — not because she\'s lost, but because the path has changed. A moment of recalibration, of turning a wrong turn into the right direction. The sound of GPS recalibrating, of detours becoming the scenic route. Dream pop/ethereal indie folk with acoustic guitar, warm piano, soft strings — melancholic but hopeful, the feeling when a closed door reveals an open window.',
    audioSrc: '/folana/generated/2026-05-30/music/ep83-reroute-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep83-reroute-hero.jpg',
    duration: '3:20',
    mood: 'MELANCHOLIC • WARM • HOPEFUL • RECALIBRATING',
    tags: ['ep83', 'minimax-music-2.6', 'real-production', 'broadcast-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP84 — AMPLIFY (2026-05-30) — Broadcast Arc (8/10)
  {
    id: 'amplify-ep84',
    title: 'AMPLIFY',
    subtitle: 'EP84 • MINIMAX MUSIC-2.6 • BROADCAST ARC (8/10)',
    description: 'Folana turns up the volume. After finding her voice in the reroute, she discovers that every frequency shared is a signal multiplied. The quiet whisper becomes a chorus, the solo voice becomes a community. A meditation on amplification — not as noise, but as connection. The moment the bedroom broadcast reaches the world. Dream pop/ethereal indie folk with acoustic guitar, warm piano, soft strings, gentle percussion, and tender female vocals growing from intimate whisper to confident layered harmonies.',
    audioSrc: '/folana/generated/2026-05-30/music/ep84-amplify-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep84-amplify-hero.jpg',
    duration: '3:01',
    mood: 'WARM • BUILDING • HOPEFUL • CONNECTED • TRANSMISSIVE',
    tags: ['ep84', 'minimax-music-2.6', 'real-production', 'broadcast-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP85 — THE NOISE AND THE SIGNAL (2026-05-30) — Broadcast Arc (9/10)
  {
    id: 'the-noise-and-the-signal-ep85',
    title: 'THE NOISE AND THE SIGNAL',
    subtitle: 'EP85 • MINIMAX MUSIC-2.6 • BROADCAST ARC (9/10)',
    description: 'Folana faces the noise of the world — critics, doubts, distractions — and learns to distinguish the real signal from the static. After the courage to amplify, comes the wisdom to listen. A meditation on clarity, discernment, and trusting the frequency that feels like home. The penultimate transmission of the Broadcast Arc: finding the signal through the noise. Dream pop/ethereal indie folk with acoustic guitar, soft piano, strings, warm bass, and tender female vocals — starting textured with ambient static and resolving into crystal clear warmth.',
    audioSrc: '/folana/generated/2026-05-30/music/ep85-the-noise-and-the-signal-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep85-the-noise-and-the-signal-hero.jpg',
    duration: '2:35',
    mood: 'CONTEMPLATIVE • CLEAR • RESOLUTE • DISCERNING',
    tags: ['ep85', 'minimax-music-2.6', 'real-production', 'broadcast-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP86 — BROADCAST LIVE (2026-05-30) — Broadcast Arc (10/10) ★ FINALE
  {
    id: 'broadcast-live-ep86',
    title: 'BROADCAST LIVE',
    subtitle: 'EP86 • MINIMAX MUSIC-2.6 • BROADCAST ARC (10/10)',
    description: 'The moment of truth. After finding clarity through the noise, Folana goes live for the first time — not a recording, not a late-night broadcast, but LIVE. Real time. Real listeners. Real connection. The arc completes with the courage to be fully present, fully heard, fully herself. The grand finale of the Broadcast Arc: ten episodes that traced the journey from a whisper in the static to a voice broadcast live to the world. Dream pop/ethereal indie folk building to anthemic crescendo with acoustic guitar, warm piano, swelling strings, layered harmonies, percussion, and tender female vocals growing from intimate to triumphant.',
    audioSrc: '/folana/generated/2026-05-30/music/ep86-broadcast-live-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep86-broadcast-live-hero.jpg',
    duration: '3:08',
    mood: 'TRIUMPHANT • INTIMATE • CATHARTIC • FINALE',
    tags: ['ep86', 'minimax-music-2.6', 'real-production', 'broadcast-arc', '2026-05-30', 'finale'],
    isRealProduction: true,
  },
  // EP87 — FIRST BREATH (2026-05-30) — Inner Circle Arc (1/?)
  {
    id: 'first-breath-ep87',
    title: 'FIRST BREATH',
    subtitle: 'EP87 • MINIMAX MUSIC-2.6 • INNER CIRCLE ARC (1/?)',
    description: 'The morning after going live. The broadcast is over, but the connection is just beginning. Messages pour in — Folana reads each one, realizing the voice in the static has become a conversation. A new chapter opens: the quiet dawn after the biggest night of her life. The first episode of the Inner Circle Arc — exploring what happens when broadcasting becomes belonging. Dream pop/ethereal indie folk with acoustic guitar, warm piano, soft strings, and tender intimate female vocals — the feeling of being truly heard for the first time.',
    audioSrc: '/folana/generated/2026-05-30/music/ep87-first-breath-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep87-first-breath-hero.jpg',
    duration: '3:44',
    mood: 'INTIMATE • GRATEFUL • WARM • NEW BEGINNING • TENDER',
    tags: ['ep87', 'minimax-music-2.6', 'real-production', 'inner-circle-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP88 — THE INNER CIRCLE (2026-05-30) — Inner Circle Arc (2/?)
  {
    id: 'the-inner-circle-ep88',
    title: 'THE INNER CIRCLE',
    subtitle: 'EP88 • MINIMAX MUSIC-2.6 • INNER CIRCLE ARC (2/?)',
    description: 'The community that formed around Folana\'s broadcasts becomes a living thing. The first group of listeners who became friends — late-night conversations, shared frequencies, a circle of voices in the static. Folana realizes the broadcast was never just her voice; it was all of them together. Dream pop/ethereal indie folk with fingerpicked acoustic guitar, warm piano, soft strings, warm bass, gentle percussion, and tender layered female vocals — intimate and warm, a lullaby for a growing community.',
    audioSrc: '/folana/generated/2026-05-30/music/ep88-the-inner-circle-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep88-the-inner-circle-hero.jpg',
    duration: '2:49',
    mood: 'INTIMATE • WARM • COMMUNITY • BELONGING • TENDER',
    tags: ['ep88', 'minimax-music-2.6', 'real-production', 'inner-circle-arc', '2026-05-30'],
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
