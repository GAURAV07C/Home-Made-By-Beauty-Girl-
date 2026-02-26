import { ShieldCheck, FlaskConical, Rabbit, Sparkles } from "lucide-react";

const values = [
  {
    title: "Dermatologically Tested",
    description: "Designed with skin compatibility and safety in mind.",
    icon: ShieldCheck,
  },
  {
    title: "Premium Ingredients",
    description: "Actives and botanicals chosen for visible results.",
    icon: FlaskConical,
  },
  {
    title: "Cruelty-Free",
    description: "No animal testing across our development process.",
    icon: Rabbit,
  },
  {
    title: "Suitable for All Skin Types",
    description: "Balanced formulas built for everyday use.",
    icon: Sparkles,
  },
];

export function BrandValuesSection() {
  return (
    <section id="brand-values" className="bg-amber-50/20 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <article key={value.title} className="rounded-2xl border border-border/60 bg-white p-6">
              <value.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-lg font-semibold text-foreground">{value.title}</h3>
              <p className="mt-2 text-base text-foreground/75">{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
