# Loren.thinks

A personal publishing site for thoughts on the AI / technology landscape — built
with **Next.js 14 (App Router, TypeScript)** and **Sanity** as the embedded
headless CMS, designed to deploy on **Vercel** within the free/hobby tiers.

## Highlights

- **Runs out-of-the-box with zero configuration.** Bundled sample content renders
  the full design immediately — `npm install && npm run dev` shows the real site
  before you connect any CMS.
- **Two timelines, side by side** — predictions vs. what actually happened, with
  right / wrong / TBD verdicts.
- **Warm editorial design** — cream/paper/ink palette, amber accents, Lora +
  DM Sans via `next/font`.
- **Sanity Studio embedded** at `/studio`, with `siteSettings` as a singleton.
- Essays **and** reposts (a post can link out to an external URL).

## Pages

| Route | What it is |
|-------|------------|
| `/` | Homepage — hero, live-signals ticker, about strip, topics grid, dual timeline teaser |
| `/writing` | Index of essays + reposts (filterable by topic) |
| `/writing/[slug]` | Article (Portable Text); reposts link out to their source |
| `/timeline` | Full dual predictions-vs-reality scoreboard |
| `/signals` | Full signal log |
| `/about` | Bio + career |
| `/studio` | Embedded Sanity Studio (no site chrome) |

Public pages live in a `(site)` route group that holds the nav + footer chrome.
The Studio lives outside that group so it renders full-screen.

---

## 1. Run locally

> Requires Node.js 18.17+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. **No environment variables are needed** — the site
serves bundled sample content until you connect Sanity. The Studio at
`/studio` will prompt for a project once you add a project ID (step 2).

### How the no-config fallback works

- `src/lib/env.ts` reads the Sanity env vars and exposes `isSanityConfigured`
  (true only when a project ID is present).
- `src/lib/sanity.client.ts` passes `projectId || 'placeholder'` to
  `createClient`, so it never throws at import time when no ID is set.
- `src/lib/data.ts` gates every GROQ query behind `isSanityConfigured`. When it
  is false (or a live query returns nothing), the bundled sample content in
  `src/lib/sampleData.ts` is returned instead.

This is what lets the design render fully before the CMS is wired up.

---

## 2. Connect Sanity

1. Create a project at <https://www.sanity.io/manage> (free plan is fine). Note
   the **Project ID**. Keep the dataset named `production`.

2. Copy the env template and fill in your project ID:

   ```bash
   cp .env.local.example .env.local
   ```

   ```dotenv
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
   ```

3. Restart `npm run dev`. Visit `/studio`, sign in, and you now have a working
   Studio. `siteSettings` appears as a single "Site settings" document
   (singleton). Once you publish content, the public pages automatically switch
   from sample data to your live CMS content.

### CORS (required for the hosted Studio to talk to the API)

In <https://www.sanity.io/manage> → your project → **API → CORS origins**, add
each origin the Studio runs on, **with credentials allowed**:

- `http://localhost:3000` (local dev)
- your production domain, e.g. `https://loren-thinks.vercel.app`
- any Vercel preview domains you use

Tick **"Allow credentials"** for each origin, or the embedded Studio login will
fail.

---

## 3. Seed starter content

`seed.ndjson` contains starter documents: site settings, 4 topics, 5 posts
(including one repost), 3 predictions, and 5 signals.

> ⚠️ **The Sanity CLI does NOT read `.env.local`.** You must authenticate and set
> the project ID **in your shell** before importing, or the import will target
> the wrong project (or fail).

### macOS / Linux (bash / zsh)

```bash
# 1. Authenticate the CLI (opens a browser)
npx sanity login

# 2. Tell the CLI which project/dataset to use (this shell only)
export SANITY_STUDIO_PROJECT_ID=your_project_id
export NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id

# 3. Import the starter content into the production dataset
#    --replace makes the import idempotent (safe to re-run)
npx sanity dataset import seed.ndjson production --replace
```

### Windows (PowerShell)

