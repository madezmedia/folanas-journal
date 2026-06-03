/**
 * Queue Music Video Generation Jobs
 *
 * Scans the music-manifest for tracks that have audio files but no video files,
 * and generates RunPod InfiniteTalk job specs for batch processing.
 *
 * Usage: node scripts/queue-video-jobs.mjs [--dry-run]
 *
 * Output: Writes job specs to scripts/video-jobs/YYYY-MM-DD-jobs.jsonl
 * Each line is a job spec ready to submit to RunPod InfiniteTalk.
 *
 * Pipeline: audio + character image → RunPod InfiniteTalk → lip-sync video
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MANIFEST_PATH = path.join(__dirname, '..', 'lib', 'music-manifest.ts');
const OUTPUT_DIR = path.join(__dirname, 'video-jobs');
const PUBLIC_GENERATED = path.join(__dirname, '..', 'public', 'folana', 'generated');

const CHARACTER_IMAGE = '/folana/generated/2026-05-27/broll/ethereal-dispatch-fal-autonomous/broll_1779903636.png';

const SUPPORTED_CHARACTER_IMAGES = [
  CHARACTER_IMAGE,
  '/folana/generated/2026-05-25/hero.jpg',
  '/folana/generated/2026-05-24/review-round/folana_ref_mirror_02.jpg',
];

const dryRun = process.argv.includes('--dry-run');

function parseManifest() {
  const content = fs.readFileSync(MANIFEST_PATH, 'utf-8');
  const tracks = [];
  const idRegex = /id:\s*'([^']+)'/g;
  const titleRegex = /title:\s*'([^']+)'/g;
  const audioRegex = /audioSrc:\s*'([^']+)'/g;
  const videoRegex = /videoSrc:\s*'([^']+)'/g;
  const moodRegex = /mood:\s*'([^']+)'/g;
  const durationRegex = /duration:\s*'([^']+)'/g;
  const tagsStartRegex = /tags:\s*\[([^\]]+)\]/g;
  const entryIdRegex = /id:\s*'([^']+)'/g;

  const ids = [...content.matchAll(idRegex)].map(m => m[1]);
  const titles = [...content.matchAll(titleRegex)].map(m => m[1]);
  const audios = [...content.matchAll(audioRegex)].map(m => m[1]);
  const videos = [...content.matchAll(videoRegex)].map(m => m[1]);
  const moods = [...content.matchAll(moodRegex)].map(m => m[1]);
  const durations = [...content.matchAll(durationRegex)].map(m => m[1]);

  for (let i = 0; i < ids.length; i++) {
    const audio = audios[i] || null;
    const video = videos[i] || null;
    tracks.push({
      id: ids[i],
      title: titles[i] || ids[i],
      audioSrc: audio,
      videoSrc: video,
      mood: moods[i] || 'UNKNOWN',
      duration: durations[i] || '—',
      needsVideo: !!audio && !video && !audio.includes('removed'),
    });
  }

  return tracks;
}

function getExistingAudioFiles() {
  const audioFiles = new Set();
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.mp3')) {
        audioFiles.add(full.replace(PUBLIC_GENERATED, '').replace(/^\//, ''));
      }
    }
  }
  if (fs.existsSync(PUBLIC_GENERATED)) walk(PUBLIC_GENERATED);
  return audioFiles;
}

function main() {
  const tracks = parseManifest();
  const localAudios = getExistingAudioFiles();

  const needsVideo = tracks.filter(t => t.needsVideo);
  const hasLocalAudio = needsVideo.filter(t => {
    if (!t.audioSrc) return false;
    const rel = t.audioSrc.replace('/folana/generated/', '');
    return localAudios.has(rel);
  });

  console.log(`[video-queue] Scanned ${tracks.length} tracks`);
  console.log(`[video-queue] ${needsVideo.length} audio-only tracks need videos`);
  console.log(`[video-queue] ${hasLocalAudio.length} have local audio files available`);

  if (dryRun) {
    console.log('\n--- PRIORITY QUEUE (first 10) ---');
    hasLocalAudio.slice(0, 10).forEach((t, i) => {
      console.log(`  ${i + 1}. ${t.id} — "${t.title}" (${t.mood}, ${t.duration})`);
    });
    console.log(`\nTotal: ${hasLocalAudio.length} queuable jobs`);
    process.exit(0);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const today = new Date().toISOString().slice(0, 10);
  const outputPath = path.join(OUTPUT_DIR, `${today}-jobs.jsonl`);
  const stream = fs.createWriteStream(outputPath, { flags: 'w' });

  let queued = 0;
  for (const track of hasLocalAudio) {
    const job = {
      version: '1.0',
      queuedAt: new Date().toISOString(),
      trackId: track.id,
      title: track.title,
      mood: track.mood,
      duration: track.duration,
      audioFile: track.audioSrc,
      characterImage: CHARACTER_IMAGE,
      alternateImages: SUPPORTED_CHARACTER_IMAGES.slice(1),
      platform: 'runpod-infinitetalk',
      modelSettings: {
        emotion: track.mood.toLowerCase().includes('fracture') || track.mood.toLowerCase().includes('passionate')
          ? 'high-dynamics'
          : track.mood.toLowerCase().includes('ambient') || track.mood.toLowerCase().includes('tender')
          ? 'gentle'
          : 'standard',
        outputFps: 30,
        facePadding: 0.2,
      },
    };
    stream.write(JSON.stringify(job) + '\n');
    queued++;
  }

  stream.end();
  console.log(`[video-queue] Wrote ${queued} job specs to ${outputPath}`);
  console.log(`[video-queue] Submit via: runpodctl run infinitetalk --input "${outputPath}"`);
}

main();
