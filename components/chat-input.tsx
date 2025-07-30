"use client";

import { ArrowUpIcon, Paperclip } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface UseAutoResizeTextareaProps {
	minHeight: number;
	maxHeight?: number;
}

function useAutoResizeTextarea({
	minHeight,
	maxHeight,
}: UseAutoResizeTextareaProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const adjustHeight = useCallback(
		(reset?: boolean) => {
			const textarea = textareaRef.current;
			if (!textarea) {
				return;
			}

			if (reset) {
				textarea.style.height = `${minHeight}px`;
				return;
			}

			textarea.style.height = `${minHeight}px`;

			const newHeight = Math.max(
				minHeight,
				Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
			);

			textarea.style.height = `${newHeight}px`;
		},
		[minHeight, maxHeight]
	);

	useEffect(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = `${minHeight}px`;
		}
	}, [minHeight]);

	useEffect(() => {
		const handleResize = () => adjustHeight();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [adjustHeight]);

	return { textareaRef, adjustHeight };
}

export function ChatInput() {
	const [value, setValue] = useState("");
	const { textareaRef, adjustHeight } = useAutoResizeTextarea({
		minHeight: 60,
		maxHeight: 200,
	});
	const [files, setFiles] = useState<File[]>([]);
	const [previews, setPreviews] = useState<(string | null)[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (value.trim()) {
				setValue("");
				adjustHeight(true);
			}
		}
	};

	useEffect(() => {
		const ps: Promise<string | null>[] = files.map((file) => {
			if (file.type.startsWith("image")) {
				const reader = new FileReader();
				return new Promise<string | null>((resolve) => {
					reader.onload = (e) => resolve(e.target?.result as string);
					reader.readAsDataURL(file);
				});
			}
			return Promise.resolve(null);
		});
		Promise.all(ps).then(setPreviews);
	}, [files]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = Array.from(e.target.files ?? []);
		const unique = selected.filter(
			(f) => !files.some((file) => file.name === f.name && file.size === f.size)
		);
		setFiles((prev) => [...prev, ...unique]);
	};

	const removeFile = (idx: number) => {
		setFiles((prev) => prev.filter((_, i) => i !== idx));
		setPreviews((prev) => prev.filter((_, i) => i !== idx));
		if (fileInputRef.current && files.length === 1) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center space-y-4">
			<div className="w-full">
				<div className="relative rounded-lg border border-border bg-muted">
					{files.length > 0 && (
						<div className="flex items-center gap-2 overflow-x-auto border-border border-b bg-background px-4 py-3">
							{files.map((file, idx) => (
								<div
									className="flex min-w-[160px] max-w-[220px] items-center gap-2 rounded-sm border border-border bg-accent px-2 py-1"
									key={file.name + file.size + idx}
								>
									{previews[idx] ? (
										<Image
											alt={file.name}
											className="h-8 w-8 rounded-sm object-cover"
											height={32}
											src={previews[idx] as string}
											width={32}
										/>
									) : (
										<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
											<Paperclip className="h-4 w-4" />
										</div>
									)}
									<div className="min-w-0 flex-1">
										<div className="truncate font-medium text-foreground text-xs">
											{file.name}
										</div>
										<div className="text-[10px] text-muted-foreground">
											{(file.size / 1024).toFixed(1)} kB
										</div>
									</div>
									<button
										className="ml-1 cursor-pointer rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
										onClick={() => removeFile(idx)}
										title="Remover"
										type="button"
									>
										×
									</button>
								</div>
							))}
						</div>
					)}
					<div className="overflow-y-auto">
						<Textarea
							className={cn(
								"w-full px-4 py-3",
								"resize-none",
								"bg-transparent",
								"border-none",
								"text-foreground text-sm",
								"focus:outline-none",
								"focus-visible:ring-0 focus-visible:ring-offset-0",
								"placeholder:text-foreground/70 placeholder:text-sm",
								"min-h-[60px]"
							)}
							onChange={(e) => {
								setValue(e.target.value);
								adjustHeight();
							}}
							onKeyDown={handleKeyDown}
							placeholder="Um SaaS web que conecte..."
							ref={textareaRef}
							style={{
								overflow: "hidden",
							}}
							value={value}
						/>
					</div>

					<div className="flex items-center justify-between p-3">
						<div className="flex items-center gap-2">
							<input
								hidden
								onChange={handleFileChange}
								ref={fileInputRef}
								type="file"
							/>
							<button
								className="group flex items-center gap-1 rounded-lg p-2 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-900"
								onClick={() => fileInputRef.current?.click()}
								type="button"
							>
								<Paperclip className="h-4 w-4 text-foreground" />
								<span className="hidden text-foreground text-xs transition-opacity group-hover:inline">
									Attach
								</span>
							</button>
						</div>
						<div className="flex items-center gap-2">
							<a href="/dashboard/chat">
								<button
									className={cn(
										"flex items-center justify-between gap-1 rounded-lg border border-border px-1.5 py-1.5 text-sm transition-colors",
										value.trim() ? "bg-foreground text-secondary" : "text-muted"
									)}
									type="button"
								>
									<ArrowUpIcon
										className={cn(
											"h-5 w-5 cursor-pointer",
											value.trim() ? "text-muted" : "text-foreground/20"
										)}
									/>
									<span className="sr-only">Send</span>
								</button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
