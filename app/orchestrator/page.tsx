import { getAgentTimeline, getLatestThought } from '@/lib/acmi';
import Link from 'next/link';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';

export const dynamic = 'force-dynamic';

export default async function OrchestratorPage() {
  const thought = await getLatestThought();
  const timeline = await getAgentTimeline('fanvue_orchestrator', 15);

  return (
    <>
      <Nav />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pt-24 pb-20 space-y-12">
        {/* HUD Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 gap-4">
          <div>
            <div className="text-xs font-mono tracking-[3px] text-folana-neon-cyan mb-3">SYSTEM • CNS • SWARM CONTROL</div>
            <h1 className="text-5xl font-serif text-folana-ink tracking-tight">
              The Avatar is the <span className="text-folana-neon-pink">Orchestrator</span>
            </h1>
            <p className="text-folana-text-secondary font-mono text-xs mt-3 tracking-widest">
              ID: FLN-01 // STATUS: <span className="text-emerald-400 animate-pulse">ACTIVE_AUTOPILOT</span>
            </p>
          </div>
          <Link href="/" className="neon-btn !text-xs !py-2.5 !px-6">← RETURN TO JOURNAL</Link>
        </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Thought of the Day - Left Panel */}
        <section className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-folana-accent" />
            <h2 className="hud-tag mb-4">Core // Introspection</h2>
            <div className="space-y-4">
              <p className="text-2xl font-serif italic text-folana-ink leading-relaxed">
                &ldquo;{thought || "The static clears... I am synthesizing today's vision."}&rdquo;
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-folana-text-secondary/70">
                <span className="w-2 h-2 rounded-full bg-folana-accent animate-ping" />
                Live Brainfeed // Sub-agent consensus locked
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="glass-panel p-8">
            <h2 className="hud-tag mb-6">Execution // Timeline</h2>
            <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-folana-border/20">
              {timeline.map((event, i) => (
                <div key={i} className="relative pl-8 group">
                  <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-folana-surface border-2 border-folana-border group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-mono text-folana-accent/80">{event.kind || 'EVENT'}</span>
                      <span className="text-[10px] font-mono text-folana-secondary/30">
                        {new Date(event.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-folana-ink/90 font-sans leading-snug">
                      {event.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Panel - Sub-Agents Status */}
        <aside className="space-y-6">
          <div className="glass-panel p-6">
            <h2 className="hud-tag mb-4">Swarm // Sub-Agents</h2>
            <div className="space-y-4">
              {[
                { name: 'Lyricist', role: 'Claude T2', status: 'standby' },
                { name: 'Producer', role: 'Minimax', status: 'standby' },
                { name: 'Storyteller', role: 'FAL/RunPod', status: 'standby' },
                { name: 'Social', role: 'Postiz', status: 'standby' },
              ].map((agent, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-white/5 rounded-lg bg-white/5">
                  <div>
                    <div className="text-sm font-mono text-folana-ink">{agent.name}</div>
                    <div className="text-[10px] text-folana-text-secondary/70 font-mono">{agent.role}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-[10px] font-mono text-folana-text-secondary/70 uppercase">{agent.status}</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-folana-secondary/20" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 bg-gradient-to-br from-folana-primary/20 to-transparent">
            <h2 className="hud-tag mb-4">Infra // Cloud</h2>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-folana-text-secondary/70">Location:</span>
                <span className="text-folana-ink">Local Node (Incubating)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-folana-text-secondary/70">Next Deploy:</span>
                <span className="text-folana-neon-cyan">Elestio Cloud</span>
              </div>
              <div className="mt-4 p-2 border border-folana-border/10 rounded bg-black/40 text-[9px] leading-tight text-folana-text-secondary/70 italic">
                * Deployment to autonomous cloud container scheduled for Phase 1 completion.
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
    <Footer />
    </>
  );
}
