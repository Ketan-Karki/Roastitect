# Roastitect ☕

**Precision architecture meets sensory extraction.** Discover the science behind your perfect cup.

Roastitect is an interactive coffee brewing companion that helps you architect the perfect cup through precision timing, grind calibration, and method selection. Built with modern web technologies and a beautiful liquid glass UI design.

## ✨ Features

### 🎡 Method Wheel

Spin the interactive wheel to randomly select a brewing method. Each method comes with its own profile, story, and optimized parameters.

### ⏱️ Brew Master Timer

A precision timer with method-specific brewing steps:

- **V60**: Bloom, First Pour, Final Pour
- **Espresso**: Pre-infusion, Extraction
- **Aeropress**: Bloom & Stir, Steep
- **French Press**: Bloom, Steep
- **Moka Pot**: Heat, Extraction
- **Easy Pour**: Bloom, Pour

Each method includes real-time step tracking and method-specific architect's tips.

### ⚙️ Grinder Calibration

Get precise grind settings for your grinder:

- **Comandante C40**
- **Timemore C3S Pro** (default)
- **Kingrinder K6**

Each coffee profile includes optimized click/tick settings for all supported grinders.

### 🗺️ Coffee Journey

Explore the complete journey from cultivation to extraction:

1. **Cultivation & Origin** - Learn about the coffee's terroir
2. **Roast Architecture** - Understand the roast level and flavor development
3. **Precision Grinding** - Get exact grind settings for your equipment
4. **Sensory Extraction** - Master the brewing process

### 🎨 Beautiful UI

- Liquid glass morphism design
- Smooth animations with Framer Motion
- 3D coffee scene visualization
- Fully responsive (mobile-first)
- Dark theme with gold accents

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd roastitect

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling with custom liquid glass effects
- **Framer Motion** - Animations and transitions
- **React Three Fiber** - 3D coffee scene
- **Lucide React** - Icon library

## 📁 Project Structure

```
src/
├── components/
│   ├── background-beams.tsx    # Animated background effects
│   ├── brew-master.tsx          # Brew timer component
│   ├── coffee-scene.tsx         # 3D coffee visualization
│   ├── flavor-explorer.tsx      # Method wheel selector
│   ├── grinder-calibration.tsx  # Grinder settings display
│   ├── hero.tsx                 # Landing section
│   ├── journey.tsx              # Coffee journey timeline
│   └── tracing-beam.tsx         # Animated beam effect
├── lib/
│   ├── coffee-data.ts           # Coffee profiles and grinder data
│   └── utils.ts                 # Utility functions
├── App.tsx                      # Main app component
├── main.tsx                     # Entry point
└── index.css                    # Global styles
```

## ☕ Available Brew Methods

1. **V60 Pour Over** - "The Funk & Boom"

   - Light roast
   - Notes: Fruity, Light, Floral
   - Brew time: 180 seconds

2. **AeroPress** - "The Berry Muse"

   - Medium roast
   - Notes: Berry, Smooth, Sweet
   - Brew time: 120 seconds

3. **French Press** - "Classic Immersion"

   - Dark roast
   - Notes: Dark Chocolate, Rich, Bold
   - Brew time: 240 seconds

4. **Moka Pot** - "Moka Monday"

   - Dark roast
   - Notes: Intense, Syrupy, Caramel
   - Brew time: 300 seconds

5. **Espresso** - "The Golden Vineyard"

   - Medium roast
   - Notes: Apple, Juicy, Golden
   - Brew time: 30 seconds

6. **Easy Pour** - "Everyday Harmony"
   - Medium roast
   - Notes: Balanced, Nutty, Reliable
   - Brew time: 150 seconds

## 🔧 Supported Grinders

- **Comandante C40** - Premium hand grinder
- **Timemore C3S Pro** - Value-focused hand grinder (default)
- **Kingrinder K6** - Budget-friendly option

Each coffee profile includes optimized grind settings (clicks/ticks) for all three grinders.

## 🎯 Usage

1. **Spin the Wheel**: Click the "Tap to Spin" button to randomly select a brewing method
2. **View Profile**: See the selected coffee's story, notes, and roast level
3. **Select Grinder**: Choose your grinder to see the exact grind settings
4. **Start Timer**: Use the Brew Master timer to guide your brewing process
5. **Follow Steps**: Each method has specific steps with timing and instructions

## 🎨 Design Philosophy

Roastitect embraces an "architectural" approach to coffee brewing:

- **Precision** - Exact measurements and timing
- **Structure** - Understanding the science behind extraction
- **Artistry** - Beautiful presentation and user experience
- **Education** - Learning the journey from bean to cup

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

---

**Est. 2026 • The Architect of Brew** ☕
