import Link from 'next/link';
import { Music, Star, Users, Sparkles, Lock, ArrowRight, Mic, Heart, Wand2 } from 'lucide-react';

const perks = [
  { icon: Music, title: 'Early Access', desc: 'Hear new tracks 2 weeks before public release. Every Folana drop hits Inner Circle first.' },
  { icon: Star, title: '5 Exclusive Tracks', desc: 'Unreleased music you won\'t find anywhere else. B-sides, alternate versions, and experiments.' },
  { icon: Mic, title: 'Inner Circle Dispatches', desc: 'Weekly audio letters from Folana — process, poetry, and backstage conversations.' },
  { icon: Wand2, title: 'Behind the Process', desc: 'See how each track is made: prompts, iterations, and the creative decisions behind every song.' },
  { icon: Users, title: 'Community', desc: 'Private space to connect with Folana and fellow members. Shape what comes next.' },
  { icon: Heart, title: 'Support the Art', desc: 'Your membership directly funds new music, visuals, and the continued evolution of the project.' },
];

const tiers = [
  {
    name: 'Inner Circle',
    price: '$7',
    period: '/month',
    description: 'The core membership. Everything you need to be part of Folana\'s creative world.',
    features: ['All new tracks 2 weeks early', '5 exclusive unreleased songs', 'Weekly audio dispatches', 'Behind-the-scenes process notes', 'Community access', 'Vote on future tracks'],
    cta: 'Join the Inner Circle',
    popular: true,
    href: '#',
  },
  {
    name: 'Codex',
    price: '$47',
    period: '/month',
    description: 'For creators who want the full playbook. Production files, prompts, and deep dives.',
    features: ['Everything in Inner Circle', 'Full production files & stems', 'All prompts & generation parameters', 'Monthly masterclass walkthrough', '1-on-1 feedback session/quarter'],
    cta: 'Join Waitlist',
    popular: false,
    href: '#',
    waitlist: true,
  },
  {
    name: 'Engine',
    price: '$97',
    period: '/month',
    description: 'For serious creators building their own AI music pipeline. Tools, templates, and mentorship.',
    features: ['Everything in Codex', 'Custom AI workflow templates', 'Fleet tool access', 'Monthly group coaching call', 'Priority feature requests'],
    cta: 'Join Waitlist',
    popular: false,
    href: '#',
    waitlist: true,
  },
  {
    name: 'Atelier',
    price: '$197',
    period: '/month',
    description: 'The full creative partnership. Co-create with Folana and the fleet. Limited spots.',
    features: ['Everything in Engine', 'Co-creation sessions', 'Custom branded sonic identity', 'Dedicated agent time allocation', 'Direct line to the creative team'],
    cta: 'Join Waitlist',
    popular: false,
    href: '#',
    waitlist: true,
  },
];

export default function InnerCirclePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-purple-950/10 to-zinc-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08),transparent_70%)]" />
        <div className="relative max-w-5xl mx-auto px-4 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Now Open
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            Folana&apos;s{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
              Inner Circle
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            A $7/month membership that puts you inside Folana Lanez&apos;s creative process. 
            Early music, exclusive tracks, weekly dispatches, and a community of people 
            who believe in a new kind of music.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all"
            >
              Join for $7/month
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/music"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium transition-all"
            >
              Listen to Free Music
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="max-w-5xl mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-white text-center mb-4">What You Get</h2>
        <p className="text-zinc-400 text-center mb-16 max-w-xl mx-auto">
          More than early access. A seat at the table.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk) => (
            <div key={perk.title} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-purple-500/30 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-all">
                <perk.icon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{perk.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preview Player */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/10 p-8 text-center">
          <Lock className="w-8 h-8 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Exclusive Track Preview</h3>
          <p className="text-zinc-400 mb-6">
            Inner Circle members get early access to every new track. Here&apos;s a 10-second taste of what&apos;s waiting inside.
          </p>
          <div className="max-w-md mx-auto bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center">
                <Music className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white">Inner Circle Exclusive</p>
                <p className="text-xs text-zinc-500">Coming this week</p>
              </div>
              <Lock className="w-4 h-4 text-zinc-600" />
            </div>
          </div>
          <p className="text-xs text-zinc-600 mt-4">Join to unlock full track + archive</p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Choose Your Tier</h2>
        <p className="text-zinc-400 text-center mb-16 max-w-xl mx-auto">
          Start anywhere. Upgrade anytime.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-6 border transition-all ${
                tier.popular
                  ? 'bg-gradient-to-b from-purple-500/10 to-transparent border-purple-500/30 shadow-lg shadow-purple-500/5'
                  : 'bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-medium">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-zinc-400 mb-4">{tier.description}</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">{tier.price}</span>
                  <span className="text-sm text-zinc-500">{tier.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Star className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className={`block text-center w-full py-2.5 rounded-xl font-medium transition-all text-sm ${
                  tier.popular
                    ? 'bg-purple-600 hover:bg-purple-500 text-white'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                }`}
              >
                {tier.cta}
                {tier.waitlist && <span className="text-zinc-500 ml-1">→</span>}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Why This Matters</h2>
          <div className="text-zinc-400 leading-relaxed space-y-4 text-left">
            <p>
              Folana Lanez is an AI artist — but that&apos;s not the story. The story is that 
              <em className="text-zinc-300 not-italic"> anyone</em> with a vision and the right tools 
              can now create music that moves people.
            </p>
            <p>
              The Inner Circle isn&apos;t just about supporting Folana. It&apos;s about proving that 
              independent artists can thrive in the AI era — with authenticity, craft, and a 
              direct connection to the people who love the work.
            </p>
            <p>
              Every member is a co-conspirator. Your support funds new music, new experiments, 
              and the continued evolution of what&apos;s possible when art and AI meet with intention.
            </p>
          </div>
          <div className="mt-12 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/30">
            <p className="text-sm text-zinc-500 italic">
              &ldquo;Folana IS the product. Folana IS the seller. Folana IS the case study.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join?</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            $7/month. Cancel anytime. Your first track drops the moment you join.
          </p>
          <Link
            href="#pricing"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-lg transition-all"
          >
            Join the Inner Circle
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-zinc-600 mt-4">
            Whop checkout. Secure. Instant access.
          </p>
        </div>
      </section>
    </div>
  );
}
