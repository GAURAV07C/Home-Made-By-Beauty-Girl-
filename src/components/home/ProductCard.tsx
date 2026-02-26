import Link from "next/link";

interface ProductCardProps {
  id?: string;
  slug?: string;
  title: string;
  description: string;
  category?: string;
  price?: string;
  imageSrc?: string;
  imageAlt?: string;
  buyHref?: string;
  detailsHref?: string;
  isComingSoon?: boolean;
}

export function ProductCard({
  title,
  description,
  category,
  price,
  imageSrc = "https://placehold.co/900x600/f8f5ef/2f3b35?text=Product+Image",
  imageAlt = "Product image placeholder",
  buyHref,
  detailsHref,
  isComingSoon = false,
}: ProductCardProps) {
  return (
    <article className="rounded-3xl border border-border/60 bg-white p-6 shadow-xl shadow-amber-100/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-100/50 sm:p-8">
      <div className="mb-6 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/50 p-3 sm:p-4">
        <div className="overflow-hidden rounded-xl bg-white/90">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="aspect-[5/4] w-full object-contain p-3 sm:p-4"
            loading="lazy"
          />
        </div>
      </div>

      <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{title}</h3>
      <p className="mt-3 line-clamp-2 text-base leading-relaxed text-foreground/80 sm:text-lg">{description}</p>
      <div className="mt-3 flex items-center gap-3">
        {category ? <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase text-foreground/70">{category}</span> : null}
        {price ? <span className="text-sm font-semibold text-foreground">{price}</span> : null}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {isComingSoon ? (
          <>
            <button type="button" disabled className="cursor-not-allowed rounded-full bg-secondary px-6 py-2.5 text-base font-semibold text-foreground/40">
              Buy Soon
            </button>
            <button type="button" disabled className="cursor-not-allowed rounded-full border border-border px-6 py-2.5 text-base font-semibold text-foreground/40">
              Coming Soon
            </button>
          </>
        ) : (
          <>
            <Link
              href={buyHref || "/soap#buy"}
              className="rounded-full bg-gradient-to-r from-primary to-emerald-600 px-6 py-2.5 text-base font-semibold text-white shadow-lg shadow-primary/20"
            >
              Buy Now
            </Link>
            <Link
              href={detailsHref || "/soap"}
              className="rounded-full border border-border px-6 py-2.5 text-base font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              View Details
            </Link>
          </>
        )}
      </div>
    </article>
  );
}
