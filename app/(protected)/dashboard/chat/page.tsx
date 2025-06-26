"use client";
import { useState } from "react";
import { ChatInput } from "@/components/chat-input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Page() {
  const [mode, setMode] = useState<'code' | 'preview'>('code');

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <div className="flex gap-1 w-full p-1 flex-1">
        <div className="flex flex-col w-1/4 h-full border border-border rounded-xl bg-background p-1">
          <div className="flex-1 overflow-y-auto">
          </div>
          <div className="sticky bottom-0">
            <ChatInput />
          </div>
        </div>
        <div className="flex flex-col w-3/4 h-full border border-border rounded-xl bg-background p-2">
          <div className="flex-1 overflow-y-auto">
          </div>
        </div>
      </div>
    </div>
  );
}