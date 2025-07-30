import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const PLANS = [
	{
		tier: "Grátis",
		price: "R$0/mês",
		features: [
			"5 créditos diários",
			"Projetos públicos",
			"Badge Genesis",
			"3 editores por projeto",
		],
	},
	{
		tier: "Pro",
		price: "R$25/mês",
		features: [
			"100 créditos / mês",
			"Projetos privados",
			"Remove o badge Genesis",
			"Domínios personalizados",
			"3 editores por projeto",
		],
		highlighted: true,
	},
] as const;

export function PricingSection() {
	return (
		<section
			className="container mx-auto space-y-12 px-4 py-16 md:px-8"
			id="pricing"
		>
			<div className="mx-auto max-w-xl space-y-4 text-center">
				<h2 className="font-semibold text-3xl">Planos</h2>
				<p className="text-muted-foreground">
					Escolha o plano ideal para o seu uso.
				</p>
			</div>
			<div className="grid gap-8 md:grid-cols-2">
				{PLANS.map((plan) => {
					const isHighlighted = (plan as { highlighted?: boolean }).highlighted;
					return (
						<Card
							className={`${isHighlighted ? "bg-foreground text-muted backdrop-blur-2xl" : ""} flex h-full flex-col`}
							key={plan.tier}
						>
							<CardHeader className="items-start">
								<CardTitle>{plan.tier}</CardTitle>
								<div className="mt-4 font-bold text-4xl">{plan.price}</div>
							</CardHeader>
							<CardContent className="flex-1">
								<ul className="space-y-2 text-sm">
									{plan.features.map((f) => (
										<li className="flex items-start gap-2" key={f}>
											<Check className="h-4 w-4 text-primary" />{" "}
											<span>{f}</span>
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter className="mt-auto">
								<Button
									className="w-full"
									variant={isHighlighted ? "default" : "outline"}
								>
									Selecionar
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</section>
	);
}
