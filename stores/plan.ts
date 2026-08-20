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
    // Neither is persisted, so a page load fetches once and prices stay fresh.
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

    /**
     * One request per page load, however many components ask.
     *
     * The catalogue used to be fetched by whoever needed it: /pricing renders
     * <PlanSection />, which fetches, and then fetches again itself. A "have we got
     * plans yet" boolean cannot catch that - both hooks run before either response
     * lands - so callers share the in-flight promise instead.
     */
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
            // Cleared either way: a failed fetch has to be retryable.
            this.plansRequest = null;
          });
      }

      this.plans = await this.plansRequest;
      this.plansLoaded = true;
      return this.plans;
    },
  },
});
