
# Next.js 16.4 rules

This project runs Next.js 16.4 with `cacheComponents` and `partialPrefetching` enabled. Much Next.js advice online (and in older training data) targets the previous caching model and is wrong here. When unsure, read the guide in `node_modules/next/dist/docs/01-app/` before writing code; it is the source for every rule below.

## Caching (Cache Components model)

- Cache with the `'use cache'` directive at the top of an async function, component, page, or layout. Pair every `'use cache'` with `cacheLife(...)` and tag shared data with `cacheTag(...)`, both from `next/cache`.
- Do not use the previous model: no `fetch(url, { cache: 'force-cache' | 'no-store' })`, no `next: { revalidate }`, no `unstable_cache`, no `unstable_noStore`.
- Do not export route segment config `dynamic`, `dynamicParams`, `revalidate`, `fetchCache`, `runtime`, or `experimental_ppr`. They are removed under Cache Components. The supported exports are `instant`, `ensureStatic`, `prefetch`, `maxDuration`, `preferredRegion`.
- Cached scopes cannot read `cookies()`, `headers()`, or `searchParams`. Read the value in an uncached component and pass it to the cached function as an argument (it becomes part of the cache key). Use `'use cache: private'` only when that refactor is impractical.
- Arguments and closed-over values of a cached function must be serializable.

## Request-time data and Suspense

- Any component that reads `cookies()`, `headers()`, `params`, `searchParams`, or uncached data must sit inside a `<Suspense fallback={...}>` boundary. Without one, the route blocks and the dev overlay reports a blocking-route error. Keep the boundary as close to the dynamic component as possible so the static shell stays large.
- `params` and `searchParams` are Promises; `await` them (or `use()` them in Client Components). `cookies()` and `headers()` are async too.
- For per-request values with no runtime API (`new Date()`, `Math.random()`, `crypto.randomUUID()`, synchronous DB drivers), call `await connection()` from `next/server` or `await io()` from `next/cache` first. Otherwise the value is frozen into the prerendered shell.

## Mutations and revalidation

- Mutate data in Server Actions (`'use server'`).
- In a Server Action, use `updateTag(tag)` for read-your-own-writes and `refresh()` to refresh the client router. Both work only in Server Actions.
- In Route Handlers or other server code, use `revalidateTag(tag, 'max')`. Always pass the second argument; the one-argument form is deprecated.

## Routing and files

- Request interception goes in `proxy.ts` at the repo root, exporting `proxy`. `middleware.ts` is deprecated.
- Prefer Server Components. Add `'use client'` only to the leaf that needs state, effects, or browser APIs, and keep it out of layouts.
- For a component-level error boundary, use `catchError` from `next/error` instead of a hand-written React error boundary, so `redirect()` and `notFound()` are not swallowed.
- Type route props with the generated globals (`PageProps<"/route">`, `LayoutProps<"/route">`). They come from `.next/types`, which `next dev` or `next build` regenerates.

## Prefetching

- A default `<Link>` loads only the route's App Shell. Use `<Link prefetch={true}>` when the destination's content depends on its `params` or `searchParams` and must be ready on click. See `02-guides/optimizing-prefetching.md` before changing prefetch behavior.

## Verifying

- Run `npm run build` after changes to caching, Suspense boundaries, or route config; prerender errors only surface there or in the dev overlay.
