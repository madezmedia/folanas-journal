import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Orchestrator',
};

export default function OrchestratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
