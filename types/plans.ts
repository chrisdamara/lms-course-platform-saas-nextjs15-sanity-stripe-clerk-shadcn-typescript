import { LucideIcon } from "lucide-react";

export type PlanKey = "simple" | "plus" | "premium";

export type Plan = Record<
  PlanKey,
  {
    name: string;
    price: string;
    hook: string;
    icon: LucideIcon;
    features: string[];
  }
>
