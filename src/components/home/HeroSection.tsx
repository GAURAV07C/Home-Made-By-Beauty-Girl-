"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";

const ProductScene = dynamic(
  () => import("@/components/ProductScene").then((mod) => mod.ProductScene),
  { ssr: false },
);

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-gradient-to-br from-amber-100/80 to-orange-100/20 blur-3xl" />
        <div className="absolute -bottom-10 left-0 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-100/70 to-teal-100/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[88vh] w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <BrandLogo variant="hero" />

          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700">
            <Sparkles className="h-4 w-4" />
            Premium Skincare Bar
          </p>

          <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Clinical Glow, Gentle Cleanse, Everyday Luxury.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Powered by Vitamin C, Niacinamide, and Hyaluronic Acid to brighten, hydrate, and smooth your skin with every wash.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full px-8">
              <a href="#product">
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <a href="#ingredients">View Ingredients</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative h-[460px] overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-br from-white via-amber-50/30 to-emerald-50/40 shadow-2xl shadow-amber-100/40"
        >
          <ProductScene />
        </motion.div>
      </div>
    </section>
  );
}
