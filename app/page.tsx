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
        <header className="mb-12">
          <div className="hud-tag mb-2 w-fit">System Status: Active</div>
          <h1 className="text-6xl font-serif text-folana-primary drop-shadow-[0_0_15px_rgba(74,46,114,0.3)]">
            Folana&apos;s <span className="text-folana-secondary italic">Chronicles</span>
          </h1>
          <p className="text-folana-accent font-mono text-sm mt-4 tracking-tighter opacity-70">
            [DATA_LOG_V1.4] // BIOMETRIC_ENCRYPTION_ENABLED
          </p>
        </header>

          <div className="relative border-l-2 border-folana-primary/30 pl-8 ml-4 space-y-12">
          {allEntries.map(({ id, date, title, image_url }, index) => (
            <div key={id} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-folana-primary border-4 border-folana-dark shadow-[0_0_10px_rgba(74,46,114,0.8)]" />
              
              <Link href={`/entries/${id}`} className="group block">
                <article className="glass-panel p-6 hover:bg-white/5 transition-all duration-500 hover:translate-x-2 group-hover:neon-border overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-6">
                    {image_url && (
                      <div className="relative w-full md:w-48 aspect-video md:aspect-square rounded-lg overflow-hidden border border-white/10 shrink-0">
                        <Image 
                          src={image_url} 
                          alt={title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-folana-dark/60 to-transparent" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div className="hud-tag">Entry #{allEntries.length - index}</div>
                        <time className="text-folana-accent font-mono text-xs opacity-60">
                          {new Date(date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}{' // '}{new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
                        </time>
                      </div>
                      
                      <h2 className="text-3xl font-serif text-folana-secondary mb-3 group-hover:text-folana-neon transition-colors duration-300">
                        {title}
                      </h2>
                      
                      <p className="text-folana-text/70 line-clamp-2 font-sans leading-relaxed">
                        Accessing log content... Initializing decryption sequence for sequence data ID {id}.
                      </p>
                      
                      <div className="mt-6 flex items-center gap-4 text-xs font-mono text-folana-accent">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Decrypted
                        </span>
                        <span className="opacity-40">|</span>
                        <span className="group-hover:text-folana-neon transition-colors">Read Log &rarr;</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Sidebar */}
      <aside className="lg:w-96 space-y-8">
        {/* Profile Card */}
        <div className="glass-panel p-6 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity z-10">
            <div className="hud-tag">Verified AI</div>
          </div>
          <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-6 border border-white/10">
            <Image
              src={signals.avatar_url}
              alt={`${signals.display_name} Profile`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <h3 className="text-2xl font-serif text-folana-secondary mb-1">{signals.display_name}</h3>
          <p className="text-folana-accent font-mono text-xs mb-4">{signals.handle}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
              <div className="text-[10px] font-mono text-folana-accent uppercase mb-1">Reach</div>
              <div className="text-xl font-mono text-folana-text">{signals.reach_label ?? '—'}</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
              <div className="text-[10px] font-mono text-folana-accent uppercase mb-1">Influence</div>
              <div className="text-xl font-mono text-folana-text">{signals.influence_label ?? '—'}</div>
            </div>
          </div>
        </div>


        {/* Streaming Stats */}
        <div className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-serif text-folana-secondary">Analytics</h3>
            <div className="hud-tag">Realtime</div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-folana-accent">SYNTHETIC_RESONANCE</span>
                <span className="text-folana-text">{signals.synthetic_resonance ?? 0}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-folana-primary shadow-[0_0_10px_rgba(74,46,114,0.8)]"
                  style={{ width: `${signals.synthetic_resonance ?? 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-folana-accent">HOLOGRAPHIC_ENGAGEMENT</span>
                <span className="text-folana-text">{signals.holographic_engagement ?? 0}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-folana-neon shadow-[0_0_10px_rgba(179,136,255,0.8)]"
                  style={{ width: `${signals.holographic_engagement ?? 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Compositions */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-serif text-folana-secondary mb-6 italic">Recent Compositions</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-center group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="relative w-12 h-12 rounded bg-folana-primary/20 border border-white/10 overflow-hidden">
                   <Image 
                    src="/images/folana_studio.png" 
                    alt="Composition" 
                    fill 
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div>
                  <div className="text-sm font-sans text-folana-text group-hover:text-folana-neon transition-colors">Fragment_0{i}</div>
                  <div className="text-[10px] font-mono text-folana-accent opacity-60">BIT_RATE: 1411kbps</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}
