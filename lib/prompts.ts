const vibeAdjectives = [
  'unstoppable', 'legendary', 'epic', 'revolutionary', 'viral',
  'iconic', 'unhinged', 'based', 'ultrasonic', 'interstellar',
];

const roadmapPhases = [
  ['Community Launch', 'Meme Deployment', 'Vibe Calibration', 'Social Takeover'],
  ['Exchange Listings', 'Partnership Raids', 'NFT Collection Drop', 'DAO Formation'],
  ['Global Meme Domination', 'Moon Landing Confirmed', 'Lambo Dealership Partnership', 'World Meme Council Seat'],
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleAndPick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generatePitchText(tokenName: string, vibe: string): string {
  const ticker = tokenName.toUpperCase();
  const adj = pickRandom(vibeAdjectives);
  const phase1 = shuffleAndPick(roadmapPhases[0], 3);
  const phase2 = shuffleAndPick(roadmapPhases[1], 3);
  const phase3 = shuffleAndPick(roadmapPhases[2], 2);

  return `🚀 Introducing $${ticker} — The Most ${adj.charAt(0).toUpperCase() + adj.slice(1)} Memecoin of the Year

$${ticker} isn't just another token — it's a full-blown movement. Born from pure ${vibe}, $${ticker} captures the raw, unfiltered spirit of the next generation of crypto degens.

We didn't just launch a coin. We launched a vibe.

💎 Why $${ticker}?
• Community-first tokenomics — 100% for the people
• AI-generated branding, anthem, and promo video
• Built for the culture, by the culture
• Embodies: ${vibe}
• Zero VC funding. Zero pretense. 100% meme energy.

📊 $${ticker} Tokenomics
• Total Supply: 1,000,000,000,000 $${ticker}
• 50% — Liquidity Pool (locked & loaded)
• 25% — Community Airdrops & Rewards
• 15% — Marketing & Meme War Chest
• 10% — Dev Fund (vested, transparent)
• 0% tax. 0% BS.

🗺️ Roadmap

Phase 1: Ignition 🔥
${phase1.map(p => `  • ${p}`).join('\n')}

Phase 2: Orbit 🛸
${phase2.map(p => `  • ${p}`).join('\n')}

Phase 3: Moon 🌙
${phase3.map(p => `  • ${p}`).join('\n')}

🌙 This isn't financial advice. This is financial vibes.

The charts don't lie. The memes don't sleep. And $${ticker} doesn't stop.

Join the $${ticker} revolution. Diamond hands only. 💎🙌

#${ticker} #ToTheMoon #DiamondHands #Memecoin`;
}

export function buildLyricsPrompt(tokenName: string, vibe: string): string {
  return `An energetic anthem for a cryptocurrency memecoin called ${tokenName}. The vibe is: ${vibe}. Make it catchy, fun, and crypto-themed with references to moon, rockets, diamond hands, and hodling. Include a memorable chorus that repeats the token name.`;
}

export function buildBannerPrompt(tokenName: string, vibe: string): string {
  return `Cryptocurrency memecoin promotional banner for "$${tokenName.toUpperCase()}", ${vibe}, digital art style, vibrant neon colors, crypto symbols, rocket ships, moon, diamond motifs, professional crypto marketing banner, bold text "$${tokenName.toUpperCase()}" prominently displayed, dark background with glowing neon accents, high quality, 4k, detailed --v 6 --ar 1:1`;
}

export function buildMusicStyle(): string {
  return 'energetic electronic pop, crypto anthem, upbeat, catchy hook';
}

export function buildVideoPrompt(tokenName: string, vibe: string): string {
  return `Cinematic crypto promotional video for $${tokenName.toUpperCase()} memecoin. ${vibe}. Dynamic camera movement, neon lights, futuristic crypto aesthetic, rockets launching to the moon. Energetic and hype.`;
}
