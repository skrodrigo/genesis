import { ChatInput } from "@/components/chat-input";
import GridPattern from "@/components/grid-pattern";
import { cn } from "@/lib/utils";

export function HeroSection() {
	return (
		<section className="-mt-20 container relative mx-auto flex h-screen flex-col items-center justify-center gap-10 px-4 text-center md:px-8">
			<GridPattern
				className={cn(
					"[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
				)}
				height={100}
				strokeDasharray="1"
				width={100}
			/>
			<div className="z-20 max-w-4xl space-y-6">
				<h1 className="font-extrabold font-sans text-4xl leading-tight md:text-6xl">
					Build products <span className="text-primary">faster</span> with
					AI-powered code generation
				</h1>
			</div>
			<div className="z-20 w-full">
				<ChatInput />
			</div>
		</section>
	);
}
