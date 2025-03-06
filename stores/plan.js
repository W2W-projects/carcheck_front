import ApiService from "@/services/apiService";
import { defineStore } from "pinia";

export const usePlanStore = defineStore('plan', {
    state: () => ({
        selectedPlan: null,
        userPlan: null,
        plans: [],
    }),
    persist: {
        paths: ["selectedPlan", "userPlan", "plans"]
    },
    getters: {
        getSelectedPlan: (state) => state.selectedPlan,
        getPlans: (state) => state.plans,
        getPricingPlans: (state) => state.plans.filter(plan => plan.plan_code !== 'single-offer'),
        getActivePlans: (state) => state.plans.filter(plan => plan.status === 'active'),
        getInActivePlans: (state) => state.plans.filter(plan => plan.status !== 'active'),
        getSubsPrice: (state) => {
            const activePlan = state.plans.find(plan => plan.status === 'active');
            return activePlan ? `${activePlan.currency.symbol}${activePlan.amount_premium}` : '';
        },
        getFullFeatures: (state) => {
            if (!state.plans.length) return [];

            const featureCount = state.plans.reduce((counts, plan) => {
                (plan.features || []).forEach(feature => {
                    counts[feature] = (counts[feature] || 0) + 1;
                });
                return counts;
            }, {});

            const allFeatures = [...new Set(state.plans.reduce((features, plan) =>
                [...features, ...(plan.features || [])], []))];

            return allFeatures.sort((a, b) => featureCount[b] - featureCount[a]);
        }
        ,
        plansFetched: (state) => state.plans.length > 0,
    },
    actions: {
        setSelectedPlan(plan) {
            this.selectedPlan = plan;
        },
        async fetchPlans() {
            try {
                const response = await ApiService.get(`plans`);
                if (response.data) {
                    this.plans = response.data.sort((a, b) => a.amount_trial - b.amount_trial);
                }
                return response;
            } catch (error) {
                console.error("Failed to fetch plans:", error);
                throw error;
            }
        }
    },
})
