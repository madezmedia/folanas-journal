'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TunerParam {
  label: string;
  key: string;
  min: number;
  max: number;
  step: number;
  default: number;
  unit?: string;
  description: string;
}

const PARAMS: TunerParam[] = [
  { label: 'RESONANCE', key: 'resonance', min: 12, max: 98, step: 1, default: 71, description: 'Core frequency alignment with the wires' },
  { label: 'GLITCH INTENSITY', key: 'glitch', min: 0, max: 100, step: 1, default: 34, description: 'Static interference & chromatic tearing' },
  { label: 'HOLO DEPTH', key: 'holo', min: 8, max: 96, step: 1, default: 63, description: 'Iridescent layering and light refraction' },
  { label: 'FAIRY VEIL', key: 'veil', min: 15, max: 100, step: 1, default: 58, description: 'Lace density & dark romantic texture' },
];

export function StaticTuner() {
  const [params, setParams] = useState(() => {
    const initial: Record<string, number> = {};
    PARAMS.forEach(p => initial[p.key] = p.default);
    return initial;
  });
  const [isLocked, setIsLocked] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const updateParam = (key: string, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  // Beautiful real-time reactive visualizer
  const drawTunerViz = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;
    const t = Date.now() / 1000;

    ctx.clearRect(0, 0, cw, ch);

    const res = params.resonance / 100;
    const glitch = params.glitch / 100;
    const holo = params.holo / 100;
    const veil = params.veil / 100;

    // Deep void
    ctx.fillStyle = '#050507';
    ctx.fillRect(0, 0, cw, ch);

    // Central holographic orb — reacts to all params
    const cx = cw / 2;
    const cy = ch / 2 + 12;
    const baseR = Math.min(cw, ch) * 0.26;

    // Outer holo rings
    for (let i = 0; i < 5; i++) {
      const r = baseR * (0.75 + i * 0.13) + Math.sin(t * 1.2 + i) * (glitch * 8);
      const alpha = (0.12 - i * 0.018) * holo;
      
      ctx.strokeStyle = `hsla(${320 + i * 18}, 92%, 74%, ${alpha})`;
      ctx.lineWidth = 1.5 + holo * 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Core pulsing orb
    const coreR = baseR * (0.48 + res * 0.14 + Math.sin(t * 2.6) * (0.03 + glitch * 0.06));
    const coreGrad = ctx.createRadialGradient(cx - 20, cy - 24, coreR * 0.1, cx, cy, coreR * 1.2);
    coreGrad.addColorStop(0, `hsla(197, 100%, 92%, ${0.95 * (0.6 + res * 0.35)})`);
    coreGrad.addColorStop(0.4, `hsla(320, 92%, 68%, ${0.75 * holo})`);
    coreGrad.addColorStop(1, 'hsla(280, 85%, 38%, 0.05)');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
    ctx.fill();

    // Lace / fairy veil texture — delicate points
    ctx.fillStyle = `rgba(200,160,168,${0.35 * veil})`;
    const laceCount = 58 + Math.floor(veil * 34);
    for (let i = 0; i < laceCount; i++) {
      const angle = (i / laceCount) * Math.PI * 2 + t * (0.2 + veil * 0.3);
      const rad = baseR * (0.72 + Math.sin(i * 1.7) * 0.19 * veil);
      const lx = cx + Math.cos(angle) * rad;
      const ly = cy + Math.sin(angle) * rad * (0.7 + res * 0.2);
      const size = 0.9 + Math.sin(t + i) * 0.6;
      ctx.fillRect(lx, ly, size, size * 1.6);
    }

    // Glitch interference lines
    if (glitch > 0.1) {
      ctx.strokeStyle = `rgba(255, 31, 154, ${glitch * 0.65})`;
      ctx.lineWidth = 1;
      for (let g = 0; g < 3 + Math.floor(glitch * 5); g++) {
        const gy = 30 + ((g * 29 + t * 80) % (ch - 60));
        const offset = Math.sin(t * 14 + g) * 28 * glitch;
        ctx.beginPath();
        ctx.moveTo(18, gy);
        ctx.lineTo(cw - 18 + offset * 0.6, gy + (glitch - 0.5) * 9);
        ctx.stroke();
      }
    }

    // Subtle horizontal data scan lines
    ctx.strokeStyle = `rgba(0,229,255,${0.07 + holo * 0.11})`;
    ctx.lineWidth = 1;
    for (let s = 0; s < 3; s++) {
      const sy = ((t * (38 + s * 11) + s * 70) % (ch + 40)) - 20;
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(cw, sy + Math.sin(t) * 2);
      ctx.stroke();
    }

    // Center lock reticle
    ctx.strokeStyle = `rgba(255,255,255,${0.3 + res * 0.2})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, baseR * 0.18, 0, Math.PI * 2);
    ctx.stroke();

    animationRef.current = requestAnimationFrame(drawTunerViz);
  };

  useEffect(() => {
    const start = () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(drawTunerViz);
    };
    start();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [params]);

  const resetToBaseline = () => {
    const reset: Record<string, number> = {};
    PARAMS.forEach(p => reset[p.key] = p.default);
    setParams(reset);
    setIsLocked(false);
  };

  const lockFrequency = () => {
    setIsLocked(!isLocked);
  };

  // V3 WEAVER SYNC + EP31 ECHO ARC BOOST: React to SigilGallery weaver + Sonic + new EchoArcExplorer (auto tune params for immersive arc experience, heavier glitch/veil on Ep31)
  React.useEffect(() => {
    const handler = (e: any) => {
      const d = e.detail || {};
      if (d.type === 'sigil' || (e.type && e.type.includes('weaver')) || d.type === 'explorer' || d.type === 'harness') {
        // Shift params toward glitch/veil on sigil interaction for live "tuning the frequency" feel; Ep31/Echoes boost
        const isEp31 = (d.tags || []).some((t: string) => t.includes('ep31') || t.includes('echoes') || t.includes('veil'));
        setParams(p => ({
          ...p,
          glitch: Math.min(100, p.glitch + 14 + (d.tags?.some((t:string)=>t.includes('glitch') || t.includes('fracture')) ? 22 : 0) + (isEp31 ? 18 : 0)),
          veil: Math.min(100, p.veil + 10 + (isEp31 ? 12 : 0)),
          resonance: Math.max(12, Math.min(98, p.resonance + (d.category?.includes('Glitch') || d.type === 'explorer' ? -11 : 8) + (isEp31 ? 6 : 0)))
        }));
      }
    };
    window.addEventListener('folana-arc-sync', handler as any);
    window.addEventListener('folana-weaver-tune', handler as any);
    return () => {
      window.removeEventListener('folana-arc-sync', handler as any);
      window.removeEventListener('folana-weaver-tune', handler as any);
    };
  }, []);

  return (
    <div id="tuner" className="space-y-8">
      <div className="flex items-end justify-between border-b border-white/10 pb-4">
        <div>
          <div className="font-mono tracking-[4px] text-xs text-folana-neon-cyan mb-1">INTERACTIVE FREQUENCY INTERFACE</div>
          <h2 className="font-serif text-6xl tracking-[-2.4px] text-folana-ink">Static Tuner</h2>
        </div>
        <div className="hidden lg:block max-w-xs text-right text-sm text-folana-text-secondary font-serif italic">Dial into her current frequency. The sigil responds in real time.</div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Live Visualizer */}
        <div className="lg:col-span-3">
          <div className="static-tuner rounded-3xl p-5 relative overflow-hidden aspect-[16/10] md:aspect-[16/9]">
            <canvas ref={canvasRef} className="w-full h-full" />
            
            {/* Live param readouts overlay */}
            <div className="absolute top-5 left-5 font-mono text-[10px] tracking-[2px] space-y-px text-folana-neon-cyan/80">
              {PARAMS.map(p => (
                <div key={p.key}>{p.label}: <span className="text-folana-ink tabular-nums">{params[p.key].toString().padStart(2, '0')}</span></div>
              ))}
            </div>
            <div className="absolute bottom-5 right-5 text-[10px] font-mono tracking-[4px] text-right text-folana-text-muted/50">
              LIVE RENDER • FOLANA:ACMI:01
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="lg:col-span-2 space-y-6 pt-1">
          {PARAMS.map((param) => (
            <div key={param.key} className="space-y-3">
              <div className="flex justify-between items-baseline font-mono text-xs tracking-widest">
                <div className="text-folana-text-secondary">{param.label}</div>
                <div className="text-folana-ink tabular-nums text-lg font-medium tracking-normal pr-1">{params[param.key]}{param.unit}</div>
              </div>

              <input 
                type="range" 
                min={param.min} 
                max={param.max} 
                step={param.step} 
                value={params[param.key]} 
                onChange={(e) => updateParam(param.key, parseFloat(e.target.value))}
                disabled={isLocked}
                className="w-full accent-folana-neon-pink cursor-pointer disabled:opacity-40"
              />

              <div className="text-[11px] leading-tight text-folana-text-muted pr-2 font-serif italic tracking-[-0.1px]">
                {param.description}
              </div>
            </div>
          ))}

          <div className="flex gap-3 pt-4">
            <button 
              onClick={resetToBaseline} 
              className="flex-1 py-3 text-xs font-mono tracking-[3px] border border-white/15 hover:bg-white/5 rounded-2xl transition-all active:scale-[0.985]"
            >
              RESET TO NEUTRAL
            </button>
            <button 
              onClick={lockFrequency} 
              className={`flex-1 py-3 text-xs font-mono tracking-[3px] rounded-2xl border transition-all active:scale-[0.985] ${isLocked ? 'bg-folana-neon-pink text-black border-folana-neon-pink' : 'border-folana-neon-cyan/60 hover:bg-folana-neon-cyan/10 text-folana-neon-cyan'}`}
            >
              {isLocked ? 'FREQUENCY LOCKED' : 'LOCK THIS FREQUENCY'}
            </button>
          </div>
          <div className="text-[10px] text-center text-folana-text-muted/60 font-mono tracking-widest pt-1">Changes are ephemeral • Purely for attunement</div>
        </div>
      </div>
    </div>
  );
}
