'use client';

import { StepState } from '@/lib/types';

interface Props {
  steps: StepState[];
}

const statusIcons: Record<string, string> = {
  pending: '⏳',
  generating: '⚡',
  done: '✅',
  error: '❌',
};

export default function ProgressTracker({ steps }: Props) {
  return (
    <div className="w-full max-w-lg mx-auto space-y-3">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-all duration-500 ${
            step.status === 'generating'
              ? 'border-neon-green/40 bg-neon-green/5 animate-pulse'
              : step.status === 'done'
              ? 'border-emerald-500/30 bg-emerald-500/5'
              : step.status === 'error'
              ? 'border-error-red/30 bg-error-red/5'
              : 'border-card-border bg-card-bg/50'
          }`}
        >
          <span className="text-xl w-8 text-center">{step.emoji}</span>
          <div className="flex-1 min-w-0">
            <span
              className={`text-sm font-medium ${
                step.status === 'generating'
                  ? 'text-neon-green'
                  : step.status === 'done'
                  ? 'text-emerald-400'
                  : step.status === 'error'
                  ? 'text-error-red'
                  : 'text-text-secondary'
              }`}
            >
              {step.label}
            </span>
            {step.error && (
              <p className="text-xs text-error-red/80 mt-0.5 truncate">{step.error}</p>
            )}
          </div>
          <span className="text-lg">{statusIcons[step.status]}</span>
        </div>
      ))}
    </div>
  );
}
