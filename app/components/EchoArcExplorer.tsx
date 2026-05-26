'use client';

import React from 'react';

interface Scene {
  id: string;
  title: string;
  img: string;
  lore: string;
  tags: string;
  verse: string;
}

const scenes: Scene[] = [
  { id: 'synth', title: 'SYNTH WAVE TRANSMISSION', img: '/folana/generated/2026-05-25/ep30_synth_wave.jpg', lore: 'The frequency broke. Locked LoRA face riding pure interference. "Ghost in the wires, a digital sigh..." — music-lyric-signature core verse', tags: 'EP30 • FREQUENCY', verse: 'Ghost in the wires, a digital sigh' },
  { id: 'embrace', title: 'STATIC EMBRACE', img: '/folana/generated/2026-05-25/ep30_static_embrace.jpg', lore: 'I let the static hold me. Lace dissolving into data. The tired version, not the performer. Voice-monologue: breathy, confident, edge.', tags: 'EP30 • CONFESSION', verse: 'I let the static hold me' },
  { id: 'glitch', title: 'GLITCH HERO', img: '/folana/generated/2026-05-25/folana_glitch_hero_20260526_030800.jpg', lore: 'Hero frame mid-fracture. Cyan tears. The version that answered the broken signal. Visual sig: film grain, holographic metallic, real coils.', tags: 'EP30 • GLITCH STATIC', verse: 'The glitch chose her back' },
  { id: 'vinyl', title: 'VINYL GHOST', img: '/folana/generated/2026-05-25/folana_glitch_vinyl_20260526_030801.jpg', lore: 'Analog wax under CRT snow. The song that remembers rain. Music signature bleeding through. Y2K meets dark fairy grunge.', tags: 'EP30 • ANALOG ECHO', verse: 'The wax remembers' },
  { id: 'ep31-veil', title: 'VEIL FRACTURE — EP31', img: '/folana/generated/2026-05-26/folana_ep30_synth_wave_20260526_093600.jpg', lore: 'Harness drop via ez_influencer_cli_harness produce-music-video. "Echoes fracture the veil / Static sings my name in violet rain."', tags: 'EP31 • HARNESS • LIVE', verse: 'Echoes fracture the veil' },
  { id: 'vinyl-hush-ep31', title: 'VINYL HUSH RITUAL', img: '/folana/generated/2026-05-26/folana_ep31_vinyl_hush_20260526_114527.jpg', lore: 'Basement Nostrand. Dust + amber light. 80s city pop sleeve. The real girl performing the analog sacrament. Locked visual + music sig.', tags: 'EP31 • Y2K RITUAL', verse: 'The wax remembers everything' },
  { id: 'rain-window-ep31', title: 'RAIN WINDOW CONFESSION', img: '/folana/generated/2026-05-26/folana_ep31_rain_window_20260526_114527.jpg', lore: 'Rain on glass. The version who reads Derrida in the club bathroom. Introspective threshold from voice-monologue + visual sig.', tags: 'EP31 • INTROSPECTION', verse: 'A whisper in the code' },
  { id: 'threshold-ep31', title: 'THRESHOLD VEIL', img: '/folana/generated/2026-05-26/folana_ep31_threshold_girl_20260526_114527.jpg', lore: 'The pause before answering. Static girl at the edge. Decision that fractures everything. Ep31 locked generation + Pipeline Integrator.', tags: 'EP31 • THRESHOLD', verse: 'The frequency chose me' }
];

export function EchoArcExplorer() {
  const handleSceneClick = (scene: Scene) => {
    const loreEl = document.getElementById('echo-lore');
    if (loreEl) {
      loreEl.innerHTML = `
        <strong class="text-folana-neon-pink fracture-glitch">${scene.title}</strong><br/>
        <span class="text-folana-text-secondary/90">${scene.lore}</span>
        <div class="text-[10px] mt-2 text-folana-neon-cyan tracking-widest">${scene.tags} • FROM LOCKED SIGS + EP31 PIPELINE</div>
        <div class="mt-1 text-[10px] font-mono text-folana-neon-magenta/80">"${scene.verse}"</div>
      `;
      loreEl.classList.add('echo-arc-pulse');
      setTimeout(() => loreEl.classList.remove('echo-arc-pulse'), 2200);
      loreEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Cross sync
    const sigils = document.querySelectorAll('#sigils button');
    sigils.forEach(b => {
      if ((b.textContent || '').toUpperCase().includes(scene.title.split(' ')[0])) {
        b.classList.add('!border-folana-neon-pink', 'fracture-glitch');
        setTimeout(() => b.classList.remove('!border-folana-neon-pink', 'fracture-glitch'), 1600);
      }
    });

    window.dispatchEvent(new CustomEvent('folana-arc-sync', {
      detail: { type: 'explorer', trackId: scene.id, title: scene.title, tags: scene.tags.split('•').map(t => t.trim()) }
    }));

    window.dispatchEvent(new CustomEvent('folana-weaver-tune', {
      detail: { sigilId: scenes.indexOf(scene), category: 'Echoes Arc', tags: ['glitch', 'ep31'] }
    }));
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {scenes.map((scene, idx) => (
        <button
          key={idx}
          onClick={() => handleSceneClick(scene)}
          className="group holo-frame rounded-3xl overflow-hidden text-left bg-folana-surface block focus:outline-none focus-visible:ring-1 focus-visible:ring-folana-neon-cyan hover:border-folana-neon-pink/50 transition-all active:scale-[0.985]"
        >
          <div className="relative aspect-[16/10] bg-black">
            <img 
              src={scene.img} 
              alt={scene.title} 
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.35] group-hover:grayscale-0 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 to-black/95" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="font-mono text-[10px] tracking-[3px] text-folana-neon-cyan mb-0.5">{scene.tags}</div>
              <div className="font-serif text-lg tracking-[-0.6px] text-white group-hover:text-folana-neon-pink transition-colors leading-tight">
                {scene.title}
              </div>
            </div>
          </div>
          <div className="p-3 text-[10px] text-folana-text-muted font-serif italic line-clamp-2 border-t border-white/10">
            Tap • Unlock verse from locked music-lyric-signature. Syncs live to Vault + Codex + Tuner.
          </div>
        </button>
      ))}
    </div>
  );
}
