import { Plan, PlanKey } from "@/types/plans";
import { Sparkles, Crown, Users } from "lucide-react";

const PLANS: Plan = {
  simple: {
    name: "Simple",
    hook: "Grow with specific skills",
    icon: Users,
    price: "£18",
    features: [
      "Full access to 1 full course",
      "Full access to specific premium lessons",
      "Access to monthly video analysis feedback sessions",
      "Join the community & discussions",
    ],
  },
  plus: {
    name: "Plus",
    hook: "Explore what the academy has to offer and advance quickly",
    price: "£50",
    icon: Sparkles,
    features: [
      "Send your videos and get personalised feedback every month",
      "Get full access to all courses",
      "Access 38+ premium lessons",
      "Interact in live chat during monthly video analysis sessions",
      "Pre-surf trip fitness program",
      "Full access to surfskate training tutorials",
      "Get 10% discount code for Dawn Patrol surf tracker app",
    ],
  },
  premium: {
    name: "Premium",
    icon: Crown,
    hook: "Private, personalised coaching. Get more waves and rip on your next trip",
    price: "£80",
    features: [
      "Get 1-to-1 online video analysis sessions twice per month",
      "Receive a personalised progression plan and follow up with our coaches",
      "Pre surf-trip support including program, preparation and board selection",
      "Get full access to all courses",
      "Access 38+ premium lessons",
      "Full access to monthly community video analysis sessions and forum",
      "Pre-surf trip fitness program",
      "Full access to surfskate training tutorials",
      "Get 10% discount code for Dawn Patrol surf tracker app",
    ]
  },
};

const ALL_COURSES_PLAN_KEYS = new Set([ 'plus', 'premium' ]);

export { PLANS, ALL_COURSES_PLAN_KEYS };
