import { boolean, integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull().default(""),
  headline: text("headline").notNull().default(""),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  price: text("price").notNull(),
  comparePrice: text("compare_price").notNull().default(""),
  mainImage: text("main_image").notNull(),
  galleryImages: jsonb("gallery_images").$type<string[]>().notNull().default([]),
  ingredients: jsonb("ingredients").$type<string[]>().notNull().default([]),
  benefits: jsonb("benefits").$type<string[]>().notNull().default([]),
  stock: integer("stock").notNull().default(0),
  category: text("category").notNull().default(""),
  isFeatured: boolean("is_featured").notNull().default(false),
  buyLink: text("buy_link").notNull().default(""),
  amazonLink: text("amazon_link").notNull().default(""),
  flipkartLink: text("flipkart_link").notNull().default(""),
  meeshoLink: text("meesho_link").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type ProductRow = typeof products.$inferSelect;
export type NewProductRow = typeof products.$inferInsert;
