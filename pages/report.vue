<script lang="ts" setup>
import { onMounted } from 'vue';

import { useSubscriptionStore } from '@/stores/subscription';
const subscriptionStore = useSubscriptionStore();
const hasSubscription = computed(() => subscriptionStore.hasSubscription);


onMounted(async () => {
  // if (tokenStore.isTokenExpired) {
  //   debugger
  //     authStore.logout();
  // }
});

definePageMeta({
  title: 'Car Check Report',
  meta: [
    {
      hid: 'Car report generated.', name: 'Download all data of the car', content: 'Download all data of the car'
    }

  ],
  middleware: ['check-reg-number'],
});

</script>

<template>
  <div class="bg-[#EEEEEE] ">

    <!-- Section 1 -->
    <ReportSection1 id="report" />
    <!-- Section 2 -->
    <ReportInfo />
    <!-- Section 3 -->
    <ReportMileage />

    <!-- Section 4 -->
    <ReportDamage />
    <!-- Section 5 -->
    <ReportMot />

    <!-- Section 6 -->
    <ReportVehicle />

    <!-- Section 7 -->
    <ReportFinance />

    <!-- Section 8 -->
    <ReportValuation v-if="hasSubscription.active" />
    <ReportValuationDemo v-else />

    <!-- Section 9 -->
    <ReportTax />

    <!-- Section 10 -->
    <ReportRisk />

    <ReportFixedBottomBar />

    <section class="mt-16">
      <img src="/svg/plan-end-track.svg" alt="Plan End Track" class="w-full" />
    </section>
  </div>

</template>

<style></style>