import Link from 'next/link';

const features = [
  { emoji: '📝', title: 'AI Pitch', desc: 'Auto-generated token elevator pitch with tokenomics & roadmap' },
  { emoji: '🎨', title: 'Banner Art', desc: 'Flux-generated promotional banner with your token branding' },
  { emoji: '🎵', title: 'Theme Song', desc: 'Suno-produced anthem with custom AI-written lyrics' },
  { emoji: '🎬', title: 'Promo Video', desc: 'Luma-generated cinematic promo video from your banner' },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4 pt-20 pb-16">
      <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/20 bg-neon-green/5 text-neon-green text-sm font-medium mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
          </span>
          Powered by Ace Data Cloud
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1]">
          <span className="text-glow-green text-neon-green">Memecoin</span>
          <br />
          <span className="text-white">Launch Kit</span>
          <br />
          <span className="bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent">
            Generator
          </span>
        </h1>

        <p className="text-xl text-text-secondary max-w-xl mx-auto leading-relaxed">
          One click. Full launch campaign. Powered by AI.
          <br />
          <span className="text-white/70">
            Enter a token name and vibe — get a complete memecoin launch kit in minutes.
          </span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-3 p-4 rounded-xl border border-card-border bg-card-bg/50 text-left hover:border-neon-green/20 transition-colors"
            >
              <span className="text-2xl mt-0.5">{f.emoji}</span>
              <div>
                <h3 className="font-semibold text-white text-sm">{f.title}</h3>
                <p className="text-xs text-text-secondary mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6">
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-neon-green to-emerald-400 text-dark-bg hover:shadow-[0_0_40px_rgba(0,255,136,0.4)] transition-all duration-300 active:scale-[0.98]"
          >
            Generate Your Launch Kit
            <span className="text-xl">→</span>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
            #BuildWithAce
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon-green/10 text-neon-green border border-neon-green/20">
            #AceDataCloud
          </span>
        </div>
      </div>

      <footer className="mt-20 text-center text-sm text-text-secondary">
        <p>
          Powered by{' '}
          <a
            href="https://platform.acedata.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-green hover:underline"
          >
            Ace Data Cloud
          </a>
          {' '}— AI APIs for the next generation of builders
        </p>
      </footer>
    </div>
  );
}
