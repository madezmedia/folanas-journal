'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Check, Loader2, Globe } from 'lucide-react';
import { toast } from 'sonner';

const PLATFORMS = [
  { id: 'facebook', label: 'Facebook', icon: '📘', enabled: true },
  { id: 'instagram', label: 'Instagram', icon: '📷', enabled: false, note: 'Setup needed' },
  { id: 'linkedin', label: 'LinkedIn', icon: '💼', enabled: false, note: 'Re-auth needed' },
  { id: 'reddit', label: 'Reddit', icon: '🧑‍💻', enabled: false, note: 'Re-auth needed' },
  { id: 'slack', label: 'Slack', icon: '💬', enabled: false, note: 'Setup needed' },
];

interface BroadcastDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  caption: string;
  imageUrl?: string;
  link?: string;
}

export function BroadcastDialog({ isOpen, onClose, title, caption, imageUrl, link }: BroadcastDialogProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook']);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [resultMsg, setResultMsg] = useState('');

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleBroadcast = async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caption: caption.slice(0, 500),
          title: title,
          imageUrl: imageUrl,
          platforms: selectedPlatforms,
          link: link,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('done');
        setResultMsg(data.message);
        toast.success('BROADCAST QUEUED', { description: data.message });
      } else {
        setStatus('error');
        setResultMsg(data.message || 'Broadcast failed');
        toast.error('BROADCAST FAILED', { description: data.message });
      }
    } catch {
      setStatus('error');
      setResultMsg('Network error — please try again');
      toast.error('BROADCAST ERROR');
    }
  };

  const handleCopyPost = () => {
    const post = `${title}\n\n${caption}${link ? `\n\n${link}` : ''}`;
    navigator.clipboard.writeText(post);
    toast.success('POST COPIED', { description: 'Formatted text ready to paste anywhere.' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 30 }}
            transition={{ ease: [0.21, 0.92, 0.3, 1], duration: 0.3 }}
            className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-folana-surface p-6 md:p-8"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-folana-text-secondary hover:text-white hover:border-folana-neon-pink transition-all">
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-folana-neon-cyan/10 flex items-center justify-center">
                <Globe size={20} className="text-folana-neon-cyan" />
              </div>
              <div>
                <div className="font-mono text-xs tracking-[3px] text-folana-neon-cyan">BROADCAST TRANSMISSION</div>
                <div className="font-serif text-xl text-folana-ink">Send to Social</div>
              </div>
            </div>

            {/* Preview */}
            <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="font-serif text-sm text-folana-ink mb-1 line-clamp-1">{title}</div>
              <p className="text-xs text-folana-text-secondary font-serif italic line-clamp-3">{caption}</p>
            </div>

            {/* Platform selection */}
            <div className="space-y-2 mb-6">
              <div className="font-mono text-[10px] tracking-[3px] text-folana-text-muted mb-3">SELECT PLATFORMS</div>
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => p.enabled && togglePlatform(p.id)}
                  disabled={!p.enabled}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                    selectedPlatforms.includes(p.id)
                      ? 'bg-folana-neon-cyan/10 border-folana-neon-cyan/50 text-white'
                      : p.enabled
                      ? 'border-white/10 text-folana-text-secondary hover:border-white/30'
                      : 'border-white/5 text-folana-text-muted/50 opacity-50'
                  }`}
                >
                  <span className="text-lg">{p.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-mono tracking-wide">{p.label}</div>
                    {!p.enabled && p.note && (
                      <div className="text-[10px] text-folana-neon-pink/60">{p.note}</div>
                    )}
                  </div>
                  {selectedPlatforms.includes(p.id) && (
                    <Check size={16} className="text-folana-neon-cyan" />
                  )}
                </button>
              ))}
            </div>

            {/* Actions */}
            {status === 'done' ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-folana-mood-positive/10 flex items-center justify-center mx-auto mb-3">
                  <Check size={24} className="text-folana-mood-positive" />
                </div>
                <div className="font-mono text-xs tracking-[2px] text-folana-mood-positive">{resultMsg}</div>
                <button onClick={onClose} className="mt-4 text-xs font-mono tracking-[2px] text-folana-text-muted hover:text-white transition-colors">DISMISS</button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleBroadcast}
                  disabled={status === 'loading' || selectedPlatforms.length === 0}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-folana-neon-cyan text-black font-mono text-xs tracking-[3px] hover:bg-folana-neon-cyan/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <><Loader2 size={16} className="animate-spin" /> BROADCASTING...</>
                  ) : (
                    <><Send size={16} /> BROADCAST TO {selectedPlatforms.length} PLATFORM{selectedPlatforms.length > 1 ? 'S' : ''}</>
                  )}
                </button>
                <button
                  onClick={handleCopyPost}
                  className="w-full py-3 rounded-xl border border-white/20 text-folana-text-secondary font-mono text-xs tracking-[2px] hover:text-white hover:border-white/40 transition-all"
                >
                  COPY FORMATTED POST
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