```powershell
# 1. Authenticate the CLI (opens a browser)
npx sanity login

# 2. Tell the CLI which project/dataset to use (this shell only)
$env:SANITY_STUDIO_PROJECT_ID = "your_project_id"
$env:NEXT_PUBLIC_SANITY_PROJECT_ID = "your_project_id"

# 3. Import the starter content into the production dataset
npx sanity dataset import seed.ndjson production --replace
```

If the CLI still cannot determine the project, pass it explicitly:

```bash
npx sanity dataset import seed.ndjson production --replace --project your_project_id
```

After importing, refresh `/studio` to edit the content, or reload the site to
see the seeded posts, timeline, and signals.

---

## 4. Deploy to Vercel

1. Push this project to a GitHub repository.

2. In <https://vercel.com>, **Add New → Project** and import the repo. Vercel
   auto-detects Next.js — no build settings to change.

3. Under **Settings → Environment Variables**, add all three variables and apply
   them to **Production, Preview, AND Development**:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | your project ID |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-10-01` |

4. **Redeploy.** Environment variable changes only take effect on the next
   deployment — if you added the vars after the first deploy, trigger a new
   deployment (Deployments → ⋯ → Redeploy) so the live site picks them up.

5. Add your production and preview domains to Sanity's **CORS origins** with
   credentials allowed (see step 2), then visit `https://your-domain/studio`.

Everything here fits comfortably in Vercel's Hobby tier and Sanity's free plan.

---

## Environment variables

| Variable | Required? | Notes |
|----------|-----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | No (sample data without it) | From sanity.io/manage. Enables live CMS content. |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Defaults to `production`. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | Defaults to `2024-10-01`. |

All are `NEXT_PUBLIC_` because both the site and the embedded Studio read them in
the browser.

---

## Content model

- **siteSettings** *(singleton)* — hero eyebrow/headline/body (headline supports
  `*asterisk*` → amber italic and line breaks), about blocks, full bio (rich
  text), career roles, footer tagline, logo text, subscribe URL.
- **post** — title, slug, sentiment (`concern` / `optimism` / `watching`), topic
  reference, excerpt, cover image, body (Portable Text), featured flag,
  publishedAt, plus repost fields (`isRepost`, `externalUrl`, `source`).
- **topic** — name, slug, selectable icon, description, order; essay counts are
  computed at query time.
- **prediction** — predictionText, predictionDateLabel, predictedAt, accuracy
  (`right` / `wrong` / `tbd`), realityText, realityDateLabel, realityResolved.
- **signal** — text, status (`watching` / `confirmed` / `concern`), sourceUrl,
  loggedAt.

## Tech notes

- **Next.js is pinned to `14.2.35`** — a patched 14.2.x release that includes the
  December 2025 security fix. Do **not** downgrade to `14.2.15`.
- Styling is plain CSS (`src/app/globals.css`) using the design tokens, so there
  is no extra build step or CSS framework to manage.
- Live CMS pages revalidate every 60 seconds (ISR).

## Project structure

```
.
├─ sanity.config.ts          # Studio config (singleton actions, plugins)
├─ sanity.cli.ts             # Sanity CLI config (does NOT read .env.local)
├─ seed.ndjson               # Starter content for `sanity dataset import`
├─ next.config.mjs
└─ src/
   ├─ app/
   │  ├─ layout.tsx          # Root layout (fonts + globals)
   │  ├─ globals.css
   │  ├─ (site)/             # Public pages — nav + footer chrome
   │  │  ├─ layout.tsx
   │  │  ├─ page.tsx         # Homepage
   │  │  ├─ writing/
   │  │  ├─ timeline/
   │  │  ├─ signals/
   │  │  └─ about/
   │  └─ studio/[[...tool]]/ # Embedded Studio (no chrome)
   ├─ components/            # Nav, Footer, Hero, ticker, timeline, etc.
   ├─ lib/                   # env, client, queries, data layer, sample data, types
   └─ sanity/
      ├─ schemas/            # siteSettings, post, topic, prediction, signal
      └─ structure.ts        # Desk structure (siteSettings singleton)
```
