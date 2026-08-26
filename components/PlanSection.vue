<script setup>
import featureData from '@/static/features.json';
import { usePlanStore } from "@/stores/plan";
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const { home = false } = defineProps({ home: Boolean });

const planStore = usePlanStore();
const router = useRouter();
const auth = useAuthStore();
const subscriptionStore = useSubscriptionStore();

const plans = computed(() => planStore.getActivePlans);
const isAuthenticated = computed(() => auth.isAuthenticated);
const selectedPlan = computed(() => planStore?.getSelectedPlan);
const hasSubscription = computed(() => subscriptionStore.hasSubscription);
const subscriptionActive = computed(() => subscriptionStore.getSubscriptionStatus);
const InActivePlans = computed(() => planStore.getInActivePlans);
const { basic_features, standard_features, premium_features } = readonly(featureData.features);

const mobilePlans = computed(() => [
  '48h-basic-subscription',
  'premium',
  '48h-expert-subscription',
].map((planCode) => plans.value.find((plan) => plan.plan_code === planCode)).filter(Boolean));
const activeMobilePlan = ref(1);

const mobileFeatures = [
  { label: 'Damage check', icon: '/assets/svg/orange/damage-check.svg' },
  { label: 'Owners History', icon: '/assets/svg/orange/owner-history.svg' },
  { label: 'Mileage History', icon: '/assets/svg/orange/milage-history.svg' },
  { label: 'Stolen check', icon: '/assets/svg/orange/theft-check.svg' },
  { label: 'MOT Check', icon: '/assets/svg/orange/mot-history.svg' },
];


const startChecking = (plan) => {
  planStore.setSelectedPlan(plan);
  if (subscriptionActive?.value) {
    router.push({ path: '/', hash: '#check' });
  } else {
    isAuthenticated.value ? router.push("/payment/checkout") : router.push("/auth/login");
  }
};

onMounted(async () => {
  await planStore.fetchPlans();
});

</script>

