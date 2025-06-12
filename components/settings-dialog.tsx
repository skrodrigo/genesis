"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Blocks, CreditCard, Github, User } from "lucide-react";
import * as React from "react";

const sidebarNav = [
  {
    label: "Conta",
    items: [
      { icon: <User className="w-4 h-4" />, label: "Rodrigo Carvalho" },
    ]
  },
  {
    label: "",
    items: [
      { icon: <CreditCard className="w-4 h-4" />, label: "Planos" },
    ]
  },
  {
    label: "Outros",
    items: [
      { icon: <Blocks className="w-4 h-4" />, label: "Integrações" },
    ]
  },
];

export function SettingsDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full min-w-4xl min-h-[600px] overflow-hidden p-0">
        <div className="flex">
          <aside className="w-56 h-full bg-background border-r border-border flex flex-col p-4 gap-2">
            {sidebarNav.map((section, idx) => (
              <React.Fragment key={idx}>
                {section.label && <div className="text-xs text-muted-foreground mb-1 mt-2">{section.label}</div>}
                <div className="flex flex-col gap-1">
                  {section.items.map((item, jdx) => (
                    <button
                      key={item.label}
                      className='flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors'
                    >
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </aside>
          <main className="flex-1 p-8 flex flex-col gap-6">
            <DialogHeader>
              <DialogTitle>GitHub</DialogTitle>
              <DialogDescription>
                Sync your project 2-way with GitHub to collaborate at source.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Connected Account <span className="bg-muted px-2 py-0.5 rounded text-xs ml-1">Admin</span></span>
              <span className="text-muted-foreground text-sm">Add your GitHub account to manage connected organizations.</span>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" className="flex items-center gap-2">
                <Github className="w-4 h-4" /> Connect GitHub
              </Button>
            </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}
