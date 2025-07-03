import { Button } from "@/components/ui/button";
import Image from "next/image";

export function LandingHeader() {
  return (
    <header className="w-full max-w-4xl mx-auto top-2 rounded-xl sticky bg-foreground/90 text-muted backdrop-blur-2xl z-30">
      <div className="container mx-auto flex items-center justify-between py-2 px-2 md:px-8">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-accent transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-accent transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-accent transition-colors">
            FAQ
          </a>
          <a href="#contact" className="hover:text-accent transition-colors">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button size="sm" asChild variant="outline">
            <a href="/login">Sign in</a>
          </Button>
          <Button size="sm" asChild>
            <a href="/login">Sign up</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
