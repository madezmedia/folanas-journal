#!/usr/bin/env node
/**
 * Audits Folana's Journal deployment completeness.
 * Checks each REAL_PRODUCTIONS entry against the filesystem.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const MANIFEST_PATH = path.resolve(__dirname, '..', 'lib', 'music-manifest.ts');

function readManifest() {
  const content = fs.readFileSync(MANIFEST_PATH, 'utf-8');
  return content;
}

/**
 * Extract all entries from the REAL_PRODUCTIONS array.
 * We use a simple state-machine parser since the TS file is large.
 */
function extractEntries(content) {
  // Find the start of REAL_PRODUCTIONS array
  const startMarker = 'export const REAL_PRODUCTIONS: RealTrack[] = [';
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) {
    console.error('Could not find REAL_PRODUCTIONS array');
    return [];
  }

  // Extract the array content by tracking braces
  let arrayStart = startIdx + startMarker.length;
  let depth = 0;
  let inString = false;
  let stringChar = null;
  let escapeNext = false;
  let entries = [];
  let currentEntry = '';
  let braceDepth = 0;
  let sawOpeningBrace = false;

  // Read character by character to find all { } objects
  const entries_raw = [];
  let objDepth = 0;
  let currentObj = '';
  let collecting = false;
  
  for (let i = arrayStart; i < content.length; i++) {
    const ch = content[i];
    
    if (inString) {
      currentObj += ch;
      if (escapeNext) {
        escapeNext = false;
      } else if (ch === '\\') {
        escapeNext = true;
      } else if (ch === stringChar) {
        inString = false;
        stringChar = null;
      }
      continue;
    }
    
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true;
      stringChar = ch;
      if (collecting) currentObj += ch;
      continue;
    }
    
    if (ch === '/' && content[i+1] === '/') {
      // Single line comment - skip to end of line
      while (i < content.length && content[i] !== '\n') i++;
      continue;
    }
    
    if (ch === '/' && content[i+1] === '*') {
      // Multi-line comment - skip to */
      while (i < content.length - 1 && !(content[i] === '*' && content[i+1] === '/')) i++;
      i++; // skip the closing /
      continue;
    }
    
    if (ch === '{') {
      objDepth++;
      if (objDepth === 1 && !collecting) {
        collecting = true;
        currentObj = '';
      }
      if (collecting) currentObj += ch;
      continue;
    }
    
    if (ch === '}') {
      objDepth--;
      if (objDepth === 0 && collecting) {
        currentObj += ch;
        entries_raw.push(currentObj.trim());
        collecting = false;
        currentObj = '';
      }
      if (collecting) currentObj += ch;
      continue;
    }
    
    // Check for end of array (when objDepth is 0 and we see ])
    if (ch === ']' && objDepth === 0 && !collecting) {
      break;
    }
    
    if (collecting) {
      currentObj += ch;
    }
  }

  return entries_raw;
}

/**
 * Parse a single manifest entry object to extract paths
 */
function parseEntry(entryStr) {
  const entry = {};
  
  // Extract id
  const idMatch = entryStr.match(/\bid:\s*['"]([^'"]+)['"]/);
  if (idMatch) entry.id = idMatch[1];
  
  // Extract title
  const titleMatch = entryStr.match(/\btitle:\s*['"]([^'"]+)['"]/);
  if (titleMatch) entry.title = titleMatch[1];
  
  // Extract audioSrc path - this is tricky because paths may be on multiple lines
  const audioMatch = entryStr.match(/audioSrc:\s*['"]([^'"]+)['"]/);
  if (audioMatch) entry.audioSrc = audioMatch[1];
  
  // Extract videoSrc
  const videoMatch = entryStr.match(/videoSrc:\s*['"]([^'"]+)['"]/);
  if (videoMatch) entry.videoSrc = videoMatch[1];
  
  // Extract posterSrc
  const posterMatch = entryStr.match(/posterSrc:\s*['"]([^'"]+)['"]/);
  if (posterMatch) entry.posterSrc = posterMatch[1];
  
  // Extract brollFolder
  const brollMatch = entryStr.match(/brollFolder:\s*['"]([^'"]+)['"]/);
  if (brollMatch) entry.brollFolder = brollMatch[1];
  
  // Extract frontVideo
  const frontVideoMatch = entryStr.match(/frontVideo:\s*['"]([^'"]+)['"]/);
  if (frontVideoMatch) entry.frontVideo = frontVideoMatch[1];
  
  // Extract sideVideo
  const sideVideoMatch = entryStr.match(/sideVideo:\s*['"]([^'"]+)['"]/);
  if (sideVideoMatch) entry.sideVideo = sideVideoMatch[1];
  
  // Extract falAutonomousBroll paths
  const brollPaths = [];
  const brollRegex = /['"](\/folana\/generated\/[^'"]+\/broll\/[^'"]+\.png)['"]/g;
  let brollMatch2;
  while ((brollMatch2 = brollRegex.exec(entryStr)) !== null) {
    brollPaths.push(brollMatch2[1]);
  }
  if (brollPaths.length > 0) entry.falAutonomousBroll = brollPaths;

  return entry;
}

