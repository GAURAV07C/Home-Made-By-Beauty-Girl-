import { notFound } from "next/navigation";
import { getDynamicProductById } from "@/lib/products";
import { ProductTemplate } from "@/components/product/ProductTemplate";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getDynamicProductById(params.id);
  if (!product) notFound();

  return (
    <ProductTemplate
      product={{
        name: product.name,
        description: product.description,
        details: product.details,
        price: product.price,
        image: product.image,
        amazonLink: product.amazonLink,
        flipkartLink: product.flipkartLink,
        meeshoLink: product.meeshoLink,
      }}
    />
  );
}
