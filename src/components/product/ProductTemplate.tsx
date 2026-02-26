"use client";

import { ArrowRight, Check, Crown, Gem, Leaf, Shield, ShoppingCart, Sparkles, Star } from "lucide-react";

export interface ProductTemplateData {
  name: string;
  description: string;
  details: string;
  price: string;
  image: string;
  amazonLink?: string;
  flipkartLink?: string;
  meeshoLink?: string;
}

export function ProductTemplate({ product }: { product: ProductTemplateData }) {
  const featurePoints = [
    "Deep cleansing without drying your skin",
    "Instant brightness and natural radiance",
    "Soft, supple skin texture from first use",
    "Natural, soothing fragrance",
  ];

  const ingredients = ["Vitamin C", "Niacinamide", "Hyaluronic Acid", "Botanical Extract Blend", product.name];

  const platforms = [
    { label: "Amazon", href: product.amazonLink || "", color: "#FF9900" },
    { label: "Flipkart", href: product.flipkartLink || "", color: "#2874F0" },
    { label: "Meesho", href: product.meeshoLink || "", color: "#F43397" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <section id="hero" className="relative min-h-screen flex flex-col lg:flex-row items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-0 w-[350px] sm:w-[500px] lg:w-[800px] h-[350px] sm:h-[500px] lg:h-[800px] bg-gradient-to-br from-primary/15 via-emerald-400/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] sm:w-[450px] lg:w-[700px] h-[300px] sm:h-[450px] lg:h-[700px] bg-gradient-to-tr from-accent/20 via-yellow-400/15 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full lg:w-1/2 px-4 sm:px-6 lg:px-12 xl:px-20 py-8 lg:py-0 flex flex-col justify-center order-2 lg:order-1">
          <span className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-emerald-500/10 to-primary/10 border border-primary/20 text-sm font-semibold text-primary">
            <Gem className="w-4 h-4" />
            {product.name} Premium Formula
          </span>

          <h1 className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] text-foreground">
            Discover{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              {product.name}
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-foreground/80 leading-relaxed max-w-xl">{product.description}</p>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">{product.details}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {ingredients.map((ing, i) => (
              <span key={`${ing}-${i}`} className="text-sm sm:text-base font-medium text-foreground/80">
                {ing}
                {i < ingredients.length - 1 ? <span className="mx-2 text-accent">•</span> : null}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-2 sm:gap-3">
            {["Instant Glow", "Premium Quality", "Skin Friendly"].map((benefit) => (
              <span
                key={benefit}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-foreground border border-border/50 shadow-lg shadow-black/5"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                {benefit}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#buy"
              className="group relative overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-r from-foreground via-gray-800 to-foreground text-background px-8 py-4 rounded-2xl font-semibold shadow-2xl shadow-foreground/15 text-sm sm:text-base"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <ShoppingCart className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Buy Now</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </a>

            <a
              href="#ingredients"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold border-2 border-primary/30 text-primary hover:bg-primary/5 transition-all text-sm sm:text-base"
            >
              <Leaf className="w-5 h-5" />
              <span>Explore Ingredients</span>
            </a>
          </div>

          <div className="mt-6 text-2xl font-bold text-foreground">{product.price}</div>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex text-accent">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground">
              Rated <span className="font-bold text-foreground">4.9/5</span> by happy customers
            </span>
          </div>
        </div>

        <div className="relative w-full lg:w-1/2 h-[45vh] sm:h-[55vh] lg:h-screen order-1 lg:order-2">
          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border/50 bg-white/70 shadow-2xl shadow-black/10">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none opacity-[0.015]">
            <span className="font-display font-bold text-[18vw] sm:text-[14vw] leading-none whitespace-nowrap bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              GLOW
            </span>
          </div>
        </div>
      </section>

      <section id="ingredients" className="py-16 sm:py-24 lg:py-32 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent-foreground text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              Nature's Best
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Premium Ingredients
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
              Carefully selected ingredients crafted for visible, healthy glow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {ingredients.slice(0, 5).map((name) => (
              <div key={name} className="rounded-3xl border border-border/60 bg-white p-6 sm:p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-foreground">{name}</h3>
                <p className="mt-2 text-foreground/75">Supports glow, hydration, and smooth skin texture.</p>
              </div>
            ))}
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-foreground via-gray-800 to-foreground text-background flex flex-col justify-center">
              <Shield className="w-12 h-12 sm:w-14 sm:h-14 mb-5 text-accent" />
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-3">100% Quality Focused</h3>
              <p className="text-background/70 text-sm sm:text-base">Carefully made product with premium quality standards.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-secondary/30 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <span className="inline-flex items-center gap-2 text-accent font-semibold tracking-widest text-xs sm:text-sm uppercase mb-3">
                <Crown className="w-4 h-4" />
                Why Choose This Product
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Experience the{" "}
                <span className="bg-gradient-to-r from-accent via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  {product.name}
                </span>
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">{product.details}</p>

              <ul className="space-y-5 mb-10">
                {featurePoints.map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-lg">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-foreground/80">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="buy" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent/10 to-orange-500/10 text-accent-foreground text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <ShoppingCart className="w-4 h-4 text-accent" />
            Get Yours Today
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Available On</span>{" "}
            <span className="bg-gradient-to-r from-accent via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Top Platforms
            </span>
          </h2>
          <p className="text-muted-foreground mb-12 sm:mb-16 max-w-lg mx-auto text-sm sm:text-base lg:text-lg">
            Order {product.name} from your preferred platform.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-3xl mx-auto">
            {platforms.map((platform) => (
              <a
                key={platform.label}
                href={platform.href || "#buy"}
                target={platform.href ? "_blank" : undefined}
                rel={platform.href ? "noreferrer" : undefined}
                className={`relative group flex flex-col items-center gap-5 p-8 sm:p-10 rounded-3xl bg-white border-2 border-border/50 shadow-xl transition-all overflow-hidden ${
                  platform.href ? "hover:shadow-2xl" : "opacity-50 pointer-events-none"
                }`}
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg"
                  style={{ background: `${platform.color}20` }}
                >
                  <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: platform.color }} />
                </div>
                <span className="font-bold text-foreground text-lg relative z-10">{platform.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
