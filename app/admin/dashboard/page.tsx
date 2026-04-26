'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { JournalEntry } from '@/lib/journal';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        // In a real app, you'd add authentication to this API route
        const res = await fetch('/api/admin/entries');
        if (!res.ok) {
          if (res.status === 401) {
            router.push('/admin'); // Redirect to login if not authenticated
            return;
          }
          throw new Error('Failed to fetch entries');
        }
        const data: JournalEntry[] = await res.json();
        setEntries(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      const res = await fetch(`/api/admin/entries/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete entry');
      }

      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (err: any) {
      setError(err.message);
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
            entries.map((entry) => (
              <div key={entry.id} className="bg-folana-text bg-opacity-10 p-6 rounded-lg shadow-lg flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-folana-primary">{entry.title}</h2>
                  <p className="text-folana-accent text-sm mt-1">{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="space-x-4">
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
