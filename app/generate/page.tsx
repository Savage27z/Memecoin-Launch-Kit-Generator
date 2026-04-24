'use client';

import { useState, useCallback } from 'react';
import GeneratorForm from '@/components/GeneratorForm';
import ProgressTracker from '@/components/ProgressTracker';
import ResultsDisplay from '@/components/ResultsDisplay';
import { StepState, StepId, GenerationResults } from '@/lib/types';

const initialSteps: StepState[] = [
  { id: 'pitch', label: 'Generating Pitch', emoji: '📝', status: 'pending' },
  { id: 'lyrics', label: 'Writing Lyrics', emoji: '🎵', status: 'pending' },
  { id: 'banner', label: 'Creating Banner Art', emoji: '🎨', status: 'pending' },
  { id: 'music', label: 'Producing Theme Song', emoji: '🎶', status: 'pending' },
  { id: 'video', label: 'Rendering Promo Video', emoji: '🎬', status: 'pending' },
];

type Phase = 'form' | 'generating' | 'done' | 'error';

export default function GeneratePage() {
  const [phase, setPhase] = useState<Phase>('form');
  const [steps, setSteps] = useState<StepState[]>(initialSteps);
  const [results, setResults] = useState<GenerationResults>({});
  const [tokenName, setTokenName] = useState('');
  const [globalError, setGlobalError] = useState('');

  const updateStep = useCallback((stepId: StepId, updates: Partial<StepState>) => {
    setSteps(prev => prev.map(s => s.id === stepId ? { ...s, ...updates } : s));
  }, []);

  const handleGenerate = useCallback(async (name: string, vibe: string) => {
    setTokenName(name);
    setPhase('generating');
    setResults({});
    setGlobalError('');
    setSteps(initialSteps.map(s => ({ ...s, status: 'pending', error: undefined })));

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenName: name, vibe }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        let currentEvent = '';
        for (const line of lines) {
          if (line.startsWith('event: ')) {
            currentEvent = line.slice(7).trim();
          } else if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (currentEvent === 'progress') {
                updateStep(data.step as StepId, {
                  status: data.status,
                  error: data.error,
                });
              } else if (currentEvent === 'result') {
                setResults(prev => ({
                  ...prev,
                  [data.step]: data.result,
                }));
              } else if (currentEvent === 'complete') {
                setPhase('done');
              } else if (currentEvent === 'error') {
                setGlobalError(data.message);
                setPhase('error');
              }
            } catch {
              // skip malformed JSON
            }
            currentEvent = '';
          }
        }
      }

      setPhase(prev => prev === 'generating' ? 'done' : prev);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setGlobalError(msg);
      setPhase('error');
    }
  }, [updateStep]);

  const handleReset = () => {
    setPhase('form');
    setSteps(initialSteps.map(s => ({ ...s, status: 'pending', error: undefined })));
    setResults({});
    setTokenName('');
    setGlobalError('');
  };

  return (
    <div className="flex flex-col items-center px-4 pt-12 pb-16 space-y-8">
      <div className="text-center space-y-2 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-black">
          {phase === 'form' && 'Create Your Launch Kit'}
          {phase === 'generating' && (
            <>
              Generating{' '}
              <span className="text-neon-green text-glow-green">
                ${tokenName.toUpperCase()}
              </span>
            </>
          )}
          {phase === 'done' && (
            <>
              <span className="text-neon-green text-glow-green">
                ${tokenName.toUpperCase()}
              </span>{' '}
              Launch Kit Ready
            </>
          )}
          {phase === 'error' && 'Generation Error'}
        </h1>
        <p className="text-text-secondary text-sm">
          {phase === 'form' && 'Enter a token name and vibe to generate your full memecoin launch kit.'}
          {phase === 'generating' && 'Hang tight — AI is building your campaign assets...'}
          {phase === 'done' && 'Your memecoin launch kit is complete. Download and share your assets.'}
          {phase === 'error' && 'Something went wrong during generation.'}
        </p>
      </div>

      {phase === 'form' && (
        <GeneratorForm onSubmit={handleGenerate} disabled={false} />
      )}

      {(phase === 'generating' || phase === 'done' || phase === 'error') && (
        <ProgressTracker steps={steps} />
      )}

      {globalError && (
        <div className="w-full max-w-lg mx-auto px-4 py-3 rounded-xl border border-error-red/30 bg-error-red/5 text-error-red text-sm text-center">
          {globalError}
        </div>
      )}

      <ResultsDisplay results={results} tokenName={tokenName} />

      {(phase === 'done' || phase === 'error') && (
        <button
          onClick={handleReset}
          className="px-6 py-3 rounded-xl font-semibold text-sm bg-card-bg border border-card-border text-white hover:border-neon-green/30 hover:text-neon-green transition-all"
        >
          🔄 Generate Another
        </button>
      )}
    </div>
  );
}
