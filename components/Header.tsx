import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-card-border/50 backdrop-blur-md bg-dark-bg/80 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🚀</span>
          <span className="font-bold text-lg text-white group-hover:text-neon-green transition-colors">
            MemeLaunchKit
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/generate"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-neon-green/10 text-neon-green border border-neon-green/20 hover:bg-neon-green/20 transition-all"
          >
            Generate
          </Link>
          <a
            href="https://platform.acedata.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-white transition-colors"
          >
            Ace Data Cloud
          </a>
        </nav>
      </div>
    </header>
  );
}
