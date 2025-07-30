import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const FEATURES = [
	{
		title: "Instant Scaffolding",
		desc: "Generate a complete Next.js & Tailwind codebase with authentication, database and CI configured.",
	},
	{
		title: "Chat-first Workflow",
		desc: "Describe features in natural language and watch them appear in your repo via pull-request.",
	},
	{
		title: "Self-hosting Friendly",
		desc: "No vendor lock-in. Export your code and deploy anywhere – Vercel, Netlify, or your own servers.",
	},
];

export function FeaturesSection() {
	return (
		<section
			className="container mx-auto space-y-12 px-4 py-16 md:px-8"
			id="features"
		>
			<div className="mx-auto max-w-xl space-y-4 text-center">
				<h2 className="font-semibold text-3xl">Features</h2>
				<p className="text-muted-foreground">
					Everything you need to go from idea to production.
				</p>
			</div>
			<div className="grid gap-8 md:grid-cols-3">
				{FEATURES.map((feat) => (
					<Card className="h-full" key={feat.title}>
						<CardHeader>
							<CardTitle>{feat.title}</CardTitle>
							<CardDescription>{feat.desc}</CardDescription>
						</CardHeader>
					</Card>
				))}
			</div>
		</section>
	);
}
