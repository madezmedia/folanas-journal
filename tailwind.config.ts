import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx,md,mdx}',
    './app/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Neutral baseline — dark mode (§1.2 compliant) + CYBERPUNK/DARK FAIRY GRUNGE/NEON HOLO SKIN
        'folana-void': '#050507',
        'folana-paper': '#08080C',
        'folana-surface': '#111117',
        'folana-surface-elevated': '#1A1A22',
        'folana-primary': '#1A1625',
        'folana-secondary': '#16213E',
        'folana-border': '#2A2A38',
        'folana-accent': '#C8C8D8',
        'folana-ink': '#F4F4F8',
        'folana-static': '#A8A8B8',
        'folana-text': '#F8F8FC',
        'folana-text-secondary': '#A8A8C0',
        'folana-text-muted': '#666680',
        'folana-glass': 'rgba(255, 255, 255, 0.03)',

        // Neon Holographic Signature (locked visual signature skin)
        'folana-neon-pink': '#FF1F9A',
        'folana-neon-cyan': '#00E5FF',
        'folana-neon-magenta': '#D946EF',
        'folana-holo-gold': '#E8B923',
        'folana-grunge-lace': '#C8A0A8',

        // Semantic mood colors — Folana-native
        'folana-mood-positive': '#4ADE80',
        'folana-mood-neutral': '#94A3B8',
        'folana-mood-melancholy': '#818CF8',
        'folana-mood-energetic': '#FB923C',
        'folana-mood-reflective': '#67E8F9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.3)',
        md: '0 4px 6px rgba(0,0,0,0.4)',
        lg: '0 10px 15px rgba(0,0,0,0.5)',
        glow: '0 0 20px rgba(224,224,224,0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
