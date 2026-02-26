"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { ProductCategorySection } from "@/components/home/ProductCategorySection";
import { BrandValuesSection } from "@/components/home/BrandValuesSection";
import { IngredientPhilosophySection } from "@/components/home/IngredientPhilosophySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

export function SkincareHomePage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <main>
        <HeroSection />
        <ProductCategorySection />
        <BrandValuesSection />
        <IngredientPhilosophySection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </div>
  );
}
