import { Instagram, Facebook, Youtube, Mail, Phone } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

export function HomeFooter() {
  return (
    <footer className="border-t border-border/60 bg-white py-12">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <BrandLogo  className="origin-left" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Premium single-product skincare brand focused on glow, hydration, and gentle daily cleansing.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Navigation</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#hero" className="hover:text-primary">Home</a></li>
            <li><a href="#product" className="hover:text-primary">Product</a></li>
            <li><a href="#ingredients" className="hover:text-primary">Ingredients</a></li>
            <li><a href="#faq" className="hover:text-primary">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              support@beautygirlsoap.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              +91 98765 43210
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Social</h3>
          <div className="mt-4 flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full border border-border p-2 text-foreground/75 transition-colors hover:text-primary">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="rounded-full border border-border p-2 text-foreground/75 transition-colors hover:text-primary">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="rounded-full border border-border p-2 text-foreground/75 transition-colors hover:text-primary">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-7xl border-t border-border/60 px-4 pt-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <p>Copyright 2026 Home Made by Beauty Girl. All rights reserved.</p>
      </div>
    </footer>
  );
}
