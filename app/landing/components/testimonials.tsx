import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
	{
		name: "Ana Silva",
		company: "Acme Corp",
		quote:
			"Genesis saved us weeks of boilerplate and let our team focus on core features.",
	},
	{
		name: "Lucas Pereira",
		company: "Startify",
		quote:
			"The chat interface feels magical – it's like having a senior dev on call 24/7.",
	},
	{
		name: "Mariana Costa",
		company: "Freelancer",
		quote:
			"I launched my SaaS MVP in days instead of months. Highly recommend!",
	},
];

export function TestimonialsSection() {
	return (
		<section className="container mx-auto space-y-12 px-4 py-16 md:px-8">
			<div className="mx-auto max-w-xl space-y-4 text-center">
				<h2 className="font-semibold text-3xl">Loved by developers</h2>
			</div>
			<div className="grid gap-8 md:grid-cols-3">
				{TESTIMONIALS.map((t) => (
					<Card className="h-full" key={t.name}>
						<CardContent className="space-y-4">
							<p>“{t.quote}”</p>
							<p className="font-medium text-sm">
								{t.name} {t.company}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
