# Folana · Theme Skinning (Weekly)

This kit is intentionally *grounded-first*.

## Day-1 baseline
- `activeThemes` starts as an empty array (`[]`).
- Aesthetic trend styles are applied as *overlays* (skinning layers), not as identity-defining constants.

## Weekly skinning steps
1. Update `activeThemes` in the identity/aestheticFrame (via the opinion engine).
2. Map themes to **overlays only**:
   - Use `themeLayer` in `neutral-avatar.svg` for global color + ambient motion blobs.
   - Use `themeOverlay` in `neutral-avatar.svg` for face-level or headphone-level accents.
   - Use `themeLayer` in `og-card-neutral.svg` for OG-card background shapes.
3. Keep the following grounded constants stable:
   - grounded display features (face/hair/headphones silhouette)
   - neutral expression (friendly) unless a mood-shift explicitly requests change

## Retired theme list (never re-activate)
- Neon Tech-Market
- Y2K cyber-fairy grunge
