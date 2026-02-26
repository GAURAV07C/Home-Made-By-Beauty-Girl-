const ingredients = [
  {
    name: "Vitamin C",
    description: "Supports visible brightness and helps reduce dull-looking skin.",
  },
  {
    name: "Niacinamide",
    description: "Helps refine texture and balance skin appearance over time.",
  },
  {
    name: "Hyaluronic Acid",
    description: "Delivers hydration support for smoother and plumper skin feel.",
  },
  {
    name: "Botanical Extract Blend",
    description: "A curated mix of plant extracts chosen for calming and nourishing care.",
  },
];

export function IngredientsSection() {
  return (
    <section id="ingredients" className="bg-amber-50/20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Ingredients</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">Formulated with Purpose</h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ingredients.map((item) => (
            <article key={item.name} className="rounded-2xl border border-border/60 bg-white p-6">
              <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
