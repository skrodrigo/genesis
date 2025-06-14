"use client";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";

const creditOptions = [
  { value: 100, label: "100 créditos", price: 25 },
  { value: 200, label: "200 créditos", price: 50 },
  { value: 400, label: "400 créditos", price: 100 },
  { value: 800, label: "800 créditos", price: 200 },
  { value: 1200, label: "1200 créditos", price: 250 },
  { value: 1600, label: "1600 créditos", price: 300 },
  { value: 2000, label: "2000 créditos", price: 500 },
];

const plans = [
  {
    title: "Gratís",
    description: "Para começar",
    price: "R$0 /mês",
    credits: ["5 créditos diários"],
    features: ["Projetos públicos"],
    button: "Selecionar",
    type: "free"
  },
  {
    title: "Pro",
    description: "Para mais projetos e uso",
    price: "R$25 /mês",
    credits: creditOptions.map(opt => opt.label),
    features: [
      "100 créditos / mês",
      "Projetos privados",
      "Remove o badge Genesis",
      "Domínios personalizados",
      "3 editores por projeto"
    ],
    badge: "POPULAR",
    button: "Selecionar",
    type: "pro"
  },
  {
    title: "Teams",
    description: "Para colaborar com outros",
    price: "R$30 /mês",
    credits: creditOptions.map(opt => opt.label),
    features: [
      "Centralizamento de faturamento",
      "Centralizamento e gerenciamento de acesso",
    ],
    button: "Selecionar",
    type: "teams"
  }
];

export function PlansSection() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Planos</DialogTitle>
        <DialogDescription>
          Escolha o plano ideal para o seu uso.
        </DialogDescription>
      </DialogHeader>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {plans.map((plan, idx) => {
          const [selectedCredit, setSelectedCredit] = useState(plan.credits[0]);

          let displayPrice = plan.price;
          if (plan.type === "pro") {
            const opt = creditOptions.find(opt => opt.label === selectedCredit);
            if (opt) displayPrice = `R$${opt.price} /mês`;
          }
          if (plan.type === "teams") {
            const opt = creditOptions.find(opt => opt.label === selectedCredit);
            if (opt) displayPrice = `R$${Math.round(opt.price * 1.5)} /mês`;
          }

          return (
            <Card
              key={plan.title}
              className={
                `rounded-lg border border-border bg-muted flex flex-col px-0 py-0` +
                (idx === 1 ? " border border-border" : "")
              }
            >
              <CardHeader className="pb-2 pt-6 px-6">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-foreground text-2xl">{plan.title}</CardTitle>
                  {plan.badge && (
                    <Badge
                      className="text-foreground bg-transparent rounded-lg px-2 py-0.5 text-xs ml-2 border border-border"
                    >
                      {plan.badge}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4 px-6">
                <span className="text-4xl text-foreground">{displayPrice.replace(' /month', '')}<span className="text-base font-normal text-muted-foreground">/mês</span></span>
                <div className=" text-sm mb-1 text-muted-foreground">{plan.description}</div>
                {plan.type === "free" ? (
                  <Select disabled defaultValue={plan.credits[0]}>
                    <SelectTrigger className="w-full bg-background border border-border text-foreground focus:ring-0 focus:border-secondary">
                      <SelectValue placeholder={plan.credits[0]} className="text-foreground" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-none text-foreground">
                      <SelectItem value={plan.credits[0]} className="text-foreground bg-background hover:bg-background/80">{plan.credits[0]}</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Select value={selectedCredit} onValueChange={setSelectedCredit}>
                    <SelectTrigger className="w-full bg-background border border-border text-foreground focus:ring-0 focus:border-secondary">
                      <SelectValue placeholder={selectedCredit} className="text-foreground" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-none text-foreground">
                      {plan.credits.map((credit) => (
                        <SelectItem key={credit} value={credit} className="text-foreground bg-background hover:bg-background/80">{credit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {idx === 0 && (
                  <>
                    <div className="text-xs text-[#b3b3b3] mt-4 ">Get started with:</div>
                    <ul className="mt-1 flex-1 mb-4 text-sm">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {idx === 1 && (
                  <>
                    <div className="text-xs mt-4 text-foreground">Everything in Free, plus:</div>
                    <ul className="mt-1 flex-1 mb-4 text-sm">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {idx === 2 && (
                  <>
                    <div className="text-xs mt-4 text-foreground">Everything in Pro, plus:</div>
                    <ul className="mt-1 flex-1 mb-4 text-sm">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button
                  variant="default"
                  className='w-full mt-2 bg-foreground cursor-pointer text-secondary border-none shadow-none text-base py-2'
                >
                  {plan.button}
                </Button>
              </CardFooter>
            </Card>
          )
        }
        )}
      </div>
    </>
  );
}
