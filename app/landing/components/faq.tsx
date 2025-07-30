import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
	{
		q: "Is the generated code production-ready?",
		a: "Yes! We follow industry best practices and ship with testing, linting and CI configured out-of-the-box.",
	},
	{
		q: "Can I self-host Genesis?",
		a: "Absolutely. Our CLI lets you run the generation pipeline in your own infrastructure.",
	},
	{
		q: "What is your refund policy?",
		a: "We offer a 30-day money-back guarantee for Pro subscriptions.",
	},
];

export function FAQSection() {
	return (
		<section
			className="container mx-auto space-y-12 px-4 py-16 md:px-8"
			id="faq"
		>
			<div className="mx-auto max-w-xl space-y-4 text-center">
				<h2 className="font-semibold text-3xl">Frequently Asked Questions</h2>
			</div>
			<Accordion className="mx-auto w-full max-w-3xl space-y-2" type="single">
				{FAQS.map((item) => (
					<AccordionItem
						className="rounded-lg border"
						key={item.q}
						value={item.q}
					>
						<AccordionTrigger className="w-full px-6 py-4 font-medium">
							{item.q}
						</AccordionTrigger>
						<AccordionContent className="px-6 pb-4 text-muted-foreground text-sm">
							{item.a}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}
