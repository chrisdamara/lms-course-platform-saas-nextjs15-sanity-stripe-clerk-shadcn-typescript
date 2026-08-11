import { NextResponse } from "next/server";
import getAllCourseIds from "@/sanity/lib/courses/getAllCourseIds"; // wherever fn live

export async function GET() {
  const courseIds = await getAllCourseIds();
  return NextResponse.json(courseIds.map(c => c._id));
}
