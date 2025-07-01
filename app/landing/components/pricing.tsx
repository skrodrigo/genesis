import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

const PLANS = [
  {
    tier: "Grátis",
    price: "R$0/mês",
    features: ["5 créditos diários", "Projetos públicos", "Badge Genesis",
      "3 editores por projeto",],
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
      id="pricing"
      className="container mx-auto py-16 px-4 md:px-8 space-y-12"
    >
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold">Planos</h2>
        <p className="text-muted-foreground">
          Escolha o plano ideal para o seu uso.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {PLANS.map((plan) => {
          const isHighlighted = (plan as { highlighted?: boolean }).highlighted;
          return (
            <Card
              key={plan.tier}
              className={`${isHighlighted ? "border-primary" : ""} flex flex-col h-full`}
            >
              <CardHeader className="items-start">
                <CardTitle>{plan.tier}</CardTitle>
                <div className="text-4xl font-bold mt-4">{plan.price}</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2"><Check className="w-4 h-4 text-primary" /> <span>{f}</span></li>
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
