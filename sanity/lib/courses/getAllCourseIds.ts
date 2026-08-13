'use server'

import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export default async function getAllCourseIds() {
  const getAllCourseIdsQuery = defineQuery(`*[_type == "course"] {_id}`);

  const courseIds = await sanityFetch({ query: getAllCourseIdsQuery });
  return courseIds.data;
}
