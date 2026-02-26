"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface AdminProductRow {
  id: string;
  slug: string;
  name: string;
  price: string;
  stock: number;
  mainImage: string;
  category: string;
  createdAt: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadProducts() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/products", { cache: "no-store" });
      const data = await response.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch {
      setMessage("Products load nahi hue.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts().catch(() => setMessage("Products load nahi hue."));
  }, []);

  async function handleDelete(id: string) {
    const ok = window.confirm("Delete karna hai?");
    if (!ok) return;

    const response = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Delete failed.");
      return;
    }
    await loadProducts();
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Admin Dashboard</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-foreground">Products</h1>
          <p className="mt-2 text-foreground/75">Yahan se create, edit, delete sab manage hoga.</p>
        </div>
        <Link
          href="/admin/products/create"
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-primary/25"
        >
          Create Product
        </Link>
      </div>

      {message ? <p className="mb-4 text-sm text-red-600">{message}</p> : null}

      {loading ? (
        <div className="rounded-2xl border border-border/60 bg-white p-6 text-foreground/70">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-white p-6 text-foreground/70">
          Abhi koi dynamic product nahi hai.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border/60 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border/60 bg-secondary/40">
              <tr>
                <th className="px-4 py-3 font-semibold text-foreground">Product</th>
                <th className="px-4 py-3 font-semibold text-foreground">Price</th>
                <th className="px-4 py-3 font-semibold text-foreground">Stock</th>
                <th className="px-4 py-3 font-semibold text-foreground">Category</th>
                <th className="px-4 py-3 font-semibold text-foreground">Links</th>
                <th className="px-4 py-3 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border/40 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.mainImage} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold text-foreground">{product.name}</p>
                        <p className="text-xs text-foreground/60">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground/80">{product.price}</td>
                  <td className="px-4 py-3 text-foreground/80">{product.stock}</td>
                  <td className="px-4 py-3 text-foreground/80">{product.category || "-"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <Link href={`/products/${product.slug}`} className="text-primary hover:underline">
                        /products/{product.slug}
                      </Link>
                      <Link href={`/products/${product.slug}#buy`} className="text-primary hover:underline">
                        Buy Link
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/products/edit/${product.id}`} className="rounded-lg border border-border px-3 py-1.5">
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="rounded-lg border border-red-300 px-3 py-1.5 text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
