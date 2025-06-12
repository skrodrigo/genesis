'use client'

import { AppSidebar } from "@/components/app-sidebar"
import { ChatInput } from "@/components/chat-input"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SettingsDialog } from "@/components/settings-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  CircleDollarSignIcon,
  LogOut,
  Settings
} from "lucide-react"

import { useState } from "react";

export default function Page() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset>
        <div>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
            <div className="ml-auto flex items-center px-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage alt="User" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="flex flex-col items-start gap-1">
                    <span className="text-xs text-muted-foreground">rodrigoa0987@gmail.com</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CircleDollarSignIcon className="w-4 h-4 mr-2" />
                      Pricing
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="flex flex-col items-start">
                    Credit Balance
                  </DropdownMenuLabel>
                  <DropdownMenuItem className="cursor-pointer">
                    Monthly credits <DropdownMenuShortcut>4.48</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                  <DropdownMenuItem className="flex items-center justify-between">
                    Theme
                    <ThemeSwitcher />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div className="flex flex-1 flex-col w-full items-center justify-center px-4 h-[calc(100vh-12rem)]">
            <ChatInput />
          </div>
        </div>
      </SidebarInset>
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </SidebarProvider>
  )
}
