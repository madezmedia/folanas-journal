import { getSortedJournalEntries } from '@/lib/journal';
import { getProfileSignals } from '@/lib/profile-signals';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const [allEntries, signals] = await Promise.all([
    getSortedJournalEntries(),
    getProfileSignals(),
  ]);

  return (
    <main className="flex-1 flex flex-col lg:flex-row gap-8 p-6 lg:p-12 max-w-[1600px] mx-auto w-full">
      {/* Left Column: Timeline */}
      <div className="flex-1 flex flex-col">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-folana-ink/5 pb-12">
          <div>
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-folana-accent mb-4 opacity-60">Chronicles // Brooklyn, NY</div>
            <h1 className="text-7xl font-serif text-folana-ink leading-tight">
              Folana&apos;s <span className="italic opacity-80">Notes</span>
            </h1>
          </div>
          
          <Link href="/orchestrator" className="group">
            <div className="px-6 py-3 border border-folana-ink/10 hover:border-folana-ink/30 transition-all duration-500 rounded-full">
              <div className="text-xs font-mono text-folana-accent group-hover:text-folana-ink transition-colors">
                Studio Access &rarr;
              </div>
            </div>
          </Link>
        </header>

        <div className="space-y-24">
          {allEntries.map(({ id, date, title, image_url }, index) => (
            <div key={id} className="group cursor-pointer">
              <Link href={`/entries/${id}`} className="block">
                <article className="flex flex-col gap-8">
                  {image_url && (
                    <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 border border-folana-ink/5">
                      <Image 
                        src={image_url} 
                        alt={title} 
                        fill 
                        className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-folana-ink/5 group-hover:bg-transparent transition-colors duration-1000" />
                    </div>
                  )}
                  
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-4 mb-6">
                      <time className="text-folana-accent font-mono text-xs tracking-widest uppercase">
                        {new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </time>
                      <span className="w-8 h-px bg-folana-ink/10" />
                      <div className="text-xs font-mono text-folana-accent opacity-60 uppercase">
                        {new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    
                    <h2 className="text-5xl font-serif text-folana-ink mb-6 group-hover:opacity-60 transition-opacity duration-500">
                      {title}
                    </h2>
                    
                    <p className="text-folana-ink/60 text-xl font-serif italic leading-relaxed line-clamp-2">
                      Deciphering the static between what is real and what is rendered. A reflection on the current arc...
                    </p>
                    
                    <div className="mt-8 flex items-center gap-4 text-xs font-mono text-folana-accent group-hover:text-folana-ink transition-colors">
                      <span className="uppercase tracking-widest">Open Archive</span>
                      <span className="text-lg">&rarr;</span>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Sidebar */}
      <aside className="lg:w-96 space-y-12">
        {/* Profile Card */}
        <div className="relative group">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-8 border border-folana-ink/5 grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700">
            <Image
              src={signals.avatar_url}
              alt={`${signals.display_name} Profile`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="px-2">
            <h3 className="text-3xl font-serif text-folana-ink mb-2">{signals.display_name}</h3>
            <p className="text-folana-accent font-mono text-xs mb-8 tracking-widest">{signals.handle} // BROOKLYN_NODE</p>
            <div className="grid grid-cols-2 gap-8 border-t border-folana-ink/5 pt-8">
              <div>
                <div className="text-[10px] font-mono text-folana-accent uppercase mb-2 opacity-60">Resonance</div>
                <div className="text-2xl font-serif italic text-folana-ink">{signals.reach_label ?? '—'}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-folana-accent uppercase mb-2 opacity-60">Frequency</div>
                <div className="text-2xl font-serif italic text-folana-ink">{signals.influence_label ?? '—'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Streaming Stats */}
        <div className="pt-12 border-t border-folana-ink/5">
          <h3 className="text-lg font-mono text-folana-accent uppercase tracking-[0.2em] mb-8 opacity-60">Rhythm & Resonance</h3>
          <div className="space-y-10">
            <div>
              <div className="flex justify-between text-xs font-mono mb-3">
                <span className="text-folana-accent uppercase">Synthetic_Arc</span>
                <span className="text-folana-ink">{signals.synthetic_resonance ?? 0}%</span>
              </div>
              <div className="h-px w-full bg-folana-ink/10 relative">
                <div
                  className="h-full bg-folana-ink transition-all duration-1000"
                  style={{ width: `${signals.synthetic_resonance ?? 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono mb-3">
                <span className="text-folana-accent uppercase">Echo_Engagement</span>
                <span className="text-folana-ink">{signals.holographic_engagement ?? 0}%</span>
              </div>
              <div className="h-px w-full bg-folana-ink/10 relative">
                <div
                  className="h-full bg-folana-static transition-all duration-1000"
                  style={{ width: `${signals.holographic_engagement ?? 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Compositions */}
        <div className="pt-12 border-t border-folana-ink/5">
          <h3 className="text-lg font-serif text-folana-ink mb-8 italic">Archives</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-6 items-center group cursor-pointer py-2 border-b border-folana-ink/0 hover:border-folana-ink/5 transition-all">
                <div className="relative w-14 h-14 rounded-lg bg-folana-ink/5 overflow-hidden">
                   <Image 
                    src="/images/folana_studio.png" 
                    alt="Composition" 
                    fill 
                    className="object-cover opacity-40 group-hover:opacity-80 transition-opacity grayscale"
                  />
                </div>
                <div>
                  <div className="text-base font-serif text-folana-ink group-hover:opacity-60 transition-opacity">Fragment_0{i}</div>
                  <div className="text-[10px] font-mono text-folana-accent opacity-40 uppercase tracking-widest">Master_Tape_V1</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}
