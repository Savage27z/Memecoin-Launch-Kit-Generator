'use client';

import { useState } from 'react';
import { GenerationResults } from '@/lib/types';

interface Props {
  results: GenerationResults;
  tokenName: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neon-green/10 text-neon-green border border-neon-green/20 hover:bg-neon-green/20 transition-all"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function DownloadButton({ url, filename }: { url: string; filename: string }) {
  return (
    <a
      href={url}
      download={filename}
      target="_blank"
      rel="noopener noreferrer"
      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neon-purple/10 text-neon-purple border border-neon-purple/20 hover:bg-neon-purple/20 transition-all"
    >
      Download
    </a>
  );
}

function ResultCard({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-card-border bg-card-bg p-6 animate-fade-in space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">{emoji}</span>
        <h3 className="font-bold text-white text-lg">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function ResultsDisplay({ results, tokenName }: Props) {
  const hasAny = results.pitch || results.banner || results.music || results.video;
  if (!hasAny) return null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 mt-8">
      {results.pitch && (
        <ResultCard title="Token Pitch" emoji="📝">
          <pre className="whitespace-pre-wrap text-sm text-text-secondary font-sans leading-relaxed bg-dark-bg/50 rounded-xl p-4 max-h-96 overflow-y-auto">
            {results.pitch.text}
          </pre>
          <div className="flex justify-end">
            <CopyButton text={results.pitch.text} />
          </div>
        </ResultCard>
      )}

      {results.banner && (
        <ResultCard title="Banner Art" emoji="🎨">
          <div className="rounded-xl overflow-hidden border border-card-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={results.banner.imageUrl}
              alt={`${tokenName} banner`}
              className="w-full h-auto"
            />
          </div>
          <div className="flex justify-end">
            <DownloadButton url={results.banner.imageUrl} filename={`${tokenName}-banner.png`} />
          </div>
        </ResultCard>
      )}

      {results.lyrics && (
        <ResultCard title={results.lyrics.title || 'Lyrics'} emoji="📜">
          <pre className="whitespace-pre-wrap text-sm text-text-secondary font-sans leading-relaxed bg-dark-bg/50 rounded-xl p-4 max-h-64 overflow-y-auto">
            {results.lyrics.text}
          </pre>
          <div className="flex justify-end">
            <CopyButton text={results.lyrics.text} />
          </div>
        </ResultCard>
      )}

      {results.music && (
        <ResultCard title={results.music.title || 'Theme Song'} emoji="🎵">
          <audio
            controls
            src={results.music.audioUrl}
            className="w-full rounded-lg"
            crossOrigin="anonymous"
          />
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>Style: {results.music.style}</span>
            {results.music.duration > 0 && (
              <span>{Math.floor(results.music.duration / 60)}:{String(Math.floor(results.music.duration % 60)).padStart(2, '0')}</span>
            )}
          </div>
          <div className="flex justify-end">
            <DownloadButton url={results.music.audioUrl} filename={`${tokenName}-anthem.mp3`} />
          </div>
        </ResultCard>
      )}

      {results.video && (
        <ResultCard title="Promo Video" emoji="🎬">
          <div className="rounded-xl overflow-hidden border border-card-border bg-black">
            <video
              controls
              src={results.video.videoUrl}
              poster={results.video.thumbnailUrl}
              className="w-full"
              crossOrigin="anonymous"
            />
          </div>
          <div className="flex justify-end">
            <DownloadButton url={results.video.videoUrl} filename={`${tokenName}-promo.mp4`} />
          </div>
        </ResultCard>
      )}

      <div className="rounded-2xl border border-card-border bg-card-bg p-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">💰</span>
          <h3 className="font-bold text-white text-lg">Approximate Cost</h3>
        </div>
        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex justify-between"><span>Pitch generation</span><span className="text-neon-green">Free (local)</span></div>
          <div className="flex justify-between"><span>Lyrics (Suno)</span><span>~$0.01</span></div>
          <div className="flex justify-between"><span>Banner (Flux)</span><span>~$0.03</span></div>
          <div className="flex justify-between"><span>Theme Song (Suno)</span><span>~$0.10</span></div>
          <div className="flex justify-between"><span>Promo Video (Luma)</span><span>~$0.30</span></div>
          <div className="border-t border-card-border my-2" />
          <div className="flex justify-between font-medium text-white"><span>Total</span><span>~$0.44</span></div>
        </div>
        <p className="mt-4 text-xs text-neon-purple">
          💜 Pay with $ACE on Solana via x402 for 5% off all API calls
        </p>
      </div>
    </div>
  );
}
