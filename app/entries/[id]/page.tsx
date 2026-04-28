import { getJournalEntry, getSortedJournalEntries } from '@/lib/journal';
import { getProfileSignals } from '@/lib/profile-signals';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
  const entries = await getSortedJournalEntries();
  return entries.map((entry) => ({
    id: entry.id,
  }));
}

export default async function EntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [entry, signals] = await Promise.all([
    getJournalEntry(id),
    getProfileSignals(),
  ]);

  if (!entry) {
    notFound();
  }

  return (
    <main className="flex-1 flex flex-col items-center p-6 lg:p-12 relative">
      {/* Navigation HUD */}
      <nav className="w-full max-w-4xl flex justify-between items-center mb-12 relative z-20">
        <Link href="/" className="hud-tag hover:bg-folana-neon hover:text-folana-dark transition-all duration-300">
          &larr; Return to Timeline
        </Link>
        <div className="text-folana-accent font-mono text-[10px] tracking-widest opacity-50">
          SECURE_NODE_ACCESS // {id.toUpperCase()}
        </div>
      </nav>

      <article className="w-full max-w-4xl relative z-20">
        {/* Hero Image */}
        <div className="relative w-full h-[400px] lg:h-[600px] rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
          <Image
            src={entry.image_url || signals.hero_image_url}
            alt={entry.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-folana-dark via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="text-4xl lg:text-7xl font-serif text-white drop-shadow-2xl leading-tight">
              {entry.title}
            </h1>
          </div>
        </div>

        {/* Content Panel */}
        <div className="glass-panel p-8 lg:p-16 mb-12">
          <div className="flex items-center gap-4 mb-12 border-b border-white/5 pb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-folana-neon/30 relative">
              <Image
                src={signals.avatar_url}
                alt={signals.display_name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-folana-secondary font-serif text-lg">{signals.display_name}</div>
              <time className="text-folana-accent font-mono text-xs opacity-60 uppercase">
                {new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
            <div className="ml-auto">
              <div className="hud-tag">Verified Stream</div>
            </div>
          </div>

          <div 
            className="prose prose-invert lg:prose-xl max-w-none 
              prose-headings:font-serif prose-headings:text-folana-secondary
              prose-p:text-folana-text/80 prose-p:leading-relaxed
              prose-a:text-folana-neon hover:prose-a:text-folana-secondary transition-colors
              prose-strong:text-folana-neon"
            dangerouslySetInnerHTML={{ __html: entry.content }} 
          />
          
          {/* Media Gallery */}
          {entry.media_urls && entry.media_urls.length > 1 && (
            <div className="mt-16 space-y-8">
              <h3 className="text-2xl font-serif text-folana-secondary italic">Visual Fragments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {entry.media_urls.slice(1).map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
                    <Image 
                      src={url} 
                      alt={`Fragment ${i + 1}`} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-folana-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center gap-6">
            <div className="text-folana-accent font-mono text-[10px] tracking-[0.3em] uppercase opacity-40">
              End of Transmission
            </div>
            <Link href="/" className="text-folana-secondary hover:text-folana-neon font-serif italic text-lg transition-colors">
              Return to Chronicles
            </Link>
          </div>
        </div>
      </article>


      {/* Decorative Atmosphere for Entry */}
      <div className="fixed top-1/4 right-0 w-[500px] h-[500px] bg-folana-primary/5 rounded-full blur-[150px] z-10 pointer-events-none" />
      <div className="fixed bottom-1/4 left-0 w-[500px] h-[500px] bg-folana-neon/5 rounded-full blur-[150px] z-10 pointer-events-none" />
    </main>
  );
}
