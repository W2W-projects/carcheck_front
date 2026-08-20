import ApiService from "@/services/apiService";
import { defineStore } from "pinia";
import type { ApiDataResponse, CustomPlan } from "~/types/models";

export interface DiscountWidgetsState {
  customPlans: CustomPlan[];
}

export const useDiscountWidgetsStore = defineStore("discountWidgets", {
  state: (): DiscountWidgetsState => ({
    customPlans: [],
  }),
  getters: {
    getDiscountWidgets(state): CustomPlan[] {
      return state.customPlans;
    },
  },
  actions: {
    async fetchDiscountWidgets(): Promise<ApiDataResponse<CustomPlan[]>> {
      const response = await ApiService.get<ApiDataResponse<CustomPlan[]>>("custom-plans");
      this.customPlans = response.data;
      return response;
    },
  },
  persist: true,
});
