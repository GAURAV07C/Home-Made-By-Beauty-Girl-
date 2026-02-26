import { NextResponse } from "next/server";
import { getDynamicProductBySlug } from "@/lib/products";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const product = await getDynamicProductBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error) {
    console.error("GET /api/products/[slug] error:", error);
    return NextResponse.json({ message: "Failed to load product" }, { status: 500 });
  }
}
