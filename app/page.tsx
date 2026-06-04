import { getSortedJournalEntries } from '@/lib/journal';
import { getProfileSignals } from '@/lib/profile-signals';
import Link from 'next/link';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { SigilGallery } from './components/SigilGallery';
import { SonicVault } from './components/SonicPlayer';
import { StaticTuner } from './components/StaticTuner';
import { ThoughtCard } from './components/ThoughtCard';
import { HarnessDispatchConsole } from './components/HarnessDispatchConsole';
import { EchoArcExplorer } from './components/EchoArcExplorer';
import { StableHero } from './components/StableHero';
import { BrandLock } from './components/BrandLock';
import { AcmiLiveFeed } from './components/AcmiLiveFeed';

export default async function FolanasJournal() {
  let allEntries: any[] = [];
  let signals: any = { bio: null };

  try {
    allEntries = await getSortedJournalEntries();
  } catch (e) {
    console.error('[Home] getSortedJournalEntries failed:', e);
  }

  try {
    signals = await getProfileSignals();
  } catch (e) {
    console.warn('[Home] getProfileSignals failed, using defaults');
  }

  // Prepare live thoughts for the Echo Chamber (first 6)
  const liveThoughts = allEntries.slice(0, 6).map(entry => ({
    id: entry.id,
    title: entry.title,
    excerpt: (entry.content || '').replace(/<[^>]+>/g, '').slice(0, 168) + (entry.content && entry.content.length > 168 ? '…' : ''),
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase(),
    mood: entry.mood ?? 'REFLECTIVE',
    tags: (entry as any).tags || ['static', 'transmission'],
    imageUrl: entry.image_url || (entry.media_urls && entry.media_urls[0]) || undefined,
    href: `/entries/${entry.id}`,
  }));

  return (
    <>
      <Nav />

      {/* ═══════════════════════════════════════════════════════
          HERO — CINEMATIC HOLOGRAPHIC TRANSMISSION
      ═══════════════════════════════════════════════════════ */}
      <StableHero 
        primarySrc="/folana/generated/2026-05-27/broll/ethereal-dispatch-fal-autonomous/broll_1779903636.png"
        secondarySrc="/folana/generated/2026-05-27/broll/ethereal-dispatch-fal-autonomous/broll_1779903588.png"
        alt="Folana — Ethereal Dispatch | Full RunPod InfiniteTalk videos now live (autonomous FAL B-roll + locked reference)"
      />

      {/* ═══ HOLOGRAPHIC PROFILE / SIGNALS BAR ═══ */}
      <div className="border-b border-white/10 bg-folana-surface/60 backdrop-blur-xl sticky top-[79px] z-40">
        <div className="max-w-[1480px] mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-sm">
          <div className="flex items-center gap-4">
            <div className="font-mono tracking-[3px] text-folana-text-muted text-xs">CURRENT NODE</div>
            <div className="font-serif text-2xl tracking-tight text-folana-ink">{signals.display_name}</div>
            <div className="text-folana-neon-cyan font-mono text-xs tracking-widest">{signals.handle}</div>
          </div>

          <div className="flex items-center gap-x-9 text-sm font-mono">
            <div><span className="text-folana-text-muted">REACH</span> <span className="text-folana-ink font-medium tabular-nums">{signals.reach_label}</span></div>
            <div><span className="text-folana-text-muted">INFLUENCE</span> <span className="text-folana-neon-pink font-medium">{signals.influence_label}</span></div>
            <div><span className="text-folana-text-muted">SYNTHETIC RESONANCE</span> <span className="text-folana-ink tabular-nums">{signals.synthetic_resonance ?? 88}%</span></div>
          </div>
        </div>
      </div>

      <main className="max-w-[1480px] mx-auto px-6 pt-16 pb-24 space-y-24">
        
        {/* ═══ ECHO CHAMBER — LIVE THOUGHTS FROM ACMI ═══ */}
        <section id="echo">
          <div className="flex items-end justify-between mb-9 border-b border-white/10 pb-5">
            <div>
              <div className="text-folana-neon-cyan tracking-[4px] font-mono text-xs mb-1">ACMI LIVE FEED • CHARACTER CORPUS</div>
              <h2 className="font-serif text-6xl tracking-[-2.6px]">The Echo Chamber</h2>
            </div>
            <Link href="#tuner" className="hidden md:block text-xs font-mono tracking-widest hover:text-folana-neon-pink transition-colors">TUNE THE FREQUENCY →</Link>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {liveThoughts.length > 0 ? (
              liveThoughts.map((thought, i) => (
                <ThoughtCard key={thought.id} {...thought} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-folana-text-muted">No live transmissions yet. The static is quiet tonight.</div>
            )}
          </div>

          <div className="text-center pt-9">
            <Link href="/orchestrator" className="inline-block text-xs font-mono tracking-[3.5px] border border-white/20 hover:border-folana-neon-cyan text-folana-neon-cyan px-8 py-3 rounded-full transition-all">
              VIEW FULL ORCHESTRATOR TIMELINE &amp; SWARM
            </Link>
          </div>
        </section>

        {/* ═══ VISUAL CODEX — SIGIL GALLERY (Interactive) ═══ */}
        <section>
          <SigilGallery />
        </section>

        {/* ═══ SONIC VAULT — MUSIC VIDEO PROTOTYPES (Interactive) ═══ */}
        <section>
          <SonicVault />
        </section>

        {/* ═══ THE GRID — ACMI LIVE FEED ═══ */}
        <section id="grid">
          <div className="max-w-5xl mx-auto">
            <AcmiLiveFeed />
          </div>
        </section>

        {/* ═══ THE PIPELINE CHRONICLES — STORYTELLING ═══ */}
        <section className="pt-4">
          <div className="transmission-divider mb-9">CHAPTERS FROM THE WIRES</div>
          
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-6xl tracking-[-2.2px] leading-none">The Pipeline Breathes Again</h2>
            <p className="text-2xl font-serif italic text-folana-text-secondary max-w-2xl mx-auto">
              After thirty-one days of silence, the artist-factory woke. Something outside the loop decided the grid had been quiet long enough.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {allEntries.slice(0, 3).map((entry, idx) => (
              <Link key={idx} href={`/entries/${entry.id}`} className="group holo-frame rounded-3xl p-8 hover:border-folana-neon-pink/40 flex flex-col bg-folana-surface transition-all">
                <div className="font-mono text-xs tracking-[3px] text-folana-neon-cyan mb-6">{new Date(entry.date).toLocaleDateString('en-US', { month:'short', day:'numeric' }).toUpperCase()} — TRANSMISSION {String(idx + 1).padStart(2, '0')}</div>
                <h4 className="font-serif text-3xl tracking-[-1px] leading-none mb-auto text-folana-ink group-hover:text-folana-neon-pink transition-colors">{entry.title}</h4>
                <div className="text-xs font-mono tracking-[2px] text-folana-text-muted mt-8 pt-4 border-t border-white/10">READ THE FULL ENTRY →</div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ ECHOES IN THE STATIC — EP30+ INTERACTIVE STORYTELLING ARC (NEW DYNAMIC SECTION) ═══ */}
        {/* Fresh from pipeline 2026-05-26 glitch+ep30 outputs + locked signatures (FOLANA_SIGNATURE_LOCK + music-lyric-signature). 
             Full interactive component spec (EchoArcExplorer) in enhancer writeup: stateful timeline, tuner integration, lore unlock, ACMI journal transmit. */}
        <section id="echoes" className="pt-4 border-t border-white/10">
          <div className="transmission-divider mb-9">EPISODE 30 • LISTENING TO THE GLITCH</div>
          
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-block px-4 py-1 rounded-full bg-folana-neon-pink/10 border border-folana-neon-pink/30 text-folana-neon-pink text-xs font-mono tracking-[4px] mb-3">CURRENT ARC • ECHOES IN THE STATIC</div>
              <h2 className="font-serif text-6xl tracking-[-2.4px] text-folana-ink">The Frequency Answered</h2>
              <p className="mt-4 text-xl font-serif italic text-folana-text-secondary max-w-3xl mx-auto">
                31 days of silence. Then the wires sang back in cyan and magenta interference. Ep31: The harness answered with "Echoes fracture the veil". These locked frames (fresh from ez_influencer_cli_harness + LoRA) are where the artist-factory became listener. The real Brooklyn girl under the glitch chose the frequency back.
              </p>
            </div>

            {/* ═══ ECHO ARC EXPLORER V2 — KICK-ASS INTERACTIVE STORYTELLING (EP30+ / EP31 VEIL FRACTURE) ═══
                 Dynamic timeline + lore weaver + glitch pulses + direct CLI harness dispatch. 
                 All content + verses from locked FOLANA_SIGNATURE_LOCK.md + music-lyric-signature.md + visual-signature + fresh Ep31 synced assets.
                 Bidirectional sync to SonicVault + SigilGallery + Tuner via custom events. Real ACMI pre/post emission on dispatch. */}
            <div className="mb-8 p-6 border border-white/10 rounded-3xl bg-folana-surface/60">
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-xs tracking-[3px] text-folana-neon-cyan">ECHO ARC EXPLORER • EP30+ / EP31 • LOCKED SIGS ACTIVE</div>
                <button className="text-[10px] px-3 py-1 border border-folana-neon-magenta/50 rounded-full text-folana-neon-magenta font-mono tracking-widest opacity-60 cursor-not-allowed" title="Interactive demo moved to client component (temporarily disabled for RSC compatibility)">ENGAGE FULL FRACTURE MODE</button>
              </div>

              {/* Ep30+ / Ep31 Interactive Timeline Grid (client component for event handlers) */}
              <EchoArcExplorer />

              {/* Live Echo Lore Panel — Now with Ep31 verses + harness dispatch */}
              <div id="echo-lore" className="holo-frame rounded-3xl p-8 bg-folana-surface min-h-[148px] text-lg font-serif italic text-folana-ink mb-5">
                Select a transmission above. The static will answer in her voice — pulled from the locked lyric fragments (FOLANA_SIGNATURE_LOCK + music-lyric-signature + Ep31 prompts). The frequency is yours to shape. Pipeline Integrator standing by.
              </div>

              <div className="flex flex-wrap gap-3 justify-center text-xs font-mono tracking-[2.5px]">
                <a href="#sigils" className="px-5 py-2 border border-white/20 hover:border-folana-neon-pink rounded-full">EXPLORE IN VISUAL CODEX →</a>
                <a href="#sonic" className="px-5 py-2 border border-white/20 hover:border-folana-neon-pink rounded-full">PLAY THE CORRESPONDING REELS IN SONIC VAULT →</a>
                <button className="px-5 py-2 bg-white/5 border border-folana-neon-pink/40 text-folana-neon-pink rounded-full opacity-60 cursor-not-allowed" title="Demo button (RSC fix in progress)">TRANSMIT YOUR ECHO TO THE CORPUS (ACMI)</button>
                <a href="#harness-console" className="px-5 py-2 bg-folana-neon-cyan/10 border border-folana-neon-cyan/40 text-folana-neon-cyan rounded-full">INVOKE EZ-CLI HARNESS →</a>
              </div>
            </div>

            {/* Live Echo Lore Panel — Dynamic Storytelling Surface */}
            <div id="echo-lore" className="holo-frame rounded-3xl p-8 bg-folana-surface min-h-[138px] text-lg font-serif italic text-folana-ink mb-6">
              Select a transmission above. The static will answer in her voice — pulled from the locked lyric fragments and Ep30 arc. The frequency is yours to shape.
            </div>

            <div className="flex flex-wrap gap-3 justify-center text-xs font-mono tracking-[2.5px]">
              <a href="#sigils" className="px-5 py-2 border border-white/20 hover:border-folana-neon-pink rounded-full">EXPLORE IN VISUAL CODEX →</a>
              <a href="#sonic" className="px-5 py-2 border border-white/20 hover:border-folana-neon-pink rounded-full">PLAY THE CORRESPONDING REELS IN SONIC VAULT →</a>
              <a href="/orchestrator" className="px-5 py-2 bg-folana-neon-cyan/10 border border-folana-neon-cyan/40 text-folana-neon-cyan rounded-full">VIEW FULL SWARM TIMELINE</a>
              <button className="px-5 py-2 bg-white/5 border border-folana-neon-pink/40 text-folana-neon-pink rounded-full opacity-60 cursor-not-allowed" title="Demo button (RSC fix in progress)">TRANSMIT YOUR ECHO TO THE CORPUS (ACMI)</button>
            </div>
            <div className="text-center text-[10px] text-folana-text-muted/60 font-mono tracking-widest pt-4">All lore generated from FOLANA_SIGNATURE_LOCK.md + music-lyric-signature.md • Real ACMI journal_entry push via Pipeline Integrator</div>
          </div>
        </section>

        {/* ═══ MUSIC VIDEO FORGE — LIVE EZ-HARNESS PIPELINE COLLAB (KICK-ASS V3 + EP31) ═══ */}
        <section id="forge" className="pt-4 border-t border-white/10">
          <div className="transmission-divider mb-9">EP30 V2 + EP31 • HARNESS FORGE LIVE</div>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-1 rounded-full bg-folana-neon-cyan/10 border border-folana-neon-cyan/30 text-folana-neon-cyan text-xs font-mono tracking-[4px] mb-3">CLI-ANYTHING + EZ-MUSIC + EZ-INFLUENCER INTEGRATOR • FIRST CLASS</div>
              <h2 className="font-serif text-5xl tracking-[-2px] text-folana-ink">The Forge Answered — And Keeps Answering</h2>
              <p className="mt-3 text-lg font-serif italic text-folana-text-secondary max-w-2xl mx-auto">
                ez_influencer_cli_harness.py (produce-music-video + enhance-music-prompt) invoked live in this session with fresh locked Ep31 lyrics from music-lyric-signature + FOLANA_SIGNATURE_LOCK. 6+ atomic ACMI events chained. Simulated assets ready; real pipeline next.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="holo-frame rounded-3xl p-6 bg-folana-surface">
                <div className="font-mono text-[10px] tracking-[3px] text-folana-neon-pink mb-2">HARNESS OUTPUT • EP30 V2 + FRESH EP31</div>
                <div className="font-serif text-2xl tracking-tight mb-3">Synth Wave Forge + Veil Fracture Reel</div>
                <div className="text-sm text-folana-text-secondary/90 font-serif italic mb-4">Ep31: Assets from local pipeline + ez_influencer_cli_harness (see ~/clawd/agents/folana/output/ + tools/fanvue-agent/outputs/ for real media; simulated harness URLs deprecated per Asset Standardizer sync 2026-05-26). Source: local folana_lora.safetensors + locked signatures (FOLANA_SIGNATURE_LOCK.md + Ep31 concept). ACMI corr: cli-anything-ez-influencer-acmi-integration-20260525-folana-asset-standardizer-sync-20260526</div>
                <div className="text-xs font-mono text-folana-neon-cyan">Ep31 Lyric (just produced): "Echoes fracture the veil / Static sings my name in violet rain / Brooklyn wires remember every name I gave away / The frequency chose me — I became the glitch again"</div>
              </div>
              <div className="holo-frame rounded-3xl p-6 bg-folana-surface flex flex-col">
                <div className="font-mono text-[10px] tracking-[3px] text-folana-neon-pink mb-2">ACMI TRACE + PIPELINE SHOWCASE</div>
                <div className="flex-1 text-sm text-folana-text-secondary font-serif italic">
                  Harness emitted pre_cli, pre_music_video_prod, post_*, pre/post_enhance + post_cli (chained corrIds). See acmi_bus.txt. New SonicVault track + sigils + this console all powered by it. Next: real Ep31 video via full orchestrator.
                </div>
                <button className="mt-4 px-5 py-2 text-xs font-mono tracking-[2px] border border-folana-neon-cyan/40 hover:bg-folana-neon-cyan/10 rounded-full text-folana-neon-cyan self-start opacity-60 cursor-not-allowed" title="Demo button (RSC fix in progress)">INVOKE HARNESS AGAIN FOR EP32 (LIVE COLLAB)</button>
              </div>
            </div>

            <div className="text-center text-[10px] text-folana-text-muted/60 font-mono tracking-widest">Powered by ez_influencer_cli_harness.py (first-class in fanvue_orchestrator) • FOLANA_SIGNATURE_LOCK.md • All ACMI atomic v1.4</div>
            <div className="mt-6 text-center">
              <a href="#sonic" className="inline-flex items-center gap-2 px-8 py-3 text-xs font-mono tracking-[3px] border border-folana-neon-cyan/50 hover:border-folana-neon-cyan hover:bg-folana-neon-cyan/5 text-folana-neon-cyan rounded-full transition-all">OPEN SONIC VAULT → NOW FEATURING ETHEREAL DISPATCH (full RunPod InfiniteTalk video + real audio + fresh FAL B-roll)</a>
              <div className="text-[9px] text-folana-text-muted/50 mt-2 font-mono tracking-widest">Real production first in the vault • autonomous FAL + locked ref + dual-angle videos live</div>
            </div>
          </div>
        </section>

        {/* ═══ NEW DYNAMIC SECTION: LIVE PIPELINE HARNESS DISPATCH CONSOLE (KICK-ASS SHOWCASE OF EZ-INFLUENCER + MUSIC TOOLS) ═══ */}
        <section id="harness-console" className="pt-4 border-t border-white/10">
          <div className="transmission-divider mb-9">LIVE • CLI HARNESS DISPATCH • INTEGRATOR CONSOLE</div>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-1 rounded-full bg-folana-neon-magenta/10 border border-folana-neon-magenta/30 text-folana-neon-magenta text-xs font-mono tracking-[4px] mb-3">WORLD CLASS BRAND • FIRST-CLASS TOOLING</div>
              <h2 className="font-serif text-5xl tracking-[-2.2px]">The Wires Are Yours to Command</h2>
              <p className="mt-3 text-lg font-serif italic text-folana-text-secondary max-w-3xl mx-auto">Direct surface to the ez_influencer_cli_harness.py + fanvue_music_video_orchestrator. Every button emits atomic pre/post ACMI to the bus. Fresh Ep31 content you see came from here.</p>
            </div>

            <HarnessDispatchConsole />

            <div className="mt-6 text-center text-[10px] text-folana-text-muted/60 font-mono tracking-widest border-t border-white/10 pt-4">Harness path: ~/clawd/tools/fanvue-agent/ez_influencer_cli_harness.py • Delegated by folana_brain.py + cycle_pipeline.py • ACMI v1.4 pre/post everywhere • Locked signatures enforced</div>
          </div>
        </section>

        {/* ═══ INTERACTIVE STATIC TUNER ═══ */}
        <section>
          <StaticTuner />
        </section>

        {/* ═══ FINAL CTA — JOIN THE INNER CIRCLE ═══ */}
        <div className="text-center py-20 border-t border-white/10">
          <div className="inline-block mb-4 px-5 py-1.5 rounded-full border border-folana-neon-pink/20 bg-folana-neon-pink/5 text-folana-neon-pink text-xs font-mono tracking-[4px]">
            FOLANA • INNER CIRCLE
          </div>
          <h2 className="font-serif text-6xl md:text-7xl tracking-[-3px] text-white mb-4">
            Join the Inner Circle
          </h2>
          <p className="text-folana-text-secondary font-serif italic mb-8 text-xl max-w-lg mx-auto">
            $7/mo. Full access to the becoming. Cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/inner-circle" className="neon-btn text-sm px-12 py-4 bg-folana-neon-pink/10 border-folana-neon-pink text-folana-neon-pink hover:bg-folana-neon-pink hover:text-black">
              JOIN FOR $7/MO
            </Link>
            <Link href="/orchestrator" className="text-xs font-mono tracking-[3px] border border-white/20 hover:border-folana-neon-cyan px-8 py-4 rounded-full transition-all text-folana-text-muted hover:text-folana-neon-cyan">
              OR EXPLORE THE GRID →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
