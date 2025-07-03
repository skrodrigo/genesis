"use client"

import { ChatInput } from "@/components/chat-input"
import Image from "next/image"
import { Share } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import TreeExample from "@/components/tree-example"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { useState, useEffect } from "react"

export default function Page() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background">
      <div className="flex flex-1 gap-1 p-1 overflow-hidden">
        {/* messages */}
        <div className="flex w-1/4 flex-col overflow-hidden border border-border rounded-lg bg-background p-1">
          <ScrollArea className="flex-1">messages</ScrollArea>
          <div className="sticky bottom-0">
            <ChatInput />
          </div>
        </div>

        {/* editor */}
        <div className="flex w-3/4 flex-col overflow-hidden border border-border rounded-lg bg-background">
          <header className="flex items-center justify-between gap-2 border-b border-border p-2">
            <div className="flex items-center gap-2">
              <Button variant="secondary" className="px-2 py-1">
                Code
              </Button>
              <Button variant="ghost" className="px-2 py-1">
                Preview
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <button className="rounded-md p-1.5 bg-card border border-border">
                <Image src="/supabase.svg" alt="Supabase" width={16} height={16} />
              </button>
              <button className="rounded-md p-1.5 bg-card border border-border">
                {isMounted && (
                  <Image
                    alt="Github"
                    width={16}
                    height={16}
                    src={resolvedTheme === "light" ? "/github.svg" : "/github-white.svg"}
                    className="h-4 w-4"
                  />
                )}
              </button>
              <button className="rounded-md p-1.5 bg-card border border-border">
                <Share className="h-4 w-4" />
              </button>
            </div>
          </header>

          <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
            <ResizablePanel defaultSize={30} minSize={20} className=" p-2">
              <ScrollArea className="h-full w-full">
                <TreeExample />
              </ScrollArea>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={70} minSize={40} className="p-2">
              <ScrollArea className="h-full w-full">
                <main className="flex items-center justify-center">
                </main>
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  )
}
