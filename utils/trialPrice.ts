import type { Plan } from "~/types/models";

export function trialPrice(plans: Plan[], code: string): string | null {
  const plan = plans.find((item) => item.status === "active" && item.plan_code === code);
  return plan?.currency?.symbol && plan.amount_trial != null
    ? `${plan.currency.symbol}${plan.amount_trial}`
    : null;
}
