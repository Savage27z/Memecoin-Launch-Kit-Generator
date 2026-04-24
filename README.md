# 🚀 Memecoin Launch Kit Generator

**One click. Full launch campaign. Powered by AI.**

Generate a complete memecoin launch kit — pitch, banner art, theme song, and promo video — from just a token name and a vibe description. Built with Next.js and powered by [Ace Data Cloud](https://platform.acedata.cloud) APIs.

> 🏆 Built for the [Ace Data Cloud Builder Campaign](https://platform.acedata.cloud) hackathon  
> **#BuildWithAce** **#AceDataCloud**

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Ace Data Cloud](https://img.shields.io/badge/Ace%20Data%20Cloud-API-00ff88)

---

## ✨ Features

| Feature | Description | API |
|---------|-------------|-----|
| 📝 **AI Pitch** | Auto-generated token pitch with tokenomics & roadmap | Local template engine |
| 🎨 **Banner Art** | Flux-generated promotional banner image | `/flux/images` |
| 🎵 **Theme Song** | Suno-produced anthem with AI-written lyrics | `/suno/lyrics` + `/suno/audios` |
| 🎬 **Promo Video** | Luma-generated cinematic promo from the banner | `/luma/videos` |

### How It Works

1. **Enter** a token name and vibe description
2. **Phase 1** (parallel): Pitch is generated locally, lyrics and banner are generated via Ace Data Cloud APIs
3. **Phase 2** (parallel): Theme song (from lyrics) and promo video (from banner) are generated
4. **Stream**: Progress is streamed to the browser via Server-Sent Events (SSE) in real-time
5. **Download**: All assets are downloadable — ready for your launch campaign

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS — dark crypto aesthetic with neon green + purple accents
- **APIs**: Ace Data Cloud (Suno, Flux, Luma)
- **Streaming**: Server-Sent Events for real-time progress
- **Deployment**: Vercel-ready with `maxDuration: 300s` for long-running generation

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- An [Ace Data Cloud](https://platform.acedata.cloud) API token

### Setup

```bash
# Clone the repo
git clone https://github.com/savage27z/Memecoin-Launch-Kit-Generator.git
cd Memecoin-Launch-Kit-Generator

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local and add your Ace Data Cloud API token

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `ACE_API_TOKEN` | Your Ace Data Cloud API token ([get one here](https://platform.acedata.cloud)) |

---

## 💰 API Usage & Cost

| API Call | Endpoint | Approx. Cost |
|----------|----------|-------------|
| Lyrics | `POST /suno/lyrics` | ~$0.01 |
| Banner | `POST /flux/images` | ~$0.03 |
| Theme Song | `POST /suno/audios` | ~$0.10 |
| Promo Video | `POST /luma/videos` | ~$0.30 |
| **Total per generation** | | **~$0.44** |

> 💜 Pay with **$ACE on Solana** via x402 for **5% off** all API calls

---

## 📁 Project Structure

```
app/
  layout.tsx              — Root layout with dark theme
  page.tsx                — Landing page
  globals.css             — Global styles + Tailwind
  generate/page.tsx       — Generator page (form + progress + results)
  api/generate/route.ts   — SSE streaming orchestration endpoint
components/
  Header.tsx              — Navigation header
  GeneratorForm.tsx       — Token name + vibe input form
  ProgressTracker.tsx     — Multi-step progress indicator
  ResultsDisplay.tsx      — Results cards with media players
lib/
  acedata.ts              — Ace Data Cloud API client
  prompts.ts              — Prompt templates and pitch generator
  types.ts                — TypeScript type definitions
```

---

## 🔗 Links

- **Ace Data Cloud Platform**: [platform.acedata.cloud](https://platform.acedata.cloud)
- **Ace Data Cloud API Docs**: [api.acedata.cloud](https://api.acedata.cloud)

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with 💚 for the <strong>#BuildWithAce</strong> hackathon<br/>
  Powered by <a href="https://platform.acedata.cloud">Ace Data Cloud</a>
</p>
