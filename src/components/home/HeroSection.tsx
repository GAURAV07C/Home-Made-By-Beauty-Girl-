import { ArrowRight, Crown, Gem, Leaf, Shield, ShoppingCart, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

export function HeroSection() {
  const benefits = [
    { text: "Instant Glow", icon: Sparkles },
    { text: "Handmade with Love", icon: Crown },
    { text: "100% Chemical-Free", icon: Shield },
  ];

  return (
    <section id="hero" className="relative overflow-hidden bg-background py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-6 right-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-primary/15 via-emerald-400/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-gradient-to-tr from-accent/20 via-yellow-400/15 to-transparent blur-3xl" />
        <div className="absolute left-1/3 top-1/3 h-[260px] w-[260px] rounded-full bg-gradient-to-br from-purple-500/10 to-pink-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <BrandLogo variant="hero" />

          <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 via-emerald-500/10 to-primary/10 px-5 py-2.5 text-sm font-semibold text-primary sm:text-base">
            <Gem className="h-4 w-4" />
            Premium Skincare Brand
          </p>

          <h1 className="mt-6 font-display text-5xl font-bold leading-tight text-foreground sm:text-6xl lg:text-7xl">
            Elevate Your Skin Ritual
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-foreground/80 sm:text-xl">
            Build your glow routine with clean beauty essentials. Start with signature soap today and scale to cream, serum, gel, and body care as new collections launch.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            {benefits.map((benefit) => (
              <span
                key={benefit.text}
                className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-white/80 px-5 py-2.5 text-sm font-medium text-foreground shadow-lg shadow-black/5 sm:text-base"
              >
                <benefit.icon className="h-5 w-5 text-accent" />
                {benefit.text}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#products"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-foreground via-gray-800 to-foreground px-9 py-4.5 text-base font-semibold text-background shadow-2xl shadow-foreground/15 sm:text-lg"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <ShoppingCart className="relative z-10 h-5 w-5" />
              <span className="relative z-10">Buy Now</span>
              <ArrowRight className="relative z-10 h-4 w-4" />
            </a>
            <a
              href="/soap#buy"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-primary/30 px-9 py-4.5 text-base font-semibold text-primary transition-all hover:border-primary/50 hover:bg-primary/5 sm:text-lg"
            >
              <Leaf className="h-5 w-5" />
              <span>Soap</span>
            </a>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-white/75 px-5 py-3.5 text-base text-foreground/80 backdrop-blur-sm">
              <span className="font-semibold text-foreground">Live Now:</span> Glow Soap
            </div>
            <div className="rounded-2xl border border-border/60 bg-white/75 px-5 py-3.5 text-base text-foreground/80 backdrop-blur-sm">
              <span className="font-semibold text-foreground">Next:</span> Cream & Serum
            </div>
            <div className="rounded-2xl border border-border/60 bg-white/75 px-5 py-3.5 text-base text-foreground/80 backdrop-blur-sm">
              <span className="font-semibold text-foreground">Focus:</span> Clean Beauty
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
