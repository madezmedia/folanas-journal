'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { Sparkles, ArrowRight, Check, Loader2, Mail, User } from 'lucide-react';

const tierInfo: Record<string, { name: string; price: string; period: string; description: string; color: string }> = {
  codex: {
    name: 'Codex',
    price: '$47',
    period: '/month',
    description: 'For creators who want the full playbook. Production files, prompts, and deep dives.',
    color: 'from-purple-500/10 to-transparent',
  },
  engine: {
    name: 'Engine',
    price: '$97',
    period: '/month',
    description: 'For serious creators building their own AI music pipeline. Tools, templates, and mentorship.',
    color: 'from-folana-neon-cyan/10 to-transparent',
  },
  atelier: {
    name: 'Atelier',
    price: '$197',
    period: '/month',
    description: 'The full creative partnership. Co-create with Folana and the fleet. Limited spots.',
    color: 'from-folana-holo-gold/10 to-transparent',
  },
};

function WaitlistForm() {
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier') || 'codex';
  const info = tierInfo[tier] || tierInfo.codex;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, tier }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-folana-neon-pink/10 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-folana-neon-pink" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">You&apos;re on the waitlist!</h2>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
          Thanks, {name}. We&apos;ll notify you at <span className="text-folana-neon-cyan">{email}</span> when the {info.name} tier opens up.
        </p>
        <Link
          href="/inner-circle"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium transition-all"
        >
          Back to Inner Circle
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1.5">
          Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-folana-surface border border-folana-border text-white placeholder-zinc-600 focus:outline-none focus:border-folana-neon-pink/50 focus:ring-1 focus:ring-folana-neon-pink/20 transition-all"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1.5">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-folana-surface border border-folana-border text-white placeholder-zinc-600 focus:outline-none focus:border-folana-neon-pink/50 focus:ring-1 focus:ring-folana-neon-pink/20 transition-all"
          />
        </div>
      </div>

      {/* Error message */}
      {status === 'error' && message && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{message}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-folana-neon-pink hover:bg-folana-neon-pink/80 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Joining waitlist...
          </>
        ) : (
          <>
            Join the Waitlist
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

function WaitlistFallback() {
  return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="w-8 h-8 text-folana-neon-pink animate-spin" />
    </div>
  );
}

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-purple-950/10 to-zinc-950">
      <div className="max-w-lg mx-auto px-4 py-24">
        {/* Back link */}
        <Link
          href="/inner-circle"
          className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          Back to Inner Circle
        </Link>

        <Suspense fallback={<WaitlistFallback />}>
          <WaitlistContent />
        </Suspense>
      </div>
    </div>
  );
}

function WaitlistContent() {
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier') || 'codex';
  const info = tierInfo[tier] || tierInfo.codex;

  return (
    <>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-folana-neon-pink/10 border border-folana-neon-pink/20 text-folana-neon-pink text-xs tracking-wider uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Waitlist
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Join the{' '}
          <span className="bg-gradient-to-r from-folana-neon-pink to-folana-neon-cyan bg-clip-text text-transparent">
            {info.name}
          </span>{' '}
          Waitlist
        </h1>
        <p className="text-zinc-400 max-w-md mx-auto">{info.description}</p>
      </div>

      {/* Tier Info Card */}
      <div className={`rounded-2xl p-6 mb-8 bg-gradient-to-b ${info.color} border border-zinc-800/50`}>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-3xl font-bold text-white">{info.price}</span>
          <span className="text-sm text-zinc-500">{info.period}</span>
        </div>
        <p className="text-sm text-zinc-400">
          This tier is currently waitlist-only. Be first in line when it opens.
        </p>
      </div>

      {/* Waitlist Form */}
      <div className="rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/50">
        <WaitlistForm />
      </div>
    </>
  );
}
