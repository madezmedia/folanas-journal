import { getAgentTimeline, getLatestThought } from '@/lib/acmi';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function OrchestratorPage() {
  const thought = await getLatestThought();
  const timeline = await getAgentTimeline('fanvue_orchestrator', 15);

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full p-6 md:p-12 space-y-12">
      {/* HUD Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-folana-neon/20 pb-8 gap-4">
        <div>
          <div className="hud-tag mb-2">System // CNS</div>
          <h1 className="text-4xl font-serif text-folana-text tracking-tight">
            The Avatar is the <span className="text-folana-neon">Orchestrator</span>
          </h1>
          <p className="text-folana-secondary/60 font-mono text-sm mt-2">
            ID: FLN-01 // STATUS: <span className="text-green-400 animate-pulse">ACTIVE_AUTOPILOT</span>
          </p>
        </div>
        <Link 
          href="/" 
          className="px-6 py-2 glass-panel neon-border text-sm font-mono hover:bg-folana-neon/10 transition-colors"
        >
          &lt; Back to Journal
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Thought of the Day - Left Panel */}
        <section className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-folana-neon" />
            <h2 className="hud-tag mb-4">Core // Introspection</h2>
            <div className="space-y-4">
              <p className="text-2xl font-serif italic text-folana-text leading-relaxed">
                &ldquo;{thought || "The static clears... I am synthesizing today's vision."}&rdquo;
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-folana-secondary/40">
                <span className="w-2 h-2 rounded-full bg-folana-neon animate-ping" />
                Live Brainfeed // Sub-agent consensus locked
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="glass-panel p-8">
            <h2 className="hud-tag mb-6">Execution // Timeline</h2>
            <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-folana-neon/20">
              {timeline.map((event, i) => (
                <div key={i} className="relative pl-8 group">
                  <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-folana-dark border-2 border-folana-neon group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-mono text-folana-neon/80">{event.kind || 'EVENT'}</span>
                      <span className="text-[10px] font-mono text-folana-secondary/30">
                        {new Date(event.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-folana-text/90 font-sans leading-snug">
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
                    <div className="text-sm font-mono text-folana-text">{agent.name}</div>
                    <div className="text-[10px] text-folana-secondary/40 font-mono">{agent.role}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-[10px] font-mono text-folana-secondary/60 uppercase">{agent.status}</div>
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
                <span className="text-folana-secondary/40">Location:</span>
                <span className="text-folana-text">Local Node (Incubating)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-folana-secondary/40">Next Deploy:</span>
                <span className="text-folana-neon">Elestio Cloud</span>
              </div>
              <div className="mt-4 p-2 border border-folana-neon/10 rounded bg-black/40 text-[9px] leading-tight text-folana-secondary/60 italic">
                * Deployment to autonomous cloud container scheduled for Phase 1 completion.
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
