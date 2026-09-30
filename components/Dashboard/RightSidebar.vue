<script lang="ts" setup>
const full_history = [
  { title: 'Damage Check', icon: '/images/svg/icon-damage-check.svg' },
  { title: 'Owners History', icon: '/images/svg/icon-owners-history.svg' },
  { title: 'Mileage History', icon: '/images/svg/icon-mileage-history.svg' },
  { title: 'Car Features', icon: '/images/svg/icon-car-features.svg' },
  { title: 'Theft Check', icon: '/images/svg/icon-theft-check.svg' },
  { title: 'MOT History', icon: '/images/svg/icon-mot-history.svg' },
];
</script>

<template>
  <section class="mobile-new-check md:hidden">
    <div class="mobile-new-check__city"></div>

    <div class="relative z-10">
      <p class="text-[clamp(25px,7.88vw,31px)] font-bold uppercase leading-[1.05] text-[#FF7400]">
        Make a<br>new check
      </p>
      <div class="mt-[clamp(18px,5.8vw,24px)] space-y-1">
        <p class="text-[clamp(18px,5.33vw,21px)] font-medium">Enter VIN</p>
        <SearchBar hero width="w-full" class="mobile-vin-search" />
      </div>
    </div>

    <div class="mobile-new-check__vehicle">
      <img src="/images/png/dashboard/figma-new-check-car.png" alt="">
    </div>
  </section>

  <aside class="bg-city relative hidden h-full w-[20rem] flex-col rounded-lg bg-white px-9 py-7 text-black xl:flex">
    <div class="relative z-10">
      <p class="text-[0.85rem] font-bold uppercase text-brand">make a NEW CHECK</p>
      <p class="text-3xl leading-8">Check it before <b>you regret it</b></p>

      <div class="mt-6 space-y-2">
        <p class="text-lg">Enter VIN</p>
        <SearchBar width="w-full" />
      </div>

      <div class="mt-[1.5rem] space-y-4 pl-1">
        <p class="font-extralight leading-4">
          We can generate a <span class="font-bold">full history</span> report for
          <span class="font-bold">any car</span>
        </p>
        <div class="grid grid-cols-2 gap-y-1">
          <div v-for="(his, index) in full_history" :key="his.title || index"
            class="flex items-center space-x-1 text-[0.7rem] font-extralight">
            <span class="w-3"><img :src="his.icon" alt=""></span>
            <p>{{ his.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-1/2 w-full -translate-x-1/2 overflow-hidden">
      <img src="/images/png/dashboard/car-right-sidebar.png" class="w-full" alt="">
    </div>
  </aside>
</template>

<style scoped>
.mobile-new-check {
  position: relative;
  width: 88.6vw;
  aspect-ratio: 319 / 411;
  margin-left: 7.42vw;
  margin-top: 11px;
  overflow: hidden;
  border-radius: 12px;
  background: white;
  padding: 6.39vw 11.11vw 0;
  color: #0F1829;
}

.mobile-new-check__city {
  position: absolute;
  inset: 0;
  background: url('/images/png/dashboard/figma-city.jpg') center / cover no-repeat;
  mix-blend-mode: multiply;
  opacity: 0.13;
}

.mobile-new-check__vehicle {
  position: absolute;
  top: 34.79%;
  left: 0;
  width: 100.31%;
  height: 69.59%;
  overflow: hidden;
  pointer-events: none;
}

.mobile-new-check__vehicle img {
  position: absolute;
  top: 0;
  left: -28.2%;
  width: 156.41%;
  height: 100%;
  max-width: none;
}

.bg-city {
  background: url('/images/png/dashboard/city.png') center / cover no-repeat, white;
}
</style>
