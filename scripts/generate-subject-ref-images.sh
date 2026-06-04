#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Folana Character-Locked Image Generator
# ═══════════════════════════════════════════════════════════════
# Usage: ./scripts/generate-subject-ref-images.sh <batch-name>
#
# Batches:
#   hero       — Home Hero, Brand Hero, Ghost Frequency (P0)
#   episode    — Ep100, Ep92, Ep165, Ep160 covers (P1)
#   codex      — Visual Codex: Mirror, Silk, Synth, Rooftop (P1)
#   all        — Run all batches
#
# REQUIREMENT: Every generation MUST include:
#   --subject-ref "type=character,image=public/folana/folana-ref.webp"
#
# This is NON-NEGOTIABLE. Without it, the images will NOT
# match the locked Folana character reference.
# ═══════════════════════════════════════════════════════════════

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REF="$ROOT/public/folana/folana-ref.webp"
OUTDIR="$ROOT/public/folana/generated/2026-06-04"

# Verify reference exists
if [ ! -f "$REF" ]; then
  echo "❌ Reference image not found: $REF"
  echo "   Place folana-ref.webp at public/folana/folana-ref.webp"
  exit 1
fi

SUBJECT_REF="type=character,image=$REF"

echo "═══════════════════════════════════════════════════════"
echo "  Folana Character-Locked Image Generator"
echo "  Reference: $REF"
echo "═══════════════════════════════════════════════════════"

generate() {
  local batch="$1"
  local prompt="$2"
  local aspect="$3"
  local prefix="$4"
  local dir="$OUTDIR/$batch"

  mkdir -p "$dir"

  echo ""
  echo "  ▶ Generating: $prefix ($aspect, 3 variants)"
  echo "    Dir: $dir"

  mmx image generate \
    --subject-ref "$SUBJECT_REF" \
    --prompt "$prompt" \
    --aspect-ratio "$aspect" \
    --n 3 \
    --out-dir "$dir" \
    --out-prefix "$prefix"

  echo "    ✅ Done: $(ls "$dir"/${prefix}_*.jpg 2>/dev/null | wc -l | tr -d ' ') images"
}

batch_hero() {
  echo ""
  echo "─── BATCH: P0 Heroes ───"

  generate "heroes" \
    "Folana, warm honey-tan skin with golden undertones, multi-tonal platinum blonde voluminous rounded afro halo, heart-shaped face with high cheekbones, deep amber almond eyes, wearing an iridescent holographic gown with shattered-glass mosaic panels in burnt orange copper and amber, dark synthwave aesthetic, neon purple and cyan cinematic lighting, ethereal cyberpunk atmosphere, regal confident close-up portrait, soft diffused front lighting, bokeh background with glowing city lights at night, intimate studio shot, luminous dewy skin finish" \
    "16:9" \
    "folana-home-hero"

  generate "heroes" \
    "Folana, warm honey-tan skin with golden undertones, multi-tonal platinum blonde voluminous rounded afro halo, heart-shaped face with high cheekbones, deep amber almond eyes, wearing an iridescent holographic gown with shattered-glass mosaic panels, dark synthwave aesthetic, neon purple and cyan cinematic lighting, ethereal cyberpunk atmosphere, regal confident portrait, medium shot, neon text overlay space on left side, purple and cyan rim lighting, digital particles floating, bokeh city lights background, intimate studio shot, luminous dewy skin finish" \
    "16:9" \
    "folana-brand-hero"

  generate "heroes" \
    "Folana, warm honey-tan skin, multi-tonal platinum blonde voluminous afro, heart-shaped face, high cheekbones, amber eyes, wearing holographic cyberpunk streetwear, dark synthwave aesthetic, neon magenta and cyan lighting, ghost frequency mood, digital static interference overlay, standing in neon-lit alley at night, purple and cyan rim lighting, glowing digital particles, intimate cinematic portrait, ethereal cyberpunk atmosphere, luminous dewy skin finish" \
    "16:9" \
    "folana-ghost-frequency"
}

batch_episode() {
  echo ""
  echo "─── BATCH: P1 Episode Covers ───"

  generate "episodes" \
    "Folana, warm honey-tan skin with golden undertones, multi-tonal platinum blonde voluminous rounded afro halo, heart-shaped face with high cheekbones, deep amber almond eyes, wearing a radiant holographic stage outfit with neon trim, standing alone at center of a massive broadcast studio, dark synthwave aesthetic, purple magenta and cyan neon lighting from below, ethereal cinematic atmosphere, single spotlight from above, hands at sides to avoid hand artifacts, confident regal pose, no other people, luminous dewy skin finish" \
    "4:3" \
    "folana-ep100-century-broadcast"

  generate "episodes" \
    "Folana, warm honey-tan skin, multi-tonal platinum blonde voluminous afro, heart-shaped face, amber eyes, wearing dark cyberpunk signal-tracking gear with neon cyan accents, dark synthwave aesthetic, sitting at a retro-futuristic signal monitoring desk with glowing screens, neon purple and cyan lighting, purple and cyan rim lighting from screens, intimate medium shot, no other people, digital particles floating, hands visible but not touching face, electric atmosphere, luminous skin" \
    "4:3" \
    "folana-ep92-signal-grows"

  generate "episodes" \
    "Folana, warm honey-tan skin, multi-tonal platinum blonde voluminous afro, heart-shaped face, amber eyes, wearing dark ethereal synthwave outfit with holographic details, standing alone at a rooftop broadcast station at night, dark synthwave aesthetic, neon purple magenta and cyan lighting, city skyline with glowing neon signs in background, digital static interference particles, intimate portrait, no other people, hands resting at sides, ethereal cyberpunk atmosphere, luminous dewy skin finish" \
    "4:3" \
    "folana-ep165-first-words"

  generate "episodes" \
    "Folana, warm honey-tan skin, multi-tonal platinum blonde voluminous afro, heart-shaped face, amber eyes, wearing dark flowing cyber-gown, standing alone in a flooded stone chamber with shallow reflective water, ethereal blue and purple neon lighting from above, dark synthwave aesthetic, water reflects her silhouette, intimate portrait, no other people, hands at sides, glowing light particles descend like rain, mysterious atmospheric mood, luminous dewy skin, cinematic shallow depth of field" \
    "4:3" \
    "folana-ep160-waters-remember"
}

