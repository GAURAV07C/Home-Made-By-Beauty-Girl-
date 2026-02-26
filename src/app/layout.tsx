import type { Metadata } from "next";
import "./globals.css";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import { GlobalFaqAccordion } from "@/components/GlobalFaqAccordion";

export const metadata: Metadata = {
  title: "Glow Soap",
  description: "Natural glow beauty soap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteNavigation />
        <main className="pt-16 sm:pt-20">{children}</main>
        <GlobalFaqAccordion />
        <SiteFooter />
      </body>
    </html>
  );
}
