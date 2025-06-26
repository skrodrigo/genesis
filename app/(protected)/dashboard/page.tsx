'use client'

import { ChatInput } from "@/components/chat-input"
import { useEffect, useState } from "react";
import Image from "next/image"
import { useTheme } from "next-themes"

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border text-muted hover:text-secondary transition-colors"
    >
      {icon}
      <span className="text-xs text-foreground">{label}</span>
    </button>
  );
}

export default function Page() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-1 space-y-6 flex-col w-full items-center justify-center px-4 h-[calc(100vh-12rem)]">

        <h1 className="text-4xl font-bold text-foreground">
          O que você quer construir hoje?
        </h1>

        <ChatInput />

        <div className="flex items-center justify-center gap-3 mt-4">
          <ActionButton
            icon={<Image alt="Figma" width={16} height={16} src='/figma.svg' className="w-4 h-4" />}
            label="Importe do Figma"
          />
          <ActionButton
            icon={<Image alt="Github" width={16} height={16} src={resolvedTheme === "light" ? "/github.svg" : "/github-white.svg"} className="w-4 h-4" />}
            label="Upload do Github"
          />
          <ActionButton
            icon={<Image alt="Supabase" width={16} height={16} src="/supabase.svg" className="w-4 h-4" />}
            label="Integrar e Construir"
          />
        </div>
      </div>
    </div>
  )
}
