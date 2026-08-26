<script setup>
import { usePlanStore } from '@/stores/plan';
import { computed, onMounted, ref } from 'vue';

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
const subsPrice = computed(() => planStore.getSubsPrice);

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


</script>
<template>
  <!-- intro -->
  <section class="panoramic-bg pricing-hero" style="background-image: url('/images/webp/panoramic-city.webp')">
    <div class="pricing-mobile-city" aria-hidden="true">
      <img src="/images/webp/panoramic-city.webp" alt="">
    </div>
    <div class="pricing-hero-shell flex flex-wrap items-center justify-center mx-auto lg:px-[9.12rem] px-8 max-w-screen-2xl">
      <div
        class="pricing-hero-content flex flex-col lg:items-start items-center lg:text-start text-center justify-center w-full h-[23rem] car-bg"
        style="--car-bg: url('/images/webp/bg-pricing-car.webp')">
        <h1 class="pricing-hero-title text-[2.8rem] leading-tight tracking-wider -translate-y-4 text-black">
          <span>Just choose</span><br class="hidden md:block">
          <span class="text-[3rem] tracking-wide"><strong>the best report</strong> <span class="pricing-title-tail">for you</span></span>
        </h1>
        <div class="pricing-hero-run flex flex-col items-center justify-center space-y-4 -translate-y-4">
          <p class="pricing-hero-subtitle text-[1.8rem] tracking-wider text-[#2464A6]">We run the checks</p>
          <div class="pricing-hero-arrow mx-auto">
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
        <img class="pricing-hero-car" src="/images/webp/bg-pricing-car.webp" alt="">
      </div>
    </div>
  </section>

  <!-- plan section -->
  <section class="pricing-plans-section mt-8 lg:px-[9rem] px-5 mx-auto max-w-screen-2xl">
    <PlanSection />
    <p class="pricing-plans-note text-[#0F1829] text-lg mt-12 px-3 tracking-wider text-justify">All plans include a 48hr trial
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

  <section class="report-comparison lg:px-[7.5rem] mt-[2.85rem] mb-[2.85rem] mx-auto max-w-screen-2xl" id="report-offering">
    <table class="comparison-table w-full text-black">
      <thead>
        <tr class="flex text-sm lg:text-xl">
          <th class="comparison-logo h-[3.26rem] flex items-center justify-center lg:w-[32.1%] w-[25%]">
            <img class="md:hidden" src="/svg/logo.svg" alt="Car Check">
          </th>
          <th class="comparison-plan comparison-plan--basic h-[3.26rem] flex items-center justify-center rounded flex-1 border border-black text-[#0F1829]">
            <span class="md:hidden">Basic</span><span class="hidden md:inline">Basic report</span></th>
          <th
            class="comparison-plan comparison-plan--premium h-[3.26rem] flex items-center justify-center rounded flex-1 border border-brand bg-brand text-[#0F1829]">
            <span class="md:hidden">Premium</span><span class="hidden md:inline">Premium report</span></th>
          <th
            class="comparison-plan comparison-plan--expert h-[3.26rem] flex items-center justify-center rounded flex-1 border border-[#0F1829] bg-[#0F1829] text-white">
            <span class="md:hidden">Expert</span><span class="hidden md:inline">Expert report</span></th>
        </tr>
      </thead>
      <tbody class="border-t border-gray-400">

        <!-- Pricing -->
        <tr class="comparison-row comparison-row--pricing flex text-sm lg:text-2xl">
          <td
            class="comparison-label h-[4.65rem] flex items-center lg:justify-start justify-center lg:pl-[3.75rem] border-b border-gray-400 lg:w-[32.1%] w-[25%] text-center lg:text-start font-light">
            Pricing
          </td>
          <td v-for="(item, index) in plans" :key="item?.amount_trial"
            class="comparison-value h-[4.65rem] flex items-center justify-center border-b border-l border-gray-400 flex-1">
            <p>
              {{ item.amount_trial && (item.currency.symbol + item.amount_trial) }}
            </p>
          </td>
        </tr>

        <!-- Quota -->
        <tr class="comparison-row comparison-row--quota flex text-sm lg:text-2xl">
          <td
            class="comparison-label h-[4.65rem] flex items-center lg:justify-start justify-center lg:pl-[3.75rem] border-b border-gray-400 lg:w-[32.1%] w-[25%] text-center lg:text-start font-light">
            Checks quota
          </td>
          <td v-for="(item, index) in plans" :key="item?.reports_count"
            class="comparison-value h-[4.65rem] flex items-center justify-center border-b border-l border-gray-400 flex-1">
            <p>
              {{ String(item.reports_count_trial || 0).padStart(2, '0') }} Check{{ item.reports_count_trial === 1 ? '' : 's' }}
            </p>
          </td>
        </tr>

        <!-- Report Type -->
        <tr class="comparison-row comparison-row--type flex text-sm lg:text-2xl">
          <td
            class="comparison-label h-[4.65rem] flex items-center lg:justify-start justify-center lg:pl-[3.75rem] border-b border-gray-400 lg:w-[32.1%] w-[25%] text-center lg:text-start font-light">
            Type of report
          </td>
          <td v-for="(item, index) in plans" :key="item?.name"
            class="comparison-value h-[4.65rem] flex items-center justify-center border-b border-l border-gray-400 flex-1 capitalize">
            <p class="mx-auto text-center">{{ index === 0 ? 'Basic report' : 'Premium report' }}</p>
          </td>

        </tr>

        <!-- List -->
        <tr class="comparison-row flex text-sm lg:text-2xl" v-for="data in pricingData" :key="data">
          <td
            class="comparison-label h-[4.65rem] flex items-center lg:justify-start justify-center lg:pl-[3.75rem] border-b border-gray-400 lg:w-[32.1%] w-[25%] text-center lg:text-start font-light">
            {{ data.title === 'Vehicle Information' ? 'Vehicle Informations' : data.title }}
          </td>
          <td class="comparison-value h-[4.65rem] flex items-center justify-center border-b border-l border-gray-400 flex-1">
            <span v-if="data.basic?.type === 'check'" v-show="data.basic.value">
              <img class="comparison-check" src="/images/svg/icon-check.svg" alt="Included">
            </span>
            <span v-else>{{ data.basic.value }}</span>
          </td>
          <td class="comparison-value h-[4.65rem] flex items-center justify-center border-b border-l border-gray-400 flex-1">
            <span v-if="data.premium?.type === 'check'" v-show="data.premium.value">
              <img class="comparison-check" src="/images/svg/icon-check.svg" alt="Included">
            </span>
            <span v-else>{{ data.premium.value }}</span>
          </td>
          <td class="comparison-value h-[4.65rem] flex items-center justify-center border-b border-l border-gray-400 flex-1">
            <span v-if="data.expert?.type === 'check'" v-show="data.expert.value">
              <img class="comparison-check" src="/images/svg/icon-check.svg" alt="Included">
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
  background-size: 100%;
  background-position: bottom;
  background-repeat: no-repeat;
}

