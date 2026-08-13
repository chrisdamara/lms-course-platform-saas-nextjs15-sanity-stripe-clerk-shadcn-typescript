export interface EnrollmentPlan {
  id: string;
  title: string;
  subtitle: string;
  price?: number;
  trial?: string;
  featured?: boolean;
  badge?: string;
  buttonText: string;
  features?: string[];
}
