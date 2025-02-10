<script setup lang="ts">
// import { ref, computed, onMounted } from 'vue';
import { useDiscountWidgetsStore } from '@/stores/dashboardDiscountWidgets';
import type { pl } from 'date-fns/locale';
const discountWidgetsStore = useDiscountWidgetsStore();
const check_colors = ['#60C5FF', '#1EE6A8', '#EF343A'];

onMounted(async () => {
  try {
    await discountWidgetsStore.fetchDiscountWidgets();
  } catch (error) {
    console.error("Failed to fetch discount widgets:", error);
  }
});
const customPlans = computed(() => discountWidgetsStore.customPlans);

const mappedPlans = computed(() =>
  customPlans.value.map(item => {
    item.pricePerCheck =
      item.reports_count && item.price_after_discount
      ? Number((item.price_after_discount / item.reports_count).toFixed(2))
        : null;
    return item;
  })
);
</script>
<template>
    <div class="h-[11.5rem] bg-white rounded-xl flex justify-between">
        <div class="px-9 pt-4 pb-6 text-black flex flex-col justify-between">
          <div class="space-y-1 pr-8">
            <p class="text-2xl font-bold">
              You are running out of checks ?
            </p>
            <p class="text-[0.9rem]">These offers are for you</p>
          </div>
          <div class="flex items-center space-x-1 font-bold">
            <small>
              Get a new plan instead
            </small>
            <span>
              <img src="/public/images/svg/icon-chev-right.svg" alt="">
            </span>
          </div>
        </div>
        <div class="flex px-[1.1rem] py-[0.9rem] space-x-5">
          <div v-for="(pln, index) in mappedPlans" :key="pln.id"
            class="h-[9.4rem] w-[10.35rem] rounded-lg px-[0.8rem] pt-[1.2rem] pb-[0.6rem] flex flex-col"
            :style="{ backgroundColor: `rgba(${parseInt(check_colors[index].slice(1, 3), 16)}, ${parseInt(check_colors[index].slice(3, 5), 16)}, ${parseInt(check_colors[index].slice(5, 7), 16)}, 0.30)` }"
            >
            <div class="flex-1 text-center space-y-2 text-black">
              <div class="leading-[0.8rem]">
                <p class="text-[1.2rem] font-bold">{{ pln.name }}</p>
                <p class="text-[0.7rem]">Full Report</p>
              </div>
              <div class="leading-[0.2rem]">
                <p class="text-3xl font-bold outlined-text">-{{ pln.discount_percentage }}%</p>
                <!-- <p class="text-[0.6rem]"> £5.53 per check</p> -->
                <p class="text-[0.6rem]"> £{{pln.pricePerCheck}} per check</p>

              </div>
            </div>
            <button class="w-full h-[1.95rem] bg-black text-white rounded-[0.4rem] text-[0.8rem] font-semibold">
              Get now
            </button>
          </div>
        </div>
      </div>
</template>