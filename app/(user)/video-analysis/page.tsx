import { Metadata } from "next";
import { Video, Sparkles, Send, Tv, MessageSquare, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Video Analysis & Live Coaching",
  description: "Get personalized surfing feedback from expert WSL coaches on our monthly live streams.",
};

export default function VideoAnalysisPage() {
  return (
    <main className="flex-1 min-h-screen bg-background">
      {/* Decorative ambient glows */}
      <div className="absolute top-0 left-1/4 -z-10 h-[300px] w-[600px] rounded-full bg-primary/10 opacity-30 blur-[100px]" />
      <div className="absolute top-1/4 right-1/4 -z-10 h-[300px] w-[500px] rounded-full bg-cyan-500/10 opacity-30 blur-[120px]" />

      <div className="container mx-auto px-4 py-20 max-w-5xl space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Exclusive Subscriber Feature
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
            Get Coached on Live Stream
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl">
            Upload your surfing footage and get precise, professional frame-by-frame critique and tailored drills during our monthly Live Video Analysis broadcasts.
          </p>
        </div>

        {/* Video Tutorial / Visual Explainer Placeholder */}
        <div className="relative aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden border border-border bg-card shadow-2xl flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200')" }} />
          <div className="h-16 w-16 rounded-full bg-primary/20 text-primary flex items-center justify-center animate-bounce">
            <Video className="h-8 w-8" />
          </div>
          <div className="z-10 max-w-md">
            <h3 className="text-xl font-bold">How live analysis works</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Watch this brief explainer on how to shoot, crop, and submit your wave clips to maximize your progression review.
            </p>
          </div>
        </div>

        {/* 3 Step Pipeline */}
        <div className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Your Progression Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/50 border border-border rounded-2xl p-6 relative space-y-4 shadow-sm">
              <div className="absolute top-4 right-4 text-5xl font-black text-muted-foreground/10">01</div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Send className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">1. Capture & Submit</h3>
              <p className="text-sm text-muted-foreground">
                Record your surfing (from beach or land). Upload your raw, unedited mp4 clips directly through your subscriber dashboard.
              </p>
            </div>

            <div className="bg-card/50 border border-border rounded-2xl p-6 relative space-y-4 shadow-sm">
              <div className="absolute top-4 right-4 text-5xl font-black text-muted-foreground/10">02</div>
              <div className="h-12 w-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <Tv className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">2. Monthly Live Streams</h3>
              <p className="text-sm text-muted-foreground">
                Join our premium interactive webcast. Coaches draw on-screen, slow down frames, and compare your body posture to the pros.
              </p>
            </div>

            <div className="bg-card/50 border border-border rounded-2xl p-6 relative space-y-4 shadow-sm">
              <div className="absolute top-4 right-4 text-5xl font-black text-muted-foreground/10">03</div>
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">3. Personalized Action Plan</h3>
              <p className="text-sm text-muted-foreground">
                Receive specific land-based and water drills based on your critique to lock in muscle memory and eliminate bad habits.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits & Submission Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-8 border-t border-border/60">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Guidelines for the Perfect Submission</h2>
            <p className="text-muted-foreground text-sm">
              Our expert coaches require high-quality video files to analyze your biomechanics accurately. Follow these simple tips to get the best results:
            </p>
            <ul className="space-y-3">
              {[
                "Film in Landscape mode, preferably at 1080p 60fps or higher.",
                "Capture the entire wave, including your takeoff, popup, and turns.",
                "Ensure the camera tracker follows you smoothly without excessive shaking.",
                "Keep clips shorter than 30 seconds to focus on key surf transitions."
              ].map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-card to-card/50 border border-border rounded-3xl p-8 space-y-6 shadow-lg">
            <h3 className="text-xl font-bold">Ready to take off?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Video feedback is widely proven as the fastest way to bridge the gap between intermediate struggle and effortless, flowing professional style.
            </p>
            <div className="space-y-3 pt-2">
              <Link
                href="/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/95 transition-all"
              >
                Submit Your Video
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-center text-xs text-muted-foreground">
                Next Live Analysis Broadcast: <span className="font-semibold text-foreground">First Saturday of the month, 10:00 AM UTC</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
