// app/checkout/success/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import stripe from "@/lib/stripe";
import { getEnrolledCourses } from "@/sanity/lib/student/getEnrolledCourses";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    // ✅ Step 1: Next.js automatically extracts session_id from URL
    const params = await searchParams;
    const sessionId = params.session_id;

    // ✅ Step 2: Validate we have a session_id
    if (!sessionId) {
        redirect('/');
    }

    // ✅ Step 3: Get the current user
    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-in');
    }

    try {
        // ✅ Step 4: Use session_id to fetch payment details from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // ✅ Step 5: Verify this session belongs to the user
        if (session.metadata?.userId !== userId) {
            redirect('/');
        }

        // ✅ Step 6: Get the enrolled courses (webhook already created these)
        const enrolledCourses = await getEnrolledCourses(userId);

        // ✅ Step 7: Display the success page
        return (
            <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
                <Card className="max-w-2xl w-full border-2 border-green-500/20 shadow-xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-10 w-10 text-green-500" />
                        </div>
                        <CardTitle className="text-3xl font-bold">
                            Payment Successful! 🎉
                        </CardTitle>
                        <CardDescription>
                            Your enrollment has been confirmed.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="bg-muted/30 rounded-lg p-4">
                            <p className="text-sm text-muted-foreground">
                                Payment ID (for your records): <span className="font-mono">{sessionId}</span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Amount Paid: <span className="font-semibold">
                                    ${((session.amount_total || 0) / 100).toFixed(2)}
                                </span>
                            </p>
                        </div>

                        {/* Display enrolled courses */}
                        {enrolledCourses.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="font-semibold">Your Courses:</h3>
                                {enrolledCourses.map((enrollment: any) => (
                                    <div key={enrollment.course._id} className="p-3 border rounded-lg">
                                        {enrollment.course.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>

                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href="/my-courses">
                                Start Your Course!
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    } catch (error) {
        console.error("Error loading success page:", error);
        redirect('/my-courses');
    }
}
