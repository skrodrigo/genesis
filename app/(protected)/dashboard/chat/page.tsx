"use client";

import {
	SandpackCodeEditor,
	SandpackConsole,
	SandpackPreview,
	SandpackProvider,
} from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";
import { ChatInput } from "@/components/chat-input";
import TreeExample from "@/components/tree-example";
import { Button } from "@/components/ui/button";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

const sandpackFiles = {
	"/App.js": `export default function App() {
  return (
    <div style={{ padding: '16px' }}>
      <h1>Hello from Sandpack!</h1>
      <p>This is a preview running inside a custom layout.</p>
    </div>
  )
}`,
};

export default function Page() {
	const [isMounted, setIsMounted] = useState(false);
	const [view, setView] = useState<"code" | "preview">("code");

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<div className="flex h-full w-full flex-col overflow-hidden bg-background">
			<div className="flex flex-1 gap-1 overflow-hidden p-1">
				<div className="flex w-1/4 flex-col overflow-hidden rounded-lg border border-border bg-background p-1">
					<ScrollArea className="flex-1">messages</ScrollArea>
					<div className="sticky bottom-0">
						<ChatInput />
					</div>
				</div>

				<div className="flex flex-1 flex-col">
					<SandpackProvider
						files={sandpackFiles}
						options={{}}
						style={{ height: "100%" }}
						template="react"
						theme="dark"
					>
						<div className="flex h-full flex-1 flex-col rounded-lg border border-border">
							<header className="flex items-center justify-between gap-2 border-border border-b p-2">
								<div className="flex max-h-10 items-center gap-2 rounded-lg border border-border p-0.5">
									<Button
										className="max-h-8"
										onClick={() => setView("code")}
										variant={view === "code" ? "secondary" : "ghost"}
									>
										Code
									</Button>
									<Button
										className="max-h-8"
										onClick={() => setView("preview")}
										variant={view === "preview" ? "secondary" : "ghost"}
									>
										Preview
									</Button>
								</div>
							</header>

							<ResizablePanelGroup
								className="flex-1 overflow-hidden"
								direction="horizontal"
							>
								<ResizablePanel defaultSize={30} minSize={20}>
									<ScrollArea className="h-full overflow-y-auto">
										<TreeExample />
									</ScrollArea>
								</ResizablePanel>

								<ResizableHandle withHandle />

								<ResizablePanel className="" defaultSize={70} minSize={40}>
									{view === "code" ? (
										<div className="flex h-full flex-col">
											<SandpackCodeEditor className="h-full overflow-y-auto" />{" "}
											<SandpackConsole className="max-h-20 w-full overflow-y-auto" />
										</div>
									) : (
										<SandpackPreview className="h-full overflow-y-auto" />
									)}
								</ResizablePanel>
							</ResizablePanelGroup>
						</div>
					</SandpackProvider>
				</div>
			</div>
		</div>
	);
}
