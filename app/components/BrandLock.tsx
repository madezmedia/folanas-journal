'use client';

import React from 'react';
import Link from 'next/link';

/**
 * BrandLock — Reusable, prominent Folana branding component.
 * 
 * Variants for different contexts (hero transmission bar, nav, footer, codex headers).
 * Uses assets from public/brand/ (wordmark + glyph).
 * Emits ACMI pre/post on interaction (per hardening skill).
 * 
 * Locked signature: Dark fairy grunge cyber + real Brooklyn transmission feel.
 */

interface BrandLockProps {
  size?: 'nav' | 'hero' | 'footer' | 'transmission' | 'sigil';
  variant?: 'default' | 'transmission' | 'minimal';
  showBrooklyn?: boolean;
  className?: string;
  onClick?: () => void;
}

export function BrandLock({
  size = 'nav',
  variant = 'default',
  showBrooklyn = false,
  className = '',
  onClick,
}: BrandLockProps) {
  const handleInteraction = (type: string) => {
    const corr = `brandlock-${type}-${Date.now()}`;
    const event = {
      ts: Date.now(),
      source: 'folana-journal-ui',
      kind: 'brandlock_interaction',
      correlationId: corr,
      summary: `[ui] BrandLock ${type} interaction`,
      payload: { size, variant, showBrooklyn },
    };
    // TODO: Replace with real lib/acmi-emit when available (per subagent plan)
    console.log('ACMI BRANDLOCK:', event);
    if (onClick) onClick();
  };

  const sizes = {
    nav: { wordmark: 'h-5 md:h-6', glyph: 'w-6 h-6 md:w-7 md:h-7', gap: 'gap-2.5' },
    hero: { wordmark: 'h-8 md:h-10', glyph: 'w-8 h-8 md:w-9 md:h-9', gap: 'gap-3' },
    footer: { wordmark: 'h-6', glyph: 'w-5 h-5', gap: 'gap-2' },
    transmission: { wordmark: 'h-6', glyph: 'w-6 h-6', gap: 'gap-3' },
    sigil: { wordmark: 'h-5', glyph: 'w-5 h-5', gap: 'gap-2' },
  }[size];

  const baseClasses = `flex items-center ${sizes.gap} group transition-all ${className}`;

  return (
    <Link 
      href="/" 
      className={baseClasses}
      onClick={() => handleInteraction('click')}
      onMouseEnter={() => handleInteraction('hover')}
    >
      <div className={`relative ${sizes.glyph} rounded-lg overflow-hidden border border-white/20 bg-[#1A1A22] flex items-center justify-center group-hover:border-folana-neon-pink/60 transition-all`}>
        <img 
          src="/brand/svg/glyph.svg" 
          alt="Folana Glyph" 
          className="w-4/5 h-4/5 invert-[0.85] group-hover:invert-[0.95] transition-all" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(#FF1F9A_0.5px,transparent_1px)] bg-[size:3px_3px] opacity-10 group-hover:opacity-25 transition-opacity" />
      </div>

      <img 
        src="/brand/svg/wordmark.svg" 
        alt="Folana" 
        className={`${sizes.wordmark} w-auto invert-[0.9] group-hover:opacity-100 opacity-90 transition-all`} 
      />

      {showBrooklyn && (
        <div className="hidden md:block font-mono text-[9px] tracking-[2.5px] text-folana-text-muted pl-1 -mt-0.5 group-hover:text-folana-neon-cyan transition-colors">
          BROOKLYN
        </div>
      )}
    </Link>
  );
}
