'use client';

import { useState } from 'react';

interface Props {
  onSubmit: (tokenName: string, vibe: string) => void;
  disabled: boolean;
}

export default function GeneratorForm({ onSubmit, disabled }: Props) {
  const [tokenName, setTokenName] = useState('');
  const [vibe, setVibe] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenName.trim() || !vibe.trim()) return;
    onSubmit(tokenName.trim(), vibe.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-6">
      <div className="space-y-2">
        <label htmlFor="tokenName" className="block text-sm font-medium text-text-secondary">
          Token Name
        </label>
        <input
          id="tokenName"
          type="text"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          placeholder="e.g. MOONCAT"
          disabled={disabled}
          required
          maxLength={32}
          className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-xl text-white placeholder-text-secondary/50 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="vibe" className="block text-sm font-medium text-text-secondary">
          Vibe Description
        </label>
        <textarea
          id="vibe"
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          placeholder="e.g. chaotic cat energy, memes, moon vibes, absurd humor"
          disabled={disabled}
          required
          rows={3}
          maxLength={500}
          className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-xl text-white placeholder-text-secondary/50 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/30 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <button
        type="submit"
        disabled={disabled || !tokenName.trim() || !vibe.trim()}
        className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-to-r from-neon-green to-emerald-400 text-dark-bg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none active:scale-[0.98]"
      >
        🚀 Generate Launch Kit
      </button>
    </form>
  );
}
