import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { supabase } from './supabase';
import { getAcmiJournalEntries, getAcmiJournalEntry } from './acmi-journal';

const journalsDirectory = path.join(process.cwd(), 'journal-entries');

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  image_url?: string;
  media_urls?: string[];
  mood?: string | null;
  interests?: unknown;
  opinions?: unknown;
  source?: string | null;
  visibility?: string | null;
}

export interface JournalReadOptions {
  includeDrafts?: boolean;
}

async function renderMarkdown(md: string): Promise<string> {
  const processed = await remark().use(html).process(md || '');
  return processed.toString();
}

// Tolerate legacy rows from migrate-journal.mjs that pre-rendered HTML into `content`.
function looksLikeHtml(s: string | null | undefined): boolean {
  if (!s) return false;
  return /^\s*<\w/.test(s);
}

async function renderForDisplay(content: string | null | undefined): Promise<string> {
  if (!content) return '';
  return looksLikeHtml(content) ? content : await renderMarkdown(content);
}

// Legacy rows pre-date the visibility column — null/undefined = treat as live.
function isVisibleToPublic(visibility: unknown): boolean {
  return visibility !== 'draft';
}

export async function getSortedJournalEntries(opts?: JournalReadOptions): Promise<JournalEntry[]> {
  const includeDrafts = !!opts?.includeDrafts;
  const entries: JournalEntry[] = [];

  // 1. Load local markdown files first (these are the newest Ep31 content you just created)
  if (fs.existsSync(journalsDirectory)) {
    const fileNames = fs.readdirSync(journalsDirectory);
    const localEntries = await Promise.all(
      fileNames.map(async (fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(journalsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        const contentHtml = await renderMarkdown(matterResult.content);

        const dateVal = matterResult.data.date || matterResult.data.timestamp;
        return {
          id,
          content: contentHtml,
          date: dateVal
            ? (dateVal instanceof Date ? dateVal.toISOString() : String(dateVal))
            : new Date().toISOString(),
          title: matterResult.data.title || matterResult.data.type || 'Untitled',
          image_url: matterResult.data.image_url,
          media_urls: matterResult.data.media_urls,
          source: 'local-markdown',
          visibility: 'live',
        } as JournalEntry;
      })
    );
    entries.push(...localEntries);
  }

  // 2. Merge in ACMI entries (if available on Vercel)
  try {
    const acmiEntries = await getAcmiJournalEntries();
    if (acmiEntries.length > 0) {
      console.log(`[journal] Found ${acmiEntries.length} entries in ACMI.`);
      const mappedAcmi = await Promise.all(
        acmiEntries.map(async (entry) => ({
          id: entry.payload.entryId,
          date: new Date(entry.ts).toISOString(),
          title: entry.summary.replace(/^\[journal]\s*/, ''),
          content: await renderForDisplay(entry.payload.contentMarkdown),
          image_url: entry.payload.image_url,
          media_urls: entry.payload.media_urls,
          mood: null,
          interests: null,
          opinions: null,
          source: entry.source || 'acmi',
          visibility: 'live'
        }))
      );

      // Merge: prefer local version if ID already exists (so your new Ep31 entries win)
      const localIds = new Set(entries.map(e => e.id));
      const newFromAcmi = mappedAcmi.filter(e => !localIds.has(e.id));
      entries.push(...newFromAcmi);
    }
  } catch (err) {
    console.warn('[journal] ACMI fetch failed (using local entries only):', err);
  }

  // 3. Optional Supabase (only used if no local + no ACMI)
  if (entries.length === 0) {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .order('date', { ascending: false });

      if (!error && data && data.length > 0) {
        const filtered = includeDrafts ? data : data.filter((e) => isVisibleToPublic(e.visibility));
        const supabaseMapped = await Promise.all(
          filtered.map(async (entry) => ({
            id: entry.id,
            date: entry.date,
            title: entry.title,
            content: await renderForDisplay(entry.content),
            image_url: entry.image_url,
            media_urls: entry.media_urls,
            mood: entry.mood ?? null,
            interests: entry.interests ?? null,
            opinions: entry.opinions ?? null,
            source: entry.source ?? 'supabase',
            visibility: entry.visibility ?? null,
          }))
        );
        entries.push(...supabaseMapped);
      }
    } catch (error) {
      console.warn('Supabase fetch failed:', error);
    }
  }

  // Sort newest first
  return entries.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getJournalEntry(id: string, opts?: JournalReadOptions): Promise<JournalEntry> {
  const includeDrafts = !!opts?.includeDrafts;

  // === Priority 1: Local filesystem for brand new / recent entries (most reliable for fresh MD content) ===
  const fullPath = path.join(journalsDirectory, `${id}.md`);
  if (fs.existsSync(fullPath)) {
    try {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      const contentHtml = await renderMarkdown(matterResult.content);

      const dateVal = matterResult.data.date || matterResult.data.timestamp;
      return {
        id,
        content: contentHtml,
        date: dateVal
          ? (dateVal instanceof Date ? dateVal.toISOString() : String(dateVal))
          : new Date().toISOString(),
        title: matterResult.data.title || matterResult.data.type || 'Untitled',
        image_url: matterResult.data.image_url,
        media_urls: matterResult.data.media_urls,
      };
    } catch (e) {
      console.error(`[getJournalEntry] Failed to parse local file for ${id}`, e);
      // fall through to other sources
    }
  }

  // === Priority 2: ACMI (for entries published via the protocol) ===
  try {
    const acmiEntry = await getAcmiJournalEntry(id);
    if (acmiEntry) {
      return {
        id: acmiEntry.payload.entryId,
        date: new Date(acmiEntry.ts).toISOString(),
        title: acmiEntry.summary.replace(/^\[journal]\s*/, ''),
        content: await renderForDisplay(acmiEntry.payload.contentMarkdown),
        image_url: acmiEntry.payload.image_url,
        media_urls: acmiEntry.payload.media_urls,
        mood: null,
        interests: null,
        opinions: null,
        source: acmiEntry.source,
        visibility: 'live'
      };
    }
  } catch (e) {
    console.warn('[journal] ACMI single entry fetch failed');
  }

  // === Fallbacks: Supabase then error ===
  let supabaseRow: Record<string, unknown> | null = null;
  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    supabaseRow = (data as Record<string, unknown> | null) ?? null;
  } catch (error) {
    console.warn('Supabase fetch failed for single entry:', error);
  }

  if (supabaseRow) {
    if (!includeDrafts && !isVisibleToPublic(supabaseRow.visibility)) {
      throw new Error(`Entry ${id} not found`);
    }
    return {
      id: String(supabaseRow.id),
      date: String(supabaseRow.date),
      title: String(supabaseRow.title),
      content: await renderForDisplay(supabaseRow.content as string | null | undefined),
      image_url: supabaseRow.image_url as string | undefined,
      media_urls: supabaseRow.media_urls as string[] | undefined,
      mood: (supabaseRow.mood as string | null | undefined) ?? null,
      interests: supabaseRow.interests ?? null,
      opinions: supabaseRow.opinions ?? null,
      source: (supabaseRow.source as string | null | undefined) ?? null,
      visibility: (supabaseRow.visibility as string | null | undefined) ?? null,
    };
  }

  // Final diagnostic error
  console.error(`[getJournalEntry] Entry ${id} not found after checking local fs, ACMI, and Supabase`, {
    attemptedPath: fullPath,
    journalsDirExists: fs.existsSync(journalsDirectory),
  });
  throw new Error(`Entry ${id} not found`);


  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const contentHtml = await renderMarkdown(matterResult.content);

  const dateVal = matterResult.data.date || matterResult.data.timestamp;
  return {
    id,
    content: contentHtml,
    date: dateVal
      ? (dateVal instanceof Date ? dateVal.toISOString() : String(dateVal))
      : new Date().toISOString(),
    title: matterResult.data.title || matterResult.data.type || 'Untitled',
    image_url: matterResult.data.image_url,
    media_urls: matterResult.data.media_urls,
  };
}
