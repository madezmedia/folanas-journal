'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      const data = await res.json();
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-folana-dark text-folana-text">
      <div className="bg-folana-text bg-opacity-10 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-serif text-folana-primary mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-folana-accent text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-folana-dark leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <button
            type="submit"
            className="bg-folana-primary hover:bg-folana-secondary text-folana-text font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
