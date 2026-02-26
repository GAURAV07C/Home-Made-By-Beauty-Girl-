import { desc, eq } from "drizzle-orm";
import { db, ensureProductsTable } from "@/db";
import { products, type NewProductRow } from "@/db/schema";
import type { HomeCardProduct } from "@/lib/product-types";

export interface ProductDetailData {
  id: string;
  name: string;
  description: string;
  details: string;
  price: string;
  image: string;
  amazonLink: string;
  flipkartLink: string;
  meeshoLink: string;
}

export const staticSoapCard: HomeCardProduct = {
  id: "soap",
  title: "Glow Soap",
  description: "Our active signature cleanser for daily glow, smooth texture, and gentle skin comfort.",
  imageSrc: "/soap.png",
  imageAlt: "Glow Soap product image",
  buyHref: "/soap#buy",
  detailsHref: "/soap",
  isStaticSoap: true,
};

function makeId(name: string) {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug}-${Date.now()}`;
}

export async function listAdminProductsForCards(): Promise<HomeCardProduct[]> {
  await ensureProductsTable();
  const rows = await db.select().from(products).orderBy(desc(products.createdAt));

  return rows.map((row) => ({
    id: row.id,
    title: row.name,
    description: row.description,
    imageSrc: row.image,
    imageAlt: `${row.name} image`,
    buyHref: `/product/${row.id}#buy`,
    detailsHref: `/product/${row.id}`,
  }));
}

export async function listAllCardsForHome(): Promise<HomeCardProduct[]> {
  const adminCards = await listAdminProductsForCards();
  return [staticSoapCard, ...adminCards];
}

export async function createAdminProduct(input: Omit<NewProductRow, "id" | "createdAt">) {
  await ensureProductsTable();
  const row: NewProductRow = {
    id: makeId(input.name),
    ...input,
  };

  await db.insert(products).values(row);
  return row;
}

export async function listAdminProducts() {
  await ensureProductsTable();
  return db.select().from(products).orderBy(desc(products.createdAt));
}

export async function updateAdminProduct(
  id: string,
  input: Partial<Omit<NewProductRow, "id" | "createdAt">>,
) {
  await ensureProductsTable();
  await db.update(products).set(input).where(eq(products.id, id));
}

export async function deleteAdminProduct(id: string) {
  await ensureProductsTable();
  await db.delete(products).where(eq(products.id, id));
}

export async function getDynamicProductById(id: string): Promise<ProductDetailData | null> {
  await ensureProductsTable();
  const [row] = await db.select().from(products).where(eq(products.id, id)).limit(1);
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    details: row.details,
    price: row.price,
    image: row.image,
    amazonLink: row.amazonLink,
    flipkartLink: row.flipkartLink,
    meeshoLink: row.meeshoLink,
  };
}
