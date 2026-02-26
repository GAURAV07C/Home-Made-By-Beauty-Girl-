CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"details" text NOT NULL,
	"price" text NOT NULL,
	"image" text NOT NULL,
	"buy_link" text DEFAULT '' NOT NULL,
	"amazon_link" text DEFAULT '' NOT NULL,
	"flipkart_link" text DEFAULT '' NOT NULL,
	"meesho_link" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
