"use client"

import * as React from "react"
import {
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
import { useTheme } from "next-themes";

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

  const { resolvedTheme } = useTheme();
  return (
    <Sidebar variant="floating" {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="flex items-center">
              <a href="#">
                <div className=" flex aspect-square size-6 items-center justify-center rounded-lg">
                  <Image alt="Github" width={20} height={20} src={resolvedTheme === "light" ? "/logo-black.svg" : "/logo.svg"} />
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
        <Button variant='outline' className="mx-2 py-2">
          Novo Chat
        </Button>
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
