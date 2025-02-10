<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useCarStore } from '@/stores/car';
const carStore = useCarStore();

interface CheckRequests {
    one_off_request_count: 0;
    request_count: 0;
    request_count_trial: 0;
}

onMounted(async () => {
  try {
        await carStore.fetchRequestCounts();
    } catch (error) {
        console.error("Failed to fetch data on mounted:", error);
    }
});
const userRequestCountLeft = computed<CheckRequests>(() => carStore.requestCounts);
</script>

<template>
    <div class="w-full h-[12rem] rounded-xl bg-dashboard-custom-1">
        <div class="pl-11 py-5 flex flex-col justify-between h-full relative">
          <div class="leading-[1.75rem]">
            <p class="uppercase font-bold text-[1.15rem]">Checks recap</p>
            <p class="text-[1.8rem] font-bold">Remaining Checks : {{ userRequestCountLeft.request_count }}</p>
            <p class="text-lg">Trial Checks : {{ userRequestCountLeft.request_count_trial }}</p>
            <p class="text-lg">Total Checks : {{ userRequestCountLeft.one_off_request_count + userRequestCountLeft.request_count }}</p>
          </div>
          <button class="h-[2.9rem] w-[13rem] bg-[#0F1829] text-white text-xl rounded-lg">
            Get more checks
          </button>
          <img src="/public/images/png/dashboard/car-with-shadow.png" class="absolute w-[34rem] right-0 -top-[4.7rem]"
            alt="">
        </div>
      </div>
</template>