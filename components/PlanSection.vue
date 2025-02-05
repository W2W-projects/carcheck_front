<script setup>
import { ref } from 'vue';
import { usePlanStore } from "@/stores/plan";
const planStore = usePlanStore();
const isMonthlyActive = ref(true);
const plans = ref([]);
import featureData from '@/features.json';

onMounted(async () => {
  await planStore.fetchPlans();
  plans.value = planStore.plans
    .map(item => ({
      ...item,
      price: (parseFloat(item.amount_premium) / 100).toFixed(2)
    }))
    .filter(item => item.status === "active");
});
console.log(plans.value);

const toggleBilling = (type) => {
  isMonthlyActive.value = (type === 'monthly');
};

const basic_features = reactive(featureData.features.basic_features);
const standard_features = reactive(featureData.features.standerd_features);
const premium_features = reactive(featureData.features.premium_features);

</script>

<template>
  <div class="bg-[#EEEEEE] mt-[6.75rem] lg:px-[10.7rem] md:px-44 px-10">
    <div class="flex flex-row items-center justify-between">
      <div>
        <h3 class="text-4xl text-gray-800 text-start">We have the best <br />
          <b> plans aro<span class="border-t-orange-500 border-t-4">un</span>d</b>
        </h3>
      </div>

      <div class="border-2 rounded-lg p-0.5 border-[#0F1829] text-xl tracking-wider ">
        <button :class="{ 'bg-[#0F1829] text-white': isMonthlyActive, 'text-[#0F1829]': !isMonthlyActive }"
          class="px-[1.1rem] py-2 rounded" @click="toggleBilling('monthly')">
          Monthly billing
        </button>
        <button :class="{ 'bg-[#0F1829] text-white': !isMonthlyActive, 'text-[#0F1829]': isMonthlyActive }"
          class="px-[1.1rem] py-2" @click="toggleBilling('yearly')">
          Yearly billing
        </button>
      </div>
    </div>
    <div class="flex md:flex-row flex-col items-stretch justify-center mt-14 gap-4 md:gap-8 lg:gap-x-5"
      style="min-height: 500px;">

      <div v-for="plan in plans" :key="plan.plan_code"
        class="items-center border-2 border-[#0F1829] rounded-3xl px-[2.1rem] py-6 w-full"
        :class="[plan.plan_code === 'premium' ? 'bg-[#0F1829] text-white' : 'bg-white text-[#0F1829]']">
        <h1 class="text-lg font-bold px-2"
          :class="[plan.plan_code === 'premium' ? 'text-[#FF7400]' : 'text-[#0F1829]']">{{
            plan.name }}</h1>
        <div class="flex flex-row items-center justify-start mt-6 space-x-4">
          <div class="flex flex-row items-start justify-center">
            <h3 class="text-5xl">£{{ plan.amount_trial }}</h3>
          </div>

          <div class="flex flex-col leading-tight justify-end translate-y-1">
            <span class="text-[0.8rem] font-thin">per user</span>
            <span class="text-[0.8rem] font-thin">per month</span>
          </div>
        </div>
        <h1 class="text-sm font-thin  mt-7">Generate up to <span class="font-bold"> 7 reports</span></h1>
        <button class="bg-[#0F1829] text-lg  px-4 py-2 rounded-lg mt-6 block w-full text-white" :class="{
          'bg-[#FF7400]': plan.plan_code === 'premium',
          'bg-[#0F1829]': plan.plan_code !== 'premium'
        }">Start Checking</button>
        <button class=" text-lg px-4 py-2 rounded-lg mt-2 border block w-full" :class="{
          'border-white text-white': plan.plan_code === 'premium',
          'border-[#0F1829]': plan.plan_code !== 'premium'
        }">Read
          More</button>
        <h2 class=" text-xl mt-12">Included</h2>
        <p class=" text-sm font-thin">What’s included with our plan</p>

        <div class="flex flex-col items-start justify-start mt-2 gap-x-2 gap-y-3 "
          v-if="plan.plan_code == '48h-expert-subscription'">
          <div v-for="b_feature in standard_features" :key="b_feature.id"
            class="flex flex-row items-center justify-start">
            <img :src="`/assets/svg/orange/${b_feature.icon}`" :alt="b_feature.title || 'Check Mark'" class="w-4" />
            <h3 :class="{
              'text-white': selectedPlan === plan.plan_code,
              'text-[#0F1829]': selectedPlan !== plan.plan_code,
              'text-white': plan.plan_code === 'premium',
            }" class="text-[#0F1829] text-sm ml-2">{{ b_feature.title }}</h3>
          </div>
        </div>

        <div class="flex flex-col items-start justify-start mt-2 gap-x-2 gap-y-3" v-if="plan.plan_code == 'premium'">
          <div v-for="premium_feature in premium_features" :key="premium_feature.id"
            class="flex flex-row items-center justify-start">
            <img :src="`/assets/svg/orange/${premium_feature.icon}`" :alt="premium_feature.title || 'Check Mark'"
              class="w-4 orange-filter" />
            <h3 :class="{
              'text-white': selectedPlan === plan.plan_code,
              'text-[#0F1829]': selectedPlan !== plan.plan_code,
              'text-white': plan.plan_code === 'premium',
            }" class="text-[#0F1829] text-sm ml-2">{{ premium_feature.title }}</h3>
          </div>
        </div>

        <div class="flex flex-col items-start justify-start mt-2 gap-x-2 gap-y-3 "
          v-if="plan.plan_code == '48h-basic-subscription'">
          <div v-for="b_feature in basic_features" :key="b_feature.id" class="flex flex-row items-center justify-start">
            <img :src="`../assets/svg/orange/${b_feature.icon}`" :alt="b_feature.title || 'Check Mark'" class="w-4" />

            <h3 :class="{
              'text-white': selectedPlan === plan.plan_code,
              'text-[#0F1829]': selectedPlan !== plan.plan_code,
              'text-white': plan.plan_code === 'premium',

            }" class="text-[#0F1829] text-sm ml-2">{{ b_feature.title }}</h3>
          </div>
        </div>




      </div>

    </div>

    <div class="w-full h-[23.5rem] bg-[#0F1829] mt-14 rounded-t-[27px] px-[4rem] flex flex-col justify-center">
      <p class="text-center text-3xl font-bold">Pick your <span class="text-[#FF7400]">ideal trial plan</span> above.
      </p>
      <p class="mt-8 text-xl font-extralight">After the 48-hour trial period expires, unless you cancel, you'll be
        upgraded to our
        monthly
        membership.</p>
      <p class="mt-10 text-2xl font-bold">This entitles you to make 7 full reports for £39.95 per month - only £5.70 per
        report!
      </p>
      <p class="mt-8 text-xl leading-6 font-extralight">Enjoy the benefits of your membership, which also includes
        ressources,
        reminders for
        saved
        vehicles and access
        to special offers. And don't worry if you run out - you can always purchase more reports with special
        members-only discounts.</p>
    </div>
  </div>
  <img src="/svg/plan-end-track.svg" alt="Plan End Track" class="w-full" />
</template>