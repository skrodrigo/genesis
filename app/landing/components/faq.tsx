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
    <section id="faq" className="container mx-auto py-16 px-4 md:px-8 space-y-12">
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>
      </div>
      <Accordion type="single" className="w-full max-w-3xl mx-auto space-y-2">
        {FAQS.map((item) => (
          <AccordionItem key={item.q} value={item.q} className="border rounded-lg">
            <AccordionTrigger className="w-full px-6 py-4 font-medium" >
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-sm text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
