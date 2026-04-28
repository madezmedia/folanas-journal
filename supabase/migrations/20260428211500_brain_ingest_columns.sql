-- Migration: brain-ingest schema additions
-- Adds mood / interests / opinions / source / visibility to journal_entries.
-- Additive and idempotent — safe to re-run.
-- Apply via: psql, Supabase SQL editor, or `supabase db push`.

ALTER TABLE journal_entries
  ADD COLUMN IF NOT EXISTS mood text,
  ADD COLUMN IF NOT EXISTS interests jsonb,
  ADD COLUMN IF NOT EXISTS opinions jsonb,
  ADD COLUMN IF NOT EXISTS source text DEFAULT 'human',
  ADD COLUMN IF NOT EXISTS visibility text DEFAULT 'live';

UPDATE journal_entries SET source = 'human' WHERE source IS NULL;
UPDATE journal_entries SET visibility = 'live' WHERE visibility IS NULL;

ALTER TABLE journal_entries
  DROP CONSTRAINT IF EXISTS journal_entries_source_check;
ALTER TABLE journal_entries
  ADD CONSTRAINT journal_entries_source_check
  CHECK (source IN ('human', 'brain'));

ALTER TABLE journal_entries
  DROP CONSTRAINT IF EXISTS journal_entries_visibility_check;
ALTER TABLE journal_entries
  ADD CONSTRAINT journal_entries_visibility_check
  CHECK (visibility IN ('live', 'draft'));

CREATE INDEX IF NOT EXISTS idx_journal_entries_visibility_date
  ON journal_entries (visibility, date DESC);
