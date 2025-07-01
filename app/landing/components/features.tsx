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
      id="features"
      className="container mx-auto py-16 px-4 md:px-8 space-y-12"
    >
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold">Features</h2>
        <p className="text-muted-foreground">
          Everything you need to go from idea to production.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {FEATURES.map((feat) => (
          <Card key={feat.title} className="h-full">
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
