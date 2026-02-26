"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/home/ProductCard";
import type { HomeCardProduct } from "@/lib/product-types";

const fallbackCategories: HomeCardProduct[] = [
  {
    id: "soap",
    slug: "soap",
    title: "Glow Soap",
    description: "Our active signature cleanser for daily glow, smooth texture, and gentle skin comfort.",
    imageSrc: "/soap.png",
    imageAlt: "Glow Soap product image",
    buyHref: "/soap#buy",
    detailsHref: "/soap",
    isStaticSoap: true,
  },
];

export function ProductCategorySection() {
  const [categories, setCategories] = useState<HomeCardProduct[]>(fallbackCategories);

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.products) && data.products.length > 0) {
          setCategories(data.products);
        }
      })
      .catch(() => {
        // Keep fallback soap card.
      });
  }, []);

  return (
    <section id="products" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Product Categories</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">Our Products</h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <ProductCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
