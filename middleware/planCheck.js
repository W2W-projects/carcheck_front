import { usePlanStore } from "~/stores/plan";

export default defineNuxtRouteMiddleware((to, next)=>{
    const planStore = usePlanStore();

    if(!planStore.getSelectedPlan){
        return navigateTo("/pricing");
    }
})