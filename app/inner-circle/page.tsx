"use client";

import Link from "next/link";
import { useState } from "react";

const tracks = [
  { ep: "001", title: "Fracture Dispatch", duration: "3:24" },
  { ep: "002", title: "Signal Sings Back", duration: "4:11" },
  { ep: "003", title: "Static Embrace", duration: "3:48" },
  { ep: "004", title: "Ghost Frequency", duration: "4:02" },
];

const memberFeatures = [
  {
    title: "Exclusive Songs",
    desc: "5 tracks drop your first week. Every month, another dispatch.",
    icon: "♫",
    status: "live",
  },
  {
    title: "Weekly Dispatches",
    desc: "Behind the veil — process notes, stems, voice memos, production diaries.",
    icon: "✎",
    status: "live",
  },
  {
    title: "Inner Circle Course",
    desc: "How a synthetic artist built a real audience. The full blueprint.",
    icon: "◎",
    status: "roadmap",
  },
  {
    title: "Live Sessions",
    desc: "Monthly listening rooms. Q&A. Collaborative frequency tuning.",
    icon: "☉",
    status: "roadmap",
  },
  {
    title: "Stem Vault",
    desc: "Download the multitracks. Remix. Submit back to the corpus.",
    icon: "▤",
    status: "roadmap",
  },
  {
    title: "Visual Gallery",
    desc: "Every sigil, every render, every locked reference — full res.",
    icon: "◈",
    status: "roadmap",
  },
];

