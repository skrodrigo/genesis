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
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
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
        if (file && file.type.startsWith("image")) {
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target?.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }, [file]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) setFile(f);
    };

    const removeFile = () => {
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="flex flex-col items-center w-full justify-center max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
                O que você quer construir hoje?
            </h1>

            <div className="w-full">
                <div className="relative bg-secondary rounded-xl border border-border">
                    {/* Preview do arquivo anexado */}
                    {file && (
                        <div className="flex items-center gap-3 p-4 border-b border-border bg-background/70">
                            {preview ? (
                                <Image
                                    src={preview}
                                    alt={file.name}
                                    width={40}
                                    height={40}
                                    className="rounded-md object-cover w-10 h-10"
                                />
                            ) : (
                                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-muted text-muted-foreground">
                                    <Paperclip className="w-5 h-5" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="truncate font-medium text-foreground text-sm">{file.name}</div>
                                <div className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} kB</div>
                            </div>
                            <button
                                onClick={removeFile}
                                className="ml-2 text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors"
                                title="Remover"
                                type="button"
                            >
                                ×
                            </button>
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
                            placeholder="Ask a question..."
                            className={cn(
                                "w-full px-4 py-3",
                                "resize-none",
                                "bg-transparent",
                                "border-none",
                                "text-foreground text-sm",
                                "focus:outline-none",
                                "focus-visible:ring-0 focus-visible:ring-offset-0",
                                "placeholder:text-foreground placeholder:text-sm",
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
                            <button
                                type="button"
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
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-3 mt-4">
                    <ActionButton
                        icon={<Image alt="Github" width={16} height={16} src='/figma.svg' className="w-4 h-4" />}
                        label="Import from Figma"
                    />
                    <ActionButton
                        icon={<Image alt="Github" width={16} height={16} src='/github.svg' className="w-4 h-4" />}
                        label="Upload a Project"
                    />
                </div>
            </div>
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
    return (
        <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full border border-border text-muted hover:text-secondary transition-colors"
        >
            {icon}
            <span className="text-xs text-foreground">{label}</span>
        </button>
    );
}


