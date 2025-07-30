export function LandingFooter() {
	return (
		<footer className="mt-12 w-full border-border border-t bg-background py-8">
			<div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-muted-foreground text-sm md:flex-row md:px-8">
				<span>
					© {new Date().getFullYear()} Genesis AI. All rights reserved.
				</span>
				<div className="flex items-center gap-4">
					<a className="hover:text-primary" href="/terms">
						Terms
					</a>
					<a className="hover:text-primary" href="/privacy">
						Privacy
					</a>
				</div>
			</div>
		</footer>
	);
}
