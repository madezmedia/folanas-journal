import { supabase } from './supabase';

export interface ProfileSignals {
  id: string;
  display_name: string;
  handle: string;
  avatar_url: string;
  hero_image_url: string;
  reach_label: string | null;
  influence_label: string | null;
  synthetic_resonance: number | null;
  holographic_engagement: number | null;
  bio: string | null;
  metrics: unknown;
  compositions: unknown;
}

const DEFAULT_PROFILE: ProfileSignals = {
  id: 'folana',
  display_name: 'Folana',
  handle: '@folana_music',
  avatar_url: 'https://postiz-u70402.vm.elestio.app/uploads/2026/04/24/338be49529109b88963192943e612086c.jpg',
  hero_image_url: 'https://postiz-u70402.vm.elestio.app/uploads/2026/04/24/338be49529109b88963192943e612086c.jpg',
  reach_label: '4.5M',
  influence_label: '+32%',
  synthetic_resonance: 88,
  holographic_engagement: 64,
  bio: null,
  metrics: null,
  compositions: null,
};

function asString(v: unknown, fallback: string): string {
  return typeof v === 'string' && v.length > 0 ? v : fallback;
}

function asMaybeString(v: unknown): string | null {
  return typeof v === 'string' && v.length > 0 ? v : null;
}

function asMaybeNumber(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

export async function getProfileSignals(id: string = 'folana'): Promise<ProfileSignals> {
  try {
    const { data, error } = await supabase
      .from('profile_signals')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    if (data) {
      const row = data as Record<string, unknown>;
      return {
        id: asString(row.id, DEFAULT_PROFILE.id),
        display_name: asString(row.display_name, DEFAULT_PROFILE.display_name),
        handle: asString(row.handle, DEFAULT_PROFILE.handle),
        avatar_url: asString(row.avatar_url, DEFAULT_PROFILE.avatar_url),
        hero_image_url: asString(row.hero_image_url, DEFAULT_PROFILE.hero_image_url),
        reach_label: asMaybeString(row.reach_label) ?? DEFAULT_PROFILE.reach_label,
        influence_label: asMaybeString(row.influence_label) ?? DEFAULT_PROFILE.influence_label,
        synthetic_resonance: asMaybeNumber(row.synthetic_resonance) ?? DEFAULT_PROFILE.synthetic_resonance,
        holographic_engagement: asMaybeNumber(row.holographic_engagement) ?? DEFAULT_PROFILE.holographic_engagement,
        bio: asMaybeString(row.bio),
        metrics: row.metrics ?? null,
        compositions: row.compositions ?? null,
      };
    }
  } catch (err) {
    console.warn('profile_signals read failed; using defaults:', err);
  }
  return DEFAULT_PROFILE;
}
