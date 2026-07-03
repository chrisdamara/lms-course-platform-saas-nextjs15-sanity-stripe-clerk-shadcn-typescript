import { client } from "../adminClient";

interface CreateEnrollmentParams {
  studentId: string;
  courseIds: string[];
  paymentId: string;
  amount: number;
}

export async function createEnrollment({
  studentId,
  courseIds,
  paymentId,
  amount,
}: CreateEnrollmentParams) {
  const courses = courseIds.map(id => { return { _ref: id, _type: "reference" } })

    return client.create({
    _type: "enrollment",
    student: {
      _type: "reference",
      _ref: studentId,
    },
    courses,
    paymentId,
    amount,
    enrolledAt: new Date().toISOString(),
  });
}
