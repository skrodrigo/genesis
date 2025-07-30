import { Button } from "@/components/ui/button";

export function CTASection() {
	return (
		<section
			className="container mx-auto max-w-4xl space-y-6 rounded-xl bg-foreground px-4 py-24 text-center text-card backdrop-blur-2xl md:px-8"
			id="contact"
		>
			<h2 className="font-semibold text-3xl md:text-4xl">Ready to build?</h2>
			<p className="mx-auto max-w-2xl text-muted">
				Join thousands of developers shipping products faster than ever.
			</p>
			<Button asChild size="lg">
				<a href="/register">Get started for free</a>
			</Button>
		</section>
	);
}
