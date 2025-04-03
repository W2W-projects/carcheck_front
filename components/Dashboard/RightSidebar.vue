<script lang="ts" setup>
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
  <div class="flex lg:flex-col bg-city bg-white text-black h-full lg:w-[20rem] w-full rounded-lg px-9 py-7 relative">
    <div class="w-3/6 overflow-hidden lg:w-auto">
      <div>
        <p class="uppercase text-primary text-[0.85rem] font-bold">
          make a NEW CHECK
        </p>
        <p class="text-3xl leading-8">
          Check it before
          <b> you regret it</b>
        </p>
      </div>
      <div class="mt-6 space-y-2">
        <p class="text-lg">Enter VIN</p>
        <SearchBar width="w-full" />
      </div>
      <div class="mt-[1.5rem] pl-1 space-y-4">
        <p class="leading-4 font-extralight">We can generate a <span class="font-bold">full history</span>
          report for <span class="font-bold">any car</span></p>

        <div class="grid grid-cols-2 gap-y-1">
          <div v-for="(his, index) in full_history" :key="his.title || index"
            class="text-[0.7rem] flex items-center space-x-1 font-extralight">
            <span class="w-3">
              <img :src="his.icon" alt="">
            </span>
            <p>
              {{ his.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="relative bottom-0 flex-1 w-full overflow-hidden translate-x-10 lg:-translate-x-1/2 lg:left-1/2 lg:absolute">
      <img src="/public/images/png/dashboard/car-right-sidebar.png" class="w-full" alt="">
    </div>
  </div>
</template>