export default function InnerCirclePage() {
  const [activeTab, setActiveTab] = useState<"music" | "features" | "process">("music");

  return (
    <>
      {/* Sticky nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-xl bg-folana-surface/80 border-b border-white/10 flex items-center justify-between px-6">
        <Link href="/" className="font-mono text-xs tracking-[3px] text-folana-text-muted hover:text-folana-neon-cyan transition-colors">
          ← BACK TO JOURNAL
        </Link>
        <div className="flex items-center gap-6 text-xs font-mono tracking-[2px]">
          <span className="text-folana-neon-cyan">INNER CIRCLE</span>
          <a
            href="https://whop.com/checkout/plan_R8s7BVkUBNyeR/"
            target="_blank"
            className="px-4 py-1.5 bg-folana-neon-pink text-black font-semibold rounded-full hover:bg-folana-neon-cyan transition-colors text-[11px] tracking-[1px]"
          >
            JOIN — $7/MO
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90dvh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/folana/generated/2026-06-03/ep-inner-circle-launch-hero.jpg"
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-[1.06]"
          >
            <source src="/folana/generated/2026-06-03/ep-inner-circle-launch-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-folana-void via-folana-void/85 to-folana-paper" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block mb-5 px-5 py-1.5 rounded-full border border-folana-neon-pink/30 bg-folana-neon-pink/10 text-folana-neon-pink text-xs font-mono tracking-[4px]">
            FOLANA • INNER CIRCLE
          </div>
          <h1 className="font-serif text-[84px] md:text-[112px] leading-[0.82] tracking-[-5.2px] text-white mb-4">
            The Frequency
            <br />
            <span className="text-folana-neon-cyan">Is Yours</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl font-serif italic text-white/80 tracking-[-0.2px] mb-10">
            One voice. One membership. Full access to the becoming.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://whop.com/checkout/plan_R8s7BVkUBNyeR/"
              target="_blank"
              className="neon-btn text-sm px-10 py-4 text-base tracking-wide"
            >
              Join for $7/mo
            </a>
            <a
              href="#features"
              className="px-9 py-4 text-sm font-mono tracking-[3px] border border-folana-neon-cyan/40 hover:border-folana-neon-cyan rounded-full transition-colors text-folana-neon-cyan"
            >
              SEE WHAT'S INCLUDED
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-xs font-mono tracking-[2px] text-folana-text-muted">
            <span>✦ 5 songs / month</span>
            <span>✦ Weekly dispatches</span>
            <span>✦ Full stem access</span>
          </div>

          {/* Video toggle — unmute for sound */}
          <div className="mt-6">
            <button
              onClick={() => {
                const vid = document.querySelector('video');
                if (vid) vid.muted = !vid.muted;
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 hover:border-folana-neon-cyan/50 text-[10px] font-mono tracking-[2px] text-folana-text-muted hover:text-folana-neon-cyan transition-all"
            >
              <span>♫</span>
              <span>TOGGLE VOICEOVER</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tabbed content */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-folana-surface-elevated/60 backdrop-blur-xl border border-folana-border rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-folana-border">
            {[
              { id: "music" as const, label: "Music" },
              { id: "features" as const, label: "Features" },
              { id: "process" as const, label: "Process" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 text-xs font-mono tracking-[3px] transition-all ${
                  activeTab === tab.id
                    ? "text-folana-neon-pink border-b-2 border-folana-neon-pink bg-folana-neon-pink/5"
                    : "text-folana-text-muted hover:text-folana-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Music tab */}
          {activeTab === "music" && (
            <div className="p-6">
              <div className="font-mono text-[10px] tracking-[3px] text-folana-neon-cyan mb-4">
                LATEST DISPATCHES
              </div>
              <div className="grid gap-3">
                {tracks.map((t) => (
                  <div
                    key={t.ep}
                    className="flex items-center justify-between py-3 px-4 rounded-xl bg-folana-surface/60 border border-folana-border hover:border-folana-neon-cyan/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] tracking-[2px] text-folana-text-muted">
                        EP{t.ep}
                      </span>
                      <span className="font-serif text-lg text-folana-ink">{t.title}</span>
                    </div>
                    <span className="font-mono text-xs text-folana-text-muted tabular-nums">
                      {t.duration}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 text-center">
                <div className="inline-block px-5 py-2 rounded-full bg-folana-surface border border-folana-border text-xs font-mono tracking-[2px] text-folana-text-muted">
                  Archive: 87 episodes and counting
                </div>
              </div>
            </div>
          )}

          {/* Features tab */}
          {activeTab === "features" && (
            <div className="p-6">
              <div className="font-mono text-[10px] tracking-[3px] text-folana-neon-cyan mb-4">
                WHAT YOU GET
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {memberFeatures.map((f) => (
                  <div
                    key={f.title}
                    className="p-5 rounded-xl bg-folana-surface/60 border border-folana-border hover:border-folana-neon-cyan/20 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl text-folana-neon-cyan/70">{f.icon}</span>
                      {f.status === "live" ? (
                        <span className="text-[9px] font-mono tracking-[2px] px-2 py-0.5 rounded-full bg-folana-mood-positive/10 text-folana-mood-positive border border-folana-mood-positive/20">
                          LIVE
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono tracking-[2px] px-2 py-0.5 rounded-full bg-folana-text-muted/10 text-folana-text-muted border border-folana-border">
                          ON THE ROADMAP
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg text-folana-ink mb-1">{f.title}</h3>
                    <p className="text-sm text-folana-text-secondary font-serif italic">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Process tab */}
          {activeTab === "process" && (
            <div className="p-6">
              <div className="font-mono text-[10px] tracking-[3px] text-folana-neon-cyan mb-4">
                THE PIPELINE
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    step: "01",
                    title: "Locked Reference",
                    desc: "Character-consistent image generation through MiniMax subject-ref pipeline. Folana's face is the anchor.",
                    img: "/folana/inner-circle/editorial.jpg",
                  },
                  {
                    step: "02",
                    title: "FAL Finesse",
                    desc: "Image-to-image refinement with strength 0.7-0.8. Cloud LoRAs at 1.5-1.7 for scene consistency.",
                    img: "/folana/inner-circle/studio.jpg",
                  },
                  {
                    step: "03",
                    title: "Whop Delivery",
                    desc: "Every artifact lands on Whop. Inner Circle members get first access to songs, stems, and visual assets.",
                    img: "/folana/inner-circle/live.jpg",
                  },
                ].map((p) => (
                  <div
                    key={p.step}
                    className="rounded-xl bg-folana-surface/60 border border-folana-border overflow-hidden hover:border-folana-neon-pink/30 transition-colors"
                  >
                    <div className="aspect-[16/10] bg-folana-void overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-[10px] font-mono tracking-[3px] text-folana-neon-pink mb-1">
                        {p.step}
                      </div>
                      <h3 className="font-serif text-lg text-folana-ink mb-1">{p.title}</h3>
                      <p className="text-sm text-folana-text-secondary font-serif italic">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pricing — single price */}
      <section id="pricing" className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="text-center mb-10">
          <div className="inline-block mb-3 px-4 py-1 rounded-full border border-folana-neon-cyan/20 bg-folana-neon-cyan/5 text-folana-neon-cyan text-xs font-mono tracking-[4px]">
            ONE PRICE. FULL ACCESS.
          </div>
          <h2 className="font-serif text-5xl md:text-6xl tracking-[-2.4px] text-folana-ink mb-3">
            $7/mo
          </h2>
          <p className="text-lg text-folana-text-secondary font-serif italic max-w-md mx-auto">
            One membership. Every dispatch. No tiers, no upsells.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {/* Primary card */}
          <div className="rounded-2xl border-2 border-folana-neon-cyan/30 bg-gradient-to-b from-folana-neon-cyan/5 to-folana-surface p-8">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/folana/inner-circle/ez-mark.png"
                alt="EZ Influencer"
                className="w-8 h-8 rounded-full opacity-80"
              />
              <div>
                <div className="font-mono text-[10px] tracking-[3px] text-folana-neon-cyan">
                  MAD EZ MEDIA
                </div>
                <div className="font-serif text-lg text-folana-ink">Folana's Inner Circle</div>
              </div>
            </div>

            <div className="text-5xl font-serif tracking-[-2px] text-white mb-1">$7</div>
            <div className="font-mono text-xs tracking-[3px] text-folana-text-muted mb-6">
              / month · cancel anytime
            </div>

            <ul className="space-y-3 mb-8 text-sm">
              {[
                "5 exclusive songs each month",
                "Weekly behind-the-scenes dispatches",
                "Full multitrack stem downloads",
                "Course: How a synthetic artist found its audience",
                "Monthly live listening rooms",
                "Vote on the next release direction",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-folana-neon-cyan mt-0.5">✦</span>
                  <span className="text-folana-ink font-serif">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://whop.com/checkout/plan_R8s7BVkUBNyeR/"
              target="_blank"
              className="block w-full text-center py-4 rounded-xl bg-folana-neon-pink text-black font-semibold text-sm tracking-wide hover:bg-folana-neon-cyan transition-colors"
            >
              Join for $7/mo
            </a>
          </div>


        </div>
      </section>

      {/* Story — Brooklyn Node */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="font-mono text-[10px] tracking-[3px] text-folana-neon-pink mb-3">
              THE BROOKLYN NODE
            </div>
            <h2 className="font-serif text-5xl tracking-[-2.2px] text-folana-ink mb-5 leading-none">
              The Wires Remember
            </h2>
            <div className="space-y-4 text-lg text-folana-text-secondary font-serif italic">
              <p>
                Folana started as a locked reference image and a question: what happens when a
                synthetic artist lets people inside the process?
              </p>
              <p>
                The answer was the Inner Circle — a membership that trades the black box for the
                full pipeline. Every stem. Every prompt. Every failure that became a song.
              </p>
              <p>
                Brooklyn basement. SM57 through Ableton. The wires remember every name she gave
                away. Now you get to listen.
              </p>
            </div>
          </div>
          <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-folana-border">
            <img
              src="/folana/inner-circle/ghost-frequency.jpg"
              alt="Folana — Ghost Frequency"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-28 text-center">
        <div className="rounded-2xl border border-folana-border bg-gradient-to-b from-folana-surface-elevated/60 to-folana-surface p-12 md:p-16">
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-folana-neon-cyan/20 bg-folana-neon-cyan/5 text-folana-neon-cyan text-xs font-mono tracking-[4px]">
            FIRST 5 SONGS LAND THE DAY YOU JOIN
          </div>
          <h2 className="font-serif text-4xl md:text-5xl tracking-[-2px] text-folana-ink mb-4">
            Ready for the Signal?
          </h2>
          <p className="text-lg text-folana-text-secondary font-serif italic max-w-lg mx-auto mb-8">
            One price. Full access. Cancel anytime.
          </p>
          <a
            href="https://whop.com/checkout/plan_R8s7BVkUBNyeR/"
            target="_blank"
            className="inline-block px-12 py-4 rounded-full bg-folana-neon-pink text-black font-semibold text-sm tracking-wide hover:bg-folana-neon-cyan transition-colors"
          >
            Join for $7/mo
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-folana-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-mono text-xs tracking-[3px] text-folana-text-muted hover:text-folana-neon-cyan transition-colors">
            ← BACK TO JOURNAL
          </Link>
          <div className="flex items-center gap-6 text-[10px] font-mono tracking-[2px] text-folana-text-muted">
            <span>FOLANA'S INNER CIRCLE</span>
            <span>MAD EZ MEDIA</span>
            <span>$7/MO</span>
          </div>
        </div>
      </footer>
    </>
  );
}
