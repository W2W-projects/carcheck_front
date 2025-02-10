<script lang="ts" setup>
import SearchBar from '~/components/SearchBar.vue';


definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
});

const full_history = [
  {
    title: 'Damage Check',
    icon: '/images/svg/icon-damage-check.svg',
  },
  {
    title: 'Owners History',
    icon: '/images/svg/icon-owners-history.svg',
  },
  {
    title: 'Mileage History',
    icon: '/images/svg/icon-mileage-history.svg',
  },
  {
    title: 'Car Features',
    icon: '/images/svg/icon-car-features.svg',
  },
  {
    title: 'Theft Check',
    icon: '/images/svg/icon-theft-check.svg',
  },
  {
    title: 'MOT History',
    icon: '/images/svg/icon-mot-history.svg',
  },
];

</script>

<template>
  <div class="h-full w-full flex space-x-7">
    <div class="flex-1 flex flex-col h-full space-y-5 relative">
      <!-- checks summary -->
      <dashboard-checks-summary></dashboard-checks-summary>
      <!-- checks summary end -->
      <div class="h-[15rem] space-y-1">
        <div class="w-full px-2 flex items-center justify-between">
          <p class="text-lg text-black font-bold">Latest Checks</p>
          <div class="flex items-center space-x-1">
            <p class="text-[0.65rem] font-bold text-[#949494]">See more</p>
            <span>
              <img src="/public/images/svg/icon-chev-right.svg" alt="">
            </span>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-5 text-black">
          <dashboard-latest-checks></dashboard-latest-checks>
        </div>
      </div>
      <dashboard-discount-widgets></dashboard-discount-widgets>
    </div>
    <dashboard-right-sidebar></dashboard-right-sidebar>
  </div>
</template>



<style scoped>
.bg-dashboard-custom-1 {
  background: linear-gradient(to right, #FF7400, #FFA500), url('/public/images/png/dashboard/skyline.png');
  background-size: cover;
  /* background-blend-mode: overlay; */
}

.bg-city {
  background: url('/public/images/png/dashboard/city.png'), white;
  background-size: cover;
}

.outlined-text {

  color: white;
  text-shadow:
    -1px -1px 0 #000,
    /* Top-left shadow */
    1px -1px 0 #000,
    /* Top-right shadow */
    -1px 1px 0 #000,
    /* Bottom-left shadow */
    1px 1px 0 #000;
  /* Bottom-right shadow */
}
</style>