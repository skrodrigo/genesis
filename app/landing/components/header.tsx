import Image from "next/image";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
	return (
		<header className="sticky top-2 z-30 mx-auto w-full max-w-4xl rounded-xl bg-foreground/90 text-muted backdrop-blur-2xl">
			<div className="container mx-auto flex items-center justify-between px-2 py-2 md:px-8">
				<Image alt="Logo" height={40} src="/logo.svg" width={40} />
				<nav className="hidden items-center gap-6 text-sm md:flex">
					<a className="transition-colors hover:text-accent" href="#features">
						Features
					</a>
					<a className="transition-colors hover:text-accent" href="#pricing">
						Pricing
					</a>
					<a className="transition-colors hover:text-accent" href="#faq">
						FAQ
					</a>
					<a className="transition-colors hover:text-accent" href="#contact">
						Contact
					</a>
				</nav>
				<div className="flex items-center gap-2">
					<Button asChild size="sm" variant="outline">
						<a href="/login">Sign in</a>
					</Button>
					<Button asChild size="sm">
						<a href="/login">Sign up</a>
					</Button>
				</div>
			</div>
		</header>
	);
}
