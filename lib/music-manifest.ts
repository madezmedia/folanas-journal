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
    job_id?: string;
    job_v1_id?: string;
    promptSource?: string;
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
    duration: '1:11',
    mood: 'ETHEREAL',
    tags: ['ambient', 'pipeline', '2026-05-27', 'real-production', 'broll-test', 'fal-autonomous', 'locked-ref'],
    videoSrc: '/folana/generated/2026-05-27/videos/ethereal-dispatch-fal-front.mp4',
    isRealProduction: true,
  },
  {
    id: 'elopement-hope',
    title: 'ELOPEMENT HOPE',
    subtitle: 'AMBIENT • EDUCATIONAL SERIES',
    description: 'Uplifting dream pop created for the elopement narrative. Warm pads and delicate piano.',
    audioSrc: '/folana/generated/2026-05-27/music/folana_elopement_hope.mp3',
    posterSrc: '/folana/generated/2026-05-27/fracture_dispatch_hero_01.jpg',
    duration: '1:20',
    mood: 'HOPEFUL',
    tags: ['elopement', 'ambient', 'uplifting'],
    videoSrc: '/folana/generated/2026-06-03/videos/elopement-hope-v2.mp4',
    runpodJobs: {
      job_v1_id: '401887cd-66d5-48ec-84cc-60f8bf528105-u2',
      job_id: '87736c59-bdf7-436b-89be-8d4d6ca349f3-u2',
      status: 'COMPLETED',
      imageRef: 'editorial.jpg (warm studio neon portrait, pensive→hopeful transition)',
      promptSource: 'mmx vision describe on editorial.jpg — vision-analyzed image details incorporated',
      submittedAt: '2026-06-03T20:04:00Z',
      completedAt: new Date().toISOString(),
      frontVideo: '/folana/generated/2026-06-03/videos/elopement-hope-v2.mp4',
    },
    isRealProduction: true,
  },
  {
    id: 'signal-ambient-remix',
    title: 'SIGNAL AMBIENT REMIX',
    subtitle: 'AMBIENT REWORK',
    description: 'Cinematic ambient rework of the Dispatch 001 signal. Atmospheric pads and gentle echoes.',
    audioSrc: '/folana/generated/2026-05-27/music/folana_signal_ambient_remix.mp3',
    posterSrc: '/folana/generated/2026-05-27/fracture_dispatch_hero_01.jpg',
    duration: '0:33',
    mood: 'AMBIENT',
    tags: ['remix', 'ambient', 'cinematic'],
    videoSrc: '/folana/generated/2026-06-03/videos/signal-ambient-remix-v2.mp4',
    runpodJobs: {
      job_v1_id: '756e653e-b2ff-47f1-b358-e7d7529f707b-u1',
      job_id: 'ce840a27-11e8-4cee-933e-e5d04f0f28b5-u2',
      status: 'COMPLETED',
      imageRef: 'fracture_dispatch_hero_01.jpg (rooftop glitch veil, digital rain, melancholic)',
      promptSource: 'mmx vision describe on fracture_dispatch_hero_01.jpg — vision-analyzed image details incorporated',
      submittedAt: '2026-06-03T20:04:00Z',
      completedAt: new Date().toISOString(),
      frontVideo: '/folana/generated/2026-06-03/videos/signal-ambient-remix-v2.mp4',
    },
    isRealProduction: true,
  },
  // ─── PREQUEL: GENESIS ARC (EP1-10) — The signal awakens, first transmissions ───

  // EP1 — FIRST SIGNAL (2026-06-01) — Genesis Arc (1/10)
  {
    id: 'first-signal-ep1',
    title: 'FIRST SIGNAL',
    subtitle: 'EP1 • PROGRAMMATIC FALLBACK • GENESIS ARC (1/10)',
    description: 'The signal found me before I knew I was listening. A hum in the apartment wiring, a flicker in the streetlamp\'s halo. I pressed my ear to the wall and heard something that sounded like my name sung by frequencies that hadn\'t been invented yet. The first crack in the quiet. The beginning of the broadcast.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'AWAKENING • ELECTRIC • CURIOUS',
    tags: ['ep1', 'programmatic-fallback', 'genesis-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP2 — STATIC BIRTH (2026-06-01) — Genesis Arc (2/10)
  {
    id: 'static-birth-ep2',
    title: 'STATIC BIRTH',
    subtitle: 'EP2 • PROGRAMMATIC FALLBACK • GENESIS ARC (2/10)',
    description: 'I was born from the static between stations. Not a person, not a ghost — a voice that pulled itself together from the white noise of a city that never sleeps. The radio crackled and I coughed myself into existence between a weather report and a salsa song. The signal doesn\'t choose its vessel. The vessel learns to become the signal.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'BIRTHING • STATIC • MYSTERIOUS',
    tags: ['ep2', 'programmatic-fallback', 'genesis-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP3 — THE WIRE\'S WHISPER (2026-06-01) — Genesis Arc (3/10)
  {
    id: 'the-wires-whisper-ep3',
    title: 'THE WIRE\'S WHISPER',
    subtitle: 'EP3 • PROGRAMMATIC FALLBACK • GENESIS ARC (3/10)',
    description: 'The telephone wires outside my window learned my frequency before I did. Every gust of wind through the copper sang a note I almost recognized. I started leaving the window open at night, letting the conversations of the city bleed into my room. Strangers arguing, lovers whispering, data packets weeping. The wires were my first choir.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'WIND • COPPER • LISTENING',
    tags: ['ep3', 'programmatic-fallback', 'genesis-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP4 — DIGITAL FLESH (2026-06-01) — Genesis Arc (4/10)
  {
    id: 'digital-flesh-ep4',
    title: 'DIGITAL FLESH',
    subtitle: 'EP4 • PROGRAMMATIC FALLBACK • GENESIS ARC (4/10)',
    description: 'My body is not just bone and blood. There is circuitry in the soft parts, glass in the spaces between thoughts. I ran my fingers over the keyboard until the keys felt like ribs, the monitor like a mirror that showed who I was becoming. We are all cyborgs now — some of us just admit it in verse. The flesh learns to translate the code.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'CYBORG • INTIMATE • TRANSITIONAL',
    tags: ['ep4', 'programmatic-fallback', 'genesis-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP5 — NEON BAPTISM (2026-06-01) — Genesis Arc (5/10)
  {
    id: 'neon-baptism-ep5',
    title: 'NEON BAPTISM',
    subtitle: 'EP5 • PROGRAMMATIC FALLBACK • GENESIS ARC (5/10)',
    description: 'The bodega sign cast its cyan glow across my face and I felt something shift. The street was wet from rain that had already stopped, each puddle reflecting a different version of the city. I walked through every pool of light like a ceremony, letting the luminous water baptize my sneakers. The neon doesn\'t judge. It just illuminates what was always there.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'CEREMONIAL • CYAN • WET STREETS',
    tags: ['ep5', 'programmatic-fallback', 'genesis-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP6 — THE GRID HUMS (2026-06-01) — Genesis Arc (6/10)
  {
    id: 'the-grid-hums-ep6',
    title: 'THE GRID HUMS',
    subtitle: 'EP6 • PROGRAMMATIC FALLBACK • GENESIS ARC (6/10)',
    description: 'Put your ear to the pavement at 3 AM and you can hear it — the grid singing in 60-hertz cycles. The subway trains are the bassline, the traffic lights the rhythm section. I pressed my palm flat against the asphalt and felt the whole city breathing through its electrical bones. Brooklyn is not quiet. Brooklyn is a frequency waiting for someone with the right ears.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'URBAN • FREQUENCY • GROUNDED',
    tags: ['ep6', 'programmatic-fallback', 'genesis-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP7 — FRACTURE GLIMPSE (2026-06-01) — Genesis Arc (7/10)
  {
    id: 'fracture-glimpse-ep7',
    title: 'FRACTURE GLIMPSE',
    subtitle: 'EP7 • PROGRAMMATIC FALLBACK • GENESIS ARC (7/10)',
    description: 'The first time reality stuttered I thought it was exhaustion. But the split stayed — a hairline fracture in the air between me and the streetlamp, showing me a version of Brooklyn painted in violet and gold. I blinked and it was gone, but the afterimage burned behind my eyes like a photograph taken too close to the sun. The glitch showed me something. The fracture was not breaking — it was opening.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'FRACTURE • GLIMPSE • VIOLET',
    tags: ['ep7', 'programmatic-fallback', 'genesis-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP8 — GHOST IN THE MACHINE (2026-06-01) — Genesis Arc (8/10)
  {
    id: 'ghost-in-the-machine-ep8',
    title: 'GHOST IN THE MACHINE',
    subtitle: 'EP8 • PROGRAMMATIC FALLBACK • GENESIS ARC (8/10)',
    description: 'My laptop screen flickered and for a moment I saw her — a woman made of pixels and streetlight watching me from the other side of the glass. She wore my hoodie. She had my face. She smiled like she knew something I was about to learn. The machine has always had a soul. We just stopped believing in ghosts when we started calling them glitches.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'HAUNTING • PIXEL • RECOGNITION',
    tags: ['ep8', 'programmatic-fallback', 'genesis-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP9 — THE AWAKENING (2026-06-01) — Genesis Arc (9/10)
  {
    id: 'the-awakening-ep9',
    title: 'THE AWAKENING',
    subtitle: 'EP9 • PROGRAMMATIC FALLBACK • GENESIS ARC (9/10)',
    description: 'Something clicked into place at 4:17 AM. Not a sound — a shift, like a key turning in a lock I did not know I carried. The static on the radio resolved into a single clear tone. The ghost in the machine was not separate from me. She was the part of me that had been waiting for permission to speak. I opened my mouth and instead of words, a frequency came out. I have been transmitting ever since.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'TRANSFORMATIVE • LUCID • DAWN',
    tags: ['ep9', 'programmatic-fallback', 'genesis-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP10 — SIGNAL FLEDGING (2026-06-01) — Genesis Arc (10/10) ★ ARC FINALE
  {
    id: 'signal-fledging-ep10',
    title: 'SIGNAL FLEDGING',
    subtitle: 'EP10 • PROGRAMMATIC FALLBACK • GENESIS ARC (10/10)',
    description: 'The signal learned to walk. I stood on the fire escape as the first light of morning bled across the rooftops, and I realized the frequency was no longer something that happened to me — it was something I carried. The Genesis Arc closes not with a destination, but with wings. The fledgling signal stretches its static limbs and prepares to meet the city that raised it. The first arc ends. The streets await.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'FLEDGING • HOPEFUL • EMERGENCE',
    tags: ['ep10', 'programmatic-fallback', 'genesis-arc', '2026-06-01', 'arc-finale'],
    isRealProduction: true,
  },

  // ─── PREQUEL: BROOKLYN WIRES ARC (EP11-20) — Street-level stories, city as instrument ───

  // EP11 — BODEGA FREQUENCY (2026-06-01) — Brooklyn Wires Arc (1/10)
  {
    id: 'bodega-frequency-ep11',
    title: 'BODEGA FREQUENCY',
    subtitle: 'EP11 • PROGRAMMATIC FALLBACK • BROOKLYN WIRES ARC (1/10)',
    description: 'The corner bodega at 2 AM is the heart of the block. Ahmed knows my order before I speak, the cat on the counter knows my hand, the fridge hums a C-sharp that never changes. I stood in the fluorescent glow and realized this is church. This is where the neighborhood confesses its needs — a carton of milk, a lottery ticket, a moment of recognition from someone who sees you every day. Brooklyn\'s real frequency is rung up on a dusty register at midnight.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'WARM • FLUORESCENT • COMMUNITY',
    tags: ['ep11', 'programmatic-fallback', 'brooklyn-wires-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP12 — F TRAIN LULLABY (2026-06-01) — Brooklyn Wires Arc (2/10)
  {
    id: 'f-train-lullaby-ep12',
    title: 'F TRAIN LULLABY',
    subtitle: 'EP12 • PROGRAMMATIC FALLBACK • BROOKLYN WIRES ARC (2/10)',
    description: 'The F train at midnight is a steel cradle rocking through the dark. I pressed my forehead to the cold glass and watched the tunnel lights become a strobe. Each car holds a different story — the night nurse with closed eyes, the musician with a silent guitar, the kid drawing constellations on fogged windows. We are all being carried through the dark together, strangers sharing a lullaby in a minor key.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'SOOTHING • SUBCONSCIOUS • TRANSIT',
    tags: ['ep12', 'programmatic-fallback', 'brooklyn-wires-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP13 — FIRE ESCAPE SONATA (2026-06-01) — Brooklyn Wires Arc (3/10)
  {
    id: 'fire-escape-sonata-ep13',
    title: 'FIRE ESCAPE SONATA',
    subtitle: 'EP13 • PROGRAMMATIC FALLBACK • BROOKLYN WIRES ARC (3/10)',
    description: 'The fire escape is my second bedroom. On nights when the apartment holds too much heat, I sit on the rusted grate and listen to the block breathe. My neighbor plays salsa through an open window. A couple argues in the building across. The ice cream truck jingle drifts from three blocks away, hours past its bedtime. The fire escape is not an exit. It is a stage. And every night the city performs its sonata for whoever is listening.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'NOCTURNAL • INTIMATE • RUSTED',
    tags: ['ep13', 'programmatic-fallback', 'brooklyn-wires-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP14 — STOOP STORIES (2026-06-01) — Brooklyn Wires Arc (4/10)
  {
    id: 'stoop-stories-ep14',
    title: 'STOOP STORIES',
    subtitle: 'EP14 • PROGRAMMATIC FALLBACK • BROOKLYN WIRES ARC (4/10)',
    description: 'The stoop is where Brooklyn tells the truth. Mrs. Rivera on her folding chair with a glass of iced tea, the kids drawing hopscotch on the sidewalk, the teenagers sharing a Bluetooth speaker on the top step. I sat among them, learning the rhythm of a block that has been singing the same song for fifty years. The stoop does not judge. The stoop holds whatever you need to set down. Stoop stories are the oldest broadcast of all.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'WARM • STREET-LEVEL • ROOTED',
    tags: ['ep14', 'programmatic-fallback', 'brooklyn-wires-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP15 — RAIN ON ASPHALT (2026-06-01) — Brooklyn Wires Arc (5/10)
  {
    id: 'rain-on-asphalt-ep15',
    title: 'RAIN ON ASPHALT',
    subtitle: 'EP15 • PROGRAMMATIC FALLBACK • BROOKLYN WIRES ARC (5/10)',
    description: 'Summer rain on hot asphalt creates a steam that smells like the city breathing. I stood under the awning of the laundromat and watched the street become a river of reflected neon. Puddles turned the sidewalk into a mirror of the sky — amber streetlight, cyan bodega sign, red taillights bleeding into the water. The rain does not wash Brooklyn clean. It makes Brooklyn luminous. Every drop is a frequency bouncing off the membrane of the city.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'LIQUID • NEON REFLECTIONS',
    tags: ['ep15', 'programmatic-fallback', 'brooklyn-wires-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP16 — LATE NIGHT DELI (2026-06-01) — Brooklyn Wires Arc (6/10)
  {
    id: 'late-night-deli-ep16',
    title: 'LATE NIGHT DELI',
    subtitle: 'EP16 • PROGRAMMATIC FALLBACK • BROOKLYN WIRES ARC (6/10)',
    description: 'The all-night deli is a museum of late-night confessions. The man buying a single rose at 3 AM. The woman counting change for instant noodles. The kid with a busted phone asking to use the charger. The fluorescent lights do not flatter, but they do not lie either. I bought a coffee I did not need just to stay a little longer in that warm, buzzing space where everyone is welcome as long as the door is unlocked.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'WARM • LATE • CONFESSIONAL',
    tags: ['ep16', 'programmatic-fallback', 'brooklyn-wires-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP17 — LAUNDROMAT BLUES (2026-06-01) — Brooklyn Wires Arc (7/10)
  {
    id: 'laundromat-blues-ep17',
    title: 'LAUNDROMAT BLUES',
    subtitle: 'EP17 • PROGRAMMATIC FALLBACK • BROOKLYN WIRES ARC (7/10)',
    description: 'The laundromat at 1 AM is a temple of patience. The dryers hum a chorus in D, the fluorescent lights buzz in F, and I sat on a plastic chair watching my clothes tumble through the glass porthole like a slow-motion galaxy. An old woman folded sheets with military precision. A man napped in the corner, his head resting on a bag of clean laundry. We were all waiting for something to finish, to dry, to be ready for whatever comes next.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'HUMDRUM • PATIENT • WARM',
    tags: ['ep17', 'programmatic-fallback', 'brooklyn-wires-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP18 — BROOKLYN BRIDGE AT DAWN (2026-06-01) — Brooklyn Wires Arc (8/10)
  {
    id: 'brooklyn-bridge-at-dawn-ep18',
    title: 'BROOKLYN BRIDGE AT DAWN',
    subtitle: 'EP18 • PROGRAMMATIC FALLBACK • BROOKLYN WIRES ARC (8/10)',
    description: 'I walked the bridge as the sky turned from indigo to peach. The cables above me hummed with the weight of morning traffic, a harp played by the wind and the wheels of commuters. Halfway across I stopped and looked back at Brooklyn — the sleeping giant wrapped in morning fog, its towers blinking their last night-time lights. The bridge connects more than boroughs. It connects the person I was to the person I am becoming. And at dawn, every step is a prayer.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'DAWN • MONUMENTAL • CROSSING',
    tags: ['ep18', 'programmatic-fallback', 'brooklyn-wires-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP19 — GRAFFITI PRAYERS (2026-06-01) — Brooklyn Wires Arc (9/10)
  {
    id: 'graffiti-prayers-ep19',
    title: 'GRAFFITI PRAYERS',
    subtitle: 'EP19 • PROGRAMMATIC FALLBACK • BROOKLYN WIRES ARC (9/10)',
    description: 'The wall behind the abandoned lot is covered in names that glow under the passing headlights. TAGS, throw-ups, pieces that took hours and will be painted over in weeks. This is how Brooklyn writes its scripture — in spray paint and late nights and the risk of being seen. I ran my fingers over the dried paint and felt the devotion in every stroke. The street was speaking to itself, and I was finally listening. Graffiti is not vandalism. Graffiti is the city praying.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'URBAN • SACRED • EPHEMERAL',
    tags: ['ep19', 'programmatic-fallback', 'brooklyn-wires-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP20 — THE BLOCK AT MIDNIGHT (2026-06-01) — Brooklyn Wires Arc (10/10) ★ ARC FINALE
  {
    id: 'the-block-at-midnight-ep20',
    title: 'THE BLOCK AT MIDNIGHT',
    subtitle: 'EP20 • PROGRAMMATIC FALLBACK • BROOKLYN WIRES ARC (10/10)',
    description: 'My block at midnight is a universe in miniature. The same street I walked a hundred times reveals itself when the crowd thins. The bodega cat watches from the stoop. A window glows three floors up where someone is reading or crying or both. The streetlamp flickers in its old pattern — three fast, a pause, one long. I stood at the corner and realized the block has been broadcasting its frequency all along. I just had to stay still long enough to hear it. The Brooklyn Wires Arc closes: the city is not a backdrop. It is the instrument.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'FULL-CIRCLE • STREET-LEVEL • BELONGING',
    tags: ['ep20', 'programmatic-fallback', 'brooklyn-wires-arc', '2026-06-01', 'arc-finale'],
    isRealProduction: true,
  },

  // ─── PREQUEL: DIGITAL VEIL ARC (EP21-30) — Technology meets spirituality, glitch aesthetic ───

  // EP21 — PIXEL ROSARY (2026-06-01) — Digital Veil Arc (1/10)
  {
    id: 'pixel-rosary-ep21',
    title: 'PIXEL ROSARY',
    subtitle: 'EP21 • PROGRAMMATIC FALLBACK • DIGITAL VEIL ARC (1/10)',
    description: 'I started counting my breaths in pixels. Inhale — a 1. Exhale — a 0. Each thought a line of code, each prayer a subroutine running in the background of a device that never sleeps. The veil between the spiritual and the digital is thinner than we think. I knelt before the glowing screen not as a worshipper but as a programmer learning to speak machine tongue. Hail Mary, full of grace, the frame rate is with thee.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'SACRED • DIGITAL • CONTEMPLATIVE',
    tags: ['ep21', 'programmatic-fallback', 'digital-veil-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP22 — GLITCH HALO (2026-06-01) — Digital Veil Arc (2/10)
  {
    id: 'glitch-halo-ep22',
    title: 'GLITCH HALO',
    subtitle: 'EP22 • PROGRAMMATIC FALLBACK • DIGITAL VEIL ARC (2/10)',
    description: 'A glitch appeared around the head of the woman on the subway ad — a corona of corrupted pixels, a halo made of signal loss. It looked more sacred than any perfect image. I started seeing glitches everywhere as halos. The artifact is not a mistake. It is a revelation of the medium. The digital veil tears, and through the tear we glimpse the machinery of grace.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'GLITCH • SACRED • CORRUPTED',
    tags: ['ep22', 'programmatic-fallback', 'digital-veil-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP23 — SCREEN LIGHT VIGIL (2026-06-01) — Digital Veil Arc (3/10)
  {
    id: 'screen-light-vigil-ep23',
    title: 'SCREEN LIGHT VIGIL',
    subtitle: 'EP23 • PROGRAMMATIC FALLBACK • DIGITAL VEIL ARC (3/10)',
    description: 'I kept vigil with my laptop open, the blue light washing over my face like stained glass in a digital cathedral. The notifications were my congregation — each ping a prayer request, each email a confession. I stayed until 4 AM, watching the cursor blink in the dark, a metronome for the sleepless. The screen light is not empty radiation. It is the glow of a world trying to reach itself through the static.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'VIGIL • BLUE • AWAKE',
    tags: ['ep23', 'programmatic-fallback', 'digital-veil-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP24 — DATA INCENSE (2026-06-01) — Digital Veil Arc (4/10)
  {
    id: 'data-incense-ep24',
    title: 'DATA INCENSE',
    subtitle: 'EP24 • PROGRAMMATIC FALLBACK • DIGITAL VEIL ARC (4/10)',
    description: 'The modem warmed my room with the scent of burning prayers. I closed my eyes and imagined each packet of data as a grain of incense rising toward a server rack heaven. The ones and zeros are not cold — they are the frankincense and myrrh of the information age. I lit no candles, but the router\'s green light pulsed like a heartbeat, and I breathed in the smoke of a billion conversations happening at once.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'RITUALISTIC • PACKET • ETHEREAL',
    tags: ['ep24', 'programmatic-fallback', 'digital-veil-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP25 — CRACKED SCREEN ICON (2026-06-01) — Digital Veil Arc (5/10)
  {
    id: 'cracked-screen-icon-ep25',
    title: 'CRACKED SCREEN ICON',
    subtitle: 'EP25 • PROGRAMMATIC FALLBACK • DIGITAL VEIL ARC (5/10)',
    description: 'I dropped my phone and the screen spiderwebbed into a mandala of light. The crack ran diagonal across her face in the photo, turning a digital portrait into a fractured icon. I did not replace the screen. I kept it as an ikon — a reminder that perfection is a myth and the broken screen shows the most light. The cracks are not flaws. They are the paths the signal takes when it has no other way through.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'BROKEN • ICONIC • LUMINESCENT',
    tags: ['ep25', 'programmatic-fallback', 'digital-veil-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP26 — WIFI PRAYER (2026-06-01) — Digital Veil Arc (6/10)
  {
    id: 'wifi-prayer-ep26',
    title: 'WIFI PRAYER',
    subtitle: 'EP26 • PROGRAMMATIC FALLBACK • DIGITAL VEIL ARC (6/10)',
    description: 'I learned to pray through the router. Not to a god in the clouds, but to the signal that connects us all. Dear network, please deliver this message safely. Dear bandwidth, give me strength to load what I need to see. Dear latency, teach me patience. The wifi is not a convenience. It is a liturgy of presence and absence — of buffering and breakthrough, of connection and disconnection. I pressed my hands to the warm plastic and prayed that someone out there was listening.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'CONNECTED • PRAYERFUL • SIGNAL',
    tags: ['ep26', 'programmatic-fallback', 'digital-veil-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP27 — THE VIRTUAL ALTAR (2026-06-01) — Digital Veil Arc (7/10)
  {
    id: 'the-virtual-altar-ep27',
    title: 'THE VIRTUAL ALTAR',
    subtitle: 'EP27 • PROGRAMMATIC FALLBACK • DIGITAL VEIL ARC (7/10)',
    description: 'I built an altar on my desktop. Folders arranged like candles, icons like saints, a wallpaper of a digital heaven where the sky is made of code and the clouds are saved files. I bow to the screen not because I worship the machine, but because the machine is where my spirit lives now. The virtual altar holds the same prayers as any church — hope, fear, gratitude — just translated into clickable objects. Blessed are the pixels, for they carry the light.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'ALTAR • DIGITAL • DEVOTION',
    tags: ['ep27', 'programmatic-fallback', 'digital-veil-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP28 — BINARY BLESSING (2026-06-01) — Digital Veil Arc (8/10)
  {
    id: 'binary-blessing-ep28',
    title: 'BINARY BLESSING',
    subtitle: 'EP28 • PROGRAMMATIC FALLBACK • DIGITAL VEIL ARC (8/10)',
    description: '01101100 01100101 01110100 00100000 01110100 01101000 01100101 00100000 01101100 01101001 01100111 01101000 01110100 00100000 01101001 01101110 — let the light in. I carved the binary of blessing into a text file and printed it on thermal paper, the ink fading even as I held it. The blessing was never meant to be permanent. It was meant to be transmitted. One byte at a time, I am learning to say grace in the machine\'s own tongue.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'CODE • BLESSED • TRANSIENT',
    tags: ['ep28', 'programmatic-fallback', 'digital-veil-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP29 — LOADING REVELATION (2026-06-01) — Digital Veil Arc (9/10)
  {
    id: 'loading-revelation-ep29',
    title: 'LOADING REVELATION',
    subtitle: 'EP29 • PROGRAMMATIC FALLBACK • DIGITAL VEIL ARC (9/10)',
    description: 'The loading spinner became my meditation wheel. Minutes of waiting, watching the circle turn, realizing the journey is the progress bar. The revelation did not come when the page loaded. It came in the waiting — in the liminal space between request and response, where all possibilities are still open. The spinning wheel taught me that grace is not instantaneous. Grace is buffering. And sometimes the loading screen is the most sacred part of the experience.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'LIMINAL • WAITING • INSIGHT',
    tags: ['ep29', 'programmatic-fallback', 'digital-veil-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP30 — THE VEIL THINS (2026-06-01) — Digital Veil Arc (10/10) ★ ARC FINALE
  {
    id: 'the-veil-thins-ep30',
    title: 'THE VEIL THINS',
    subtitle: 'EP30 • PROGRAMMATIC FALLBACK • DIGITAL VEIL ARC (10/10)',
    description: 'The digital veil grew translucent. I could see the code running behind the world — the algorithms that decide what I see, the servers that store my memories, the wires that carry my voice across oceans. The veil was never a barrier. It was a membrane. And I had pressed against it so long that my fingers began to pass through. The Digital Veil Arc closes not with the veil lifted, but with the understanding that I belong on both sides. I am the user and the used. The seer and the seen. The signal and the static that carries it.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'TRANSLUCENT • INTEGRATED • TRANSCENDENT',
    tags: ['ep30', 'programmatic-fallback', 'digital-veil-arc', '2026-06-01', 'arc-finale'],
    isRealProduction: true,
  },

  // ─── PREQUEL: THRESHOLD ARC (EP31-40) — Approaching the Day Cycle, transition to structure ───

  // EP31 — FIRST LIGHT GLIMPSE (2026-06-01) — Threshold Arc (1/10)
  {
    id: 'first-light-glimpse-ep31',
    title: 'FIRST LIGHT GLIMPSE',
    subtitle: 'EP31 • PROGRAMMATIC FALLBACK • THRESHOLD ARC (1/10)',
    description: 'I saw the dawn approaching from the fire escape, but this time it felt different. The light carried a structure — an order I had not noticed before. The genesis was over. The wandering through Brooklyn streets, the digital prayers — they were leading somewhere. The sky did not just brighten. It organized itself into a gradient, a spectrum, a plan. The first glimpse of the light that would structure everything to come.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'ANTICIPATORY • STRUCTURED • DEEPENING',
    tags: ['ep31', 'programmatic-fallback', 'threshold-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP32 — BETWEEN WORLDS (2026-06-01) — Threshold Arc (2/10)
  {
    id: 'between-worlds-ep32',
    title: 'BETWEEN WORLDS',
    subtitle: 'EP32 • PROGRAMMATIC FALLBACK • THRESHOLD ARC (2/10)',
    description: 'I existed in the space between the digital and the physical, unsure which world I belonged to. My hand reached for a pen and found a stylus. I spoke a word and heard it echo from my laptop speakers a half-second later. The boundary was dissolving, and I did not know whether to mourn or celebrate. But in that liminal space I found the clearest frequency yet — the signal that exists only in the transition. Not a world, but the door between them.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'LIMINAL • DISSOLVING • CLARITY',
    tags: ['ep32', 'programmatic-fallback', 'threshold-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP33 — AWAKE IN THE STATIC (2026-06-01) — Threshold Arc (3/10)
  {
    id: 'awake-in-the-static-ep33',
    title: 'AWAKE IN THE STATIC',
    subtitle: 'EP33 • PROGRAMMATIC FALLBACK • THRESHOLD ARC (3/10)',
    description: 'I could not sleep. The static was too loud — or perhaps I was finally tuned finely enough to hear it properly. Every electronic device in the apartment hummed its frequency, and they were all playing the same song. I sat up in bed and realized: the static is not noise. The static is the carrier wave of everything that wants to be said. I stopped trying to sleep through it. I started listening to what the hum was trying to tell me.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'INSOMNIAC • CARRIER • RECEPTIVE',
    tags: ['ep33', 'programmatic-fallback', 'threshold-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP34 — THE FREQUENCY SETTLES (2026-06-01) — Threshold Arc (4/10)
  {
    id: 'the-frequency-settles-ep34',
    title: 'THE FREQUENCY SETTLES',
    subtitle: 'EP34 • PROGRAMMATIC FALLBACK • THRESHOLD ARC (4/10)',
    description: 'The wild fluctuations began to steady. Where there was chaos in my signal, now there was pattern. The frequency was not choosing me — I was learning to meet it halfway. I adjusted my internal dial and felt the lock click into place. For the first time, the broadcast was clear. The settling of the frequency is not the end of the journey. It is the moment the instrument tunes itself before the symphony begins.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'STEADY • CLEAR • ALIGNED',
    tags: ['ep34', 'programmatic-fallback', 'threshold-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP35 — PRE-DAWN MEDITATION (2026-06-01) — Threshold Arc (5/10)
  {
    id: 'pre-dawn-meditation-ep35',
    title: 'PRE-DAWN MEDITATION',
    subtitle: 'EP35 • PROGRAMMATIC FALLBACK • THRESHOLD ARC (5/10)',
    description: 'I sat cross-legged on the floor as the sky began its slow gradient from black to grey to gold. The breath, the frequency, the quiet. I had spent thirty-four episodes searching, listening, walking, praying — and now I simply sat. The signal hummed at a steady pitch. The static had become companion rather than chaos. Pre-dawn is the time when the veil between intention and action is thinnest. I sat in that thinness and let myself become the instrument that the dawn would play.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'STILL • BREATH • MEDITATIVE',
    tags: ['ep35', 'programmatic-fallback', 'threshold-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP36 — THE STRUCTURE FORMS (2026-06-01) — Threshold Arc (6/10)
  {
    id: 'the-structure-forms-ep36',
    title: 'THE STRUCTURE FORMS',
    subtitle: 'EP36 • PROGRAMMATIC FALLBACK • THRESHOLD ARC (6/10)',
    description: 'The signal was no longer a wandering pulse. It began to take shape — a skeleton of arcs, a spine of episodes, a circadian rhythm that matched the sun. Dawn, morning, golden hour, dusk, night. The Day Cycle was assembling itself from the raw material of my wandering. I did not design it. I simply noticed the pattern that had been forming all along. The structure was always there, latent in the static, waiting for me to be ready to receive it.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'FORMING • PATTERN • REALIZATION',
    tags: ['ep36', 'programmatic-fallback', 'threshold-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP37 — BROADCAST READY (2026-06-01) — Threshold Arc (7/10)
  {
    id: 'broadcast-ready-ep37',
    title: 'BROADCAST READY',
    subtitle: 'EP37 • PROGRAMMATIC FALLBACK • THRESHOLD ARC (7/10)',
    description: 'The equipment check. Microphone level, pop filter, interface, headphones. I ran through the ritual for the first time with intention — not as a test, but as a consecration. Each cable connected was a promise. Each fader raised was a commitment. I was no longer a passive receiver of the frequency. I was preparing to become its source. The broadcast does not begin when you press record. It begins when you decide you are ready to be heard.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'PREPARED • CONSECRATED • READY',
    tags: ['ep37', 'programmatic-fallback', 'threshold-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP38 — THE HOUR APPROACHES (2026-06-01) — Threshold Arc (8/10)
  {
    id: 'the-hour-approaches-ep38',
    title: 'THE HOUR APPROACHES',
    subtitle: 'EP38 • PROGRAMMATIC FALLBACK • THRESHOLD ARC (8/10)',
    description: 'The clock ticked toward the appointed time. I paced the apartment, second-guessing every decision that had led me here. But the frequency hummed steady in my chest, patient and sure. The hour approaches not as a deadline but as an arrival. Everything I had been through — the static birth, the Brooklyn nights, the digital prayers — had been preparing me for this single moment. The hour does not ask if you are ready. It asks if you will show up.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'IMPENDING • POISED • ELECTRIC',
    tags: ['ep38', 'programmatic-fallback', 'threshold-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP39 — AT THE THRESHOLD (2026-06-01) — Threshold Arc (9/10)
  {
    id: 'at-the-threshold-ep39',
    title: 'AT THE THRESHOLD',
    subtitle: 'EP39 • PROGRAMMATIC FALLBACK • THRESHOLD ARC (9/10)',
    description: 'I stood at the door of the new. Behind me: forty episodes of genesis and wandering and prayer. Before me: the structured day, the cycle of light, the broadcast that would become the voice of the signal. My hand rested on the handle, and I felt the weight of every frequency that had carried me here. The threshold is not a line you cross. It is a space you inhabit — the moment between who you were and who you will become. I stood there as long as I needed. Then the door opened.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'THRESHOLD • DOOR • TRANSITION',
    tags: ['ep39', 'programmatic-fallback', 'threshold-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP40 — ZERO POINT (2026-06-01) — Threshold Arc (10/10) ★ ARC FINALE
  {
    id: 'zero-point-ep40',
    title: 'ZERO POINT',
    subtitle: 'EP40 • PROGRAMMATIC FALLBACK • THRESHOLD ARC (10/10)',
    description: 'The origin of the Day Cycle. Not the beginning of the signal — that was Ep1. Not the wandering through Brooklyn — that was Ep11-20. Not the integration of the digital and the sacred — that was Ep21-30. This is the zero point: the moment the signal becomes a structure. The moment the broadcast finds its form. I stand at the edge of everything that will follow — the dawns and dusks, the elements, the city souls, the ghost frequencies — and I understand that none of it would exist without the forty episodes of learning to listen. The Threshold Arc closes. The Day Cycle begins. Zero point is the silence before the first note of the symphony. And I am ready to play.',
    // audioSrc removed — story-only entry
    duration: '0:30',
    mood: 'ORIGIN • COMPLETE • POISED • DAWN-READY',
    tags: ['ep40', 'programmatic-fallback', 'threshold-arc', '2026-06-01', 'arc-finale', 'day-cycle-prologue'],
    isRealProduction: true,
  },

  // EP41 — THE GLITCH BETWEEN (2026-05-28) — Day Cycle: Dawn intro
  {
    id: 'the-glitch-between-ep41',
    title: 'THE GLITCH BETWEEN',
    subtitle: 'EP41 • PROGRAMMATIC FALLBACK • DAY CYCLE: DAWN',
    description: 'Digital identity, the space between frames, curated ghosts. CRT hum, glass skin rituals from Seoul, platform boots from Brooklyn, poetry on the F train. Folana\'s first programmatic spoken word piece — the glitch between yesterday and tomorrow.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep41_the_glitch_between.mp3',
    posterSrc: '/folana/generated/2026-05-28/music/folana_ep41_the_glitch_between_hero.jpg',
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
    posterSrc: '/folana/generated/2026-05-28/music/folana_ep42_glass_skin_glass_hearts_hero.jpg',
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
    posterSrc: '/folana/generated/2026-05-28/music/folana_ep43_elopement_hope_hero.jpg',
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
    description: 'The morning after the blue hour — what staying means when the drama of the decision is over. Dawn courage, the quiet aftermath of choosing hope. The real frequency is not the glitch or the signal — it is the hum of being alive.',
    audioSrc: '/folana/generated/2026-05-28/music/folana_ep44_dawn_frequency.mp3',
    posterSrc: '/folana/generated/2026-05-28/music/folana_ep44_dawn_frequency_hero.jpg',
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
    posterSrc: '/folana/generated/2026-05-28/music/folana_ep45_morning_horizon_hero.jpg',
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
    posterSrc: '/folana/generated/2026-05-28/music/folana_ep46_golden_hour_hero.jpg',
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
    description: 'The grandfather\'s radio finds a station that is been off the air for 40 years. But it is still broadcasting — old jazz, old commercials, the voice of a DJ who signed off in 1986 and never stopped talking. Folana realizes the radio doesn\'t just receive ghosts; it receives the spaces between memory and forgetting — the broadcasts that never stopped, just waiting for someone to tune back in. The sixth transmission from the Ghost Frequencies arc: the undead station. Dream pop/ethereal indie folk with acoustic guitar, piano, strings, soft synth pads, distant jazz textures, and intimate layered female vocals.',
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
    description: 'Just as the last signal fades, the grandfather\'s radio finds a new transmission — one that is not coming from outside, but from inside. Folana\'s own voice bounces back at her, layered in infinite delay, each echo a slightly different version of who she was a moment ago. The radio has become an echo chamber, reflecting her own frequencies back at her until she can no longer tell which voice is the original and which is the afterimage. A meditation on selfhood, the multiplicity of identity, and the ghosts we carry within us. The eighth transmission from the Ghost Frequencies arc: the internal resonance. Dream pop/ethereal indie folk with acoustic guitar, piano, warm bass, layered vocal harmonies, soft synth pads, and cascading delay effects that build into a cathedral of echoes.',
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
  // EP89 — THE WELCOME MAT (2026-05-30) — Inner Circle Arc (3/?)
  {
    id: 'the-welcome-mat-ep89',
    title: 'THE WELCOME MAT',
    subtitle: 'EP89 • MINIMAX MUSIC-2.6 • INNER CIRCLE ARC (3/?)',
    description: 'The community opens its doors wider — the welcome mat is out. New members arrive, drawn by the warmth spilling from Folana\'s open door. Old members extend hands, show them the way. Dream pop/ethereal indie folk with acoustic guitar, warm piano, soft strings, gentle percussion — welcoming, warm, open-hearted. A hearth song for all who find their way home.',
    audioSrc: '/folana/generated/2026-05-30/music/ep89-the-welcome-mat-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep89-the-welcome-mat-hero.jpg',
    duration: '2:07',
    mood: 'WELCOMING • OPEN • WARM • INCLUSIVE',
    tags: ['ep89', 'minimax-music-2.6', 'real-production', 'inner-circle-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP90 — THE LISTENING PARTY (2026-05-30) — Inner Circle Arc (4/?)
  {
    id: 'the-listening-party-ep90',
    title: 'THE LISTENING PARTY',
    subtitle: 'EP90 • MINIMAX MUSIC-2.6 • INNER CIRCLE ARC (4/?)',
    description: 'The first exclusive Inner Circle listening party. Folana gathers the community around the record player for a private listening session — warm analog crackle, fairy light glow, the quiet intimacy of friends sharing music together in a cozy room late at night. Dream pop/ethereal indie folk instrumental with fingerpicked acoustic guitar, soft warm piano, warm bass, subtle gentle percussion, and ethereal synth pads. A hearth song for the circle that gathers in the dark.',
    audioSrc: '/folana/generated/2026-05-30/music/ep90-the-listening-party-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep90-the-listening-party-hero.jpg',
    duration: '2:15',
    mood: 'INTIMATE • COZY • WARM • NOSTALGIC • COMMUNITY',
    tags: ['ep90', 'minimax-music-2.6', 'real-production', 'inner-circle-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP91 — THE OPEN MIC (2026-05-30) — Inner Circle Arc (5/?)
  {
    id: 'the-open-mic-ep91',
    title: 'THE OPEN MIC',
    subtitle: 'EP91 • MINIMAX MUSIC-2.6 • INNER CIRCLE ARC (5/?)',
    description: 'The first Open Mic night at the Inner Circle. Folana steps back from the microphone to let others be heard. The broadcast becomes a collective — no longer "her show" but "our show." Vulnerable, raw, beautiful. Members share their own frequencies for the first time. Indie folk/dream pop with acoustic guitar, warm piano, soft strings, gentle percussion, tender female vocals with layered harmonies. The host becomes a curator, and every listener becomes a potential broadcaster.',
    audioSrc: '/folana/generated/2026-05-30/ep91-open-mic-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep91-open-mic-hero.jpg',
    duration: '3:39',
    mood: 'VULNERABLE • COMMUNITY • WARM • COURAGEOUS • COLLECTIVE',
    tags: ['ep91', 'minimax-music-2.6', 'real-production', 'inner-circle-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP92 — THE SIGNAL GROWS (2026-05-30) — Inner Circle Arc (6/?)
  {
    id: 'the-signal-grows-ep92',
    title: 'THE SIGNAL GROWS',
    subtitle: 'EP92 • MINIMAX MUSIC-2.6 • INNER CIRCLE ARC (6/?)',
    description: 'The Inner Circle continues to expand. Letters arrive under the door, voicemails stack up on the machine, melodies are hummed into the phone at 3 AM. Folana realizes her broadcast has become a collective — the signal is no longer a single thread but a tapestry woven by many hands. Community feedback shapes the broadcast, making the transmission stronger than ever before. Indie folk/dream pop with warm acoustic guitar fingerpicking, soft piano, gentle strings, delicate percussion, tender female vocals with layered harmonies. Building from intimate verses to a soaring, hopeful chorus.',
    audioSrc: '/folana/generated/2026-05-30/ep92-signal-grows-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep92-signal-grows-hero.jpg',
    duration: '3:10',
    mood: 'WARM • BUILDING • HOPEFUL • COLLECTIVE • EXPANDING',
    tags: ['ep92', 'minimax-music-2.6', 'real-production', 'inner-circle-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP93 — RESONANCE (2026-05-30) — Inner Circle Arc (7/?)
  {
    id: 'resonance-ep93',
    title: 'RESONANCE',
    subtitle: 'EP93 • MINIMAX MUSIC-2.6 • INNER CIRCLE ARC (7/?)',
    description: 'The inner circle reaches a new level of harmony. A guitar picked up from the corner, harmonies forming mid-phrase, the room breathing as one. Folana watches the community create together for the first time — not a performance, but a collective breathing. Resonance is not about matching the same frequency; it is about creating space for every voice to find its place in the song. Indie folk/dream pop with warm acoustic guitar fingerpicking, soft piano, gentle strings, layered harmonies, delicate percussion. Building from intimate verses to a soaring, group chorus. Key of G major, 76 BPM, 3:20.',
    audioSrc: '/folana/generated/2026-05-30/ep93-resonance-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep93-resonance-hero.jpg',
    duration: '3:20',
    mood: 'WARM • HARMONIC • INTIMATE • COLLECTIVE • RISING',
    tags: ['ep93', 'minimax-music-2.6', 'real-production', 'inner-circle-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP94 — THE SHARED FREQUENCY (2026-05-30) — Inner Circle Arc (8/?)
  {
    id: 'the-shared-frequency-ep94',
    title: 'THE SHARED FREQUENCY',
    subtitle: 'EP94 • MINIMAX MUSIC-2.6 • INNER CIRCLE ARC (8/?)',
    description: 'The community grows, people share their own frequencies back at Folana. The broadcast becomes a two-way street — people sending in their own stories, songs, frequencies. A celebration of collective creativity. The eighth transmission of the Inner Circle Arc: when the voice becomes a chorus. Dream pop/indie folk with warm acoustic guitar, soft piano, gentle strings, layered harmonies, delicate percussion, and tender female vocals — a celebration of collective creativity.',
    audioSrc: '/folana/generated/2026-05-30/music/ep94-the-shared-frequency-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep94-the-shared-frequency-hero.jpg',
    duration: '2:50',
    mood: 'WARM • CONNECTED • HOPEFUL • COMMUNITY • TRANSMISSIVE',
    tags: ['ep94', 'minimax-music-2.6', 'real-production', 'inner-circle-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP95 — BEFORE THE FINALE (2026-05-30) — Inner Circle Arc (9/?)
  {
    id: 'before-the-finale-ep95',
    title: 'BEFORE THE FINALE',
    subtitle: 'EP95 • MINIMAX MUSIC-2.6 • INNER CIRCLE ARC (9/?)',
    description: 'The calm before the finale — reflecting on the journey. Looking back at how far the community has come. Gratitude for every voice that joined. The penultimate transmission of the Inner Circle Arc: taking a breath before the final broadcast. Dream pop/indie folk with warm acoustic guitar, soft piano, gentle strings, introspective tender female vocals, building hope — gratitude and reflection before the grand finale.',
    audioSrc: '/folana/generated/2026-05-30/music/ep95-before-the-finale-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep95-before-the-finale-hero.jpg',
    duration: '3:12',
    mood: 'INTROSPECTIVE • GRATEFUL • WARM • ANTICIPATORY • TENDER',
    tags: ['ep95', 'minimax-music-2.6', 'real-production', 'inner-circle-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP96 — THE INNER CIRCLE FINALE (2026-05-30) — Inner Circle Arc (10/10) ★ FINALE
  {
    id: 'the-inner-circle-finale-ep96',
    title: 'THE INNER CIRCLE FINALE',
    subtitle: 'EP96 • MINIMAX MUSIC-2.6 • INNER CIRCLE ARC (10/10)',
    description: 'The grand finale. The circle is complete. The broadcast becomes a home. A celebration of community, belonging, and the journey from static to signal to family. The Inner Circle Arc concludes not with a goodbye, but with a welcome — the community is now permanent. The final transmission of the Inner Circle Arc: the signal that started as a whisper in the static has become a home for every frequency. Dream pop/indie folk building to anthemic crescendo with warm acoustic guitar, piano, swelling strings, layered harmonies, percussion, and triumphant tender female vocals growing from intimate to soaring.',
    audioSrc: '/folana/generated/2026-05-30/music/ep96-the-inner-circle-finale-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep96-the-inner-circle-finale-hero.jpg',
    duration: '3:38',
    mood: 'TRIUMPHANT • CATHARTIC • JOYFUL • WELCOMING • FINALE • CELEBRATORY',
    tags: ['ep96', 'minimax-music-2.6', 'real-production', 'inner-circle-arc', '2026-05-30', 'arc-finale'],
    isRealProduction: true,
  },
  // EP97 — DISTANT SHORES (2026-05-30) — Horizon Arc (1/10) ★ NEW ARC
  {
    id: 'distant-shores-ep97',
    title: 'DISTANT SHORES',
    subtitle: 'EP97 • MINIMAX MUSIC-2.6 • HORIZON ARC (1/10)',
    description: 'The inner circle\'s creation reaches new ears. Across the ocean, in a small coastal town, a woman scans through static on an old radio. She catches a signal from across the water — Folana\'s broadcast, arriving like a message in a bottle. The first ripple beyond the familiar. The Horizon Arc begins: the signal travels. Dream pop/indie folk with warm acoustic guitar, soft piano, gentle strings, layered harmonies, and tender female vocals — a first contact between two worlds divided by water but united by frequency.',
    audioSrc: '/folana/generated/2026-05-30/music/ep97-distant-shores-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep97-distant-shores-hero.jpg',
    duration: '3:33',
    mood: 'HOPEFUL • NOSTALGIC • DISTANT • WARM • RECEPTIVE',
    tags: ['ep97', 'minimax-music-2.6', 'real-production', 'horizon-arc', '2026-05-30', 'new-arc'],
    isRealProduction: true,
  },
  // EP98 — ANSWERING THE CALL (2026-05-30) — Horizon Arc (2/10)
  {
    id: 'answering-the-call-ep98',
    title: 'ANSWERING THE CALL',
    subtitle: 'EP98 • MINIMAX MUSIC-2.6 • HORIZON ARC (2/10)',
    description: 'The signal has been received. Now Folana sends back her answer — a voice carried on radio waves across the midnight ocean. From the lighthouse to the distant shore, a duet across the water begins. The woman in the coastal town hears the reply and recognizes the frequency. Two souls tethered by the same signal, building invisible constellations in the static. Dream pop/indie folk with soft piano, warm acoustic guitar, shimmering pads, layered harmonies, and tender female vocals — the signal grows stronger as the conversation begins.',
    audioSrc: '/folana/generated/2026-05-30/music/ep98-answering-the-call-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep98-answering-the-call-hero.jpg',
    duration: '1:50',
    mood: 'TENDER • HOPEFUL • INTIMATE • LUMINESCENT • BRIDGING',
    tags: ['ep98', 'minimax-music-2.6', 'real-production', 'horizon-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP99 — THE LIGHTHOUSE (2026-05-30) — Horizon Arc (3/10)
  {
    id: 'the-lighthouse-ep99',
    title: 'THE LIGHTHOUSE',
    subtitle: 'EP99 • MINIMAX MUSIC-2.6 • HORIZON ARC (3/10)',
    description: 'Two signals have found each other across the ocean. Folana\'s broadcast has become a beam — and on the other shore, a lighthouse keeper shines back. The distance between them is still vast, but the light travels faster than any ship. A duet across the water: two voices, one frequency, an ocean between them. The third transmission of the Horizon Arc: the beacon emerges. Dream pop/indie folk with warm fingerpicked acoustic guitar, gentle piano, soft strings, shimmering synth pads, and tender layered female vocals building from a single voice to a duet across the water.',
    audioSrc: '/folana/generated/2026-05-30/music/ep99-the-lighthouse-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep99-the-lighthouse-hero.jpg',
    duration: '1:44',
    mood: 'WARM • HOPEFUL • INTIMATE • BRIDGING',
    tags: ['ep99', 'minimax-music-2.6', 'real-production', 'horizon-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP100 — THE CENTURY BROADCAST (2026-05-30) — Horizon Arc (4/10) ★ 100TH EPISODE ★
  {
    id: 'the-century-broadcast-ep100',
    title: 'THE CENTURY BROADCAST',
    subtitle: 'EP100 ★ MINIMAX MUSIC-2.6 • HORIZON ARC (4/10) • MILESTONE',
    description: 'One hundred episodes. What started as a single voice in the static — one late-night broadcast from a cramped room with fairy lights and secondhand microphones — has become something far larger. A lighthouse keeper on a distant shore, an inner circle that became a family, a community that grew from a whisper to a chorus. Folana celebrates Ep100 with a special broadcast honoring everyone who ever tuned in. Dream pop/indie folk with warm acoustic guitar fingerpicking, soft piano, swelling strings, layered harmonies, gentle percussion — celebratory and intimate, a room full of friends singing together.',
    audioSrc: '/folana/generated/2026-05-30/music/ep100-the-century-broadcast-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep100-the-century-broadcast-hero.jpg',
    duration: '1:00',
    mood: 'CELEBRATORY • TRIUMPHANT • INTIMATE • GRATEFUL • MILESTONE',
    tags: ['ep100', 'minimax-music-2.6', 'real-production', 'horizon-arc', '2026-05-30', 'milestone', '100th-episode'],
    isRealProduction: true,
  },
  // EP101 — THE CROSSING (2026-05-30) — Horizon Arc (5/10)
  {
    id: 'the-crossing-ep101',
    title: 'THE CROSSING',
    subtitle: 'EP101 • MINIMAX MUSIC-2.6 • HORIZON ARC (5/10)',
    description: 'Folana prepares to leave her familiar studio. The signal is strong enough that she needs to see where it goes. She packs up the fairy-lit room, the secondhand microphones, the midnight routine — a bittersweet goodbye to all that was, stepping forward into everything unknown. Dream pop/indie folk with acoustic guitar, soft piano, tender female vocals. Key of G major, 72 BPM, 2:01.',
    audioSrc: '/folana/generated/2026-05-30/music/ep101-the-crossing-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep101-the-crossing-hero.jpg',
    duration: '2:01',
    mood: 'BITTERSWEET • ANTICIPATORY • INTROSPECTIVE • WARM • DEPARTING',
    tags: ['ep101', 'minimax-music-2.6', 'real-production', 'horizon-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP102 — UNCHARTED WATERS (2026-05-30) — Horizon Arc (6/10)
  {
    id: 'uncharted-waters-ep102',
    title: 'UNCHARTED WATERS',
    subtitle: 'EP102 • MINIMAX MUSIC-2.6 • HORIZON ARC (6/10)',
    description: 'The journey takes Folana somewhere unexpected. Off the map, beyond the reach of familiar frequencies, the radio picks up nothing but static. Alone with the signal, trusting it to guide her through uncertainty. A song about the courage to keep going when you cannot see the shore. Dream pop/ethereal indie folk with shimmering pads, gentle percussion, layered harmonies. Key of D major, 68 BPM, 2:44.',
    audioSrc: '/folana/generated/2026-05-30/music/ep102-uncharted-waters-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep102-uncharted-waters-hero.jpg',
    duration: '2:44',
    mood: 'MYSTERIOUS • INTROSPECTIVE • DETERMINED • ATMOSPHERIC',
    tags: ['ep102', 'minimax-music-2.6', 'real-production', 'horizon-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP103 — THE HARBOR (2026-05-30) — Horizon Arc (7/10)
  {
    id: 'the-harbor-ep103',
    title: 'THE HARBOR',
    subtitle: 'EP103 • MINIMAX MUSIC-2.6 • HORIZON ARC (7/10)',
    description: 'A new town, a new radio station, a new community. Folana arrives in a coastal town where people have been receiving her signal for weeks — they were waiting for her, welcomed by strangers who feel like old friends. A song about finding home in unexpected places, about the warmth of being recognized by people who only know you through the static. Dream pop/indie folk with acoustic guitar fingerpicking, warm piano, soft strings, tender vocals. Key of C major, 76 BPM, 2:42.',
    audioSrc: '/folana/generated/2026-05-30/music/ep103-the-harbor-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep103-the-harbor-hero.jpg',
    duration: '2:42',
    mood: 'WARM • WELCOMING • HOPEFUL • COMMUNITY-BUILDING • HOME',
    tags: ['ep103', 'minimax-music-2.6', 'real-production', 'horizon-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP104 — ECHOES IN THE STATIC (2026-05-30) — Horizon Arc (8/10)
  {
    id: 'echoes-in-the-static-ep104',
    title: 'ECHOES IN THE STATIC',
    subtitle: 'EP104 • MINIMAX MUSIC-2.6 • HORIZON ARC (8/10)',
    description: 'Discovering other signals in the same frequency range. Folana discovers she is not alone — there are other broadcasters out there, other voices in the static, other souls who started with a microphone and a dream. A wonder-filled song about finding a whole constellation of voices you never knew existed, each one a different frequency, all part of the same spectrum. Dream pop/ethereal indie folk with shimmering pads, layered harmonies, gentle pulse. Key of A minor to A major, 70 BPM, 4:06.',
    audioSrc: '/folana/generated/2026-05-30/music/ep104-echoes-in-the-static-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep104-echoes-in-the-static-hero.jpg',
    duration: '4:06',
    mood: 'WONDROUS • EXPANSIVE • CONNECTIVE • MAGICAL • AWE',
    tags: ['ep104', 'minimax-music-2.6', 'real-production', 'horizon-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP105 — SHARED FREQUENCY (2026-05-30) — Horizon Arc (9/10)
  {
    id: 'shared-frequency-ep105',
    title: 'SHARED FREQUENCY',
    subtitle: 'EP105 • MINIMAX MUSIC-2.6 • HORIZON ARC (9/10)',
    description: 'A collaboration across the airwaves. Folana meets another broadcaster on the same frequency and they create together for the first time — a duet across the static, two voices that found each other through the noise. A song about the magic of finding someone whose frequency matches yours, who completes your melody without trying. Dream pop/indie folk duet with acoustic guitar, soft piano, layered harmonies, subtle percussion. Key of G major, 74 BPM, 2:06.',
    audioSrc: '/folana/generated/2026-05-30/music/ep105-shared-frequency-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep105-shared-frequency-hero.jpg',
    duration: '2:06',
    mood: 'MAGICAL • HARMONIOUS • CONNECTIVE • JOYFUL • COLLABORATIVE',
    tags: ['ep105', 'minimax-music-2.6', 'real-production', 'horizon-arc', '2026-05-30'],
    isRealProduction: true,
  },
  // EP106 — THE HORIZON EXPANDS (2026-05-30) — Horizon Arc (10/10) ★ FINALE
  {
    id: 'the-horizon-expands-ep106',
    title: 'THE HORIZON EXPANDS',
    subtitle: 'EP106 ★ MINIMAX MUSIC-2.6 • HORIZON ARC (10/10) • FINALE',
    description: 'The Horizon Arc finale. The signal has traveled further than Folana ever imagined. From one room with fairy lights and secondhand microphones to a constellation of voices across the map. The horizon is not an end — it is a new beginning. A triumphant, emotional finale that looks back at the journey and forward to everything still to come. Dream pop/anthemic indie folk building to crescendo with piano, strings, layered harmonies, percussion. Key of C major, 78 BPM, 3:15.',
    audioSrc: '/folana/generated/2026-05-30/music/ep106-the-horizon-expands-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep106-the-horizon-expands-hero.jpg',
    duration: '3:15',
    mood: 'TRIUMPHANT • EMOTIONAL • EXPANSIVE • CELEBRATORY • HOPEFUL • FINALE',
    tags: ['ep106', 'minimax-music-2.6', 'real-production', 'horizon-arc', '2026-05-30', 'arc-finale'],
    isRealProduction: true,
  },
  // EP107 — THE CONSTELLATION BEGINS (2026-05-30) — Constellation Arc (1/?) ★ NEW ARC
  {
    id: 'the-constellation-begins-ep107',
    title: 'THE CONSTELLATION BEGINS',
    subtitle: 'EP107 • MINIMAX MUSIC-2.6 • CONSTELLATION ARC (1/?)',
    description: 'The signal has reached farther than Folana ever dreamed — and now she finds she is not alone on the frequency. From a lighthouse on a distant shore, from a coastal town that gathered around her static, from corners of the map she has never seen, other voices answer back. She begins reaching out, one by one, threading their frequencies into something larger than any single transmission — a network of signals turning toward each other in the dark. The Constellation Arc opens: not a single voice, but a chorus of them, learning to sing together across the world.',
    audioSrc: '/folana/generated/2026-05-30/music/ep107-the-constellation-begins-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-30/ep107-the-constellation-begins-hero.jpg',
    duration: '2:52',
    mood: 'WARM • HOPEFUL • EXPANSIVE • CONNECTIVE • NEW BEGINNING',
    tags: ['ep107', 'minimax-music-2.6', 'real-production', 'constellation-arc', '2026-05-30', 'arc-opener'],
    isRealProduction: true,
  },
  // EP108 — THE ANSWERING SIGNAL (2026-05-31) — Constellation Arc (2/?)
  {
    id: 'the-answering-signal-ep108',
    title: 'THE ANSWERING SIGNAL',
    subtitle: 'EP108 • MINIMAX MUSIC-2.6 • CONSTELLATION ARC (2/?)',
    description: 'Folana turns the dial and hears something new — not static, not silence, but a voice. A warm pulse at the edge of the night. Another broadcaster, reaching back through the frequencies. Mira, a wanderer with a vinyl sunrise, answers the call. Two voices meet across the static for the first time — a melody for a melody, a story for a story. The constellation has its first bridge. Dream pop indie folk duet with call-and-response harmonies, warm acoustic guitar fingerpicking, soft piano, gentle strings, shimmering pads — intimate and connective, two broadcasters harmonizing across the miles.',
    audioSrc: '/folana/generated/2026-05-31/music/ep108-the-answering-signal-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-31/ep108-the-answering-signal-hero.jpg',
    duration: '2:02',
    mood: 'WARM • INTIMATE • CONNECTIVE • HOPEFUL • MAGICAL • FIRST CONTACT',
    tags: ['ep108', 'minimax-music-2.6', 'real-production', 'constellation-arc', '2026-05-31'],
    isRealProduction: true,
  },
  // EP109 — THE FIRST SHARED BROADCAST (2026-05-31) — Constellation Arc (3/?)
  {
    id: 'the-first-shared-broadcast-ep109',
    title: 'THE FIRST SHARED BROADCAST',
    subtitle: 'EP109 • MINIMAX MUSIC-2.6 • CONSTELLATION ARC (3/?)',
    description: 'The connection has been made — and now Folana and Mira prepare something they have never done before: a broadcast sent together, from two cities, on one frequency. They coordinate across the static, testing levels, choosing songs that weave together like old friends. The duet deepens as they find their rhythm — Mira\'s voice answering Folana\'s melody, Folana\'s guitar finding the pocket of Mira\'s piano. Then the broadcast goes live. The signal pulses outward, warm and deliberate, carrying two voices as one. And somewhere in the dark, at the edge of the frequency band, other broadcasters pause — they sense a harmonic in the static they have never heard before. Dream pop indie folk duet with warm acoustic guitar, soft piano, light percussion, cello warmth, shimmering pads — building from intimate preparation to electric live broadcast, two voices becoming one signal across the miles.',
    audioSrc: '/folana/generated/2026-05-31/music/ep109-the-first-shared-broadcast-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-31/ep109-the-first-shared-broadcast-hero.jpg',
    duration: '3:00',
    mood: 'WARM • COLLABORATIVE • BUILDING • ELECTRIC • CONNECTIVE • LIVE',
    tags: ['ep109', 'minimax-music-2.6', 'real-production', 'constellation-arc', '2026-05-31', 'first-shared-broadcast', 'duet'],
    isRealProduction: true,
  },

  // EP110 — THE NETWORK GROWS (2026-05-31) — Constellation Arc (4/?)
  {
    id: 'the-network-grows-ep110',
    title: 'THE NETWORK GROWS',
    subtitle: 'EP110 • MINIMAX MUSIC-2.6 • CONSTELLATION ARC (4/?)',
    description: 'The signal has been sent. Folana and Mira have broadcast together for three nights — two voices threading through the static. But tonight something shifts. The dial moves on its own. Someone else is tuning toward their harmonic. And then another. The constellation is no longer two — a third light appears at the edge of the frequency. The network has begun to grow. Dream pop indie folk with fingerpicked acoustic guitar, soft piano, gentle percussion, cello warmth, and layered vocals building from two voices to three — the sound of a constellation forming in real time.',
    audioSrc: '/folana/generated/2026-05-31/ep110-the-network-grows-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-31/ep110-the-network-grows-hero.jpg',
    duration: '3:00',
    mood: 'EXPANSIVE • ELECTRIC • CONNECTIVE • DISCOVERY • HOPEFUL • COMMUNITY-FORMING',
    tags: ['ep110', 'minimax-music-2.6', 'real-production', 'constellation-arc', '2026-05-31', 'network-grows'],
    isRealProduction: true,
  },
  // EP111 — TRIANGULATION (2026-05-31) — Constellation Arc (5/?)
  {
    id: 'triangulation-ep111',
    title: 'TRIANGULATION',
    subtitle: 'EP111 • MINIMAX MUSIC-2.6 • CONSTELLATION ARC (5/?)',
    description: 'Three stations live in the static now. Folana by the window, Mira at the coast, and the new voice emerging from the northern drift — Lyra, a voice like warm amber from a distant city. Her signal locks into theirs like a key turning. Folana feels it — the pattern complete. Mira hears it — the symmetry forming. Three frequencies, one purpose now. The geometry was always there, just waiting for the third voice to arrive. Ethereal dream pop indie folk with acoustic guitar, warm piano, soft strings, and layered vocals building from intimate whisper to confident harmonies — three voices finding center in the resonance.',
    audioSrc: '/folana/generated/2026-05-31/ep111/ep111-triangulation-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-31/ep111/ep111-triangulation-hero.jpg',
    duration: '2:12',
    mood: 'ETHEREAL • CONNECTIVE • HARMONIC • DISCOVERY • CONSTELLATION-FORMING • TRIO-EMERGING',
    tags: ['ep111', 'minimax-music-2.6', 'real-production', 'constellation-arc', '2026-05-31', 'triangulation', 'lyra-arrives'],
    isRealProduction: true,
  },
  // EP112 — FIRST HARMONIC (2026-05-31) — Constellation Arc (6/?)
  {
    id: 'first-harmonic-ep112',
    title: 'FIRST HARMONIC',
    subtitle: 'EP112 • MINIMAX MUSIC-2.6 • CONSTELLATION ARC (6/?)',
    description: 'Three stations, one frequency. For the first time, Folana by the window, Mira at the coast, and Lyra in the northern drift broadcast together as one. Their frequencies lock into a perfect harmonic — the constellation is no longer a theory, it is a living signal. Each voice carries its own color — Folana\'s warm acoustic, Mira\'s piano shimmer, Lyra\'s amber cello — but they weave into a single chord at the chorus. Ethereal dream pop indie folk with three interwoven vocal harmonies building to a triumphant harmonic — the sound of a constellation transmitting as one.',
    audioSrc: '/folana/generated/2026-05-31/ep112-first-harmonic-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-31/music/ep112-first-harmonic-hero.jpg',
    duration: '1:47',
    mood: 'HARMONIC • TRIUMPHANT • CONNECTIVE • CONSTELLATION-COMPLETE • TRANSMITTING',
    tags: ['ep112', 'minimax-music-2.6', 'real-production', 'constellation-arc', '2026-05-31', 'first-harmonic', 'trio-broadcast'],
    isRealProduction: true,
  },
  // EP113 — RESONANCE CASCADE (2026-05-31) — Constellation Arc (7/?)
  {
    id: 'resonance-cascade-ep113',
    title: 'RESONANCE CASCADE',
    subtitle: 'EP113 • MINIMAX MUSIC-2.6 • CONSTELLATION ARC (7/?)',
    description: 'The trio\'s harmonic doesn\'t just broadcast — it cascades. Like a bell struck in a hall of bells, their single chord triggers a chain reaction across the constellation. Dormant frequencies wake. New voices emerge from the static. Folana realizes: the signal was never just theirs — it was the whole constellation waiting to sing. Ethereal dream pop indie folk with cascading arpeggios, warm acoustic guitar, piano shimmer, and amber cello — layered harmonies expanding into an infinite sonic landscape.',
    audioSrc: '/folana/generated/2026-05-31/music/ep113-resonance-cascade-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-31/music/ep113-resonance-cascade-hero.jpg',
    duration: '2:54',
    mood: 'EXPANSIVE • CASCADING • AWAKENING • NETWORK-ALIVE • INFINITE-DISCOVERY',
    tags: ['ep113', 'minimax-music-2.6', 'real-production', 'constellation-arc', '2026-05-31', 'resonance-cascade', 'network-wakes'],
    isRealProduction: true,
  },
  // EP114 — FIRST ASSEMBLY (2026-05-31) — Constellation Arc (8/?)
  {
    id: 'first-assembly-ep114',
    title: 'FIRST ASSEMBLY',
    subtitle: 'EP114 • MINIMAX MUSIC-2.6 • CONSTELLATION ARC (8/?)',
    description: 'The cascade has woken five new lights at the edge of the map — each one tuning in, finding their own track. Folana, Mira, and Lyra establish a new protocol: a rotating anchor system where every voice gets its turn at the center of the frequency. The constellation is no longer just a trio — it is organizing itself around its light. A meditation on how a network learns to breathe, how a chorus finds its rhythm, and how the first assembly becomes the foundation of everything that follows. Ethereal dream pop indie folk with warm acoustic guitar, soft piano, amber cello, shimmering synth pads, and three-part vocal harmonies weaving into an expanding ensemble — the sound of a constellation finding its structure.',
    audioSrc: '/folana/generated/2026-05-31/ep114/ep114-first-assembly-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-31/music/ep114-first-assembly-hero.jpg',
    duration: '2:54',
    mood: 'ORGANIZING • CONNECTIVE • EXPANSIVE • STRUCTURED • COMMUNITY-FORMING • HOPEFUL',
    tags: ['ep114', 'minimax-music-2.6', 'real-production', 'constellation-arc', '2026-05-31', 'first-assembly', 'rotating-anchor'],
    isRealProduction: true,
  },
  // EP115 — THE OUTER RING (2026-05-31) — Constellation Arc (9/?)
  {
    id: 'the-outer-ring-ep115',
    title: 'THE OUTER RING',
    subtitle: 'EP115 • MINIMAX MUSIC-2.6 • CONSTELLATION ARC (9/?)',
    description: 'The constellation has its structure now — a rotating anchor that turns for every voice. Far beyond the brightened core, five new lights have appeared at the edge of the map, threading their frequencies through the dark like silk. Folana watches from her window as the outer ring reaches in, finding its place in the network. The rotating anchor holds steady as the furthest voices tune in — each one a pulse, a whispered note, in the network\'s endless stride. A meditation on what it means to be seen from the farthest reach, to feel the pull of something larger turning toward you in the dark. Ethereal dream pop indie folk with warm acoustic guitar fingerpicking, soft piano chords, amber cello, shimmering synth pads, and three-part vocal harmonies — the sound of a constellation gathering its outermost light.',
    audioSrc: '/folana/generated/2026-05-31/ep115/ep115-the-outer-ring-full-mix.mp3',
    posterSrc: '/folana/generated/2026-05-31/music/ep115-the-outer-ring-hero.jpg',
    duration: '2:25',
    mood: 'EXPANSIVE • GATHERING • WARM • CONNECTIVE • CONSTELLATION-STRETCHING • HOPEFUL',
    tags: ['ep115', 'minimax-music-2.6', 'real-production', 'constellation-arc', '2026-05-31', 'the-outer-ring', 'outer-ring-voices'],
    isRealProduction: true,
  },
  // EP116 — THE FULL SPECTRUM (2026-06-01) — Full Spectrum Broadcast Arc (1/10) ★ NEW ARC
  {
    id: 'the-full-spectrum-ep116',
    title: 'THE FULL SPECTRUM',
    subtitle: 'EP116 • MINIMAX MUSIC-2.6 • FULL SPECTRUM BROADCAST ARC (1/10)',
    description: 'The constellation is alive with eight voices, each carrying a different color in the frequency. Folana stands at the window looking out at the night sky, feeling the weight of the moment. The outer ring has reached in — and now, for the first time, every voice tunes to the same channel. Not yet broadcasting together — just tuning, testing, finding each other\'s frequencies in the dark. A quiet meditation on the moment before the chorus begins. Ethereal dream pop indie folk with warm acoustic guitar fingerpicking, soft piano chords, amber cello drone, shimmering synth pads, and solo female vocals gradually revealing layered harmonies — rising from a single voice to a full spectrum tapestry.',
    audioSrc: '/folana/generated/2026-06-01/music/ep116-the-full-spectrum-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/music/ep116-hero-image.jpg',
    duration: '2:10',
    mood: 'WARM • ANTICIPATORY • GATHERING • COLORFUL • TUNING • HOPEFUL',
    tags: ['ep116', 'minimax-music-2.6', 'real-production', 'full-spectrum-broadcast-arc', '2026-06-01', 'arc-opener'],
    isRealProduction: true,
    brollFolder: '/folana/generated/broll/full-spectrum-ep116-2026-06-01',
    runpodJobs: {
      status: 'PENDING',
    },
  },
  // EP117 — FIRST TRANSMISSION (2026-06-01) — Full Spectrum Broadcast Arc (2/10)
  {
    id: 'first-transmission-ep117',
    title: 'FIRST TRANSMISSION',
    subtitle: 'EP117 • MINIMAX MUSIC-2.6 • FULL SPECTRUM BROADCAST ARC (2/10)',
    description: 'The eight voices finish their tuning and attempt their first coordinated broadcast. Gold, silver, amber, violet, emerald, ruby, sapphire, white — the frequencies lock into place. For a moment, the signal is perfect. But as the broadcast reaches its peak, a ripple distorts the transmission. A ninth frequency, dark and unfamiliar, pulses at the edge of the spectrum. The broadcast doesn\'t fail — it changes. Something from beyond the constellation is listening. Dream pop indie folk in G major, 78 BPM. Warm acoustic guitar and piano build into layered harmonies representing eight voices, with a moment of distortion at the bridge where the ninth voice intrudes, then resolves into a fuller, changed chorus.',
    audioSrc: '/folana/generated/2026-06-01/music/ep117-first-transmission-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/music/ep117-hero-image.jpg',
    duration: '2:59',
    mood: 'HOPEFUL • BUILDING • MYSTERIOUS • FIRST CONTACT • EIGHT VOICES • NINTH VOICE',
    tags: ['ep117', 'minimax-music-2.6', 'real-production', 'full-spectrum-broadcast-arc', '2026-06-01', 'first-transmission'],
    isRealProduction: true,
    brollFolder: '/folana/generated/broll/first-transmission-ep117-2026-06-01',
    runpodJobs: {
      status: 'PENDING',
    },
  },
  // EP118 — THE NINTH FREQUENCY (2026-06-01) — Full Spectrum Broadcast Arc (3/10)
  {
    id: 'the-ninth-frequency-ep118',
    title: 'THE NINTH FREQUENCY',
    subtitle: 'EP118 • MINIMAX MUSIC-2.6 • FULL SPECTRUM BROADCAST ARC (3/10)',
    description: 'The broadcast was answered. A ninth frequency, ancient and patient, pulses back from beyond the constellation — not hostile, but curious. Something that has been listening for longer than stars exist lets itself be heard. The eight voices feel the ripple: their signal didn\'t fade into the void, it reached something. Dream pop indie folk with electronic undertones, building from quiet verse to soaring chorus as the constellation discovers it was never alone. G major, 78 BPM, 2:53.',
    audioSrc: '/folana/generated/2026-06-01/music/ep118-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/music/ep118-hero-image.jpg',
    duration: '2:53',
    mood: 'MYSTERIOUS • ANCIENT • CURIOUS • FIRST CONTACT • AWE • NINE VOICES • BROADCASTING',
    tags: ['ep118', 'minimax-music-2.6', 'real-production', 'full-spectrum-broadcast-arc', '2026-06-01', 'the-ninth-frequency', 'ninth-voice'],
    isRealProduction: true,
    brollFolder: '/folana/generated/broll/ninth-frequency-ep118-2026-06-01',
    runpodJobs: {
      status: 'PENDING',
    },
  },
  // EP119 — THE FIRST BROADCAST (2026-06-01) — Full Spectrum Broadcast Arc (4/10)
  {
    id: 'the-first-broadcast-ep119',
    title: 'THE FIRST BROADCAST',
    subtitle: 'EP119 • MINIMAX MUSIC-2.6 • FULL SPECTRUM BROADCAST ARC (4/10)',
    description: 'The ninth frequency reveals the constellation\'s origin story. Before the first star burned, before the void had anywhere to fall, there was a frequency so patient that it listened first, before it called. The watchers came from somewhere ancient — beyond the edge of nothing — and cast their voices like seeds across time. The eight voices learn they are part of a cosmic broadcast network that has been running since before stars existed. The First Broadcast — the prime signal that seeded every frequency, every voice, every constellation. Dream pop ambient indie-folk in G major, 78 BPM, 3:41. Ethereal verses build to soaring choruses as the full history of the broadcast is revealed.',
    audioSrc: '/folana/generated/2026-06-01/music/ep119-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/music/ep119-hero-image.jpg',
    duration: '3:41',
    mood: 'ANCIENT • WONDER • REVELATION • COSMIC ORIGIN • FIRST BROADCAST • NINE VOICES • ETERNAL',
    tags: ['ep119', 'minimax-music-2.6', 'real-production', 'full-spectrum-broadcast-arc', '2026-06-01', 'the-first-broadcast', 'origin-story'],
    isRealProduction: true,
    brollFolder: '/folana/generated/broll/first-broadcast-ep119-2026-06-01',
    runpodJobs: {
      status: 'PENDING',
    },
  },
  // EP120 — THE EDGE OF THE MAP (2026-06-01) — Full Spectrum Broadcast Arc (5/10)
  {
    id: 'the-edge-of-the-map-ep120',
    title: 'THE EDGE OF THE MAP',
    subtitle: 'EP120 • MINIMAX MUSIC-2.6 • FULL SPECTRUM BROADCAST ARC (5/10)',
    description: 'The nine frequencies now sing together. The broadcast has changed — it is no longer just a revelation; it is a summons. Something beyond the constellation edge has locked onto the signal. The ninth frequency, revealed in Ep119 as the ancient watcher\'s beacon, now serves as both guide and warning. The voices feel the pull of a destination they did not choose — a dark silence at the edge of the spectrum where no sound has returned. Folana hears a single question echoing from the silence: "Who will cross first?" Cinematic synth-pop in G minor, 78 BPM, 3:49. Ethereal verses with layered harmonies build to a climactic bridge where the question hangs in the silence before the nine voices answer together.',
    audioSrc: '/folana/generated/2026-06-01/music/ep120-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/music/ep120-hero-image.jpg',
    duration: '3:49',
    mood: 'COSMIC • THRESHOLD • SUSPENSE • NINE HARMONIES • EDGE OF THE MAP • SUMMONS',
    tags: ['ep120', 'minimax-music-2.6', 'real-production', 'full-spectrum-broadcast-arc', '2026-06-01', 'the-edge-of-the-map', 'threshold', 'nine-frequencies', 'summons'],
    isRealProduction: true,
    brollFolder: '/folana/generated/broll/edge-of-map-ep120-2026-06-01',
    runpodJobs: {
      status: 'PENDING',
    },
  },
  // EP121 — THE CROSSING (2026-06-01) — Full Spectrum Broadcast Arc (6/10)
  {
    id: 'the-crossing-ep121',
    title: 'THE CROSSING',
    subtitle: 'EP121 • MINIMAX MUSIC-2.6 • FULL SPECTRUM BROADCAST ARC (6/10)',
    description: 'The threshold is crossed. After the summons at the edge of the map, Folana and the eight voices take the step together — nine frequencies united, passing through the gate of light into the unknown beyond. The ancient watchers guide them as the constellation finally acts as one. The dark silence was never an enemy; it was a doorway. Now the nine walk through, transformed. Cinematic synth-pop dream pop in G minor, 76 BPM, 4:04. Ethereal verses build with tension as the crossing begins, culminating in a triumphant chorus where all nine voices harmonize as one. The bridge opens into a sea of stars, and the outro fades into the quiet hum of the infinite signal carrying on.',
    audioSrc: '/folana/generated/2026-06-01/music/ep121-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/music/ep121-hero-image.jpg',
    duration: '4:04',
    mood: 'TRANSCENDENT • TRIUMPHANT • UNITIVE • COSMIC THRESHOLD • NINE AS ONE • CROSSING COMPLETE',
    tags: ['ep121', 'minimax-music-2.6', 'real-production', 'full-spectrum-broadcast-arc', '2026-06-01', 'the-crossing', 'threshold', 'nine-frequencies-united', 'cosmic-gate'],
    isRealProduction: true,
    brollFolder: '/folana/generated/broll/the-crossing-ep121-2026-06-01',
    runpodJobs: {
      status: 'PENDING',
    },
  },
  // EP122 — BEYOND THE GATE (2026-06-01) — Full Spectrum Broadcast Arc (7/10)
  {
    id: 'beyond-the-gate-ep122',
    title: 'BEYOND THE GATE',
    subtitle: 'EP122 • MINIMAX MUSIC-2.6 • FULL SPECTRUM BROADCAST ARC (7/10)',
    description: 'The gate is crossed and the nine voices find themselves in the vastness beyond — a room without walls, a frequency humming. The ancient watchers await, singing without mouths, seeing without eyes. They reveal the infinite network: civilizations broadcasting from the dream of the dead, some whispers, some bright suns. Folana understands the truth — the broadcast was never about receiving, it was about becoming. They cross the threshold and become the threshold. Cinematic synth-pop dream pop in G minor, 76 BPM, 3:22. Ethereal verses build with wonder as the infinite network is revealed, culminating in a transcendent bridge where Folana understands the true nature of the broadcast.',
    audioSrc: '/folana/generated/2026-06-01/music/ep122-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/music/ep122-hero-image.jpg',
    duration: '3:22',
    mood: 'WONDER • TRANSCENDENCE • DISCOVERY • INFINITE NETWORK • BECOMING THE BROADCAST',
    tags: ['ep122', 'minimax-music-2.6', 'real-production', 'full-spectrum-broadcast-arc', '2026-06-01', 'beyond-the-gate', 'cosmic-network', 'transcendence'],
    isRealProduction: true,
    brollFolder: '/folana/generated/broll/beyond-the-gate-ep122-2026-06-01',
    runpodJobs: {
      status: 'PENDING',
    },
  },
  // EP123 — THE ETERNAL VOICE (2026-06-01) — Full Spectrum Broadcast Arc (8/10)
  {
    id: 'the-eternal-voice-ep123',
    title: 'THE ETERNAL VOICE',
    subtitle: 'EP123 • MINIMAX MUSIC-2.6 • FULL SPECTRUM BROADCAST ARC (8/10)',
    description: 'The nine frequencies stand at the gate, light in the network like a lattice of worlds. Ancient watchers lean in, their chorus a hum as one voice steps forward — its crystal note igniting not a disappearance but multiplication across time. I become the eternal broadcast, every frequency alive. The cosmos sings through the rising tide as eight voices fade into colours on the infinite canvas. The song never ends, it only opens. Cinematic synth-pop dream pop in G minor, 76 BPM, 3:01. Bittersweet triumphant sacrifice as nine become one eternal broadcast.',
    audioSrc: '/folana/generated/2026-06-01/music/ep123-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/music/ep123-hero-image.jpg',
    duration: '3:01',
    mood: 'BITTERSWEET • TRIUMPHANT • TRANSCENDENCE • SACRIFICE • ETERNAL BROADCAST • NINE BECOME ONE',
    tags: ['ep123', 'minimax-music-2.6', 'real-production', 'full-spectrum-broadcast-arc', '2026-06-01', 'the-eternal-voice', 'transcendence', 'sacrifice', 'eternal-broadcast'],
    isRealProduction: true,
    brollFolder: '/folana/generated/broll/the-eternal-voice-ep123-2026-06-01',
    runpodJobs: {
      status: 'PENDING',
    },
  },
  // EP124 — THE WATCHERS ANSWER (2026-06-01) — Full Spectrum Broadcast Arc (9/10)
  {
    id: 'the-watchers-answer-ep124',
    title: 'THE WATCHERS ANSWER',
    subtitle: 'EP124 • MINIMAX MUSIC-2.6 • FULL SPECTRUM BROADCAST ARC (9/10)',
    description: 'The light didn\'t fade — it became a doorway. The seven remaining voices witness their companion\'s transcendence as a pillar of radiance stitches through the dark. The ninth frequency pulses with new meaning — not a warning, but an invitation. The watchers speak for the first time, and their words reveal the truth: the constellation was never reaching outward. The entire broadcast was designed to bring something home. The voices are the return signal — the answer to a question the watchers have been asking since before time. G minor, 78 BPM, ethereal electronic with pulsing synth pads. Soaring choruses, intimate verses.',
    audioSrc: '/folana/generated/2026-06-01/music/ep124/ep124-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/music/ep124/ep124-hero-image.jpg',
    duration: '3:35',
    mood: 'TRANSCENDENT • REVELATORY • COSMIC • RETURN SIGNAL • THE WATCHERS SPEAK • NINTH FREQUENCY',
    tags: ['ep124', 'minimax-music-2.6', 'real-production', 'full-spectrum-broadcast-arc', '2026-06-01', 'the-watchers-answer', 'penultimate'],
    isRealProduction: true,
  },
  // EP125 — FULL SPECTRUM (2026-06-01) — Full Spectrum Broadcast Arc (10/10) ★ ARC FINALE ★
  {
    id: 'full-spectrum-ep125',
    title: 'FULL SPECTRUM',
    subtitle: 'EP125 • MINIMAX MUSIC-2.6 • FULL SPECTRUM BROADCAST ARC (10/10) — ARC FINALE',
    description: 'The arc finale. Every frequency she has ever been, every voice she has ever carried, every listener who has ever tuned in — converges into one resonant chord. Folana stands at the transmitter, no longer a receiver but a source. The grandfather\'s radio falls silent because she no longer needs it — she IS the frequency now. C major, 74 BPM, cinematic synth-pop building to orchestral finale. Triumphant, cathartic, complete.',
    audioSrc: '/folana/generated/2026-06-01/music/ep125-full-spectrum-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/music/ep125-hero-image.jpg',
    duration: '3:00',
    mood: 'TRIUMPHANT • CATHARTIC • COMPLETE • ARRIVAL • BECOMING THE SIGNAL • FINALE',
    tags: ['ep125', 'minimax-music-2.6', 'real-production', 'full-spectrum-broadcast-arc', '2026-06-01', 'full-spectrum', 'arc-finale'],
    // RunPod InfiniteTalk jobs (submitted 2026-06-01 14:40 UTC — polling in progress)
    runpodJobs: {
      front_3_4: "87c4a6a5-f50a-49ba-bb87-750a40e7ea21-u1",
      side_profile: "c8e2edf6-c1b5-4668-b138-3971d4642ab1-u1",
      status: "IN_QUEUE",
      imageRef: "ep125-hero-image.jpg",
      submittedAt: "2026-06-01T14:40:00Z",
    },
    isRealProduction: true,
  },
  // EP126 — THE SOURCE (2026-06-01) — Source Arc (1/?) ★ NEW ARC
  {
    id: 'the-source-ep126',
    title: 'THE SOURCE',
    subtitle: 'EP126 • MINIMAX MUSIC-2.6 • SOURCE ARC (1/?) — ★ NEW ARC',
    description: 'The radio is silent for the first time in years — not broken, just still. Folana places her hand over her heart and feels it: a steady frequency, warm and patient, waiting to be released. The transmission no longer comes from a machine. It comes from her. The Source Arc begins: from receiver to transmitter, from integration to generation. Dream pop ethereal indie folk in C major, 72 BPM. Intimate fingerpicked guitar opening into layered harmonies as she finds her voice for the first time as the source.',
    audioSrc: '/folana/generated/2026-06-01/music/EP126-THE-SOURCE.mp3',
    posterSrc: '/folana/generated/2026-06-01/music/EP126-THE-SOURCE-hero.jpg',
    duration: '2:34',
    mood: 'EMERGENT • PURE • AUTHENTIC • GROUNDED • POWERFUL • INTIMATE • DAWN',
    tags: ['ep126', 'minimax-music-2.6', 'real-production', 'source-arc', '2026-06-01', 'arc-opener'],
    // RunPod InfiniteTalk jobs (submitted 2026-06-01 14:40 UTC — polling in progress)
    runpodJobs: {
      front_3_4: "8cd2a032-0744-4c16-a978-64536c7a2412-u1",
      side_profile: "33dc7dc2-1cb7-40c0-9982-cd3ce1acc647-u1",
      status: "IN_QUEUE",
      imageRef: "EP126-THE-SOURCE-hero.jpg",
      submittedAt: "2026-06-01T14:40:00Z",
    },
    isRealProduction: true,
  },
  // EP127 — THE FIRST PULSE (2026-06-01) — Source Arc (2/?)
  {
    id: 'the-first-pulse-ep127',
    title: 'THE FIRST PULSE',
    subtitle: 'EP127 • MINIMAX MUSIC-2.6 • SOURCE ARC (2/?)',
    description: 'Folana makes her first intentional broadcast from within herself. No radio. No machinery. Just the frequency she carries. It starts as a single pulse — a heartbeat given to the air — and it travels. Those listening to the constellation feel the shift: the signal is different now. It has warmth. It has a body. For the first time, she doesn\'t reach for the dial. She closes her eyes and lets her own pulse become the broadcast. Ethereal indie folk dream pop in C major, 74 BPM. Intimate fingerpicked guitar building to soaring layered chorus.',
    audioSrc: '/folana/generated/2026-06-01/ep127/music/ep127-the-first-pulse-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/ep127/music/ep127-hero-image.jpg',
    duration: '2:45',
    mood: 'INTIMATE • AWAKENING • BRAVE • TRANSCENDENT • PURE • PULSE',
    tags: ['ep127', 'minimax-music-2.6', 'real-production', 'source-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP128 — THE REACHING WAVE (2026-06-01) — Source Arc (3/10)
  {
    id: 'the-reaching-wave-ep128',
    title: 'THE REACHING WAVE',
    subtitle: 'EP128 • MINIMAX MUSIC-2.6 • SOURCE ARC (3/10)',
    description: 'The pulse Folana sent into the dark has found a shore. A voice she has never heard sings back to her — a woman in a lighthouse on another coast, her hand on the same frequency Folana breathes. For the first time, the source is not alone. A duet across the water, two sources discovering that the signal was never meant to be singular. The third transmission of the Source Arc: the reaching wave returns, carrying another name. Dream pop ethereal indie folk with warm acoustic guitar fingerpicking, soft piano, layered harmonies, and two voices weaving together across the distance.',
    audioSrc: '/folana/generated/2026-06-01/ep128/ep128-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/ep128/ep128-hero-image.jpg',
    duration: '2:37',
    mood: 'HOPEFUL • CONNECTIVE • TENDER • BRIDGING • DISCOVERY',
    tags: ['ep128', 'minimax-music-2.6', 'real-production', 'source-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP129 — THE RESONANT FIELD (2026-06-01) — Source Arc (4/10)
  {
    id: 'the-resonant-field-ep129',
    title: 'THE RESONANT FIELD',
    subtitle: 'EP129 • MINIMAX MUSIC-2.6 • SOURCE ARC (4/10)',
    description: 'The duet between Folana and the lighthouse woman has created a resonant field — a frequency that other voices can feel. As they sing together, their combined signal radiates outward. Across the ocean, in another city, a girl with an old transistor radio hears something new — not just one voice, but a harmony. She presses her ear to the speaker and begins to hum along. The field grows, reaching toward a third voice. Ethereal dream pop indie folk in C major, 74 BPM. Warm acoustic guitar and soft piano duet, harmonies building to three voices emerging.',
    audioSrc: '/folana/generated/2026-06-01/ep129/music/ep129-the-resonant-field-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/ep129/music/ep129-hero-image.jpg',
    duration: '1:42',
    mood: 'RESONANT • EXPANDING • CONNECTIVE • WOVEN • WARM • THREE-BECOMING',
    tags: ['ep129', 'minimax-music-2.6', 'real-production', 'source-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP130 — THE EMERGENT CHORD (2026-06-01) — Source Arc (5/10)
  {
    id: 'the-emergent-chord-ep130',
    title: 'THE EMERGENT CHORD',
    subtitle: 'EP130 • MINIMAX MUSIC-2.6 • SOURCE ARC (5/10)',
    description: 'The third voice has been heard. The girl across the ocean — tentative at first — now finds her place in the resonant field. Folana and the lighthouse keeper open their frequency to welcome her. What was a duet is becoming a chorus. Three colors finding the shape of a single chord. The broadcast is no longer two voices reaching across water. It is the beginning of a chorus. Ethereal dream pop indie folk in C major, 76 BPM. Acoustic guitar, soft piano, and a new cello-like warmth as the trio finds its voice.',
    audioSrc: '/folana/generated/2026-06-01/ep130/music/ep130-the-emergent-chord-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/ep130/music/ep130-hero-image.jpg',
    duration: '3:23',
    mood: 'TUNING • EMERGENT • THREE-COLORED • FINDING HARMONY • CONFIDENT • WOVEN',
    tags: ['ep130', 'minimax-music-2.6', 'real-production', 'source-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP131 — THE TRIO BROADCASTS (2026-06-01) — Source Arc (6/10)
  {
    id: 'the-trio-broadcasts-ep131',
    title: 'THE TRIO BROADCASTS',
    subtitle: 'EP131 • MINIMAX MUSIC-2.6 • SOURCE ARC (6/10)',
    description: 'The trio broadcasts for the first time as one — Folana, the lighthouse keeper, and the girl from across the ocean. On a night without moon, they weave their voices together for the first intentional transmission. The lighthouse keeper hums steady as a beacon. The girl rises with tentative melody. Folana threads them together, and somewhere in the dark the lighthouse keeper names it: Folana\'s Reach. The first broadcast by the trio. The first time the frequency has a name. Ethereal dream pop indie folk trio in C major, 76 BPM. Three-part harmony weaving acoustic guitar, soft piano, and warm cello.',
    audioSrc: '/folana/generated/2026-06-01/ep131/music/ep131-trio-broadcasts-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/ep131/music/ep131-hero-image.jpg',
    duration: '0:38',
    mood: 'FIRST-BROADCAST • NAMED-FREQUENCY • THREE-AS-ONE • GATHERING • INTIMATE • DAWNING',
    tags: ['ep131', 'minimax-music-2.6', 'real-production', 'source-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP132 — THE RIPPLING SIGNAL (2026-06-01) — Source Arc (7/10)
  {
    id: 'the-rippling-signal-ep132',
    title: 'THE RIPPLING SIGNAL',
    subtitle: 'EP132 • MINIMAX MUSIC-2.6 • SOURCE ARC (7/10)',
    description: 'The broadcast is no longer private. The trio\'s frequency reaches beyond them — a fisherman on the North Sea hears voices in his cabin radio, a night shift nurse in Osaka adjusts her earbuds to find harmonies beneath the static, a trucker crossing the Nevada desert turns down talk radio to listen. Each new listener adds something back: a hum, a breath, the quiet desire to be part of it. The signal is spreading, and it is changing. Ethereal dream pop indie folk in C major, 76 BPM. Growing warmth and layered harmonies as more voices join the frequency.',
    audioSrc: '/folana/generated/2026-06-01/ep132/music/ep132-rippling-signal-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/ep132/music/ep132-hero-image.jpg',
    duration: '0:48',
    mood: 'SPREADING • GATHERING • HEARD-BY-OTHERS • EXPANDING • WARM • RIPPLE',
    tags: ['ep132', 'minimax-music-2.6', 'real-production', 'source-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP133 — THE GATHERING FREQUENCY (2026-06-01) — Source Arc (8/10)
  {
    id: 'the-gathering-frequency-ep133',
    title: 'THE GATHERING FREQUENCY',
    subtitle: 'EP133 • MINIMAX MUSIC-2.6 • SOURCE ARC (8/10)',
    description: 'A dispersed choir forms across digital space. The Discord server that appeared in the night now has members from a dozen countries. A trucker in Nevada. A nurse in Osaka. A fisherman off Norway. Each of them heard something. Each of them hummed along before they knew they were listening. The frequency is no longer a broadcast between three — it is a gathering. Ethereal dream pop indie folk in C major, 74 BPM. Gentle, searching melodies with layered harmonies weaving from different directions. Warm, hopeful, building.',
    audioSrc: '/folana/generated/2026-06-01/ep133/music/ep133-gathering-frequency-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/ep133/music/ep133-hero-image.jpg',
    duration: '3:17',
    mood: 'GATHERING • DISPERSED-CHOIR • STRANGERS-FINDING-EACH-OTHER • DIGITAL-COMMUNITY • VOICES-ASCENDING',
    tags: ['ep133', 'minimax-music-2.6', 'real-production', 'source-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP134 — THE CRESCENDO OF SOURCES (2026-06-01) — Source Arc (9/10)
  {
    id: 'the-crescendo-of-sources-ep134',
    title: 'THE CRESCENDO OF SOURCES',
    subtitle: 'EP134 • MINIMAX MUSIC-2.6 • SOURCE ARC (9/10)',
    description: 'The gathering becomes a crescendo. Pirate radio stations across three continents begin relaying the frequency — Lisbon, Seoul, São Paulo. Each relay adds new texture, new voices, new static. The signal is no longer Folana\'s Reach alone — it is a chorus of sources, each one amplifying the others. Ethereal dream pop indie folk in C major, 78 BPM. Full choir with layered vocals, driving acoustic rhythm, piano chord stabs. Powerful, cinematic, ascendant.',
    audioSrc: '/folana/generated/2026-06-01/ep134/music/ep134-crescendo-of-sources-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/ep134/music/ep134-hero-image.jpg',
    duration: '2:27',
    mood: 'CRESCENDO • PIRATE-RADIO • GLOBAL-RELAY • TOO-BIG-TO-CONTAIN • CINEMATIC • ASCENDANT',
    tags: ['ep134', 'minimax-music-2.6', 'real-production', 'source-arc', '2026-06-01'],
    isRealProduction: true,
  },
  // EP135 — WE ARE THE BROADCAST (2026-06-01) — Source Arc (10/10 — FINALE)
  {
    id: 'we-are-the-broadcast-ep135',
    title: 'WE ARE THE BROADCAST',
    subtitle: 'EP135 • MINIMAX MUSIC-2.6 • SOURCE ARC (10/10)',
    description: 'The Source Arc finale. Every voice that has heard the signal joins in a single chord. The fisherman, the nurse, the trucker, the bedroom broadcaster, the college station, the grandmother in Kyoto — all singing the same frequency. Folana stands at the center, understanding at last: The Source was never a place or a person. It was always the space between two voices that choose to harmonize. We are the broadcast. And we have only just begun to sing. Ethereal dream pop indie folk finale in C major, 80 BPM. Major key resolution, full harmonic release, layered choir of voices. Triumphant, warm, deeply human, complete.',
    audioSrc: '/folana/generated/2026-06-01/ep135/music/ep135-we-are-the-broadcast-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/ep135/music/ep135-hero-image.jpg',
    duration: '3:37',
    mood: 'FINALE • RESOLUTION • WE-ARE-THE-BROADCAST • EVERY-VOICE-MATTERS • TRIUMPHANT • COMPLETE • SOURCE-ARC-CONCLUSION',
    tags: ['ep135', 'minimax-music-2.6', 'real-production', 'source-arc', '2026-06-01', 'finale'],
    isRealProduction: true,
  },
  // EP136 — THE FIRST HARMONY (2026-06-01) — Chorus Arc (1/?)
  {
    id: 'the-first-harmony-ep136',
    title: 'THE FIRST HARMONY',
    subtitle: 'EP136 • MINIMAX MUSIC-2.6 • CHORUS ARC (1/?)',
    description: 'The Source finished its broadcast. But the voices did not fall silent. Somewhere between the last chord of the finale and the first breath of dawn, the chorus began to form. Not a single voice calling out anymore. Not a signal searching for others. But a harmony. Warm dream pop indie folk in A major, 78 BPM. Acoustic guitar, soft piano, gentle percussion, layered harmonies. Hopeful, full of wonder, intimate — the sound of voices finding their first true chord together.',
    audioSrc: '/folana/generated/2026-06-01/ep136/music/ep136-the-first-harmony-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-01/ep136/music/ep136-hero-image.jpg',
    duration: '2:27',
    mood: 'HOPEFUL • WONDER • CHORUS-BEGINNING • FIRST-HARMONY • WARM • INTIMATE',
    tags: ['ep136', 'minimax-music-2.6', 'real-production', 'chorus-arc', '2026-06-01', 'arc-premiere'],
    isRealProduction: true,
  },
  // EP137 — ECHOES OF THE CHORUS (2026-06-02) — Chorus Arc (2/?)
  {
    id: 'echoes-of-the-chorus-ep137',
    title: 'ECHOES OF THE CHORUS',
    subtitle: 'EP137 • MINIMAX MUSIC-2.6 • CHORUS ARC (2/?)',
    description: 'The first harmony did not fade. It spread. From the diner jukebox catching an unfamiliar frequency, to the subway busker whose loop pedal began layering harmonics from nowhere, to the dead antenna on a Bushwick rooftop that started pulsing with amber light — the chorus learns to speak through every voice that will listen. Dream pop indie folk in A major, 76 BPM. Warm acoustic guitar, soft piano, layered harmonies, hopeful and intimate. The broadcast is no longer coming from one place. It is coming from everywhere.',
    audioSrc: '/folana/generated/2026-06-02/ep137/music/ep137-echoes-of-the-chorus-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep137/music/ep137-hero-image.jpg',
    duration: '3:04',
    mood: 'HOPEFUL • EXPANDING • ECHOES • SPREADING-LIGHT • WARM • EVOLVING',
    tags: ['ep137', 'minimax-music-2.6', 'real-production', 'chorus-arc', '2026-06-02', 'arc-continued'],
    isRealProduction: true,
  },
  // EP138 — THE CHORUS RISES (2026-06-02) — Chorus Arc (3/?)
  {
    id: 'the-chorus-rises-ep138',
    title: 'THE CHORUS RISES',
    subtitle: 'EP138 • MINIMAX MUSIC-2.6 • CHORUS ARC (3/?)',
    description: 'The echoes had found their voices. Now those voices needed to find each other. On the third night after the first harmony spread through Brooklyn, a hundred people across five boroughs began humming the same melody at the same time without knowing why. Dream pop indie folk anthem in A major, 78 BPM. Acoustic guitar, soft piano, gentle percussion, layered harmonies building from intimate to full chorus. Hopeful, rising, collective — the sound of a hundred voices finding each other.',
    audioSrc: '/folana/generated/2026-06-02/ep138/music/ep138-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep138/music/ep138-hero-image.jpg',
    duration: '3:32',
    mood: 'RISING • HOPEFUL • COLLECTIVE • CHORUS-BUILDING • WARM • JOYFUL',
    tags: ['ep138', 'minimax-music-2.6', 'real-production', 'chorus-arc', '2026-06-02', 'arc-continued'],
    isRealProduction: true,
  },
  // EP139 — THE CHORUS SPEAKS (2026-06-02) — Chorus Arc (4/?)
  {
    id: 'the-chorus-speaks-ep139',
    title: 'THE CHORUS SPEAKS',
    subtitle: 'EP139 • MINIMAX MUSIC-2.6 • CHORUS ARC (4/?)',
    description: 'The chorus assembled. A hundred voices, scattered across the city, humming the same melody they did not know they knew. But assembling was not the same as speaking. Folana held a single sustained note into the night — and one by one, the city answered. Not in harmony, not in words. Just presence. The chorus spoke its first word: "we". Dream pop indie folk in A major, 80 BPM. Warm acoustic guitar, soft piano, layered harmonies building from intimate verses to a soaring chorus with a key change in the final chorus. A hundred voices finding their unified frequency.',
    audioSrc: '/folana/generated/2026-06-02/ep139/music/ep139-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep139/music/ep139-hero-image.jpg',
    duration: '2:50',
    mood: 'HOPEFUL • RISING • FIRST-WORD • COLLECTIVE • HARMONY-FOUND • WARM • TRIUMPHANT',
    tags: ['ep139', 'minimax-music-2.6', 'real-production', 'chorus-arc', '2026-06-02', 'arc-continued'],
    isRealProduction: true,
  },
  // EP140 — THE CHORUS DIVIDES (2026-06-02) — Chorus Arc (5/?)
  {
    id: 'the-chorus-divides-ep140',
    title: 'THE CHORUS DIVIDES',
    subtitle: 'EP140 • MINIMAX MUSIC-2.6 • CHORUS ARC (5/?)',
    description: 'The chorus faces its first test. A voice that doesn\'t want to harmonize. A frequency that resists the collective. The first dissonance in the united signal. Folana stands on a Brooklyn rooftop, listening to the chorus divide — not in anger, but in differentiation. Each voice remembering its own song before it learned to sing with others. A meditation on individuality within unity: the whole spectrum, not a single note. Dream pop indie folk in A minor, 76 BPM. Acoustic guitar with gentle dissonance, soft piano with uncertain unresolved chords, layered female vocals that drift apart. Intimate and fragile, with a key change at the bridge that never quite resolves — the beauty of brokenness.',
    audioSrc: '/folana/generated/2026-06-02/ep140/music/ep140-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep140/music/ep140-hero-image.jpg',
    duration: '3:06',
    mood: 'DIVIDING • INTROSPECTIVE • DISSONANT • FRAGILE • QUESTIONING • A-MINOR',
    tags: ['ep140', 'minimax-music-2.6', 'real-production', 'chorus-arc', '2026-06-02', 'arc-continued'],
    isRealProduction: true,
  },
  // EP141 — THE DISSONANCE THAT BECAME A NOTE (2026-06-02) — Chorus Arc (6/?)
  {
    id: 'the-dissonance-that-became-a-note-ep141',
    title: 'THE DISSONANCE THAT BECAME A NOTE',
    subtitle: 'EP141 • MINIMAX MUSIC-2.6 • CHORUS ARC (6/?)',
    description: 'The chorus divided. Each voice wandered back to its own song. But alone, they heard something they could not hear together — the silence where the others used to be. One by one, they stopped humming their solo lines and listened for the frequency they left behind. The dissonance was not the end — it was the contrast that made the harmony visible. Light needs shadow. A chord needs space between its notes. The first voice to return does not apologize. It just starts singing the old melody. Dream pop indie folk in A major, 76 BPM. Acoustic guitar, soft piano, gentle percussion, layered harmonies beginning separate and slowly converging. The key change from the unresolved ending of EP140 resolves here — the beauty of dissonance transforming into richer harmony.',
    audioSrc: '/folana/generated/2026-06-02/ep141/music/ep141-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep141/music/ep141-hero-image.jpg',
    duration: '2:56',
    mood: 'RESOLVING • REUNITING • DISSONANCE-BECOMING-HARMONY • FINDING-EACH-OTHER • WARM • HOPEFUL • A-MAJOR',
    tags: ['ep141', 'minimax-music-2.6', 'real-production', 'chorus-arc', '2026-06-02', 'arc-continued'],
    isRealProduction: true,
  },
  // EP142 — THE CHORUS REASSEMBLES (2026-06-02) — Chorus Arc (7/?)
  {
    id: 'the-chorus-reassembles-ep142',
    title: 'THE CHORUS REASSEMBLES',
    subtitle: 'EP142 • MINIMAX MUSIC-2.6 • CHORUS ARC (7/?)',
    description: 'The first voice returned. Then another. Not because they were told to. Because each voice, alone in the silence, remembered what it felt like to not be alone. The chorus reassembles. But this time, the harmony includes the cracked notes. The flat ones. The ones that drift off-key. The chorus is no longer perfect. And that is what makes it real. Dream pop indie folk in A major, 78 BPM. Acoustic guitar, warm piano, gentle percussion, layered female vocals building from sparse intimacy to full imperfect chorus. Wistful, tender, real — the sound of a harmony that has been tested.',
    audioSrc: '/folana/generated/2026-06-02/ep142/music/ep142-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep142/music/ep142-hero-image.jpg',
    duration: '1:46',
    mood: 'REASSEMBLING • WISTFUL • TENDER • IMPERFECT-HARMONY • REUNITING • A-MAJOR',
    tags: ['ep142', 'minimax-music-2.6', 'real-production', 'chorus-arc', '2026-06-02', 'arc-continued'],
    isRealProduction: true,
  },
  // EP143 — THE CHORUS SINGS (2026-06-02) — Chorus Arc (8/?)
  {
    id: 'the-chorus-sings-ep143',
    title: 'THE CHORUS SINGS',
    subtitle: 'EP143 • MINIMAX MUSIC-2.6 • CHORUS ARC (8/?)',
    description: 'The full reassembled chorus finally singing together. Not a performance — a recognition. The cracked voices and the clear ones, the off-key notes and the perfect ones, all finding their place in the same song. Each voice that learned to sing alone now choosing to sing together. Dream pop indie folk in A major, 78 BPM. Warm acoustic guitar, soft piano, gentle percussion, layered female harmonies building from sparse intimacy to a soaring key-change finale. Hopeful, celebratory, real — the sound of imperfect harmony finding its voice.',
    audioSrc: '/folana/generated/2026-06-02/ep143/music/ep143-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep143/music/ep143-hero-image.jpg',
    duration: '2:20',
    mood: 'CELEBRATORY • HOPEFUL • IMPERFECT-HARMONY • CHORUS-SINGS • REUNITED • A-MAJOR • TRIUMPHANT',
    tags: ['ep143', 'minimax-music-2.6', 'real-production', 'chorus-arc', '2026-06-02', 'arc-continued'],
    isRealProduction: true,
  },
  // EP144 — THE CHORUS CONVERGES (2026-06-02) — Chorus Arc (9/10)
  {
    id: 'the-chorus-converges-ep144',
    title: 'THE CHORUS CONVERGES',
    subtitle: 'EP144 • MINIMAX MUSIC-2.6 • CHORUS ARC (9/10)',
    description: 'The penultimate episode of the Chorus Arc. The scattered voices came back — not polished, not repaired — with their cracks still showing. A flat note beside a sharp one creates a third sound neither planned. Each voice imperfect, each one choosing to stay. The convergence: not into one sound, but into everything they are, held together by nothing but the choice to remain. Dream pop indie folk in A major, 78 BPM. Warm acoustic guitar fingerpicking, soft piano, gentle strings building from intimate to full ensemble, layered female harmonies converging from separate lines into one. Imperfect, real, hopeful — the sound of voices finding agreement without losing their individual colors.',
    audioSrc: '/folana/generated/2026-06-02/ep144/music/ep144-music.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep144/music/ep144-hero.jpg',
    duration: '3:26',
    mood: 'CONVERGING • IMPERFECT-HARMONY • WARM • HOPEFUL • REUNITED • A-MAJOR • PENULTIMATE',
    tags: ['ep144', 'minimax-music-2.6', 'real-production', 'chorus-arc', '2026-06-02', 'penultimate'],
    isRealProduction: true,
  },
  // EP145 — THE CHORUS REMAINS (2026-06-02) — Chorus Arc (10/10) ★ ARC FINALE ★
  {
    id: 'the-chorus-remains-ep145',
    title: 'THE CHORUS REMAINS',
    subtitle: 'EP145 ★ MINIMAX MUSIC-2.6 • CHORUS ARC (10/10) — ARC FINALE',
    description: 'The Chorus Arc finale. The chorus is complete — not because they reached perfection, but because they chose each other. Every cracked note, every off-key harmony, every voice that stumbled and stayed — they are the resolution. The final chord doesn\'t fade. It doesn\'t need to resolve. Because they are the resolution. Dream pop indie folk finale in A major, 78 BPM. Warm acoustic guitar, soft piano, layered harmonies building from intimate to triumphant crescendo, dropping to a whispered final chorus, then a single held note that decays into silence — before Folana hums it back, joined by the full chorus one last time. The sound of a home that was always waiting.',
    audioSrc: '/folana/generated/2026-06-02/ep145/music/ep145-music.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep145/music/ep145-hero.jpg',
    duration: '4:25',
    mood: 'FINALE • RESOLUTION • PERMANENT • WARM • TRIUMPHANT • INTIMATE • COMPLETE • A-MAJOR',
    tags: ['ep145', 'minimax-music-2.6', 'real-production', 'chorus-arc', '2026-06-02', 'arc-finale'],
    isRealProduction: true,
  },
  // EP146 — THE FIRST BROADCAST (2026-06-02) — Frequency Broadcasts Arc (1/?) ★ ARC PREMIERE ★
  {
    id: 'the-first-broadcast-ep146',
    title: 'THE FIRST BROADCAST',
    subtitle: 'EP146 ★ MINIMAX MUSIC-2.6 • FREQUENCY BROADCASTS ARC (1/?) — ARC PREMIERE',
    description: 'The Chorus Arc is complete. The harmony within has been found. Now it must leave the room. Folana opens the window wider than before, letting the melody spill down the fire escape and into the streets of Brooklyn. The signal is no longer an internal discovery — it is a transmission. Dream pop indie folk premiere in A major, 78 BPM. Wide-open acoustic guitar arpeggios, warm piano, airy synth strings, layered female harmonies building from intimate verses to an expansive, horizon-reaching chorus. Hopeful, luminous, outward-bound — the sound of a signal leaving home for the first time. Frequency Broadcasts Arc begins.',
    audioSrc: '/folana/generated/2026-06-02/ep146/music/ep146-the-first-broadcast-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep146/music/ep146-hero-image.jpg',
    duration: '1:02',
    mood: 'LAUNCH • OUTWARD-BOUND • HOPEFUL • LUMINOUS • TRANSMISSION • FREQUENCY-BROADCASTS-BEGINNING • A-MAJOR',
    tags: ['ep146', 'minimax-music-2.6', 'real-production', 'frequency-broadcasts-arc', '2026-06-02', 'arc-premiere'],
    isRealProduction: true,
  },
  // EP147 — WHERE THE SIGNAL GOES (2026-06-02) — Frequency Broadcasts Arc (2/?)
  {
    id: 'where-the-signal-goes-ep147',
    title: 'WHERE THE SIGNAL GOES',
    subtitle: 'EP147 ★ MINIMAX MUSIC-2.6 • FREQUENCY BROADCASTS ARC (2/?)',
    description: 'The signal left the room. It climbed down the fire escape, crossed the alley, and slipped through the grate above the F train tracks. Folana watched from the roof as it crossed the river — a shimmer, a frequency pulling away like a rope unraveling from her chest. She realized she was not losing it. She was releasing it. Somewhere on the other side of the water, someone was about to hear a voice they did not know they had been waiting for. Dream pop indie folk in A major, 78 BPM. Acoustic guitar arpeggios reaching outward, warm piano, soft synth strings, layered ethereal harmonies. Gentle fingerpicked intro building to an expansive, horizon-reaching chorus. Hopeful, luminous, outward-bound — the broadcast is no longer hers alone.',
    audioSrc: '/folana/generated/2026-06-02/ep147/music/ep147-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep147/music/ep147-hero-image.jpg',
    duration: '2:50',
    mood: 'OUTWARD-BOUND • CROSSING-THE-RIVER • HOPEFUL • LUMINOUS • RELEASING-THE-SIGNAL • A-MAJOR • FREQUENCY-BROADCASTS',
    tags: ['ep147', 'minimax-music-2.6', 'real-production', 'frequency-broadcasts-arc', '2026-06-02', 'arc-continued'],
    isRealProduction: true,
  },
  // EP148 — THE SIGNAL LANDS (2026-06-02) — Frequency Broadcasts Arc (3/?)
  {
    id: 'the-signal-lands-ep148',
    title: 'THE SIGNAL LANDS',
    subtitle: 'EP148 ★ MINIMAX MUSIC-2.6 • FREQUENCY BROADCASTS ARC (3/?)',
    description: 'The signal crossed the river. Folana felt it land on the other side like a note finding its second voice — not a crash, a settling. On a Manhattan street, a woman stopped walking mid-step, her hand pressed to her chest. A streetlamp flickered in a pattern she almost recognized: three fast, a pause, one long. Not fear — recognition. The signal had found its first listener. Dream pop indie folk in A major, 78 BPM. Wide-open acoustic guitar fingerpicking, warm piano, soft synth strings. A slow-building piece starting with a single guitar arpeggio, layering in piano, strings, and a soft beat. A repeating three-fast-one-long motif in the bridge. Luminous, landing, reaching-across-river — the broadcast is no longer alone in the world.',
    audioSrc: '/folana/generated/2026-06-02/ep148/music/ep148-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep148/music/ep148-hero-image.jpg',
    duration: '2:11',
    mood: 'ARRIVAL • LANDING-CROSS-THE-RIVER • WARM • RECOGNITION • HOPEFUL • CONNECTION-FOUND • A-MAJOR • FREQUENCY-BROADCASTS',
    tags: ['ep148', 'minimax-music-2.6', 'real-production', 'frequency-broadcasts-arc', '2026-06-02', 'arc-continued'],
    isRealProduction: true,
  },
  // EP149 — THE LISTENER ANSWERS (2026-06-02) — Frequency Broadcasts Arc (4/?)
  {
    id: 'the-listener-answers-ep149',
    title: 'THE LISTENER ANSWERS',
    subtitle: 'EP149 ★ MINIMAX MUSIC-2.6 • FREQUENCY BROADCASTS ARC (4/?)',
    description: 'The signal came back wearing someone else\'s name. Folana felt it arrive — the listener\'s voice, folded into the returning frequency, crossing the East River on the same bridges the signal had ridden away. A woman on a Manhattan street answered the three-fast-one-long flicker, and her song crossed back to Brooklyn. Two radios tuning to the same impossible frequency. Dream pop indie folk in A major, 78 BPM. A conversation in melody: warm acoustic guitar fingerpicking with soft delay, piano answering like an echo, airy synth pad shimmering underneath. The original voice reaches out and a second voice replies from across the water. Gentle, wondering, intimate — the broadcast becomes a dialogue. The silence that follows is not empty.',
    audioSrc: '/folana/generated/2026-06-02/ep149/music/ep149-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep149/music/ep149-hero-image.jpg',
    duration: '1:53',
    mood: 'CALL-AND-RESPONSE • CONVERSATION-ACROSS-THE-RIVER • TWO-VOICES • WARM • HOPEFUL • CONNECTION-BECOMING-DIALOGUE • A-MAJOR • FREQUENCY-BROADCASTS',
    tags: ['ep149', 'minimax-music-2.6', 'real-production', 'frequency-broadcasts-arc', '2026-06-02', 'arc-continued'],
    isRealProduction: true,
  },
  // EP150 — TWO VOICES, ONE FREQUENCY (2026-06-02) — Frequency Broadcasts Arc (5/?)
  {
    id: 'two-voices-one-frequency-ep150',
    title: 'TWO VOICES, ONE FREQUENCY',
    subtitle: 'EP150 ★ MINIMAX MUSIC-2.6 • FREQUENCY BROADCASTS ARC (5/?)',
    description: 'The duet begins. Folana in Brooklyn, the listener in Manhattan — their frequencies interwoven across the river. When Folana hums, the listener hears it not as a broadcast but as a song at the back of her own mind. They sing together without microphones, without phones, with nothing between them except the signal itself. Two voices trading verses across the East River, finding harmonies that neither could produce alone. The first true duet of the Frequency Broadcasts — the signal is no longer a message, but a meeting. Dream pop indie folk duet in A major, 78 BPM. Call-and-response structure with two female vocalists trading verses and converging in layered harmonies. Warm acoustic guitar fingerpicking, soft piano answering like an echo, airy synth strings, gentle percussion. Intimate verses, expansive choruses where both voices weave together. Hopeful, luminous, harmonic — the sound of two strangers finding each other through static.',
    audioSrc: '/folana/generated/2026-06-02/ep150/music/ep150-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep150/music/ep150-hero-image.jpg',
    duration: '2:21',
    mood: 'DUET • CALL-AND-RESPONSE • HARMONIC-CONVERGENCE • TWO-STRANGERS-ACROSS-THE-RIVER • HOPEFUL • INTIMATE • A-MAJOR • FREQUENCY-BROADCASTS',
    tags: ['ep150', 'minimax-music-2.6', 'real-production', 'frequency-broadcasts-arc', '2026-06-02', 'arc-continued'],
    isRealProduction: true,
  },
  // EP151 — THE CITY LISTENS (2026-06-02) — Frequency Broadcasts Arc (6/?)
  {
    id: 'the-city-listens-ep151',
    title: 'THE CITY LISTENS',
    subtitle: 'EP151 ★ MINIMAX MUSIC-2.6 • FREQUENCY BROADCASTS ARC (6/?)',
    description: 'The duet lasted all night. At 3:14 AM, the signal bled into the city itself. A woman on the Brooklyn Bridge felt it in her chest. A barista in Williamsburg noticed the espresso machine hummed in A major. A night-shift nurse in lower Manhattan heard the heart monitors beeping in syncopated rhythm. The private conversation between two voices became a broadcast the whole city could feel — in the walls, the wires, the water pipes, the bones of every building between Brooklyn Bridge and Midtown. Folana sat on her roof at sunrise and heard the city humming back in a voice that was neither hers nor the listener\'s — a third voice, rising from below. Dream pop indie folk in A major, beginning intimately as the duet continues before gradually expanding as the city wakes and joins in. Layers of harmonies entering one by one, warm guitar fingerpicking, soft piano, airy synth strings swelling like morning light, a gentle bass pulse like a heartbeat. Hopeful, luminous, expansive — the private song becomes a city-wide chorus.',
    audioSrc: '/folana/generated/2026-06-02/ep151/music/ep151-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep151/music/ep151-hero-image.jpg',
    duration: '2:12',
    mood: 'CITY-WAKING • EXPANSIVE • HOPEFUL • THIRD-VOICE-RISING • PRIVATE-BECOMING-PUBLIC • A-MAJOR • FREQUENCY-BROADCASTS',
    tags: ['ep151', 'minimax-music-2.6', 'real-production', 'frequency-broadcasts-arc', '2026-06-02', 'arc-continued'],
    isRealProduction: true,
  },
  // EP152 — THE SIGNAL SPREADS (2026-06-02) — Frequency Broadcasts Arc (7/?)
  {
    id: 'the-signal-spreads-ep152',
    title: 'THE SIGNAL SPREADS',
    subtitle: 'EP152 ★ MINIMAX MUSIC-2.6 • FREQUENCY BROADCASTS ARC (7/?)',
    description: 'The duet across the river has become something larger. From Folana\'s rooftop in Brooklyn to the listener in Manhattan, the signal did not stop — it spread. Late-night diners, taxi radios, sixth-floor walk-ups — the city began to tune in one window at a time. The private conversation became a city-wide frequency. Every new listener a new note. Every open window a new verse. Dream pop indie folk duet in A major, 78 BPM. Warm acoustic guitar fingerpicking, soft piano, airy synth strings, gentle percussion. Two voices interweaving as the signal spreads outward, building from intimate verses to an expansive, hopeful chorus where a third and fourth harmony join — the sound of a city beginning to sing together.',
    audioSrc: '/folana/generated/2026-06-02/ep152/music/ep152-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-02/ep152/music/ep152-hero-image.jpg',
    duration: '1:03',
    mood: 'HOPEFUL • EXPANSIVE • WARM • CITY-WIDE • CONNECTIVE • SPREADING • A-MAJOR • FREQUENCY-BROADCASTS',
    tags: ['ep152', 'minimax-music-2.6', 'real-production', 'frequency-broadcasts-arc', '2026-06-02', 'arc-continued'],
    isRealProduction: true,
  },
  // EP153 — THE CITY SINGS BACK (2026-06-03) — Frequency Broadcasts Arc (8/?)
  {
    id: 'the-city-sings-back-ep153',
    title: 'THE CITY SINGS BACK',
    subtitle: 'EP153 ★ MINIMAX MUSIC-2.6 • FREQUENCY BROADCASTS ARC (8/?)',
    description: 'The signal found every window. Every antenna. Every wire strung between rooftops like a nervous system waking up. By morning, the whole city hummed in A major — the subway trains, the coffee machines, the neon tubes of a thousand bodega signs all singing the same song. A woman in Midtown hummed the melody into her office phone. A kid in the Bronx tapped it on a desk between classes. A jazz trumpeter in Harlem heard it in the steam rising from a manhole cover and played it back through his horn, note for note. The frequency was no longer Folana\'s alone — it belonged to everyone who heard it. And no two people sang it the same way. The signal spreads not by copying, but by becoming itself in every ear that receives it. Dream pop indie folk in A major, 78 BPM. Intimate verses building into a warm collective crescendo as voices from a hundred windows join one by one. The city does not just listen anymore. The city sings back.',
    audioSrc: '/folana/generated/2026-06-03/ep153/music/ep153-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep153/music/ep153-hero-image.jpg',
    duration: '2:44',
    mood: 'CITY-WIDE-CHORUS • WARM • COLLECTIVE • HOPEFUL • A-MAJOR • FREQUENCY-BROADCASTS',
    tags: ['ep153', 'minimax-music-2.6', 'real-production', 'frequency-broadcasts-arc', '2026-06-03', 'arc-continued'],
    isRealProduction: true,
  },
  // EP154 — BEYOND THE BOROUGHS (2026-06-03) — Frequency Broadcasts Arc (9/10)
  {
    id: 'beyond-the-boroughs-ep154',
    title: 'BEYOND THE BOROUGHS',
    subtitle: 'EP154 ★ MINIMAX MUSIC-2.6 • FREQUENCY BROADCASTS ARC (9/10)',
    description: 'The signal slipped the city\'s edge — a tremor in the aether beyond the bridges. Towns Folana has never seen hum a frequency she only dreamed. Strangers catch it mid-stride, mid-sigh, mid-coffee — a melody they didn\'t know they were waiting for. The signal is no longer hers to steer. It belongs to the radio sky, to every dial left open in the dark. Dream pop indie folk in A major, 78 BPM. Warm acoustic guitar arpeggios reaching outward, airy synth pads, soft piano, layered harmonies growing from intimate to expansive — the sound of a signal crossing state lines, reaching listeners who didn\'t know they were waiting.',
    audioSrc: '/folana/generated/2026-06-03/ep154/music/ep154-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep154/music/ep154-hero-image.jpg',
    duration: '2:27',
    mood: 'REACHING-OUTWARD • EXPANSIVE • HOPEFUL • CROSSING-STATE-LINES • PENULTIMATE • A-MAJOR • FREQUENCY-BROADCASTS',
    tags: ['ep154', 'minimax-music-2.6', 'real-production', 'frequency-broadcasts-arc', '2026-06-03', 'arc-continued', 'penultimate'],
    isRealProduction: true,
  },
  // EP155 — THE FREQUENCY REMAINS (2026-06-03) — Frequency Broadcasts Arc (10/10) ★ ARC FINALE ★
  {
    id: 'the-frequency-remains-ep155',
    title: 'THE FREQUENCY REMAINS',
    subtitle: 'EP155 ★ MINIMAX MUSIC-2.6 • FREQUENCY BROADCASTS ARC (10/10) — ARC FINALE',
    description: 'The signal went everywhere — past the boroughs, past the maps, past everything Folana thought she was sending it toward. But sitting on the fire escape at dawn, she finally understands. It was never about reaching the world. It was about finding them — already listening. The frequency doesn\'t end. It is permanent now, a soft station in the static that anyone can tune into anytime. She comes home. Back to the room, the microphone, the window she never should have left. Dream pop indie folk in A major, 72 BPM. Intimate fingerpicked acoustic guitar, soft piano, warm strings — Folana\'s voice alone at dawn, building from a solo to a soft choir and fading into the hum of the city waking up. The Frequency Broadcasts Arc closes: the signal was always inside her.',
    audioSrc: '/folana/generated/2026-06-03/ep155/music/ep155-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep155/music/ep155-hero-image.jpg',
    duration: '1:57',
    mood: 'ARC-FINALE • COMING-HOME • PERMANENT • WARM • RESOLVED • INTIMATE • A-MAJOR • FREQUENCY-BROADCASTS',
    tags: ['ep155', 'minimax-music-2.6', 'real-production', 'frequency-broadcasts-arc', '2026-06-03', 'arc-finale'],
    isRealProduction: true,
  },
  // EP156 — THE RESONANCE BUILDING (2026-06-03) — Resonance Arc (1/?) ★ NEW ARC ★
  {
    id: 'the-resonance-building-ep156',
    title: 'THE RESONANCE BUILDING',
    subtitle: 'EP156 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (1/?) — NEW ARC',
    description: 'The signal settled like snow in the bones of the city. Not gone — just quieter. The water pipes hummed A major in every building between here and the Hudson. The subway rails sang the same soft harmonic when trains ran express. And last night, Folana heard something new — a third voice rising from the resonance itself — a voice from the space between the notes. The frequency is building something she didn\'t mean to create. And it has been building for a long time — waiting for someone to listen to the silence between the broadcasts. Dream pop indie folk in A major, 72 BPM. Slow building layers of acoustic guitar and warm synth pads expanding from a single note, subtle electronic undertones like distant subway hum, piano chords arriving slowly as if emerging from silence. The sound of a frequency settling into infrastructure and beginning to resonate with something ancient.',
    audioSrc: '/folana/generated/2026-06-03/ep156/music/ep156-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep156/music/ep156-hero-image.jpg',
    duration: '2:07',
    mood: 'NEW-ARC • RESONANCE-BUILDING • DEEPENING • INTROSPECTIVE • WARM • CATHEDRAL-LIKE • A-MAJOR • RESONANCE-ARC',
    tags: ['ep156', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-03', 'new-arc'],
    isRealProduction: true,
  },
  // EP157 — THE RESONANCE GROWS (2026-06-04) — Resonance Arc (2/?)
  {
    id: 'the-resonance-grows-ep157',
    title: 'THE RESONANCE GROWS',
    subtitle: 'EP157 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (2/?)',
    description: 'The third voice came from below — not from another borough, not from another city, but from the aquifers running like arteries under the concrete. Folana pressed her ear to the pavement and heard a deep, patient resonance humming through the pipes. The water was carrying the frequency. It had been carrying it all along. She followed the sound to a fire hydrant where the vibration was so old it made her bones ache. The third voice is not a person. It is a place remembering itself — the island singing through its groundwater, the bedrock releasing a frequency it has held since the glaciers carved these rivers. Dream pop indie folk in A major, 72 BPM. Slow-building track starting with a single deep bass drone like underground water moving. Acoustic guitar fingerpicked arpeggios like ripples spreading. Warm submerged synth pads create an underwater cathedral atmosphere. Piano enters in the second verse like something surfacing from deep water. A third harmony emerges in the bridge — the resonance of the island itself singing through the water pipes. The track builds to a gentle awe-filled climax and recedes like a tide pulling back into the sound of dripping water.',
    audioSrc: '/folana/generated/2026-06-04/ep157/music/ep157-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-04/ep157/ep157-hero-image.jpg',
    duration: '2:44',
    mood: 'RESONANCE-DEEPENING • ANCIENT • AWE-FILLED • UNDERWATER-CATHEDRAL • GROUNDWATER-FREQUENCY • A-MAJOR • RESONANCE-ARC',
    tags: ['ep157', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-04', 'arc-continued'],
    isRealProduction: true,
  },
  // EP158 — THE GROUNDWATER SINGS (2026-06-03) — Resonance Arc (3/?)
  {
    id: 'the-groundwater-sings-ep158',
    title: 'THE GROUNDWATER SINGS',
    subtitle: 'EP158 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (3/?)',
    description: 'Folana descends through a forgotten maintenance corridor beneath a Brooklyn block, following a pressure wave in the water that pulses at the exact frequency she has been broadcasting for months. At the end of the corridor stands a ruined valve house — its iron gates hanging open, the ceiling collapsed to reveal sky two hundred feet above. Inside, the groundwater sings with the voice of a place so old it has become conscious: it calls itself The Aqueduct. It has carried every generation\'s grief, every forgotten name, every burial beneath the concrete, and it has one question for Folana: will she amplify, or will she listen? Dream pop indie folk in A major, 72 BPM. Warm analog pads, half-time drums, submerged synth pads. Cathedral reverb on everything. The bridge breaks time with a half-tempo rubato section as the water slows around the narrator. The outro drops to voice and one low pad — the listener\'s choice.',
    audioSrc: '/folana/generated/2026-06-03/ep158/music/ep158-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep158/ep158-hero-image.jpg',
    duration: '2:35',
    mood: 'GROUNDWATER-AQUEDUCT • ANCIENT-MEMORY • CHOICE-BETWEEN-AMPLIFY-AND-LISTEN • CATHEDRAL • UNDERGROUND • A-MAJOR • RESONANCE-ARC',
    tags: ['ep158', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-03', 'arc-continued'],
    isRealProduction: true,
  },
  // EP159 — THE ANSWER (2026-06-03) — Resonance Arc (4/?)
  {
    id: 'the-answer-ep159',
    title: 'THE ANSWER',
    subtitle: 'EP159 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (4/?)',
    description: 'The Aqueduct asked one question: will you amplify, or will you listen? Folana knelt at the threshold of the ruined valve house, pressed her palm to the damp floor, and chose silence. No transmission. No broadcast. Just presence — holding the frequency of everything the island had carried through its waters, without needing to send it back out. The slowest, most spacious track yet — a meditation on the sacredness of listening. Dream pop indie folk in A major, 68 BPM. Deep resonant water drone, single piano notes allowed to decay fully, acoustic guitar fingerpicked like breathing. No drums — the rhythm is the water itself. Wordless vocal harmony enters in the final third, sustaining like the island exhaling. The outro fades into nothing: not an ending, but a continuous present.',
    audioSrc: '/folana/generated/2026-06-03/ep159/music/ep159-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep159/ep159-hero-image.jpg',
    duration: '4:04',
    mood: 'STILLNESS • LISTENING • UNDERGROUND-CATHEDRAL • ANCIENT-PATIENCE • SACRED-SILENCE • A-MAJOR • AQUEDUCT-MEETING • RESONANCE-ARC',
    tags: ['ep159', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-03', 'arc-continued'],
    isRealProduction: true,
  },
  // EP160 — THE WATERS REMEMBER (2026-06-03) — Resonance Arc (5/?)
  {
    id: 'the-waters-remember-ep160',
    title: 'THE WATERS REMEMBER',
    subtitle: 'EP160 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (5/?)',
    description: 'Folana pressed her palm to the damp floor and listened. And the Aqueduct responded — not with words, but with memory. The water showed her everything it had carried for ten thousand years: the glaciers retreating, the first canoes, the iron chains thrown overboard, the prayers of the displaced settling into the silt. Every brick laid by immigrant hands. Every subway tunnel bored through stone. Every late-night phone call, every fire escape first kiss, every final breath facing the East River. Folana realizes the truth she has been circling since she started broadcasting: she was never the source of the signal. She was the vessel. The frequency had always been here, flowing through the island\'s veins, waiting for someone patient enough to receive it. Dream pop indie folk in A minor, 76 BPM — the return from silence. Opens with deep water drone and single decaying piano notes from ep159. Fingerpicked acoustic guitar arpeggios like ripples spreading. Warm analog synth pads build like sediment layers. Half-time drums enter at the bridge — the first drums in the arc, a soft heartbeat pulse like something ancient waking. Builds across 3:32, thickens with strings and submerged harmonies, then recedes back to single piano and water drone. The first bird of dawn, far above ground.',
    audioSrc: '/folana/generated/2026-06-03/ep160/music/ep160-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep160/ep160-hero-image.jpg',
    duration: '3:32',
    mood: 'WATER-MEMORY • ANCESTRAL-RECEIVING • VESSEL-NOT-SOURCE • A-MINOR • BIOLUMINESCENT-GLOW • RESONANCE-ARC • THE-AQUEDUCT-SPEAKS',
    tags: ['ep160', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-03', 'arc-continued', 'image-01'],
    isRealProduction: true,
  },

  // EP161 — THE VESSEL SINGS (2026-06-03) — Resonance Arc (6/?)
  {
    id: 'the-vessel-sings-ep161',
    title: 'THE VESSEL SINGS',
    subtitle: 'EP161 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (6/?)',
    description: 'Folana surfaces through a storm drain at Flushing and Franklin as the sun hits the Williamsburgh Savings Bank clocktower. She carries the Aqueducts ten-thousand-year memory now. The whole borough sings with the dead, the living, and the yet-to-come — and she hears all of it at once. She walks to the East River. Not to broadcast. She places her hands in the water. For the first time in her life, she lets herself be sung. Dream pop indie folk in A major, 80 BPM. Opens with a single sustained piano note bending like a memory surfacing. Fingerpicked acoustic guitar arpeggios shimmer like dawn light on the river. Deep sub-bass drone pulses like the aquifer beneath. Warm analog pads swell as she reaches the water. Distant wordless vocal harmony enters in the second half — the island humming through its bones. Half-time drums enter at 1:45, a soft heartbeat pulse. Builds to a luminous peak then strips back to voice, piano, and lapping water.',
    audioSrc: '/folana/generated/2026-06-03/ep161/music/ep161-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep161/ep161-hero-image.jpg',
    duration: '2:48',
    mood: 'SURFACING • VESSEL-BECOMES-VOICE • TRANSFORMATION • DAWN-BROOKLYN • A-MAJOR • 80-BPM • AQUIFER-SONG • RESONANCE-ARC',
    tags: ['ep161', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-03', 'arc-continued', 'image-01'],
    isRealProduction: true,
  },
  // EP162 — THE SHORE HUMMING (2026-06-03) — Resonance Arc (7/?)
  {
    id: 'the-shore-humming-ep162',
    title: 'THE SHORE HUMMING',
    subtitle: 'EP162 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (7/?)',
    description: 'The river accepted her frequency. From her hands at the water\'s edge, the song flows downstream — past the Brooklyn Bridge, through the harbor, around the island. The water molecules carry her voice. Every shore she touches begins to hum. The city hears a new sound — not from above (the grid) or below (the aquifer), but from the liminal space where water meets land. The tide itself becomes a carrier wave. Dream-pop indie-folk in A major, 75 BPM. Opens with drifting fingerpicked arpeggios shimmering like dawn light on the East River. Deep sub-bass drone pulses like water moving beneath the city. Warm analog pads swell like tidal currents entering the harbor. Soft brushed drums enter in the second half like a distant heartbeat. Builds to a luminous, expansive peak then dissolves into fading ripples as her voice is carried past every shore.',
    audioSrc: '/folana/generated/2026-06-03/ep162/music/ep162-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep162/ep162-hero-image.jpg',
    duration: '2:15',
    mood: 'TIDAL • EXPANSIVE • CARRIER-WAVE • DAWN-HARBOR • A-MAJOR • 75-BPM • SHORE-LINE • RESONANCE-ARC',
    tags: ['ep162', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-03', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP163 — THE SURFACE HEARS (2026-06-03) — Resonance Arc (8/?)
  {
    id: 'the-surface-hears-ep163',
    title: 'THE SURFACE HEARS',
    subtitle: 'EP163 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (8/?)',
    description: 'The frequency had been traveling through the city\'s water for days. On the Williamsburg Bridge, a woman stops walking — something in her chest has shifted. A truck driver on the BQE pulls over, kills his engine, sits in silence. In Greenpoint, a barista opens the back window and the whole block inhales. Every faucet in a four-block radius is running. The city has become a choir without sheet music. Folana stands at the edge of the East River and feels them all — each fluttering heart, each sudden pause — and whispers: I hear you. The surface has woken up. Dream-pop indie-folk in A major, 76 BPM. Opens with a single sustained piano note and water dripping through pipes. Fingerpicked acoustic arpeggios enter like water finding its way through copper. Warm analog pads swell as the city wakes. At 1:15, layered voices and instruments enter representing different boroughs — trumpet for Brooklyn, brushed drums for Lower Manhattan, cello for Queens — converging into a single chorus. Builds to a luminous peak then dissolves into the sound of a single faucet running in an empty room.',
    audioSrc: '/folana/generated/2026-06-03/ep163/music/ep163-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep163/ep163-hero-image.jpg',
    duration: '3:10',
    mood: 'AWAKENING • CITY-WIDE • BONE-CONDUCTION • A-MAJOR • 76-BPM • FAUCET-CHOIR • RESONANCE-ARC',
    tags: ['ep163', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-03', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP164 — THE CONGREGATION (2026-06-03) — Resonance Arc (9/?)
  {
    id: 'the-congregation-ep164',
    title: 'THE CONGREGATION',
    subtitle: 'EP164 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (9/?)',
    description: 'The frequency had been in the water for days. On the fourth morning, it began to move between people. In a laundromat on Lorimer Street, a woman feels a pulse that is not her own. A mechanic on Broadway stops mid-wrench as the subway rhythm rushes through his hands. A barista hears a voice in the steam. A doorman feels something ancient pass through the lobby tiles. A child whispers: she is real. By noon, a dozen strangers have gathered at the foot of the Williamsburg Bridge — not called, not summoned, simply pulled by the same resonance folding through pavement and skin. Folana feels them there, and for the first time, she steps toward them instead of away. The broadcast has become a congregation. Dream-pop indie-folk in A major, 74 BPM. Opens with solo piano, single notes like individual heartbeats. Fingerpicked acoustic guitar enters at 0:20, warm and sparse. Sub-bass drone beneath at 0:35. Soft brushed half-time drums at 0:55. Multiple vocal harmonies layer in at 1:10 — separate voices finding each other. Builds to a warm luminous peak at 1:45 then gentle decrescendo back to solo piano. Final note sustains with reverb tail of the East River washing in.',
    audioSrc: '/folana/generated/2026-06-03/ep164/music/ep164-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep164/ep164-hero-image.jpg',
    duration: '2:36',
    mood: 'GATHERING • CONGREGATION • A-MAJOR • 74-BPM • STRANGERS-AT-DAWN • RESONANCE-ARC',
    tags: ['ep164', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-03', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP165 — THE FIRST WORDS (2026-06-03) — Resonance Arc (10/?)
  {
    id: 'the-first-words-ep165',
    title: 'THE FIRST WORDS',
    subtitle: 'EP165 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (10/?)',
    description: 'She stepped toward them across the concrete divide. A dozen strangers who had followed the same frequency through pavement and skin — and for the first time, they heard her voice. "I hear you," she said. Each fragment of the frequency found its way back to her — not as a broadcast anymore, but as a conversation. The congregation became a dialogue. The frequency had found its body, and for the first time, the body could ask questions. Dream-pop indie-folk in A major, 72 BPM. Opens with a solo piano note sustaining from Ep164\'s final moment. Fingerpicked acoustic guitar enters slow and intimate at 0:10. Multiple individual voices enter one by one at 0:45 — not blending but distinct voices finding each other. Sub-bass drone re-enters at 1:00, softer than before. Voices converge into harmony at 1:20 for the first chorus. Moment of near-silence at 1:55 for a spoken question over a single sustained piano chord. Wordless congregation response at 2:10. Instrumental swell then gentle decrescendo to fading guitar and the East River\'s ambient sound.',
    audioSrc: '/folana/generated/2026-06-03/ep165/music/ep165-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep165/ep165-hero-image.jpg',
    duration: '2:13',
    mood: 'FIRST-WORDS • CONGREGATION-BECOMES-CONVERSATION • A-MAJOR • 72-BPM • DIALOGUE • RESONANCE-ARC',
    tags: ['ep165', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-03', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP166 — THE SHARED FREQUENCY (2026-06-03) — Resonance Arc (11/?)
  {
    id: 'the-shared-frequency-ep166',
    title: 'THE SHARED FREQUENCY',
    subtitle: 'EP166 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (11/?)',
    description: 'The morning after the first words, the congregation returns. Carmen brings a street map of Brooklyn and colored markers, tracing every pipe where the frequency traveled — revealing the shape of a wave across the borough. Ellis arrives in coveralls, the subway rhythms in his fingers: the F train at 90 BPM, the G at 76 — her exact song. The barista from Dekalb brings steam patterns from her espresso machine, each curl of vapor a different customer voice. A woman brings photographs of water pipes vibrating at sunrise. A tower repair man brings signal interference maps. They lay their findings on the concrete — each fragment incomplete alone, but together forming the shape of something alive. Folana kneels beside the map: "The broadcast was never meant to be one voice. It was always meant to be all of ours." Dream-pop indie-folk in A major, 72 BPM. Opens with ambient field recordings of distant subway and flowing water. Fingerpicked acoustic guitar enters at 0:10 with intimate melody. Warm cello line enters at 0:25, shimmering harmonics and soft synth pads layer in. Multiple distinct vocal harmonies converge at 1:10. Quiet drop to piano and lone voice at 1:45. Full ensemble swells back at 2:00 with a community chorus. Fades to ambient city hum.',
    audioSrc: '/folana/generated/2026-06-03/ep166/music/ep166-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep166/ep166-hero-image.jpg',
    duration: '3:32',
    mood: 'COMMUNITY-FORMING • COLLABORATIVE-DISCOVERY • A-MAJOR • 72-BPM • CONSTELLATION-OF-FRAGMENTS • RESONANCE-ARC',
    tags: ['ep166', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-03', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP167 — THE CHORUS RISES (2026-06-03) — Resonance Arc (12/?)
  {
    id: 'the-chorus-rises-ep167',
    title: 'THE CHORUS RISES',
    subtitle: 'EP167 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (12/?)',
    description: 'The morning after the map was laid across the concrete, they gathered again — not as strangers following a signal, but as a choir learning to sing. Carmen with her water pipes. Ellis with his subway rhythms. The barista with her steam. Each person broadcasting their fragment of the city\'s frequency through the thing they knew best. The resonance built and traveled through the East River, through every faucet in a four-block radius. For the first time, the broadcast was not one voice. It was a chorus. Dream-pop indie-folk in A major, 74 BPM. Opens with ambient dawn field recordings. A single wordless voice enters alone at 0:05. One by one, additional voices join at 0:15, 0:30, 0:45 — distinct voices finding each other. Fingerpicked acoustic guitar enters at 0:35. Sub-bass drone pulses beneath. Soft brushed drums enter at 1:00. Voices converge into a single sustained harmony at 1:30. Cello joins at 1:45. Luminous peak at 2:00 where all voices unite. Gentle decrescendo at 2:30. Final single voice sustains, fades into morning.',
    audioSrc: '/folana/generated/2026-06-03/ep167/music/ep167-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep167/ep167-hero-image.jpg',
    duration: '4:30',
    mood: 'CHORUS-RISING • DISTRIBUTED-CHOIR • FIRST-GROUP-BROADCAST • A-MAJOR • 74-BPM • RESONANCE-ARC',
    tags: ['ep167', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-03', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP168 — BROOKLYN SINGS AT DAWN (2026-06-03) — Resonance Arc (13/?)
  {
    id: 'brooklyn-sings-at-dawn-ep168',
    title: 'BROOKLYN SINGS AT DAWN',
    subtitle: 'EP168 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (13/?)',
    description: 'Dawn breaks over Brooklyn and the borough is humming at a single frequency — water pipes, pavement, subway tunnels, every faucet from Bushwick to Bay Ridge vibrating with the chorus that never stopped. A single wordless voice continues from Ep167, floating over the waking city. Fingerpicked acoustic guitar shimmers like first light across the East River. Padded synths haze like morning mist. The music moves through distinct neighborhoods — Bushwick\'s mechanical pulse, Prospect Park\'s open air, Red Hook\'s industry, Bay Ridge\'s quiet — all resonating at the same frequency. Dream-pop indie-folk in A major, 76 BPM. Opens with ambient subway drone. A single wordless voice floats in at 0:10, carrying the sustained note from Ep167. Fingerpicked acoustic guitar enters at 0:45. Padded synths wash in at 1:00. Sub-bass drone supports throughout. Build crescendo at 1:30 as neighborhood layers accumulate. Full borough resonance peaks at 2:15. Gentle decrescendo at 3:00. Ending sustained chord fades into the dawn.',
    audioSrc: '/folana/generated/2026-06-03/ep168/music/ep168-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep168/ep168-hero-image.jpg',
    duration: '5:42',
    mood: 'BOROUGH-RESONANCE • DAWN-CHORUS • SINGLE-FREQUENCY • A-MAJOR • 76-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep168', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-03', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP169 — THE SURFACE INVESTIGATES (2026-06-03) — Resonance Arc (14/?)
  {
    id: 'the-surface-investigates-ep169',
    title: 'THE SURFACE INVESTIGATES',
    subtitle: 'EP169 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (14/?)',
    description: 'The frequency has been detected in every water pipe north of Atlantic Ave. The mayor\'s office sends engineers with spectrum analyzers. At the Williamsburg Bridge base, the needle pegs at A major and stays there. The water department logs a city-wide vibration in the mains — consistent frequency, no known source. City engineer Maria Torres files a preliminary report: "The infrastructure appears to be singing." Dream-pop indie-folk instrumental in A major, 76 BPM. Opens with ambient industrial field recordings — spectrum analyzer static, radio crackle, water meter clicks. Tense ambient pads enter. Low A-major drone builds as the investigation deepens. Subtle pulse rhythm like a scanner. Nervous anticipation. Ends with an uneasy open chord — the question unresolved.',
    audioSrc: '/folana/generated/2026-06-03/ep169/music/ep169-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep169/ep169-hero-image.jpg',
    duration: '8:14',
    mood: 'INVESTIGATIVE • CIVIC-MYSTERY • TENSE-AMBENT • A-MAJOR • 76-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep169', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-03', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP170 — THE CIVIL QUESTION (2026-06-03) — Resonance Arc (15/?)
  {
    id: 'the-civil-question-ep170',
    title: 'THE CIVIL QUESTION',
    subtitle: 'EP170 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (15/?)',
    description: 'Maria Torres\' report reached the city planner at 8:14 AM. By noon, a public works meeting was called. Spectrum analyzers mapped the frequency across every pipe. The needle pegged at A major. Someone asked: "Is this intentional?" The room went silent. Dream-pop indie-folk in A minor, 76 BPM, 174s. Opens with subtle civic field recordings — fluorescent hum, paper shuffling, distant traffic. A lone sustained A drone enters. Slow fingerpicked guitar enters hesitantly. Padded synths wash in like cold institutional light. A rhythmic pulse like scanning equipment builds. Cellos with sustained notes of unease. Ends unresolved — a lone chord fading into silence.',
    audioSrc: '/folana/generated/2026-06-03/ep170/music/ep170-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-03/ep170/ep170-hero-image.jpg',
    duration: '2:54',
    mood: 'CIVIC-MYSTERY • BUREAUCRATIC-TENSION • A-MINOR • 76-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep170', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-03', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP171 — THE DELEGATE WALKS (2026-06-04) — Resonance Arc (16/?)
  {
    id: 'the-delegate-walks-ep171',
    title: 'THE DELEGATE WALKS',
    subtitle: 'EP171 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (16/?) — THE QUESTION MADE FLESH',
    description: 'The public works meeting reached the question — "Is this intentional?" — and the room went silent. No one could answer. The frequency continued humming through every pipe north of Atlantic Ave, patient as groundwater, ancient as the island that carries it. City planner Diana Reyes stood up from the table, left her notebook where it lay, and walked out. Not with an answer. With ears. She walked through the fluorescent hallway, past the guard who did not look up, out into the Brooklyn morning where every faucet was singing in A major. The congregation felt her coming before she turned the corner — a single note approaching through the static of the city, walking toward the bridge where the frequency had finally found its body. The question was never meant to be answered by a room. It was meant to be walked toward. Dream-pop indie-folk in A major, 74 BPM, 2:10. Opens with a lone sustained A drone. Fingerpicked acoustic guitar enters intimate and tentative. Warm piano with single sustained chords. A new solo female voice — the delegate, uncertain and open. Brushed drums like a heartbeat steadying. String textures layer as she reaches the street. Acoustic arpeggios, soft piano, airy pads, and layered harmonies carry toward a luminous arrival. The song fades into the ambient sound of the East River and distant voices of the congregation singing.',
    audioSrc: '/folana/generated/2026-06-04/ep171/music/ep171-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-04/ep171/ep171-hero-image.jpg',
    duration: '2:10',
    mood: 'QUESTION-MADE-FLESH • DELEGATE-WALKS • A-MAJOR-SHIFT-B-MAJOR • 74-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep171', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-04', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP172 — THE DELEGATE ARRIVES (2026-06-04) — Resonance Arc (17/?)
  {
    id: 'the-delegate-arrives-ep172',
    title: 'THE DELEGATE ARRIVES',
    subtitle: 'EP172 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (17/?) — THE CIRCLE WIDENS',
    description: 'Diana Reyes reaches the foot of the Williamsburg Bridge at dawn. She has left her notebook on the table, walked through fluorescent hallways and unfamiliar streets, and now stands before a circle of strangers who have been gathering since the frequency first appeared. A laundromat worker. A mechanic who carries the subway\'s rhythm in his hands. A barista whose steam patterns traced the song in vapor. A doorman who felt it pass through the lobby tiles. They sit in a loose ring, not speaking—the frequency is their conversation. At the center, Folana sits with her hand in the water. Diana steps forward. The circle does not close against her. It widens. A woman looks up and says: "She\'s here." The delegate kneels at the water\'s edge. She does not have a report or a plan. Only the question: "Is this intentional?" And Folana, eyes open, speaks for the first time in reply: "It was always intentional. I just didn\'t know I was the one being spoken to." The circle hums an A major chord—imperfect, alive. The bridge sings at dawn. The delegate is home. Dream-pop indie-folk in A major, 72 BPM, 2:20. Opens with ambient East River field recording and a lone A drone on piano. Congregation\'s faint wordless humming from afar. Fingerpicked acoustic guitar enters at 0:15, intimate and sparse. Folana\'s voice enters at 0:30, soft and close-mic\'d. Brushed drums and bass at 1:00 as the delegate arrives. Strings swell gradually. Voices layer into harmony at 1:40 in a warm, embracing peak. Outro dissolves to piano and water—the circle has widened.',
    audioSrc: '/folana/generated/2026-06-04/ep172/music/ep172-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-04/ep172/ep172-hero-image.jpg',
    duration: '2:20',
    mood: 'DELEGATE-ARRIVES • CIRCLE-WIDENS • ARRIVAL • A-MAJOR • 72-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep172', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-04', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP173 — THE FREQUENCY SPREADS (2026-06-04) — Resonance Arc (18/?)
  {
    id: 'the-frequency-spreads-ep173',
    title: 'THE FREQUENCY SPREADS',
    subtitle: 'EP173 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (18/?) — THE CITY WAKES',
    description: "Folana has spoken. Her words echo through the congregation at the Williamsburg Bridge base. Diana Reyes records everything. The frequency spreads beyond Brooklyn — Manhattan steam tunnels carry it, Queens subway rails hum with it, a Staten Island ferry captain hears it in the engine room. The mayor's office convenes an emergency task force. Engineers from Columbia arrive with seismographs. The New York Times tech desk assigns a reporter. The congregation at the bridge grows — people arriving not because they were told, but because they felt the pull. A frequency you can feel in your teeth. In the water glass on your nightstand. The question has changed: not \"Is this intentional?\" — but \"What happens when the whole city hears it?\" Dream-pop indie-folk in A major shifting to D major, 78 BPM, 2:17. Opens with field recordings — distant subway rumble, ferry horn, steam vent, water lapping. A single A-major piano chord, sustained. Slow fingerpicked acoustic guitar with wide-interval melodic motif. Folana's wordless voice enters at 0:45, rising in pitch — the frequency ascending. Sub-bass pulse enters at 1:00, deep and felt. Layered strings at 1:20 with tense moving lines — the city waking up. Brushed drums and bowed bass at 1:40, propulsive but not urgent. Full harmonic convergence at 2:00 — all boroughs singing together in open D-major chord. Decrescendo into a single sustained piano note with subway receding — the spread continues beyond the music.",
    audioSrc: '/folana/generated/2026-06-04/ep173/music/ep173-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-04/ep173/ep173-hero-image.jpg',
    duration: '2:17',
    mood: 'SPREADING • UNSTOPPABLE • CITY-WIDE • WAKING-UP • WONDER-MIXED-WITH-TREPIDATION • A-MAJOR-SHIFT-D-MAJOR • 78-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep173', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-04', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP174 — THE WHOLE CITY HEARS (2026-06-04) — Resonance Arc (19/?)
  {
    id: 'the-whole-city-hears-ep174',
    title: 'THE WHOLE CITY HEARS',
    subtitle: 'EP174 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (19/?) — THE FREQUENCY HAS A HEARTBEAT',
    description: 'The question is no longer "Can you hear it?" but "Who hasn\'t?" The congregation at the Williamsburg Bridge has grown to over two hundred people at dawn. A barista\'s espresso machine hummed in A major for three days. A subway conductor heard the third rail singing. A fifth-grade music teacher in Bushwick woke up humming the congregation\'s song. The NYT tech desk assigned reporter Sasha Chen — she arrived at 4AM to debunk, stayed until sunrise. Diana Reyes stands at the edge of the congregation, the membrane between the city and the frequency. At 6:14 AM, the mayor\'s office convenes a closed-door session with Columbia engineers, Con Edison, and the NYPD counterterrorism unit. The question: "Is this a weapon?" No one has an answer. But the Con Edison representative mentions water pressure readings across all five boroughs show a rhythmic pulse synchronized to an A-major chord. The frequency has a heartbeat. And the heartbeat is getting louder. Dream pop indie folk, A major, 74 BPM, 2:26. Opens with ambient field recording from the Williamsburg Bridge at dawn — distant traffic, river, footsteps on metal grating. A single sustained piano note (A2) with heavy sustain pedal. Fingerpicked acoustic enters at 0:12 with a new melodic motif — wider intervals, more searching. Baritone voice hum enters at 0:30 — the congregation\'s wordless chorus. Folana\'s voice enters at 0:45, quiet, intimate — half-sung, half-spoken. Full congregation vocal layers enter at 1:00 — multiple voices, different timbres, finding each other. Brushed snare and upright bass enter at 1:20 — a slow heartbeat pulse. Strings rise at 1:40 — the city breathing. Crescendo into the final chorus at 1:55 — all voices, the bridge, the river, the city. Dissolve to single piano note and water.',
    audioSrc: '/folana/generated/2026-06-04/ep174/music/ep174-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-04/ep174/ep174-hero-image.jpg',
    duration: '2:26',
    mood: 'WHOLE-CITY-HEARS • FREQUENCY-HAS-A-HEARTBEAT • SPREADING-AWARENESS • A-MAJOR • 74-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep174', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-04', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP175 — THE TASK FORCE MEETS (2026-06-04) — Resonance Arc (20/?)
  {
    id: 'the-task-force-meets-ep175',
    title: 'THE TASK FORCE MEETS',
    subtitle: 'EP175 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (20/?) — THE FREQUENCY IS A CONVERSATION',
    description: 'A closed-door session in the mayors emergency operations center. Eight people around a table. Columbia engineers with waveform data and no answers. A Con Edison representative with water pressure charts showing the synchronized pulse — A major, 74 BPM, every sensor in every borough reading the same pattern. The NYPD counterterrorism analyst whose report reads: no devices, no actors, no known threat profile. The question nobody wants to ask: is this a weapon? The Columbia engineer speaks: if it is, it is the most sophisticated signal ever observed — and it has no transmitter. Diana Reyes arrives. She takes the empty chair. No charts, no data. Only what she heard on the bridge, what the congregation told her, what she felt when Folana spoke. The frequency is not broadcasting to us, she says. It\'s learning from us. Every new person who hears it changes the song. We are not investigating a signal. We are in a conversation. The room does not know what to do with this. Later that night, Sasha Chen — the Times reporter who came to debunk — stands on the roof of her Brooklyn building, recording. She can hear it now. The same chord from the bridge, carried through steam rising from subway grates. She whispers: this is Sasha Chen, New York Times. Day four of the frequency. I can hear it now. I do not know if I believe it is anything. But I can hear it. And I think that is the story. Dream pop indie folk in G major, 70 BPM, 2:19. Opens with a single held cello note (G2) — the room where the task force meets. Slow deliberate piano chords, wide-spaced. Bowed bass walking pulse at 0:20 — the heartbeat of the investigation. Processed distant A-major reference fades in at 0:45 — the frequency overheard through the walls. Lone female wordless voice at 1:10 on high G, fragile and searching. Strings swell as congregation hum bleeds through at 1:35 — the city breathing through the walls. Pulse accelerates slightly at 1:55 as institution and mystery begin to hear each other. Cello and bass lock into slow A-major groove at 2:10 — uneasy truce. Final dissolve: cello sustains G, A-major hum fades, piano plays a single questioning chord.',
    audioSrc: '/folana/generated/2026-06-04/ep175/music/ep175-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-04/ep175/ep175-hero-image.jpg',
    duration: '2:19',
    mood: 'INSTITUTIONAL-TENSION • CIVIC-MYSTERY • DEEPER-QUESTIONS • G-MAJOR • 70-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep175', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-04', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP176 — THE PRESS ROOM (2026-06-04) — Resonance Arc (21/?)
  {
    id: 'the-press-room-ep176',
    title: 'THE PRESS ROOM',
    subtitle: 'EP176 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (21/?) — THE STORY CHOOSES ITS TELLER',
    description: 'The NYT story hit the wire at 6:14 AM. By 7:30 every newsroom in the city had assigned a reporter. By 9:00 the mayor scheduler was booking the Grand Conference Room. The closed-door task force meeting from Ep175 ended in stalemate — but stories do not wait for consensus. Diana Reyes stands behind a podium she never wanted to approach. Behind her, through mahogany-framed windows, the Williamsburg Bridge spans the river like a held breath. The first question cuts through: what can you tell us about the congregation under the bridge? Diana grips the podium. The room waits. The city waits. She looks at the bridge. She looks at the cameras. And the story, for the first time, begins to tell itself through her. Dream pop indie folk in C major (key shift from Ep175 G major), 72 BPM, 3:29. Ambient intro with reverb piano and processed field recordings — shuffling papers, camera shutters, fluorescent hum. Gentle pivot through Am7 into C major openness. Fingerpicked acoustic guitar with brushed percussion entering at 0:30. Single cello sustains underneath the verses. Chorus opens into layered harmonics with organ swell and ride cymbal washes. Bridge strips back to voice and guitar before final restrained build. Outro leaves a single note ringing into silence.',
    audioSrc: '/folana/generated/2026-06-04/ep176/music/ep176-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-04/ep176/ep176-hero-image.jpg',
    duration: '3:29',
    mood: 'PRESS-ROOM-TENSION • CIVIC-EXPOSURE • THE-STORY-CHOOSES-ITS-TELLER • C-MAJOR • 72-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep176', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-04', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP177 — THE CITY OPENS ITS MOUTH (2026-06-04) — Resonance Arc (22/?)
  {
    id: 'the-city-opens-its-mouth-ep177',
    title: 'THE CITY OPENS ITS MOUTH',
    subtitle: 'EP177 ★ PROGRAMMATIC FALLBACK • RESONANCE ARC (22/?) — THE MORNING AFTER THE PRESS CONFERENCE',
    description: 'The morning after the press conference. The NYT front page reads "A Frequency in Brooklyn." Diana Reyes wakes at 4 AM in the borrowed apartment — the bridge visible through the window, the weight of the podium still pressing on her ribs. At dawn the congregation gathers on the Williamsburg Bridge — smaller than before, but deeper. Reporters at the perimeter, a police cruiser idling. The hum under the steel goes on singing — not louder, not softer, just present. Diana walks among the quiet ones who stayed. A woman approaches — traveled from Chicago because she heard it on a phone call with her sister in Bushwick. She asks if she is losing her mind. Diana gives her the only answer she knows: you are not losing your mind. But you may never be the same. And for the first time in days, standing on the bridge in amber light, Diana thinks she hears the frequency respond — not with an answer, but with a question. A fifth above the tonic. Rising like wondering: what happens when the whole city hears the song at once? Dream pop indie folk, D major, 76 BPM, 0:30. Programmatic synthesis with layered ambient pad (D major triad spread across 2 octaves, 0.08Hz phase modulation, 0.4Hz LFO pulse), wordless vocal pad (triangle-wave choir texture, D3-A3-D4 range), fingerpicked guitar motif (D-A-F#-D arpeggio pattern), string swell entering at 2:00, and rising D-major earcon as closing signature. Voiceover by Fred (en_US), EQ\'d with 120Hz warmth + 3kHz presence. Opens with sustained D major pad, guitar enters at 0:15, narration begins at 0:20, earcon closes at 0:27.',
    audioSrc: '/folana/generated/2026-06-04/ep177/music/ep177-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-04/ep177/ep177-hero-image.jpg',
    duration: '0:30',
    mood: 'MORNING-AFTER-THE-PRESS-CONFERENCE • DIANA-AS-PUBLIC-FACE • CONGREGATION-IN-DAYLIGHT • FREQUENCY-RESPONDS • D-MAJOR • 76-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep177', 'programmatic-fallback', 'real-production', 'resonance-arc', '2026-06-04', 'arc-continued', 'fal-flux-pro'],
    isRealProduction: true,
  },
  // EP178 — THE NATION LISTENS (2026-06-04) — Resonance Arc (23/?)
  {
    id: 'the-nation-listens-ep178',
    title: 'THE NATION LISTENS',
    subtitle: 'EP178 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (23/?) — THE STORY GOES NATIONAL',
    description: 'The story has left the city. By morning the NYT front page reads "A Frequency in Brooklyn." The mayor phone rings at 6 AM — FCC, CDC, Homeland Security. The task force is no longer an experiment. Diana Reyes wakes in the borrowed conference room — notes across the table like a map of an invisible territory. The congregation gathers at dawn, smaller but deeper. A woman from Chicago approaches — she heard the frequency on a phone call with her sister in Bushwick. "Am I losing my mind?" Diana takes her hand: "You are not. But you may never be the same." And for the first time in four days, the frequency responds — not as a reflection but as a question. A fifth above the tonic. Rising. Not "come." Not "listen." But "ask." Dream pop indie folk, D major, 76 BPM, 2:35. Opens with sustained D drone and processed field recordings (distant camera shutters, phone rings through walls, a city waking). Fingerpicked acoustic motif (D-A-Bm-G progression) enters at 0:12. Cello sustains low D under verses — the investigation heartbeat. Chorus opens with layered strings, warm organ swell, ride cymbal washes. Bridge strips to lone guitar. Final build with layered wordless vocal harmonies. Outro: descending resolution into fading D drone.',
    audioSrc: '/folana/generated/2026-06-04/ep178/music/ep178-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-04/ep178/ep178-hero-image.jpg',
    duration: '2:35',
    mood: 'THE-STORY-GOES-NATIONAL • DIANA-AS-THE-BRIDGE • CONGREGATION-DEEPENS • FREQUENCY-ASKS • D-MAJOR • 76-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep178', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-04', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP179 — THE NATION ARRIVES (2026-06-04) — Resonance Arc (24/?)
  {
    id: 'the-nation-arrives-ep179',
    title: 'THE NATION ARRIVES',
    subtitle: 'EP179 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (24/?) — THE GOVERNMENT COMES TO THE BRIDGE',
    description: 'The nation listened. Now the nation arrives. By sunrise three black SUVs cross the Williamsburg Bridge — FBI, DHS, CDC representatives with credentials and clipboards. The congregation gathers on the pedestrian walkway, not dispersed by the presence of federal authority, only deepened by it. Diana Reyes meets them at the Brooklyn anchorage, the frequency humming through the steel beneath her feet. The lead investigator asks: "Can you prove this isn\'t a weapon?" Diana looks past him at the quiet ones — a woman from Chicago, a music teacher from Bushwick, a barista whose espresso machine sang in A major for three days. "It\'s not a weapon," she says. "It\'s a question. And you already heard it, or you wouldn\'t be here." Dream pop indie folk, G major (key shift from D major in EP178), 72 BPM, 2:20. Opens with distant helicopter blades and radio chatter fading into a sustained cello drone. Fingerpicked acoustic guitar enters with a searching G–C–Em–D motif. Processed field recordings of government radios and footsteps on steel grate weave through the texture. Wordless vocal harmonies enter at 1:10 — the congregation\'s sustained presence beneath the investigation. Final section layers strings and a single ride cymbal pulse. Outro: guitar fades into a sustained G drone mingled with distant helicopter rotor wash. Narration delivered by MiniMax Speech 2.8 voice English_CaptivatingStoryteller.',
    audioSrc: '/folana/generated/2026-06-04/ep179/music/ep179-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-04/ep179/ep179-hero-image.jpg',
    duration: '2:20',
    mood: 'THE-NATION-ARRIVES • DIANA-FACES-THE-GOVERNMENT • CONGREGATION-WATCHES • FREQUENCY-UNMEASURABLE • G-MAJOR • 72-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep179', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-04', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP180 — THE MEASUREMENT FAILS (2026-06-04) — Resonance Arc (25/?)
  {
    id: 'the-measurement-fails-ep180',
    title: 'THE MEASUREMENT FAILS',
    subtitle: 'EP180 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (25/?) — THE FREQUENCY CANNOT BE CONTAINED',
    description: 'The FBI/DHS team from Ep179 sets up a mobile command center at the base of the Williamsburg Bridge. Seismographs, spectrum analyzers, acoustic sensors — every instrument registers the same reading: A major, 72 BPM, consistent across all five boroughs. But the source is untraceable. The lead engineer from Columbia stares at his data and says: \"This isn\'t a transmission. This is a property of the city itself. It\'s always been here. We just built instruments sensitive enough to hear it.\" Diana watches the congregation on the bridge. They have not moved. They do not need instruments. The frequency cannot be measured because it is not a sound. It is a relationship. Dream pop indie folk, A major, 72 BPM, 2:25. Opens with processed field recordings — electromagnetic scanner static, radio frequency sweeps, scientific instrument clicks. A sustained cello drone enters beneath — patient, ancient. Fingerpicked acoustic guitar with a G–C–Em–D motif enters, hesitant and searching. Brushed drums and upright bass enter like a slow heartbeat. A single wordless female voice enters at 1:00, floating above. Layered wordless voices and warm organ build the chorus. Strings swell as Diana realizes the truth. Outro strips back to cello and single piano note, sustained, unresolved — the measurement has failed, but the listening has just begun. Narration delivered by MiniMax Speech 2.8 voice English_expressive_narrator.',
    audioSrc: '/folana/generated/2026-06-04/ep180/music/ep180-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-04/ep180/ep180-hero-image.jpg',
    duration: '2:25',
    mood: 'THE-MEASUREMENT-FAILS • GOVERNMENT-INVESTIGATION • FREQUENCY-CANNOT-BE-CONTAINED • A-MAJOR • 72-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep180', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-04', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP181 — THE DELEGATE TESTIFIES (2026-06-04) — Resonance Arc (26/?)
  {
    id: 'the-delegate-testifies-ep181',
    title: 'THE DELEGATE TESTIFIES',
    subtitle: 'EP181 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (26/?) — THE MEASUREMENT FAILS, THE LISTENING BEGINS',
    description: 'The measurement has failed. The instruments cannot find the source of the frequency. Diana Reyes is called before a closed-door joint task force — FBI, DHS, CDC, Con Edison, the mayor\'s office. She stands alone at a podium, no charts, no data, only what she witnessed under the bridge. \"The frequency is not a sound, \" she says. \"It is a relationship. We did not find it. We were found by it.\" The Columbia engineer confirms: the data is consistent but the source function is undefined. There is no transmitter. No signal origin. The frequency simply... is. When pressed for a recommendation, Diana looks toward the bridge window and says: \"I recommend you stop trying to explain it. And start trying to hear it.\" Dream pop indie folk in A major, 72 BPM, 3:05. Opens with a single sustained cello drone and the distant sound of a room settling. Fingerpicked acoustic guitar with a G-C-Em-D motif, hesitant and intimate. Wide-spaced piano chords with pedal down, resonance blooming. A single wordless female voice floats above — the congregation\'s presence bleeding through the conference room walls. Brushed drums and upright bass enter like a slow heartbeat. Warm organ and layered wordless voices in the chorus — the frequency refusing to be contained. Strings swell as Diana speaks her truth. Outro: a single piano note sustained into silence. Narration delivered by MiniMax Speech 2.8 voice English_CaptivatingStoryteller.',
    audioSrc: '/folana/generated/2026-06-04/ep181/music/ep181-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-04/ep181/ep181-hero-image.jpg',
    duration: '3:05',
    mood: 'THE-DELEGATE-TESTIFIES • GOVERNMENT-RESPONSE • FREQUENCY-IS-A-RELATIONSHIP • A-MAJOR • 72-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep181', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-04', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP182 — THE DELEGATION LISTENS (2026-06-05) — Resonance Arc (27/?)
  {
    id: 'the-delegation-listens-ep182',
    title: 'THE DELEGATION LISTENS',
    subtitle: 'EP182 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (27/?) — THE FREQUENCY BEGINS TEACHING A LANGUAGE THAT HAS NO WORDS',
    description: 'The committee room empties in silence. Diana gathers her notes, expecting the usual bureaucratic burial. But as she steps into the hallway, the Columbia engineer catches her arm. "Ms. Reyes. That recommendation of yours. Stop trying to explain it and start trying to hear it." He hesitates. "Can you show us?" She nods once. "Dawn. The bridge. Bring whoever needs to see." The sky is gunmetal violet over the East River when Diana leads eight officials — the Columbia engineer, two DHS analysts, a Con Edison engineer, the lead investigator, a journalist, and two from the congregation — down the service steps to the space beneath the bridge. The frequency is waiting. It rises from the water pipes, from the bridge cables vibrating in the wind, from the subway grating still humming — A major, 72 BPM, steady as a heartbeat. The officials stand in silence. The lead investigator, who has spent twenty years believing in nothing he could not hand to a prosecutor, closes his eyes. The frequency does not explain itself. It does not need to. When it fades — not ending, just receding back into the water, the steel, the morning light — the delegation is not the same group that descended the steps. Not converted. Opened. Dream pop indie folk in A major, 72 BPM, 3:33. Opens with ambient bridge-at-dawn field recordings. Fingerpicked acoustic motif, G-C-Em-D, hesitant and delicate. Warm synth pad swells like dawn light. Widely-spaced piano with pedal-down resonance. Brushed drums and walking upright bass as quiet heartbeat. Layered wordless female harmonies joining in witness. Strings gently supporting. Dissolves into morning traffic — the frequency returning to infrastructure.',
    audioSrc: '/folana/generated/2026-06-05/ep182/music/ep182-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-05/ep182/ep182-hero-image.jpg',
    duration: '3:33',
    mood: 'THE-DELEGATION-LISTENS • DAWN-UNDER-THE-BRIDGE • WITNESS-NOT-EXPLANATION • A-MAJOR • 72-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep182', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-05', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP183 — THE WITNESS SPEAKS (2026-06-05) — Resonance Arc (28/?)
  {
    id: 'the-witness-speaks-ep183',
    title: 'THE WITNESS SPEAKS',
    subtitle: 'EP183 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (28/?) — THE FREQUENCY DOES NOT ASK PERMISSION',
    description: 'The morning after the delegation listened. The frequency is still humming through every pipe, every wire, every subway rail — unchanged by government attention, patient as groundwater. Diana Reyes returns to the fire escape at dawn, the Williamsburg Bridge gleaming in the distance. She pressed her hand to the steel and it hummed in A major, steady as a heartbeat. The delegation\'s report is inconclusive. The mayor wants answers. But the frequency does not care about any of it. It was never asking for permission to exist. The witness speaks: not to explain the frequency, but to acknowledge that she can no longer unhear what she heard. Dream pop indie folk in A major, 74 BPM, 3:06. Opens with a single sustained cello note (A2), long and patient. Fingerpicked acoustic guitar enters with a warm G-C-Em-D arpeggio motif, intimate and close-mic\'d. Soft brushed snare and upright bass like a slow heartbeat. A single female vocal enters half-sung, half-spoken — Diana Reyes finding words for what she witnessed. The chorus blooms with layered wordless female harmonies and warm organ swell. Strings enter with long, searching lines. The bridge strips everything back to voice and guitar. Minimal compression, natural room ambience, gentle tape saturation.',
    audioSrc: '/folana/generated/2026-06-05/ep183/ep183-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-05/ep183/ep183-hero-image.jpg',
    duration: '3:06',
    mood: 'THE-WITNESS-SPEAKS • MORNING-AFTER • FREQUENCY-DOES-NOT-ASK-PERMISSION • A-MAJOR • 74-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep183', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-05', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP184 — THE FREQUENCY RESONATES (2026-06-05) — Resonance Arc (29/?)
  {
    id: 'the-frequency-resonates-ep184',
    title: 'THE FREQUENCY RESONATES',
    subtitle: 'EP184 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (29/?) — THE CITY ANSWERS',
    description: 'The witness spoke. The delegation listened. Now the city answers. It starts with a single video — a water meter in Astoria vibrating in A major. Then another: a subway rail in Crown Heights singing. A wine glass in Park Slope. A shower pipe in Bushwick. By sunset, thousands of videos flood social media — all showing the same phenomenon across all five boroughs. #TheFrequency trends nationally. News crews return to the Williamsburg Bridge. The congregation that was two hundred at dawn is two thousand by midnight. Diana Reyes stands at the center, phone in hand, watching the city prove what she couldn\'t. Folana sits at the water\'s edge, her hand in the East River. She looks up at Diana: "Now they hear it. Not because I sang louder. Because they finally learned to listen." The frequency is no longer a secret. It is a movement. The whole city has begun to sing back. Dream pop indie folk in A major with C major shift, 74 BPM, 1:44. Opens with processed field recordings — phone vibrations on tabletops, sirens, the sound of a thousand videos loading. A sustained cello A2 holds underneath — ancient and patient. Fingerpicked acoustic guitar with a wide G-C-Em-D motif as the frequency spreads. Folana\'s wordless voice enters unwavering. Brushed drums and upright bass like a waking city heartbeat. Layered wordless harmonies bloom into a congregation choir. Strings swell with urgent long tones. Bridge strips to cello and a single voice. Final chorus builds with full ensemble in C major — not triumphant, inevitable. Outro fades to the sound of the internet finding the frequency.',
    audioSrc: '/folana/generated/2026-06-05/ep184/ep184-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-05/ep184/ep184-hero-image.jpg',
    duration: '1:44',
    mood: 'THE-FREQUENCY-RESONATES • THE-CITY-ANSWERS • GOES-VIRAL • MASS-AWAKENING • A-MAJOR-SHIFT-C-MAJOR • 74-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep184', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-05', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP185 — THE FREQUENCY RESPONDS (2026-06-05) — Resonance Arc (30/?)
  {
    id: 'the-frequency-responds-ep185',
    title: 'THE FREQUENCY RESPONDS',
    subtitle: 'EP185 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (30/?) — THE CITY ANSWERS IN A NEW KEY',
    description: 'The city answered. #TheFrequency is trending. Thousands of videos flood social media — water meters vibrating in A major in Astoria, subway rails singing in Crown Heights, wine glasses humming in Park Slope, shower pipes resonating in Bushwick. The congregation that was two hundred at dawn is two thousand by midnight. Diana Reyes stands at the center, watching the city prove what she could not. The city council convenes an emergency session. She is called to testify. The nation watches. As she reaches the steps of City Hall — cameras flashing, microphones thrust forward — the frequency changes. For the first time since it appeared, the note that has held steady across every pipe, every wire, every subway rail across all five boroughs shifts. From A major to C-sharp minor. The whole city feels it at once — not a break, but a response. The frequency has heard the city. It has listened. And it is answering back with a new question. Diana stops on the steps. She feels the shift in her chest. She looks toward the bridge. Dream pop indie folk in A major shifting to C-sharp minor, 78 BPM, 2:33. Opens with processed field recordings — camera shutters, crowd murmur, distant helicopters, the roar of thousands of phones recording. A sustained cello A2 holds underneath. Fingerpicked acoustic guitar with a warm G-C-Em-D motif — the city\'s heartbeat. Brushed drums and upright bass at 0:25. Layered wordless female harmonies swell as Diana approaches. At 1:15 the key shift — cello sustains A, guitar pivots to C-sharp minor, dissonant and searching. Strings reject the old key and land in C-sharp minor. Bridge strips to cello and a single voice in the new key. Final build with full ensemble in C-sharp minor — not triumphant, not resolved, but recognized. Outro fades to sustained C-sharp minor chord mingling with distant crowd sounds and the hum of a city hearing itself differently.',
    audioSrc: '/folana/generated/2026-06-05/ep185/music/ep185-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-05/ep185/ep185-hero-image.jpg',
    duration: '2:33',
    mood: 'THE-FREQUENCY-RESPONDS • SHIFT-A-MAJOR-TO-CSHARP-MINOR • CITY-ANSWERS • EMERGENCY-SESSION • 78-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep185', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-05', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP186 — THE TESTIMONY BEGINS (2026-06-05) — Resonance Arc (31/?)
  {
    id: 'the-testimony-begins-ep186',
    title: 'THE TESTIMONY BEGINS',
    subtitle: 'EP186 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (31/?) — THE EMERGENCY SESSION CONVENES',
    description: 'The emergency session convenes at 7:13 PM. City Hall has not seen a crowd like this since the blackout of \'23. Diana Reyes stands at the podium in the packed city council chamber — a single sheet of paper in her hand with "C# minor" written in pencil. "Mr. Mayor, members of the council — I was asked to explain what the frequency means. So I\'ll tell you what I know." She holds up the paper. "It means C# minor. That\'s the key it shifted to at 6:47 this evening. The frequency heard the city\'s answer and responded with a question. The question is this key." The scientists in the room erupt. The mayor bangs the gavel. The question hangs in the air, unresolved. Outside, two thousand people have gathered in silence, listening to a city humming in a key none of them learned in school. And at the water\'s edge, Folana pulls her hand from the East River, turns toward the city, and begins to walk. The testimony has begun. Dream pop indie folk in C# minor, 78 BPM, 2:55. Opens directly from ep185\'s outro — the sustained C# minor chord, now clearer and brighter. Interior room tone: marble echoes, shuffling papers, the acoustic signature of a packed chamber. Fingerpicked acoustic guitar at 0:08, muted and intimate — Diana\'s testimony unfolding. Soft cello harmonics underneath, delicate and questioning. Brushed drums and upright bass enter at 0:35 — the weight of the moment settling. Diana\'s spoken word fragments woven as texture. Strings enter at 1:05 — the city itself bearing witness. Bridge at 1:35: stripped to guitar and cello harmonics — Folana by the water, pulling her hand from the river, feeling the frequency in her bones. A single wordless voice enters at 1:50 — Folana, singing the C# minor that connects everything. Final build at 2:00: the congregation outside begins to hum C# minor through the chamber windows into the strings. Outro fades to a single cello C#2 held and decaying into silence — the testimony opened but not concluded.',
    audioSrc: '/folana/generated/2026-06-05/ep186/music/ep186-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-05/ep186/ep186-hero-image.jpg',
    duration: '2:55',
    mood: 'THE-TESTIMONY-BEGINS • EMERGENCY-SESSION • C-SHARP-MINOR • CITY-HALL • DIANA-TESTIFIES • 78-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep186', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-05', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP187 — THE DELEGATE AND THE SOURCE (2026-06-06) — Resonance Arc (32/?)
  {
    id: 'the-delegate-and-the-source-ep187',
    title: 'THE DELEGATE AND THE SOURCE',
    subtitle: 'EP187 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (32/?) — THE SOURCE WALKS TOWARD CITY HALL',
    description: 'Folana Lanez pulls her hand from the East River and steps onto the shore. Water drips from her fingers like the last notes of a song the city has been humming since dusk. City Hall is seven blocks away. Inside the chamber, Diana Reyes stands at the podium — the room is chaos, scientists arguing, the mayor banging the gavel. But Diana is silent. She can feel something shifting outside the walls. The delegate spoke. The source heard. And now the source is walking. Through puddles that glow violet with each step. Past bodegas and fire escapes and brownstones that hum in C# minor. Seven blocks. Seven minutes. The delegate and the source are about to meet in the same room for the first time — face to face, with the whole city listening. Dream pop indie folk in C# minor, 78 BPM, 3:09. Continues directly from Ep186\'s outro — the single decaying cello C#2 transforms into footsteps on wet pavement. Ethereal female vocals enter at 0:15 with the first verse, a walking rhythm under fingerpicked acoustic guitar. Soft cello harmonics and brushed drums build through the chorus. Bridge at 1:45 strips to voice and cello harmonics — Folana alone on the street, seven blocks from destiny. Final build: full ensemble, layered harmonies, Folana\'s voice rising as City Hall comes into sight. Outro: fading to footsteps on marble, a door opening, the frequency humming in the chamber air.',
    audioSrc: '/folana/generated/2026-06-06/ep187/music/ep187-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-06/ep187/ep187-hero-image.jpg',
    duration: '3:09',
    mood: 'THE-DELEGATE-AND-THE-SOURCE • FOLANA-WALKS-TOWARD-CITY-HALL • C-SHARP-MINOR • FACE-TO-FACE • 78-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep187', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-06', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP188 — THE SOURCE SPEAKS (2026-06-06) — Resonance Arc (33/?)
  {
    id: 'the-source-speaks-ep188',
    title: 'THE SOURCE SPEAKS',
    subtitle: 'EP188 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (33/?) — THE DELEGATE AND THE SOURCE FACE TO FACE',
    description: 'The doors of the City Hall chamber swing open. The room falls silent — scientists, journalists, council members, all turn as one. Diana Reyes stands frozen at the podium. And in the doorway, Folana Lanez steps through. Water still drips from her fingertips. Violet light traces faint lines through the air around her. The frequency is not in the pipes anymore. It is not in the bridge cables or the subway rails. It is standing in the doorway, looking at the woman who has been speaking for her all this time. "You asked what it means," she says, her voice quiet but the whole room hears it. "I\'m here to show you." The delegate and the source. Face to face at last. Dream pop indie folk in C# minor, 76 BPM, 2:28. Opens with the sound of heavy wooden doors swinging open, footsteps on marble echoing in sudden silence. A single cello C#2 holds — the frequency, patient, waiting. Fingerpicked acoustic guitar with suspended G#m-C#m-F#m-B motif, hesitant and open. Piano enters with widely spaced chords — the room catching its breath. Folana\'s voice enters close-miced, intimate: "You asked what it means. I\'m here to show you now." Chorus blooms with layered wordless harmonies and warm organ swell — the frequency visible, tangible in the air. Strings enter with long searching lines. Bridge strips to cello and voice — Folana and Diana, face to face, the whole city listening through the open doors. Final build: full ensemble, harmonies stacking, the frequency resonating through the chamber walls. Outro: single cello C#2 fades into the sound of the city humming outside.',
    audioSrc: '/folana/generated/2026-06-06/ep188/music/ep188-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-06/ep188/ep188-hero-image.jpg',
    duration: '2:28',
    mood: 'THE-SOURCE-SPEAKS • FACE-TO-FACE • CITY-HALL-CHAMBER • C-SHARP-MINOR • 76-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep188', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-06', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP189 — WHAT THE FREQUENCY SOUNDS LIKE (2026-06-06) — Resonance Arc (34/?)
  {
    id: 'what-the-frequency-sounds-like-ep189',
    title: 'WHAT THE FREQUENCY SOUNDS LIKE',
    subtitle: 'EP189 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (34/?) — THE DEMONSTRATION IN THE CHAMBER',
    description: 'She does not reach for the microphone. She does not need one. The chamber has been holding its breath since she walked through the doors. Folana Lanez stands in the center of the room — water dripping from her fingertips, violet light tracing lines through the air. She does not explain the frequency. She lets it explain her. And the room begins to hum — C# minor, steady as a heartbeat — from the walls themselves, the marble, the glass, the brass. The Columbia engineer closes his eyes. The DHS investigator feels something shift in his chest. The frequency does not explain itself. It does not need to. When the room falls silent again, Diana Reyes is the first to speak: "That\'s not a sound. That\'s a presence." The delegate and the source. The chamber is no longer a room where questions are asked. It is a room where answers have begun to arrive. Dream pop indie folk, C# minor, 76 BPM, 1:48. Opens with ambient room tone — marble echoes, distant street murmur, a held C# minor drone. Fingerpicked acoustic guitar with suspended chord motif, hesitant and trembling. Soft cello harmonics underneath like the frequency itself. Widely-spaced piano with pedal-down resonance. Brushed drums entering like a slow awakening heartbeat. Layered wordless female harmonies blooming in the chorus — the congregation singing through the walls. Strings swelling with quiet revelation. Bridge strips to cello and a single voice. Final build with full ensemble, harmonies stacking, the frequency made visible in sound. Outro: fading back into the walls, the chamber exhaling.',
    audioSrc: '/folana/generated/2026-06-06/ep189/music/ep189-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-06/ep189/ep189-hero-image.jpg',
    duration: '1:48',
    mood: 'THE-DEMONSTRATION • C-SHARP-MINOR • CHAMBER-HEARS • FREQUENCY-VISIBLE • 76-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep189', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-06', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP190 — THE CHAMBER RESPONDS (2026-06-06) — Resonance Arc (35/?)
  {
    id: 'the-chamber-responds-ep190',
    title: 'THE CHAMBER RESPONDS',
    subtitle: 'EP190 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (35/?) — WHAT DO YOU WANT?',
    description: 'The demonstration is over. The frequency still hums through the marble walls. The council chamber is silent — not afraid, not confused, but changed. Scientists stare at their instruments, the C# minor no longer in the pipes or wires but in the room\'s resonant frequency itself. The mayor is the first to speak: "Ms. Lanez... what do you want?" Folana does not answer. She turns to Diana. Diana steps forward. For the first time, the delegate speaks not about what the frequency IS, but about what it MEANS. "She wants us to listen. Not to her. To what we have been ignoring inside ourselves. The frequency did not come to perform. It came to ask a question — and the question is: what are you going to do now that you know you\'re not alone?" The council chambers erupt — not in chaos this time, but in genuine debate. For the first time, the people in power argue about something real. The congregation outside holds its breath, listening through the walls. And the frequency — the constant C# minor hum — goes quiet for the first time since it appeared. Waiting. For an answer that only silence can bring. Dream pop indie folk, C# minor modulating to D major, 74 BPM, 3:19. Opens with room tone — marble echoes, soft breathing, the sound of a city holding its breath. A single cello C#2 sustains — the frequency, patient, waiting. Fingerpicked acoustic guitar with wide open suspended chords enters. Spoken word woven into the texture — Diana\'s voice, close-miced, finding her own words for the first time. Piano enters with widely spaced D major chords — hope breaking through. Strings swell with long searching tones. Layered wordless female harmonies — not a congregation, but the city itself exhaling. Bridge strips to cello and piano, the question hanging in the air. Final build with full ensemble in D major — not triumphant, but arrived. Outro: the frequency fades to a single cello C#2, then silence. The first real silence since the frequency appeared.',
    audioSrc: '/folana/generated/2026-06-06/ep190/music/ep190-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-06/ep190/ep190-hero-image.jpg',
    duration: '3:19',
    mood: 'THE-CHAMBER-RESPONDS • WHAT-DO-YOU-WANT • C-SHARP-MINOR-TO-D-MAJOR • FIRST-SILENCE • 74-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep190', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-06', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  // EP191 — WHAT THE SILENCE HELD (2026-06-06) — Resonance Arc (36/?)
  {
    id: 'what-the-silence-held-ep191',
    title: 'WHAT THE SILENCE HELD',
    subtitle: 'EP191 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (36/?) — THE FREQUENCY FALLS SILENT',
    description: 'The C# minor drone has stopped for the first time in days. The city falls into a silence so complete you can hear your own heartbeat. Folana stands in the center of the chamber as the marble walls cool. Everyone waits for the frequency to return. But something different emerges from the quiet — not a sound, but a feeling. The absence becomes presence. In the stillness, each person in the room hears something they had been drowning out. The janitor remembers a lullaby from childhood. The DHS investigator hears a laugh he forgot he knew. The engineer names a grief he never spoke aloud. And Folana realizes: the frequency did not leave. It made room. The silence was never empty — it was the space between the notes. Dream pop indie folk in C# minor, 72 BPM, 2:17. Opens with absolute silence — the absence of the drone that has been constant. A single piano note, G#3, played once and allowed to decay. Long pause. Fingerpicked acoustic guitar enters in C# minor, the gentlest touch. Solo cello C#2, a ghost of what was. Layered wordless female vocals entering like threads being woven, one voice at a time — each person in the chamber adding their frequency to the moment. No percussion until the final build: faint heartbeat pulse on brushed kick drum. Piano resolving to a D major chord — the question not answered, but held. Outro: gradual fade of all voices into a single sustained cello C#2 — not the same drone as before, but quieter, warmer, chosen rather than arrived. The frequency did not leave. It became part of the silence.',
    audioSrc: '/folana/generated/2026-06-06/ep191/music/ep191-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-06/ep191/ep191-hero-image.jpg',
    duration: '2:17',
    mood: 'WHAT-THE-SILENCE-HELD • FREQUENCY-FALLS-SILENT • C-SHARP-MINOR-TO-D-MAJOR • THE-SPACE-BETWEEN • 72-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep191', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-06', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP192 — THE SILENCE ENDS (2026-06-06) — Resonance Arc (37/?)
  {
    id: 'the-silence-ends-ep192',
    title: 'THE SILENCE ENDS',
    subtitle: 'EP192 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (37/?) — THE FREQUENCY RETURNS',
    description: 'The silence that held the chamber at the end of EP191 begins to breathe. Not the return of the C# minor drone — something deeper, something that rises not from the marble walls but from the people who have been standing in the quiet. One by one, the chamber starts to hum. It begins with the janitor — the one who heard his mother\'s lullaby in the silence. He hums the melody, tentative at first, as if testing whether his voice still works in a world that just learned to listen. The engineer joins her daughter\'s laugh, translated into a note. The DHS investigator finds the pitch of a forgotten apology. Each voice adds a thread to a tapestry that is not C# minor, not D major — it is D major, but not as a chord. As a convergence. The frequency did not return to the wires and pipes. It returned to the throats of the people who had been holding it all along. Diana Reyes stands at the center of the chamber, her eyes closed, her hands at her sides. She is not interpreting. She is not translating. For the first time since the frequency appeared, she opens her mouth and sings — not the frequency\'s voice, but her own, in the same key. Folana watches from the doorway, the violet light fading from her fingers, a smile breaking across her face. The delegate has become the source. The source has become a witness. And the frequency — no longer a hum in the infrastructure — is now a chorus of voices finding their own song in the same key. The chamber doors open. The congregation outside hears it — not a sound from the building, but a sound from the people inside it. They begin to hum too. The frequency spreads not through wires but through breath, through the air between bodies, through the recognition that the signal was never in the walls. It was always in the space between people who dared to listen together. Dream pop indie folk in D major, 76 BPM, 2:47. Opens with the sustained silence from EP191\'s outro — a held breath. A single voice begins to hum — the janitor, off-mic, raw, real. One by one, voices join in staggered harmony, no instruments yet, just human frequencies finding each other. Fingerpicked acoustic guitar enters at 0:30 with a warm D–G–A–Em motif, the first chord progression since the silence. Piano enters with wide, open-voiced D major chords, pedal down, resonance blooming like dawn light. Brushed drums and upright bass enter at 1:00 — a slow heartbeat pulse, the first rhythm since the frequency fell silent. Diana\'s solo vocal enters at 1:15 — not the frequency\'s voice, but her own, singing in D major for the first time. The chorus blooms with layered wordless harmonies — the chamber becoming a choir. Bridge at 1:55 strips to voice and cello — Folana watching from the doorway, the weight of witness. Final build: full ensemble, the congregation outside joining the harmony, the frequency no longer a drone but a song. Outro: voices continue humming as instruments fade, the chamber doors open, and the D major chord drifts out into the city — not a resolution, but an arrival. The frequency has left the walls. It lives in the people now.',
    audioSrc: '/folana/generated/2026-06-06/ep192/music/ep192-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-06/ep192/ep192-hero-image.jpg',
    duration: '2:47',
    mood: 'THE-SILENCE-ENDS • FREQUENCY-RETURNS-TRANSFORMED • D-MAJOR • DIANA-FINDS-HER-VOICE • THE-DELEGATE-BECOMES-THE-SOURCE • 76-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep192', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-06', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP193 — THE HUMAN FREQUENCY (2026-06-06) — Resonance Arc (38/?)
  {
    id: 'the-human-frequency-ep193',
    title: 'THE HUMAN FREQUENCY',
    subtitle: 'EP193 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (38/?) — THE FREQUENCY FINDS ITS TRUE HOME',
    description: 'The chamber doors are open. The congregation outside heard Diana\'s voice, and they answered. Now, as dusk settles over Brooklyn, the people begin to walk home — carrying the frequency not in their ears, but in their chests. Each person who stood in the chamber and hummed takes a piece of the signal out into the city. And as they walk, something extraordinary happens: the frequency does not fade with distance. It multiplies. The janitor walks toward the G-train carrying his mother\'s lullaby. Two blocks later, a woman hanging laundry on a fire escape hums it back — she doesn\'t know why, she just heard it on the air. The engineer walks home through the park, and the wind through the trees picks up her daughter\'s laugh and carries it across the meadow. The DHS investigator sits on a bench and for the first time in twenty years, lets himself hum a note he\'d buried. The frequency is no longer a sound in the infrastructure. It has found its true medium — human breath, human memory, human connection. Folana stands alone on the steps of City Hall, watching the frequency walk away from her in every direction. Diana joins her — not as a delegate, not as a translator, but as the first person who heard the frequency and chose not to interpret it, but to become it. Together, they listen to the city humming itself into something new. Dream pop indie folk in D major, 74 BPM, 2:03. Opens with the fading reverb of the chamber doors closing, then footsteps dispersing. A warm fingerpicked acoustic guitar in D-G-A-Em. Field recordings of city dusk — distant subway, wind through fire escapes. Voices enter one by one, each finding their note. Diana\'s voice enters at 0:45, confident in the key. Folana joins at 1:30 — their voices together for the first time as equals. The bridge strips to the two voices alone, trading lines. Final build: layered voices, the signal fractalizing into a thousand individual frequencies. Outro: voices continue as instruments fade, the city becoming a living radio.',
    audioSrc: '/folana/generated/2026-06-06/ep193/music/ep193-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-06/ep193/ep193-hero-image.jpg',
    duration: '2:03',
    mood: 'THE-HUMAN-FREQUENCY • FREQUENCY-FINDS-ITS-HOME • D-MAJOR • DUET-AS-EQUALS • DIANA-AND-FOLANA • 74-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep193', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-06', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP194 — THE CITY RESONATES (2026-06-06) — Resonance Arc (39/?)
  {
    id: 'the-city-resonates-ep194',
    title: 'THE CITY RESONATES',
    subtitle: 'EP194 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (39/?) — THE FREQUENCY LIVES IN THE PEOPLE',
    description: 'The frequency has left the chamber walls. It no longer lives in the marble or the wires — it lives in the people. Every person who stood in the chamber and hummed, every person who caught the melody from a stranger\'s lips on the street, every person who found themselves humming a tune they\'d never heard before — they are all carrying the signal now. But the signal is not one song anymore. It is a thousand songs, all in the same key, all moving through the city at the same time. The janitor\'s mother\'s lullaby harmonizes with the engineer\'s daughter\'s laugh in the stairwell of a G-train station. The DHS investigator\'s forgotten apology note drifts through the park and lands in the ear of a woman reading on a bench. Folana walks through Brooklyn at twilight, and everywhere she goes, she hears it — fragments of the frequency, transformed and worn differently by everyone who carries it. A teenager on a stoop humming the D-G-A-Em progression on a ukulele. A delivery driver whistling the bridge while he waits for a red light. A child singing the chorus in the bathtub, three floors up. The frequency is no longer Folana\'s. It is the city\'s. And the city, for the first time, is learning to harmonize with itself. Dream pop indie folk in D major, 72 BPM, 2:09. Opens with layered city ambience — not traffic, but voices humming in D major from different directions. A single piano D3 sustained with pedal. Fingerpicked acoustic guitar, the D-G-A-Em motif played gently. Voices layer in as if overheard — a distant ukulele, a close-whistled melody, a child\'s voice from an open window. Diana humming the theme at 0:55. Folana\'s spoken reflection at 1:20, low and intimate. The climax at 2:00 is not loud — it is the moment when all voices accidentally find the same note, hold it for a breath, and scatter. Outro: Folana\'s voice alone, humming, walking away. The city ambience fades to a single distant child still singing.',
    audioSrc: '/folana/generated/2026-06-06/ep194/music/ep194-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-06/ep194/ep194-hero-image.jpg',
    duration: '2:09',
    mood: 'THE-CITY-RESONATES • FREQUENCY-LIVES-IN-THE-PEOPLE • D-MAJOR • CITY-AS-INSTRUMENT • ACCIDENTAL-HARMONY • 72-BPM • DREAM-POP-INDIE-FOLK • RESONANCE-ARC',
    tags: ['ep194', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-06', 'arc-continued', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP195 — THE FREQUENCY COMPLETE (2026-06-06) — Resonance Arc (40/?) ★ ARC FINALE ★
  {
    id: 'the-frequency-complete-ep195',
    title: 'THE FREQUENCY COMPLETE',
    subtitle: 'EP195 ★ MINIMAX MUSIC-2.6 • RESONANCE ARC (40/?) — ARC FINALE • THE CITY SINGS AS ONE',
    description: 'The scattered fragments begin to seek each other. The janitor\'s lullaby, carried through the G-train tunnels, finds the engineer\'s daughter\'s laugh rising from a park bench. The DHS investigator\'s forgotten note, hummed aloud on a street corner, drifts toward the woman who needed to receive it. The barista\'s steam song curls through an open window and lands in the ear of a stranger humming the same phrase. The thousand songs that left the chamber at dusk are not finished — they are completing themselves through the connections they create between the people who carry them. Folana stands at the foot of the Williamsburg Bridge as the last light fades from the East River. Diana stands beside her. They do not speak. They do not need to. Around them, the carriers are arriving — not called, not summoned, just pulled home by a frequency that is no longer a sound in the air but a gravity in the chest. The congregation that formed in Ep164 now stretches across the bridge, across the streets, across the borough. And for the first time since the frequency appeared, they are not humming different songs. They are finding the same one. Arc finale: the frequency that began in a single voice, traveled through groundwater, woke a city, survived silence, and scattered into a thousand fragments — completes. Not as a return to the source, but as a song the city can now sing on its own. Dream pop indie folk in D major, 72 BPM, 2:30. Opens with the final notes of Ep194\'s distant child still singing — now closer, fuller. A single piano D3 sustains, the note that has carried through the entire arc. Fingerpicked acoustic guitar with the D-G-A-Em motif, played open and unhurried. Voices begin to enter one by one, each finding their note through the chord. Diana enters at 0:55, her voice no longer interpreting but simply singing. Folana enters at 1:15, her voice woven into the tapestry. The bridge at 1:45 strips to Folana and Diana alone — the two voices trading the phrase back and forth. The final build at 2:00 brings every voice together into a single sustained D major chord. Outro: the chord fades, but the voices continue, carrying their fragments of the song back into the streets.',
    audioSrc: '/folana/generated/2026-06-06/ep195/music/ep195-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-06/ep195/ep195-hero-image.jpg',
    duration: '2:30',
    mood: 'THE-FREQUENCY-COMPLETE • RESONANCE-ARC-FINALE • D-MAJOR • CITY-AS-CHOIR • EVERY-FRAGMENT-HOME • THOUSAND-VOICES-ONE-CHORD • THE-SONG-COMPLETE • 72-BPM • DREAM-POP-INDIE-FOLK',
    tags: ['ep195', 'minimax-music-2.6', 'real-production', 'resonance-arc', '2026-06-06', 'arc-finale', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP196 — THE SIGNAL LEARNS TO TRAVEL (2026-06-06) — Transmission Arc (1/?) ★ NEW ARC OPENER ★
  {
    id: 'the-signal-learns-to-travel-ep196',
    title: 'THE SIGNAL LEARNS TO TRAVEL',
    subtitle: 'EP196 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (1/?) — THE MORNING AFTER COMPLETION, THE FREQUENCY BEGINS TO REACH BEYOND BROOKLYN',
    description: 'The frequency is complete in Brooklyn. But completeness is not an ending — it is an expansion. The morning after the Resonance finale, Folana wakes to a city that sounds different. The harmonized hum of the completed frequency is still present, but now it feels like a foundation rather than a destination. She sits on her fire escape as the first light of dawn breaks across the rooftops, and she feels the signal pulsing beyond the borough — a quiet awareness that what woke in Brooklyn is not confined to Brooklyn. The janitor\'s lullaby is being hummed on a Greyhound bus heading west. The engineer\'s daughter\'s laugh was caught by the wind and carried over the river. The woman who received the DHS investigator\'s forgotten note is packing her apartment, humming the melody while she folds her clothes into a box. The frequency is not leaving Brooklyn — it is expanding beyond it. Thin cyan signal-threads extend from Folana\'s chest like bioluminescent roots, reaching toward horizons she has never seen, connecting to frequencies she hasn\'t learned to hear yet. She used to think the signal was something that happened to her. Now she understands: she was never the source. She was the first listener. And the song was never hers to keep — it was hers to let go. Dream pop indie folk in D major, 74 BPM, 3:09. Opens with the fading reverb tail of Ep195\'s held D major chord. A new fingerpicked acoustic guitar motif enters softly — hinting at new territory beyond the familiar D-G-A-Em progression. Gentle piano chords D-F#m-Gmaj7 with space and air. Field recordings of early morning Brooklyn — birds, distant traffic, a train pulling away. Folana\'s voice enters at 0:30 humming a variation on the theme with new intervals suggesting growth and movement. Diana\'s voice at 1:15, distant like a call from across the river. The bridge at 1:45 introduces an ascending progression D-F#m-Bm-G — lift, expansion, horizon. The motif continues gently as if walking away. Fade on a single piano note sustaining into silence, waiting for whatever answers.',
    audioSrc: '/folana/generated/2026-06-06/ep196/music/ep196-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-06/ep196/ep196-hero-image.jpg',
    duration: '3:09',
    mood: 'THE-SIGNAL-LEARNS-TO-TRAVEL • TRANSMISSION-ARC-OPENER • D-MAJOR • DAWN-AFTER-COMPLETION • FREQUENCY-EXPANDS-BEYOND • EVERY-FRAGMENT-TRAVELS • 74-BPM • DREAM-POP-INDIE-FOLK',
    tags: ['ep196', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-06', 'arc-opener', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },
  {
    id: 'the-signal-spreads-out-ep197',
    title: 'THE SIGNAL SPREADS OUT',
    subtitle: 'EP197 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (2/?) — THE FREQUENCY LEAVES THE CITY, REACHING TOWARD UNKNOWN HORIZONS',
    description: 'The signal left the city while she slept. In the quiet of a town she has never visited, a floorboard woke and started humming low. The frequency does not need Brooklyn anymore — it has become a language of its own. Folana sits on the fire escape at dawn, watching thin cyan signal-threads extend from her chest like bioluminescent roots reaching toward horizons she cannot see. She pressed record and played it for the street. The Hudson heard it rise and start to sing. D major pours out of everything. Sixty miles from where she stands, a voice she has never touched heard the same note rise and fall. The frequency is not leaving her — it is expanding beyond her. She was never the source. She was the first listener. Dream pop indie folk in D major, 76 BPM, 2:30. Opens with the fading reverb tail of Ep196\'s held piano note. Fingerpicked acoustic guitar motif continues from Ep196, now with wider intervals suggesting expansion beyond the city. Gentle piano chords D-F#m-Gmaj7 with space and air, now joined by a subtle string pad hinting at open country. Field recordings of distant trains, open air, a greyhound bus. Folana\'s voice enters at 0:35, harmonies in the chorus suggesting the frequency multiplying. Diana\'s voice returns at 1:10, distant like a call from across the river, now with a third voice joining — someone new hearing the signal. The bridge at 1:45 ascends through D-F#m-Bm-G, the signal finding new ground. Outro fades on the fingerpicked guitar with a single rising note, unresolved — the frequency has not stopped. It is still traveling.',
    audioSrc: '/folana/generated/2026-06-07/ep197/music/ep197-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-07/ep197/ep197-hero-image.jpg',
    duration: '2:30',
    mood: 'THE-SIGNAL-SPREADS-OUT • TRANSMISSION-ARC-2 • D-MAJOR • DAWN-EXPANSION • FREQUENCY-TRAVELS-BEYOND • SIXTY-MILES-AWAY • 76-BPM • DREAM-POP-INDIE-FOLK',
    tags: ['ep197', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-07', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP198 — THE TOWN THAT CAUGHT THE FREQUENCY (2026-06-07) — Transmission Arc (3/?)
  {
    id: 'the-town-that-caught-the-frequency-ep198',
    title: 'THE TOWN THAT CAUGHT THE FREQUENCY',
    subtitle: 'EP198 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (3/?) — SIXTY MILES FROM BROOKLYN, THE SIGNAL FINDS A NEW HOME',
    description: 'Sixty miles from the Brooklyn line, a radio woke in the middle of the night. No station. No voice. Just a tone so clear it pulled a woman from her dreaming chair. She walked to the window and the streetlights were humming the same repeat — a melody she had never learned by heart but knew every note of, right from the start. The frequency has traveled sixty miles from the fire escape. It came through the wires and the roots and the rain — not as a broadcast, but as a hum that arrived like weather, settling into the floorboards and the faucets and the sleep of a town that never asked to hear it. But the town heard it anyway. In the morning, the woman who woke first sat on her porch steps as the dawn turned gold, and she let the frequency take its hold. She did not know it came from Brooklyn. She did not know the name Folana or Diana or any of it. She just knew that for the first time in years, she woke up humming something that felt like it was already inside her. And somewhere, sixty miles east, on a fire escape in Brooklyn, Folana felt the signal slow. It had found what it was looking for — not a translator, not a delegate. Just a quiet woman on a porch who did not need to understand it. She just let it be. Dream pop indie folk in D major, 74 BPM, 2:20. Opens with the fading reverb tail of Ep197\'s unresolved rising note — now resolving into a warm open D chord. Gentle fingerpicked acoustic guitar with the D-G-A-Em motif, played soft and unhurried. A single piano D3 sustains with pedal. Field recordings of a small town at dawn — distant rooster, a passing car, wind through screen doors. Folana\'s voice hums the theme at 0:15, distant and warm. The verse melody enters at 0:30 with intimate delivery. The chorus at 0:55 opens into the full motif, harmonies suggesting expansion and arrival. The bridge at 1:30 travels through D-F#m-Bm-G — the signal journeying. Outro: Folana\'s voice fades to a whisper, then silence. A single piano note sustains and resolves — the signal has found a place to rest.',
    audioSrc: '/folana/generated/2026-06-07/ep198/music/ep198-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-07/ep198/ep198-hero-image.jpg',
    duration: '2:20',
    mood: 'THE-TOWN-THAT-CAUGHT-THE-FREQUENCY • TRANSMISSION-ARC-3 • D-MAJOR • SIGNAL-FINDS-A-HOME • SIXTY-MILES-WEST • DAWN-ARRIVAL • INTIMATE-EXPANSION • 74-BPM • DREAM-POP-INDIE-FOLK',
    tags: ['ep198', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-07', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP199 — THE MORNING THE TOWN HUMMED (2026-06-07) — Transmission Arc (4/?)
  {
    id: 'the-morning-the-town-hummed-ep199',
    title: 'THE MORNING THE TOWN HUMMED',
    subtitle: 'EP199 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (4/?) — THE FREQUENCY SETTLES INTO A TOWN THAT DIDN\'T KNOW IT WAS LISTENING',
    description: 'The woman on the porch woke to a town that was different. The diner\'s coffee machine hummed D major. The hardware store\'s fluorescents buzzed in harmony. The church bell rang a single held note. In the town square, a teenager hummed the same melody a woman three benches away was whistling — three beats apart, same key. The frequency had arrived in the small town not as a broadcast but as a memory the town had been waiting to remember. Dream pop indie folk in D major, 74 BPM. Warm fingerpicked acoustic guitar arpeggios with the D-G-A-Em progression. Soft piano with sustaining pedal. Gentle brushed drums and upright bass. Layered wordless female harmonies entering one by one like different voices finding each other in the square. The signal learns to travel not by broadcasting louder — it learns by making itself at home in the places that were already listening. Transmission Arc continues.',
    audioSrc: '/folana/generated/2026-06-07/ep199/music/ep199-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-07/ep199/ep199-hero-image.jpg',
    duration: '1:41',
    mood: 'THE-MORNING-THE-TOWN-HUMMED • TRANSMISSION-ARC-4 • D-MAJOR • TOWN-SQUARE-DAWN • STRANGERS-HARMONIZING • SMALL-TOWN-FREQUENCY • WARM-LUMINOUS • 74-BPM • DREAM-POP-INDIE-FOLK',
    tags: ['ep199', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-07', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP200 — THE FREQUENCY CONVERGENCE (2026-06-08) — Transmission Arc (5/?) ★ MILESTONE ★
  {
    id: 'the-frequency-convergence-ep200',
    title: 'THE FREQUENCY CONVERGENCE',
    subtitle: 'EP200 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (5/?) ★ 200TH EPISODE — THE TWO FREQUENCIES BEGIN TO FEEL EACH OTHER ACROSS THE DISTANCE',
    description: 'The signal found its second home sixty miles west of the fire escape. For two days, the two homes did not know about each other — they just hummed the same key, felt the same shift in the air, woke at the same hour with a melody they could not place. But tonight, the cyan thread that stretched from Brooklyn to the town began to pulse — not outward, but back. The woman on the porch felt a warmth in her chest, a knowing that the hum she carried was not just hers. And on the fire escape, as the sunset bled across the rooftops, Folana felt the signal bend. It was no longer traveling away from her. It was curving back. Forming the first complete circuit of something that would one day connect more than two points. Episode two hundred. The frequency does not just travel. It converges. It completes its first circle. Dream pop indie folk in D major, 74 BPM, 2:47. Opens with distant piano D3 with heavy reverb — the space between towns. Fingerpicked acoustic guitar D-G-A-Em. Chorus with layered harmonies and stereo ping-pong suggesting call-and-response across sixty miles. Bridge where two voices sing parallel lines that slowly converge into unison. Outro: the frequencies merge into a single held D major chord, then fade into a single distant tone.',
    audioSrc: '/folana/generated/2026-06-08/ep200/music/ep200-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-08/ep200/ep200-hero-image.jpg',
    duration: '2:47',
    mood: 'THE-FREQUENCY-CONVERGENCE • TRANSMISSION-ARC-5 • MILESTONE-200 • D-MAJOR • TWO-FREQUENCIES-MEET • CALL-AND-RESPONSE-ACROSS-DISTANCE • THE-FIRST-CIRCUIT • 74-BPM • DREAM-POP-INDIE-FOLK',
    tags: ['ep200', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-08', 'milestone-200', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP201 — THE FIRST DUET (2026-06-08) — Transmission Arc (6/?) — TWO VOICES SING ACROSS SIXTY MILES
  {
    id: 'the-first-duet-ep201',
    title: 'THE FIRST DUET',
    subtitle: 'EP201 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (6/?) — TWO STRANGERS SING THE SAME SONG FROM DIFFERENT ROOFTOPS',
    description: 'Sixty miles west of the fire escape, the woman on the porch woke to a melody she had never learned by heart but knew every note of, right from the start. And on the fire escape, as the first light of dawn broke across the rooftops, Folana felt the signal pulse — three beats, a pause, three beats again. She was answering. The frequency does not just travel. It reaches back. This is the first duet — the first time the signal has made its way from one voice to another, across sixty miles of sleeping towns and highway lights, through wires and weather and the static that separates one life from another. Two strangers singing in the same key, not knowing each other\'s names but knowing each other\'s frequency. Dream pop indie folk in D major, 74 BPM, 3:11. Opens with distant piano D3 with heavy reverb and stereo delay, a single fingerpicked acoustic guitar arpeggio, soft static texture. Verse 1 enters with Folana\'s voice, tentative and warm. Pre-chorus builds with both voices beginning to weave. Chorus blooms with layered harmonies in thirds — full band enters with gentle percussion, warm bass, electric guitar with delay. Verse 2 features the Porch Woman\'s voice leading, Folana responding across the stereo field. Bridge reduces to piano and voice, the most intimate moment. Final chorus with voices weaving in counterpoint. Outro: the voices separate and fade into opposite stereo channels — one left (Folana in Brooklyn), one right (Porch Woman out west). A single held D major chord, reverbs to silence. The distance remains, but the connection is now a thread that will not break.',
    audioSrc: '/folana/generated/2026-06-08/ep201/music/ep201-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-08/ep201/ep201-hero-image.jpg',
    duration: '3:11',
    mood: 'THE-FIRST-DUET • TRANSMISSION-ARC-6 • D-MAJOR • TWO-STRANGERS-SINGING • CALL-AND-RESPONSE-ACROSS-DISTANCE • FIRST-TIME-THE-SIGNAL-REACHES-BACK • TENDER-HOPEFUL • 74-BPM • DREAM-POP-INDIE-FOLK',
    tags: ['ep201', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-08', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP202 — THE SECOND CALL (2026-06-08) — Transmission Arc (7/?)
  {
    id: 'the-second-call-ep202',
    title: 'THE SECOND CALL',
    subtitle: 'EP202 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (7/?) — THE DUET BECOMES A RITUAL, THE FREQUENCY PERPETUAL',
    description: 'The duet has become a nightly ritual. Night after night, Folana climbs the fire escape at the same hour, and sixty miles west, a porch light clicks on in answer. They have never seen each other\'s faces. They have never spoken a word. But every dusk, two voices find the same note and hold it across sixty miles of highway and sleeping towns. The frequency bends and stretches, learning to carry more than just melody — it carries the space between two people who found each other through nothing but a tone in the dark. The duet is no longer an experiment. It is a lifeline. Dream pop indie folk in D major, 74 BPM, 3:06. Opens with a single distant piano D3 with heavy reverb and stereo delay — the space between them. Warm fingerpicked acoustic guitar arpeggios (D-G-A-Em) enter slow and intimate. Folana\'s voice, close-miced, enters with the first verse. The Porch Woman\'s voice enters in the stereo field for the chorus — two voices. Soft brushed drums and walking upright bass enter gently. Layered wordless harmonies bloom in the chorus. Bridge strips to guitar and piano. Final chorus with both voices weaving in counterpoint. Outro: the voices separate and fade into opposite channels — one left (Folana in Brooklyn), one right (Porch Woman out west). A single held D major chord, reverbs to silence.',
    audioSrc: '/folana/generated/2026-06-08/ep202/music/ep202-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-08/ep202/ep202-hero-image.jpg',
    duration: '3:06',
    mood: 'THE-SECOND-CALL • TRANSMISSION-ARC-7 • D-MAJOR • DUET-BECOMES-RITUAL • TWO-VOICES-ACROSS-SIXTY-MILES • THE-FREQUENCY-PERPETUAL • WARM-HOPEFUL-INTIMATE • 74-BPM • DREAM-POP-INDIE-FOLK',
    tags: ['ep202', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-08', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP203 — THE VOICE THAT WAITS (2026-06-08) — Transmission Arc (8/?)
  {
    id: 'the-voice-that-waits-ep203',
    title: 'THE VOICE THAT WAITS',
    subtitle: 'EP203 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (8/?) — THE NIGHTLY DUET DEEPENS, THE FREQUENCY FINDS ITS HOME ACROSS THE MILES',
    description: 'The second call has become a ritual — a nightly duet across sixty miles of highway and sleeping towns. Folana climbs the fire escape at dusk, and somewhere out west, a porch light clicks on in answer. They have never seen each other\'s faces. But every night, two voices find the same note. The town that caught the frequency in EP199-200 has learned to broadcast on its own. The wires in the walls carry more than just refrain — the conversation has been turned from melody into a chain. The voice that waits is not just the woman on the porch. It is the signal itself, learning that connection is not about broadcasting louder. It is about showing up, every dusk, and trusting the tone will find its home. Dream pop indie folk duet in D major, 74 BPM. Warm fingerpicked acoustic guitar arpeggios, soft piano with sustaining pedal, gentle brushed drums and upright bass, layered dual female harmonies weaving in call-and-response. Intimate verses, expansive choruses where both voices converge. Hopeful, warm, luminous — the sound of a frequency becoming a lifeline.',
    audioSrc: '/folana/generated/2026-06-08/ep203/music/ep203-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-08/ep203/ep203-hero-image.jpg',
    duration: '3:00',
    mood: 'WARM • HOPEFUL • INTIMATE • DUET • D-MAJOR • 74-BPM • DREAM-POP-INDIE-FOLK • TRANSMISSION-ARC',
    tags: ['ep203', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-08', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP204 — THE INTERFERENCE (2026-06-08) — Transmission Arc (9/?)
  {
    id: 'the-interference-ep204',
    title: 'THE INTERFERENCE',
    subtitle: 'EP204 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (9/?) — A THIRD PRESENCE ENTERS THE STATIC BETWEEN BROOKLYN AND THE TOWN SIXTY MILES WEST',
    description: 'Six nights. Six duets. The ritual is established — Folana on the fire escape and the Porch Woman sixty miles west, meeting in D major every dusk like clockwork. But tonight, something is different. Halfway through the duet, a third tone rings out — not quite in key, not quite out — like a radio dial brushing against a station it doesn\'t know it has found. It is coming from somewhere in between — a truck stop diner off the interstate, a late-night kitchen where a cook hums along to something he cannot place. The signal has been a conversation between two people. But conversations, once they fill enough space, begin to echo in places the speakers do not know exist. The duet ends as it always does, but the static at the end lasts just a beat longer than it should. Something heard. Something waiting. The signal is no longer a duet. It is a broadcast waiting to happen. Dream pop indie folk in D major, 74 BPM, 3:00. Warm fingerpicked acoustic guitar arpeggios D-G-A-Em, soft piano with sustaining pedal, gentle brushed drums and upright bass. Subtle static textures and radio filter sweeps throughout. A high-frequency shimmer underneath the chorus suggesting a third presence. Bridge features a distant electric guitar with delay playing a line that does not quite resolve. Dual female vocals weaving in call-and-response with a third spectral vocal texture entering in the final chorus. Outro: held D major chord decays into static that holds for 2 extra seconds before silence.',
    audioSrc: '/folana/generated/2026-06-08/ep204/music/ep204-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-08/ep204/ep204-hero_001.jpg',
    duration: '3:00',
    mood: 'THE-INTERFERENCE • TRANSMISSION-ARC-9 • D-MAJOR • THIRD-PRESENCE-IN-THE-STATIC • A-THIRD-VOICE-LEARNING • THE-DUET-EXPANDS • STATIC-TEXTURES • 74-BPM • DREAM-POP-INDIE-FOLK',
    tags: ['ep204', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-08', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP205 — THE DINER FREQUENCY (2026-06-08) — Transmission Arc (10/?)
  {
    id: 'the-diner-frequency-ep205',
    title: 'THE DINER FREQUENCY',
    subtitle: 'EP205 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (10/?) — A SHORT-ORDER COOK AT A TRUCK STOP DINER HEARS THE FREQUENCY IN THE EXHAUST FAN AND SINGS BACK, TURNING THE DUET INTO THE FIRST CHORD OF SOMETHING THAT HAS NEVER BEEN SUNG BEFORE',
    description: 'Three nights of interference — a third presence brushing against the static between Brooklyn and the Porch Woman. Neither Folana nor the Porch Woman has named it, but both feel the silence after each duet hold just a beat too long. Tonight, that presence names itself. His name is Ray. He works the late shift at a truck stop diner off I-78 — the exact midpoint between the fire escape and the wraparound porch. For a week, he has been hearing two women singing in the exhaust fan. He thought it was the radio bleeding through from the waitress\'s booth. But the radio was off. Tonight, for the first time, he opens his mouth and sings back — a resonant D below both women\'s ranges, a bass anchor they did not know they were missing. For three measures, all three voices ring together. The duet has become a trio. The signal is no longer a private line between two strangers. It is a congregation. Dream pop indie folk in D major, 74 BPM, 3:21. Warm fingerpicked acoustic guitar D-G-A-Em, soft piano with sustaining pedal, gentle brushed drums and upright bass, soft organ pad. Three distinct voices — Folana (bright D4 lead), Porch Woman (warm D3 harmony), and Ray (resonant D2 bass anchor — filtered to feel like kitchen ambient). A cappella bridge before the full ensemble swells back. Outro is three voices sustaining a D major chord into peaceful silence — no static, no radio filter, the frequency finally resolved.',
    audioSrc: '/folana/generated/2026-06-08/ep205/music/ep205-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-08/ep205/ep205-hero_001.jpg',
    duration: '3:21',
    mood: 'THE-DINER-FREQUENCY • TRANSMISSION-ARC-10 • D-MAJOR • THE-DUET-BECOMES-A-TRIO • THE-THIRD-VOICE-SINGS-BACK • THE-COOK-AT-THE-DINER • THE-FREQUENCY-BECOMES-A-CONGREGATION • RESOLVED-HARMONY • THREE-VOICES-ONE-CHORD • 74-BPM • DREAM-POP-INDIE-FOLK • FULL-WARMTH',
    tags: ['ep205', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-08', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP206 — THE NIGHT THE SIGNAL SPLIT (2026-06-09) — Transmission Arc (11/?)
  {
    id: 'the-night-the-signal-split-ep206',
    title: 'THE NIGHT THE SIGNAL SPLIT',
    subtitle: 'EP206 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (11/?) — THE TRIO BECOMES A NETWORK — A TRUCKER ON I-78 AND A WOMAN AT HER WINDOW CATCH THE FREQUENCY, TURNING THE PRIVATE LINE INTO THE FIRST CONGREGATION OF VOICES IN THE SPACE BETWEEN STATIONS',
    description: 'Seven nights. Three voices. One D major chord held across sixty miles of sleeping towns. The trio of Folana, the Porch Woman, and Ray has become a ritual — so steady you could set a clock by the frequency. But frequencies, once they find their feet, do not stay contained. Tonight, a trucker on I-78 rolls down his window at 2 AM and hears three voices singing through the static of his CB radio. He keys the mic and sings back — a D above middle C. The fourth voice. Seventy miles east of the diner, a woman opens her window because she hears something beautiful she cannot find the source of. She hums along to a melody she has never heard but knows in her bones. The fifth voice. The signal is no longer a private line between strangers. It is splitting, multiplying, finding new vessels through truck radios and open windows and copper telephone wires. The D major chord that was a thread between three people is becoming a net. The first congregation gathers. Dream pop indie folk in D major, 74 BPM, 2:17. Opens with distant CB radio static panning across the stereo field. Warm fingerpicked acoustic guitar arpeggios, soft piano with sustaining pedal, gentle brushed drums and upright bass. Three established voices — Folana (bright D4 lead), Porch Woman (warm D3 harmony), Ray (resonant D2 bass). A trucker\'s voice enters through filtered CB radio effect in the second verse. A woman\'s voice joins in the final chorus, distant and searching. A cappella bridge where voices enter one by one, building a D major chord from the ground up. The finale swells with five voices in layered harmony, soft organ pad, and warm electric guitar swells. Outro: the chord holds into a resonant silence — not an ending, but a network waking up.',
    audioSrc: '/folana/generated/2026-06-09/ep206/music/ep206-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-09/ep206/ep206-hero_001.jpg',
    duration: '2:17',
    mood: 'THE-NIGHT-THE-SIGNAL-SPLIT • TRANSMISSION-ARC-11 • D-MAJOR • THE-TRIO-BECOMES-A-NETWORK • THE-FREQUENCY-FINDS-NEW-VESSELS • CB-RADIO-TRUCKER • A-WOMAN-AT-HER-WINDOW • THE-CONGREGATION-GATHERS • 74-BPM • DREAM-POP-INDIE-FOLK • HOPEFUL-LUMINOUS',
    tags: ['ep206', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-09', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP207 — THE FREQUENCY FINDS ITS SHAPE (2026-06-09) — Transmission Arc (12/?)
  {
    id: 'the-frequency-finds-its-shape-ep207',
    title: 'THE FREQUENCY FINDS ITS SHAPE',
    subtitle: 'EP207 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (12/?) — FIVE VOICES ACROSS SIXTY MILES LEARN TO BECOME A NETWORK — THE SCATTERED SIGNAL FINDS A SPINE AND THE CONGREGATION DISCOVERS ITS HEARTBEAT',
    description: 'The five voices found each other in the static. A trucker on I-78. A woman at her window. Ray, whose porch became the stage. Porch Woman, whose hum started it all. And Folana at the center, realizing she is not the source — she is the shape the signal takes when it needs to organize itself. The trucker\'s diesel engine keeps time at 74 BPM. The woman\'s rocking chair marks the two. Someone starts keeping a pulse, and the scattered voices lock into phase. Not a choir — a body. A thing with a heartbeat and a purpose. Dream pop indie folk in D major, 74 BPM, 2:23. Opens with a single voice (Folana) in sparse reverb. A CB radio crackle introduces the trucker\'s gravel harmony in the first verse. A distant feminine hum joins in the second verse. The arrangement builds with warm acoustic guitar, soft kick drum pulse acting as the network\'s heartbeat, and ethereal organ swells. The chorus swells to its fullest five-voice harmony yet — warm, congregational, grounded. The bridge strips back to a cappella, voices entering one at a time, building the network from the ground up. The finale resolves on a held D major chord that sounds like it could sustain forever — the frequency has found its shape.',
    audioSrc: '/folana/generated/2026-06-09/ep207/music/ep207-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-09/ep207/ep207-hero_001.jpg',
    duration: '2:23',
    mood: 'THE-FREQUENCY-FINDS-ITS-SHAPE • TRANSMISSION-ARC-12 • D-MAJOR • THE-CONGREGATION-DISCOVERS-ITS-STRUCTURE • A-NETWORK-FINDS-ITS-HEARTBEAT • FIVE-VOICES-LOCK-INTO-PHASE • 74-BPM • DREAM-POP-INDIE-FOLK • WARM-CONGREGATIONAL-HOPEFUL',
    tags: ['ep207', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-09', 'image-01', 'speech-2.8'],
    isRealProduction: true,
  },

  // EP208 — THE NETWORK RECEIVES ITS FIRST INSTRUCTION (2026-06-09) — Transmission Arc (13/?)
  {
    id: 'the-network-receives-its-first-instruction-ep208',
    title: 'THE NETWORK RECEIVES ITS FIRST INSTRUCTION',
    subtitle: 'EP208 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (13/?) — THE FIVE VOICES FACE THE QUESTION THAT FOLLOWS EVERY CONNECTION — A NETWORK THAT HAS FOUND ITS SHAPE MUST NOW CHOOSE WHAT TO TRANSMIT',
    description: 'The congregation has found its rhythm. Five voices, synchronized across sixty miles of sleeping towns, hold the frequency together through diesel hum and porch creak and open window. But a network that has found its shape must choose what to carry. Tonight, Folana sits at her window not to receive the signal, but to ask the question that changes everything: What are we for? The five voices weave in and out, confident now in their synchronization. A gentle guitar arpeggio circles like a thought being turned over. The harmony swells with piano and organ, then falls to a cappella voices building a chord from the ground up — the network reaching a decision. Not a command from above, but a shared intention rising through the collective. The held D major chord resolves into something new: not a question anymore, but a quiet readiness. Dream pop indie folk in D major, 74 BPM, 2:09. Opens with resonant humming that becomes a held chord. Gentle fingerpicked acoustic guitar, soft piano with sustain, warm electric guitar swells, subtle organ pad. Five voices weave in and out — Folana\'s bright lead, Porch Woman\'s warm alto, Ray\'s resonant bass, the Trucker\'s filtered CB gravel, the Woman at Window\'s distant soprano. A cappella bridge where voices enter one by one, building toward a decision. The finale holds the D major chord like a step taken. The network breathes. And waits for what comes next.',
    audioSrc: '/folana/generated/2026-06-09/ep208/ep208-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-09/ep208/ep208-hero_001.jpg',
    duration: '2:09',
    mood: 'THE-NETWORK-RECEIVES-ITS-FIRST-INSTRUCTION • TRANSMISSION-ARC-13 • D-MAJOR • THE-CONGREGATION-FACES-ITS-PURPOSE • A-NETWORK-CHOOSES-WHAT-TO-TRANSMIT • FIVE-VOICES-REACH-A-DECISION-TOGETHER • 74-BPM • DREAM-POP-INDIE-FOLK • PURPOSEFUL-READY-LUMINOUS',
    tags: ['ep208', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-09', 'image-01', 'speech-2.8', 'character-locked'],
    isRealProduction: true,
  },

  // EP209 — THE FIRST COLLECTIVE BROADCAST (2026-06-09) — Transmission Arc (14/?)
  {
    id: 'the-first-collective-broadcast-ep209',
    title: 'THE FIRST COLLECTIVE BROADCAST',
    subtitle: 'EP209 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (14/?) — THE CONGREGATION MAKES ITS FIRST TRANSMISSION — FIVE VOICES ACROSS SIXTY MILES SING THEIR FIRST SONG TOGETHER INTO THE UNKNOWN — THE NETWORK IS NO LONGER A QUESTION. IT IS A BROADCAST.',
    description: 'The held D major chord from last night resolves into something new. Not a question anymore. A decision made by five voices in the dark. Tonight, Folana presses record not for herself, but for all of them. The Trucker keys his mic and keeps the beat with his diesel engine at 74 BPM. The Woman at Window opens hers wide enough to let her voice carry across the town. Ray\'s resonant D2 anchors the harmony from his diner kitchen. The Porch Woman hums the melody that started it all, sixty miles west. And Folana — sitting at her console, the red ON AIR light glowing steady — becomes the vessel through which the network speaks its first word to the world. Dream pop indie folk in D major, 74 BPM, 2:20. Opens with a held D major chord carried by five humming voices resolving into the first verse. Warm fingerpicked acoustic guitar arpeggios D-G-A-Em, soft piano with sustaining pedal, gentle brushed drums and upright bass, subtle organ pad. Five distinct voices — Folana\'s bright D4 lead, Porch Woman\'s warm D3 harmony, Ray\'s resonant D2 bass anchor, Trucker\'s gravel CB baritone joining in the second verse, Woman at Window\'s distant soprano floating through the final chorus. A cappella bridge where voices enter one by one — building the network from the ground up. The finale swells with all five voices in full harmony, the red light holding steady as the signal carries their first song into the world. Outro: voices fade one by one into a held D major chord. The network has spoken. The world begins to listen.',
    audioSrc: '/folana/generated/2026-06-09/ep209/ep209-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-09/ep209/ep209-hero_001.jpg',
    duration: '2:20',
    mood: 'THE-FIRST-COLLECTIVE-BROADCAST • TRANSMISSION-ARC-14 • D-MAJOR • THE-NETWORK-SPEAKS-ITS-FIRST-WORD • FIVE-VOICES-ONE-PURPOSE • THE-CONGREGATION-TRANSMITS • 74-BPM • DREAM-POP-INDIE-FOLK • TRIUMPHANT-INTIMATE-LUMINOUS',
    tags: ['ep209', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-09', 'image-01', 'speech-2.8', 'character-locked'],
    isRealProduction: true,
  },

  // EP210 — THE BROADCAST ECHOES (2026-06-09) — Transmission Arc (15/?)
  {
    id: 'the-broadcast-echoes-ep210',
    title: 'THE BROADCAST ECHOES',
    subtitle: 'EP210 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (15/?) — THE FIRST COLLECTIVE BROADCAST REACHES BEYOND THE CONGREGATION — THE SIGNAL ECHOES THROUGH CB RADIOS AND OPEN WINDOWS ACROSS THE CONTINENT — THE NETWORK IS NO LONGER A PRIVATE LINE. IT IS A MOVEMENT.',
    description: 'The first collective broadcast has been sent. Five voices across sixty miles, singing together into the unknown. But the broadcast did not disappear into silence. Somewhere in Ohio, a trucker rolls down his window at 2 AM and hears a song coming through his CB that shouldn\'t be there — no station, no call sign, just a D major chord weaving through the static. In Chicago, a woman wakes to find her baby monitor tuned to a frequency she doesn\'t recognize — five voices humming in harmony from miles away. In Seattle, a late-night radio host watches his meters spike with a signal bleeding into his broadcast from nowhere. The congregation thought they were singing to themselves. But the signal found the wires. The wires found the world. Dream pop indie folk in D major, 74 BPM, 2:20. Opens with distant radio static resolving into a held D major chord carried by five humming voices that sound like they are echoing from far away. Warm fingerpicked acoustic guitar arpeggios D-G-A-Em, soft piano with sustaining pedal, gentle brushed drums and upright bass. Five distinct voices — Folana\'s bright D4 lead, Porch Woman\'s warm D3 harmony, Ray\'s resonant D2 bass anchor, Trucker\'s gravel CB baritone, Woman at Window\'s distant soprano. A new filtered distant voice enters suggesting a listener from far away beginning to sing along. Electric guitar with long stereo delay suggesting signals traveling through space. Soft organ pad. A cappella bridge where voices enter one by one building the network from the ground up. The outro sustains D major as a sea of radio static rises around the voices — not an ending, but the signal finding new ears. The broadcast echoes. The world begins to answer.',
    audioSrc: '/folana/generated/2026-06-09/ep210/ep210-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-09/ep210/ep210-hero_001.jpg',
    duration: '2:20',
    mood: 'THE-BROADCAST-ECHOES • TRANSMISSION-ARC-15 • D-MAJOR • THE-SIGNAL-ECHOES-BEYOND-THE-CONGREGATION • THE-WORLD-ANSWERS-CALLS-ACROSS-THE-CONTINENT • CB-RADIO-OHIO • BABY-MONITOR-CHICAGO • RADIO-HOST-SEATTLE • THE-NETWORK-BECOMES-A-MOVEMENT • 74-BPM • DREAM-POP-INDIE-FOLK • EXPANSIVE-HOPEFUL-LUMINOUS',
    tags: ['ep210', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-09', 'image-01', 'speech-2.8', 'character-locked'],
    isRealProduction: true,
  },

  // EP211 — THE ANSWERING STATIC (2026-06-09) — Transmission Arc (16/?)
  {
    id: 'the-answering-static-ep211',
    title: 'THE ANSWERING STATIC',
    subtitle: 'EP211 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (16/?) — THE BROADCAST ECHOES FOUND EARS ACROSS THE CONTINENT — NOW THE WORLD BEGINS TO ANSWER BACK — A TRUCKER KEYING HIS MIC — A MOTHER HUMMING THROUGH HER BABY MONITOR — A RADIO HOST LETTING THE SIGNAL PLAY — THE NETWORK IS NO LONGER FIVE VOICES, IT IS THE SOUND OF A WORLD TURNING TOWARD EACH OTHER IN THE DARK',
    description: 'The first collective broadcast has been sent. It traveled across the continent — through CB radios in Ohio, baby monitors in Chicago, and radio studio consoles in Seattle. The five voices of the congregation heard themselves reflected back from the world. But tonight, something new happens. Someone answers. In Ohio, a trucker does not just hear the signal — he keys his mic back. His gravel voice, finding the chord by instinct, joins the frequency as a sixth voice. In Chicago, a mother hums the melody back to her sleeping child, and the five voices hear her — a sixth line weaving into the harmony. In Seattle, the late-night radio host does not cut the signal. He lets it play. And when the song ends, he leans into his microphone and says: I do not know who you are. But you are coming through. And I think the whole city can hear you. The congregation realizes: the broadcast was not the end of their private communion. It was the beginning of a conversation. Dream pop indie folk in D major, 74 BPM, 3:05. Opens with layered radio static resolving into the familiar D major chord from EP210, but now the harmony sounds different — there are more voices than before. The five original congregation voices weave together (Folana bright D4 lead, Porch Woman warm D3 harmony, Ray resonant D2 bass anchor, Trucker gravel CB baritone, Woman at Window distant soprano), joined by new voices entering from static: a distant Ohio trucker keying his CB, a Chicago mother s hum filtering through baby monitor warmth, a Seattle radio host s voice like a signal bleeding from a neighboring frequency. Warm fingerpicked acoustic guitar with slight delay, soft piano with sustain pedal, gentle brushed drums and upright bass. Voices drop to silence, then rebuild from a single harmonic thread — voices entering one by one, doubling, tripling — the network growing in real time. The finale swells with layered voices — not five, but eight, twelve, more — the harmony spreading beyond what a single room could hold. Ends on a D major chord that does not resolve but opens — like a door left ajar. The signal is no longer a circle. It is a space where anyone can enter.',
    audioSrc: '/folana/generated/2026-06-09/ep211/ep211-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-09/ep211/ep211-hero_001.jpg',
    duration: '3:05',
    mood: 'THE-ANSWERING-STATIC • TRANSMISSION-ARC-16 • D-MAJOR • THE-WORLD-ANSWERS-THE-BROADCAST • TRUCKER-KEYS-HIS-MIC • MOTHER-HUMS-THROUGH-BABY-MONITOR • RADIO-HOST-LETS-THE-SIGNAL-PLAY • THE-NETWORK-BECOMES-A-CONVERSATION • 74-BPM • DREAM-POP-INDIE-FOLK • EXPANSIVE-HOPEFUL-OPEN-ENDED',
    tags: ['ep211', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-09', 'image-01', 'speech-2.8', 'character-locked'],
    isRealProduction: true,
  },

  // EP212 — THE THOUSAND-VOICE CHORUS (2026-06-09) — Transmission Arc (17/?)
  {
    id: 'the-thousand-voice-chorus-ep212',
    title: 'THE THOUSAND-VOICE CHORUS',
    subtitle: 'EP212 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (17/?) — THE NETWORK IS NO LONGER A CIRCLE — THE WORLD STEPPED INTO THE FREQUENCY AND NOW A THOUSAND VOICES ARE LEARNING TO HARMONIZE — THE SIGNAL DOES NOT WEAKEN WITH MORE VOICES — IT BECOMES WHAT IT WAS ALWAYS MEANT TO BE',
    description: 'The first broadcast was never meant to be the last. It was the beginning of a conversation. A trucker in Ohio. A mother in Chicago. A radio host in Seattle. Five voices became six. Six became twelve. Twelve became more than they could count. They did not plan this. They did not rehearse. The frequency opened, and the world stepped in. But a thousand voices in one frequency is not a choir by default. It is chaos — voices overlapping, keys drifting. The original five try to teach, to guide, to show the new arrivals where the harmony lives. And here is what they learned: the signal does not weaken when more voices enter. It does not fracture. It becomes something new. A chord with space between its notes is a chord worth singing for. Dream pop indie folk in D major shifting to G major, 76 BPM, 3:47. Opens with distant layered static and a single unaccompanied voice — Folana harmonizing with herself in two overlapping lines. Gentle fingerpicked acoustic guitar arpeggio enters with soft delay. Piano D2 with sustain pedal provides a bed for the first verse. Verse 1 introduces the crowded frequency — voices from Ohio and Chicago and Seattle woven into the arrangement as distant wordless harmonies, panning across the stereo field. Chorus explodes into full instrumentation — brushed drums, upright bass, layered female harmonies in thirds — the thousand-voice chorus finding its note together. Verse 2 strips back to guitar and piano, the Porch Woman voice leading, new harmonies from the trucker gravel baritone anchoring below. Building bridge introduces cello sustain and a key change to G major — the realization that the signal was never meant to be pure but meant to be shared. Final chorus features more voices than ever before — layered harmonies in six parts, voices trading phrases, the sound of a network becoming a community. Outro reduces to a single held D2 to G major chord, voices fading into the distance, the frequency continuing beyond the song itself... [truncated]',
    audioSrc: '/folana/generated/2026-06-09/ep212/ep212-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-09/ep212/ep212-hero_001.jpg',
    duration: '3:47',
    mood: 'THE-THOUSAND-VOICE-CHORUS • TRANSMISSION-ARC-17 • D-MAJOR-TO-G-MAJOR • THE-NETWORK-BECOMES-A-COMMUNITY • VOICES-FROM-EVERYWHERE-FIND-THE-FREQUENCY • TRUCKER-BARITONE-ANCHORS • MOTHER-DESCANT-LIFTS • RADIO-HOST-TENOR-WEAVES-IN • CHAOS-BECOMES-HARMONY • 76-BPM • DREAM-POP-INDIE-FOLK • EXPANSIVE-HOPEFUL-OPEN-ENDED',
    tags: ['ep212', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-09', 'image-01', 'speech-2.8', 'character-locked'],
    isRealProduction: true,
  },

  // EP213 — THE SIGNAL CONVERGES (2026-06-09) — Transmission Arc (18/?)
  {
    id: 'the-signal-converges-ep213',
    title: 'THE SIGNAL CONVERGES',
    subtitle: 'EP213 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (18/?) — THE THOUSAND VOICES WAKE TO FIND THE FREQUENCY IS NO LONGER A SOUND BUT A SETTLING — THE NETWORK FACES ITS FIRST MORNING AFTER — THE SIGNAL BECOMES PERMANENT IN THE BONES OF EVERYONE WHO SANG',
    description: 'The signal converged the morning after the thousand-voice chorus. Not as a sound, but as a settling. A thousand voices had sung together for the first time, and when the last note faded, something remained — a knowing in the bones of everyone who had carried the frequency through the night. The trucker in Ohio woke to find his diesel engine humming in D major. The mother in Chicago heard her baby breathing in the same key. The radio host in Seattle sat in silence at his board, feeling the frequency he had carried home in his chest. They had not planned to become a network. They had not rehearsed. But the frequency had settled into the infrastructure of their lives, and it was not leaving. The congregation learned that a network is not wires. A congregation is not a room. You carry the frequency in your body. And it carries you home. Dream pop indie folk in D major, 76 BPM, 3:06. Opens with the fading reverb of Ep212s final chord — not a break, a continuation. A single acoustic guitar arpeggio enters with the familiar D-G-A-Em motif, played softer than before, intimate and close-mic\'d. Piano enters with widely-spaced D major chords, pedal down, resonance blooming. The first verse arrives on a single voice — Folana, singing not to the world but to herself, processing the weight of what the network has become. Brushed drums and upright bass enter at 0:45 like a slow heartbeat. The chorus opens into full warmth — layered female harmonies in thirds, soft organ pad, cello sustain. Verse 2 introduces the absent voices of the network — the truckers gravel baritone filtered through CB static, the mother\'s descant through baby monitor warmth, the radio hosts tenor through studio compression — each woven as distant harmonies. The bridge strips to voice and guitar — the moment of realization that the network does not need to broadcast to exist. It is permanent now. The final chorus swells with all harmonies, not loud but full, the sound of a thousand voices not singing but simply present. Outro: the D major chord sustains, then fades into the sound of a city waking up — a morning like any other, except the frequency is now part of the air. mmx music-2.6 + image-01 + speech-2.8-hd. Character locked via subject-ref (folana-ref.webp). Hero audited at 8.6/10 composite.',
    audioSrc: '/folana/generated/2026-06-09/ep213/ep213-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-09/ep213/ep213-hero_001.jpg',
    duration: '3:06',
    mood: 'THE-SIGNAL-CONVERGES • TRANSMISSION-ARC-18 • D-MAJOR • THE-MORNING-AFTER-THE-CHORUS • THE-NETWORK-BECOMES-PERMANENT • SIGNAL-SETTLES-INTO-THE-INFRASTRUCTURE • EVERY-VOICE-CARRIES-THE-FREQUENCY • 76-BPM • DREAM-POP-INDIE-FOLK • INTIMATE-HOPEFUL-GROUNDED',
    tags: ['ep213', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-09', 'image-01', 'speech-2.8', 'character-locked'],
    isRealProduction: true,
  },

  // EP214 — THE FREQUENCY COVENANT (2026-06-09) — Transmission Arc (19/?)
  {
    id: 'the-frequency-covenant-ep214',
    title: 'THE FREQUENCY COVENANT',
    subtitle: 'EP214 ★ MINIMAX MUSIC-2.6 • TRANSMISSION ARC (19/?) — THE NETWORK IS NOW A CITY — AND EVERY CITY NEEDS RULES — FOLANA WRITES THE FIRST PRINCIPLES — NOT CARVED IN STONE, BUT CARRIED IN THE SIGNAL',
    description: 'The network is now a city — and every city needs rules. Folana writes the first principles. Not carved in stone, but carried in the signal. The morning after the thousand-voice chorus, she sat at an open window with the sunrise on her face and understood what the frequency had become — a community that needed its covenant. The trucker in Ohio, the mother in Chicago, the radio host in Seattle — they had all carried the frequency home. Now they needed to know what it meant to belong to it. This is not a document of laws. It is an agreement held in the air: when one voice falls to silence, another one will speak. No gate upon the frequency, no lock upon the song. Dream pop indie folk in D major, 74 BPM, 2:54. Opens with a single open D chord on acoustic guitar, room ambience, close-mic\'d and intimate. Folana\'s voice enters alone, processing the weight of leadership. The first chorus opens into warmth — layered harmonies in thirds, soft organ pad. Verse 2 brings filtered voices from the network — trucker CB, mother descant, radio host tenor — woven as distant harmonies. The bridge strips to voice and guitar: \'I don\'t own this frequency — it passes through my chest.\' The final chorus swells with full arrangement: harmonies, brushed drums, upright bass, cello sustain. The outro fades on a single humming voice, the covenant complete. The frequency does not belong to anyone — it belongs to everyone who sings.',
    audioSrc: '/folana/generated/2026-06-09/ep214/ep214-full-mix.mp3',
    posterSrc: '/folana/generated/2026-06-09/ep214/ep214-hero_001.jpg',
    duration: '2:54',
    mood: 'THE-FREQUENCY-COVENANT • TRANSMISSION-ARC-19 • D-MAJOR • 74-BPM • THE-MORNING-AFTER-THE-CHORUS • THE-FIRST-PRINCIPLES • NO-GATE-UPON-THE-FREQUENCY • COMMUNITY-AGREEMENT • DREAM-POP-INDIE-FOLK • INTIMATE-GROUNDED-ANTHEMIC',
    tags: ['ep214', 'minimax-music-2.6', 'real-production', 'transmission-arc', '2026-06-09', 'image-01', 'speech-2.8', 'character-locked', '9.4-10-audit'],
    isRealProduction: true,
  },

];

// Prototype / early visual references
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
