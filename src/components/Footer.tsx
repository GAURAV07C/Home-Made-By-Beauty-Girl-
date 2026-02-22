import { Instagram, Facebook, Youtube, Heart } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-background via-secondary/20 to-secondary/40 pt-16 sm:pt-20 pb-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLogo variant="full" className="mb-6" />
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xs">
              Handcrafted with love using nature's finest ingredients. 
              Pure, natural, and chemical-free skincare for your radiant glow.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 sm:mb-6 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">Quick Links</h4>
            <ul className="space-y-3 text-muted-foreground text-sm sm:text-base">
              <li><a href="#hero" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#ingredients" className="hover:text-primary transition-colors">Ingredients</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Our Products</a></li>
              <li><a href="#benefits" className="hover:text-primary transition-colors">Benefits</a></li>
            </ul>
          </div>
          
          {/* Shop */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 sm:mb-6 bg-gradient-to-r from-accent to-orange-500 bg-clip-text text-transparent">Shop On</h4>
            <ul className="space-y-3 text-muted-foreground text-sm sm:text-base">
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">Amazon</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">Flipkart</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">Meesho</a></li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Connect With Us</h4>
            <div className="flex gap-3 mb-6">
              <a 
                href="#" 
                className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-1"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1"
                data-testid="link-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl text-white hover:shadow-lg hover:shadow-red-500/30 transition-all hover:-translate-y-1"
                data-testid="link-youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Follow us for skincare tips and new launches.
            </p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="text-center sm:text-left">
            © 2024 <span className="font-medium text-foreground">Home Made by Beauty Girl</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
