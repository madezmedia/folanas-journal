import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Music — Folana's Journal",
  description: 'QUANTUM ARC · RUST VEIN and Fracture Dispatch — real productions first. Older arcs live in the catalog.',
};

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
