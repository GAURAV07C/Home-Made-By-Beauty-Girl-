"use client";

import { useMemo, useRef, type ReactElement } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ShoppingCart,
  Star,
  Sparkles,
  Leaf,
  Shield,
  Check,
  ArrowRight,
  Gem,
  Crown,
} from "lucide-react";
import { SiAmazon, SiFlipkart } from "react-icons/si";
import { IngredientCard } from "@/components/IngredientCard";
import { BrandLogo } from "@/components/BrandLogo";
import type { FaqItem } from "@/lib/default-faqs";

export interface ProductTemplateData {
  name: string;
  tagline: string;
  headline: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  comparePrice?: string;
  mainImage: string;
  cardImage?: string;
  galleryImages?: string[];
  ingredients?: string[];
  benefits?: string[];
  faqs?: FaqItem[];
  buyLink?: string;
  amazonLink?: string;
  flipkartLink?: string;
  meeshoLink?: string;
}

const ingredientVisuals = [
  {
    iconName: "droplets",
    gradient: "from-emerald-100 via-green-50 to-teal-100/50",
    iconColor: "text-emerald-600",
    glowColor: "bg-emerald-400/30",
  },
  {
    iconName: "sun",
    gradient: "from-amber-100 via-yellow-50 to-orange-100/50",
    iconColor: "text-amber-600",
    glowColor: "bg-amber-400/30",
  },
  {
    iconName: "sparkles",
    gradient: "from-yellow-100 via-amber-50 to-orange-100/50",
    iconColor: "text-yellow-600",
    glowColor: "bg-yellow-400/30",
  },
  {
    iconName: "leaf",
    gradient: "from-green-100 via-emerald-50 to-teal-100/50",
    iconColor: "text-green-700",
    glowColor: "bg-green-400/30",
  },
  {
    iconName: "heart",
    gradient: "from-rose-100 via-pink-50 to-red-100/50",
    iconColor: "text-rose-500",
    glowColor: "bg-rose-400/30",
  },
] as const;

