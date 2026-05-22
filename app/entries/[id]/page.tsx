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
    <main className="flex-1 flex flex-col items-center p-6 lg:p-24 relative bg-folana-paper">
      {/* Navigation */}
      <nav className="w-full max-w-4xl flex justify-between items-center mb-24 relative z-20">
        <Link href="/" className="text-xs font-mono tracking-widest uppercase text-folana-accent hover:text-folana-ink transition-colors">
          &larr; Archive Index
        </Link>
        <div className="text-folana-accent font-mono text-[10px] tracking-[0.3em] opacity-40 uppercase">
          Brooklyn_Node // 2026
        </div>
      </nav>

      <article className="w-full max-w-4xl relative z-20">
        {/* Grounded Header */}
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <time className="text-folana-accent font-mono text-xs tracking-widest uppercase">
              {new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span className="w-8 h-px bg-folana-ink/10" />
            <div className="text-xs font-mono text-folana-accent opacity-60 uppercase">
              {new Date(entry.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} EST
            </div>
          </div>
          <h1 className="text-7xl lg:text-9xl font-serif text-folana-ink leading-[0.9] tracking-tighter mb-12">
            {entry.title}
          </h1>
          <div className="flex items-center gap-6 text-sm font-mono text-folana-accent uppercase tracking-widest opacity-60">
            <span>Mood: {signals.current_mood ?? 'Reflective'}</span>
            <span>|</span>
            <span>Location: 40.6782° N, 73.9442° W</span>
          </div>
        </header>

        {/* Hero Image */}
        {entry.image_url && (
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-24 border border-folana-ink/5 grayscale-[0.2]">
            <Image
              src={entry.image_url}
              alt={entry.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content Panel */}
        <div className="max-w-3xl mx-auto">
          <div 
            className="prose prose-neutral lg:prose-2xl max-w-none 
              prose-headings:font-serif prose-headings:text-folana-ink
              prose-p:text-folana-ink/80 prose-p:leading-relaxed prose-p:font-serif prose-p:italic
              prose-strong:text-folana-ink prose-strong:font-bold
              prose-blockquote:border-folana-static prose-blockquote:text-folana-ink/60"
            dangerouslySetInnerHTML={{ __html: entry.content }} 
          />
          
          {/* Media Gallery */}
          {entry.media_urls && entry.media_urls.length > 1 && (
            <div className="mt-32 space-y-12">
              <h3 className="text-xl font-mono text-folana-accent uppercase tracking-[0.3em] opacity-40">Visual Fragments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {entry.media_urls.slice(1).map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-folana-ink/5 group grayscale hover:grayscale-0 transition-all duration-700">
                    {url.toLowerCase().endsWith('.mp4') ? (
                      <video 
                        src={url} 
                        className="w-full h-full object-cover" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                      />
                    ) : (
                      <Image 
                        src={url} 
                        alt={`Fragment ${i + 1}`} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACMI Traceability Footer */}
          <footer className="mt-48 pt-12 border-t border-folana-ink/10 flex flex-col items-start gap-8">
            <div className="w-full flex justify-between items-end">
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-folana-accent uppercase tracking-widest opacity-40">ACMI_TRACE_V1.2</div>
                <div className="text-xs font-mono text-folana-ink opacity-60">CORRELATION_ID: {id.toUpperCase()}</div>
                <div className="text-xs font-mono text-folana-ink opacity-60">SOURCE_AGENT: acmi:agent:folana:v1</div>
              </div>
              <div className="text-[10px] font-mono text-folana-accent uppercase tracking-[0.4em] opacity-20">
                End of Transmission
              </div>
            </div>
            <Link href="/" className="text-folana-accent hover:text-folana-ink font-mono uppercase tracking-widest text-xs transition-colors">
              &larr; Return to Index
            </Link>
          </footer>
        </div>
      </article>
    </main>
  );
}
