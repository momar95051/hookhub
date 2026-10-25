import type { Hook } from "@/data/hooks";
import { HookCard } from "@/components/HookCard";

export function HookGrid({ hooks }: { hooks: Hook[] }) {
  if (hooks.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300 p-10 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
        No hooks yet. Check back soon.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {hooks.map((hook) => (
        <li key={hook.id}>
          <HookCard hook={hook} />
        </li>
      ))}
    </ul>
  );
}
