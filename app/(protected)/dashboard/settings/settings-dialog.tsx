"use client";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Blocks, CreditCard, User } from "lucide-react";
import { IntegrationsSection } from "./integrations-section";
import { PlansSection } from "./plans-section";
import { GeneralSection } from "./general-section";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const tabs = [
  { label: "Geral", icon: <User className="w-4 h-4" /> },
  { label: "Plano", icon: <CreditCard className="w-4 h-4" /> },
  { label: "Integrações", icon: <Blocks className="w-4 h-4" /> },
];

export function SettingsDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full min-w-7xl min-h-[700px] max-h-[700px] h-[700px] overflow-hidden p-0">
        <div className="flex h-full min-h-0">
          <aside className="w-56 h-full bg-background border-r border-border flex flex-col p-4 gap-2">
            {tabs.map(tab => (
              <button
                key={tab.label}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm cursor-pointer transition-colors ${activeTab === tab.label ? 'bg-accent text-accent-foreground' : ''}`}
                onClick={() => setActiveTab(tab.label)}
              >
                {tab.icon}
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </aside>
          <main className={`flex-1 flex flex-col gap-6 min-h-0 h-full ${activeTab !== "Geral" ? "p-8" : ""}`}>
            {activeTab === "Geral" && (
              <ScrollArea className="flex-1 min-h-0 px-4">
                <GeneralSection />
              </ScrollArea>
            )}
            {activeTab === "Plano" && <PlansSection />}
            {activeTab === "Integrações" && <IntegrationsSection />}
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}
