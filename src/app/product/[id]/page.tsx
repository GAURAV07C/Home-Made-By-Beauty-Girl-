import { notFound, redirect } from "next/navigation";
import { getDynamicProductById } from "@/lib/products";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getDynamicProductById(params.id);
  if (!product) notFound();
  redirect(`/products/${product.slug}`);
}
