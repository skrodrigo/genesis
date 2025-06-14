"use client";
import { useState } from "react";
import { ChatInput } from "@/components/chat-input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Page() {
  const [mode, setMode] = useState<'code' | 'preview'>('code');

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <div className="flex gap-6 w-full p-1 flex-1">
        <div className="flex flex-col w-1/4 h-full border border-border rounded-lg bg-card p-1">
          <div className="flex-1 overflow-y-auto">
          </div>
          <div className="sticky bottom-0">
            <ChatInput />
          </div>
        </div>
        <div className="flex flex-col w-3/4 h-full border border-border rounded-lg bg-card p-2">
          <div className="flex items-center justify-start mb-4">
            <ToggleGroup
              type="single"
              value={mode}
              onValueChange={v => setMode((v as 'code' | 'preview') || 'code')}
              className="bg-muted border border-border rounded-full"
            >
              <ToggleGroupItem value="code" className="px-6 py-2 font-medium">Código</ToggleGroupItem>
              <ToggleGroupItem value="preview" className="px-6 py-2 font-medium">Preview</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex-1 overflow-y-auto">
          </div>
        </div>
      </div>
    </div>
  );
}