<template>
  <div v-if="home" class="plan-mobile md:hidden">
    <article
      v-for="(mobilePlan, index) in mobilePlans"
      :key="mobilePlan.plan_code"
      class="plan-card"
      :class="{ 'plan-card--featured': activeMobilePlan === index }"
    >
      <button
        type="button"
        class="plan-toggle"
        :aria-expanded="activeMobilePlan === index"
        @click="activeMobilePlan = index"
      >
        <span class="plan-name">{{ mobilePlan.name }}</span>
        <span v-if="mobilePlan.plan_code === 'premium' && activeMobilePlan === index" class="plan-popular">Most popular</span>
        <img
          v-else
          src="/images/home/plan-chevron.svg"
          alt=""
          class="plan-chevron"
          :class="{ 'plan-chevron--open': activeMobilePlan === index }"
        >
      </button>

      <div class="plan-billing">
        <p class="plan-price">{{ (mobilePlan.currency?.symbol || '£') + mobilePlan.amount_trial }}</p>
        <p class="plan-cycle">per user<br>per month</p>
      </div>
      <p class="plan-limit">Generate up to <strong>10 reports</strong></p>
      <button type="button" class="plan-start" @click="startChecking(mobilePlan)">Start checking</button>

      <template v-if="activeMobilePlan === index">
        <h4>Included</h4>
        <p class="plan-included-copy">What’s included with our plan</p>
        <ul class="plan-features">
          <li v-for="feature in mobileFeatures" :key="feature.label">
            <img :src="feature.icon" alt="">
            <span>{{ feature.label }}</span>
          </li>
        </ul>
      </template>
    </article>
  </div>

  <div v-if="!home" class="pricing-plan-mobile md:hidden">
    <div class="pricing-billing" aria-label="Billing frequency">
      <span>Monthly billing</span>
      <span>Yearly billing</span>
    </div>

    <div class="pricing-report-list">
      <article
        v-for="mobilePlan in mobilePlans"
        :key="mobilePlan.plan_code"
        class="plan-card plan-card--featured pricing-report-card"
        :class="{ 'pricing-report-card--premium': mobilePlan.plan_code === 'premium' }"
      >
        <div class="plan-toggle">
          <h3 class="plan-name">{{ mobilePlan.name }}</h3>
          <span v-if="mobilePlan.plan_code === 'premium'" class="plan-popular">Most popular</span>
          <img v-else src="/images/home/plan-chevron.svg" alt="" class="plan-chevron">
        </div>

        <div class="plan-billing">
          <p class="plan-price">{{ (mobilePlan.currency?.symbol || '£') + mobilePlan.amount_trial }}</p>
          <p class="plan-cycle">per user<br>per month</p>
        </div>
        <p class="plan-limit">Generate up to <strong>10 reports</strong></p>
        <button type="button" class="plan-start" @click="startChecking(mobilePlan)">Start checking</button>

        <h4>Included</h4>
        <p class="plan-included-copy">What’s included with our plan</p>
        <ul class="plan-features">
          <li v-for="feature in mobileFeatures" :key="feature.label">
            <img :src="feature.icon" alt="">
            <span>{{ feature.label }}</span>
          </li>
        </ul>
      </article>
    </div>
  </div>

  <div class="hidden flex-col items-stretch justify-center gap-4 md:flex md:flex-row md:gap-8 lg:gap-x-5"
    style="min-height: 500px;">

    <!-- <div v-if="hasSubscription?.active" v-for="plan in InActivePlans" :key="plan.plan_code"
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
    </div> -->

    <div v-for="plan in plans" :key="plan.plan_code"
      class="items-center border-2 border-[#0F1829] rounded-3xl px-[2.1rem] py-6 w-full"
      :class="[plan.plan_code === 'premium' ? 'bg-[#0F1829] text-white' : 'bg-white text-[#0F1829]']">
      <div class="flex items-center justify-between">
        <h1 class="px-2 text-lg font-bold"
          :class="[plan.plan_code === 'premium' ? 'text-[#FF7400]' : 'text-[#0F1829]']">
          {{ plan.name }}
        </h1>

        <div v-if="plan.plan_code === 'premium'"
          class="text-[0.5rem] font-bold bg-brand text-[#0F1829] px-2 py-[0.2rem] rounded">
          Most popular
        </div>
      </div>
      <div class="flex flex-row items-center justify-start mt-6 space-x-4">

        <div class="flex flex-row items-start justify-center">
          <h3 class="text-5xl">{{ plan?.currency?.symbol + plan.amount_trial }}</h3>
        </div>

        <div class="flex flex-col justify-end leading-tight translate-y-1">
          <span class="text-[0.8rem] font-thin">48H</span>
          <span class="text-[0.8rem] font-thin">ACCESS</span>
        </div>
      </div>
      <h1 class="text-sm font-thin mt-7" v-if="plan.plan_code === '48h-expert-subscription'">
        Get premium reports on
        <span class="font-bold"> {{ plan.reports_count_trial }}</span> checks
      </h1>
      <h1 class="text-sm font-thin mt-7" v-else-if="plan.plan_code === 'premium'">
        Get a premium report for one check
      </h1>
      <h1 class="text-sm font-thin mt-7" v-else>
        Get a basic report for one check
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

<style scoped>
.pricing-plan-mobile {
  position: relative;
  width: 100%;
  height: 310.556cqw;
  color: #0f1829;
  font-family: "TT Norms Pro", sans-serif;
}

.pricing-billing {
  position: absolute;
  top: 0;
  left: 9.167cqw;
  display: flex;
  box-sizing: border-box;
  width: 43.386cqw;
  height: 6.646cqw;
  overflow: hidden;
  border: .177cqw solid #0f1829;
  border-radius: .878cqw;
  font-size: 2.617cqw;
  font-weight: 500;
  line-height: 6.292cqw;
  white-space: nowrap;
}

.pricing-billing span {
  flex: 1;
  text-align: center;
}

.pricing-billing span:first-child {
  flex: 0 0 22.822cqw;
  background: #0f1829;
  color: white;
}

.pricing-report-list {
  position: absolute;
  top: 13.611cqw;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 4.722cqw;
  width: 100%;
}

.pricing-report-card.plan-card--featured {
  flex: 0 0 95.833cqw;
  left: 8.056cqw;
  width: 81.667cqw;
  height: 95.833cqw;
  border: .278cqw solid #0f1829;
  background: white;
  box-shadow: none;
  color: #000;
  transition: none;
}

.pricing-report-card.plan-card--featured.pricing-report-card--premium {
  border: 0;
  background: #0f1829;
  box-shadow: 0 1.3cqw 1.3cqw rgb(0 0 0 / 24%);
  color: #eee;
}

.pricing-report-card.plan-card--featured .plan-name {
  left: 8.333cqw;
}

.pricing-report-card.plan-card--featured .plan-billing {
  left: 7.5cqw;
  gap: .833cqw;
}

