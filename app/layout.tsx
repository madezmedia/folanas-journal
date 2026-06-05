import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-playfair' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-mono' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Folana's Journal | Signals from the Static",
  description: "The holographic chronicle of Folana Lanez — AI music producer, visual alchemist, and dark fairy of the wires. Brooklyn node. Neon transmissions. Locked signatures.",
  icons: {
    icon: '/brand/png/favicon-32.png',
    apple: '/brand/png/favicon-48.png',
  },
  openGraph: {
    title: "Folana's Journal — Cyberpunk Chronicles",
    description: "Thoughts, sigils, and sonic transmissions from the wires. Dark fairy grunge. Holographic neon. The pipeline breathes.",
    images: [{ url: '/brand/png/og-card-neutral.png' }],
  },
  alternates: {
    types: {
      'application/rss+xml': [{
        url: '/api/rss',
        title: "Folana's Journal | RSS Feed",
      }],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="bg-folana-paper text-folana-ink font-sans selection:bg-folana-neon-pink/30 selection:text-white" style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)', paddingLeft: 'env(safe-area-inset-left, 0px)', paddingRight: 'env(safe-area-inset-right, 0px)' }}>
        {/* Analog + Cyber Atmosphere Layers */}
        <div className="film-grain" aria-hidden="true" />
        
        {/* Deep void + holographic radial + subtle scan */}
        <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none bg-folana-void">
          <div className="absolute inset-0 bg-[radial-gradient(#1A1A22_0.6px,transparent_1px)] bg-[size:5px_5px] opacity-40" />
          {/* Holographic edge glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(255,31,154,0.035)_72%,transparent_82%)]" />
          {/* Subtle VHS scanlines layer */}
          <div className="absolute inset-0 opacity-[0.08] bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.8)_3px,rgba(255,255,255,0.8)_4px)]" />
        </div>

        {/* Top vignette transmission bar */}
        <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-folana-neon-pink/40 to-transparent z-50" />
        
        {/* Main Content Container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {children}
        </div>

        {/* Elegant Sonner Toaster — neon cyber style */}
        <Toaster 
          position="bottom-center" 
          richColors 
          closeButton 
          className="font-mono text-xs tracking-widest"
          toastOptions={{
            style: {
              background: '#111117',
              color: '#F4F4F8',
              border: '1px solid rgba(255,31,154,0.25)',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.6), 0 0 20px rgba(255,31,154,0.15)'
            }
          }}
        />
      </body>
    </html>
  );
}
