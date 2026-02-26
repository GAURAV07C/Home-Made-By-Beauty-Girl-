import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const globalForDb = globalThis as unknown as {
  pool?: Pool;
  ensured?: boolean;
};

const pool =
  globalForDb.pool ??
  new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

if (!globalForDb.pool) {
  globalForDb.pool = pool;
}

export const db = drizzle(pool);

export async function ensureProductsTable() {
  if (globalForDb.ensured) return;

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS products (
      id text PRIMARY KEY,
      name text NOT NULL,
      description text NOT NULL,
      details text NOT NULL,
      price text NOT NULL,
      image text NOT NULL,
      buy_link text NOT NULL DEFAULT '',
      amazon_link text NOT NULL DEFAULT '',
      flipkart_link text NOT NULL DEFAULT '',
      meesho_link text NOT NULL DEFAULT '',
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `);

  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS buy_link text NOT NULL DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN buy_link SET DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS amazon_link text NOT NULL DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS flipkart_link text NOT NULL DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS meesho_link text NOT NULL DEFAULT '';`);

  globalForDb.ensured = true;
}
