import Link from "next/link";

export function CTASection() {
  return (
    <section id="cta" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/40 p-8 shadow-xl shadow-amber-100/40 sm:p-12">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Ready to Transform Your Skin?
          </h2>
          <Link
            href="/soap#buy"
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-primary to-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25"
          >
            Shop Soap Now
          </Link>
        </div>
      </div>
    </section>
  );
}