.pricing-report-card.plan-card--featured .plan-chevron {
  top: 9.167cqw;
  right: 6.944cqw;
  width: 2.778cqw;
  height: 1.389cqw;
}

.plan-mobile {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2.778cqw;
  width: 100%;
  height: 178.611cqw;
  color: #0f1829;
  font-family: "TT Norms Pro", sans-serif;
}

.plan-card {
  position: relative;
  box-sizing: border-box;
  flex: 0 0 38.611cqw;
  left: 8.611cqw;
  width: 81.111cqw;
  height: 38.611cqw;
  border: .218cqw solid #0f1829;
  border-radius: 5.209cqw;
  background: white;
  transition: flex-basis .25s ease, width .25s ease, left .25s ease, background-color .25s ease;
}

.plan-card--featured {
  flex-basis: 95.833cqw;
  left: 8.056cqw;
  width: 81.667cqw;
  height: 95.833cqw;
  border: 0;
  background: #0f1829;
  box-shadow: 0 1.3cqw 1.3cqw rgb(0 0 0 / 24%);
  color: #eee;
}

.plan-name,
.plan-card p,
.plan-card h4 {
  position: absolute;
  margin: 0;
}

.plan-name {
  position: absolute;
  top: 5.556cqw;
  right: 11.944cqw;
  font-size: 4.407cqw;
  font-weight: 700;
  line-height: 1.2;
}

.plan-billing {
  position: absolute;
  top: 3.333cqw;
  left: 7.777cqw;
  display: flex;
  align-items: center;
  gap: 2cqw;
}

.plan-billing p {
  position: static;
}

.plan-price {
  font-size: 11.455cqw;
  font-weight: 500;
  line-height: 1.19;
}

.plan-cycle {
  font-size: 3.178cqw;
  font-weight: 400;
  line-height: 1.08;
}

.plan-limit {
  top: 16.944cqw;
  left: 9.167cqw;
  font-size: 3.178cqw;
  font-weight: 400;
  line-height: 1;
}

.plan-limit strong { font-weight: 700; }

.plan-start {
  position: absolute;
  top: 23.333cqw;
  left: 7.5cqw;
  width: 65.278cqw;
  height: 10.278cqw;
  padding: 0;
  border: 0;
  border-radius: 1.685cqw;
  background: #0f1829;
  color: white;
  font-size: 4.407cqw;
  font-weight: 700;
  line-height: 1;
}

.plan-toggle {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 23.333cqw;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
}

.plan-chevron {
  position: absolute;
  top: 7.222cqw;
  right: 6.667cqw;
  z-index: 1;
  width: 3.333cqw;
  height: 1.944cqw;
  color: #0f1829;
  transition: transform .2s ease;
}

.plan-chevron--open { transform: rotate(180deg); }

.plan-card--featured .plan-name {
  top: 6.588cqw;
  right: auto;
  left: 7.579cqw;
  color: #ff7400;
}

.plan-card--featured .plan-billing {
  top: 11.944cqw;
  left: 8.191cqw;
}

.plan-card--featured .plan-limit {
  top: 26.389cqw;
  left: 7.579cqw;
}

.plan-card--featured .plan-start {
  top: 33.889cqw;
  left: 7.222cqw;
  width: 66.111cqw;
  background: #ff7400;
}

.plan-popular {
  position: absolute;
  top: 7.714cqw;
  left: 58.333cqw;
  width: 15.014cqw;
  height: 3.875cqw;
  border-radius: 1.09cqw;
  background: #ff7400;
  color: #0f1829;
  font-size: 1.927cqw;
  font-weight: 700;
  line-height: 3.875cqw;
  text-align: center;
}

.plan-card--featured h4 {
  top: 46.944cqw;
  left: 7.222cqw;
  font-size: 5.515cqw;
  font-weight: 700;
  line-height: 1.2;
}

.plan-included-copy {
  top: 53.611cqw;
  left: 7.5cqw;
  font-size: 3.976cqw;
  line-height: 1;
}

.plan-features {
  position: absolute;
  top: 60.833cqw;
  left: 7.5cqw;
  margin: 0;
  padding: 0;
  list-style: none;
}

.plan-features li {
  position: relative;
  width: 52cqw;
  height: 5.54cqw;
}

.plan-features img {
  position: absolute;
  top: 0;
  left: 0;
  width: 5.594cqw;
  height: 4.853cqw;
  object-fit: contain;
}

.plan-features span {
  position: absolute;
  top: 0;
  left: 9.009cqw;
  font-size: 3.976cqw;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
}
</style>
