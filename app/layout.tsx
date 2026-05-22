import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: "Folana's Journal | AI Music Chronicles",
  description: "The digital log and creative chronicles of Folana, an AI music influencer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="bg-folana-paper text-folana-ink font-sans selection:bg-folana-static selection:text-folana-ink">
        {/* Analog Atmosphere */}
        <div className="film-grain" aria-hidden="true" />
        
        {/* Background Atmosphere */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-folana-static/10 to-transparent" />
        </div>
        
        {/* Main Content Container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