.pricing-mobile-city,
.pricing-hero-car {
  display: none;
}

@media (max-width: 767px) {
  .report-comparison {
    width: 100%;
    margin-top: 12.667cqw;
    margin-bottom: 12.667cqw;
    overflow: hidden;
  }

  .comparison-table,
  .comparison-table thead,
  .comparison-table tbody {
    display: block;
    width: 100%;
  }

  .comparison-table thead tr {
    width: 100%;
    height: 6.944cqw;
    border-bottom: .028cqw solid #d4d8df;
    font-size: 3.327cqw;
  }

  .comparison-logo,
  .comparison-plan {
    box-sizing: border-box;
    flex: 0 0 auto;
    height: 6.944cqw;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    line-height: normal;
  }

  .comparison-logo {
    width: 39.444cqw;
    justify-content: flex-start;
    padding-left: 6.944cqw;
  }

  .comparison-logo img {
    width: 13.855cqw;
    height: 4.444cqw;
  }

  .comparison-plan {
    width: 17.778cqw;
    align-items: flex-start;
    color: #0f1829;
    font-weight: 700;
  }

  .comparison-plan--premium {
    color: #ff4d00;
  }

  .comparison-table tbody {
    border: 0;
  }

  .comparison-row {
    width: 100%;
    height: 11.667cqw;
    border-bottom: .028cqw solid #d4d8df;
    font-size: 3.244cqw;
    line-height: normal;
  }

  .comparison-label,
  .comparison-value {
    box-sizing: border-box;
    flex: 0 0 auto;
    height: 11.667cqw;
    padding: 0;
    border: 0;
    font-weight: 400;
  }

  .comparison-label {
    width: 39.444cqw;
    justify-content: flex-start;
    padding-left: 6.944cqw;
    text-align: left;
    white-space: nowrap;
  }

  .comparison-value {
    width: 17.778cqw;
    text-align: center;
  }

  .comparison-value p {
    margin: 0;
  }

  .comparison-row--pricing .comparison-value {
    font-size: 3.522cqw;
  }

  .comparison-row--quota .comparison-value {
    font-size: 2.689cqw;
  }

  .comparison-row--quota .comparison-value:last-child {
    font-weight: 500;
  }

  .comparison-row--type .comparison-value {
    font-size: 2.967cqw;
    line-height: 1.05;
    text-transform: none;
  }

  .comparison-check {
    width: 3.993cqw;
    height: 3.993cqw;
  }

  .pricing-plans-section {
    padding-right: 0;
    padding-left: 0;
  }

  .pricing-plans-note {
    width: 78.611cqw;
    margin: 13.889cqw 0 0 8.889cqw;
    padding: 0;
    font-size: 3.622cqw;
    line-height: 1.28;
    letter-spacing: 0;
  }

  .pricing-hero {
    position: relative;
    z-index: 0;
    height: 115cqw;
    container-type: inline-size;
    background-image: none !important;
  }

  .pricing-mobile-city {
    position: absolute;
    z-index: -1;
    top: -75.556cqw;
    left: 0;
    display: block;
    width: 100cqw;
    height: 214.722cqw;
    overflow: hidden;
    pointer-events: none;
    mix-blend-mode: multiply;
    opacity: .09;
  }

  .pricing-mobile-city img {
    position: absolute;
    top: -47.9%;
    left: -109.17%;
    width: 556.67%;
    height: 172.79%;
    max-width: none;
  }

  .pricing-hero-shell {
    width: 100%;
    height: 100%;
    padding: 0;
  }

  .pricing-hero-content {
    position: relative;
    display: block;
    height: 100%;
    text-align: left;
  }

  .pricing-hero-title {
    position: absolute;
    top: 13.611cqw;
    left: 8.889cqw;
    width: 78.333cqw;
    margin: 0;
    transform: none;
    color: #141414;
    font-size: 10.017cqw;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0;
  }

  .pricing-hero-title > span {
    display: block;
    font-size: inherit;
    letter-spacing: inherit;
  }

  .pricing-hero-title strong {
    font-weight: 800;
  }

  .pricing-title-tail {
    display: block;
  }

  .pricing-hero-run {
    position: absolute;
    top: 51.667cqw;
    left: 8.889cqw;
    display: block;
    margin: 0;
    transform: none;
  }

  .pricing-hero-subtitle {
    margin: 0;
    color: #2464a6;
    font-size: 7.794cqw;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0;
    white-space: nowrap;
  }

  .pricing-hero-arrow {
    width: 13.333cqw;
    height: 17.222cqw;
    margin: 6.667cqw 0 0 .278cqw;
  }

  .pricing-hero-arrow svg {
    width: 100%;
    height: 100%;
    animation: none;
  }

  .pricing-hero-car {
    position: absolute;
    top: 72.778cqw;
    left: 3.898cqw;
    display: block;
    width: 92.164cqw;
    height: 40.485cqw;
    max-width: none;
  }
}

