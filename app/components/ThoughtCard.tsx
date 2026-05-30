import Link from "next/link";

interface ThoughtCardProps {
  title: string;
  excerpt: string;
  date: string;
  mood?: string;
  tags?: string[];
  imageUrl?: string;
  href: string;
}

export function ThoughtCard({ title, excerpt, date, mood, tags, imageUrl, href }: ThoughtCardProps) {
  return (
    <Link href={href} className="group holo-frame rounded-3xl overflow-hidden hover:border-folana-neon-pink/40 transition-all bg-folana-surface border border-white/10 flex flex-col">
      {imageUrl && (
        <div className="aspect-[16/9] overflow-hidden bg-folana-void">
          <img src={imageUrl} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-mono tracking-[3px] text-folana-neon-cyan">{date}</span>
          {tags?.slice(0, 2).map((t) => (
            <span key={t} className="text-[9px] font-mono tracking-[2px] uppercase px-2 py-0.5 rounded border border-white/10 text-folana-text-muted">{t}</span>
          ))}
        </div>
        <h3 className="font-serif text-2xl tracking-[-0.8px] text-folana-ink group-hover:text-folana-neon-pink transition-colors mb-2">{title}</h3>
        <p className="text-sm text-folana-text-secondary font-serif italic flex-1">{excerpt}</p>
      </div>
    </Link>
  );
}
