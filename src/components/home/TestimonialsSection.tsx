import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ananya S.",
    text: "The soap feels premium and leaves my skin soft without tightness.",
  },
  {
    name: "Ritika M.",
    text: "Visible glow in a few days. Excited for the upcoming serum launch.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-gradient-to-b from-white to-amber-50/30 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Testimonials</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">Customer Love</h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-2xl border border-border/60 bg-white p-6">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-base leading-relaxed text-foreground/75">"{item.text}"</p>
              <p className="mt-4 text-base font-semibold text-foreground">{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
