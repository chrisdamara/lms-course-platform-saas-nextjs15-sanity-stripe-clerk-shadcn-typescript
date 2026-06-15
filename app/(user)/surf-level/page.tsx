import { Metadata } from "next";
import { Compass, Waves, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What is Your Surf Level?",
  description:
    "Identify your surf level with Damara Surf's comprehensive guide on wave lines, surfboard choices, and focus areas.",
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
    lineDescription:
      "Surfing straight to the beach on white water, focusing on basic pop-up and balance.",
    focusAreas: [
      "Stance and pop-up mechanics",
      "Paddling technique",
      "Water safety and awareness",
      "Prone-to-standing transition",
    ],
    board: '8\'0" to 9\'0" Soft Top Foamie (High Volume)',
    waveSize: "1 - 2 ft (Whitewater)",
    energyLevel: "Cruisy / Safe",
    color: "from-blue-500 to-sky-400",
  },
  {
    level: 2,
    title: "Green Wave Starter",
    badge: "Advanced Beginner",
    lineDescription:
      "Angling the takeoff and riding down the line on unbroken green waves.",
    focusAreas: [
      "Angled takeoffs",
      "Trimming down the line",
      "Paddling out through broken waves",
      "Reading wave direction",
    ],
    board: '7\'6" to 8\'0" Funboard / Malibu',
    waveSize: "2 - 3 ft (Beach or Reef Break)",
    energyLevel: "Moderate Endurance",
    color: "from-sky-500 to-teal-400",
  },
  {
    level: 3,
    title: "Functional Surfer",
    badge: "Intermediate",
    lineDescription:
      "Developing speed, trim, and performing basic maneuvers like cutbacks.",
    focusAreas: [
      "Generating speed",
      "Bottom turns and top turns",
      "Clean cutbacks",
      "Lineup positioning",
    ],
    board: '6\'8" to 7\'2" Mid-length or Hybrid',
    waveSize: "3 - 5 ft (Clean waves)",
    energyLevel: "High Stamina Required",
    color: "from-emerald-500 to-green-400",
  },
  {
    level: 4,
    title: "Advanced Performer",
    badge: "Advanced",
    lineDescription:
      "Surfing dynamically in the pocket and connecting powerful turns.",
    focusAreas: [
      "Late takeoffs",
      "Vertical snaps",
      "Roundhouse cutbacks",
      "Tube riding basics",
    ],
    board: '5\'10" to 6\'4" Performance Shortboard',
    waveSize: "4 - 8 ft (Powerful waves)",
    energyLevel: "Peak Athletic Condition",
    color: "from-amber-500 to-orange-400",
  },
  {
    level: 5,
    title: "Elite Ocean Master",
    badge: "Pro/Elite",
    lineDescription:
      "Exploring all parts of the wave including aerials and heavy barrels.",
    focusAreas: [
      "Aerial maneuvers",
      "Critical tube riding",
      "Power carving",
      "Big wave control",
    ],
    board: "Custom Pro Models",
    waveSize: "6 - 15+ ft (Heavy conditions)",
    energyLevel: "Maximum Intensity",
    color: "from-rose-500 to-red-400",
  },
];

export default function SurfLevelPage() {
  return (
    <main className="flex-1 min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-1/4 -z-10 h-[400px] w-[800px] rounded-full bg-primary/10 opacity-30 blur-[120px]" />
      <div className="absolute bottom-1/3 left-1/4 -z-10 h-[300px] w-[600px] rounded-full bg-cyan-500/10 opacity-20 blur-[100px]" />

      <div className="container mx-auto px-4 py-20 max-w-6xl space-y-16">
        {/* Header */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Compass className="h-4 w-4 animate-spin-slow" />
            <span>Map Your Surf Progression</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none">
            What is Your{" "}
            <span className="bg-gradient-to-r from-primary via-sky-500 to-teal-400 bg-clip-text text-transparent">
              Surf Level?
            </span>
          </h1>

          {/* Intro */}
          <div className="rounded-3xl border border-border bg-card/60 p-8 md:p-10 shadow-xl backdrop-blur-md text-left space-y-6">
            <h3 className="text-2xl font-bold">Understanding Line</h3>

            <p className="text-muted-foreground">
              The line you take on a wave says a lot about your surf level,
              whether you're a Level 1 riding straight in or a Level 5 exploring
              the full wave.
            </p>

            <p className="text-muted-foreground">
              Identify your level and use it as a guide to progress your surfing
              journey.
            </p>

            <p className="text-muted-foreground">
              Damara Surf's 5 levels outline progression, equipment, and wave
              requirements for each stage.
            </p>
          </div>
        </div>

        {/* Levels */}
        <div className="space-y-12">
          <h2 className="text-3xl font-black text-center">
            Damara Surf’s 5 Levels
          </h2>

          <div className="grid grid-cols-1 gap-8">
            {surfLevels.map((lvl) => (
              <div
                key={lvl.level}
                className="group rounded-3xl border bg-card p-6 md:p-8 shadow-md hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Left */}
                <div className="lg:col-span-3 space-y-4">
                  <div
                    className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${lvl.color} text-white font-black text-3xl flex items-center justify-center`}
                  >
                    L{lvl.level}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">{lvl.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {lvl.badge}
                    </span>
                  </div>
                </div>

                {/* Middle */}
                <div className="lg:col-span-5 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {lvl.lineDescription}
                  </p>

                  <ul className="space-y-2">
                    {lvl.focusAreas.map((area, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <Waves className="h-3 w-3 text-sky-400" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right */}
                <div className="lg:col-span-4 bg-muted/40 p-5 rounded-2xl text-xs space-y-3">
                  <div>
                    <strong>Board:</strong> {lvl.board}
                  </div>
                  <div>
                    <strong>Wave:</strong> {lvl.waveSize}
                  </div>
                  <div>
                    <strong>Energy:</strong> {lvl.energyLevel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-3xl bg-gradient-to-br from-primary/10 to-card border p-10 space-y-6">
          <h2 className="text-3xl font-black">
            Ready to advance your surfing?
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join structured coaching to accelerate your progression safely.
          </p>

          <Link
            href="/#courses"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold"
          >
            Explore Courses
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}