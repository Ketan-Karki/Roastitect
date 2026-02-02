import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Timer, Play, Pause, RotateCcw, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import type { CoffeeProfile } from "../lib/coffee-data";

export const BrewMaster = ({ profile }: { profile: CoffeeProfile }) => {
  const [timeLeft, setTimeLeft] = useState(profile.brewTime);
  const [isActive, setIsActive] = useState(false);

  // Generate steps based on brew method
  const getSteps = () => {
    switch (profile.brewMethod) {
      case "V60":
        return [
          {
            name: "Bloom",
            duration: 30,
            description: "Pour 50g water. Let the gases escape.",
          },
          {
            name: "First Pour",
            duration: 60,
            description: "Pour to 150g in circular motions.",
          },
          {
            name: "Final Pour",
            duration: Math.max(0, profile.brewTime - 90),
            description: "Pour to total weight. Wait for drawdown.",
          },
        ];
      case "Espresso":
        return [
          {
            name: "Pre-infusion",
            duration: 5,
            description: "Start extraction slowly to saturate the puck.",
          },
          {
            name: "Extraction",
            duration: Math.max(0, profile.brewTime - 5),
            description: "Maintain steady pressure. Aim for golden crema.",
          },
        ];
      case "Aeropress":
        return [
          {
            name: "Bloom & Stir",
            duration: 30,
            description: "Pour water and stir gently. Let it bloom.",
          },
          {
            name: "Steep",
            duration: Math.max(0, profile.brewTime - 30),
            description: "Let it steep, then press slowly and steadily.",
          },
        ];
      case "French Press":
        return [
          {
            name: "Bloom",
            duration: 30,
            description: "Pour water and let the coffee bloom.",
          },
          {
            name: "Steep",
            duration: Math.max(0, profile.brewTime - 30),
            description:
              "Steep for the remaining time, then press down slowly.",
          },
        ];
      case "Moka Pot":
        return [
          {
            name: "Heat",
            duration: Math.floor(profile.brewTime * 0.3),
            description: "Heat on medium until coffee starts flowing.",
          },
          {
            name: "Extraction",
            duration: Math.max(
              0,
              profile.brewTime - Math.floor(profile.brewTime * 0.3)
            ),
            description:
              "Coffee flows into upper chamber. Remove from heat when done.",
          },
        ];
      case "Easy Pour":
        return [
          {
            name: "Bloom",
            duration: 30,
            description: "Pour water evenly and let it bloom.",
          },
          {
            name: "Pour",
            duration: Math.max(0, profile.brewTime - 30),
            description: "Continue pouring in a steady, circular motion.",
          },
        ];
      default:
        return [
          {
            name: "Brew",
            duration: profile.brewTime,
            description: "Follow your brewing method's instructions.",
          },
        ];
    }
  };

  const steps = getSteps();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // Calculate current step index based on elapsed time
  const elapsed = profile.brewTime - timeLeft;
  const getCurrentStepIdx = () => {
    let cumulativeTime = 0;
    for (let i = 0; i < steps.length; i++) {
      cumulativeTime += steps[i].duration;
      if (elapsed < cumulativeTime) {
        return i;
      }
    }
    return steps.length - 1; // Return last step if time exceeded
  };
  const currentStepIdx = getCurrentStepIdx();

  // Reset timer when profile changes
  useEffect(() => {
    setIsActive(false);
    setTimeLeft(profile.brewTime);
  }, [profile.brewTime]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(profile.brewTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((profile.brewTime - timeLeft) / profile.brewTime) * 100;

  // Get method-specific tip
  const getArchitectTip = () => {
    switch (profile.brewMethod) {
      case "V60":
        return "Pour in concentric circles from the center outward. Avoid pouring directly onto the filter paper to prevent channeling.";
      case "Espresso":
        return "Aim for a 25-30 second extraction. Watch for tiger-striped crema and adjust grind if needed.";
      case "Aeropress":
        return "Press slowly and steadily. Stop pressing when you hear air hissing to avoid bitterness.";
      case "French Press":
        return "Use a coarse grind and steep for 4 minutes. Press down slowly and serve immediately.";
      case "Moka Pot":
        return "Fill the bottom chamber with hot water up to the safety valve. Use medium heat and remove when coffee stops flowing.";
      case "Easy Pour":
        return "Pour steadily in a circular motion. Keep the water level consistent for even extraction.";
      default:
        return "Follow your brewing method's specific instructions for best results.";
    }
  };

  return (
    <div className="w-full bg-coffee-950 py-12 sm:py-16 md:py-20 lg:py-24 border-t border-gold-500/10 mb-12 sm:mb-16 md:mb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 items-start">
          {/* Timer Visual - Mobile Optimized */}
          <div className="flex-1 flex flex-col items-center w-full lg:w-auto">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
              {/* Liquid Glass Background */}
              <div className="absolute inset-0 rounded-full glass-strong blur-xl opacity-50" />

              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  className="fill-none stroke-gold-500/10 stroke-[3] sm:stroke-[4]"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  className="fill-none stroke-gold-400 stroke-[3] sm:stroke-[4]"
                  strokeDasharray="100 100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 100 - progress }}
                  transition={{ duration: 1, ease: "linear" }}
                  pathLength="100"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(212,175,55,0.5))",
                  }}
                />
              </svg>

              <div className="text-center relative z-10">
                <div className="text-5xl sm:text-6xl md:text-7xl font-heading font-black text-cream-100 tracking-tighter">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gold-500/60 font-bold mt-2">
                  BREW TIMER
                </div>
              </div>
            </div>

            {/* Control Buttons - Mobile Optimized */}
            <div className="flex gap-3 sm:gap-4 mt-8 sm:mt-12">
              <button
                onClick={toggleTimer}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-coffee-950 hover:scale-110 active:scale-95 transition-transform shadow-[0_0_40px_rgba(212,175,55,0.5),inset_0_1px_0_rgba(255,255,255,0.3)]"
              >
                {isActive ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-0.5 sm:ml-1" />
                )}
              </button>
              <button
                onClick={resetTimer}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full glass border border-gold-500/20 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 active:scale-95 transition-all"
              >
                <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Technique Guide - Mobile First */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <Timer className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-cream-100">
                Brew <span className="text-gold-400">Master</span>
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {steps.map((step, idx) => {
                const isActiveStep = isActive && idx === currentStepIdx;

                return (
                  <motion.div
                    key={step.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={cn(
                      "p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border transition-all duration-500",
                      isActiveStep
                        ? "glass-gold border-gold-500/40 shadow-[0_8px_32px_rgba(212,175,55,0.3)]"
                        : "glass border-gold-500/10"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={cn(
                          "text-base sm:text-lg font-bold uppercase tracking-wider",
                          isActiveStep ? "text-gold-400" : "text-cream-200/60"
                        )}
                      >
                        {step.name}
                      </h3>
                      <span className="text-xs font-mono text-gold-500/60">
                        {step.duration}s
                      </span>
                    </div>
                    <p className="text-sm text-cream-200/70 font-light italic leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Tip Card - Liquid Glass */}
            <div className="mt-8 sm:mt-10 md:mt-12 glass-strong p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-gold-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl glass-gold flex items-center justify-center text-gold-400 shrink-0 shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </div>
              <div className="flex-1">
                <h4 className="text-gold-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-1.5 sm:mb-2">
                  Architect's Tip
                </h4>
                <p className="text-cream-100 text-sm sm:text-base font-light leading-relaxed">
                  {getArchitectTip()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
