"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductForm, type AdminProductFormValues } from "@/components/admin/ProductForm";

function arrayToLines(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value.map((item) => String(item || "").trim()).filter(Boolean).join("\n");
}

function linesToArray(value: string) {
  return value
    .split(/\r?\n|,/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AdminEditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");
  const [values, setValues] = useState<AdminProductFormValues | null>(null);

  useEffect(() => {
    async function load() {
      setFetching(true);
      try {
        const response = await fetch(`/api/admin/products/${params.id}`, { cache: "no-store" });
        const data = await response.json();
        if (!response.ok || !data.product) {
          setMessage(data.message || "Product load failed");
          return;
        }

        const product = data.product;
        setValues({
          name: product.name || "",
          slug: product.slug || "",
          tagline: product.tagline || "",
          headline: product.headline || "",
          shortDescription: product.shortDescription || "",
          fullDescription: product.fullDescription || "",
          price: product.price || "",
          comparePrice: product.comparePrice || "",
          stock: String(product.stock ?? 0),
          category: product.category || "",
          isFeatured: Boolean(product.isFeatured),
          ingredients: arrayToLines(product.ingredients),
          benefits: arrayToLines(product.benefits),
          galleryImages: arrayToLines(product.galleryImages),
          buyLink: product.buyLink || "",
          amazonLink: product.amazonLink || "",
          flipkartLink: product.flipkartLink || "",
          meeshoLink: product.meeshoLink || "",
          mainImage: product.mainImage || "",
          cardImage: product.cardImage || product.mainImage || "",
        });
      } catch {
        setMessage("Product load failed");
      } finally {
        setFetching(false);
      }
    }

    load().catch(() => setMessage("Product load failed"));
  }, [params.id]);

  async function onSubmit({
    values: nextValues,
    imageFile,
    cardImageFile,
  }: {
    values: AdminProductFormValues;
    imageFile: File | null;
    cardImageFile: File | null;
  }) {
    setLoading(true);
    setMessage("");
    try {
      if (imageFile || cardImageFile) {
        const formData = new FormData();
        formData.set("name", nextValues.name);
        formData.set("slug", nextValues.slug);
        formData.set("tagline", nextValues.tagline);
        formData.set("headline", nextValues.headline);
        formData.set("shortDescription", nextValues.shortDescription);
        formData.set("fullDescription", nextValues.fullDescription);
        formData.set("price", nextValues.price);
        formData.set("comparePrice", nextValues.comparePrice);
        formData.set("stock", nextValues.stock);
        formData.set("category", nextValues.category);
        formData.set("isFeatured", String(nextValues.isFeatured));
        formData.set("ingredients", JSON.stringify(linesToArray(nextValues.ingredients)));
        formData.set("benefits", JSON.stringify(linesToArray(nextValues.benefits)));
        formData.set("galleryImages", JSON.stringify(linesToArray(nextValues.galleryImages)));
        formData.set("buyLink", nextValues.buyLink);
        formData.set("amazonLink", nextValues.amazonLink);
        formData.set("flipkartLink", nextValues.flipkartLink);
        formData.set("meeshoLink", nextValues.meeshoLink);
        formData.set("mainImage", nextValues.mainImage);
        formData.set("cardImage", nextValues.cardImage);
        if (imageFile) formData.set("imageFile", imageFile);
        if (cardImageFile) formData.set("cardImageFile", cardImageFile);

        const response = await fetch(`/api/admin/products/${params.id}`, {
          method: "PUT",
          body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
          setMessage(data.message || "Update failed");
          return;
        }
      } else {
        const response = await fetch(`/api/admin/products/${params.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...nextValues,
            stock: Number(nextValues.stock || 0),
            ingredients: linesToArray(nextValues.ingredients),
            benefits: linesToArray(nextValues.benefits),
            galleryImages: linesToArray(nextValues.galleryImages),
            cardImage: nextValues.cardImage,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          setMessage(data.message || "Update failed");
          return;
        }
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setMessage("Network issue, dubara try karo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Admin / Products</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-foreground">Edit Product</h1>
        </div>
        <Link href="/admin/products" className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground">
          Back
        </Link>
      </div>

      {message ? <p className="mb-4 text-sm text-red-600">{message}</p> : null}

      {fetching || !values ? (
        <div className="rounded-2xl border border-border/60 bg-white p-6 text-foreground/70">Loading product...</div>
      ) : (
        <ProductForm
          mode="edit"
          initialValues={values}
          loading={loading}
          onSubmit={onSubmit}
          submitLabel="Update Product"
        />
      )}
    </div>
  );
}