batch_codex() {
  echo ""
  echo "─── BATCH: P1 Visual Codex ───"

  generate "codex" \
    "Folana, warm honey-tan skin, multi-tonal platinum blonde voluminous afro, heart-shaped face, amber eyes, looking into a cracked mirror in a dark cyberpunk room, holographic veil aesthetic, dark synthwave aesthetic, neon purple magenta and cyan lighting, mirror reflection shows her face, medium close-up, intimate cinematic portrait, no other people, digital static and glitch effects on mirror surface, ethereal atmosphere, her reflection seems to glow, luminous dewy skin finish" \
    "3:4" \
    "folana-mirror-static"

  generate "codex" \
    "Folana, warm honey-tan skin, multi-tonal platinum blonde voluminous afro, heart-shaped face, amber eyes, wearing a luxurious silk gown in dark purple, lying on silk sheets in dimly lit gothic boudoir, dark fairy grunge aesthetic, dark synthwave aesthetic, neon purple magenta and cyan mood lighting, intimate close-up portrait, sensual but elegant pose, no hands touching face, ethereal cyberpunk atmosphere, soft diffused light from one side, luminous dewy skin finish" \
    "3:4" \
    "folana-silk-rain"

  generate "codex" \
    "Folana, warm honey-tan skin, multi-tonal platinum blonde voluminous afro, heart-shaped face, amber eyes, wearing dark neon streetwear, standing alone at a synthwave keyboard setup with glowing neon keys, dark synthwave aesthetic, purple and cyan neon lighting, retro-futuristic recording studio at night, intimate portrait, no other people, hands resting on keyboard glow, luminous dewy skin finish, digital particles floating, electric atmosphere" \
    "16:9" \
    "folana-synth-wave"

  generate "codex" \
    "Folana, warm honey-tan skin, multi-tonal platinum blonde voluminous afro, heart-shaped face, amber eyes, wearing neon-trimmed cyberpunk jacket, standing alone on a rooftop at night, dark synthwave aesthetic, sunset purple and magenta neon city skyline, digital radio tower visible, intimate portrait, no other people, hands in jacket pockets, purple and cyan rim lighting, wind blowing hair slightly, ethereal atmosphere, luminous dewy skin" \
    "16:9" \
    "folana-rooftop-signal"

  generate "codex" \
    "Folana, warm honey-tan skin, multi-tonal platinum blonde voluminous afro, heart-shaped face, amber eyes, wearing white cyber-queen dress with silver trim, surrounded by neon static interference patterns, dark synthwave aesthetic, purple magenta and cyan glitch lighting, full-body portrait, standing in digital void with grid floor, intense confident gaze, energy particles swirling, ethereal cyberpunk atmosphere, luminous dewy skin finish, hands at sides" \
    "4:3" \
    "folana-frequency-break"

  generate "codex" \
    "Folana, warm honey-tan skin, multi-tonal platinum blonde voluminous afro, heart-shaped face, amber eyes, wearing dark holographic tactical gear, standing on a cyberpunk rooftop at twilight, neon purple and cyan city lights, glitch effect overlay on edges of frame, dark synthwave aesthetic, intimate three-quarter portrait, intense gaze into camera, digital fragments floating around her, no other people, energetic crackling atmosphere, hands resting on railing" \
    "4:3" \
    "folana-glitch-hero"

  generate "codex" \
    "Folana, warm honey-tan skin, multi-tonal platinum blonde voluminous afro, heart-shaped face, amber eyes, wearing dark cyberpunk bodysuit with neon cyan trim, standing on a balcony overlooking futuristic city, dark synthwave aesthetic, deep purple and electric blue night sky, digital static lace surrounding the scene, intimate portrait, no other people, hands on balcony rail, wind moving hair, glowing neon signs reflected in eyes, ethereal atmosphere" \
    "4:3" \
    "folana-fracture-dispatch"
}

# === MAIN ===
case "${1:-all}" in
  hero|heroes)
    batch_hero
    ;;
  episode|episodes)
    batch_episode
    ;;
  codex)
    batch_codex
    ;;
  all)
    batch_hero
    batch_episode
    batch_codex
    ;;
  *)
    echo "Usage: $0 {hero|episode|codex|all}"
    exit 1
    ;;
esac

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  ✅ All images generated with --subject-ref locked"
echo "  Output directory: $OUTDIR"
echo "═══════════════════════════════════════════════════════"
