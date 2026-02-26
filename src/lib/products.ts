import { and, desc, eq, ne } from "drizzle-orm";
import { db, ensureProductsTable } from "@/db";
import { products, type NewProductRow, type ProductRow } from "@/db/schema";
import type { HomeCardProduct } from "@/lib/product-types";

export interface ProductDetailData {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  headline: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  comparePrice: string;
  mainImage: string;
  galleryImages: string[];
  ingredients: string[];
  benefits: string[];
  stock: number;
  category: string;
  isFeatured: boolean;
  buyLink: string;
  amazonLink: string;
  flipkartLink: string;
  meeshoLink: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateInput {
  name: string;
  slug?: string;
  tagline: string;
  headline: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  comparePrice?: string;
  mainImage: string;
  galleryImages?: string[];
  ingredients?: string[];
  benefits?: string[];
  stock?: number;
  category?: string;
  isFeatured?: boolean;
  buyLink?: string;
  amazonLink?: string;
  flipkartLink?: string;
  meeshoLink?: string;
}

export const staticSoapCard: HomeCardProduct = {
  id: "soap",
  slug: "soap",
  title: "Glow Soap",
  description: "Our active signature cleanser for daily glow, smooth texture, and gentle skin comfort.",
  category: "soap",
  price: "Rs. 499",
  imageSrc: "/soap.png",
  imageAlt: "Glow Soap product image",
  buyHref: "/soap#buy",
  detailsHref: "/soap",
  isStaticSoap: true,
};

export const comingSoonCard: HomeCardProduct = {
  id: "coming-soon",
  slug: "coming-soon",
  title: "Cream / Serum",
  description: "Next premium skincare category launching soon with the same glow-first quality.",
  category: "coming-soon",
  imageSrc: "/soap.png",
  imageAlt: "Coming soon skincare products",
  buyHref: "#",
  detailsHref: "#",
  isComingSoon: true,
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function makeId(name: string) {
  return `${slugify(name)}-${Date.now()}`;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item || "").trim()).filter(Boolean);
}

function mapRowToDetail(row: ProductRow): ProductDetailData {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    headline: row.headline,
    shortDescription: row.shortDescription,
    fullDescription: row.fullDescription,
    price: row.price,
    comparePrice: row.comparePrice,
    mainImage: row.mainImage,
    galleryImages: toStringArray(row.galleryImages),
    ingredients: toStringArray(row.ingredients),
    benefits: toStringArray(row.benefits),
    stock: row.stock,
    category: row.category,
    isFeatured: row.isFeatured,
    buyLink: row.buyLink,
    amazonLink: row.amazonLink,
    flipkartLink: row.flipkartLink,
    meeshoLink: row.meeshoLink,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function pickBuyLink(input: ProductCreateInput) {
  return input.buyLink || input.amazonLink || input.flipkartLink || input.meeshoLink || "";
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let candidate = baseSlug || `product-${Date.now()}`;
  let attempt = 0;

  while (attempt < 50) {
    const [existing] = await db
      .select({ id: products.id })
      .from(products)
      .where(
        excludeId
          ? and(eq(products.slug, candidate), ne(products.id, excludeId))
          : eq(products.slug, candidate),
      )
      .limit(1);

    if (!existing) return candidate;
    attempt += 1;
    candidate = `${baseSlug}-${attempt + 1}`;
  }

  return `${baseSlug}-${Date.now()}`;
}

export async function listDynamicProductCards(): Promise<HomeCardProduct[]> {
  await ensureProductsTable();
  const rows = await db.select().from(products).orderBy(desc(products.createdAt));

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.name,
    description: row.shortDescription,
    category: row.category,
    price: row.price,
    imageSrc: row.mainImage,
    imageAlt: `${row.name} image`,
    buyHref: `/products/${row.slug}#buy`,
    detailsHref: `/products/${row.slug}`,
  }));
}

export async function listAllCardsForHome(): Promise<HomeCardProduct[]> {
  const dynamicCards = await listDynamicProductCards();
  return dynamicCards.length > 0 ? [staticSoapCard, ...dynamicCards] : [staticSoapCard, comingSoonCard];
}

