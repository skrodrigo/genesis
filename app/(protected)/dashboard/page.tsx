"use client";

import { useEffect, useState } from "react";
import { ChatInput } from "@/components/chat-input";

export default function Page() {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<div className="relative min-h-screen w-full overflow-hidden">
			<div className="relative flex h-[calc(100vh-12rem)] w-full flex-1 flex-col items-center justify-center space-y-6 px-4">
				<h1 className="font-bold text-4xl text-foreground">
					O que vamos construir hoje?
				</h1>

				<ChatInput />
			</div>
		</div>
	);
}
