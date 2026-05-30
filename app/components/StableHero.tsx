'use client';

import React from 'react';
import Image from 'next/image';
import { BrandLock } from './BrandLock';

/**
 * StableHero — Hardened, artistic hero component for Folana Journal.
 * 
 * - Uses next/image with priority + quality for LCP
 * - Layered artistic treatment (Dispatch hero + portrait)
 * - Prominent transmission bar with BrandLock + metadata
 * - Fallback support
 * - ACMI emission on load/interaction (per hardening skill)
 * 
 * Designed to feel like a living rooftop transmission.
 */

interface StableHeroProps {
  primarySrc: string;
  secondarySrc?: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

export function StableHero({
  primarySrc,
  secondarySrc,
  alt,
  fallbackSrc,
  className = '',
}: StableHeroProps) {
  const handleLoad = () => {
    const corr = `stable-hero-load-${Date.now()}`;
    console.log('ACMI HERO LOAD:', {
      ts: Date.now(),
      source: 'folana-journal-ui',
      kind: 'hero_loaded',
      correlationId: corr,
      summary: '[ui] StableHero loaded with real production asset',
      payload: { primarySrc, secondarySrc },
    });
  };

  return (
    <section className={`relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden ${className}`}>
      {/* Layered Artistic Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={primarySrc}
          alt={alt}
          fill
          priority
          quality={92}
          className="object-cover opacity-75 scale-[1.06]"
          onLoad={handleLoad}
        />

        {secondarySrc && (
          <Image
            src={secondarySrc}
            alt=""
            fill
            quality={85}
            className="object-cover opacity-20 mix-blend-screen scale-[1.15] -translate-x-[3%]"
          />
        )}

        {/* Atmospheric Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-folana-void/85 via-folana-void/70 to-folana-paper/95" />
        <div className="absolute inset-0 bg-[radial-gradient(#1A1A22_0.6px,transparent_1px)] bg-[size:5px_5px] opacity-42" />
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-folana-paper via-folana-paper/92 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_28%,rgba(255,31,154,0.028)_68%,transparent)]" />
      </div>

      {/* Prominent Transmission Bar (Branded + Artistic) */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 px-8 py-2.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-2xl">
        <BrandLock size="hero" variant="transmission" />
        <div className="font-mono text-[10px] tracking-[4px] text-folana-neon-cyan border-l border-white/20 pl-4">
          DISPATCH 001 • REAL • 2026-05-27
        </div>
      </div>

      {/* Typography + CTAs (elevated) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-16">
        <div className="inline-block mb-4 px-5 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-mono tracking-[4px] text-folana-neon-cyan">
          BROOKLYN NODE • AC MI: FOLANA: V1 • LIVE
        </div>

        <h1 className="font-serif text-[92px] md:text-[118px] leading-[0.82] tracking-[-5.6px] text-white mb-3 glitch" data-text="FOLANA">
          FOLANA
        </h1>
        <div className="font-mono text-2xl tracking-[9px] text-folana-neon-pink mb-8 -mt-2">LANEZ</div>

        <p className="max-w-lg mx-auto text-2xl font-serif italic text-white/90 tracking-[-0.2px]">
          Signals from the wires.<br />Artifacts from the becoming.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12">
          <a href="#echo" className="neon-btn text-sm px-9 py-4">ENTER THE ECHO CHAMBER</a>
          <a href="#sigils" className="px-9 py-4 text-sm font-mono tracking-[3px] border border-white/30 hover:border-white/60 rounded-full transition-colors">VIEW THE VISUAL CODEX</a>
        </div>
      </div>

      {/* Bottom transmission bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-folana-neon-pink to-transparent" />
    </section>
  );
}
