'use client'

import { ChatInput } from "@/components/chat-input"
import { useEffect, useState } from "react";

import FigmaIntegrationDialog from "./integrations/cards/figma-integration-dialog";
import GithubIntegrationDialog from "./integrations/cards/github-integration-dialog";
export default function Page() {

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      <div className="relative flex flex-1 space-y-6 flex-col w-full items-center justify-center px-4 h-[calc(100vh-12rem)]">
        <h1 className="text-4xl font-bold text-foreground">
          O que vamos construir hoje?
        </h1>

        <ChatInput />

        <div className="flex items-center justify-center gap-3 mt-4">
          <FigmaIntegrationDialog />
          <GithubIntegrationDialog />
        </div>
      </div>
    </div>
  )
}
