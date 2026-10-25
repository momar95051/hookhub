import type { Hook } from "@/data/hooks";

export function HookCard({ hook }: { hook: Hook }) {
  return (
    <article className="relative flex h-full flex-col gap-3 rounded-xl border border-zinc-200 bg-background p-5 transition-colors hover:border-zinc-400 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-foreground dark:border-zinc-800 dark:hover:border-zinc-600">
      <span className="w-fit rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
        {hook.category}
      </span>
      <h2 className="text-lg font-semibold tracking-tight">{hook.name}</h2>
      <p className="line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {hook.description}
      </p>
      <a
        href={hook.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto text-sm font-medium underline-offset-4 after:absolute after:inset-0 after:rounded-xl hover:underline focus-visible:outline-none"
      >
        View<span className="sr-only"> {hook.name}</span> on GitHub
        <span className="sr-only"> (opens in a new tab)</span>
        <span aria-hidden="true"> →</span>
      </a>
    </article>
  );
}