export async function listAdminProducts() {
  await ensureProductsTable();
  const rows = await db.select().from(products).orderBy(desc(products.createdAt));
  return rows.map(mapRowToDetail);
}

export async function getDynamicProductBySlug(slug: string): Promise<ProductDetailData | null> {
  await ensureProductsTable();
  const [row] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return row ? mapRowToDetail(row) : null;
}

export async function getDynamicProductById(id: string): Promise<ProductDetailData | null> {
  await ensureProductsTable();
  const [row] = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return row ? mapRowToDetail(row) : null;
}

export async function createAdminProduct(input: ProductCreateInput) {
  await ensureProductsTable();
  const baseSlug = slugify(input.slug || input.name);
  const uniqueSlug = await ensureUniqueSlug(baseSlug);
  const now = new Date();

  const row: NewProductRow = {
    id: makeId(input.name),
    slug: uniqueSlug,
    name: input.name,
    tagline: input.tagline,
    headline: input.headline,
    shortDescription: input.shortDescription,
    fullDescription: input.fullDescription,
    price: input.price,
    comparePrice: input.comparePrice || "",
    mainImage: input.mainImage,
    galleryImages: input.galleryImages || [],
    ingredients: input.ingredients || [],
    benefits: input.benefits || [],
    stock: input.stock ?? 0,
    category: input.category || "",
    isFeatured: input.isFeatured ?? false,
    buyLink: pickBuyLink(input),
    amazonLink: input.amazonLink || "",
    flipkartLink: input.flipkartLink || "",
    meeshoLink: input.meeshoLink || "",
    createdAt: now,
    updatedAt: now,
  };

  await db.insert(products).values(row);
  return mapRowToDetail(row as ProductRow);
}

export async function updateAdminProduct(id: string, input: Partial<ProductCreateInput>) {
  await ensureProductsTable();

  const payload: Partial<NewProductRow> = {
    updatedAt: new Date(),
  };

  if (typeof input.name === "string") payload.name = input.name;
  if (typeof input.tagline === "string") payload.tagline = input.tagline;
  if (typeof input.headline === "string") payload.headline = input.headline;
  if (typeof input.shortDescription === "string") payload.shortDescription = input.shortDescription;
  if (typeof input.fullDescription === "string") payload.fullDescription = input.fullDescription;
  if (typeof input.price === "string") payload.price = input.price;
  if (typeof input.comparePrice === "string") payload.comparePrice = input.comparePrice;
  if (typeof input.mainImage === "string") payload.mainImage = input.mainImage;
  if (Array.isArray(input.galleryImages)) payload.galleryImages = input.galleryImages;
  if (Array.isArray(input.ingredients)) payload.ingredients = input.ingredients;
  if (Array.isArray(input.benefits)) payload.benefits = input.benefits;
  if (typeof input.stock === "number") payload.stock = input.stock;
  if (typeof input.category === "string") payload.category = input.category;
  if (typeof input.isFeatured === "boolean") payload.isFeatured = input.isFeatured;
  if (typeof input.amazonLink === "string") payload.amazonLink = input.amazonLink;
  if (typeof input.flipkartLink === "string") payload.flipkartLink = input.flipkartLink;
  if (typeof input.meeshoLink === "string") payload.meeshoLink = input.meeshoLink;
  if (typeof input.buyLink === "string") payload.buyLink = input.buyLink;

  const nextName = input.name;
  const nextSlugInput = input.slug;
  if (nextSlugInput || nextName) {
    const baseSlug = slugify(nextSlugInput || nextName || "");
    payload.slug = await ensureUniqueSlug(baseSlug, id);
  }

  const nextBuyLink = payload.buyLink || payload.amazonLink || payload.flipkartLink || payload.meeshoLink;
  if (nextBuyLink) payload.buyLink = nextBuyLink;

  await db.update(products).set(payload).where(eq(products.id, id));
}

export async function deleteAdminProduct(id: string) {
  await ensureProductsTable();
  await db.delete(products).where(eq(products.id, id));
}
