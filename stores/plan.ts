import { defineStore } from "pinia";
import ApiService from "~/services/apiService";
import type { ApiDataResponse, Plan } from "~/types/models";

interface PlanState {
  selectedPlan: Plan | null;
  plans: Plan[];
  plansLoaded: boolean;
  plansRequest: Promise<Plan[]> | null;
}

export const usePlanStore = defineStore("plan", {
  state: (): PlanState => ({
    selectedPlan: null,
    plans: [],
    plansLoaded: false,
    plansRequest: null,
  }),

  persist: {
    pick: ["selectedPlan", "plans"],
  },

  getters: {
    getSelectedPlan: (state): Plan | null => state.selectedPlan,
    getPlans: (state): Plan[] => state.plans,
    getActivePlans: (state): Plan[] => state.plans.filter((plan) => plan.status === "active"),
    getInActivePlans: (state): Plan[] =>
      state.plans.filter((plan) => plan.status !== "active"),
    getSubsPrice: (state): string => {
      const activePlan = state.plans.find((plan) => plan.status === "active");
      return activePlan ? `${activePlan.currency.symbol}${activePlan.amount_premium}` : "";
    },
  },

  actions: {
    setSelectedPlan(plan: Plan | null): void {
      this.selectedPlan = plan;
    },

    async fetchPlans(): Promise<Plan[]> {
      if (this.plansLoaded) return this.plans;

      if (!this.plansRequest) {
        this.plansRequest = ApiService.get<ApiDataResponse<Plan[]>>("plans")
          .then((response) =>
            response.data.sort(
              (first, second) => Number(first.amount_trial) - Number(second.amount_trial),
            ),
          )
          .finally(() => {
            this.plansRequest = null;
          });
      }

      this.plans = await this.plansRequest;
      this.plansLoaded = true;
      return this.plans;
    },
  },
});
