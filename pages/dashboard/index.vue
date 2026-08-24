<script lang="ts" setup>

definePageMeta({
  title: 'User Dashboard',
  layout: 'dashboard',

  middleware: ['auth'],
});

</script>

<template>
  <div class="flex flex-col w-full h-full space-y-6 lg:flex-row lg:space-x-7 lg:space-y-0">
    <div class="relative flex flex-col flex-1 h-full space-y-5">
      <dashboard-checks-summary></dashboard-checks-summary>
      <div class="h-auto md:h-[15rem] 2xl:h-[16.5rem] space-y-1">
        <div class="flex items-center justify-between w-full px-2">
          <p class="text-base font-bold text-black md:text-lg">Latest Checks</p>
          <NuxtLink to="/dashboard/garage" class="flex items-center space-x-1">
            <p class="text-[0.65rem] font-bold text-[#949494]">See more</p>
            <span>
              <img src="/public/images/svg/icon-chev-right.svg" alt="">
            </span>
          </NuxtLink>
        </div>
        <div class="h-full">
          <dashboard-latest-checks></dashboard-latest-checks>
        </div>
      </div>
      <dashboard-discount-widgets></dashboard-discount-widgets>
    </div>
    <dashboard-right-sidebar class="hidden lg:flex"></dashboard-right-sidebar>
  </div>
</template>

<style scoped>
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