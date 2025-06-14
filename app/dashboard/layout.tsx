"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { ProfileMenu } from "@/components/profile-menu";
import { SettingsDialog } from "./settings/settings-dialog";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
          <div className="ml-auto flex items-center px-4">
            <ProfileMenu onSettings={() => setSettingsOpen(true)} />
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </SidebarInset>
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </SidebarProvider>
  );
}
