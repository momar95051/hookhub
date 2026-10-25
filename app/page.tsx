import { HookGrid } from "@/components/HookGrid";
import { hooks } from "@/data/hooks";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans text-foreground">
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            HookHub
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Discover open-source hooks for Claude Code.
          </p>
        </header>
        <HookGrid hooks={hooks} />
      </main>
    </div>
  );
}
