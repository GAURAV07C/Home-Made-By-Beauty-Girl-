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
      slug text NOT NULL,
      name text NOT NULL,
      tagline text NOT NULL DEFAULT '',
      headline text NOT NULL DEFAULT '',
      short_description text NOT NULL DEFAULT '',
      full_description text NOT NULL DEFAULT '',
      price text NOT NULL,
      compare_price text NOT NULL DEFAULT '',
      main_image text NOT NULL DEFAULT '',
      card_image text NOT NULL DEFAULT '',
      gallery_images jsonb NOT NULL DEFAULT '[]'::jsonb,
      ingredients jsonb NOT NULL DEFAULT '[]'::jsonb,
      benefits jsonb NOT NULL DEFAULT '[]'::jsonb,
      stock integer NOT NULL DEFAULT 0,
      category text NOT NULL DEFAULT '',
      is_featured boolean NOT NULL DEFAULT false,
      buy_link text NOT NULL DEFAULT '',
      amazon_link text NOT NULL DEFAULT '',
      flipkart_link text NOT NULL DEFAULT '',
      meesho_link text NOT NULL DEFAULT '',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );
  `);

  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS slug text;`);
  await db.execute(sql`UPDATE products SET slug = id WHERE slug IS NULL OR slug = '';`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN slug SET NOT NULL;`);
  await db.execute(sql`DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'products_slug_idx') THEN
      CREATE UNIQUE INDEX products_slug_idx ON products (slug);
    END IF;
  END $$;`);

  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS tagline text NOT NULL DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS headline text NOT NULL DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS short_description text;`);
  await db.execute(sql`DO $$ BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'description'
    ) THEN
      EXECUTE 'UPDATE products SET short_description = COALESCE(short_description, description, '''') WHERE short_description IS NULL';
    ELSE
      EXECUTE 'UPDATE products SET short_description = COALESCE(short_description, '''') WHERE short_description IS NULL';
    END IF;
  END $$;`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN short_description SET NOT NULL;`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN short_description SET DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS full_description text;`);
  await db.execute(sql`DO $$ BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'details'
    ) THEN
      EXECUTE 'UPDATE products SET full_description = COALESCE(full_description, details, '''') WHERE full_description IS NULL';
    ELSE
      EXECUTE 'UPDATE products SET full_description = COALESCE(full_description, '''') WHERE full_description IS NULL';
    END IF;
  END $$;`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN full_description SET NOT NULL;`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN full_description SET DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS compare_price text NOT NULL DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS main_image text;`);
  await db.execute(sql`DO $$ BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'products' AND column_name = 'image'
    ) THEN
      EXECUTE 'UPDATE products SET main_image = COALESCE(main_image, image, '''') WHERE main_image IS NULL';
    ELSE
      EXECUTE 'UPDATE products SET main_image = COALESCE(main_image, '''') WHERE main_image IS NULL';
    END IF;
  END $$;`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN main_image SET NOT NULL;`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN main_image SET DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS card_image text;`);
  await db.execute(sql`UPDATE products SET card_image = COALESCE(NULLIF(card_image, ''), main_image, '') WHERE card_image IS NULL OR card_image = '';`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN card_image SET NOT NULL;`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN card_image SET DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery_images jsonb NOT NULL DEFAULT '[]'::jsonb;`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS ingredients jsonb NOT NULL DEFAULT '[]'::jsonb;`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS benefits jsonb NOT NULL DEFAULT '[]'::jsonb;`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS stock integer NOT NULL DEFAULT 0;`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS buy_link text NOT NULL DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ALTER COLUMN buy_link SET DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS amazon_link text NOT NULL DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS flipkart_link text NOT NULL DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS meesho_link text NOT NULL DEFAULT '';`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();`);
  await db.execute(sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();`);

  globalForDb.ensured = true;
}
