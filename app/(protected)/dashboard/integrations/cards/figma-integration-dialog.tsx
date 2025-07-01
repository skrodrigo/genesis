"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useState, forwardRef } from "react";
import { Button } from "@/components/ui/button";

import type { ButtonHTMLAttributes } from "react";

const TriggerButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function TriggerButton(props, ref) {
  return (
    <button
      ref={ref}
      {...props}
      className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-gradient-to-t from-primary/10 via-primary/10 to-primary/0 rounded-full border border-border text-muted hover:text-secondary transition-colors"
    >
      <Image alt="Figma" width={16} height={16} src="/figma.svg" className="w-4 h-4" />
      <span className="text-xs text-foreground">Importe do Figma</span>
    </button>
  );
});

export default function FigmaIntegrationDialog() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<'connect' | 'frame'>('connect');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TriggerButton />
      </DialogTrigger>
      <DialogContent className="max-w-sm w-full overflow-hidden">
        {stage === 'connect' ? (
          <>
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-lg bg-foreground flex items-center justify-center shadow">
                <Image alt="Figma" width={32} height={32} src="/figma.svg" />
              </div>
            </div>
            <div className="px-6 flex flex-col items-center text-center gap-4">
              <h2 className="text-lg font-semibold">Connect to Figma</h2>
              <p className="text-sm text-muted-foreground">To get started, log in to Figma with your account or create one.</p>
              <Button className="mt-2 w-full max-w-[200px]" onClick={() => setStage('frame')}>Log in to Figma</Button>
            </div>
          </>
        ) : (
          <>
            <div className="px-6 pt-6 flex flex-col items-center text-center gap-4 w-full">
              <Image alt="Figma" width={32} height={32} src="/figma.svg" />
              <h2 className="text-lg font-semibold">Choose a Figma frame</h2>
              <p className="text-sm text-muted-foreground">Turn your design into a live web app. Generate, preview and edit code instantly.</p>
              <input type="text" placeholder="Paste Figma URL here" className="w-full px-4 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              <Button className="mt-2 w-full max-w-[240px]">Import Figma frame into Bolt</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
