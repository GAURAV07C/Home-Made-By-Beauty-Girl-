"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductForm, emptyAdminProductForm, type AdminProductFormValues } from "@/components/admin/ProductForm";

function linesToArray(value: string) {
  return value
    .split(/\r?\n|,/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseFaqBlocks(value: string) {
  return value
    .split(/\r?\n\s*\r?\n/g)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split(/\r?\n/g).map((line) => line.trim()).filter(Boolean);
      const question = lines[0] || "";
      const answer = lines.slice(1).join(" ");
      return { question, answer };
    })
    .filter((item) => item.question && item.answer);
}

export default function AdminCreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit({
    values,
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
      const formData = new FormData();
      formData.set("name", values.name);
      formData.set("slug", values.slug);
      formData.set("tagline", values.tagline);
      formData.set("headline", values.headline);
      formData.set("shortDescription", values.shortDescription);
      formData.set("fullDescription", values.fullDescription);
      formData.set("price", values.price);
      formData.set("comparePrice", values.comparePrice);
      formData.set("stock", values.stock);
      formData.set("category", values.category);
      formData.set("isFeatured", String(values.isFeatured));
      formData.set("ingredients", JSON.stringify(linesToArray(values.ingredients)));
      formData.set("benefits", JSON.stringify(linesToArray(values.benefits)));
      formData.set("faqs", JSON.stringify(parseFaqBlocks(values.faqs)));
      formData.set("galleryImages", JSON.stringify(linesToArray(values.galleryImages)));
      formData.set("buyLink", values.buyLink);
      formData.set("amazonLink", values.amazonLink);
      formData.set("flipkartLink", values.flipkartLink);
      formData.set("meeshoLink", values.meeshoLink);
      formData.set("cardImage", values.cardImage);
      if (imageFile) formData.set("imageFile", imageFile);
      if (cardImageFile) formData.set("cardImageFile", cardImageFile);

      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || "Create failed");
        return;
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
          <h1 className="mt-2 font-display text-4xl font-bold text-foreground">Create Product</h1>
        </div>
        <Link href="/admin/products" className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground">
          Back
        </Link>
      </div>

      {message ? <p className="mb-4 text-sm text-red-600">{message}</p> : null}

      <ProductForm
        mode="create"
        initialValues={emptyAdminProductForm}
        loading={loading}
        onSubmit={onSubmit}
        submitLabel="Create Product"
      />
    </div>
  );
}
