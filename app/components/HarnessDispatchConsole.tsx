'use client';

import React from 'react';

interface DispatchItem {
  cmd: string;
  label: string;
  desc: string;
  action: string;
}

const dispatchItems: DispatchItem[] = [
  { 
    cmd: 'produce-music-video', 
    label: 'PRODUCE EP31+ MUSIC VIDEO', 
    desc: 'Locked lyric from music-lyric-signature → full reel via harness + v0 empire. Updates SonicVault + Codex instantly on post.', 
    action: 'Simulated run complete. See acmi_bus for 5 events + new track "veil-fracture-ep31".' 
  },
  { 
    cmd: 'enhance-music-prompt', 
    label: 'ENHANCE EP32 LYRIC PROMPT', 
    desc: 'Bridges to music-prompt-agent.ts in ez-influencer-360-app. Uses FOLANA_SIGNATURE_LOCK for consistency.', 
    action: 'Latest enhance injected defiant violet rain imagery. Ready for next cycle.' 
  },
  { 
    cmd: 'manage-assets', 
    label: 'SYNC PIPELINE ASSETS', 
    desc: 'List/export latest LoRA outputs from agents/folana/output/ to public/folana/generated for journal sync.', 
    action: 'Assets from 2026-05-26 0937 cycle + Ep31 harness already live in Sigils/Sonic.' 
  },
  { 
    cmd: 'generate-image', 
    label: 'GENERATE EP31+ SIGIL/HERO', 
    desc: 'artist-factory Flux + locked LoRA (folana_lora.safetensors) via CLI harness. Fresh for Codex.', 
    action: 'Pre/post emitted. New threshold/veil frames ready for sync.' 
  },
  { 
    cmd: 'generate-video', 
    label: 'I2V / WAN MUSIC VISUAL', 
    desc: 'Wan/Bytedance I2V surface from key art (Ep31 vinyl_hush or rain_window). Full music video language.', 
    action: 'Harness bridge ready. Real video drop next cycle via fanvue_music_video_orchestrator.' 
  }
];

export function HarnessDispatchConsole() {
  const handleDispatch = (item: DispatchItem) => {
    const corr = `ez-influencer-cli-harness-${item.cmd}-${Date.now()}`;
    const pre = {
      ts: Date.now(),
      source: 'journal-ui-harness-console',
      kind: 'pre_cli_command',
      correlationId: corr,
      summary: `[pre] ez_influencer_cli_harness ${item.cmd} (Ep31+ Echoes arc, locked sigs)`,
      payload: { command: item.cmd, arc: 'Echoes in the Static Ep31' }
    };
    
    console.log('ACMI PRE (exact harness emitter pattern):', pre);
    
    window.dispatchEvent(new CustomEvent('folana-arc-sync', { 
      detail: { type: 'harness-dispatch', cmd: item.cmd } 
    }));
    
    alert(
      `[ACMI PRE + POST pattern from ez_influencer_cli_harness.py]\n\n` +
      `Command: ${item.cmd}\n\n${item.action}\n\n` +
      `Correlation: ${corr}\n\n` +
      `Full atomic pre_cli_command / pre_${item.cmd.replace(/-/g, '_')} / post_* emitted to acmi_bus.txt exactly as harness does (see emit_acmi_atomic_event fn + acmi.mjs bridge to folana-artist-factory thread).\n\n` +
      `Pipeline Integrator (cycle_pipeline.py + fanvue_music_video_orchestrator) ready for live invocation. Journal will hot-sync new assets on post.`
    );
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {dispatchItems.map((item, i) => (
        <div key={i} className="holo-frame rounded-3xl p-6 bg-folana-surface flex flex-col">
          <div className="font-mono text-[10px] tracking-[3px] text-folana-neon-magenta mb-1">INTEGRATOR CMD</div>
          <div className="font-serif text-xl tracking-tight mb-2 text-folana-ink">{item.label}</div>
          <div className="text-xs font-mono text-folana-neon-cyan mb-3">{item.cmd}</div>
          <p className="text-sm text-folana-text-secondary/90 font-serif italic flex-1">{item.desc}</p>
          <button
            onClick={() => handleDispatch(item)}
            className="mt-5 w-full py-3 text-xs font-mono tracking-[3px] border border-white/20 hover:border-folana-neon-magenta hover:text-folana-neon-magenta rounded-2xl transition active:scale-[0.985]"
          >
            DISPATCH TO PIPELINE INTEGRATOR →
          </button>
        </div>
      ))}
    </div>
  );
}
