import { motion } from "framer-motion";
import { TracingBeam } from "./tracing-beam";
import {
  type CoffeeProfile,
  type GrinderType,
  GRINDERS,
} from "../lib/coffee-data";
import { Sprout, Flame, Zap, Droplets } from "lucide-react";

export const Journey = ({
  profile,
  selectedGrinder,
}: {
  profile: CoffeeProfile;
  selectedGrinder: GrinderType;
}) => {
  const grinderName =
    GRINDERS.find((g) => g.id === selectedGrinder)?.name || "your grinder";

  const steps = [
    {
      title: "Cultivation & Origin",
      description: `Grown in the high-altitude regions of ${profile.region}. The terroir provides the structural foundation for the acidity and body we architect.`,
      icon: Sprout,
    },
    {
      title: "The Roast Architecture",
      description: `Roasted to a ${
        profile.roastLevel
      } level. This stage is where we develop the chemical complexity, transforming raw acids into the ${profile.notes.join(
        ", "
      )} notes you selected.`,
      icon: Flame,
    },
    {
      title: "Precision Grinding",
      description: `Ground with surgical precision. Using ${profile.grindTicks[selectedGrinder]} clicks on your ${grinderName} ensures the surface area is optimized for the intended extraction profile.`,
      icon: Zap,
    },
    {
      title: "Sensory Extraction",
      description: `The final stage. Brewed via ${profile.brewMethod} for ${
        profile.brewTime / 60
      } minutes. Water acts as the solvent, bringing the architect's vision into your cup.`,
      icon: Droplets,
    },
  ];

  return (
    <div className="w-full bg-coffee-950 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-10 sm:mb-12 md:mb-16 text-center px-4">
          The <span className="text-gold-400">Bean to Cup</span> Journey
        </h2>

        <TracingBeam className="px-2 sm:px-4 md:px-6">
          <div className="max-w-2xl mx-auto antialiased pt-4 relative">
            {steps.map((step, index) => (
              <div key={`content-${index}`} className="mb-12 sm:mb-16 md:mb-20">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-strong p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl glass-gold flex items-center justify-center mb-4 sm:mb-6 shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
                    <step.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gold-400" />
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-cream-100 mb-3 sm:mb-4">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base text-cream-200/70 leading-relaxed font-light">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </div>
  );
};
