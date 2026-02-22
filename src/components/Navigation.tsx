import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { BrandLogo } from "./BrandLogo";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#hero", label: "Home" },
    { href: "#ingredients", label: "Ingredients" },
    { href: "#products", label: "Products" },
    { href: "#benefits", label: "Benefits" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border/50" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <BrandLogo variant="full" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group"
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            <a 
              href="#buy"
              className="relative overflow-hidden flex items-center gap-2 bg-gradient-to-r from-primary via-emerald-500 to-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300 animate-gradient"
              data-testid="button-shop-now"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Now</span>
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button 
                  className="p-2 text-foreground/80 hover:text-primary transition-colors"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="bg-background/98 backdrop-blur-2xl border-l border-border/30 w-[85vw] sm:w-[350px]"
              >
                <div className="flex flex-col h-full pt-8">
                  <BrandLogo variant="full" className="mb-10" />
                  
                  <div className="flex flex-col gap-4">
                    {links.map((link, index) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-2xl font-display font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/30"
                        data-testid={`link-mobile-${link.label.toLowerCase()}`}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </div>

                  <div className="mt-auto pb-8">
                    <a 
                      href="#buy"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground px-6 py-4 rounded-2xl font-medium text-lg shadow-xl shadow-primary/20"
                      data-testid="button-mobile-shop"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Shop Collection</span>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
