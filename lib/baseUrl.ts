const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}` || process.env.NEXT_PUBLIC_BASE_URL
    : process.env.NEXT_PUBLIC_BASE_URL || "https://lms-course-platform-saas-nextjs15-s-orpin.vercel.app/";

export default baseUrl;
