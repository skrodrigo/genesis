"use client";

import {
	FolderOpenIcon,
	Frame,
	Map as MapIcon,
	PieChart,
	SearchIcon,
	Shapes,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavProjects } from "@/components/nav-projects";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandInput,
	CommandList,
} from "./ui/command";

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
			icon: MapIcon,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [isMounted, setIsMounted] = useState(false);
	const [openSearch, setOpenSearch] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<Sidebar variant="sidebar" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<a href="/dashboard">
							<div className="mb-4 flex items-start justify-start gap-2">
								{isMounted && (
									<div className="flex items-center justify-center gap-2">
										<Image alt="Logo" height={32} src="/logo.svg" width={32} />
										<span className="font-semibold">Genesis</span>
									</div>
								)}
							</div>
						</a>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<div className="flex flex-col space-y-2">
				<Button asChild className="py-2" variant="default">
					<Link href="/dashboard">Novo Chat</Link>
				</Button>
				<Button
					className="flex items-center justify-start gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
					onClick={() => setOpenSearch(true)}
					variant="ghost"
				>
					<SearchIcon />
					Pesquisa
				</Button>
				<Button
					asChild
					className="flex items-center justify-start gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
					variant="ghost"
				>
					<Link href="/dashboard/projects">
						<FolderOpenIcon />
						Projetos
					</Link>
				</Button>
				<Button
					asChild
					className="flex items-center justify-start gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
					variant="ghost"
				>
					<Link href="/community">
						<Shapes />
						Comunidade
					</Link>
				</Button>
				<CommandDialog
					description="Busque projetos ou comandos"
					onOpenChange={setOpenSearch}
					open={openSearch}
					title="Pesquisar"
				>
					<CommandInput placeholder="Digite para pesquisar..." />
					<CommandList>
						<CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
					</CommandList>
				</CommandDialog>
			</div>
			<SidebarContent>
				<NavProjects projects={data.projects} />
			</SidebarContent>
		</Sidebar>
	);
}
