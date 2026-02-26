import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDynamicProductBySlug } from "@/lib/products";
import { ProductTemplate } from "@/components/product/ProductTemplate";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getDynamicProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} | Home Made by Beauty Girl`,
    description: product.shortDescription,
  };
}

export default async function DynamicProductPage({ params }: { params: { slug: string } }) {
  const product = await getDynamicProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <ProductTemplate
      product={{
        name: product.name,
        tagline: product.tagline,
        headline: product.headline,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        price: product.price,
        comparePrice: product.comparePrice,
        mainImage: product.mainImage,
        galleryImages: product.galleryImages,
        ingredients: product.ingredients,
        benefits: product.benefits,
        amazonLink: product.amazonLink,
        flipkartLink: product.flipkartLink,
        meeshoLink: product.meeshoLink,
      }}
    />
  );
}
