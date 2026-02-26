"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface AdminProduct {
  id: string;
  name: string;
  description: string;
  details: string;
  price: string;
  amazonLink: string;
  flipkartLink: string;
  meeshoLink: string;
  image: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    details: "",
    price: "",
    amazonLink: "",
    flipkartLink: "",
    meeshoLink: "",
  });

  async function loadProducts() {
    const res = await fetch("/api/admin/products", { cache: "no-store" });
    const data = await res.json();
    setProducts(data.products || []);
  }

  useEffect(() => {
    loadProducts().catch(() => setMessage("Products load nahi hue."));
  }, []);

  async function onDelete(id: string) {
    const ok = window.confirm("Delete karna hai?");
    if (!ok) return;

    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setMessage("Delete failed");
      return;
    }
    setMessage("Product delete ho gaya.");
    await loadProducts();
  }

  async function onEditSave(id: string) {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    if (!res.ok) {
      setMessage("Update failed");
      return;
    }
    setMessage("Product update ho gaya.");
    setEditingId(null);
    await loadProducts();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Admin Dashboard</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-foreground">Manage Products</h1>
          <p className="mt-2 text-foreground/75">Yahan aapke create kiye hue products dikhte hain.</p>
        </div>
        <Link
          href="/admin/create"
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-primary/25"
        >
          Create Product
        </Link>
      </div>

      {message ? <p className="mb-4 text-sm text-foreground/80">{message}</p> : null}

      <div className="space-y-3">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-white p-5 text-foreground/75">
            Abhi koi dynamic product nahi hai. "Create Product" se add karo.
          </div>
        ) : (
          products.map((p) => (
            <div key={p.id} className="rounded-2xl border border-border/60 bg-white p-4 sm:p-5">
              {editingId === p.id ? (
                <div className="space-y-3">
                  <input
                    className="w-full rounded-lg border border-border px-3 py-2"
                    value={editForm.name}
                    onChange={(e) => setEditForm((s) => ({ ...s, name: e.target.value }))}
                  />
                  <input
                    className="w-full rounded-lg border border-border px-3 py-2"
                    value={editForm.description}
                    onChange={(e) => setEditForm((s) => ({ ...s, description: e.target.value }))}
                  />
                  <textarea
                    className="w-full rounded-lg border border-border px-3 py-2"
                    rows={3}
                    value={editForm.details}
                    onChange={(e) => setEditForm((s) => ({ ...s, details: e.target.value }))}
                  />
                  <input
                    className="w-full rounded-lg border border-border px-3 py-2"
                    value={editForm.price}
                    onChange={(e) => setEditForm((s) => ({ ...s, price: e.target.value }))}
                  />
                  <input
                    className="w-full rounded-lg border border-border px-3 py-2"
                    value={editForm.amazonLink}
                    onChange={(e) => setEditForm((s) => ({ ...s, amazonLink: e.target.value }))}
                    placeholder="Amazon Link"
                  />
                  <input
                    className="w-full rounded-lg border border-border px-3 py-2"
                    value={editForm.flipkartLink}
                    onChange={(e) => setEditForm((s) => ({ ...s, flipkartLink: e.target.value }))}
                    placeholder="Flipkart Link"
                  />
                  <input
                    className="w-full rounded-lg border border-border px-3 py-2"
                    value={editForm.meeshoLink}
                    onChange={(e) => setEditForm((s) => ({ ...s, meeshoLink: e.target.value }))}
                    placeholder="Meesho Link"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => onEditSave(p.id)} className="rounded-lg bg-primary px-4 py-2 text-white" type="button">
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)} className="rounded-lg border border-border px-4 py-2" type="button">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{p.name}</p>
                    <p className="text-sm text-foreground/70">{p.price}</p>
                    <Link href={`/product/${p.id}`} className="mt-1 inline-block text-sm font-semibold text-primary">
                      Open /product/{p.id}
                    </Link>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(p.id);
                        setEditForm({
                          name: p.name,
                          description: p.description,
                          details: p.details,
                          price: p.price,
                          amazonLink: p.amazonLink,
                          flipkartLink: p.flipkartLink,
                          meeshoLink: p.meeshoLink,
                        });
                      }}
                      className="rounded-lg border border-border px-3 py-1.5 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(p.id)}
                      className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
