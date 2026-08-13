// app/checkout/success/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import stripe from "@/lib/stripe";
import { ArrowRight, CircleX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function UnsuccessfulPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const params = await searchParams;
    const sessionId = params.session_id;

    if (!sessionId) {
        redirect('/');
    }

    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-in');
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.metadata?.userId !== userId) {
            redirect('/');
        }

        return (
            <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
                <Card className="max-w-2xl w-full border-2 border-red-500/20 shadow-xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                            <CircleX className="h-10 w-10 text-red-500" />
                        </div>
                        <CardTitle className="text-3xl font-bold">
                            Payment Was Not Successful
                        </CardTitle>
                        <CardDescription>
                            Something went wrong with your payment.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="bg-muted/30 rounded-lg p-4">
                            <p className="text-sm text-muted-foreground">
                                (Failed) Payment ID (for your records): <span className="font-mono">{sessionId}</span>
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href="/">
                                Try Again
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    } catch (error) {
        console.error("Error loading unsuccessful payment page:", error);
        redirect('/');
    }
}
