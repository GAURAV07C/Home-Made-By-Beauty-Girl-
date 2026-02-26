import { NextResponse } from "next/server";
import { listAllCardsForHome } from "@/lib/products";

export async function GET() {
  try {
    const products = await listAllCardsForHome();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ message: "Failed to load products" }, { status: 500 });
  }
}
