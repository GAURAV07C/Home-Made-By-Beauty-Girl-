import { Sparkles, Droplets, SunMedium, Shield } from "lucide-react";

const benefits = [
  {
    title: "Brightening Support",
    description: "Vitamin C helps improve dullness and promotes a visibly radiant finish.",
    icon: Sparkles,
  },
  {
    title: "Deep Hydration",
    description: "Hyaluronic Acid supports moisture retention for soft, bouncy skin feel.",
    icon: Droplets,
  },
  {
    title: "Texture Refinement",
    description: "Niacinamide helps smooth uneven texture and improves overall tone.",
    icon: SunMedium,
  },
  {
    title: "Barrier-Friendly",
    description: "A gentle cleansing base designed for daily use without over-drying.",
    icon: Shield,
  },
];

export function KeyBenefitsSection() {
  return (
    <section id="benefits" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Key Benefits</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">Visible Results, Premium Feel</h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border/60 bg-gradient-to-b from-white to-amber-50/30 p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
