import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section
      id="contact"
      className="container max-w-4xl rounded-xl mx-auto py-24 px-4 md:px-8 text-center space-y-6 bg-foreground text-card backdrop-blur-2xl"
    >
      <h2 className="text-3xl md:text-4xl font-semibold">
        Ready to build?
      </h2>
      <p className="text-muted max-w-2xl mx-auto">
        Join thousands of developers shipping products faster than ever.
      </p>
      <Button size="lg" asChild>
        <a href="/register">Get started for free</a>
      </Button>
    </section>
  );
}
