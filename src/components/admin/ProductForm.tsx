"use client";

import { FormEvent, useMemo, useState } from "react";

export interface AdminProductFormValues {
  name: string;
  slug: string;
  tagline: string;
  headline: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  comparePrice: string;
  stock: string;
  category: string;
  isFeatured: boolean;
  ingredients: string;
  benefits: string;
  galleryImages: string;
  buyLink: string;
  amazonLink: string;
  flipkartLink: string;
  meeshoLink: string;
  mainImage: string;
  cardImage: string;
}

export const emptyAdminProductForm: AdminProductFormValues = {
  name: "",
  slug: "",
  tagline: "",
  headline: "",
  shortDescription: "",
  fullDescription: "",
  price: "",
  comparePrice: "",
  stock: "0",
  category: "skincare",
  isFeatured: false,
  ingredients: "Vitamin C\nNiacinamide\nHyaluronic Acid\nBotanical Extract Blend",
  benefits: "Deep cleansing without drying your skin\nInstant brightness and natural radiance\nSoft, supple skin texture from first use\nNatural, soothing fragrance",
  galleryImages: "",
  buyLink: "",
  amazonLink: "",
  flipkartLink: "",
  meeshoLink: "",
  mainImage: "",
  cardImage: "",
};

interface ProductFormProps {
  mode: "create" | "edit";
  initialValues?: AdminProductFormValues;
  loading?: boolean;
  onSubmit: (payload: { values: AdminProductFormValues; imageFile: File | null; cardImageFile: File | null }) => Promise<void>;
  submitLabel: string;
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-primary/40 focus:outline-none"
      />
    </label>
  );
}

export function ProductForm({ mode, initialValues, loading = false, onSubmit, submitLabel }: ProductFormProps) {
  const [values, setValues] = useState<AdminProductFormValues>(initialValues || emptyAdminProductForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cardImageFile, setCardImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const previewImage = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    return values.mainImage || "/soap.png";
  }, [imageFile, values.mainImage]);

  const cardPreviewImage = useMemo(() => {
    if (cardImageFile) return URL.createObjectURL(cardImageFile);
    return values.cardImage || values.mainImage || "/soap.png";
  }, [cardImageFile, values.cardImage, values.mainImage]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!values.name || !values.shortDescription || !values.fullDescription || !values.price) {
      setError("Name, short description, full description aur price required hai.");
      return;
    }

    if (mode === "create" && !imageFile) {
      setError("Create ke time image upload required hai.");
      return;
    }

    await onSubmit({ values, imageFile, cardImageFile });
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Product Name" value={values.name} onChange={(v) => setValues((s) => ({ ...s, name: v }))} />
          <Input label="Slug" value={values.slug} onChange={(v) => setValues((s) => ({ ...s, slug: v }))} placeholder="auto if empty" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Tagline" value={values.tagline} onChange={(v) => setValues((s) => ({ ...s, tagline: v }))} />
          <Input label="Headline" value={values.headline} onChange={(v) => setValues((s) => ({ ...s, headline: v }))} />
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-foreground">Short Description</span>
          <textarea
            rows={3}
            value={values.shortDescription}
            onChange={(e) => setValues((s) => ({ ...s, shortDescription: e.target.value }))}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-primary/40 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-foreground">Full Description</span>
          <textarea
            rows={5}
            value={values.fullDescription}
            onChange={(e) => setValues((s) => ({ ...s, fullDescription: e.target.value }))}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-primary/40 focus:outline-none"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="Price" value={values.price} onChange={(v) => setValues((s) => ({ ...s, price: v }))} />
          <Input label="Compare Price" value={values.comparePrice} onChange={(v) => setValues((s) => ({ ...s, comparePrice: v }))} />
          <Input label="Stock" type="number" value={values.stock} onChange={(v) => setValues((s) => ({ ...s, stock: v }))} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Category" value={values.category} onChange={(v) => setValues((s) => ({ ...s, category: v }))} />
          <label className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3">
            <input
              type="checkbox"
              checked={values.isFeatured}
              onChange={(e) => setValues((s) => ({ ...s, isFeatured: e.target.checked }))}
            />
            <span className="text-sm font-semibold text-foreground">Featured Product</span>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-foreground">Ingredients (one per line)</span>
          <textarea
            rows={4}
            value={values.ingredients}
            onChange={(e) => setValues((s) => ({ ...s, ingredients: e.target.value }))}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-primary/40 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-foreground">Benefits (one per line)</span>
          <textarea
            rows={4}
            value={values.benefits}
            onChange={(e) => setValues((s) => ({ ...s, benefits: e.target.value }))}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-primary/40 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-foreground">Gallery Images (one URL/path per line)</span>
          <textarea
            rows={3}
            value={values.galleryImages}
            onChange={(e) => setValues((s) => ({ ...s, galleryImages: e.target.value }))}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-primary/40 focus:outline-none"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Buy Link (optional)" value={values.buyLink} onChange={(v) => setValues((s) => ({ ...s, buyLink: v }))} />
          <Input label="Amazon Link" value={values.amazonLink} onChange={(v) => setValues((s) => ({ ...s, amazonLink: v }))} />
          <Input label="Flipkart Link" value={values.flipkartLink} onChange={(v) => setValues((s) => ({ ...s, flipkartLink: v }))} />
          <Input label="Meesho Link" value={values.meeshoLink} onChange={(v) => setValues((s) => ({ ...s, meeshoLink: v }))} />
        </div>

        {mode === "edit" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Main Image Path (e.g. /uploads/file.png)"
              value={values.mainImage}
              onChange={(v) => setValues((s) => ({ ...s, mainImage: v }))}
            />
            <Input
              label="Card Image Path (e.g. /uploads/file.png)"
              value={values.cardImage}
              onChange={(v) => setValues((s) => ({ ...s, cardImage: v }))}
            />
          </div>
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-foreground">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-foreground">Upload Card Image (optional)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCardImageFile(e.target.files?.[0] || null)}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground"
          />
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-emerald-600 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>

      <aside className="rounded-2xl border border-border/70 bg-white p-4 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Live Preview</p>
        <img src={previewImage} alt="preview" className="mt-4 aspect-[4/5] w-full rounded-xl object-cover" />
        <img src={cardPreviewImage} alt="card preview" className="mt-4 aspect-[5/4] w-full rounded-xl object-cover" />
        <h3 className="mt-4 font-display text-2xl font-bold text-foreground">{values.name || "Product Name"}</h3>
        <p className="mt-2 text-sm text-foreground/70">{values.shortDescription || "Short description preview"}</p>
        <p className="mt-3 text-lg font-semibold text-foreground">{values.price || "Rs. 0"}</p>
      </aside>
    </form>
  );
}
