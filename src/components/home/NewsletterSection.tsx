import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section id="newsletter" className="bg-amber-50/30 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-200/60 bg-white p-8 text-center shadow-lg shadow-amber-100/50 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Newsletter</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">Get Product Updates</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Be first to know about restocks, offers, and new skincare launches.
          </p>

          <form className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
            <Input type="email" placeholder="Enter your email address" className="h-11 rounded-full px-5" />
            <Button type="submit" className="h-11 rounded-full px-7">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
