"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      const next = searchParams.get("next") || "/admin/products";
      router.push(next);
      router.refresh();
    } catch {
      setMessage("Network issue, dubara try karo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-12 sm:px-6">
      <div className="w-full rounded-2xl border border-border/60 bg-white p-6 shadow-xl shadow-amber-100/30 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Admin</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-foreground">Login</h1>
        <p className="mt-2 text-sm text-foreground/70">Authorized admin credentials se login karein.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-foreground">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-primary/40 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-foreground">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-primary/40 focus:outline-none"
            />
          </label>

          {message ? <p className="text-sm text-red-600">{message}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-emerald-600 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
