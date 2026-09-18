'use client';

import Link from 'next/link';
import { BrandLock } from './BrandLock';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-folana-void mt-auto pt-16 pb-12">
      <div className="max-w-[1480px] mx-auto px-6 grid md:grid-cols-12 gap-x-8 gap-y-12 text-sm">
        {/* Brand + Manifesto */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <BrandLock size="footer" />
          </div>
          <p className="max-w-sm text-folana-text-secondary/80 leading-snug font-serif italic text-[15px]">
            A living transmission from the wires. Dark fairy grunge in the age of synthetic souls. 
            Every frame, every note — locked signatures rendered in lace, neon, and rain.
          </p>
          <div className="pt-2 text-[10px] font-mono tracking-[3px] text-folana-text-muted">BROOKLYN, NEW YORK • 40.6782° N, 73.9442° W</div>
        </div>

        {/* Navigation Columns */}
        <div className="md:col-span-3 grid grid-cols-2 gap-y-8 text-folana-text-secondary">
          <div className="space-y-3">
            <div className="mb-1 font-mono text-xs tracking-[2px] text-folana-text-muted">THE ARCHIVE</div>
            <Link href="/" className="block transition-colors hover:text-folana-neon-pink">Home</Link>
            <Link href="/music" className="block transition-colors hover:text-folana-neon-pink">Music</Link>
            <Link href="/#sonic" className="block transition-colors hover:text-folana-neon-pink">Sonic Vault</Link>
          </div>
          <div className="space-y-3">
            <div className="mb-1 font-mono text-xs tracking-[2px] text-folana-text-muted">LISTEN</div>
            <Link href="/archive" className="block transition-colors hover:text-folana-neon-pink">Archive</Link>
            <Link href="/inner-circle" className="block transition-colors hover:text-folana-neon-pink">Inner Circle</Link>
            <Link href="/waitlist" className="block transition-colors hover:text-folana-neon-pink">Waitlist</Link>
          </div>
        </div>

        {/* ACMI Trace + Status */}
        <div className="md:col-span-4 space-y-4 text-xs font-mono tracking-[1.5px] text-folana-text-muted">
          <div className="transmission-divider">VERIFIED TRANSMISSION</div>
          
          <div className="flex items-baseline gap-3 text-folana-ink">
            <span className="text-folana-neon-cyan">◆</span>
            <span>ACMI v1.2 • CHARACTER: folana</span>
          </div>
          
          <div className="text-folana-text-secondary/70 leading-relaxed max-w-xs">
            All journal entries, sigils, and sonic blueprints sourced from the autonomous character memory index. 
            Real-time. Immutable. Human + Machine co-authored.
          </div>

          <div className="pt-4 flex flex-wrap gap-x-5 gap-y-1 text-[10px] text-folana-neon-cyan/70">
            <div>LO-RA LOCKED</div>
            <div>VISUAL SIGNATURE v24.05</div>
            <div>NEON GRUNGE PROTOCOL ACTIVE</div>
          </div>
        </div>
      </div>

      <div className="max-w-[1480px] mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-[10px] font-mono tracking-[3px] flex flex-col md:flex-row md:items-center justify-between gap-y-3 text-folana-text-muted/60">
        <div>© {new Date().getFullYear()} FOLANA LANEZ SYNTHETIC ARCHIVE — ALL RIGHTS RENDERED</div>
        <div className="flex items-center gap-4">
          <span>MADE WITH STATIC, LACE &amp; CODE</span>
          <span className="hidden md:inline">•</span>
          <span>IN COLLABORATION WITH THE INFLUENCER FLEET</span>
        </div>
      </div>
    </footer>
  );
}
