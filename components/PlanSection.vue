<script setup>
import featureData from '@/static/features.json';
import { usePlanStore } from "@/stores/plan";
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const planStore = usePlanStore();
const router = useRouter();
const auth = useAuthStore();
const subscriptionStore = useSubscriptionStore();

const plans = computed(() => planStore.getActivePlans);
const isAuthenticated = computed(() => auth.isAuthenticated);
const selectedPlan = computed(() => planStore?.getSelectedPlan);
const hasSubscription = computed(() => subscriptionStore.hasSubscription);
const InActivePlans = computed(() => planStore.getInActivePlans);
const { basic_features, standard_features, premium_features } = readonly(featureData.features);


const startChecking = (plan) => {
  planStore.setSelectedPlan(plan);
  isAuthenticated ?
    router.push("/payment/checkout") : router.push("/auth/login");
};

onMounted(async () => {
  if (!planStore.plansFetched) {
    await planStore.fetchPlans();
  }
});

</script>

<template>
  <div class="flex flex-col items-stretch justify-center gap-4 md:flex-row md:gap-8 lg:gap-x-5"
    style="min-height: 500px;">

    <div v-if="hasSubscription?.active" v-for="plan in InActivePlans" :key="plan.plan_code"
      class="items-center border-2 border-[#0F1829] rounded-3xl px-[2.1rem] py-6 w-[22rem]"
      :class="[plan.plan_code === 'premium' ? 'bg-[#0F1829] text-white' : 'bg-white text-[#0F1829]']">
      <div class="flex items-center justify-between">
        <h1 class="px-2 text-lg font-bold"
          :class="[plan.plan_code === 'premium' ? 'text-[#FF7400]' : 'text-[#0F1829]']">
          {{ plan.name }}
        </h1>
      </div>
      <div class="flex flex-row items-center justify-start mt-6 space-x-4">
        <div class="flex flex-row items-start justify-center">
          <h3 class="text-5xl">
            {{ plan?.currency?.symbol + (plan.plan_code === "single-offer" ? plan.amount_premium : plan.amount_trial) }}
          </h3>
        </div>
        <div class="flex flex-col justify-end leading-tight translate-y-1">
          <span class="text-[0.8rem] font-thin">per user</span>
          <span class="text-[0.8rem] font-thin">per month</span>
        </div>
      </div>
      <h1 class="text-sm font-thin mt-7">Get
        <span class="font-bold">{{ plan.reports_count }}</span> checks on this offer
      </h1>
      <button @click.stop="startChecking(plan)"
        class="bg-[#0F1829] text-lg px-4 py-2 rounded-lg mt-6 block w-full text-white" :class="{
          'bg-[#FF7400]': plan.plan_code === 'premium',
          'bg-[#0F1829]': plan.plan_code !== 'premium'
        }">Start Checking</button>
      <a href="#report-offering" class="block w-full px-4 py-2 mt-2 text-lg text-center border rounded-lg" :class="{
        'border-white text-white': plan.plan_code === 'premium',
        'border-[#0F1829]': plan.plan_code !== 'premium'
      }">Read More</a>
      <h2 class="mt-12 text-xl">Included</h2>
      <p class="text-sm font-thin">What's included with our plan</p>

      <div class="flex flex-col items-start justify-start mt-2 gap-x-2 gap-y-3">
        <div v-for="premium_feature in premium_features" :key="premium_feature.id"
          class="flex flex-row items-center justify-start">
          <img :src="`/assets/svg/orange/${premium_feature.icon}`" :alt="premium_feature.title || 'Check Mark'"
            class="w-4" />
          <h3 :class="{
            'text-white': selectedPlan === plan.plan_code,
            'text-[#0F1829]': selectedPlan !== plan.plan_code,
            'text-white': plan.plan_code === 'premium',
          }" class="text-[#0F1829] text-sm ml-2">{{ premium_feature.title }}</h3>
        </div>
      </div>
    </div>

    <div v-else v-for="plan in plans" :key="plan.plan_code"
      class="items-center border-2 border-[#0F1829] rounded-3xl px-[2.1rem] py-6 w-full"
      :class="[plan.plan_code === 'premium' ? 'bg-[#0F1829] text-white' : 'bg-white text-[#0F1829]']">
      <div class="flex items-center justify-between">
        <h1 class="px-2 text-lg font-bold"
          :class="[plan.plan_code === 'premium' ? 'text-[#FF7400]' : 'text-[#0F1829]']">
          {{ plan.name }}
        </h1>

        <div v-if="plan.plan_code === 'premium'"
          class="text-[0.5rem] font-bold bg-primary text-[#0F1829] px-2 py-[0.2rem] rounded">
          Most popular
        </div>
      </div>
      <div class="flex flex-row items-center justify-start mt-6 space-x-4">

        <div class="flex flex-row items-start justify-center">
          <h3 class="text-5xl">{{ plan?.currency?.symbol + plan.amount_trial }}</h3>
        </div>

        <div class="flex flex-col justify-end leading-tight translate-y-1">
          <span class="text-[0.8rem] font-thin">per user</span>
          <span class="text-[0.8rem] font-thin">per month</span>
        </div>
      </div>
      <h1 class="text-sm font-thin mt-7">Get
        <span class="font-bold"> {{ plan.reports_count }}</span> checks on this offer
      </h1>
      <button @click.stop="startChecking(plan)"
        class="bg-[#0F1829] text-lg  px-4 py-2 rounded-lg mt-6 block w-full text-white" :class="{
          'bg-[#FF7400]': plan.plan_code === 'premium',
          'bg-[#0F1829]': plan.plan_code !== 'premium'
        }">Start Checking</button>
      <a href="#report-offering" class="block w-full px-4 py-2 mt-2 text-lg text-center border rounded-lg" :class="{
        'border-white text-white': plan.plan_code === 'premium',
        'border-[#0F1829]': plan.plan_code !== 'premium'
      }">Read
        More</a>
      <h2 class="mt-12 text-xl ">Included</h2>
      <p class="text-sm font-thin ">What’s included with our plan</p>

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

</template>