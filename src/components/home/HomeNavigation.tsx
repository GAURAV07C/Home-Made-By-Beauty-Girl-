"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#product", label: "Product" },
  { href: "#benefits", label: "Benefits" },
  { href: "#ingredients", label: "Ingredients" },
  { href: "#faq", label: "FAQ" },
];

export function HomeNavigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Home Made by Beauty Girl home">
          <BrandLogo variant="full" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button asChild className="rounded-full px-6">
          <a href="#product">Shop Now</a>
        </Button>
      </div>
    </header>
  );
}
