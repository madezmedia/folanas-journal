'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { JournalEntry } from '@/lib/journal';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pendingId, setPendingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch('/api/admin/entries');
        if (!res.ok) {
          if (res.status === 401) {
            router.push('/admin');
            return;
          }
          throw new Error('Failed to fetch entries');
        }
        const data: JournalEntry[] = await res.json();
        setEntries(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to fetch entries');
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      const res = await fetch(`/api/admin/entries/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete entry');
      setEntries((current) => current.filter((entry) => entry.id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete entry');
    }
  };

  const handleToggleVisibility = async (id: string, currentVisibility: string | null | undefined) => {
    const next = currentVisibility === 'draft' ? 'live' : 'draft';
    setPendingId(id);
    try {
      const res = await fetch(`/api/admin/entries/${id}/visibility`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visibility: next }),
      });
      if (!res.ok) throw new Error('Failed to update visibility');
      setEntries((current) =>
        current.map((entry) => (entry.id === id ? { ...entry, visibility: next } : entry))
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update visibility');
    } finally {
      setPendingId(null);
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-folana-dark text-folana-text">Loading...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center bg-folana-dark text-folana-text">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-folana-dark text-folana-text">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-serif text-folana-primary mb-8">Admin Dashboard</h1>
        <Link href="/admin/entries/new" className="bg-folana-accent hover:bg-folana-primary text-folana-text font-bold py-2 px-4 rounded transition-colors duration-300">
          Create New Entry
        </Link>

        <div className="mt-8 space-y-6">
          {entries.length === 0 ? (
            <p className="text-folana-text">No entries found. Create one!</p>
          ) : (
            entries.map((entry) => {
              const isDraft = entry.visibility === 'draft';
              const isBrain = entry.source === 'brain';
              const isPending = pendingId === entry.id;
              return (
                <div key={entry.id} className="bg-folana-text bg-opacity-10 p-6 rounded-lg shadow-lg flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h2 className="text-2xl font-semibold text-folana-primary">{entry.title}</h2>
                      {isDraft && (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
                          Draft
                        </span>
                      )}
                      {isBrain && (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-folana-neon/20 text-folana-neon border border-folana-neon/40">
                          Brain
                        </span>
                      )}
                    </div>
                    <p className="text-folana-accent text-sm mt-1">
                      {new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="space-x-3 flex items-center">
                    <button
                      onClick={() => handleToggleVisibility(entry.id, entry.visibility)}
                      disabled={isPending}
                      className={`${
                        isDraft
                          ? 'bg-green-700 hover:bg-green-800'
                          : 'bg-yellow-700 hover:bg-yellow-800'
                      } text-white font-bold py-2 px-4 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isPending ? '…' : isDraft ? 'Publish' : 'Unpublish'}
                    </button>
                    <Link href={`/admin/entries/${entry.id}/edit`} className="bg-folana-secondary hover:bg-folana-primary text-folana-dark font-bold py-2 px-4 rounded transition-colors duration-300">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
