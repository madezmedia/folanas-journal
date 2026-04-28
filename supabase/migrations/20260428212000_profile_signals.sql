-- Migration: profile_signals
-- Replaces hardcoded sidebar/hero literals in app/page.tsx and app/entries/[id]/page.tsx.
-- Single-row by convention (id='folana'); table keyed for future multi-persona.
-- Idempotent: re-running is a no-op.

CREATE TABLE IF NOT EXISTS profile_signals (
  id                     text PRIMARY KEY DEFAULT 'folana',
  display_name           text NOT NULL DEFAULT 'Folana',
  handle                 text NOT NULL DEFAULT '@folana_music',
  avatar_url             text,
  hero_image_url         text,
  reach_label            text,
  influence_label        text,
  synthetic_resonance    int CHECK (synthetic_resonance IS NULL OR (synthetic_resonance BETWEEN 0 AND 100)),
  holographic_engagement int CHECK (holographic_engagement IS NULL OR (holographic_engagement BETWEEN 0 AND 100)),
  bio                    text,
  metrics                jsonb,
  compositions           jsonb,
  updated_at             timestamptz NOT NULL DEFAULT now()
);

INSERT INTO profile_signals (
  id, display_name, handle, avatar_url, hero_image_url,
  reach_label, influence_label, synthetic_resonance, holographic_engagement
) VALUES (
  'folana',
  'Folana',
  '@folana_music',
  'https://postiz-u70402.vm.elestio.app/uploads/2026/04/24/338be49529109b88963192943e612086c.jpg',
  'https://postiz-u70402.vm.elestio.app/uploads/2026/04/24/338be49529109b88963192943e612086c.jpg',
  '4.5M',
  '+32%',
  88,
  64
)
ON CONFLICT (id) DO NOTHING;
