interface Template {
  id: string;
  variables: Record<string, string>;
}

interface SendEmailValues {
  clientEmail: string;
  fromEmail: string;
  subject: string;
  template: Template
}
