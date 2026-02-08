import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";
import { cn } from "../lib/utils";
import type { CoffeeProfile, GrinderType } from "../lib/coffee-data";
import { shareProfile } from "../lib/share";

type ShareButtonProps = {
  profile: CoffeeProfile;
  grinder: GrinderType;
  className?: string;
};

export const ShareButton = ({
  profile,
  grinder,
  className,
}: ShareButtonProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Check if Web Share API is available
  const hasWebShare = typeof navigator !== "undefined" && "share" in navigator;

  const handleShare = async () => {
    if (isSharing) return;

    setIsSharing(true);

    const success = await shareProfile({ profile, grinder });

    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }

    setIsSharing(false);
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <motion.button
        onClick={handleShare}
        disabled={isSharing}
        aria-label="Share this coffee recipe"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 sm:gap-3 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-coffee-950",
          showSuccess
            ? "bg-gradient-to-br from-green-400 to-green-600 text-coffee-950"
            : "glass-gold border border-gold-500/30 text-gold-400 hover:bg-gold-500/20 active:scale-95"
        )}
      >
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <Check className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span>Copied!</span>
            </motion.div>
          ) : (
            <motion.div
              key="share"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              {hasWebShare ? (
                <>
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  <span className="hidden sm:inline">Share Recipe</span>
                  <span className="sm:hidden">Share</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  <span className="hidden sm:inline">Copy Recipe</span>
                  <span className="sm:hidden">Copy</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip on hover (desktop only) */}
      <div className="hidden lg:block absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="glass-strong px-3 py-2 rounded-lg text-xs text-cream-200 whitespace-nowrap">
          {hasWebShare ? "Share via..." : "Copy to clipboard"}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-coffee-900/80 backdrop-blur-sm rotate-45" />
        </div>
      </div>
    </div>
  );
};
