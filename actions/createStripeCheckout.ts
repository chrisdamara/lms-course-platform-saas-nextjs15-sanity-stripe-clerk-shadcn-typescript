"use server";

import stripe from "@/lib/stripe";
import baseUrl from "@/lib/baseUrl";

import { urlFor } from "@/sanity/lib/image";
import getCourseById from "@/sanity/lib/courses/getCourseById";
import { createStudentIfNotExists } from "@/sanity/lib/student/createStudentIfNotExists";
import { clerkClient } from "@clerk/nextjs/server";
import { createEnrollment } from "@/sanity/lib/student/createEnrollment";

import { LineItem } from '@/types/stripe-checkout'
import { Course } from '@/types/courses'

const throwIncompleteDataError = (course: Course) => {
    console.error("Course minimal data incomplete for: ", course);
    throw new Error("Course title or slug is missing")
}

const makeLineItem = (course: Course, options = { currency: 'usd' }): LineItem => {
    const { title, description, image, price, slug } = course
    let img = undefined
    try {
        if (image) img = urlFor(image).url()
    } catch { /* intentionally unhandled */ }

    if (!title || !slug?.current) throwIncompleteDataError(course)

    const productData = {
        name: title,
        description,
        image: img,
    }
    return {
        price_data: {
            currency: options.currency,
            product_data: productData,
            unit_amount_in_cents: Math.round(price * 100)
        },
        quantity: 1
    }
}
const makeSummary = (lineItems: LineItem[]) => {
    const totalPriceInCents = lineItems.reduce((accumulator, { price_data }) => accumulator + price_data.unit_amount_in_cents, 0)
    return {
        total_price_whole_currency: totalPriceInCents / 100,
        total_items: lineItems.length,
    }
}
const makeLineItems = (courses: Course[]) => {
    const lineItems = courses.map(course => makeLineItem(course))
    const summary = makeSummary(lineItems)
    return {
        line_items: lineItems,
        summary
    }
}
const getCourses = async(courseIds: string[]) => {
    console.log("Fetching course from Sanity...");
    const getCoursesPromises = await Promise.allSettled(courseIds.map(id => getCourseById(id)))
    if (getCoursesPromises.some(promise => promise.status !== 'fulfilled' || !promise?.value)) {
        console.error("Error loading one of these courses: ", courseIds)
        throw new Error("We couldn't find 1 or more of the courses that you are looking for")
    }
    const courses =  getCoursesPromises.map(promise => {
        if (promise.status !== 'rejected') return promise.value
    })
    if (!courses.length) {
        console.error("Courses not found");
        throw new Error("Courses not found");
    }
    console.log("Courses fetched")
    return courses

}

export async function createStripeCheckout(courseIds: string[], userId: string) {
  try {
    console.log("=== Starting createStripeCheckout ===");
    console.log("courseIds:", courseIds);
    console.log("userId:", userId);
    console.log("baseUrl:", baseUrl);

    // 1. Query course details from Sanity
    const courses = await getCourses(courseIds)
    const courseSlugs = courses.map((course) => course?.slug)
    if (!courseSlugs.some(s => !s?.current)) {
      console.error("Course minimal data incomplete:");
      throw new Error("Course title or slug is missing");
    }

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
    const lineItems = makeLineItems(courses as Course[]);

    // if course is free, create enrollment and redirect to course page (BYPASS STRIPE CHECKOUT)
    if (lineItems.summary.total_price_whole_currency === 0) {
      console.log("Free course - creating enrollment directly");
        await createEnrollment({
        studentId: user._id,
        courseIds: courseIds.map(courseId => courseId),
        paymentId: "free",
        amount: 0,
      });

      return { url: `/courses/${courseSlugs[0]?.current}` };
    }

    // 3. Create and configure Stripe Checkout Session with course details
    console.log("Creating Stripe checkout session...");
    console.log("Stripe key exists:", !!process.env.STRIPE_SECRET_KEY);
    
    const session = await stripe.checkout.sessions.create({
      ...lineItems,
      mode: "payment",
      success_url: `${baseUrl}/courses/${courseSlugs[0]?.current}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/courses/${courseSlugs[0]?.current}?canceled=true`,
      metadata: {
        courseIds: JSON.stringify(courseIds),
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
