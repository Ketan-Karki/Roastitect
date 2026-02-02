import { useState } from "react";
import { Hero } from "./components/hero";
import { FlavorExplorer } from "./components/flavor-explorer";
import { GrinderCalibration } from "./components/grinder-calibration";
import { Journey } from "./components/journey";
import { BrewMaster } from "./components/brew-master";
import { COFFEE_DATABASE, type GrinderType } from "./lib/coffee-data";

const App = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedGrinder, setSelectedGrinder] =
    useState<GrinderType>("timemore_c3s");
  const selectedProfile = selectedId ? COFFEE_DATABASE[selectedId] : null;

  return (
    <main className="bg-coffee-950 min-h-screen overflow-x-hidden">
      <Hero />

      <FlavorExplorer onSelect={setSelectedId} />

      {selectedProfile && (
        <>
          {/* Selected Profile Section - Liquid Glass Card */}
          <div
            id="journey-section"
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 border-t border-gold-500/10"
          >
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6">
                <span className="text-gold-400 uppercase tracking-widest text-xs sm:text-sm font-bold">
                  Selected Sommelier Profile
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mt-2 mb-4 sm:mb-6 text-cream-100 italic transition-all duration-500">
                  {selectedProfile.region}
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-cream-200/70 font-light leading-relaxed">
                  {selectedProfile.story}
                </p>

                {/* Notes Tags - Mobile Responsive */}
                <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                  {selectedProfile.notes.map((note) => (
                    <span
                      key={note}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-gold border border-gold-500/30 text-gold-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Roast Level Card - Liquid Glass */}
              <div className="glass-strong p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl aspect-video flex flex-col justify-center text-center">
                <span className="text-gold-500/60 uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs mb-3 sm:mb-4">
                  Roast Architecture
                </span>
                <div className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-gold-400">
                  {selectedProfile.roastLevel}
                </div>
              </div>
            </div>
          </div>

          <GrinderCalibration
            profile={selectedProfile}
            selectedGrinder={selectedGrinder}
            onGrinderChange={setSelectedGrinder}
          />

          <Journey
            profile={selectedProfile}
            selectedGrinder={selectedGrinder}
          />

          <BrewMaster profile={selectedProfile} />
        </>
      )}

      {/* Footer - Mobile Optimized */}
      <div className="h-[8vh] sm:h-[10vh] border-t border-gold-500/5 flex items-center justify-center px-4">
        <p className="text-[9px] sm:text-[10px] text-gold-500/30 uppercase tracking-[0.4em] sm:tracking-[0.5em] text-center">
          &copy; 2026 Roastitect • Precision in every pour
        </p>
      </div>
    </main>
  );
};

export default App;
