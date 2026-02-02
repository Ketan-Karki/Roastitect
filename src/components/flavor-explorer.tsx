import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Coffee, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";
import { COFFEE_DATABASE } from "../lib/coffee-data";

/**
 * FlavorExplorer - A precise, high-stakes brewing method selector.
 *
 * DESIGN SYSTEM:
 * - Rotation-First Logic: Final resting angle determines the winner.
 * - Radial Geometry: 6 segments (60° each) centered on 0°.
 * - High Fidelity: Metallic gradients, drop shadows, and motion-blur ease curves.
 */
export const FlavorExplorer = ({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const controls = useAnimation();
  const currentRotation = useRef(0);

  const profiles = Object.keys(COFFEE_DATABASE);
  const segmentAngle = 360 / profiles.length;

  const spinWheel = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedId(null);

    // 1. Pick a random winner index
    const winningIndex = Math.floor(Math.random() * profiles.length);
    const targetId = profiles[winningIndex];

    // 2. Calculate the target rotation
    // We want the winning segment to be at the top (0 degrees).
    // The wheel segments are placed at (i * segmentAngle) in the wheel container.
    // To bring segment i to 0, we need to rotate the wheel clockwise by (360 - i * segmentAngle) mod 360.
    // But we want multiple spins, so: extraSpins * 360 + (360 - winningIndex * segmentAngle)
    const extraSpins = 5 + Math.floor(Math.random() * 3); // 5-7 full spins
    // Calculate base rotation to bring winning segment to top
    const baseRotation = (360 - winningIndex * segmentAngle) % 360;
    const totalRotation = extraSpins * 360 + baseRotation;

    // Add subtle visual jitter within the segment (±10 degrees) for realism
    // Subtracting from the target because a positive rotation moves segments clockwise
    const offset = (Math.random() - 0.5) * (segmentAngle * 0.4);
    const finalRotation = totalRotation + offset;

    // Update the rotation relative to the current position to avoid "jump" if spun twice
    // But we use useAnimation which handles the transition from current state properly.
    await controls.start({
      rotate: finalRotation,
      transition: {
        duration: 5,
        ease: [0.15, 0, 0, 1], // Custom "Liquid Glass" ease curve
      },
    });

    // 3. Set the winner
    setIsSpinning(false);
    setSelectedId(targetId);
    onSelect(targetId);

    // 4. Scroll to results
    setTimeout(() => {
      document
        .getElementById("journey-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 800);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col items-center overflow-hidden px-4 sm:px-6">
      {/* Header Section - Mobile Optimized */}
      <div className="text-center mb-8 sm:mb-12 md:mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-3 sm:mb-4"
        >
          The <span className="text-gold-400 font-black">Method</span> Wheel
        </motion.h2>
        <p className="text-cream-200/60 max-w-md mx-auto font-light tracking-wide uppercase text-[9px] sm:text-[10px] px-4">
          Architect your brew. Spin to discover.
        </p>
      </div>

      {/* Wheel Container - Mobile Responsive */}
      <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] flex items-center justify-center">
        {/* Pointer (The Goalpost) - Liquid Glass Style */}
        <div className="absolute top-[-8px] sm:top-[-10px] left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
          <motion.div
            animate={isSpinning ? { y: [0, -5, 0] } : {}}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-b from-gold-400 to-gold-600 shadow-[0_0_30px_rgba(212,175,55,0.8),0_0_60px_rgba(212,175,55,0.4)]"
            style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}
          />
        </div>

        {/* The Actual Wheel - Liquid Glass Enhanced */}
        <motion.div
          animate={controls}
          initial={{ rotate: 0 }}
          className="relative w-full h-full rounded-full border-[8px] sm:border-[10px] md:border-[12px] border-gold-500/20 glass-strong shadow-[0_0_80px_rgba(0,0,0,0.9),inset_0_0_60px_rgba(0,0,0,0.6),0_0_40px_rgba(212,175,55,0.2)] overflow-hidden"
        >
          {/* Segments Layer */}
          {profiles.map((id, i) => {
            const profile = COFFEE_DATABASE[id];
            const isDark = i % 2 === 0;

            return (
              <div
                key={id}
                className="absolute top-0 left-0 w-full h-full origin-center"
                style={{ transform: `rotate(${i * segmentAngle}deg)` }}
              >
                {/* Background Wedge */}
                <div
                  className={cn(
                    "absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 transition-all duration-300",
                    isDark ? "bg-gold-500/8" : "bg-transparent"
                  )}
                  style={{
                    clipPath: `polygon(50% 100%, 21.15% 0, 78.85% 0)`,
                  }}
                />

                {/* Text Label - Mobile Responsive */}
                <div className="absolute top-8 sm:top-10 md:top-16 lg:top-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <span
                    className={cn(
                      "text-[8px] sm:text-[9px] md:text-xs lg:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transform rotate-0",
                      isDark ? "text-gold-400" : "text-cream-100"
                    )}
                  >
                    {profile.brewMethod}
                  </span>
                </div>

                {/* Boundary Line */}
                <div
                  className="absolute top-0 left-1/2 w-[0.5px] sm:w-[1px] h-1/2 bg-gold-500/15 origin-bottom"
                  style={{ transform: `rotate(${segmentAngle / 2}deg)` }}
                />
              </div>
            );
          })}

          {/* Decorative Inner Ring - Liquid Glass */}
          <div className="absolute inset-[30%] rounded-full border border-gold-500/20 z-20 pointer-events-none backdrop-blur-sm" />

          {/* Center Hub - Premium Glass Effect */}
          <div className="absolute inset-[38%] rounded-full glass-gold border-2 sm:border-3 md:border-4 border-gold-500/40 shadow-[0_0_40px_rgba(212,175,55,0.5),inset_0_0_20px_rgba(212,175,55,0.1)] z-30 pointer-events-none flex items-center justify-center">
            <div className="w-1/2 h-1/2 rounded-full bg-coffee-950/50 border border-gold-500/30 animate-pulse backdrop-blur-sm" />
          </div>
        </motion.div>

        {/* Spin Interaction Layer - Mobile Optimized */}
        <motion.button
          onClick={spinWheel}
          disabled={isSpinning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "absolute z-40 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full font-heading font-black text-[10px] sm:text-xs md:text-sm lg:text-base tracking-tighter uppercase transition-all flex items-center justify-center p-3 sm:p-4 text-center",
            isSpinning
              ? "glass text-gold-500/30 cursor-not-allowed"
              : "bg-gradient-to-br from-gold-400 to-gold-600 text-coffee-950 hover:from-gold-300 hover:to-gold-500 shadow-[0_10px_50px_rgba(212,175,55,0.6),inset_0_1px_0_rgba(255,255,255,0.3)] active:scale-95"
          )}
        >
          {isSpinning ? (
            <span className="leading-tight">Spinning</span>
          ) : (
            <span className="leading-tight">
              Tap to
              <br />
              Spin
            </span>
          )}
        </motion.button>
      </div>

      {/* Result Display - Liquid Glass Card */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-8 sm:mt-12 md:mt-16 text-center z-10 w-full max-w-md px-4"
          >
            <div className="inline-flex flex-col items-center w-full">
              <div className="glass-strong px-6 sm:px-8 py-4 sm:py-5 rounded-2xl sm:rounded-3xl w-full">
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-gold-400 mb-2 sm:mb-3">
                  <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em]">
                    Architect's Choice
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-cream-100 uppercase tracking-tight">
                  {COFFEE_DATABASE[selectedId].region}
                </h3>
              </div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-6 sm:mt-8 flex flex-col items-center text-gold-500/40"
              >
                <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
