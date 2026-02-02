import { motion } from "framer-motion";
import { Settings, MousePointer2 } from "lucide-react";
import { cn } from "../lib/utils";
import {
  type CoffeeProfile,
  type GrinderType,
  GRINDERS,
} from "../lib/coffee-data";

export const GrinderCalibration = ({
  profile,
  selectedGrinder,
  onGrinderChange,
}: {
  profile: CoffeeProfile;
  selectedGrinder: GrinderType;
  onGrinderChange: (g: GrinderType) => void;
}) => {
  const currentTicks = profile.grindTicks[selectedGrinder];

  return (
    <div className="w-full bg-coffee-950 py-12 sm:py-16 md:py-20 lg:py-24 border-t border-gold-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 md:gap-16">
          {/* Dial Visualization - Mobile Optimized */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 flex items-center justify-center shrink-0">
            {/* Outer Dial - Liquid Glass */}
            <motion.div
              animate={{ rotate: currentTicks * 10 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="absolute inset-0 rounded-full border-3 sm:border-4 border-dashed border-gold-500/30 glass"
            />

            {/* Inner Dial - Premium Glass */}
            <div className="absolute inset-3 sm:inset-4 rounded-full glass-strong border-4 sm:border-6 md:border-8 border-gold-500/20 flex items-center justify-center shadow-[inset_0_0_60px_rgba(0,0,0,0.6),0_0_40px_rgba(212,175,55,0.2)]">
              <div className="text-center">
                <motion.div
                  key={currentTicks}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-5xl sm:text-6xl md:text-7xl font-heading font-black text-gold-400 tracking-tighter"
                >
                  {currentTicks}
                </motion.div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gold-500/60 font-bold mt-1">
                  TICKS / CLICKS
                </div>
              </div>
            </div>

            {/* Indicator Arrow - Enhanced */}
            <div className="absolute top-[-8px] sm:top-[-10px] left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-gold-400 to-gold-600 rotate-45 z-10 shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
          </div>

          {/* Controls & Info - Mobile First */}
          <div className="flex-1 max-w-xl w-full">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-cream-100">
                Grinder <span className="text-gold-400">Calibration</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-cream-200/70 font-light leading-relaxed mb-6 sm:mb-8">
              Architecting the perfect extraction starts with precision particle
              size. Adjust your manual grinder to the exact setting below for
              the{" "}
              <span className="text-cream-100 font-medium">
                {profile.region}
              </span>{" "}
              profile.
            </p>

            {/* Grinder Selection - Mobile Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {GRINDERS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => onGrinderChange(g.id)}
                  className={cn(
                    "px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border transition-all text-left group relative overflow-hidden",
                    selectedGrinder === g.id
                      ? "glass-gold border-gold-500/40 text-cream-100 shadow-[0_8px_32px_rgba(212,175,55,0.3)]"
                      : "glass border-gold-500/10 text-cream-200/60 hover:border-gold-500/30 hover:text-cream-200/80 active:scale-95"
                  )}
                >
                  <div className="text-[8px] sm:text-[9px] uppercase tracking-widest font-bold mb-1 opacity-60">
                    Manual Grinder
                  </div>
                  <div className="text-sm sm:text-base font-bold tracking-tight">
                    {g.name}
                  </div>
                  <MousePointer2
                    className={cn(
                      "w-4 h-4 mt-3 sm:mt-4 transition-all duration-300",
                      selectedGrinder === g.id
                        ? "translate-x-1 text-gold-400"
                        : "opacity-0 -translate-x-2"
                    )}
                  />
                  {selectedGrinder === g.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent pointer-events-none"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tip Card - Liquid Glass */}
            <div className="glass p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-gold-500/20">
              <p className="text-xs sm:text-sm text-gold-400/90 leading-relaxed italic">
                * Note: Clicks may vary slightly based on bean density and burr
                age. Start at{" "}
                <span className="font-semibold text-gold-400">
                  {currentTicks}
                </span>{" "}
                and adjust by ±1 for personal taste.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
