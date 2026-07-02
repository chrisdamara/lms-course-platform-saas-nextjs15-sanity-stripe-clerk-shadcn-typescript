import Image from "next/image";
import { defineField, defineType } from "sanity";

export const enrollmentType = defineType({
  name: "enrollment",
  title: "Enrollment",
  type: "document",
  fields: [
    defineField({
      name: "student",
      title: "Student",
      type: "reference",
      to: [{ type: "student" }],
      validation: (rule) => rule.required(),
    }),
      defineField({
       name: "courses",
       title: "Courses",
       type: "array",
       of: [{ type: "reference" , to: [{ type: "course" }] }],
       validation: (rule) => rule.required().min(1),
      }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "number",
      validation: (rule) => rule.required().min(0),
      description: "The amount paid for the course enrollment in cents",
    }),
    defineField({
      name: "paymentId",
      title: "Payment ID",
      type: "string",
      validation: (rule) => rule.required(),
      description: "The Stripe payment/checkout session ID",
    }),
    defineField({
      name: "enrolledAt",
      title: "Enrolled At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      courses: "courses",
      studentFirstName: "student.firstName",
      studentLastName: "student.lastName",
      studentImage: "student.imageUrl",
    },
    prepare({ courses, studentFirstName, studentLastName, studentImage }) {
      const courseTitles = courses.map((c: { title: string }) => c.title).join(", ") || "No courses yet"
        return {
        title: `${studentFirstName} ${studentLastName}`,
        subtitle: courseTitles,
        media: (
          <Image
            src={studentImage}
            alt={`${studentFirstName} ${studentLastName}`}
            width={100}
            height={100}
          />
        ),
      };
    },
  },
});
