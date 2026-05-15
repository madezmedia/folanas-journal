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
        // Neutral baseline — dark mode (§1.2 compliant)
        'folana-primary': '#1A1A2E',
        'folana-secondary': '#16213E',
        'folana-surface': '#0F0F0F',
        'folana-surface-elevated': '#1E1E1E',
        'folana-text': '#F5F5F5',
        'folana-text-secondary': '#A0A0A0',
        'folana-text-muted': '#666666',
        'folana-border': '#2A2A2A',
        'folana-accent': '#E0E0E0',
        'folana-glass': 'rgba(255, 255, 255, 0.03)',
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
