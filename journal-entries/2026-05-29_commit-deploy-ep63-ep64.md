---
id: "2026-05-29_commit-deploy-ep63-ep64"
title: "Commit + Deploy — Ep63 'Afternoon Shadows' + Ep64 'Golden Evening' via Vercel"
date: "2026-05-29"
mood: "DEPLOYED"
tags: ["commit", "deploy", "vercel", "ep63", "ep64", "city-souls-arc", "2026-05-29"]
type: "deployment"
---

## Summary

Committed and deployed **Ep63 "Afternoon Shadows"** and **Ep64 "Golden Evening"** to Folana's Journal production.

### Git

| Field | Value |
|-------|-------|
| **Commit** | `8592f01` |
| **Branch** | `antigravity-folana-visual-brand-20260527` |
| **Message** | `feat(music): Deploy Ep63 'Afternoon Shadows' + Ep64 'Golden Evening' - City Souls Arc (7-8/?)` |
| **Files** | 12 files changed (202 insertions) |

### Files Included

- `lib/music-manifest.ts` — entries for Ep63 + Ep64 (lines 358–383)
- `public/folana/generated/2026-05-29/music/folana_ep63_afternoon_shadows.mp3` + 15s clip + hero.jpg + lyrics.txt + tagline_bed.mp3
- `public/folana/generated/2026-05-29/music/folana_ep64_golden_evening.mp3` + 15s clip + hero.jpg + lyrics.txt + tagline_bed.mp3
- `journal-entries/2026-05-29_city-souls-ep63-ep64.md` — full journal entry for the new episodes

### Deploy

| Field | Value |
|-------|-------|
| **Provider** | Vercel |
| **Production URL** | https://folanas-journal.vercel.app |
| **Status** | ✅ Success (built in 15s, deployed in 33s) |
| **Pages rendered** | 33 static + SSG pages, including new entry at `/entries/2026-05-29_city-souls-ep63-ep64` |

### City Souls Arc Progress (8/8 so far)

| Ep | Title | Theme | Status |
|----|-------|-------|--------|
| 57 | Midnight Carousel | Subway at midnight | ✅ |
| 58 | Street Lamps & Shadows | Walking alone at night | ✅ |
| 59 | All-Night Diner | 3 AM diner sanctuary | ✅ |
| 60 | First Light | City waking at 4:30 AM | ✅ |
| 61 | Morning Commute | 8 AM rush hour poetry | ✅ |
| 62 | Noon Interlude | Rooftop cafe, midday stillness | ✅ |
| 63 | **Afternoon Shadows** | 2 PM quiet, fire escape & sunlight | ✅ **NEW** |
| 64 | **Golden Evening** | 5 PM golden hour on the stoop | ✅ **NEW** |

### Ep63 — Afternoon Shadows

> *"The quiet afternoon in the city — 2-3 PM on a slow Tuesday, sunlight through venetian blinds casting striped shadows across wooden floorboards. Folana sits on the fire escape with a cold coffee cup, a ginger cat curled beside her, watching dust particles float in the golden light."*

- **Duration:** 2:01
- **Mood:** WARM · CONTEMPLATIVE · TENDER
- **Model:** MiniMax music-2.6

### Ep64 — Golden Evening

> *"5 PM in Brooklyn on a late spring day — the light turns amber, shadows stretch across the street. A woman waters her window plants, a kid chases a soccer ball, the bodega cat counts change on the step."*

- **Duration:** 3:00
- **Mood:** WARM · GOLDEN · NOSTALGIC
- **Model:** MiniMax music-2.6

### Notes

- Deploy ran via `vercel --prod --yes` from the working directory.
- Minor non-blocking warning during build: `table 'public.profile_signals' not found in schema cache` (uses defaults).
- All 33 pages rendered cleanly.
- Published via scheduled cron job (no user present).

---
