# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev`: start the dev server at http://localhost:3000 (Turbopack)
- `npm run build`: production build (also type-checks)
- `npm run start`: serve the production build
- `npm run lint`: ESLint (flat config with `eslint-config-next` core-web-vitals and typescript presets)

No test framework is configured yet.

## Stack

- Next.js 16.4 with the App Router (`app/`), React 19.3, TypeScript (strict)
- Tailwind CSS v4. It is wired through the `@tailwindcss/turbopack` loader in `next.config.ts` (the `turbopack.rules` entry for `*.css`), not through PostCSS, so there is no `postcss.config` or `tailwind.config`. Theme tokens are defined in `app/globals.css` with `@import "tailwindcss"` and `@theme inline`.
- Import alias: `@/*` maps to the repo root.

## Next.js configuration that changes how code is written

`next.config.ts` enables options that alter default behavior. Read the matching guide in `node_modules/next/dist/docs/` before working in these areas:

- `cacheComponents: true`: caching uses the Cache Components model (`"use cache"` directive and related APIs). Older `fetch` caching and route segment config patterns do not apply. See `01-app/01-getting-started/08-caching.md`.
- `partialPrefetching: true`: navigation loads routes in stages (App Shell, then URL-dependent content, then the rest). See `01-app/02-guides/optimizing-prefetching.md`.
- `experimental.agentFeedback: true`: `next dev` maintains a feedback block in `AGENTS.md`. See `01-app/02-guides/ai-agents.md`.

Route props use the generated global helpers (for example `LayoutProps<"/">` in `app/layout.tsx`). Their types come from `.next/types`, which `next dev` or `next build` regenerates.

## On-demand rules

- `memory/frontend/CLAUDE.md`: Next.js coding rules for this project's Cache Components setup. Read it before writing or reviewing code in `app/`, `proxy.ts`, or `next.config.ts`.
- `memory/spec/CLAUDE.md`: HookHub MVP spec (scope, data model, seed hooks, acceptance criteria). Read it before building or changing features.
