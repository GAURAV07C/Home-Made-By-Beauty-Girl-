"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BrandLogo } from "@/components/BrandLogo";

export default function Page() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />

      <main className="relative pt-24 sm:pt-28 lg:pt-32">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-primary/15 via-emerald-400/10 to-transparent blur-3xl" />
          <div className="absolute -bottom-16 -left-24 w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-accent/20 via-orange-400/10 to-transparent blur-3xl" />
        </div>

        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-6 sm:mb-8">
              <BrandLogo variant="hero" />
            </div>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent-foreground text-xs sm:text-sm font-semibold uppercase tracking-widest mb-5">
              <Sparkles className="w-4 h-4 text-accent" />
              Natural Skincare
            </span>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight text-foreground mb-4 sm:mb-6">
              Handmade Beauty Care
              <span className="block bg-gradient-to-r from-primary via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Crafted for Instant Glow
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mb-8 sm:mb-10 leading-relaxed">
              Discover our premium natural soap collection made with aloe vera, besan, haldi, neem and vitamin E.
            </p>

            <Link
              href="/soap"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transition-all hover:-translate-y-1 text-sm sm:text-base"
            >
              <span>Explore Soap Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
