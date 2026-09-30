<script lang="ts" setup>

definePageMeta({
  title: 'User Dashboard',
  layout: 'dashboard',

  middleware: ['auth'],
});

</script>

<template>
  <div class="flex flex-col w-full h-full xl:flex-row xl:space-x-7 xl:space-y-0">
    <div class="relative flex min-w-0 flex-col md:space-y-5 xl:flex-1 xl:h-full">
      <dashboard-checks-summary></dashboard-checks-summary>
      <div class="h-auto mt-[14px] md:mt-0 md:h-[15rem] 2xl:h-[16.5rem]">
        <div class="flex items-center justify-between w-full pl-[7.5vw] pr-[5vw] md:px-2">
          <p class="text-[17px] font-bold text-[#0F1829] md:text-lg">Latest Checks</p>
          <NuxtLink to="/dashboard/garage" class="flex items-center space-x-1">
            <p class="text-[11px] font-bold text-[#949494]">See more</p>
            <span>
              <img src="/images/svg/icon-chev-right.svg" alt="">
            </span>
          </NuxtLink>
        </div>
        <div class="h-full mt-[10px] md:mt-1">
          <dashboard-latest-checks></dashboard-latest-checks>
        </div>
      </div>
      <dashboard-discount-widgets class="mt-[23px] md:mt-0"></dashboard-discount-widgets>
    </div>
    <dashboard-right-sidebar class="mt-[11px] xl:mt-0"></dashboard-right-sidebar>
  </div>
</template>

<style scoped>
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
