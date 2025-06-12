"use client"

import * as React from "react"
import {
  Command,
  FolderOpenIcon,
  Frame,
  Map,
  PieChart,
  SearchIcon,
  Shapes,
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import Image from "next/image"


const data = {
  user: {
    name: "Personal",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Saas de Produtividade Pessoal com Nextjs e Tailwind",
      url: "#",
      icon: Frame,
    },
    {
      name: "Pagina de vendas para um produto novo",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Componente de gravação de voz novo",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="flex items-center">
              <a href="#">
                <div className=" flex aspect-square size-6 items-center justify-center rounded-lg">
                  <Image alt="logo" src='/logo.svg' width={1080} height={1080} />
                </div>
                <Separator
                  orientation="vertical"
                />
                <NavUser user={data.user} />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className="space-y-2 flex flex-col">
        <Button variant='outline' className="">
          Novo Chat
        </Button>
        <Separator />
        <Button variant='ghost' className="flex justify-start gap-2 items-center">
          <SearchIcon />
          Pesquisa
        </Button>
        <Button variant='ghost' className="flex justify-start gap-2 items-center">
          <FolderOpenIcon />
          Projetos
        </Button>
        <Button variant='ghost' className="flex justify-start gap-2 items-center">
          <Shapes />
          Comunidade
        </Button>
      </div>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
    </Sidebar>
  )
}
