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
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "./ui/command"
import Image from "next/image"
import Link from "next/link"

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
  const [isMounted, setIsMounted] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Sidebar variant="sidebar" {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <a href="#">
              <div className="flex items-start justify-start gap-2 mb-4">
                {isMounted && (
                  <div className="flex items-center gap-2 justify-center">
                    <Image alt="Logo" width={32} height={32} src="/logo.svg" />
                    <span className="font-semibold">Genesis</span>
                  </div>
                )}
              </div>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className="space-y-2 flex flex-col">
        <Button variant='default' className="py-2" asChild>
          <Link href="/dashboard">
            Novo Chat
          </Link>
        </Button>
        <Button variant='ghost' className="flex justify-start gap-2 items-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={() => setOpenSearch(true)}>
          <SearchIcon />
          Pesquisa
        </Button>
        <Button variant='ghost' className="flex justify-start gap-2 items-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" asChild>
          <Link href="/dashboard/projects">
            <FolderOpenIcon />
            Projetos
          </Link>
        </Button>
        <Button variant='ghost' className="flex justify-start gap-2 items-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" asChild>
          <Link href="/community">
            <Shapes />
            Comunidade
          </Link>
        </Button>
        <CommandDialog open={openSearch} onOpenChange={setOpenSearch} title="Pesquisar" description="Busque projetos ou comandos">
          <CommandInput placeholder="Digite para pesquisar..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          </CommandList>
        </CommandDialog>
      </div>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
    </Sidebar >
  )
}
