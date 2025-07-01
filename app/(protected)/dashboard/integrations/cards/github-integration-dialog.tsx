"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect, forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";

const TriggerButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function TriggerButton(props, ref) {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  return (
    <button
      ref={ref}
      {...props}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-t from-foreground/5 via-foreground/5 to-foreground/0 rounded-full border border-border text-muted hover:text-secondary transition-colors"
    >
      {isMounted && (
        <Image
          alt="Github"
          width={16}
          height={16}
          src={resolvedTheme === "light" ? "/github.svg" : "/github-white.svg"}
          className="w-4 h-4"
        />
      )}
      <span className="text-xs text-foreground">Upload do Github</span>
    </button>
  );
});

export default function GithubIntegrationDialog() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<'connect' | 'repo'>('connect');

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
                {isMounted && (
                  <Image alt="Github" width={32} height={32} src={resolvedTheme === "light" ? "/github-white.svg" : "/github.svg"} />
                )}
              </div>
            </div>
            <div className="px-6 flex flex-col items-center text-center gap-4">
              <h2 className="text-lg font-semibold">Connect to GitHub</h2>
              <p className="text-sm text-muted-foreground">To get started, log in to GitHub with your account or create one.</p>
              <Button className="mt-2 w-full max-w-[200px]" onClick={() => setStage('repo')}>Log in to GitHub</Button>
            </div>
          </>
        ) : (
          <>
            <div className="px-6 pt-6 flex flex-col items-center text-center gap-4 w-full">
              <Image alt="Github" width={32} height={32} src={resolvedTheme === "light" ? "/github.svg" : "/github-white.svg"} />
              <h2 className="text-lg font-semibold">Choose a repository</h2>
              <p className="text-sm text-muted-foreground">Select a public or private repository to import code.</p>
              <input type="text" placeholder="https://github.com/user/repositorie" className="w-full px-4 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
              <Button className="mt-2">Import repository</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
