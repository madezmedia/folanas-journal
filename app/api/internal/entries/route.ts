import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';
import { checkBrainIngestToken, isBrainIngestConfigured } from '@/lib/auth';

const ALLOWED_SOURCES = new Set(['human', 'brain']);
const ALLOWED_VISIBILITIES = new Set(['live', 'draft']);

function asString(v: unknown): string | null {
  return typeof v === 'string' && v.length > 0 ? v : null;
}

export async function POST(req: Request) {
  if (!isBrainIngestConfigured()) {
    return NextResponse.json(
      { message: 'BRAIN_INGEST_TOKEN not configured on server (need >=16 chars)' },
      { status: 503 }
    );
  }
  if (!checkBrainIngestToken(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  const title = asString(body.title);
  const date = asString(body.date);
  const content = asString(body.content);
  const mood = asString(body.mood);
  const sourceRaw = asString(body.source) ?? 'brain';
  const visibilityRaw = asString(body.visibility) ?? 'draft';
  const interests = body.interests ?? null;
  const opinions = body.opinions ?? null;

  if (!title || !date || !content) {
    return NextResponse.json(
      { message: 'Missing required fields: title, date, content' },
      { status: 400 }
    );
  }
  if (!ALLOWED_SOURCES.has(sourceRaw)) {
    return NextResponse.json(
      { message: `Invalid source (allowed: ${[...ALLOWED_SOURCES].join(', ')})` },
      { status: 400 }
    );
  }
  if (!ALLOWED_VISIBILITIES.has(visibilityRaw)) {
    return NextResponse.json(
      { message: `Invalid visibility (allowed: ${[...ALLOWED_VISIBILITIES].join(', ')})` },
      { status: 400 }
    );
  }

  const slug = `${date}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '')}`;

  try {
    const { error } = await supabase
      .from('journal_entries')
      .upsert({
        id: slug,
        title,
        date,
        content,
        mood,
        interests,
        opinions,
        source: sourceRaw,
        visibility: visibilityRaw,
      });

    if (error) throw error;

    if (visibilityRaw === 'live') {
      revalidatePath('/');
      revalidatePath(`/entries/${slug}`);
    }

    return NextResponse.json(
      { message: 'Entry ingested', id: slug, source: sourceRaw, visibility: visibilityRaw },
      { status: 201 }
    );
  } catch (error) {
    console.error('Brain ingest failed:', error);
    return NextResponse.json({ message: 'Failed to ingest entry' }, { status: 500 });
  }
}
