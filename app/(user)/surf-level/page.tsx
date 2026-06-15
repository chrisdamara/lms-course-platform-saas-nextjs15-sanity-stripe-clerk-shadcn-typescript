import { Metadata } from "next";
import { Compass, Waves, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What is Your Surf Level?",
  description: "Identify your surf level with Damara Surf's comprehensive guide on wave lines, surfboard choices, and focus areas.",
};

interface SurfLevel {
  level: number;
  title: string;
  badge: string;
  lineDescription: string;
  focusAreas: string[];
  board: string;
  waveSize: string;
  energyLevel: string;
  color: string;
}

const surfLevels: SurfLevel[] = [
  {
    level: 1,
    title: "First Wave Rider",
    badge: "Beginner",
    lineDescription: "Surfing straight to the beach on white water, catching waves directly inside. Focusing on basic popup and balance.",
    focusAreas: ["Stance and Pop-up mechanics", "Paddling technique", "Water safety and awareness", "Prone-to-standing transition"],
    board: "8'0\" to 9'0\" Soft Top Foamie (High Volume)",
    waveSize: "1 - 2 ft (Whitewater)",
    energyLevel: "Cruisy / Safe",
    color: "from-blue-500 to-sky-400",
  },
  {
    level: 2,
    title: "Green Wave Starter",
    badge: "Advanced Beginner",
    lineDescription: "Angling the takeoff and riding down the line on unbroken green waves. Beginning to trim left and right.",
    focusAreas: ["Angled takeoffs", "Trimming down the line", "Paddling out through broken waves", "Reading wave direction (lefts & rights)"],
    board: "7'6\" to 8'0\" Funboard / Malibu (Epoxy or PU)",
    waveSize: "2 - 3 ft (Gentle Reef or Beach Break)",
    energyLevel: "Moderate Endurance",
    color: "from-sky-500 to-teal-400",
  },
  {
    level: 3,
    title: "Functional Surfer",
    badge: "Intermediate",
    lineDescription: "Developing speed, trim, and performing basic functional maneuvers like climbs, drops, and soft cutbacks.",
    focusAreas: ["Generating speed", "Bottom turns and top turns", "Executing a clean cutback", "Lineup positioning and priority management"],
    board: "6'8\" to 7'2\" Mid-length or Hybrid Shortboard",
    waveSize: "3 - 5 ft (Clean, open face waves)",
    energyLevel: "High Stamina Required",
    color: "from-emerald-500 to-green-400",
  },
  {
    level: 4,
    title: "Advanced Performer",
    badge: "Advanced",
    lineDescription: "Surfing dynamically in the pocket. Connecting transitions, carving hard, and hunting barrel sections on open wave faces.",
    focusAreas: ["Deep late takeoffs", "Pocket surfing & vertical snaps", "Roundhouse cutbacks", "Basic tube riding positioning"],
    board: "5'10\" to 6'4\" Performance Shortboard (PU/Epoxy)",
    waveSize: "4 - 8 ft (Powerful Reefs, Points, or Beach breaks)",
    energyLevel: "Peak Athletic Condition",
    color: "from-amber-500 to-orange-400",
  },
  {
    level: 5,
    title: "Elite Ocean Master",
    badge: "Pro/Elite",
    lineDescription: "Exploring all parts of the wave, pushing above the lip (aerials), carving critical pockets, and navigating deep barrels.",
    focusAreas: ["Progressive aerial maneuvers", "Heavy/critical tube riding", "Advanced rail-to-rail power carving", "Navigating dangerous or giant surf"],
    board: "Custom Pro Models (tuned to specific wave types)",
    waveSize: "6 - 15+ ft (Critical/Heavy ocean conditions)",
    energyLevel: "Maximum Intensity & Specialized Training",
    color: "from-rose-500 to-red-400",
  },
];

