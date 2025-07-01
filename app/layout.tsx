import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { ConsentManagerDialog, ConsentManagerProvider, CookieBanner } from "@c15t/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`} suppressHydrationWarning>
        <ConsentManagerProvider options={{
          mode: 'c15t',
          backendURL: '/api/c15t',
          consentCategories: ['necessary', 'marketing'], // Optional: Specify which consent categories to show in the banner. 
          ignoreGeoLocation: true, // Useful for development to always view the banner.
        }}>
          <CookieBanner
            theme={{
              "banner.card": "bg-background",
              "banner.header.root": "bg-background",
              "banner.header.title": "bg-background",
              "banner.header.description": "bg-background",
              "banner.footer": "bg-accent",
              "banner.overlay": "bg-background",
              "banner.footer.reject-button": "bg-destructive ",
              "banner.footer.customize-button": "bg-secondary",
              "banner.footer.accept-button": "bg-primary text-primary",
              "banner.footer.sub-group": "bg-transparent",
            }}
          />
          <ConsentManagerDialog
            theme={{
              "widget.accordion.arrow.close": "bg-background",
              "widget.accordion.arrow.open": "bg-background",
              "widget.accordion.content-inner": "bg-background",
              "widget.accordion.icon": "bg-background",
              "widget.accordion.item": "bg-background",
              "widget.accordion.trigger": "bg-background",
              "widget.accordion.trigger-inner": "bg-background",
              "widget.branding": "bg-background",
              "widget.footer": "bg-background",
              "widget.footer.accept-button": "bg-background",
              "widget.footer.customize-button": "bg-background",
              "widget.footer.reject-button": "bg-background",
              "widget.footer.save-button": "bg-background",
              "widget.footer.sub-group": "bg-background",
              "widget.root": "bg-background",
              "widget.switch": "bg-background",
              "widget.switch.thumb": "bg-background",
              "widget.switch.track": "bg-background",
              "dialog": "bg-background",
              "dialog.content": "bg-background",
              "dialog.root": "bg-background",
              "widget.accordion": "bg-background",
              "widget.accordion.content": "bg-background",
              "dialog.header": "bg-background",
              "dialog.title": "bg-background",
              "dialog.description": "bg-background",
              "dialog.footer": "bg-background",
              "dialog.overlay": "bg-background",
            }} />

          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>

        </ConsentManagerProvider>
      </body>
    </html>
  )
}
