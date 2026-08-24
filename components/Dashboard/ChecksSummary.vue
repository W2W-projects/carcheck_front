<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useCarStore } from '@/stores/car';
import type { RequestCounts } from '~/types/models';
const carStore = useCarStore();

onMounted(async () => {
  try {
    await carStore.fetchRequestCounts();
  } catch (error) {
    console.error("Failed to fetch data on mounted:", error);
  }
});
const userRequestCountLeft = computed<RequestCounts>(() => carStore.requestCounts);
</script>

<template>
  <div class="w-full h-[12rem] rounded-xl bg-dashboard-custom-1">
    <div class="relative flex flex-col justify-between h-full py-5 pl-5 sm:pl-11">
      <div class="leading-[1.75rem] z-10">
        <p class="uppercase font-bold text-[1.15rem]">Checks recap</p>
        <p class="text-[1.8rem] font-bold">Remaining Checks : {{ userRequestCountLeft.one_off_request_count +
          userRequestCountLeft.request_count }}</p>
      </div>
      <button class="h-[2.9rem] w-[13rem] bg-[#0F1829] text-white text-xl rounded-lg z-10">
        Get more checks
      </button>
      <img src="/public/images/png/dashboard/car-with-shadow.png"
        class="absolute hidden md:block w-[22rem] sm:w-[34rem] right-0 top-0 sm:-top-[4.7rem] z-0" alt="">
    </div>
  </div>
</template>

<style scoped>
.bg-dashboard-custom-1 {
  background: linear-gradient(to right, #FF7400, #FFA500), url('/public/images/png/dashboard/skyline.png');
  background-size: cover;
  /* background-blend-mode: overlay; */
}
</style>
