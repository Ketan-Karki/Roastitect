import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "../lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
    >
      <div className="absolute -left-2 sm:-left-4 md:-left-8 lg:-left-20 top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(212, 175, 55, 0.3) 0px 4px 12px",
          }}
          className="ml-[15px] sm:ml-[20px] md:ml-[27px] h-3 w-3 sm:h-4 sm:w-4 rounded-full glass-gold border border-gold-500/30 shadow-sm flex items-center justify-center"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0
                  ? "rgba(212, 175, 55, 0.3)"
                  : "var(--color-gold-500)",
              borderColor:
                scrollYProgress.get() > 0
                  ? "rgba(212, 175, 55, 0.3)"
                  : "var(--color-gold-400)",
            }}
            className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full border border-gold-400/50 bg-gold-500"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="16"
          height={svgHeight}
          className="ml-2 sm:ml-3 md:ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0 V ${svgHeight * 0.8} l 18 24 V ${svgHeight}`}
            fill="none"
            stroke="rgba(212, 175, 55, 0.1)"
            strokeOpacity="0.16"
            strokeWidth="1"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0 V ${svgHeight * 0.8} l 18 24 V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#D4AF37" stopOpacity="0"></stop>
              <stop stopColor="#D4AF37" stopOpacity="0.6"></stop>
              <stop stopColor="#E5C85A"></stop>
              <stop stopColor="#D4AF37" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
