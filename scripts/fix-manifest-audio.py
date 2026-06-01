#!/usr/bin/env python3
"""Remove audioSrc from entries that lack real audio files."""
import re

manifest_path = "/Users/michaelshaw/clawd/apps/folanas-journal/lib/music-manifest.ts"

with open(manifest_path, 'r') as f:
    content = f.read()

before = content.count("audioSrc:")
removed = 0
nl = chr(10)  # newline

# EP1-EP40 (programmatic fallback)
for ep in range(1, 41):
    pattern = "    audioSrc: '/folana/generated/2026-06-01/music/ep" + str(ep) + "[^0-9][^']*.mp3'," + nl
    matches = list(re.finditer(pattern, content))
    for m in reversed(matches):
        before_part = content[:m.start()]
        after_part = content[m.end():]
        content = before_part + "    // audioSrc removed — story-only entry" + nl + after_part
        removed += 1

# EP110-112, EP114-115
for ep in [110, 111, 112, 114, 115]:
    pattern = "    audioSrc: '/folana/generated/[^']+/music/ep" + str(ep) + "[^']*.mp3'," + nl
    m = re.search(pattern, content)
    if m:
        before_part = content[:m.start()]
        after_part = content[m.end():]
        content = before_part + "    // audioSrc removed — file missing" + nl + after_part
        removed += 1

after = content.count("audioSrc:")
print("audioSrc lines: %d -> %d (%d removed)" % (before, after, before - after))

# Fix placeholder durations
fixes = [
    ("ethereal-dispatch", "broll_1779903636.png", "1:11"),
    ("elopement-hope", "uplifting dream pop", "1:20"),
    ("signal-ambient-remix", "Cinematic ambient", "0:33"),
]

for name, context, duration in fixes:
    idx = content.find(context)
    if idx >= 0:
        line_start = content.rfind(nl, 0, idx) + 1
        em_dur = content.find("duration: '", line_start, idx + 500)
        if em_dur >= 0:
            line_end = content.find(nl, em_dur)
            content = content[:em_dur] + "duration: '" + duration + "'" + content[line_end:]
            print("Fixed %s -> %s" % (name, duration))
        else:
            print("No placeholder dur found for %s" % name)
    else:
        print("Context not found for %s" % name)

with open(manifest_path, 'w') as f:
    f.write(content)

ph_count = content.count("duration: '")
print("Remaining duration: ': %d" % ph_count)
