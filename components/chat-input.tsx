"use client";

import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
    ArrowUpIcon,
    Paperclip,
} from "lucide-react";
import Image from "next/image";

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
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            textarea.style.height = `${minHeight}px`;

            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
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
        if (fileInputRef.current && files.length === 1) fileInputRef.current.value = "";
    };


    return (
        <div className="flex flex-col items-center w-full justify-center max-w-4xl mx-auto space-y-4">

            <div className="w-full">
                <div className="relative bg-muted border border-border rounded-lg">
                    {files.length > 0 && (
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background overflow-x-auto">
                            {files.map((file, idx) => (
                                <div
                                    key={file.name + file.size + idx}
                                    className="flex items-center gap-2 px-2 py-1 rounded-sm border border-border bg-accent min-w-[160px] max-w-[220px]"
                                >
                                    {previews[idx] ? (
                                        <Image
                                            src={previews[idx] as string}
                                            alt={file.name}
                                            width={32}
                                            height={32}
                                            className="rounded-sm object-cover w-8 h-8"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                            <Paperclip className="w-4 h-4" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="truncate font-medium text-foreground text-xs">{file.name}</div>
                                        <div className="text-[10px] text-muted-foreground">{(file.size / 1024).toFixed(1)} kB</div>
                                    </div>
                                    <button
                                        onClick={() => removeFile(idx)}
                                        className="ml-1 cursor-pointer   text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors"
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
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Um SaaS web que conecte..."
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
                            style={{
                                overflow: "hidden",
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-2">
                            <input
                                ref={fileInputRef}
                                type="file"
                                hidden
                                onChange={handleFileChange}
                            />
                            <button
                                type="button"
                                className="group p-2 hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-lg transition-colors flex items-center gap-1"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Paperclip className="w-4 h-4 text-foreground" />
                                <span className="text-xs text-foreground hidden group-hover:inline transition-opacity">
                                    Attach
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <a href="/dashboard/chat" >
                                <button
                                    className={cn(
                                        "px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-border flex items-center justify-between gap-1",
                                        value.trim()
                                            ? "bg-foreground text-secondary"
                                            : "text-muted"
                                    )}
                                >
                                    <ArrowUpIcon
                                        className={cn(
                                            "w-5 h-5 cursor-pointer",
                                            value.trim()
                                                ? "text-muted"
                                                : "text-foreground/20"
                                        )}
                                    />
                                    <span className="sr-only">Send</span>
                                </button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




