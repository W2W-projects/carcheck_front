import { usePlanStore } from "~/stores/plan";

export default defineNuxtRouteMiddleware((to, next)=>{
    const planStore = usePlanStore();
    debugger
    if(!planStore.getSelectedPlan){
        return navigateTo("/payment/plans");
    }
})