function checkFile(publicDir, urlPath) {
  if (!urlPath) return { exists: false, reason: 'No path provided' };
  
  // Convert URL path (starting with /) to filesystem path
  const cleanPath = urlPath.replace(/^\//, '');
  const fsPath = path.join(publicDir, cleanPath);
  
  try {
    const exists = fs.existsSync(fsPath);
    const stat = exists ? fs.statSync(fsPath) : null;
    return {
      exists,
      urlPath,
      fsPath,
      isFile: stat ? stat.isFile() : false,
      size: stat ? stat.size : 0,
    };
  } catch (e) {
    return { exists: false, urlPath, fsPath, error: e.message };
  }
}

async function main() {
  console.log('=== Folana\'s Journal - Deployment Completeness Audit ===\n');
  
  const content = readManifest();
  const rawEntries = extractEntries(content);
  
  console.log(`Found ${rawEntries.length} entries in REAL_PRODUCTIONS array\n`);
  
  let totalPaths = 0;
  let missingCount = 0;
  let missingDetails = [];
  let presentCount = 0;
  let storyOnly = 0;

  for (let idx = 0; idx < rawEntries.length; idx++) {
    const parsed = parseEntry(rawEntries[idx]);
    const id = parsed.id || `entry-${idx}`;
    const title = parsed.title || 'Unknown';
    
    // Collect all paths to check
    const pathsToCheck = [];
    
    if (parsed.audioSrc) {
      pathsToCheck.push({ type: 'audioSrc', path: parsed.audioSrc });
    }
    if (parsed.videoSrc) {
      pathsToCheck.push({ type: 'videoSrc', path: parsed.videoSrc });
    }
    if (parsed.posterSrc) {
      pathsToCheck.push({ type: 'posterSrc', path: parsed.posterSrc });
    }
    if (parsed.frontVideo) {
      pathsToCheck.push({ type: 'frontVideo', path: parsed.frontVideo });
    }
    if (parsed.sideVideo) {
      pathsToCheck.push({ type: 'sideVideo', path: parsed.sideVideo });
    }
    if (parsed.brollFolder) {
      pathsToCheck.push({ type: 'brollFolder', path: parsed.brollFolder });
    }
    if (parsed.falAutonomousBroll) {
      parsed.falAutonomousBroll.forEach((bp, i) => {
        pathsToCheck.push({ type: `falBroll[${i}]`, path: bp });
      });
    }
    
    if (pathsToCheck.length === 0) {
      storyOnly++;
      continue;
    }
    
    const entryMissing = [];
    const entryPresent = [];
    
    for (const pc of pathsToCheck) {
      totalPaths++;
      const result = checkFile(PUBLIC_DIR, pc.path);
      if (result.exists && result.isFile) {
        presentCount++;
        entryPresent.push({ type: pc.type, path: pc.path, size: result.size });
      } else {
        missingCount++;
        entryMissing.push({ type: pc.type, path: pc.path });
      }
    }
    
    if (entryMissing.length > 0) {
      // Check if it's a directory (for brollFolder)
      for (const em of entryMissing) {
        if (em.type === 'brollFolder') {
          // Directories would fail the file check, check as dir
          const cleanPath = em.path.replace(/^\//, '');
          const fsPath = path.join(PUBLIC_DIR, cleanPath);
          if (fs.existsSync(fsPath) && fs.statSync(fsPath).isDirectory()) {
            presentCount++;
            missingCount--;
            continue; // This is fine - directory exists
          }
        }
        missingDetails.push({
          id,
          title: title.substring(0, 60),
          type: em.type,
          manifestPath: em.path,
        });
      }
    }
  }

  console.log('=== SUMMARY ===');
  console.log(`Total entries scanned: ${rawEntries.length}`);
  console.log(`Story-only entries (no media): ${storyOnly}`);
  console.log(`Entries with media paths: ${rawEntries.length - storyOnly}`);
  console.log(`Total paths checked: ${totalPaths}`);
  console.log(`Paths present: ${presentCount}`);
  console.log(`Paths MISSING: ${missingCount}\n`);

  if (missingCount > 0) {
    console.log('=== MISSING FILES ===');
    console.log('These paths from the manifest do NOT exist on the filesystem:\n');
    
    // Group by type
    const audioMissing = missingDetails.filter(m => m.type === 'audioSrc');
    const posterMissing = missingDetails.filter(m => m.type === 'posterSrc');
    const videoMissing = missingDetails.filter(m => m.type === 'videoSrc' || m.type === 'frontVideo' || m.type === 'sideVideo');
    const brollMissing = missingDetails.filter(m => m.type.startsWith('falBroll'));
    const otherMissing = missingDetails.filter(m => !['audioSrc', 'posterSrc', 'videoSrc', 'frontVideo', 'sideVideo'].includes(m.type) && !m.type.startsWith('falBroll'));
    
    if (audioMissing.length > 0) {
      console.log(`\n--- Audio Files Missing (${audioMissing.length}) ---`);
      audioMissing.forEach(m => {
        console.log(`  [${m.id}] ${m.title}`);
        console.log(`    missing: ${m.manifestPath}`);
      });
    }
    
    if (posterMissing.length > 0) {
      console.log(`\n--- Poster/Hero Images Missing (${posterMissing.length}) ---`);
      posterMissing.forEach(m => {
        console.log(`  [${m.id}] ${m.title}`);
        console.log(`    missing: ${m.manifestPath}`);
      });
    }
    
    if (videoMissing.length > 0) {
      console.log(`\n--- Video Files Missing (${videoMissing.length}) ---`);
      videoMissing.forEach(m => {
        console.log(`  [${m.id}] ${m.title}`);
        console.log(`    missing: ${m.manifestPath}`);
      });
    }
    
    if (brollMissing.length > 0) {
      console.log(`\n--- B-Roll Files Missing (${brollMissing.length}) ---`);
      brollMissing.forEach(m => {
        console.log(`  [${m.id}] ${m.title}`);
        console.log(`    missing: ${m.manifestPath}`);
      });
    }
    
    if (otherMissing.length > 0) {
      console.log(`\n--- Other Missing (${otherMissing.length}) ---`);
      otherMissing.forEach(m => {
        console.log(`  [${m.id}] ${m.title}`);
        console.log(`    missing: ${m.manifestPath}`);
      });
    }
  } else {
    console.log('✓ All referenced files exist on the filesystem!');
  }
  
  console.log('\n=== Filesystem directories without manifest entries ===');
  // Check if ep directories have subdirectories and hero images
  const generatedDir = path.join(PUBLIC_DIR, 'folana', 'generated');
  const dates = fs.readdirSync(generatedDir).filter(d => {
    const fullPath = path.join(generatedDir, d);
    return fs.statSync(fullPath).isDirectory();
  });
  
  for (const dateDir of dates) {
    const datePath = path.join(generatedDir, dateDir);
    const items = fs.readdirSync(datePath);
    for (const item of items) {
      const itemPath = path.join(datePath, item);
      if (fs.statSync(itemPath).isDirectory() && item.startsWith('ep')) {
        const epContents = fs.readdirSync(itemPath);
        const hasMusicDir = epContents.includes('music');
        const hasHeroImage = epContents.some(f => f.includes('hero') || f.includes('image') || f.endsWith('.jpg'));
        const hasMusicFiles = hasMusicDir ? 
          fs.readdirSync(path.join(itemPath, 'music')).some(f => f.endsWith('.mp3')) : false;
        
        // Check if this episode number is referenced in the manifest
        const epNum = item.replace('ep', '');
        const inManifest = rawEntries.some(e => {
          const parsed = parseEntry(e);
          return parsed.id && parsed.id.includes(`ep${epNum}`) || 
                 (parsed.title && parsed.title.includes(`EP${epNum}`));
        });
        
        if (!inManifest) {
          console.log(`  ${dateDir}/${item}/ — NOT in manifest, has hero: ${hasHeroImage}, has music/ dir: ${hasMusicDir}`);
        }
      }
    }
  }
}

main().catch(console.error);
