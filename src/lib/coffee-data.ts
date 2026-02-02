export type GrinderType = "comandante" | "timemore_c3s" | "kingrinder";

export const GRINDERS: { id: GrinderType; name: string }[] = [
  { id: "comandante", name: "Comandante C40" },
  { id: "timemore_c3s", name: "Timemore C3S Pro" },
  { id: "kingrinder", name: "Kingrinder K6" },
];

export type CoffeeProfile = {
  region: string;
  notes: string[];
  roastLevel: "Light" | "Medium" | "Dark";
  grindTicks: {
    comandante: number;
    timemore_c3s: number; // For C3S Pro
    kingrinder: number;
  };
  brewMethod: "V60" | "Aeropress" | "Espresso" | "French Press" | "Moka Pot" | "Easy Pour";
  brewTime: number; // in seconds
  story: string;
};

export const COFFEE_DATABASE: Record<string, CoffeeProfile> = {
  "pour-over": {
    region: "The Funk & Boom (Pour Over)",
    notes: ["Fruity", "Light", "Floral"],
    roastLevel: "Light",
    grindTicks: { comandante: 18, timemore_c3s: 15, kingrinder: 90 },
    brewMethod: "V60",
    brewTime: 180,
    story: "Inspired by the community's Funk and Boom recipe. This pour-over architects a world of fruit fizz and floral aromatics through precision extraction.",
  },
  "aeropress": {
    region: "The Berry Muse (AeroPress)",
    notes: ["Berry", "Smooth", "Sweet"],
    roastLevel: "Medium",
    grindTicks: { comandante: 14, timemore_c3s: 13, kingrinder: 70 },
    brewMethod: "Aeropress",
    brewTime: 120,
    story: "A smooth, berry-forward masterpiece. The AeroPress engineers a balanced cup that captures the sweetness of heritage estates.",
  },
  "french-press": {
    region: "Classic Immersion (French Press)",
    notes: ["Dark Chocolate", "Rich", "Bold"],
    roastLevel: "Dark",
    grindTicks: { comandante: 28, timemore_c3s: 23, kingrinder: 140 },
    brewMethod: "French Press",
    brewTime: 240,
    story: "Structural richness through immersion. This French Press method avoids sediment while maximizing the bold, chocolatey foundations of the bean.",
  },
  "moka-pot": {
    region: "Moka Monday (Moka Pot)",
    notes: ["Intense", "Syrupy", "Caramel"],
    roastLevel: "Dark",
    grindTicks: { comandante: 10, timemore_c3s: 13, kingrinder: 55 },
    brewMethod: "Moka Pot",
    brewTime: 300,
    story: "The Moka Monday ritual. Stovetop pressure architects a syrupy, intense extraction that serves as the perfect foundation for a strong start.",
  },
  "espresso": {
    region: "The Golden Vineyard (Espresso)",
    notes: ["Apple", "Juicy", "Golden"],
    roastLevel: "Medium",
    grindTicks: { comandante: 6, timemore_c3s: 9, kingrinder: 40 },
    brewMethod: "Espresso",
    brewTime: 30,
    story: "Not your average espresso. Architected to be juicy and apple-like, this 'Golden Vineyard' profile challenges traditional expectations with every shot.",
  },
  "easy-pour": {
    region: "Everyday Harmony (Easy Pour)",
    notes: ["Balanced", "Nutty", "Reliable"],
    roastLevel: "Medium",
    grindTicks: { comandante: 20, timemore_c3s: 18, kingrinder: 100 },
    brewMethod: "Easy Pour",
    brewTime: 150,
    story: "Consistency is key. The Easy Pour method is architected for those who value reliability and harmony in their daily coffee ritual.",
  },
};
