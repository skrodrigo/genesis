import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section
      id="contact"
      className="container mx-auto py-24 px-4 md:px-8 text-center space-y-6"
    >
      <h2 className="text-3xl md:text-4xl font-semibold">
        Ready to build with Genesis?
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Join thousands of developers shipping products faster than ever.
      </p>
      <Button size="lg" asChild>
        <a href="/register">Get started for free</a>
      </Button>
    </section>
  );
}
