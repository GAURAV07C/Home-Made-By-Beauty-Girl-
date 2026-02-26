import { NextResponse } from "next/server";
import { deleteAdminProduct, getDynamicProductById, updateAdminProduct } from "@/lib/products";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const product = await getDynamicProductById(params.id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error) {
    console.error("GET /api/admin/products/[id] error:", error);
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const isMultipart = contentType.includes("multipart/form-data");
    const payload: Record<string, unknown> = {};

    if (isMultipart) {
      const form = await request.formData();
      const imageFile = form.get("imageFile");
      const cardImageFile = form.get("cardImageFile");

      payload.name = String(form.get("name") || "").trim();
      payload.slug = String(form.get("slug") || "").trim();
      payload.tagline = String(form.get("tagline") || "").trim();
      payload.headline = String(form.get("headline") || "").trim();
      payload.shortDescription = String(form.get("shortDescription") || "").trim();
      payload.fullDescription = String(form.get("fullDescription") || "").trim();
      payload.price = String(form.get("price") || "").trim();
      payload.comparePrice = String(form.get("comparePrice") || "").trim();
      payload.mainImage = String(form.get("mainImage") || "").trim();
      payload.cardImage = String(form.get("cardImage") || "").trim();
      payload.stock = Number(String(form.get("stock") || "0").trim() || 0);
      payload.category = String(form.get("category") || "").trim();
      payload.isFeatured = String(form.get("isFeatured") || "false") === "true";
      payload.buyLink = String(form.get("buyLink") || "").trim();
      payload.amazonLink = String(form.get("amazonLink") || "").trim();
      payload.flipkartLink = String(form.get("flipkartLink") || "").trim();
      payload.meeshoLink = String(form.get("meeshoLink") || "").trim();

      const parseList = (value: FormDataEntryValue | null) => {
        const raw = String(value || "").trim();
        if (!raw) return [];
        try {
          const parsed = JSON.parse(raw);
          return Array.isArray(parsed) ? parsed.map((item) => String(item || "").trim()).filter(Boolean) : [];
        } catch {
          return raw.split(/\r?\n|,/g).map((item) => item.trim()).filter(Boolean);
        }
      };

      payload.galleryImages = parseList(form.get("galleryImages"));
      payload.ingredients = parseList(form.get("ingredients"));
      payload.benefits = parseList(form.get("benefits"));

      if (imageFile && imageFile instanceof File) {
        const ext = path.extname(imageFile.name || ".png").toLowerCase() || ".png";
        const safeName = String(payload.name || "product")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        const fileName = `${safeName}-${Date.now()}${ext}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, fileName);
        const bytes = Buffer.from(await imageFile.arrayBuffer());
        await writeFile(filePath, bytes);
        payload.mainImage = `/uploads/${fileName}`;
      }

      if (cardImageFile && cardImageFile instanceof File) {
        const cardExt = path.extname(cardImageFile.name || ".png").toLowerCase() || ".png";
        const safeName = String(payload.name || "product")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        const cardFileName = `${safeName}-card-${Date.now()}${cardExt}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });
        const cardFilePath = path.join(uploadDir, cardFileName);
        const cardBytes = Buffer.from(await cardImageFile.arrayBuffer());
        await writeFile(cardFilePath, cardBytes);
        payload.cardImage = `/uploads/${cardFileName}`;
      }

      if (!String(payload.cardImage || "").trim()) {
        payload.cardImage = String(payload.mainImage || "").trim();
      }
    } else {
      const body = await request.json();
      payload.name = String(body.name || "").trim();
      payload.slug = String(body.slug || "").trim();
      payload.tagline = String(body.tagline || "").trim();
      payload.headline = String(body.headline || "").trim();
      payload.shortDescription = String(body.shortDescription || "").trim();
      payload.fullDescription = String(body.fullDescription || "").trim();
      payload.price = String(body.price || "").trim();
      payload.comparePrice = String(body.comparePrice || "").trim();
      payload.mainImage = String(body.mainImage || "").trim();
      payload.cardImage = String(body.cardImage || "").trim();
      payload.galleryImages = Array.isArray(body.galleryImages)
        ? body.galleryImages.map((item: unknown) => String(item || "").trim()).filter(Boolean)
        : [];
      payload.ingredients = Array.isArray(body.ingredients)
        ? body.ingredients.map((item: unknown) => String(item || "").trim()).filter(Boolean)
        : [];
      payload.benefits = Array.isArray(body.benefits)
        ? body.benefits.map((item: unknown) => String(item || "").trim()).filter(Boolean)
        : [];
      payload.stock = Number.isFinite(Number(body.stock)) ? Number(body.stock) : 0;
      payload.category = String(body.category || "").trim();
      payload.isFeatured = Boolean(body.isFeatured);
      payload.buyLink = String(body.buyLink || "").trim();
      payload.amazonLink = String(body.amazonLink || "").trim();
      payload.flipkartLink = String(body.flipkartLink || "").trim();
      payload.meeshoLink = String(body.meeshoLink || "").trim();
      if (!String(payload.cardImage || "").trim()) {
        payload.cardImage = payload.mainImage;
      }
    }

    if (
      !String(payload.name || "").trim() ||
      !String(payload.shortDescription || "").trim() ||
      !String(payload.fullDescription || "").trim() ||
      !String(payload.price || "").trim() ||
      !String(payload.mainImage || "").trim()
    ) {
      return NextResponse.json({ message: "Required fields missing" }, { status: 400 });
    }

    await updateAdminProduct(params.id, payload as any);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PUT /api/admin/products/[id] error:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await deleteAdminProduct(params.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/admin/products/[id] error:", error);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
