'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BrandLock } from './BrandLock';

const navLinks = [
  { href: '/', label: 'THE ARCHIVE', short: 'JOURNAL' },
  { href: '/archive', label: 'FULL ARCHIVE', short: 'ARCHIVE' },
  { href: '/inner-circle', label: 'INNER CIRCLE', short: 'JOIN' },
  { href: '/music', label: 'MUSIC RELEASES', short: 'MUSIC' },
  { href: '/#sigils', label: 'VISUAL CODEX', short: 'SIGILS' },
  { href: '/#sonic', label: 'SONIC VAULT', short: 'VAULT' },
  { href: '/orchestrator', label: 'THE GRID', short: 'ORCHESTRATOR' },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('#')[0]);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-folana-void/95 backdrop-blur-2xl">
      <div className="max-w-[1480px] mx-auto flex items-center justify-between px-6 h-20">
        {/* Brand — Holographic Lock */}
        <BrandLock size="nav" showBrooklyn className="group" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-9 text-sm font-mono tracking-[2px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative group transition-all duration-200 hover:text-folana-neon-pink ${isActive(link.href) ? 'text-folana-neon-pink' : 'text-folana-text-secondary'}`}
            >
              <span>{link.label}</span>
              {isActive(link.href) && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-folana-neon-pink to-folana-neon-cyan" 
                />
              )}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-folana-neon-pink scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <Link 
            href="/inner-circle"
            className="hidden sm:block neon-btn text-[10px] py-2 px-5 bg-folana-neon-pink/10 border-folana-neon-pink text-folana-neon-pink hover:bg-folana-neon-pink hover:text-black"
          >
            JOIN $7/MO
          </Link>
          
          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden p-2 text-folana-text-secondary hover:text-folana-ink transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-folana-void/98 backdrop-blur-2xl px-6 py-8 space-y-6 font-mono text-sm tracking-widest">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setMobileOpen(false)}
              className={`block py-1 transition-colors ${isActive(link.href) ? 'text-folana-neon-pink' : 'text-folana-text-secondary hover:text-folana-ink'}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10">
            <Link href="/inner-circle" onClick={() => setMobileOpen(false)} className="neon-btn w-full justify-center text-xs py-3">JOIN THE INNER CIRCLE — $7/MO</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
