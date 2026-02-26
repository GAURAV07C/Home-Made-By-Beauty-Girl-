import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  details: text("details").notNull(),
  price: text("price").notNull(),
  image: text("image").notNull(),
  buyLink: text("buy_link").notNull().default(""),
  amazonLink: text("amazon_link").notNull().default(""),
  flipkartLink: text("flipkart_link").notNull().default(""),
  meeshoLink: text("meesho_link").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type ProductRow = typeof products.$inferSelect;
export type NewProductRow = typeof products.$inferInsert;
