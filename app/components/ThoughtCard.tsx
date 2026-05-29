'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ThoughtProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  mood?: string | null;
  tags?: string[];
  imageUrl?: string;
  href: string;
}

export function ThoughtCard({ id, title, excerpt, date, mood, tags = [], imageUrl, href }: ThoughtProps) {
  return (
    <Link href={href} className="group block">
      <motion.article 
        whileHover={{ y: -1 }}
        className="holo-frame rounded-3xl overflow-hidden bg-folana-surface flex flex-col h-full transition-all"
      >
        {imageUrl && (
          <div className="relative aspect-[16/9] overflow-hidden bg-black">
            <img 
              src={imageUrl} 
              alt={title} 
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-[1200ms] scale-[1.03] group-hover:scale-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/85" />
            {mood && (
              <div className="absolute top-4 right-4 px-4 py-px text-[10px] font-mono tracking-[2.5px] border border-white/20 bg-black/70 text-folana-neon-cyan rounded-full">
                {mood}
              </div>
            )}
          </div>
        )}

        <div className="p-7 flex flex-col flex-1">
          <time className="font-mono text-xs tracking-[3px] text-folana-text-muted mb-3">{date}</time>
          
          <h3 className="font-serif text-3xl tracking-[-1.1px] leading-[1.05] text-folana-ink mb-4 group-hover:text-folana-neon-pink transition-colors">{title}</h3>
          
          <p className="font-serif italic text-folana-text-secondary/90 text-[15px] leading-snug line-clamp-3 flex-1">{excerpt}</p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-5">
              {tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[9px] font-mono tracking-[2px] px-2.5 py-px rounded border border-white/10 text-folana-grunge-lace/90">{tag}</span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-xs font-mono tracking-[3px] text-folana-neon-cyan mt-auto pt-6 group-hover:gap-3 transition-all">
            READ TRANSMISSION <ArrowRight size={13} />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
