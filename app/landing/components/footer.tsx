export function LandingFooter() {
  return (
    <footer className="w-full border-t border-border py-8 mt-12 bg-background">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Genesis AI. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a href="/terms" className="hover:text-primary">
            Terms
          </a>
          <a href="/privacy" className="hover:text-primary">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
