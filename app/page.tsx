import { CTASection } from "@/app/landing/components/cta";
import { FAQSection } from "@/app/landing/components/faq";
import { FeaturesSection } from "@/app/landing/components/features";
import { LandingFooter } from "@/app/landing/components/footer";
import { LandingHeader } from "@/app/landing/components/header";
import { HeroSection } from "@/app/landing/components/hero";
import { PricingSection } from "@/app/landing/components/pricing";
import { TestimonialsSection } from "@/app/landing/components/testimonials";
import { Separator } from "@/components/ui/separator";

export default function LandingPage() {
	return (
		<main className="flex min-h-screen flex-col bg-background font-serif text-foreground">
			<LandingHeader />

			<div className="flex h-screen w-full flex-col items-center justify-center">
				<div className="max-w-5xl">
					<HeroSection />
				</div>
			</div>
			<div className="relative mx-auto max-w-5xl">
				<Separator
					className="-translate-x-1/2 -translate-y-1/2 -ml-[512px] absolute top-1/2 left-1/2 h-full w-px"
					orientation="vertical"
				/>
				<Separator
					className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 ml-[512px] h-full w-px"
					orientation="vertical"
				/>
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
