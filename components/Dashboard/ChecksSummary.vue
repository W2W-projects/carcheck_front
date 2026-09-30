<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCarStore } from '@/stores/car';
import type { RequestCounts } from '~/types/models';

const carStore = useCarStore();

onMounted(async () => {
  try {
    await carStore.fetchRequestCounts();
  } catch (error) {
    console.error('Failed to fetch data on mounted:', error);
  }
});

const userRequestCountLeft = computed<RequestCounts>(() => carStore.requestCounts);
const remainingChecks = computed(() => String(
  userRequestCountLeft.value.one_off_request_count +
  userRequestCountLeft.value.request_count +
  userRequestCountLeft.value.request_count_trial
).padStart(2, '0'));
const totalChecks = computed(() => String(carStore.userCarsList?.length ?? 0).padStart(2, '0'));
</script>

<template>
  <section class="mobile-summary md:hidden">
    <img class="mobile-summary__surface" src="/images/png/dashboard/figma-hero.svg" alt="">
    <div class="mobile-summary__clip">
      <div class="mobile-summary__city"></div>
    </div>
    <img class="mobile-summary__car" src="/images/png/dashboard/figma-hero-car.png" alt="">

    <div class="absolute inset-x-[8%] top-[57%] z-10 text-white">
      <div class="flex items-center justify-between leading-none">
        <p class="text-[clamp(10px,3.18vw,12px)] font-bold uppercase">Checks recap</p>
        <p class="text-[clamp(9px,3.03vw,11px)] font-bold">Total Checks : {{ totalChecks }}</p>
      </div>
      <p class="mt-[1.5%] whitespace-nowrap text-[clamp(18px,5.8vw,23px)] font-bold leading-none">
        Remaining Checks : {{ remainingChecks }}
      </p>
    </div>

    <button class="absolute bottom-[6.5%] left-[8%] z-10 h-[14.25%] w-[45%] rounded-[5px] bg-[#0F1829] text-[clamp(12px,3.7vw,14px)] font-bold text-white">
      Get more checks
    </button>
  </section>

  <div class="hidden h-[12rem] w-full rounded-xl bg-dashboard-custom-1 md:block">
    <div class="relative flex h-full flex-col justify-between py-5 pl-11">
      <div class="leading-[1.75rem] text-black">
        <p class="text-[1.15rem] font-bold uppercase">Checks recap</p>
        <p class="text-[1.8rem] font-bold">Remaining Checks : {{ remainingChecks }}</p>
      </div>
      <button class="h-[2.9rem] w-[13rem] rounded-lg bg-[#0F1829] text-xl font-bold text-white">
        Get more checks
      </button>
      <img src="/images/png/dashboard/car-with-shadow.png" class="absolute -top-[4.7rem] right-0 w-[34rem]" alt="">
    </div>
  </div>
</template>

<style scoped>
.mobile-summary {
  position: relative;
  width: 87.4vw;
  aspect-ratio: 314.6 / 217.128;
  margin-left: 7.42vw;
}

.mobile-summary__surface {
  position: absolute;
  z-index: 0;
  top: -5.65%;
  left: -3.27%;
  width: 106.54%;
  height: 109.48%;
  transform: rotate(180deg);
}

.mobile-summary__clip {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  border-radius: 2.55vw;
}

.mobile-summary__city {
  position: absolute;
  inset: 0 0 38% 0;
  background: url('/images/png/dashboard/figma-city.jpg') center 50% / 260% auto no-repeat;
  mix-blend-mode: multiply;
  opacity: 0.16;
}

.mobile-summary__car {
  position: absolute;
  z-index: 2;
  top: -34%;
  left: -12.2%;
  width: 119.3%;
  max-width: none;
}

.bg-dashboard-custom-1 {
  background: linear-gradient(to right, #FF7400, #FFA500), url('/images/png/dashboard/skyline.png');
  background-size: cover;
}
</style>
