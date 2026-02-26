import { NextResponse } from "next/server";
import { createAdminProduct, listAdminProducts } from "@/lib/products";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET() {
  try {
    const products = await listAdminProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET /api/admin/products error:", error);
    return NextResponse.json({ message: "Failed to load admin products" }, { status: 500 });
  }
}

function parseListField(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  const raw = String(value).trim();
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item || "").trim()).filter(Boolean);
    }
  } catch {
    // Fall back to comma/newline split.
  }

  return raw
    .split(/\r?\n|,/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const name = String(form.get("name") || "").trim();
    const slug = String(form.get("slug") || "").trim();
    const tagline = String(form.get("tagline") || "").trim();
    const headline = String(form.get("headline") || "").trim();
    const shortDescription = String(form.get("shortDescription") || "").trim();
    const fullDescription = String(form.get("fullDescription") || "").trim();
    const price = String(form.get("price") || "").trim();
    const comparePrice = String(form.get("comparePrice") || "").trim();
    const category = String(form.get("category") || "").trim();
    const stock = Number(String(form.get("stock") || "0").trim() || 0);
    const isFeatured = String(form.get("isFeatured") || "false") === "true";
    const ingredients = parseListField(form.get("ingredients"));
    const benefits = parseListField(form.get("benefits"));
    const galleryImages = parseListField(form.get("galleryImages"));
    const buyLink = String(form.get("buyLink") || "").trim();
    const amazonLink = String(form.get("amazonLink") || "").trim();
    const flipkartLink = String(form.get("flipkartLink") || "").trim();
    const meeshoLink = String(form.get("meeshoLink") || "").trim();
    const imageFile = form.get("imageFile");

    if (!name || !shortDescription || !fullDescription || !price || !imageFile || !(imageFile instanceof File)) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const ext = path.extname(imageFile.name || ".png").toLowerCase() || ".png";
    const safeName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const fileName = `${safeName}-${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    const bytes = Buffer.from(await imageFile.arrayBuffer());
    await writeFile(filePath, bytes);
    const image = `/uploads/${fileName}`;

    const created = await createAdminProduct({
      name,
      slug,
      tagline,
      headline,
      shortDescription,
      fullDescription,
      price,
      comparePrice,
      mainImage: image,
      galleryImages,
      ingredients,
      benefits,
      stock: Number.isFinite(stock) ? stock : 0,
      category,
      isFeatured,
      buyLink,
      amazonLink,
      flipkartLink,
      meeshoLink,
    });

    return NextResponse.json({ product: created }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/products error:", error);
    return NextResponse.json({ message: "Failed to create product" }, { status: 500 });
  }
}
