<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
const carRegistrationSearchStore = useCarRegistrationSearchStore();
const subscriptionStore = useSubscriptionStore();

const isTableVisible = ref(true);
const toggleTableVisibility = () => {
  isTableVisible.value = !isTableVisible.value;
};

const valuationLists = computed(() => carRegistrationSearchStore.vehicleValuationsList);
const hasSubscription = computed(() => subscriptionStore.hasSubscription);
const planCurrency = computed(() => subscriptionStore.subscription?.plan?.currency?.symbol ?? '£');

const chartData = ref([]);
const isClient = ref(false);
const chartLoaded = ref(false);

onMounted(async () => {
  isClient.value = true;
  await carRegistrationSearchStore.fetchValuationList();
  if (valuationLists.value && typeof valuationLists.value === "object") {
    mapValuationToChart();
  } else {
    console.warn("Valuation data is not available or invalid format.");
  }
});

watch(chartData, (newValue) => {
  if (newValue.length > 0) {
    chartLoaded.value = true;
  }
});

function mapValuationToChart() {
  if (valuationLists.value && typeof valuationLists.value === "object") {
    chartData.value = Object.entries(valuationLists.value).map(([key, value]) => ({
      label: key,
      value: parseFloat(value) || 0,
    }));
  } else {
    console.warn("Valuation data is not available or invalid format.");
  }
}

function getChartHeight() {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1024) return 25;
  if (screenWidth >= 768) return 40;
  return 50;
}

const { isShowAble } = useIsShowAble();
const isAuthenticated = computed(() => useAuthStore().isAuthenticated);
</script>



<template>
  <report-wrapper>
    <!-- Toggle table visibility -->
    <div class="grid grid-cols-[1fr_auto] items-center text-black md:flex md:flex-row md:justify-between">
      <div class="flex items-center space-x-2 cursor-pointer md:space-x-4" @click="toggleTableVisibility">
        <img src="/assets/svg/orange/valuation.svg" alt="" class="w-4 h-4" aria-hidden="true">
        <p class="flex items-center justify-center text-xl font-bold md:text-2xl">VALUATION DETAILS</p>
        <span>
          <img v-if="isTableVisible" src="/svg/chev-down.svg" alt="">
          <img v-else src="/svg/chev-up.svg" alt="">
        </span>
      </div>

      <small class="hidden md:block" v-if="!hasSubscription?.active">Unlock all valuation details on the full report</small>
      <button class="hidden bg-[#FF7400] text-white text-xl w-72 rounded-lg py-2 md:block">Get full report</button>
      <svg class="md:hidden" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="8" fill="#BDBDBD" />
        <rect x="6.66602" y="6.22229" width="2.66666" height="7.1111" rx="1.33333" fill="white" />
        <rect x="6.66602" y="2.66663" width="2.66667" height="2.66667" rx="1.33333" fill="white" />
      </svg>
    </div>

    <div v-show="isTableVisible" class="w-full my-6 text-black md:my-10">
      <!-- v-if="isClient && " -->
      <!-- v-if="!(subscription?.plan?.plan_code ==='48h-basic-subscription' && hasSubscription?.onTrial) && (user.request_count > 0 || user.one_off_request_count > 0)" -->
      <div v-if="isClient">
        <chart-bar v-if="chartData.length > 0" :data="chartData" :hasSubscription="isShowAble"
          :currency="planCurrency" :height="getChartHeight()" width="100%" />
      </div>
      <div v-else>
        <p>Loading data...</p>
      </div>
      <Includes-get-full-report :show-form="isAuthenticated" get-full-report="Download Report"
        class="w-full mt-6 md:hidden"></Includes-get-full-report>
    </div>
  </report-wrapper>
</template>
