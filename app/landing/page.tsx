import { Separator } from "@/components/ui/separator";
import { LandingHeader } from "./components/header";
import { HeroSection } from "./components/hero";
import { FeaturesSection } from "./components/features";
import { PricingSection } from "./components/pricing";
import { FAQSection } from "./components/faq";
import { TestimonialsSection } from "./components/testimonials";
import { CTASection } from "./components/cta";
import { LandingFooter } from "./components/footer";

export default function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground font-serif">
      <LandingHeader />

      <div className="flex flex-col w-full h-screen justify-center items-center">
        <div className="max-w-5xl">

          <HeroSection />
        </div>
      </div>
      <div className="max-w-5xl mx-auto relative">
        <Separator className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full -ml-[512px] w-px" orientation="vertical" />
        <Separator className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full ml-[512px] w-px" orientation="vertical" />
        <Separator className="w-px" />
        <FeaturesSection />
        <Separator className="w-px" />
        <PricingSection />
        <Separator className="w-px" />
        <FAQSection />
        <Separator className="w-px" />
        <TestimonialsSection />
        <CTASection />
        <LandingFooter />
      </div>
    </main>
  );
}