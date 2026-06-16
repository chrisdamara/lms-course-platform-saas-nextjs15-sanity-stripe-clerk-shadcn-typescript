"use server";

import stripe from "@/lib/stripe";
import baseUrl from "@/lib/baseUrl";

import { urlFor } from "@/sanity/lib/image";
import getCourseById from "@/sanity/lib/courses/getCourseById";
import { createStudentIfNotExists } from "@/sanity/lib/student/createStudentIfNotExists";
import { clerkClient } from "@clerk/nextjs/server";
import { createEnrollment } from "@/sanity/lib/student/createEnrollment";

export async function createStripeCheckout(courseId: string, userId: string) {
  try {
    console.log("=== Starting createStripeCheckout ===");
    console.log("courseId:", courseId);
    console.log("userId:", userId);
    console.log("baseUrl:", baseUrl);

    // 1. Query course details from Sanity
    console.log("Fetching course from Sanity...");
    const course = await getCourseById(courseId);
    console.log("Course fetched:", course ? "SUCCESS" : "FAILED");

    console.log("Fetching Clerk user...");
    const clerkClientInstance = await clerkClient();
    const clerkUser = await clerkClientInstance.users.getUser(userId);
    console.log("Clerk user fetched:", clerkUser ? "SUCCESS" : "FAILED");
    
    const { emailAddresses, firstName, lastName, imageUrl } = clerkUser;
    const email = emailAddresses?.[0]?.emailAddress || clerkUser.primaryEmailAddress?.emailAddress;

    if (!emailAddresses || !email) {
      console.error("User details not found");
      throw new Error("User details not found");
    }

    if (!course) {
      console.error("Course not found");
      throw new Error("Course not found");
    }

    // mid step - create a user in sanity if it doesn't exist
    console.log("Creating/fetching student in Sanity...");
    const user = await createStudentIfNotExists({
      clerkId: userId,
      email: email || "",
      firstName: firstName || email,
      lastName: lastName || "",
      imageUrl: imageUrl || "",
    });
    console.log("Student:", user ? "SUCCESS" : "FAILED");

    if (!user) {
      console.error("User not found after creation");
      throw new Error("User not found");
    }

    // 2. Validate course data and prepare price for Stripe
    console.log("Course price:", course.price);
    if (!course.price && course.price !== 0) {
      console.error("Course price is not set");
      throw new Error("Course price is not set");
    }
    const priceInCents = Math.round(course.price * 100);
    console.log("Price in cents:", priceInCents);

    // if course is free, create enrollment and redirect to course page (BYPASS STRIPE CHECKOUT)
    if (priceInCents === 0) {
      console.log("Free course - creating enrollment directly");
      await createEnrollment({
        studentId: user._id,
        courseId: course._id,
        paymentId: "free",
        amount: 0,
      });

      return { url: `/courses/${course.slug?.current}` };
    }

    const { title, description, image, slug } = course;

    if (!title || !slug?.current) {
      console.error("Course minimal data incomplete:", { title, slug });
      throw new Error("Course title or slug is missing");
    }

    const productData: any = {
      name: title,
    };

    if (description) {
      productData.description = description;
    }

    const courseImageUrl = image ? urlFor(image).url() : undefined;
    if (courseImageUrl) {
      productData.images = [courseImageUrl];
    }

    // 3. Create and configure Stripe Checkout Session with course details
    console.log("Creating Stripe checkout session...");
    console.log("Stripe key exists:", !!process.env.STRIPE_SECRET_KEY);
    
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: productData,
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/courses/${slug.current}`,
      cancel_url: `${baseUrl}/courses/${slug.current}?canceled=true`,
      metadata: {
        courseId: course._id,
        userId: userId,
      },
    });

    console.log("Stripe session created:", session.id);
    console.log("Session URL:", session.url);

    // 4. Return checkout session URL for client redirect
    return { url: session.url };
  } catch (error) {
    console.error("=== ERROR in createStripeCheckout ===");
    console.error("Error type:", error instanceof Error ? error.constructor.name : typeof error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Full error:", error);
    if (error instanceof Error && error.stack) {
      console.error("Stack trace:", error.stack);
    }
    throw error;
  }
}
