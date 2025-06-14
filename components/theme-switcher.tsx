"use client";

import { useTheme } from "next-themes";
import { Monitor, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  {
    label: "System",
    value: "system",
    icon: Monitor,
  },
  {
    label: "Light",
    value: "light",
    icon: Sun,
  },
  {
    label: "Dark",
    value: "dark",
    icon: Moon,
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-full border border-muted bg-background p-1">
      {options.map((option) => {
        const Icon = option.icon;
        const active = theme === option.value || (theme === undefined && option.value === "system");
        return (
          <button
            key={option.value}
            aria-label={option.label}
            className={cn(
              "flex items-center hover:cursor-pointer justify-center w-8 h-4 rounded-full transition-colors",
              active ? "bg-muted text-primary" : "hover:bg-muted/50 text-muted-foreground"
            )}
            onClick={() => setTheme(option.value)}
            type="button"
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
}
