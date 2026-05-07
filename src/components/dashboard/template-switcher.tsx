"use client";

import { type CvTemplate } from "@/types/cv";
import { cn } from "@/lib/utils";

interface Props {
  template: CvTemplate;
  onChange: (template: CvTemplate) => void;
}

const templateCards: Array<{
  value: CvTemplate;
  label: string;
  classes: string;
}> = [
  {
    value: "minimal",
    label: "Minimal",
    classes: "from-zinc-100/20 to-zinc-300/10 border-zinc-200/30",
  },
  {
    value: "modern",
    label: "Modern",
    classes: "from-violet-500/25 to-fuchsia-500/20 border-violet-300/40",
  },
  {
    value: "cyberpunk",
    label: "Siberpunk",
    classes:
      "from-cyan-500/25 via-blue-500/25 to-emerald-400/20 border-cyan-300/50",
  },
];

export function TemplateSwitcher({ template, onChange }: Props) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {templateCards.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          className={cn(
            "rounded-xl border bg-gradient-to-br p-3 text-left text-sm font-medium text-zinc-100 transition hover:-translate-y-0.5",
            item.classes,
            template === item.value
              ? item.value === "cyberpunk"
                ? "ring-2 ring-cyan-300"
                : "ring-2 ring-violet-400"
              : "opacity-85"
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
