<script lang="ts" setup>
definePageMeta({
  title: 'User Dashboard',
  layout: 'dashboard',

  middleware: ['auth'],
});

</script>

<template>
  <div class="h-full w-full flex space-x-7">
     <div class="flex-1 flex flex-col h-full space-y-5 relative">
      <dashboard-checks-summary></dashboard-checks-summary>
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