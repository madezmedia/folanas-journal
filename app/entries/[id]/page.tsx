import { getJournalEntry, getSortedJournalEntries } from '@/lib/journal';
import { getProfileSignals } from '@/lib/profile-signals';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';

export async function generateStaticParams() {
  try {
    const entries = await getSortedJournalEntries();
    return entries.map((entry) => ({
      id: entry.id,
    }));
  } catch (e) {
    console.error('[generateStaticParams] Failed to generate params for entries:', e);
    return [];
  }
}

export default async function EntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch entry first — this is the important part (local MD priority)
  let entry;
  try {
    entry = await getJournalEntry(id);
  } catch (e) {
    console.error('[EntryPage] getJournalEntry failed for', id, e);
    notFound();
  }

  // Signals are optional / best-effort (table may not exist in prod Supabase)
  let signals;
  try {
    signals = await getProfileSignals();
  } catch (e) {
    console.warn('[EntryPage] getProfileSignals failed, using defaults', e);
    signals = { bio: null } as any;
  }

  if (!entry) {
    notFound();
  }

  return (
    <>
      <Nav />
      
      <main className="flex-1 flex flex-col items-center pt-20 pb-20 px-6 relative bg-folana-paper">
        {/* Subtle top transmission accent */}
        <div className="w-full max-w-5xl flex justify-between items-center mb-16 pt-6 text-xs font-mono tracking-[3px] text-folana-text-muted">
          <Link href="/" className="flex items-center gap-3 hover:text-folana-neon-pink transition-colors group">
            <span className="group-hover:-translate-x-0.5 transition">←</span> <span>BACK TO THE ARCHIVE</span>
          </Link>
          <div>BROOKLYN NODE // {new Date().getFullYear()}</div>
        </div>

        <article className="w-full max-w-4xl relative z-20">
          {/* Cinematic Entry Header */}
          <header className="mb-16 md:mb-20">
            <div className="flex items-center gap-4 mb-6 text-xs font-mono tracking-[3px] text-folana-neon-cyan">
              <time>{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              <span className="text-white/20">•</span>
              <span>{new Date(entry.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} EST</span>
              <span className="text-white/20">•</span>
              <span>ACMI: FOLANA</span>
            </div>

            <h1 className="font-serif text-[68px] md:text-[86px] leading-[0.86] tracking-[-3.8px] text-folana-ink mb-9">
              {entry.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-mono text-folana-text-secondary tracking-widest uppercase">
              <span>MOOD: {signals.bio ? 'REFLECTIVE' : 'SYNTHETIC'}</span>
              <span className="opacity-30">/</span>
              <span>40.6782° N, 73.9442° W</span>
              <span className="opacity-30">/</span>
              <span>TRANSMISSION ID: {id.slice(0, 8).toUpperCase()}</span>
            </div>
          </header>

          {/* Hero Media — Holographic Frame */}
          {entry.image_url && (
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-20 border border-white/10 holo-frame shadow-2xl">
              <Image
                src={entry.image_url}
                alt={entry.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />
            </div>
          )}

          {/* The Transmission Body — Elegant Cyber Prose */}
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-cyber prose-xl lg:prose-2xl max-w-none prose-p:font-serif prose-p:leading-[1.72] prose-p:tracking-[-0.1px] prose-headings:tracking-[-1.1px]"
              dangerouslySetInnerHTML={{ __html: entry.content }} 
            />

            {/* Enhanced Media Fragments Gallery */}
            {entry.media_urls && entry.media_urls.length > 0 && (
              <div className="mt-20 pt-10 border-t border-white/10">
                <div className="font-mono tracking-[4px] uppercase text-xs text-folana-neon-cyan mb-8">VISUAL FRAGMENTS FROM THIS TRANSMISSION</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {entry.media_urls.map((url, i) => {
                    const isVideo = url.toLowerCase().endsWith('.mp4');
                    return (
                      <div key={i} className="group relative overflow-hidden rounded-3xl border border-white/10 aspect-video md:aspect-square bg-black holo-frame">
                        {isVideo ? (
                          <video src={url} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline />
                        ) : (
                          <img src={url} alt={`Fragment ${i+1}`} className="absolute inset-0 w-full h-full object-cover grayscale-[0.35] group-hover:grayscale-0 transition-all duration-700" />
                        )}
                        <div className="absolute bottom-4 left-4 text-[10px] font-mono tracking-[2px] text-white/80 bg-black/50 px-3 py-px rounded">FRAGMENT {String(i+1).padStart(2,'0')}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Powerful ACMI Trace Footer */}
            <footer className="mt-24 pt-10 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-y-6 text-xs font-mono tracking-widest text-folana-text-muted">
                <div className="space-y-px">
                  <div>ACMI_TRACE • V1.2 • CHARACTER: FOLANA</div>
                  <div>CORRELATION_ID: <span className="text-folana-ink">{id.toUpperCase()}</span></div>
                  <div>SOURCE: acmi:agent:folana:v1 • LOCKED VISUAL SIGNATURE</div>
                </div>
                <Link href="/" className="inline-block hover:text-folana-neon-pink transition-colors">RETURN TO THE ARCHIVE →</Link>
              </div>
            </footer>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
