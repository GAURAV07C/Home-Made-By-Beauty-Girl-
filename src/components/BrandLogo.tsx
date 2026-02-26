"use client";

import { motion } from "framer-motion";

interface BrandLogoProps {
  variant?: "compact" | "full" | "hero";
  className?: string;
}

function Wordmark({ size }: { size: "sm" | "md" | "lg" }) {
  const title =
    size === "sm"
      ? "text-sm sm:text-base"
      : size === "md"
        ? "text-lg sm:text-xl"
        : "text-3xl sm:text-4xl md:text-5xl";
  const script =
    size === "sm"
      ? "text-sm sm:text-base"
      : size === "md"
        ? "text-lg sm:text-xl"
        : "text-3xl sm:text-4xl md:text-5xl";
  const sideLine = size === "lg" ? "w-12 sm:w-16" : "w-7 sm:w-9";
  const dot = size === "lg" ? "w-2 h-2" : "w-1.5 h-1.5";

  return (
    <div className="relative text-center leading-none">
      <span className={`${title} font-bold tracking-wide`}>
        <span className="gradient-text-purple">HOME</span>
        <span className="relative mx-1">
          <span className="text-amber-500">M</span>
          <span
            className={`absolute -top-1 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 animate-pulse ${dot}`}
          />
        </span>
        <span className="gradient-text-purple">ADE</span>
      </span>

      <div className="my-1.5 flex items-center justify-center gap-2">
        <div className={`${sideLine} h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent`} />
        <div className={`${dot} rounded-full bg-amber-500 animate-pulse`} />
        <div className={`${sideLine} h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent`} />
      </div>

      <span className={`font-script ${script} block text-amber-600`}>By Beauty Girl</span>
    </div>
  );
}

export function BrandLogo({ variant = "full", className = "" }: BrandLogoProps) {
  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center ${className}`} aria-label="Home Made by Beauty Girl">
        <Wordmark size="sm" />
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`inline-flex items-center ${className}`}
      >
        <Wordmark size="lg" />
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} className={`inline-flex items-center ${className}`}>
      <Wordmark size="md" />
    </motion.div>
  );
}
