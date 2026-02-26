import { IngredientCard } from "@/components/IngredientCard";
import { BrandLogo } from "@/components/BrandLogo";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { 
  ShoppingCart, 
  Star, 
  Sparkles, 
  Leaf, 
  Shield,
  Check,
  ArrowRight,
  Gem,
  Crown
} from "lucide-react";
import { SiAmazon, SiFlipkart } from "react-icons/si";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const ingredients = [
    { 
      name: "Fresh Aloe Vera", 
      desc: "Deep hydration and soothing care for soft, supple skin",
      iconName: "droplets",
      gradient: "from-emerald-100 via-green-50 to-teal-100/50",
      iconColor: "text-emerald-600",
      glowColor: "bg-emerald-400/30"
    },
    { 
      name: "Besan (Gram Flour)", 
      desc: "Natural exfoliant that reveals brighter, smoother complexion",
      iconName: "sun",
      gradient: "from-amber-100 via-yellow-50 to-orange-100/50",
      iconColor: "text-amber-600",
      glowColor: "bg-amber-400/30"
    },
    { 
      name: "Turmeric (Haldi)", 
      desc: "Ancient golden secret for radiant, glowing skin",
      iconName: "sparkles",
      gradient: "from-yellow-100 via-amber-50 to-orange-100/50",
      iconColor: "text-yellow-600",
      glowColor: "bg-yellow-400/30"
    },
    { 
      name: "Neem Leaves", 
      desc: "Purifies and protects with antibacterial properties",
      iconName: "leaf",
      gradient: "from-green-100 via-emerald-50 to-teal-100/50",
      iconColor: "text-green-700",
      glowColor: "bg-green-400/30"
    },
    { 
      name: "Vitamin E", 
      desc: "Nourishes deeply and fights signs of aging",
      iconName: "heart",
      gradient: "from-rose-100 via-pink-50 to-red-100/50",
      iconColor: "text-rose-500",
      glowColor: "bg-rose-400/30"
    },
  ];

  const benefits = [
    { text: "Instant Glow", icon: Sparkles },
    { text: "Handmade with Love", icon: Crown },
    { text: "100% Chemical-Free", icon: Shield },
    { text: "Premium Quality", icon: Gem },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        id="hero"
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex flex-col lg:flex-row items-center overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main gradient blobs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-0 w-[350px] sm:w-[500px] lg:w-[800px] h-[350px] sm:h-[500px] lg:h-[800px] bg-gradient-to-br from-primary/15 via-emerald-400/10 to-transparent rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -20, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-[300px] sm:w-[450px] lg:w-[700px] h-[300px] sm:h-[450px] lg:h-[700px] bg-gradient-to-tr from-accent/20 via-yellow-400/15 to-transparent rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-gradient-to-br from-purple-500/10 to-pink-400/10 rounded-full blur-3xl"
          />
          
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4 + i * 0.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.3
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

        {/* Text Content */}
        <div className="relative z-10 w-full lg:w-1/2 px-4 sm:px-6 lg:px-12 xl:px-20 py-8 lg:py-0 flex flex-col justify-center order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Brand Name - Hero Style */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <BrandLogo variant="hero" />
            </motion.div>

            {/* Product Name */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-emerald-500/10 to-primary/10 border border-primary/20 text-sm font-semibold text-primary">
                <Gem className="w-4 h-4" />
                Beauty Soap – Instant Glow Formula
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] mb-4 sm:mb-6 text-foreground">
              <span className="block">Unlock Your</span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">Natural Radiance</span>
                <motion.span 
                  animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0.7] }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="absolute bottom-1 left-0 w-full h-3 bg-accent/25 -z-0 rounded"
                />
              </span>
            </h1>

            {/* Ingredients list */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg text-foreground/80 mb-4 flex flex-wrap items-center gap-2"
            >
              {["Aloe Vera", "Besan", "Haldi", "Neem", "Vitamin E"].map((ing, i) => (
                <span key={ing} className="inline-flex items-center">
                  <span className="font-medium text-foreground">{ing}</span>
                  {i < 4 && <span className="mx-2 text-accent">•</span>}
                </span>
              ))}
            </motion.p>

            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-md">
              Naturally Cleanses, Nourishes & Gives Instant Glow. 
              <span className="block mt-1 font-medium text-foreground">Visible results from the first use.</span>
            </p>

            {/* Benefits Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
              {benefits.map((benefit, i) => (
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

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a 
                href="#buy"
                className="group relative overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-r from-foreground via-gray-800 to-foreground text-background px-8 py-4 rounded-2xl font-semibold transition-all shadow-2xl shadow-foreground/15 hover:shadow-foreground/25 text-sm sm:text-base"
                data-testid="button-buy-now-hero"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <ShoppingCart className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Buy Now</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a 
                href="#ingredients"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all text-sm sm:text-base"
                data-testid="button-learn-more"
              >
                <Leaf className="w-5 h-5" />
                <span>Explore Ingredients</span>
              </a>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-4 mt-10"
            >
              <div className="flex -space-x-3">
                {[
                  "bg-gradient-to-br from-pink-400 to-rose-500",
                  "bg-gradient-to-br from-purple-400 to-violet-500",
                  "bg-gradient-to-br from-amber-400 to-orange-500",
                  "bg-gradient-to-br from-emerald-400 to-green-500",
                  "bg-gradient-to-br from-blue-400 to-cyan-500",
                ].map((bg, i) => (
                  <div 
                    key={i} 
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${bg} border-2 border-background flex items-center justify-center text-white text-xs font-bold shadow-lg`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
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
            </motion.div>
          </motion.div>
        </div>

        {/* Product Visual */}
        <div className="relative w-full lg:w-1/2 h-[45vh] sm:h-[55vh] lg:h-screen order-1 lg:order-2">
          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border/50 bg-white/70 shadow-2xl shadow-black/10">
            <Image
              src="/soappage.png"
              alt="Model holding Home Made by Beauty Girl soap"
              fill
              priority
              className="object-cover"
            />
          </div>
          
          {/* Background text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none opacity-[0.015]">
            <span className="font-display font-bold text-[18vw] sm:text-[14vw] leading-none whitespace-nowrap bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">GLOW</span>
          </div>
        </div>
      </motion.section>

      {/* Ingredients Section */}
      <section id="ingredients" className="py-16 sm:py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 sm:mb-20"
          >
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
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
              Each ingredient is carefully selected for its proven benefits, creating a perfect blend for your skin
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {ingredients.map((ing, idx) => (
              <IngredientCard 
                key={ing.name}
                name={ing.name}
                description={ing.desc}
                iconName={ing.iconName}
                delay={idx * 0.1}
                gradient={ing.gradient}
                iconColor={ing.iconColor}
                glowColor={ing.glowColor}
              />
            ))}
            
            {/* Feature Card */}
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
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-3">100% Chemical Free</h3>
              <p className="text-background/70 text-sm sm:text-base">No parabens, no sulfates, no artificial colors. Just pure nature.</p>
              <Leaf className="absolute -bottom-8 -right-8 w-28 h-28 sm:w-36 sm:h-36 text-white/5 rotate-12" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-secondary/30 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Image/Visual Side */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/15 to-emerald-500/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-emerald-500/30 flex items-center justify-center backdrop-blur-sm"
                  >
                    <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-white/60 backdrop-blur-md flex flex-col items-center justify-center shadow-2xl border border-white/50">
                      <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-accent mb-2" />
                      <span className="font-display text-lg sm:text-xl font-bold text-foreground">Beauty Soap</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">Instant Glow</span>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Floating badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute top-6 left-6 bg-gradient-to-r from-accent to-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-xl shadow-accent/30"
              >
                Best Seller
              </motion.div>
              
              {/* Decorative */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/15 rounded-full blur-2xl" />
            </motion.div>
            
            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <span className="inline-flex items-center gap-2 text-accent font-semibold tracking-widest text-xs sm:text-sm uppercase mb-3">
                <Crown className="w-4 h-4" />
                Why Choose Us
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Experience the{" "}
                <span className="bg-gradient-to-r from-accent via-orange-500 to-amber-500 bg-clip-text text-transparent">Instant Glow</span>
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
                Our specialized formula combines traditional beauty secrets with modern skincare science.
                The besan gently exfoliates while turmeric works its magic to brighten your complexion instantly.
              </p>
              
              <ul className="space-y-5 mb-10">
                {[
                  { text: "Deep cleansing without drying your skin", color: "from-emerald-500 to-green-600" },
                  { text: "Instant brightness and natural radiance", color: "from-amber-500 to-orange-500" },
                  { text: "Soft, supple skin texture from first use", color: "from-pink-500 to-rose-500" },
                  { text: "Natural, soothing fragrance", color: "from-purple-500 to-violet-500" }
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-lg`}>
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-foreground/80">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
              
              <a 
                href="#buy"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transition-all hover:-translate-y-1 text-sm sm:text-base"
                data-testid="link-shop-now"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Buy Now Section */}
      <section id="buy" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/8" />
        
        {/* Animated background circles */}
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
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
              Order your Beauty Soap now from your favorite shopping platform and experience the glow
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-3xl mx-auto">
              {/* Amazon */}
              <motion.a
                href="#"
                whileHover={{ y: -12, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative group flex flex-col items-center gap-5 p-8 sm:p-10 rounded-3xl bg-white border-2 border-border/50 shadow-xl hover:shadow-2xl hover:border-[#FF9900]/40 transition-all overflow-hidden"
                data-testid="link-amazon"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF9900]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#FF9900]/10 to-[#FF9900]/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#FF9900]/10">
                  <SiAmazon className="w-10 h-10 sm:w-12 sm:h-12 text-[#FF9900]" />
                </div>
                <span className="font-bold text-foreground text-lg relative z-10">Amazon</span>
              </motion.a>
              
              {/* Flipkart */}
              <motion.a
                href="#"
                whileHover={{ y: -12, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative group flex flex-col items-center gap-5 p-8 sm:p-10 rounded-3xl bg-white border-2 border-border/50 shadow-xl hover:shadow-2xl hover:border-[#2874F0]/40 transition-all overflow-hidden"
                data-testid="link-flipkart"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2874F0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#2874F0]/10 to-[#2874F0]/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#2874F0]/10">
                  <SiFlipkart className="w-10 h-10 sm:w-12 sm:h-12 text-[#2874F0]" />
                </div>
                <span className="font-bold text-foreground text-lg relative z-10">Flipkart</span>
              </motion.a>
              
              {/* Meesho */}
              <motion.a
                href="#"
                whileHover={{ y: -12, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative group flex flex-col items-center gap-5 p-8 sm:p-10 rounded-3xl bg-white border-2 border-border/50 shadow-xl hover:shadow-2xl hover:border-[#F43397]/40 transition-all overflow-hidden"
                data-testid="link-meesho"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F43397]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#F43397]/10 to-[#F43397]/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#F43397]/10">
                  <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-[#F43397]" />
                </div>
                <span className="font-bold text-foreground text-lg relative z-10">Meesho</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 sm:py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary/8 via-accent/5 to-purple-500/8 border border-primary/15 overflow-hidden"
          >
            {/* Animated decorative elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-40 h-40 border border-primary/10 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-16 -left-16 w-32 h-32 border border-accent/10 rounded-full"
            />
            
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-6"
              >
                <Sparkles className="w-8 h-8 text-accent" />
              </motion.div>
              
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3 text-foreground">
                More Natural Products <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Coming Soon</span>
              </h3>
              <p className="text-muted-foreground mb-8 text-sm sm:text-base">
                We're crafting new natural skincare secrets for your hair and body. Be the first to know!
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-5 py-4 rounded-xl border-2 border-border/50 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-sm sm:text-base"
                  data-testid="input-email"
                />
                <button 
                  className="px-8 py-4 bg-gradient-to-r from-primary to-emerald-600 text-white rounded-xl font-bold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transition-all hover:-translate-y-1 text-sm sm:text-base"
                  data-testid="button-notify"
                >
                  Notify Me
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
