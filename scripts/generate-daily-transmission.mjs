import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JOURNAL_DIR = path.join(__dirname, '..', 'journal-entries');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

function today() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatDate(dateStr) {
  const parts = dateStr.split('-').map(Number);
  const d = new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0);
  return d.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

const ARCS = [
  'Genesis Arc (Ep1-10) — The signal awakens',
  'Brooklyn Wires Arc (Ep11-20) — Street-level stories, city as instrument',
  'Digital Veil Arc (Ep21-30) — Technology meets spirituality',
  'Threshold Arc (Ep31-40) — Approaching the Day Cycle',
  'Day Cycle Arc (Ep41-48) — Dawn to night, the structured broadcast',
  'Elements Arc (Ep53-56) — Earth, water, fire, air',
  'City Souls Arc (Ep57-79) — The city breathes back',
  'Ghost Frequencies Arc (Ep80-107) — Beyond the veil',
  'Broadcast Arc (Ep108-120) — Transmission in full spectrum',
  'Inner Circle Arc (Ep121-130) — The frequency is yours',
  'Chorus Arc (Ep131-140) — Harmony from the static',
  'Pipeline Arc (Ep141-145) — The pipeline breathes again',
  'Frequency Broadcasts Arc (Ep146+) — The signal leaves home',
];

function pickArcs() {
  const shuffled = [...ARCS].sort(() => Math.sin(Date.now()) - 0.5);
  return shuffled.slice(0, 3);
}

const MOODS = ['TRANSMITTING', 'BROADCASTING', 'TUNING', 'FREQUENCY LOCKED', 'STATIC CLEAR', 'WIRES HUMMING', 'PIPELINE BREATHING', 'CODEX UPDATING', 'SIGNAL ACTIVE'];

function pickMood() {
  const t = Date.now();
  const idx = Math.abs(Math.floor(Math.sin(t / 1000) * 1000)) % MOODS.length;
  return MOODS[idx];
}

function getLatestVideo() {
  const dirs = ['2026-05-27', '2026-05-28', '2026-05-29', '2026-05-30', '2026-05-31', '2026-06-01', '2026-06-02', '2026-06-03'];
  for (const dir of dirs) {
    const videoDir = path.join(PUBLIC_DIR, 'folana', 'generated', dir, 'videos');
    if (fs.existsSync(videoDir)) {
      const files = fs.readdirSync(videoDir).filter(f => f.endsWith('.mp4'));
      if (files.length > 0) {
        return `/folana/generated/${dir}/videos/${files[0]}`;
      }
    }
  }
  return null;
}

function generateContent(dateStr) {
  const formatted = formatDate(dateStr);
  const mood = pickMood();
  const arcs = pickArcs();
  const latestVideo = getLatestVideo();

  let mediaUrls = [];
  if (latestVideo) mediaUrls.push(latestVideo);

  const frontmatter = {
    id: `${dateStr}_daily-transmission---${dateStr}`,
    title: `Daily Transmission — ${dateStr}`,
    date: dateStr,
    mood: mood,
    tags: ['dispatch', 'daily-transmission', dateStr],
    image_url: '/folana/generated/brand/hero.jpg',
    media_urls: mediaUrls,
    type: 'daily-dispatch',
  };

  let content = `The wires are humming on ${formatted}. The signal is clear, the pipeline is breathing, and the archive grows.\n\n`;

  content += `**Current Frequency:** ${mood}\n\n`;
  content += `**Active Arcs:**\n`;
  for (const arc of arcs) {
    content += `- ${arc}\n`;
  }
  content += '\n';

  if (latestVideo) {
    content += `**Latest Video Transmission:**\n\n`;
    content += `<video controls src="${latestVideo}" style="max-width:100%;margin:1rem 0"></video>\n\n`;
  }

  content += `---\n\n`;
  content += `*This dispatch was generated and published autonomously by the Folana CNS. The frequency is yours to shape.*\n`;

  const header = '---\n' + Object.entries(frontmatter).map(([k, v]) => {
    if (Array.isArray(v)) {
      return `${k}:\n${v.map(i => `  - ${typeof i === 'string' ? i : `'${i}'`}`).join('\n')}`;
    }
    return `${k}: ${typeof v === 'string' ? v : JSON.stringify(v)}`;
  }).join('\n') + '\n---\n\n';

  return header + content;
}

function main() {
  const dateStr = today();
  const filename = `${dateStr}_daily-transmission---${dateStr}.md`;
  const filepath = path.join(JOURNAL_DIR, filename);

  if (fs.existsSync(filepath)) {
    console.log(`[daily-transmission] Already exists: ${filename}`);
    process.exit(0);
  }

  if (!fs.existsSync(JOURNAL_DIR)) {
    fs.mkdirSync(JOURNAL_DIR, { recursive: true });
  }

  const content = generateContent(dateStr);
  fs.writeFileSync(filepath, content, 'utf-8');
  console.log(`[daily-transmission] Created: ${filename} (${pickMood()})`);
}

main();
