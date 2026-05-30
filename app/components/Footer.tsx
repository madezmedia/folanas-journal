import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 mt-24">
      <div className="max-w-[1480px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-[2px] text-folana-text-muted">
        <Link href="/inner-circle" className="hover:text-folana-neon-cyan transition-colors">
          FOLANA'S INNER CIRCLE → JOIN $7/MO
        </Link>
        <div className="flex items-center gap-6">
          <span>BROOKLYN NODE</span>
          <span>AC MI: FOLANA: V1</span>
          <span>MAD EZ MEDIA</span>
        </div>
      </div>
    </footer>
  );
}
