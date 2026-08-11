'use client';

import { startTransition, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Loader } from "@/components/ui/loader";

import { createStripeCheckout } from '@/actions/createStripeCheckout'
import { ALL_COURSES_PLAN_KEYS, PLANS } from "../plans"
import { PlanKey } from '@/types/plans'
import { useUser } from "@clerk/nextjs";

export default function EnrollmentPage() {
  const { courseId } = useParams()
  const { user } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<PlanKey | null>(null);
  const [hasError, setHasError] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const handleSelectedPlan = async () => {
        await handleCheckout(selectedPlan)
    }
    handleSelectedPlan()
  }, [selectedPlan])

  const fetchCourseIds = async () => {
    const res = await fetch("/api/courses");
    return await res.json();
  }

  const handleCheckout = async (planKey: PlanKey | null) => {
    startTransition(async () => {
      if (!planKey) return
      try {
        setHasError(false)
        if (!user?.id) throw new Error('could not complete checkout')

        let courseIds = []
        if (ALL_COURSES_PLAN_KEYS.has(planKey)) {
            courseIds = await fetchCourseIds()
        } else {
            courseIds = [ courseId ]
        }
        const session = await createStripeCheckout(courseIds, user.id)
        if (session?.url) {
          router.push(session.url);
        }
        } catch (error) {
            setHasError(true)
            setSelectedPlan(null)
            console.error("Error in enrollment: ", error);
            throw new Error("Failed to create checkout session: ", error as ErrorOptions)
        }
    })
  };

  return (
  <div className="min-h-screen bg-white dark:bg-gray-950">
    <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:py-16 lg:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl md:text-5xl">
        Honest, transparent pricing
      </h1>
      <span className="mt-2 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
        🎉 7 Day Free Trial Access
      </span>
      { hasError && (
        <h1 className="mt-2 rounded-full bg-red-200 px-4 py-1 text-sm font-semibold text-black dark:bg-red-900/30 dark:text-red-300">
            Sorry, we can't complete your transaction right now
        </h1>
      )
      }
    </div>

    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
        {Object.entries(PLANS).map(([key, plan]) => {
          const planKey = key as PlanKey;
          const features = PLANS[planKey].features;
          const Icon = plan.icon;
          const isPopular = planKey === "plus";

          return (
            <Card
              key={planKey}
              className={`relative flex flex-col overflow-hidden p-6 transition-all hover:shadow-lg ${
                isPopular
                  ? "border-2 border-blue-500 shadow-md dark:border-blue-400"
                  : "border border-gray-200 dark:border-gray-800"
              }`}
            >
              {selectedPlan === planKey ? (
                <div className="flex h-full flex-col items-center justify-center">
                    <Loader />
                    <h1 className='pt-2'>Taking you to checkout...</h1>
                </div>
              ) : (
                <>
                  {isPopular && (
                    <div className="absolute -right-8 top-5 rotate-45 bg-blue-500 px-8 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`rounded-full p-2 ${
                        isPopular
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                      {plan.name}
                    </h2>
                  </div>

                  <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    {plan.hook}
                  </p>

                  <div className="mb-6 flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900 dark:text-gray-50">
                      {plan.price}
                    </span>
                  </div>

                  <ul className="mb-8 flex-1 space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => setSelectedPlan(planKey)}
                    className={`w-full ${
                      isPopular
                        ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                        : "bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
                    } text-white`}
                    size="lg"
                  >
                    Choose Plan
                  </Button>
                </>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  </div>
);
}
