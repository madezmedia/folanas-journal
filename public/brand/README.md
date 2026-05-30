# Folana Visual Brand Kit (Neutral Baseline)

This folder contains a **day-1 neutral baseline** visual kit for Folana.

## Pivot rule (non-negotiable)
Per `agents/folana/MEMORY-ARCHITECTURE.md` §1.2:
- Start with `activeThemes: []`
- Put any “trend/cyber” look behind **skin overrides** only
- Baseline must remain grounded and authentic (Brooklyn producer/artist), with natural lighting in the design language.

## Tokens
`tokens/brand-tokens.json`
- `color.base.*` — permanent palette
- `color.semantic.*` — mood semantics
- `color.trend-overlay.*` — **intentionally empty** (theme skinning inputs)

## Assets
- `svg/wordmark.svg`
- `svg/glyph.svg`
- `svg/avatar-placeholder.svg` (structural placeholder; raster avatar is generated elsewhere)
- `svg/og-card-template.svg`
- `svg/favicon-*.svg`

Raster outputs live in `png/` (same names).

## Skinning (weekly)
At render time, override CSS custom properties (theme skin) using the trend ingestion output:
- Populate `--trend-theme-primary`, `--trend-theme-secondary`, `--trend-theme-accent`
- Map them into the UI’s theme layer

**Do not** hardcode any cyber/Y2K/neon frames into the baseline assets. If a theme is trending, apply it as a skin.
