"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
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
	const { setTheme } = useTheme();

	return (
		<div className="flex items-center gap-1 rounded-full border border-border bg-card p-2">
			{options.map((option) => {
				const Icon = option.icon;
				return (
					<button
						aria-label={option.label}
						className={cn(
							"flex h-4 w-8 items-center justify-center rounded-full transition-colors hover:cursor-pointer"
						)}
						key={option.value}
						onClick={() => setTheme(option.value)}
						type="button"
					>
						<Icon className="h-5 w-5" />
					</button>
				);
			})}
		</div>
	);
}
