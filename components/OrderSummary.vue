<script setup>
import { usePlanStore } from '@/stores/plan';
const planStore = usePlanStore();
const selectedPlan = computed(() => planStore.getSelectedPlan);

const planPrice = computed(() => {
    const plan = selectedPlan.value;
    if (!plan) return '0';
    return `${plan.currency?.symbol || '£'}${plan.plan_code === 'single-offer' ? plan.amount_premium : plan.amount_trial}`;
});

const includedData = [{
    icon: 'damage-check.svg',
    text: 'Damage check',
    order: 'order-2 lg:order-none'
}, {
    icon: 'milage-history.svg',
    text: 'Mileage History',
    order: 'order-4 lg:order-none'
}, {
    icon: 'mot-history.svg',
    text: 'MOT Check',
    order: 'order-1 lg:order-none'
}, {
    icon: 'owner-history.svg',
    text: 'Owners History',
    order: 'order-3 lg:order-none'
}, {
    icon: 'theft-check.svg',
    text: 'Stolen check',
    order: 'order-5 lg:order-none'
}];

</script>
<template>
    <div class="flex flex-col h-full text-black">
        <h1 class="hidden lg:block lg:text-[44px] lg:leading-[1.2]">Your report <span class="font-bold">is waiting for you !</span></h1>
        <div class="mt-0 space-y-[0.18rem] lg:mt-5 lg:space-y-2">
            <p class="pl-[7px] text-[21px] font-light leading-[1.2] lg:pl-0 lg:text-[25px]">You selected :</p>
            <div
                class="relative left-[3px] grid h-[100px] w-[calc(100%_-_1px)] grid-cols-2 px-5 py-5 space-x-2 text-white bg-brand rounded-[14px] lg:left-0 lg:h-[7.375rem] lg:w-96 lg:px-9 lg:py-6 lg:rounded-[16px]">
                <img src="/images/png/checkout-traffic-cone.png"
                    class="absolute top-[-35px] right-0 object-contain w-[72px] h-14 lg:top-[-30px]" alt="">
                <div class="flex flex-col justify-center">
                    <p class="text-[17px] font-bold leading-5 text-[#733500] lg:text-xl lg:leading-6">{{ selectedPlan?.name || 'Plan' }}</p>
                    <div class="mt-0.5">
                        <p class="text-[13.5px] leading-3 lg:text-[16px] lg:leading-[14px]">Generate up to</p>
                        <p class="text-[24px] leading-5 font-bold lg:text-[28px] lg:leading-6">{{ selectedPlan?.reports_count ?? 0 }} reports</p>
                    </div>
                </div>
                <div class="flex flex-col items-center justify-center">
                    <p class="text-5xl font-medium leading-[0.9]">{{ planPrice }}</p>
                    <p class="mt-1 text-[17px] leading-none uppercase"><span class="font-bold">48H</span> <span
                            class="font-light">Access</span></p>
                </div>
            </div>
        </div>

        <div class="mt-4 space-y-1 lg:mt-6">
            <h3 class="text-2xl font-bold">Included</h3>
            <p class="lg:text-lg lg:leading-none">What’s included with our plan</p>
            <div class="grid w-full grid-cols-1 gap-y-0 pt-3 pl-[21px] lg:w-[83%] lg:grid-cols-3 lg:gap-1 lg:pt-1 lg:pl-0">
                <div v-for="included in includedData" :key="included.text" :class="included.order"
                    class="flex items-center h-9 px-2 space-x-2.5 text-lg lg:h-10 lg:space-x-4">
                    <div>
                        <img :src="`/assets/svg/orange/${included.icon}`" class="w-6 h-6 object-contain" alt="">
                    </div>
                    <div class="flex-1">{{ included.text }}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped></style>