export default function SurfLevelPage() {
  return (
    <main className="flex-1 min-h-screen bg-background relative overflow-hidden">
      {/* Dynamic ambient backgrounds */}
      <div className="absolute top-0 right-1/4 -z-10 h-[400px] w-[800px] rounded-full bg-primary/10 opacity-30 blur-[120px]" />
      <div className="absolute bottom-1/3 left-1/4 -z-10 h-[300px] w-[600px] rounded-full bg-cyan-500/10 opacity-20 blur-[100px]" />

      <div className="container mx-auto px-4 py-20 max-w-6xl space-y-16">
        {/* Header Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Compass className="h-4 w-4 animate-spin-slow" />
            <span>Map Your Surf Progression</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-none">
            What is Your <span className="bg-gradient-to-r from-primary via-sky-500 to-teal-400 bg-clip-text text-transparent">Surf Level?</span>
          </h1>

          {/* Intro Box */}
          <div className="relative rounded-3xl border border-border bg-card/60 p-8 md:p-10 shadow-xl backdrop-blur-md text-left mt-8 space-y-6">
            <div className="absolute top-0 right-12 -translate-y-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow-md">
              The Line Concept
            </div>
            <h3 className="text-2xl font-bold text-foreground">Understanding Line</h3>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              The line you take on a wave says a lot about your surf level, Whether you're a <strong>Level 1</strong> taking off and surfing straight to the beach or a <strong>Level 5</strong>, exploring all parts of the wave and even above the lip and deeper in the barrel!
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Identify your level and use it as a guide to direct your surf progression to take yourself to the next level!
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Below, we outline Damara Surf&rsquo;s 5 surf levels, each with key focus areas to guide your development. We&rsquo;ve also recommended surfboards, wave sizes, and energy levels for surfing independently at each level.
            </p>
          </div>
        </div>

        {/* 5 Surf Levels Grid */}
        <div className="space-y-12">
          <h2 className="text-3xl font-black tracking-tight text-center">Damara Surf&rsquo;s 5 Levels</h2>
          
          <div className="grid grid-cols-1 gap-8">
            {surfLevels.map((lvl) => (
              <div 
                key={lvl.level}
                className="group relative rounded-3xl border border-border bg-card hover:bg-card/80 transition-all duration-300 p-6 md:p-8 shadow-md hover:shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Level Tag / Badge */}
                <div className="lg:col-span-3 space-y-4">
                  <div className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br ${lvl.color} text-white font-black text-3xl shadow-lg`}>
                    L{lvl.level}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{lvl.title}</h3>
                    <span className="inline-block mt-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                      {lvl.badge}
                    </span>
                  </div>
                </div>

                {/* Main details */}
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Wave Line & Style</h4>
                    <p className="text-sm text-foreground leading-relaxed">
                      {lvl.lineDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Key Development Focus</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {lvl.focusAreas.map((area, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Waves className="h-3 w-3 text-sky-400 shrink-0" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Specs / Recommends */}
                <div className="lg:col-span-4 rounded-2xl bg-muted/40 p-5 space-y-4 text-xs border border-border/40">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Recommended Board:</span>
                    <span className="font-bold text-foreground text-right max-w-[180px]">{lvl.board}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/30 pt-3">
                    <span className="text-muted-foreground font-medium">Ideal Wave Size:</span>
                    <span className="font-bold text-foreground">{lvl.waveSize}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/30 pt-3">
                    <span className="text-muted-foreground font-medium">Energy Requirement:</span>
                    <span className="font-semibold text-primary">{lvl.energyLevel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-background to-card border border-primary/20 p-8 md:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-lg">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1 text-xs font-bold text-emerald-500">
            Start Your Journey
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Ready to advance to the next level?</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you need to lock down your Level 1 popup or learn high-performance Level 4 snaps, our certified premium lessons will fast-track your surfing progression safely and efficiently.
          </p>
          <div className="pt-2">
            <Link
              href="/#courses"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/95 transition-all hover:translate-y-[-2px]"
            >
              Explore Certified Surf Courses
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
