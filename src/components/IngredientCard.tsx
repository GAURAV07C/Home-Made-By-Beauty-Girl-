import { motion } from "framer-motion";
import { Droplets, Sun, Sparkles, Leaf, Heart } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  droplets: Droplets,
  sun: Sun,
  sparkles: Sparkles,
  leaf: Leaf,
  heart: Heart,
};

interface IngredientCardProps {
  name: string;
  description: string;
  iconName: string;
  delay?: number;
  gradient: string;
  iconColor: string;
  glowColor: string;
}

export function IngredientCard({ 
  name, 
  description, 
  iconName,
  delay = 0, 
  gradient,
  iconColor,
  glowColor
}: IngredientCardProps) {
  const Icon = iconMap[iconName] || Sparkles;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -12, scale: 1.03 }}
      className="group relative"
    >
      {/* Glow effect behind card */}
      <div className={`absolute inset-0 rounded-3xl ${glowColor} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10`} />
      
      <div className={`
        relative overflow-hidden p-6 sm:p-8 rounded-3xl
        bg-gradient-to-br ${gradient}
        border-2 border-white/60
        shadow-xl shadow-black/5
        transition-all duration-500
        group-hover:shadow-2xl group-hover:border-white/80
      `}>
        {/* Animated background elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-10 -top-10 w-32 h-32 sm:w-40 sm:h-40 bg-white/40 rounded-full blur-2xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -left-6 -bottom-6 w-24 h-24 bg-white/30 rounded-full blur-xl"
        />
        
        {/* Icon container with gradient border */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mb-5">
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient.replace('from-', 'from-').replace('/50', '')} opacity-50`} />
          <div className="absolute inset-[2px] rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-110">
            <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${iconColor} transition-all duration-300 group-hover:scale-110`} />
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold font-display text-foreground mb-2 relative">
          {name}
        </h3>
        <p className="text-sm sm:text-base text-foreground/70 leading-relaxed relative">
          {description}
        </p>

        {/* Decorative corner accent */}
        <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden">
          <div className={`absolute bottom-0 right-0 w-10 h-10 ${iconColor.replace('text-', 'bg-')}/10 rounded-tl-full`} />
        </div>
      </div>
    </motion.div>
  );
}
