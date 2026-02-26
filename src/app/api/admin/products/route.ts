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

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const name = String(form.get("name") || "").trim();
    const description = String(form.get("description") || "").trim();
    const details = String(form.get("details") || "").trim();
    const price = String(form.get("price") || "").trim();
    const amazonLink = String(form.get("amazonLink") || "").trim();
    const flipkartLink = String(form.get("flipkartLink") || "").trim();
    const meeshoLink = String(form.get("meeshoLink") || "").trim();
    const imageFile = form.get("imageFile");

    if (!name || !description || !details || !price || !imageFile || !(imageFile instanceof File)) {
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
      description,
      details,
      price,
      image,
      buyLink: amazonLink || flipkartLink || meeshoLink || "",
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
