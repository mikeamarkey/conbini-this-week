# CLAUDE.md

This file provides guidance for AI assistants working in this repository.

## Project Overview

**conbini-this-week** is a Japanese convenience store (conbini) new items tracker. It scrapes weekly new product listings from 6 conbini chains and displays them on a web app.

Tracked chains: 7-Eleven, FamilyMart, Lawson, Ministop, NewDays, Daily Yamazaki.

## Repository Structure

```
conbini-this-week/
├── apps/
│   ├── web/               # Next.js 14 web application
│   └── scraper-api/       # Vercel serverless scraping API
├── packages/
│   ├── core/              # Shared types & conbini constants
│   ├── db/                # Supabase PostgreSQL client & generated types
│   └── scraper/           # Web scraping logic (JSDOM + Zod)
├── .github/workflows/     # CI checks + scheduled scraper
└── [config files]
```

## Tech Stack

- **Package manager:** pnpm v9.1.0 with workspaces
- **Node:** v20.13.0 (see `.nvmrc`)
- **Web:** Next.js 14, React 18, TailwindCSS 3
- **Scraper:** jsdom, Zod (schema validation)
- **Database:** Supabase (PostgreSQL) via `@supabase/supabase-js`
- **TypeScript:** 4.9.4, strict mode

## Development Commands

Run from the repo root:

| Command | Purpose |
|---------|---------|
| `pnpm checks` | Run all checks (lint + prettier + tsc) |
| `pnpm fix` | Auto-fix lint and format issues |
| `pnpm checks:lint` / `pnpm fix:lint` | ESLint only |
| `pnpm checks:prettier` / `pnpm fix:prettier` | Prettier only |
| `pnpm checks:biome` / `pnpm fix:biome` | Biome only |
| `pnpm checks:tsc` | TypeScript type check across all workspaces |
| `pnpm web dev` | Start Next.js dev server |
| `pnpm web build` | Build the web app |
| `pnpm web test` | Run web app tests (Jest) |
| `pnpm scraper scrape` | Run the scraper manually |
| `pnpm db generate` | Regenerate Supabase TypeScript types |

## Code Conventions

- **Formatting:** No semicolons, single quotes, trailing commas (es5). Enforced by Prettier + Biome.
- **Imports:** Sorted alphabetically via ESLint `import/order`. Use the `type` keyword for type-only imports (`import type { Foo } from '...'`).
- **Unused vars:** Must be prefixed with `_`.
- **Components:** PascalCase directory names with `index.tsx` entry point.
- **Utilities/hooks:** camelCase filenames.
- **Constants:** UPPER_CASE.

## Architecture Notes

- **Cross-workspace imports** use TypeScript path aliases configured per-app (e.g., `~/db`, `~/core`).
- **`packages/core/src/constant.ts`** — `conbinisMap` defines all 6 conbinis with their base URL, hostname, displayName, and `newItemsUrl` function.
- **`packages/scraper/src/scrape.ts`** — JSDOM-based scraping. Ministop and NewDays use JSON APIs instead. 7-Eleven requires pagination.
- **`packages/db/src/client.ts`** — Supabase client. `insertItem()` upserts on the `img` field to prevent duplicates. `getItems()` returns items from the last 7 days.
- **`apps/web/src/app/page.tsx`** — Next.js server component; revalidates every 360 seconds.
- **`apps/scraper-api/api/index.ts`** — POST endpoint with bearer token auth (`API_SECRET_KEY`). Accepts `?name=<conbini>&dry=<flag>` query params.

## Environment Setup

Each package with a `.env.template` file needs a corresponding `.env` file:

- `packages/db/.env` — Supabase URL and anon key
- `apps/scraper-api/.env` — `API_SECRET_KEY` for auth

## Git Hooks

Husky runs `pnpm staged` (lint-staged) on pre-commit. Staged `.ts`/`.tsx` files are auto-fixed with ESLint and formatted with Prettier before the commit completes.

## CI/CD

- **`.github/workflows/checks.yml`** — Runs `pnpm checks` on every push.
- **`.github/workflows/conbini-haul.yml`** — Scheduled scraper, runs Tuesdays at 11:50 JST (02:50 UTC).