@media (min-width: 1024px) {
  .report-comparison {
    width: min(82.833vw, 1192.8px);
    max-width: none;
    margin-bottom: 92.4px;
    padding-right: 0;
    padding-left: 0;
  }

  .comparison-table thead tr {
    height: 53px;
    font-size: 20.83px;
  }

  .comparison-logo,
  .comparison-plan {
    height: 53px;
  }

  .comparison-plan {
    border: 0;
    border-radius: 3px;
    font-weight: 700;
    line-height: normal;
  }

  .comparison-plan--basic {
    flex: 0 0 22.803%;
    border: 1px solid #000;
  }

  .comparison-plan--premium {
    flex: 0 0 22.636%;
  }

  .comparison-plan--expert {
    flex: 0 0 23.055%;
    margin-left: -.252%;
    color: #eee;
  }

  .comparison-logo,
  .comparison-label {
    width: 31.944%;
  }

  .comparison-row,
  .comparison-label,
  .comparison-value {
    height: 75.382px;
  }

  .comparison-row {
    font-size: 22.052px;
  }

  .comparison-table tbody {
    border-top: .884px solid rgb(127 127 127 / 32%);
  }

  .comparison-label,
  .comparison-value {
    border-bottom: .884px solid rgb(127 127 127 / 32%);
  }

  .comparison-value {
    border-left: .884px solid rgb(127 127 127 / 32%);
  }

  .comparison-label {
    justify-content: flex-start;
    padding-left: 55.705px;
    text-align: left;
  }

  .comparison-check {
    width: 25px;
    height: 25px;
  }
}

@media (min-width: 768px) {
  .car-bg {
    background-image: var(--car-bg);
    background-size: 65%;
    background-position: 103% 96%;
    background-repeat: no-repeat;
  }
}
</style>
