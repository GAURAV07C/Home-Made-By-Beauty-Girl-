import { Sparkles, Droplets, Sun } from "lucide-react";

const steps = [
  {
    title: "Lather",
    description: "Wet skin and work the soap into a creamy lather in your palms.",
    icon: Sparkles,
  },
  {
    title: "Massage",
    description: "Apply gently to face and body in circular motions for 30-60 seconds.",
    icon: Droplets,
  },
  {
    title: "Rinse & Glow",
    description: "Rinse with lukewarm water and follow with moisturizer and SPF.",
    icon: Sun,
  },
];

export function HowToUseSection() {
  return (
    <section id="how-to-use" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">How To Use</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">3 Simple Steps</h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-border/60 bg-amber-50/20 p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                <step.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step {index + 1}</p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
