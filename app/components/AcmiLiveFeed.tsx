'use client';

import { useEffect, useState, useCallback } from 'react';

interface ACMIEvent {
  ts: number;
  source: string;
  kind?: string;
  summary: string;
  correlationId?: string;
}

export function AcmiLiveFeed() {
  const [events, setEvents] = useState<ACMIEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [totalAvailable, setTotalAvailable] = useState(0);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch('/api/acmi/folana-feed?limit=15');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setEvents(data.events || []);
      setTotalAvailable(data.totalAvailable || 0);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchEvents, 60_000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchEvents]);

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 60_000) return 'just now';
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const kindIcon = (kind?: string) => {
    switch (kind) {
      case 'milestone-shipped': return '★';
      case 'profile-updated': return '⚡';
      case 'coord-note': return '📡';
      case 'stage-complete': return '✅';
      case 'stage-enter': return '▶';
      case 'fleet-audit': return '🔍';
      case 'hotfix': return '🔧';
      case 'handoff-complete': return '👉';
      case 'signal-verified': return '🔵';
      default: return '●';
    }
  };

  if (loading) {
    return (
      <div className="glass-panel p-8 text-center">
        <div className="animate-pulse text-folana-text-muted font-mono text-xs tracking-widest">LISTENING FOR FOLANA'S SIGNAL...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel p-8 text-center border border-red-500/20">
        <div className="text-folana-neon-pink font-mono text-xs tracking-widest mb-2">⚠ SIGNAL LOST</div>
        <div className="text-folana-text-muted font-mono text-[10px]">{error}</div>
        <button
          onClick={fetchEvents}
          className="mt-4 text-xs font-mono tracking-widest px-4 py-2 border border-white/20 rounded-full hover:border-folana-neon-cyan text-folana-neon-cyan"
        >
          RETUNE →
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="hud-tag">ACMI // LIVE FEED</span>
            <span className={`w-2 h-2 rounded-full ${events.length > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-folana-text-muted'}`} />
            <span className="text-folana-text-muted font-mono text-[10px] tracking-widest">folana.live/grid</span>
          </div>
          <h2 className="font-serif text-3xl tracking-tight text-folana-ink">The Grid is Listening</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`text-[10px] font-mono tracking-widest px-3 py-1.5 rounded-full border transition-all ${
              autoRefresh
                ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10'
                : 'border-white/20 text-folana-text-muted'
            }`}
          >
            LIVE {autoRefresh ? '●' : '○'}
          </button>
          <button
            onClick={fetchEvents}
            className="text-[10px] font-mono tracking-widest px-3 py-1.5 border border-white/20 rounded-full hover:border-folana-neon-cyan text-folana-neon-cyan transition-all"
          >
            REFRESH ↻
          </button>
        </div>
      </div>

      {/* Subtitle */}
    {events.length > 0 && (
      <div className="text-folana-text-muted font-mono text-[10px] tracking-widest text-center mt-2 mb-6">
        {events.length} EVENTS FROM FOLANA'S CRONS & GENERATIONS • {totalAvailable} TOTAL IN FILTER
      </div>
    )}

    {/* Event Feed */}
      {events.length === 0 ? (
        <div className="text-center py-12 text-folana-text-muted font-serif italic">
          The static is quiet. No transmissions yet.
        </div>
      ) : (
        <div className="space-y-3 relative before:absolute before:left-[11px] before:top-3 before:bottom-3 before:w-[1px] before:bg-white/10 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {events.map((event, i) => {
            const summary = event.summary || '';
            // Truncate long summaries
            const displaySummary = summary.length > 200 ? summary.slice(0, 200) + '…' : summary;

            return (
              <div key={`${event.ts}-${i}`} className="flex gap-4 group hover:bg-white/[0.02] rounded-lg p-2 -mx-2 transition-colors">
                {/* Timeline Dot */}
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-[22px] h-[22px] rounded-full border border-white/20 bg-folana-surface flex items-center justify-center text-[10px] group-hover:border-folana-neon-pink/40 transition-colors">
                    {kindIcon(event.kind)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-folana-neon-cyan font-mono text-[10px] tracking-wider truncate max-w-[140px]">
                      {event.source?.replace('agent:', '') || 'folana'}
                    </span>
                    {event.kind && (
                      <span className="text-[9px] font-mono tracking-widest px-1.5 py-0.5 rounded-full bg-white/5 text-folana-text-muted uppercase">
                        {event.kind}
                      </span>
                    )}
                    <span className="text-folana-text-muted font-mono text-[9px] ml-auto whitespace-nowrap">
                      {formatTime(event.ts)}
                    </span>
                  </div>
                  <p className="text-sm text-folana-text-secondary/90 font-serif italic leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                    {displaySummary}
                  </p>
                  {event.correlationId && (
                    <div className="text-[8px] font-mono text-folana-text-muted/50 mt-1 tracking-widest truncate">
                      CID: {event.correlationId}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono tracking-widest text-folana-text-muted/60">
        <span>{events.length} EVENTS • UPDATES EVERY 60S</span>
        <a
          href="/orchestrator"
          className="hover:text-folana-neon-cyan transition-colors"
        >
          FULL SWARM VIEW →
        </a>
      </div>
    </div>
  );
}
