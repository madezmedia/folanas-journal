import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';
import { checkBrainIngestToken, isBrainIngestConfigured } from '@/lib/auth';

function asString(v: unknown): string | null {
  return typeof v === 'string' && v.length > 0 ? v : null;
}

function asInt0to100(v: unknown): number | null {
  if (typeof v !== 'number' || !Number.isFinite(v)) return null;
  const n = Math.round(v);
  if (n < 0 || n > 100) return null;
  return n;
}

export async function PUT(req: Request) {
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

  const id = asString(body.id) ?? 'folana';

  const update: Record<string, unknown> = { id };
  const display_name = asString(body.display_name);
  if (display_name !== null) update.display_name = display_name;
  const handle = asString(body.handle);
  if (handle !== null) update.handle = handle;
  const avatar_url = asString(body.avatar_url);
  if (avatar_url !== null) update.avatar_url = avatar_url;
  const hero_image_url = asString(body.hero_image_url);
  if (hero_image_url !== null) update.hero_image_url = hero_image_url;
  const reach_label = asString(body.reach_label);
  if (reach_label !== null) update.reach_label = reach_label;
  const influence_label = asString(body.influence_label);
  if (influence_label !== null) update.influence_label = influence_label;
  const synthetic_resonance = asInt0to100(body.synthetic_resonance);
  if (synthetic_resonance !== null) update.synthetic_resonance = synthetic_resonance;
  const holographic_engagement = asInt0to100(body.holographic_engagement);
  if (holographic_engagement !== null) update.holographic_engagement = holographic_engagement;
  const bio = asString(body.bio);
  if (bio !== null) update.bio = bio;
  if (body.metrics !== undefined) update.metrics = body.metrics;
  if (body.compositions !== undefined) update.compositions = body.compositions;
  update.updated_at = new Date().toISOString();

  try {
    const { error } = await supabase.from('profile_signals').upsert(update);
    if (error) throw error;

    revalidatePath('/');

    return NextResponse.json({ message: 'Profile signals updated', id }, { status: 200 });
  } catch (error) {
    console.error('profile_signals upsert failed:', error);
    return NextResponse.json({ message: 'Failed to update profile signals' }, { status: 500 });
  }
}
