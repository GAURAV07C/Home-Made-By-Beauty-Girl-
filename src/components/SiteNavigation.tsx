"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

export function SiteNavigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "border-b border-border/60 bg-white/90 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Home Made by Beauty Girl"
          className={`transition-all duration-300 ${scrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <BrandLogo variant="compact" className="origin-left" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground/75 hover:text-primary">
            Home
          </Link>
          <Link href="/soap" className="text-sm font-medium text-foreground/75 hover:text-primary">
            Soap
          </Link>
          <Link href="/soap#buy" className="text-sm font-medium text-foreground/75 hover:text-primary">
            Buy Now
          </Link>
        </nav>

        <Link
          href="/soap#buy"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Buy Soap</span>
        </Link>
      </div>
    </header>
  );
}
