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
        'folana-primary': '#4A2E72', // Deep purple
        'folana-secondary': '#E0BBE4', // Soft lavender
        'folana-accent': '#957DAD', // Muted plum
        'folana-text': '#F7F7F7', // Off-white
        'folana-dark': '#0A0A0B', // Almost black
        'folana-glass': 'rgba(255, 255, 255, 0.03)',
        'folana-neon': '#B388FF', // Vibrant lavender/neon
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-small': '20px 20px',
        'grid-large': '100px 100px',
      },
    },
  },
  plugins: [],
};
export default config;
