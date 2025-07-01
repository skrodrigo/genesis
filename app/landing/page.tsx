import { Separator } from "@/components/ui/separator";
import { LandingHeader } from "./components/header";
import { HeroSection } from "./components/hero";
import { FeaturesSection } from "./components/features";
import { PricingSection } from "./components/pricing";
import { FAQSection } from "./components/faq";
import { TestimonialsSection } from "./components/testimonials";
import { CTASection } from "./components/cta";
import { LandingFooter } from "./components/footer";
import { StarsBackground } from "@/components/stars";

export default function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground relative">
      <Separator className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full -ml-[800px]" orientation="vertical" />
      <Separator className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full ml-[800px]" orientation="vertical" />

      <StarsBackground className="flex flex-col w-full h-screen justify-center items-center">
        <div className="flex flex-col items-end absolute -top-10 blur-xl">
          <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-primary/20 to-primary/20" />
          <div className="h-[10rem] rounded-full w-[90rem] z-1 bg-gradient-to-b blur-[6rem] from-primary/5 to-primary/0" />
          <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-primary/0 to-primary/5" />
        </div>
        <div className="absolute inset-0 z-0 bg-noise opacity-30"></div>
        <LandingHeader />
        <HeroSection />
      </StarsBackground>
      <FeaturesSection />
      <Separator className="my-12" />
      <PricingSection />
      <Separator className="my-12" />
      <FAQSection />
      <Separator className="my-12" />
      <TestimonialsSection />
      <Separator className="my-12" />
      <CTASection />
      <LandingFooter />
    </main>
  );
}