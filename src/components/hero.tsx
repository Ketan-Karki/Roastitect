import { motion } from "framer-motion";
import { BackgroundBeams } from "./background-beams";
import { CoffeeScene } from "./coffee-scene";

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-start pt-20 sm:pt-24 md:pt-32 overflow-hidden bg-coffee-950">
      <BackgroundBeams />

      {/* Liquid Glass Background Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-gold text-gold-400 text-xs sm:text-sm font-medium tracking-widest uppercase">
            EST. 2026 • THE ARCHITECT OF BREW
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-black tracking-tighter leading-none px-2"
        >
          <span className="bg-gradient-to-b from-cream-100 via-cream-50 to-cream-200/50 bg-clip-text text-transparent">
            ROASTI
          </span>
          <span className="text-gold-500">TECT</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-cream-200/70 max-w-2xl font-light leading-relaxed mb-8 sm:mb-12 px-4"
        >
          Precision architecture meets sensory extraction. Discover the science
          behind your perfect cup.
        </motion.p>
      </div>

      {/* 3D Coffee Scene - Mobile Optimized */}
      <div className="w-full flex justify-center z-20 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-32 xl:-mt-40 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="w-full max-w-6xl pointer-events-auto"
        >
          <CoffeeScene />
        </motion.div>
      </div>

      {/* Scroll Indicator - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-10 flex flex-col items-center gap-2 z-30"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-500/60">
          Explore Journey
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-gold-500/80 to-transparent"
        />
      </motion.div>
    </section>
  );
};
