"use client"

import {
  BadgeCheck,
  Bell,
  Check,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="default"
              className="data-[state=open]:bg-sidebar-accent cursor-pointer p-0 m-0 data-[state=open]:text-sidebar-accent-foreground flex justify-center items-center max-w-[200px] h-10"
            >
              <Avatar className="h-8 w-8 rounded-xl">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-xl">CN</AvatarFallback>
              </Avatar>
              <div className="grid text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
              </div>
              <div>
                <Badge className="bg-muted border border-border flex items-center justify-center text-foreground" >
                  Free
                </Badge>
              </div>
              <ChevronsUpDown className="size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl mt-3"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full">
                  <div className="flex justify-center items-center">
                    <Avatar className="h-8 w-8 rounded-xl">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-xl">CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col ml-2 leading-tight">
                      <span className="font-semibold">Personal</span>
                      <span className="font-normal text-xs">Free</span>
                    </div>
                  </div>
                  <Check width={20} height={20} />
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>
              Outros times
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <div className="flex justify-center items-center">
                  <Avatar className="h-8 w-8 rounded-xl">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-xl">CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col ml-2 leading-tight">
                    <span className="font-semibold">Jonh Doe project´s</span>
                    <span className="font-normal text-xs">Começar um novo time</span>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Button className="w-full bg-foreground">
              Fazer Upgrade
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu >
  )
}
