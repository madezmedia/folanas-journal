import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { supabase } from './supabase';

const journalsDirectory = path.join(process.cwd(), 'journal-entries');

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  image_url?: string;
  media_urls?: string[];
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

export async function getSortedJournalEntries(): Promise<JournalEntry[]> {
  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      return await Promise.all(
        data.map(async (entry) => ({
          id: entry.id,
          date: entry.date,
          title: entry.title,
          content: await renderForDisplay(entry.content),
          image_url: entry.image_url,
          media_urls: entry.media_urls,
        }))
      );
    }
  } catch (error) {
    console.warn('Supabase fetch failed, falling back to filesystem:', error);
  }

  if (!fs.existsSync(journalsDirectory)) return [];

  const fileNames = fs.readdirSync(journalsDirectory);
  const allEntriesData = await Promise.all(
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
      };
    })
  );

  return allEntriesData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getJournalEntry(id: string): Promise<JournalEntry> {
  try {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    if (data) {
      return {
        id: data.id,
        date: data.date,
        title: data.title,
        content: await renderForDisplay(data.content),
        image_url: data.image_url,
        media_urls: data.media_urls,
      };
    }
  } catch (error) {
    console.warn('Supabase fetch failed, falling back to filesystem:', error);
  }

  const fullPath = path.join(journalsDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Entry ${id} not found`);
  }

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
