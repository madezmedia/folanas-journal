'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewEntryPage() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = await fetch('/api/admin/entries/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, date, content }),
    });

    if (res.ok) {
      setSuccess('Entry created successfully!');
      router.push('/admin/dashboard');
    } else {
      const data = await res.json();
      setError(data.message || 'Failed to create entry');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-folana-dark text-folana-text">
      <div className="max-w-4xl mx-auto bg-folana-text bg-opacity-10 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-serif text-folana-primary mb-6">Create New Journal Entry</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-folana-accent text-sm font-bold mb-2">Title:</label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-folana-dark leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-folana-accent text-sm font-bold mb-2">Date:</label>
            <input
              type="date"
              id="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-folana-dark leading-tight focus:outline-none focus:shadow-outline"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-folana-accent text-sm font-bold mb-2">Content (Markdown):</label>
            <textarea
              id="content"
              rows={15}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-folana-dark leading-tight focus:outline-none focus:shadow-outline"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          {success && <p className="text-green-500 text-xs italic">{success}</p>}
          <button
            type="submit"
            className="bg-folana-primary hover:bg-folana-secondary text-folana-text font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
          >
            Create Entry
          </button>
        </form>
      </div>
    </div>
  );
}
