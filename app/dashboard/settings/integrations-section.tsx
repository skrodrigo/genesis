"use client";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function IntegrationsSection() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const integrations = [
    {
      id: "supabase",
      title: "Supabase",
      description: "Banco de dados, autenticação e storage para aplicações modernas.",
      logo: <Image src="/supabase.svg" alt="Supabase" width={32} height={32} />,
      url: "https://supabase.com"
    },
    {
      id: "github",
      title: "Github",
      description: "Hospede, gerencie e colabore em código-fonte com repositórios Git integrados.",
      logo: isMounted ? (
        <Image
          alt="Logo"
          width={32}
          height={32}
          src={resolvedTheme === "dark" ? "/github-white.svg" : "/github.svg"}
        />
      ) : null,
      url: "https://github.com"
    },
    {
      id: "stripe",
      title: "Stripe",
      description: "Pagamentos online, gestão de assinaturas e faturamento para produtos digitais.",
      logo: <Image src="/stripe.svg" alt="Stripe" width={32} height={32} />,
      url: "https://stripe.com"
    },
    {
      id: "figma",
      title: "Figma",
      description: "Design e prototipagem de interfaces para aplicações web e mobile.",
      logo: <Image src="/figma.svg" alt="Figma" width={32} height={32} />,
      url: "https://figma.com"
    }
  ];
  return (
    <>
      <DialogHeader>
        <DialogTitle>Integrações</DialogTitle>
        <DialogDescription>
          Conecte suas integrações favoritas para potencializar seu projeto.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {integrations.map((integration) => (
          <Card key={integration.id} className="relative flex flex-col h-full justify-between">
            <a
              href={integration.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
              aria-label={`Abrir ${integration.title} em nova aba`}
              tabIndex={0}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted">
                {integration.logo}
              </div>
              <div>
                <CardTitle className="text-base leading-tight mb-0">{integration.title}</CardTitle>
                <CardDescription className="text-xs mt-1 leading-snug">{integration.description}</CardDescription>
              </div>
            </CardHeader>
            <CardFooter className="flex items-center justify-between mt-auto pt-4 border-t">
              <Button variant="outline" className="flex gap-2 items-center">
                Conectar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
