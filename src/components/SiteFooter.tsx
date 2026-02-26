import Link from "next/link";
import { Instagram, Facebook, Youtube, Mail, Phone } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-white py-12">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <BrandLogo variant="compact" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Clean beauty products crafted for glow-focused daily skincare.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/soap" className="hover:text-primary">
                Soap
              </Link>
            </li>
            <li>
              <Link href="/soap#buy" className="hover:text-primary">
                Buy Now
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
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
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2 text-foreground/75 hover:text-primary" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2 text-foreground/75 hover:text-primary" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2 text-foreground/75 hover:text-primary" aria-label="YouTube">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
