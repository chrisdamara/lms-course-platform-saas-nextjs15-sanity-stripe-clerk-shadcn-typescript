import Hero from "@/components/Hero";
import { CourseCard } from "@/components/CourseCard";
import { getCourses } from "@/sanity/lib/courses/getCourses";
import { Compass, Waves, Award, ShieldCheck, Flame, Star, Quote } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = 3600; // revalidate at most every hour

export default async function Home() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header Section */}
      <Hero />

      {/* Trust & Features Section */}
      <section className="py-12 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Waves className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Step-by-Step Paths</h4>
                <p className="text-xs text-muted-foreground">From beginner waves to advanced tubes.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-sky-500/10 text-sky-500">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">WSL Certified Coaches</h4>
                <p className="text-xs text-muted-foreground">Learn from the ultimate masters of surf.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Lifetime Access</h4>
                <p className="text-xs text-muted-foreground">Study the mechanics at your own pace.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                <Flame className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Interactive Analysis</h4>
                <p className="text-xs text-muted-foreground">Unlock your tailored surfing stats.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid Section */}
      <section id="courses" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <Compass className="h-3.5 w-3.5" />
              Explore Academy
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
              Our Curated Surfing Courses
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore professional-grade, high-definition courses meticulously produced to sharpen your ocean read, board control, and confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course._id} className="hover:scale-[1.02] transition-transform duration-300">
                <CourseCard
                  course={course}
                  href={`/courses/${course.slug?.current}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Experience Section */}
      <section className="py-20 bg-muted/20 border-t border-border/40 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex justify-center gap-1 text-amber-500">
              <Star className="h-5 w-5 fill-amber-500" />
              <Star className="h-5 w-5 fill-amber-500" />
              <Star className="h-5 w-5 fill-amber-500" />
              <Star className="h-5 w-5 fill-amber-500" />
              <Star className="h-5 w-5 fill-amber-500" />
            </div>
            
            <div className="relative">
              <Quote className="absolute -top-6 -left-6 h-12 w-12 text-primary/10" />
              <p className="text-2xl md:text-3xl font-medium tracking-tight text-foreground relative z-10 italic">
                "Damara Surf Tutorials transformed my popup technique in less than a week. The video analysis and detailed wave dynamics lectures are second to none!"
              </p>
            </div>

            <div>
              <p className="font-bold text-foreground text-lg">Keanu Henderson</p>
              <p className="text-sm text-muted-foreground">Intermediate Surfer — Uluwatu, Bali</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
