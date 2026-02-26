import Image from "next/image";
import { Star, ShieldCheck, Leaf, CheckCircle2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const badges = [
  { icon: ShieldCheck, label: "Dermatologically Tested" },
  { icon: Leaf, label: "Cruelty-Free" },
  { icon: CheckCircle2, label: "Suitable for All Skin Types" },
];

export function ProductHighlightSection() {
  return (
    <section id="product" className="bg-gradient-to-b from-white to-amber-50/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="rounded-[2rem] border border-border/50 bg-white p-6 shadow-xl shadow-amber-100/40 sm:p-10">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 to-emerald-50/40">
            <Image
              src="/brand-logo.jpg"
              alt="Home Made by Beauty Girl soap"
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 90vw, 480px"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Single Product Focus</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Glow Renewal Soap Bar
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            A rich cleansing bar that supports brighter tone, balanced texture, and deep hydration without stripping your skin barrier.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="text-3xl font-bold text-foreground">Rs. 499</div>
            <div className="flex items-center gap-1 text-amber-500">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} className="h-4 w-4 fill-current" />
              ))}
              <span className="ml-1 text-sm font-medium text-muted-foreground">(4.9/5)</span>
            </div>
          </div>

          <Button size="lg" className="mt-7 rounded-full px-8">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>

          <div className="mt-8 grid gap-3">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200/60 bg-white px-4 py-2 text-sm text-foreground/85"
              >
                <badge.icon className="h-4 w-4 text-primary" />
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