export function ProductTemplate({ product }: { product: ProductTemplateData }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const ingredients = product.ingredients?.length
    ? product.ingredients
    : ["Vitamin C", "Niacinamide", "Hyaluronic Acid", "Botanical Extract Blend", "Green Tea"];

  const ingredientCards = ingredients.slice(0, 5).map((name, idx) => ({
    name,
    desc: `Premium active support from ${name} for glow-focused skincare.`,
    ...ingredientVisuals[idx % ingredientVisuals.length],
  }));

  const benefits = product.benefits?.length
    ? product.benefits
    : [
        "Deep cleansing without drying your skin",
        "Instant brightness and natural radiance",
        "Soft, supple skin texture from first use",
        "Natural, soothing fragrance",
      ];

  const topBenefits = useMemo(
    () => [
      { text: "Instant Glow", icon: Sparkles },
      { text: "Handmade with Love", icon: Crown },
      { text: "100% Chemical-Free", icon: Shield },
      { text: "Premium Quality", icon: Gem },
    ],
    [],
  );

  const computedTagline = product.tagline || `${product.name} - Instant Glow Shop`;
  const computedHeadline = product.headline || `${product.name} Radiance`;
  const heroDescription = product.shortDescription || "Naturally cleanses, nourishes, and gives instant glow.";
  const detailDescription = product.fullDescription || "Visible results from first use with premium skincare actives.";
  const ctaBuy = product.buyLink || "#buy";
  const detailImage = product.mainImage || product.cardImage || "/soap.png";
  const availablePlatforms = [
    product.amazonLink
      ? { key: "amazon", label: "Amazon", href: product.amazonLink, icon: <SiAmazon className="w-10 h-10 sm:w-12 sm:h-12 text-[#FF9900]" />, ring: "hover:border-[#FF9900]/40", bg: "from-[#FF9900]/10 to-[#FF9900]/5", overlay: "from-[#FF9900]/5 to-transparent" }
      : null,
    product.flipkartLink
      ? { key: "flipkart", label: "Flipkart", href: product.flipkartLink, icon: <SiFlipkart className="w-10 h-10 sm:w-12 sm:h-12 text-[#2874F0]" />, ring: "hover:border-[#2874F0]/40", bg: "from-[#2874F0]/10 to-[#2874F0]/5", overlay: "from-[#2874F0]/5 to-transparent" }
      : null,
    product.meeshoLink
      ? { key: "meesho", label: "Meesho", href: product.meeshoLink, icon: <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-[#F43397]" />, ring: "hover:border-[#F43397]/40", bg: "from-[#F43397]/10 to-[#F43397]/5", overlay: "from-[#F43397]/5 to-transparent" }
      : null,
  ].filter(Boolean) as Array<{ key: string; label: string; href: string; icon: ReactElement; ring: string; bg: string; overlay: string }>;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <motion.section
        ref={heroRef}
        id="hero"
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex flex-col lg:flex-row items-center overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-0 w-[350px] sm:w-[500px] lg:w-[800px] h-[350px] sm:h-[500px] lg:h-[800px] bg-gradient-to-br from-primary/15 via-emerald-400/10 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-[300px] sm:w-[450px] lg:w-[700px] h-[300px] sm:h-[450px] lg:h-[700px] bg-gradient-to-tr from-accent/20 via-yellow-400/15 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-gradient-to-br from-purple-500/10 to-pink-400/10 rounded-full blur-3xl"
          />
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              className="absolute rounded-full bg-gradient-to-br from-accent to-yellow-300"
              style={{
                width: `${6 + i * 2}px`,
                height: `${6 + i * 2}px`,
                left: `${10 + i * 12}%`,
                top: `${20 + i * 8}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full lg:w-1/2 px-4 sm:px-6 lg:px-12 xl:px-20 py-8 lg:py-0 flex flex-col justify-center order-2 lg:order-1">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <BrandLogo variant="hero" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-emerald-500/10 to-primary/10 border border-primary/20 text-sm font-semibold text-primary">
                <Gem className="w-4 h-4" />
                {computedTagline}
              </span>
            </motion.div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] mb-4 sm:mb-6 text-foreground">
              <span className="block">Unlock Your</span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">{computedHeadline}</span>
                <motion.span animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0.7] }} transition={{ duration: 1.5, delay: 0.8 }} className="absolute bottom-1 left-0 w-full h-3 bg-accent/25 -z-0 rounded" />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg text-foreground/80 mb-4 flex flex-wrap items-center gap-2"
            >
              {ingredients.slice(0, 5).map((ing, i) => (
                <span key={ing} className="inline-flex items-center">
                  <span className="font-medium text-foreground">{ing}</span>
                  {i < Math.min(ingredients.length, 5) - 1 ? <span className="mx-2 text-accent">•</span> : null}
                </span>
              ))}
            </motion.p>

            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-md">
              {heroDescription}
              <span className="block mt-1 font-medium text-foreground">{detailDescription}</span>
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
              {topBenefits.map((benefit, i) => (
                <motion.span
                  key={benefit.text}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-foreground border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <benefit.icon className="w-4 h-4 text-accent" />
                  {benefit.text}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a
                href={ctaBuy}
                target={ctaBuy.startsWith("http") ? "_blank" : undefined}
                rel={ctaBuy.startsWith("http") ? "noreferrer" : undefined}
                className="group relative overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-r from-foreground via-gray-800 to-foreground text-background px-8 py-4 rounded-2xl font-semibold transition-all shadow-2xl shadow-foreground/15 hover:shadow-foreground/25 text-sm sm:text-base"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <ShoppingCart className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Buy Now</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#ingredients"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all text-sm sm:text-base"
              >
                <Leaf className="w-5 h-5" />
                <span>Explore Ingredients</span>
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex items-center gap-4 mt-10">
              <div>
                <div className="flex text-accent mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Loved by <span className="font-bold text-foreground">1000+</span> happy customers
                </span>
              </div>
              <span className="text-2xl font-bold text-foreground">{product.price}</span>
              {product.comparePrice ? <span className="text-lg text-muted-foreground line-through">{product.comparePrice}</span> : null}
            </motion.div>
          </motion.div>
        </div>

        <div className="relative w-full lg:w-1/2 h-[45vh] sm:h-[55vh] lg:h-screen order-1 lg:order-2">
          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border/50 bg-white/70 shadow-2xl shadow-black/10">
            <img src={detailImage} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none opacity-[0.015]">
            <span className="font-display font-bold text-[18vw] sm:text-[14vw] leading-none whitespace-nowrap bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              GLOW
            </span>
          </div>
        </div>
      </motion.section>

      <section id="ingredients" className="py-16 sm:py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14 sm:mb-20">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent-foreground text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              Nature's Best
            </motion.span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-emerald-600 to-teal-600 bg-clip-text text-transparent">Premium Natural</span>{" "}
              <span className="text-foreground">Ingredients</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {ingredientCards.map((ing, idx) => (
              <IngredientCard
                key={`${ing.name}-${idx}`}
                name={ing.name}
                description={ing.desc}
                iconName={ing.iconName}
                delay={idx * 0.1}
                gradient={ing.gradient}
                iconColor={ing.iconColor}
                glowColor={ing.glowColor}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-foreground via-gray-800 to-foreground text-background flex flex-col justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-40 h-40 border border-white/10 rounded-full"
              />
              <Shield className="w-12 h-12 sm:w-14 sm:h-14 mb-5 text-accent" />
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-3">100% Quality Focused</h3>
              <p className="text-background/70 text-sm sm:text-base">Carefully made with premium quality standards.</p>
              <Leaf className="absolute -bottom-8 -right-8 w-28 h-28 sm:w-36 sm:h-36 text-white/5 rotate-12" />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-secondary/30 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                <img src={detailImage} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute top-6 left-6 bg-gradient-to-r from-accent to-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-xl shadow-accent/30"
              >
                Best Seller
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
              <span className="inline-flex items-center gap-2 text-accent font-semibold tracking-widest text-xs sm:text-sm uppercase mb-3">
                <Crown className="w-4 h-4" />
                Why Choose {product.name}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Experience the{" "}
                <span className="bg-gradient-to-r from-accent via-orange-500 to-amber-500 bg-clip-text text-transparent">{product.name}</span>
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">{detailDescription}</p>

              <ul className="space-y-5 mb-10">
                {benefits.map((text, i) => (
                  <motion.li
                    key={`${text}-${i}`}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-lg">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-foreground/80">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="buy" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/8" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent/5 rounded-full"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent/10 to-orange-500/10 text-accent-foreground text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4"
            >
              <ShoppingCart className="w-4 h-4 text-accent" />
              Get Yours Today
            </motion.span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">Available On</span>{" "}
              <span className="bg-gradient-to-r from-accent via-orange-500 to-amber-500 bg-clip-text text-transparent">Top Platforms</span>
            </h2>
            <p className="text-muted-foreground mb-12 sm:mb-16 max-w-lg mx-auto text-sm sm:text-base lg:text-lg">
              Order {product.name} from your favorite shopping platform and experience the glow.
            </p>

            {availablePlatforms.length > 0 ? (
              <div className={`grid grid-cols-1 gap-5 sm:gap-6 lg:gap-8 max-w-3xl mx-auto ${availablePlatforms.length === 1 ? "sm:grid-cols-1" : availablePlatforms.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
                {availablePlatforms.map((platform) => (
                  <motion.a
                    key={platform.key}
                    href={platform.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -12, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative group flex flex-col items-center gap-5 p-8 sm:p-10 rounded-3xl bg-white border-2 border-border/50 shadow-xl transition-all overflow-hidden hover:shadow-2xl ${platform.ring}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${platform.overlay} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${platform.bg} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      {platform.icon}
                    </div>
                    <span className="font-bold text-foreground text-lg relative z-10">{platform.label}</span>
                  </motion.a>
                ))}
              </div>
            ) : (
              <a
                href={ctaBuy}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transition-all hover:-translate-y-1 text-sm sm:text-base"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
