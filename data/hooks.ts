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
  id: string;
  name: string;
  category: Category;
  description: string;
  repoUrl: string;
};

export const hooks: Hook[] = [
  {
    id: "block-dangerous-commands",
    name: "Block Dangerous Commands",
    category: "Security",
    description:
      "Blocks dangerous shell commands such as rm -rf ~, fork bombs, curl | sh, and force pushes to main before they run.",
    repoUrl:
      "https://github.com/karanb192/claude-code-hooks/tree/main/plugins/block-dangerous-commands",
  },
  {
    id: "protect-secrets",
    name: "Protect Secrets",
    category: "Security",
    description:
      "Prevents Claude from reading, modifying, or exfiltrating sensitive files.",
    repoUrl:
      "https://github.com/karanb192/claude-code-hooks/tree/main/plugins/protect-secrets",
  },
  {
    id: "git-safety",
    name: "Git Safety",
    category: "Git",
    description:
      "Branch-aware git guardrails plus protection against destructive gh CLI commands.",
    repoUrl:
      "https://github.com/karanb192/claude-code-hooks/tree/main/plugins/git-safety",
  },
  {
    id: "auto-stage",
    name: "Auto Stage",
    category: "Git",
    description:
      "Automatically stages files with git after Claude modifies them.",
    repoUrl:
      "https://github.com/karanb192/claude-code-hooks/tree/main/plugins/auto-stage",
  },
  {
    id: "format-code",
    name: "Format Code",
    category: "Formatting & Linting",
    description:
      "Auto-formats Python with ruff and JS/TS/HTML/JSON/MD/YAML with prettier after edits.",
    repoUrl:
      "https://github.com/karanb192/claude-code-hooks/tree/main/plugins/format-code",
  },
  {
    id: "protect-tests",
    name: "Protect Tests",
    category: "Testing",
    description:
      'Stops "fake green" by blocking deleting, renaming away, or skip-disabling tests.',
    repoUrl:
      "https://github.com/karanb192/claude-code-hooks/tree/main/plugins/protect-tests",
  },
  {
    id: "notify-permission",
    name: "Notify Permission",
    category: "Notifications",
    description: "Sends Slack alerts when Claude needs your input.",
    repoUrl:
      "https://github.com/karanb192/claude-code-hooks/tree/main/plugins/notify-permission",
  },
  {
    id: "session-logger",
    name: "Session Logger",
    category: "Logging & Observability",
    description:
      "Writes a markdown log of every session: working directory, repo, files touched, and bash commands.",
    repoUrl:
      "https://github.com/karanb192/claude-code-hooks/tree/main/plugins/session-logger",
  },
  {
    id: "voice-hooks",
    name: "Voice Hooks",
    category: "Notifications",
    description:
      "Plays sounds and spoken voice lines on Claude Code hook events.",
    repoUrl: "https://github.com/shanraisshan/claude-code-hooks",
  },
];
