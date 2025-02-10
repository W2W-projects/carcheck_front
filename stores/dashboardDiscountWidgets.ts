import ApiService from "@/services/apiService";
import { defineStore } from "pinia";

export interface DiscountPlan {
  checkRequests: number | null;
  discountPercentage: number | null;
  amountPerCheck: number | null;
}

export interface DiscountWidgetsState {
  customPlans: DiscountPlan[];
}

export const useDiscountWidgetsStore = defineStore('discountWidgets', {
  state: (): DiscountWidgetsState => ({
    customPlans: [],
  }),
  getters: {
    getDiscountWidgets(state): DiscountPlan[] {
      return state.customPlans;
    },
  },
  actions: {
    async fetchDiscountWidgets() {
      try {
        const response = await ApiService.get('custom-plans');
        if (response.data) {
          this.customPlans = response.data;
        }
        return response;
      } catch (error) {
        console.error("Failed to fetch custom plans:", error);
        throw error;
      }
    }
  },
  persist: true,
});
