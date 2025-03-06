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
</script>



<template>
  <report-wrapper>
    <!-- Toggle table visibility -->
    <div class="flex flex-col items-center justify-between text-black md:flex-row">
      <div class="flex items-center space-x-4 cursor-pointer" @click="toggleTableVisibility">
        <p class="flex items-center justify-center text-2xl font-bold">VALUATION DETAILS</p>
        <span>
          <img v-if="isTableVisible" src="/svg/chev-down.svg" alt="">
          <img v-else src="/svg/chev-up.svg" alt="">
        </span>
      </div>

      <small v-if="!hasSubscription">Unlock all valuation details on the full report</small>
      <button class="bg-[#FF7400] text-white text-xl w-72 rounded-lg py-2">Get full report</button>
    </div>

    <div v-show="isTableVisible" class="w-full my-10 text-black">
      <!-- v-if="isClient && " -->
      <!-- v-if="!(subscription?.plan?.plan_code ==='48h-basic-subscription' && hasSubscription?.onTrial) && (user.request_count > 0 || user.one_off_request_count > 0)" -->
      <div v-if="isClient">
        <chart-bar v-if="chartData.length > 0" :data="chartData" :hasSubscription="isShowAble"
          :height="getChartHeight()" width="100%" />
      </div>
      <div v-else>
        <p>Loading data...</p>
      </div>
    </div>
  </report-wrapper>
</template>
