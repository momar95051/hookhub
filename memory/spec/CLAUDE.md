# HookHub MVP Spec

Status: Draft · Last updated: 2026-10-25

## 1. Overview

HookHub is a website for browsing open-source Claude Code hooks. Visitors see a curated grid of hooks and follow each one to the GitHub repo where it lives.

**What a Claude Code hook is.** A hook is a user-defined shell command, configured in Claude Code's `settings.json` (or shipped in a plugin), that runs automatically at a point in Claude Code's lifecycle. Common events:

| Event | When it fires | Typical use |
|---|---|---|
| `PreToolUse` | Before a tool call runs; can block it | Block dangerous shell commands, protect secret files |
| `PostToolUse` | After a tool call succeeds | Auto-format edited files, auto-stage changes |
| `UserPromptSubmit` | When the user sends a prompt | Inject context, scan prompts |
| `Notification` | When Claude needs the user's attention | Desktop, Slack, or sound alerts |
| `Stop` | When Claude finishes a turn | Run checks, summarize work |
| `SessionStart` / `SessionEnd` | At the start and end of a session | Load context, write session logs |

The full and current event list is in the official docs: <https://code.claude.com/docs/en/hooks>.

## 2. MVP goal

A visitor opens `/`, browses a grid of hooks, and can reach any hook's GitHub repo in one click. The MVP covers **displaying** hooks only.

## 3. Scope

### In scope

- **Home page (`/`)**
  - Header with the HookHub name and a one-line tagline (for example "Discover open-source hooks for Claude Code").
  - A responsive grid of hook cards: 1 column on mobile, 2 at the `sm` breakpoint, 3 at `lg`.
  - An empty-state message when there are no hooks.
- **Hook card**
  - Name (heading)
  - Category (badge)
  - Description, clamped to 3 lines
  - "View on GitHub" link to `repoUrl`, opened in a new tab with `target="_blank" rel="noopener noreferrer"`. The whole card is clickable.
- Light and dark mode, using the existing color tokens in `app/globals.css`.
- Real page metadata (title and description) replacing "Create Next App" in `app/layout.tsx`.

### Out of scope (later)

Search, category filtering, sorting, hook detail pages, a submission form, accounts and auth, live GitHub data (stars, last updated), install instructions, and pagination.

## 4. Data model

Hooks are hand-curated in a typed file in the repo, `data/hooks.ts`. There is no database and no GitHub API call. To add a hook, open a PR that edits this file.

```ts
export const CATEGORIES = [
  "Security",
  "Notifications",
  "Formatting & Linting",
  "Git",
  "Testing",
  "Logging & Observability",
  "Context & Memory",
  "Workflow",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Hook = {
  id: string;          // kebab-case, unique; used as the React key
  name: string;
  category: Category;  // must be one of CATEGORIES
  description: string; // 1–2 sentences, at most ~200 characters
  repoUrl: string;     // https://github.com/<owner>/<repo>[/tree/<branch>/<path>]
};

export const hooks: Hook[] = [/* seed entries, section 5 */];
```

Rules:
- `id` values are unique.
- `category` is type-checked against `CATEGORIES`, so a typo fails `npm run build`.
- `repoUrl` starts with `https://github.com/`. It may point to a folder inside a collection repo when one repo holds several hooks.

## 5. Seed data

All entries below were checked against the source repos on 2026-10-25. Both repos are MIT licensed. Descriptions are condensed from each repo's README.

