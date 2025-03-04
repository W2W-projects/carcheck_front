<script setup>
import { usePlanStore } from '@/stores/plan';
import { features } from "~/static/orderSummary.json";
const planStore = usePlanStore();
const selectedPlan = planStore.selectedPlan;
const planFeatures = ref(null);

if (selectedPlan) {
    if (selectedPlan.plan_code === "48h-basic-subscription") {
        planFeatures.value = features.basic_extra_features;
    }
    else if (selectedPlan.plan_code === "48h-export-subscription") {
        planFeatures.value = features.export_extra_features;
    }
    else {
        planFeatures.value = features.single_offer_extra_features;
    }
}

const planPrice = computed(() => {
    const selectedPlan = planStore?.getSelectedPlan || 'basic';

    if (!selectedPlan) return '0';
    return selectedPlan.plan_code !== 'single-offer'
        ? selectedPlan.amount_trial
        : selectedPlan.amount_premium;
});

const includedData = [{
    icon: 'damage-check.svg',
    text: 'Damage check'
}, {
    icon: 'milage-history.svg',
    text: 'Mileage history'
}, {
    icon: 'mot-history.svg',
    text: 'MOT check'
}, {
    icon: 'owner-history.svg',
    text: 'Owners history'
}, {
    icon: 'theft-check.svg',
    text: 'Stolen check'
}];

</script>
<template>
    <div class="flex flex-col h-full text-black">
        <h1 class="md:text-5xl text-2xl">Your report <span class="font-bold">is waiting for you !</span></h1>
        <div class="lg:space-y-[1rem] space-y-[0.18rem] mt-5">
            <p class="md:text-[1.7rem] text-lg font-light">You selected:</p>
            <div
                class="grid grid-cols-2 bg-primary text-white md:w-[26.5rem] w-full md:pl-9 md:pr-8 px-5 md:py-6 py-5 space-x-2 rounded-xl">
                <div class="leading-3">
                    <p class="text-xl font-bold text-[#733500]">Basic plan</p>
                    <div class="md:leading-5 leading-6">
                        <p class="text-[0.9rem]">Generate up to</p>
                        <p class="text-[1.5rem] font-bold">10 reports</p>
                    </div>
                </div>
                <div class="flex items-center justify-center space-x-2">
                    <div>
                        <p class="text-3xl">£{{ planPrice || 5 }}
                        </p>
                    </div>
                    <div class="leading-[1.25rem] text-[0.89rem] font-light">
                        <p>per user</p>
                        <p>per month</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 space-y-1">
            <h3 class="text-2xl font-bold">Included</h3>
            <p>What's included with our plan</p>
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-1 md:w-[83%] w-full pt-1">
                <div v-for="(included, index) in includedData" :key="included"
                    class="flex items-center px-2 space-x-4 md:text-lg h-10">
                    <div>
                        <img :src="`/assets/svg/orange/${included.icon}`" alt="">
                    </div>
                    <div class="flex-1">{{ included.text }}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped></style>
