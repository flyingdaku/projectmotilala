import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/theme-context";
import { WatchlistProvider } from "@/contexts/watchlist-context";
import { LayoutContent } from "@/components/layout/LayoutContent";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artha — The Chanakya of Personal Finance",
  description: "Ancient wisdom, modern precision. Track, analyse, and optimise your Indian investment portfolio with institutional-grade tools.",
  openGraph: {
    title: "Artha — The Chanakya of Personal Finance",
    description: "Ancient wisdom, modern precision. Institutional-grade portfolio intelligence for Indian investors.",
    siteName: "Artha",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Artha - The Chanakya of Personal Finance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artha — The Chanakya of Personal Finance",
    description: "Ancient wisdom, modern precision. Institutional-grade portfolio intelligence for Indian investors.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans" style={{ background: "var(--background)", color: "var(--text-primary)" }}>
        <ThemeProvider>
          <WatchlistProvider>
            <LayoutContent>{children}</LayoutContent>
          </WatchlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
