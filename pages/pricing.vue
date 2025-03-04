<script setup>
import { usePlanStore } from '@/stores/plan';
import { onMounted, ref } from 'vue';

import pricingData from '@/static/pricing';

definePageMeta({
  title: 'Plans for Checkout',
  meta: [
    { hid: 'Plans for checkout', name: 'Plans for Checkout', content: 'Plans for Checkout' }
  ],
});

const planStore = usePlanStore();

const plans = ref([]);
const showLoader = ref(false);
const subsPrice = planStore.getSubsPrice;

onMounted(async () => {
  showLoader.value = true;
  await planStore.fetchPlans();

  // plans
  plans.value = planStore.getActivePlans
    .map(item => ({
      ...item,
      price: (parseFloat(item.amount_premium) / 100).toFixed(2)
    }));


  showLoader.value = false;
});


function replaceText(text) {
  let x = text.toLowerCase();
  let replaced = x.replace(/subscription/g, 'report')
  if (!replaced.includes('report')) {
    replaced += ' report';
  }
  return replaced;
}


</script>
<template>
  <!-- intro -->
  <section class="flex flex-wrap items-center justify-center mx-auto lg:px-[9.12rem] px-8 panoramic-bg">
    <div
      class="flex flex-col lg:items-start items-center lg:text-start text-center justify-center w-full h-[23rem] car-bg">
      <p class="text-[2.8rem] leading-tight tracking-wider -translate-y-4 text-black">Just choose
        <br />
        <span class="text-[3rem] tracking-wide"><b>the best report</b> for you</span>
      </p>
      <div class="flex flex-col items-center justify-center space-y-4 -translate-y-4">
        <p class="text-[1.8rem] tracking-wider text-[#2464A6]">We run the checks</p>
        <div class="mx-auto">
          <svg class="animate-pulse" width="48" height="62" viewBox="0 0 48 62" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24 24C22.0617 24 20.1234 23.2463 18.6559 21.7668L0.60225 3.56615C-0.20075 2.75661 -0.20075 1.41669 0.60225 0.607153C1.40525 -0.202384 2.73435 -0.202384 3.53735 0.607153L21.591 18.8078C22.9201 20.1477 25.0799 20.1477 26.409 18.8078L44.4626 0.607153C45.2656 -0.202384 46.5947 -0.202384 47.3977 0.607153C48.2007 1.41669 48.2007 2.75661 47.3977 3.56615L29.3441 21.7668C27.8766 23.2463 25.9383 24 24 24Z"
              fill="#2464A6" />
            <path
              d="M24 43C22.0617 43 20.1234 42.2463 18.6559 40.7668L0.60225 22.5662C-0.20075 21.7566 -0.20075 20.4167 0.60225 19.6072C1.40525 18.7976 2.73435 18.7976 3.53735 19.6072L21.591 37.8078C22.9201 39.1477 25.0799 39.1477 26.409 37.8078L44.4626 19.6072C45.2656 18.7976 46.5947 18.7976 47.3977 19.6072C48.2007 20.4167 48.2007 21.7566 47.3977 22.5662L29.3441 40.7668C27.8766 42.2463 25.9383 43 24 43Z"
              fill="#2464A6" />
            <path
              d="M24 62C22.0617 62 20.1234 61.2463 18.6559 59.7668L0.60225 41.5662C-0.20075 40.7566 -0.20075 39.4167 0.60225 38.6072C1.40525 37.7976 2.73435 37.7976 3.53735 38.6072L21.591 56.8078C22.9201 58.1477 25.0799 58.1477 26.409 56.8078L44.4626 38.6072C45.2656 37.7976 46.5947 37.7976 47.3977 38.6072C48.2007 39.4167 48.2007 40.7566 47.3977 41.5662L29.3441 59.7668C27.8766 61.2463 25.9383 62 24 62Z"
              fill="#2464A6" />
          </svg>
        </div>
      </div>
    </div>
  </section>

  <!-- plan section -->
  <section class="mt-8 lg:px-[9rem] px-5">
    <PlanSection />
    <p class="text-[#0F1829] text-lg mt-12 px-3 tracking-wider text-justify">All plans include a 48hr trial
      subscription. After the
      trial, unless
      you
      cancel,
      the
      subscription will
      automatically renew at {{ subsPrice }} per month. You can cancel anytime. Feel free to contact us with any
      questions.</p>
  </section>

  <!-- trusted by -->
  <section>
    <TrustedBy class="mt-4" />
  </section>

  <section class="lg:px-[7.5rem] mt-[2.85rem] mb-[2.85rem]" id="report-offering">
    <table class="w-full text-black">
      <thead>
        <tr class="flex text-sm lg:text-xl">
          <th class="h-[3.26rem] flex items-center justify-center lg:w-[32.1%] w-[25%]"></th>
          <th class="h-[3.26rem] flex items-center justify-center rounded flex-1 border border-black text-[#0F1829]">
            Basic report</th>
          <th
            class="h-[3.26rem] flex items-center justify-center rounded flex-1 border border-primary bg-primary text-[#0F1829]">
            Premium
            report</th>
          <th
            class="h-[3.26rem] flex items-center justify-center rounded flex-1 border border-[#0F1829] bg-[#0F1829] text-white">
            Expert
            report</th>
        </tr>
      </thead>
      <tbody class="border-t border-gray-400">

        <!-- Pricing -->
        <tr class="flex text-sm lg:text-2xl">
          <td
            class="h-[4.65rem] flex items-center lg:justify-start justify-center lg:pl-[3.75rem] border-b border-gray-400 lg:w-[32.1%] w-[25%] text-center lg:text-start font-light">
            Pricing
          </td>
          <td v-for="(item, index) in plans" :key="item?.amount_trial"
            class="h-[4.65rem] flex items-center justify-center border-b border-l border-gray-400 flex-1">
            <p>
              {{ item.amount_trial && (item.currency.symbol + item.amount_trial) }}
            </p>
          </td>
        </tr>

        <!-- Quota -->
        <tr class="flex text-sm lg:text-2xl">
          <td
            class="h-[4.65rem] flex items-center lg:justify-start justify-center lg:pl-[3.75rem] border-b border-gray-400 lg:w-[32.1%] w-[25%] text-center lg:text-start font-light">
            Quota
          </td>
          <td v-for="(item, index) in plans" :key="item?.reports_count"
            class="h-[4.65rem] flex items-center justify-center border-b border-l border-gray-400 flex-1">
            <p>
              {{ item.reports_count || 0 }} Check{{ item.reports_count && item.reports_count !== 1 ?
                's'
                : '' }}
            </p>
          </td>
        </tr>

        <!-- Report Type -->
        <tr class="flex text-sm lg:text-2xl">
          <td
            class="h-[4.65rem] flex items-center lg:justify-start justify-center lg:pl-[3.75rem] border-b border-gray-400 lg:w-[32.1%] w-[25%] text-center lg:text-start font-light">
            Report Type
          </td>
          <td v-for="(item, index) in plans" :key="item?.name"
            class="h-[4.65rem] flex items-center justify-center border-b border-l border-gray-400 flex-1 capitalize">
            <p class="mx-auto text-center">{{ item?.name && replaceText(item.name) }}</p>
          </td>

        </tr>

        <!-- List -->
        <tr class="flex text-sm lg:text-2xl" v-for="data in pricingData" :key="data">
          <td
            class="h-[4.65rem] flex items-center lg:justify-start justify-center lg:pl-[3.75rem] border-b border-gray-400 lg:w-[32.1%] w-[25%] text-center lg:text-start font-light">
            {{ data.title }}
          </td>
          <td class="h-[4.65rem] flex items-center justify-center border-b border-l border-gray-400 flex-1">
            <span v-if="data.basic?.type === 'check'" v-show="data.basic.value">
              <img src="/images/svg/icon-check.svg" alt="">
            </span>
            <span v-else>{{ data.basic.value }}</span>
          </td>
          <td class="h-[4.65rem] flex items-center justify-center border-b border-l border-gray-400 flex-1">
            <span v-if="data.premium?.type === 'check'" v-show="data.premium.value">
              <img src="/images/svg/icon-check.svg" alt="">
            </span>
            <span v-else>{{ data.premium.value }}</span>
          </td>
          <td class="h-[4.65rem] flex items-center justify-center border-b border-l border-gray-400 flex-1">
            <span v-if="data.expert?.type === 'check'" v-show="data.expert.value">
              <img src="/images/svg/icon-check.svg" alt="">
            </span>
            <span v-else>{{ data.expert.value }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  <img src="/svg/plan-end-track.svg" alt="Plan End Track" class="w-full" />

</template>

<style scoped>
.panoramic-bg {
  background-image: url("/images/webp/panoramic-city.webp");
  background-size: 100%;
  background-position: bottom;
  background-repeat: no-repeat;
}

@media (min-width: 768px) {
  .car-bg {
    background-image: url("/images/webp/bg-pricing-car.webp");
    background-size: 65%;
    background-position: 103% 96%;
    background-repeat: no-repeat;
  }
}
</style>