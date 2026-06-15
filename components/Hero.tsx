import { Waves, Compass, Award, ShieldCheck, Play, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-background py-20 md:py-32">
      {/* Decorative background grid and ambient glows */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 opacity-50 blur-[80px]" />
      <div className="absolute right-0 top-1/3 -z-10 h-[300px] w-[600px] rounded-full bg-cyan-500/10 opacity-30 blur-[120px]" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
              <Waves className="h-4 w-4 animate-pulse" />
              <span>Ride the Wave of Knowledge</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-foreground">
              Master the Ocean. <br />
              <span className="bg-gradient-to-r from-primary via-sky-500 to-cyan-500 bg-clip-text text-transparent">
                Learn Surf Pro Techniques.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Unlock world-class surf tutorials, from fundamental paddling to high-performance aerial maneuvers. Crafted by professional coaches and seasoned surf icons.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="#courses"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/95 transition-all hover:translate-y-[-2px]"
              >
                Start Learning Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/surf-level"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card hover:bg-accent hover:text-accent-foreground px-6 py-3 text-sm font-semibold transition-all hover:translate-y-[-2px]"
              >
                Analyze Surf Level
              </Link>
            </div>

            {/* Quick stats / trust points */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">15+</p>
                <p className="text-xs text-muted-foreground">Premium Courses</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">5,000+</p>
                <p className="text-xs text-muted-foreground">Active Surfers</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">99.4%</p>
                <p className="text-xs text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* Graphical/Interactive Right Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-[420px] aspect-[4/5] rounded-[2.5rem] border border-border bg-gradient-to-b from-card to-card/50 p-4 shadow-2xl backdrop-blur-sm">
              {/* Dynamic decorative "screen" overlay resembling high-quality surfing illustration/placeholder */}
              <div className="relative w-full h-full overflow-hidden rounded-[2rem] bg-gradient-to-tr from-sky-950 via-sky-850 to-blue-900 flex flex-col justify-between p-6 text-white group">
                <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200')" }} />
                
                {/* Overlay ambient wave glow */}
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/30 rounded-full blur-3xl" />

                <div className="flex justify-between items-start z-10">
                  <div className="rounded-full bg-white/10 backdrop-blur-md p-2">
                    <Compass className="h-5 w-5 text-sky-300" />
                  </div>
                  <div className="rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md px-3 py-1 text-xs font-semibold text-emerald-300 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live Coaching Available
                  </div>
                </div>

                <div className="z-10 space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-300">Popular Lesson</span>
                    <h3 className="text-2xl font-bold leading-tight">Mastering the Barrel Ride & Tube Riding</h3>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs border border-white/30">
                        DS
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Coach Damara</p>
                        <p className="text-[10px] text-white/60">Pro Surfer & WSL Coach</p>
                      </div>
                    </div>

                    <div className="h-10 w-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all">
                      <Play className="h-4 w-4 fill-primary text-primary ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
