import { ProductCard } from "@/components/home/ProductCard";

const categories = [
  {
    title: "Glow Soap",
    description: "Our active signature cleanser for daily glow, smooth texture, and gentle skin comfort.",
    imageSrc: "/soap.png",
    imageAlt: "Glow Soap product image",
    buyHref: "/soap#buy",
    detailsHref: "/soap",
  },
];

export function ProductCategorySection() {
  return (
    <section id="products" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Product Categories</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">Our Products</h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6">
          {categories.map((category) => (
            <ProductCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
