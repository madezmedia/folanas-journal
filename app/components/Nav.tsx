import Link from "next/link";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 backdrop-blur-xl bg-folana-paper/80 border-b border-white/10 flex items-center justify-between px-6 font-mono text-xs tracking-[3px]">
      <Link href="/" className="flex items-center gap-3 hover:text-folana-neon-cyan transition-colors">
        <span className="text-lg">◈</span>
        <span className="hidden sm:inline text-folana-ink">FOLANA'S JOURNAL</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/orchestrator" className="text-folana-text-muted hover:text-folana-neon-cyan transition-colors">
          ORCHESTRATOR
        </Link>
        <Link href="/inner-circle" className="text-folana-neon-pink hover:text-folana-neon-cyan transition-colors">
          INNER CIRCLE
        </Link>
        <a href="https://whop.com/checkout/plan_2Tz2QipTSn0O9" target="_blank" className="px-4 py-1.5 bg-folana-neon-pink text-black font-semibold rounded-full hover:bg-folana-neon-cyan transition-colors text-[11px] tracking-[1px]">
          JOIN $7/MO
        </a>
      </div>
    </nav>
  );
}
