"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							className="m-0 flex h-10 max-w-[200px] cursor-pointer items-center justify-center p-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							size="default"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage alt={user.name} src={user.avatar} />
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar>
							<div className="grid text-left text-sm leading-tight">
								<span className="truncate font-medium">{user.name}</span>
							</div>
							<div>
								<Badge className="flex items-center justify-center border border-border bg-muted text-foreground">
									Free
								</Badge>
							</div>
							<ChevronsUpDown className="size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="mt-3 w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<div className="flex w-full items-center justify-between">
									<div className="flex items-center justify-center">
										<Avatar className="h-8 w-8 rounded-lg">
											<AvatarImage alt={user.name} src={user.avatar} />
											<AvatarFallback className="rounded-lg">CN</AvatarFallback>
										</Avatar>
										<div className="ml-2 flex flex-col leading-tight">
											<span className="font-semibold">Personal</span>
											<span className="font-normal text-xs">Free</span>
										</div>
									</div>
									<Check height={20} width={20} />
								</div>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuLabel>Outros times</DropdownMenuLabel>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<div className="flex items-center justify-center">
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage alt={user.name} src={user.avatar} />
										<AvatarFallback className="rounded-lg">CN</AvatarFallback>
									</Avatar>
									<div className="ml-2 flex flex-col leading-tight">
										<span className="font-semibold">Jonh Doe project´s</span>
										<span className="font-normal text-xs">
											Começar um novo time
										</span>
									</div>
								</div>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<Button className="w-full bg-foreground">Fazer Upgrade</Button>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
