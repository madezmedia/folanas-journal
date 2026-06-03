import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { ArchiveGrid } from '../components/ArchiveGrid';

export const metadata = {
  title: "Full Archive — Folana's Journal | Music & Visual Codex",
  description: "The complete unified archive of Folana Lanez — every music release, visual codex sigil, and video transmission from the wires.",
};

export default function ArchivePage() {
  return (
    <>
      <Nav />
      <main className="flex-1 max-w-[1480px] mx-auto w-full px-6 pt-28 pb-20 space-y-12">
        {/* Header */}
        <section className="border-b border-white/10 pb-8">
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-folana-neon-cyan/40 text-xs font-mono tracking-[3px] text-folana-neon-cyan">
            UNIFIED • FULL SPECTRUM
          </div>
          <h1 className="font-serif text-7xl md:text-[88px] tracking-[-4.2px] text-white mb-4 leading-none">
            The Full Archive
          </h1>
          <p className="max-w-2xl text-xl text-folana-text-secondary font-serif italic">
            Every music transmission, visual codex entry, and video artifact from the wires — unified in one frequency. Search, filter by arc, or browse the complete corpus.
          </p>
        </section>

        <ArchiveGrid />
      </main>
      <Footer />
    </>
  );
}