| id | name | category | description | repoUrl |
|---|---|---|---|---|
| `block-dangerous-commands` | Block Dangerous Commands | Security | Blocks dangerous shell commands such as `rm -rf ~`, fork bombs, `curl \| sh`, and force pushes to main before they run. | https://github.com/karanb192/claude-code-hooks/tree/main/plugins/block-dangerous-commands |
| `protect-secrets` | Protect Secrets | Security | Prevents Claude from reading, modifying, or exfiltrating sensitive files. | https://github.com/karanb192/claude-code-hooks/tree/main/plugins/protect-secrets |
| `git-safety` | Git Safety | Git | Branch-aware git guardrails plus protection against destructive `gh` CLI commands. | https://github.com/karanb192/claude-code-hooks/tree/main/plugins/git-safety |
| `auto-stage` | Auto Stage | Git | Automatically stages files with git after Claude modifies them. | https://github.com/karanb192/claude-code-hooks/tree/main/plugins/auto-stage |
| `format-code` | Format Code | Formatting & Linting | Auto-formats Python with ruff and JS/TS/HTML/JSON/MD/YAML with prettier after edits. | https://github.com/karanb192/claude-code-hooks/tree/main/plugins/format-code |
| `protect-tests` | Protect Tests | Testing | Stops "fake green" by blocking deleting, renaming away, or skip-disabling tests. | https://github.com/karanb192/claude-code-hooks/tree/main/plugins/protect-tests |
| `notify-permission` | Notify Permission | Notifications | Sends Slack alerts when Claude needs your input. | https://github.com/karanb192/claude-code-hooks/tree/main/plugins/notify-permission |
| `session-logger` | Session Logger | Logging & Observability | Writes a markdown log of every session: working directory, repo, files touched, and bash commands. | https://github.com/karanb192/claude-code-hooks/tree/main/plugins/session-logger |
| `voice-hooks` | Voice Hooks | Notifications | Plays sounds and spoken voice lines on Claude Code hook events. | https://github.com/shanraisshan/claude-code-hooks |

`Context & Memory` and `Workflow` have no seed entries yet. The grid must not depend on every category being used.

## 6. Technical approach

Follow `memory/frontend/CLAUDE.md` (Next.js 16.4 with Cache Components).

- `app/page.tsx` is a Server Component. It imports `hooks` from `data/hooks.ts` and renders `<HookGrid>` from `components/HookGrid.tsx`, which renders one `<HookCard>` (`components/HookCard.tsx`) per hook.
- No `'use client'`, no `<Suspense>`, and no `'use cache'`. The page reads no request data and does no I/O, so Cache Components prerenders it fully into the static shell.
- Styling uses Tailwind v4 utilities and the tokens in `app/globals.css`.
- Remove the create-next-app starter markup from `app/page.tsx` and delete the unused starter SVGs in `public/`.

Planned file layout:

```
app/
  layout.tsx        # update metadata
  page.tsx          # header + <HookGrid hooks={hooks} />
components/
  HookGrid.tsx      # <ul> grid, empty state
  HookCard.tsx      # one hook
data/
  hooks.ts          # CATEGORIES, Hook type, seed data
```

## 7. Accessibility

- The grid is a semantic `<ul>` with one `<li>` per card.
- The page title is the `<h1>`. Each card's name is an `<h2>`.
- Link text names the hook (for example "View Format Code on GitHub"), and the new-tab behavior is announced (for example a visually hidden "(opens in a new tab)").
- Visible keyboard focus ring on each card.
- Text and badge colors meet WCAG AA contrast in light and dark mode.

## 8. Acceptance criteria

- [ ] `npm run build` and `npm run lint` pass.
- [ ] `/` renders every entry in `hooks` as a card showing name, category, description, and link.
- [ ] Each card opens its `repoUrl` in a new tab.
- [ ] The grid shows 1, 2, and 3 columns at mobile, `sm`, and `lg` widths, with no horizontal scroll at 320px.
- [ ] Setting `hooks` to `[]` shows the empty state.
- [ ] A hook with an invalid `category` fails the type check.
- [ ] Light and dark mode both render legibly.

## 9. Open questions (post-MVP)

- Show GitHub metadata such as stars or last updated, which would need the GitHub API and caching?
- Category filtering: client-side filter on `/` or per-category routes such as `/category/security`?
- Submissions: PRs only, or a form with a review queue?
- Add hook event tags (for example `PreToolUse`) as a second facet next to category?
