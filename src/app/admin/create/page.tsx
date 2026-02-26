"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Crown, Gem, Leaf, Shield, ShoppingCart, Sparkles, Star } from "lucide-react";

const initialForm = {
  name: "",
  description: "",
  details: "",
  price: "",
  amazonLink: "",
  flipkartLink: "",
  meeshoLink: "",
};

export default function AdminCreatePage() {
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const previewImage = useMemo(() => (file ? URL.createObjectURL(file) : "/soap.png"), [file]);

  useEffect(() => {
    return () => {
      if (previewImage.startsWith("blob:")) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!file) {
      setMessage("Image upload karna zaroori hai.");
      setLoading(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.set("name", form.name);
      fd.set("description", form.description);
      fd.set("details", form.details);
      fd.set("price", form.price);
      fd.set("amazonLink", form.amazonLink);
      fd.set("flipkartLink", form.flipkartLink);
      fd.set("meeshoLink", form.meeshoLink);
      fd.set("imageFile", file);

      const res = await fetch("/api/admin/products", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Create failed");
        return;
      }

      setMessage("Product create ho gaya. Dashboard me dekh lo.");
      setForm(initialForm);
      setFile(null);
    } catch {
      setMessage("Network issue, dubara try karo.");
    } finally {
      setLoading(false);
    }
  }

  const ingredients = ["Vitamin C", "Niacinamide", "Hyaluronic Acid", "Botanical Extract Blend"];
  const featurePoints = [
    "Deep cleansing without drying your skin",
    "Instant brightness and natural radiance",
    "Soft, supple skin texture from first use",
    "Natural, soothing fragrance",
  ];

  return (
    <form onSubmit={onSubmit} className="min-h-screen bg-background overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Admin / Create</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-foreground">Same UI Product Builder</h1>
          </div>
          <Link href="/admin" className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <section id="hero" className="relative min-h-screen flex flex-col lg:flex-row items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-0 w-[350px] sm:w-[500px] lg:w-[800px] h-[350px] sm:h-[500px] lg:h-[800px] bg-gradient-to-br from-primary/15 via-emerald-400/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] sm:w-[450px] lg:w-[700px] h-[300px] sm:h-[450px] lg:h-[700px] bg-gradient-to-tr from-accent/20 via-yellow-400/15 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full lg:w-1/2 px-4 sm:px-6 lg:px-12 xl:px-20 py-8 lg:py-0">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-emerald-500/10 to-primary/10 border border-primary/20 text-sm font-semibold text-primary">
            <Gem className="w-4 h-4" />
            Dynamic Product Builder
          </span>

          <input
            className="mt-6 w-full rounded-2xl border border-border bg-white/90 px-4 py-3 text-2xl sm:text-3xl font-bold"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          />

          <textarea
            className="mt-4 w-full rounded-xl border border-border bg-white/90 px-4 py-3 text-base"
            rows={2}
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          />

          <textarea
            className="mt-3 w-full rounded-xl border border-border bg-white/90 px-4 py-3 text-sm"
            rows={3}
            placeholder="Long details"
            value={form.details}
            onChange={(e) => setForm((s) => ({ ...s, details: e.target.value }))}
          />

          <input
            className="mt-3 w-full rounded-xl border border-border bg-white/90 px-4 py-3 text-base font-semibold"
            placeholder="Price (e.g. Rs. 999)"
            value={form.price}
            onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
          />

          <div className="mt-7 flex flex-wrap gap-2 sm:gap-3">
            {["Instant Glow", "Premium Quality", "Skin Friendly"].map((benefit) => (
              <span key={benefit} className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full text-xs sm:text-sm border border-border/50">
                <Sparkles className="w-4 h-4 text-accent" />
                {benefit}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-r from-foreground via-gray-800 to-foreground text-background px-8 py-4 rounded-2xl font-semibold disabled:opacity-60"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{loading ? "Creating..." : "Create Product"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a href="#buy" className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold border-2 border-primary/30 text-primary">
              <Leaf className="w-5 h-5" />
              <span>Jump to Buy Links</span>
            </a>
          </div>

          {message ? <p className="mt-3 text-sm text-foreground/80">{message}</p> : null}
        </div>

        <div className="relative w-full lg:w-1/2 h-[45vh] sm:h-[55vh] lg:h-screen">
          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border/50 bg-white/70 shadow-2xl shadow-black/10">
            <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
          </div>
          <div className="absolute top-4 left-4 right-4 rounded-xl bg-white/90 p-3">
            <label className="text-sm font-semibold text-foreground block mb-2">Image Upload</label>
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>
      </section>

      <section id="ingredients" className="py-16 sm:py-24 lg:py-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              Nature's Best
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Premium Ingredients
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {[...ingredients, form.name || "Your Product Name"].slice(0, 5).map((name) => (
              <div key={name} className="rounded-3xl border border-border/60 bg-white p-6 sm:p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-foreground">{name}</h3>
                <p className="mt-2 text-foreground/75">Supports glow, hydration, and smooth skin texture.</p>
              </div>
            ))}
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-foreground via-gray-800 to-foreground text-background flex flex-col justify-center">
              <Shield className="w-12 h-12 sm:w-14 sm:h-14 mb-5 text-accent" />
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-3">100% Quality Focused</h3>
              <p className="text-background/70 text-sm sm:text-base">Carefully made product with premium quality standards.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-secondary/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                <img src={previewImage} alt="Preview 2" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <span className="inline-flex items-center gap-2 text-accent font-semibold tracking-widest text-xs sm:text-sm uppercase mb-3">
                <Crown className="w-4 h-4" />
                Why Choose This Product
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Experience the <span className="bg-gradient-to-r from-accent via-orange-500 to-amber-500 bg-clip-text text-transparent">{form.name || "Your Product"}</span>
              </h2>
              <ul className="space-y-5 mb-10">
                {featurePoints.map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-lg">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-foreground/80">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="buy" className="py-16 sm:py-24 lg:py-32">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-8">
            <input
              className="rounded-xl border border-border px-4 py-3"
              placeholder="Amazon Link"
              value={form.amazonLink}
              onChange={(e) => setForm((s) => ({ ...s, amazonLink: e.target.value }))}
            />
            <input
              className="rounded-xl border border-border px-4 py-3"
              placeholder="Flipkart Link"
              value={form.flipkartLink}
              onChange={(e) => setForm((s) => ({ ...s, flipkartLink: e.target.value }))}
            />
            <input
              className="rounded-xl border border-border px-4 py-3"
              placeholder="Meesho Link"
              value={form.meeshoLink}
              onChange={(e) => setForm((s) => ({ ...s, meeshoLink: e.target.value }))}
            />
          </div>

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent/10 to-orange-500/10 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
            <ShoppingCart className="w-4 h-4 text-accent" />
            Get Yours Today
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Available On Top Platforms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-3xl mx-auto mt-8">
            {[
              { label: "Amazon", href: form.amazonLink, color: "#FF9900" },
              { label: "Flipkart", href: form.flipkartLink, color: "#2874F0" },
              { label: "Meesho", href: form.meeshoLink, color: "#F43397" },
            ].map((platform) => (
              <a
                key={platform.label}
                href={platform.href || "#buy"}
                className={`relative group flex flex-col items-center gap-5 p-8 sm:p-10 rounded-3xl bg-white border-2 border-border/50 shadow-xl transition-all overflow-hidden ${
                  platform.href ? "hover:shadow-2xl" : "opacity-50"
                }`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `${platform.color}20` }}>
                  <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: platform.color }} />
                </div>
                <span className="font-bold text-foreground text-lg">{platform.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </form>
  );
}
