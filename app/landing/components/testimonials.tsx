import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    quote: "I launched my SaaS MVP in days instead of months. Highly recommend!",
  },
];

export function TestimonialsSection() {
  return (
    <section className="container mx-auto py-16 px-4 md:px-8 space-y-12">
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold">Loved by developers</h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <Card key={t.name} className="h-full">
            <CardContent className="space-y-4 pt-6">
              <p className="italic">“{t.quote}”</p>
              <Separator />
              <p className="text-sm font-medium">
                {t.name} • {t.company}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
