"use server";

import { ErrorResponse, Resend } from "resend";

export type EmailErrorResponse = ErrorResponse | null | string;

interface Response {
  success: boolean;
  error: EmailErrorResponse;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: SendEmailValues) {
  const { fromEmail, clientEmail, subject, template } = data

  if (!(clientEmail && fromEmail && template)) throw Error("Server error: Can't send email")

  let response: Response = { success: false, error: "Something went wrong" }

  try {
    const resendRes = await resend.emails.send({
      from: fromEmail,
      to: clientEmail,
      subject,
      template
    })

    response = { success: !resendRes?.error, error: resendRes?.error }
  } catch (e) {
    console.error(e);
  }

  return response;
}
