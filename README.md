# Girlfriend Day 💗

A mobile-first, glassmorphism, pink-and-white React site with floating hearts,
a 100-reasons page, a dramatic "if you say no" page, a sweet "if you say yes"
page, and an AI chat page powered by the Gemini API — no backend required.

## 1. Personalize it (do this first)

Almost everything you'll want to change lives in two files:

- **`src/data/config.js`** — her name, your name, "together since" date.
- **`src/data/reasons.js`** — the 100 reasons. The placeholders are generic
  on purpose; swap in your real, specific memories for the best result.

Also worth a look:
- `src/pages/Sorry.jsx` — the apology copy, if this doesn't apply to you, edit or delete the page and its nav link.
- `src/pages/SayYes.jsx` — the "future plans" list.
- `src/pages/SayNo.jsx` — the joke "consequences" list.

## 2. Install

```bash
npm install
```

## 3. Add background music (optional)

Drop an MP3 at `public/music/bg-music.mp3`. The music button in the corner
looks for that exact path. If you skip this step, the button just does
nothing — nothing else breaks.

## 4. Set up the AI chat (Gemini API)

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Paste your key into `.env`:
   ```
   VITE_GEMINI_API_KEY=your_key_here
   ```
4. The persona (how "you" text her) is defined in `src/lib/gemini.js` inside
   `buildSystemPrompt()`. It already mixes English/Hinglish and varies its
   replies — tweak the wording there to sound more like you.

### ⚠️ About API keys with no backend

Because this is a pure frontend app, your Gemini key ships inside the
JavaScript bundle and is visible to anyone who opens dev tools on your
deployed site. For a link you're sharing with one person, that's usually a
fine tradeoff — but to reduce risk:

- In Google AI Studio, restrict the key to your specific Vercel domain
  (HTTP referrer restriction).
- Set a low quota / billing alert on the key so it can't be abused.
- Don't reuse a key you use for anything sensitive elsewhere.

If you want the key fully hidden, that requires a small serverless proxy
(e.g. one Vercel Function) — outside the "no backend" scope of this build,
but straightforward to add later if you change your mind.

## 5. Run it locally

```bash
npm run dev
```

## 6. Deploy to Vercel

1. Push this project to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Vite** (auto-detected).
4. Add an environment variable: `VITE_GEMINI_API_KEY` → your key.
5. Deploy. That's it — `vercel.json` is already set up so client-side
   routing (the different pages) works correctly on refresh/direct links.

## Project structure

```
src/
  components/   Navbar, FloatingHearts, MusicPlayer, GlassCard
  pages/        Home, Sorry, Reasons, SayNo, SayYes, Chat
  data/         config.js (personalization), reasons.js (the 100 reasons)
  lib/          gemini.js (Gemini API client)
```

Built with React + Vite + Tailwind CSS + Framer Motion.
