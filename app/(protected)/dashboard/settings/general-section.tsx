"use client";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function GeneralSection() {
  const [username, setUsername] = useState("We2XAHB83zURm9foOpzbHOaeXyy2");
  const [name, setName] = useState("rodrigo");
  const [, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const avatarInitial = name.charAt(0).toUpperCase();

  const handleClearChats = () => {
    alert("Chats limpos!");
  };

  return (
    <div className="flex flex-col gap-8 mx-5 my-8">
      <DialogHeader>
        <DialogTitle>Account Settings</DialogTitle>
        <DialogDescription>
          Personalize how others see and interact with you on Genesis.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <span className="font-semibold text-lg">Your Avatar</span>
        <span className="text-muted-foreground text-sm">Your avatar is automatically generated based on your account.</span>
        <div className="flex items-center mt-4 mb-2">
          <div className="rounded-full w-12 h-12 bg-foreground flex items-center justify-center text-secondary text-xl">
            {avatarInitial}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <span className="font-semibold">Username</span>
        <span className="text-muted-foreground text-sm">Your public identifier and profile URL.</span>
        <Input
          className="mt-2 max-w-lg bg-background border-border text-foreground"
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled
        />
        <a
          href={`https://genesis.dev/@${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline text-sm mt-1 flex items-center gap-1"
        >
          genesis.dev/@{username}
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
        </a>
      </div>
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <span className="font-semibold">Name</span>
        <span className="text-muted-foreground text-sm">Your full name, as visible to others.</span>
        <Input
          className="mt-2 max-w-lg bg-background border-border text-foreground"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <span className="font-semibold">Theme Mode</span>
        <span className="text-muted-foreground text-sm">Choose your preferred appearance.</span>
        <div className="flex items-center gap-4 mt-2">
          <ThemeSwitcher />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Chats</span>
        <span className="text-muted-foreground text-sm">Manage your conversation history.</span>
        <Button
          className="max-w-xs mt-2"
          onClick={handleClearChats}
        >
          Limpar chats
        </Button>
      </div>
    </div>
  );
}
