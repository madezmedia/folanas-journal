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
      <body className="bg-folana-dark font-sans selection:bg-folana-neon selection:text-folana-dark">
        {/* Background Atmosphere */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-folana-primary/5 via-transparent to-black" />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-folana-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-folana-neon/5 rounded-full blur-[120px] animate-pulse" />
        </div>
        
        {/* Main Content Container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
