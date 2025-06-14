"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Settings, LogOut } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function ProfileMenu({ onSettings }: { onSettings?: () => void }) {
  const email = "rodrigoa0987@gmail.com";
  const credit = 4.48;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage alt="User" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex flex-col items-start gap-1">
          <span className="text-xs text-muted-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer hover:bg-muted" onClick={onSettings}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuLabel className="flex flex-col items-start">
          Balance
        </DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer">
          Créditos <DropdownMenuShortcut>{credit}</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Preferences</DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center justify-between">
          Theme
          <ThemeSwitcher />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
