import { motion } from "framer-motion";

interface BrandLogoProps {
  variant?: "full" | "compact" | "hero";
  className?: string;
}

export function BrandLogo({ variant = "full", className = "" }: BrandLogoProps) {
  if (variant === "hero") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`flex flex-col items-center ${className}`}
      >
        {/* Decorative leaves */}
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-8 -top-2 w-8 h-12 text-purple-600"
          >
            <svg viewBox="0 0 24 36" fill="currentColor" className="w-full h-full opacity-80">
              <path d="M12 0C12 0 4 8 4 18C4 28 12 36 12 36C12 36 20 28 20 18C20 8 12 0 12 0Z" />
            </svg>
          </motion.div>
          <motion.div
            animate={{ rotate: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-8 -top-2 w-8 h-12 text-purple-600 scale-x-[-1]"
          >
            <svg viewBox="0 0 24 36" fill="currentColor" className="w-full h-full opacity-80">
              <path d="M12 0C12 0 4 8 4 18C4 28 12 36 12 36C12 36 20 28 20 18C20 8 12 0 12 0Z" />
            </svg>
          </motion.div>
          
          {/* Main brand text */}
          <div className="text-center px-12">
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide">
                <span className="gradient-text-purple">HOME</span>
                <span className="relative mx-1">
                  <span className="text-amber-500">M</span>
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 animate-pulse" />
                </span>
                <span className="gradient-text-purple">ADE</span>
              </span>
            </motion.div>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-3 my-2">
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            </div>
            
            {/* Script text */}
            <span className="font-script text-3xl sm:text-4xl md:text-5xl text-amber-600 block animate-glow">
              By Beauty Girl
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <img 
          src="/brand-logo.jpg" 
          alt="Home Made by Beauty Girl" 
          className="h-10 w-auto object-contain"
        />
      </div>
    );
  }

  // Full variant with enhanced styling
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-3 cursor-pointer group ${className}`}
    >
      <div className="relative">
        <img 
          src="/brand-logo.jpg" 
          alt="Home Made by Beauty Girl" 
          className="h-12 sm:h-14 w-auto object-contain relative z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
