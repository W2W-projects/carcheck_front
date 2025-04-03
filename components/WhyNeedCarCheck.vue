<template>
  <section>
    <div
      class="md:px-32 px-10 text-center flex justify-center relative lg:h-[32.85rem] custom-bg-lady-car mx-auto max-w-screen-2xl">
      <h1
        class="relative z-10 mt-5 text-4xl text-black lg:tracking-widest xl:text-7xl lg:text-6xl md:text-3xl sm:text-2xl lg:font-bold lg:mt-32 md:mt-24">
        When do
        y<span class="lg:text-white">o<span class="md:text-white text-primary">u n</span></span>eed Car
        check</h1>
    </div>
    <div class="bg-white">
      <div
        class="py-[3.35rem] z-50 overflow-hidden md:px-[4.5rem] px-10 flex md:flex-row flex-col gap-x-10 gap-y-10 gap-0 mx-auto max-w-screen-2xl">
        <div
          class="flex md:flex-row flex-col lg:overflow-hidden md:w-[41rem] w-full md:h-[11.25rem] gap-x-11 rounded-l-xl relative">
          <div class="relative flex items-center justify-center">
            <div class="w-[17.15rem] relative">
              <img src="/png/elegant-male-taxi-driver-costume.png" class="w-full" alt="Feature Icon 1">
            </div>
            <p
              class="right-0 lg:text-[15.7rem] md:text-[14rem] text-[10rem] font-bold text-[#FF7400] translate-x-14 translate-y-1 absolute font-roboto">
              1</p>
          </div>
          <div class="flex flex-col justify-around">
            <h6 class="lg:text-4xl md:text-3xl text-xl text-[#0F1829]"><span class="font-bold">Buying</span> a car</h6>
            <p class="text-sm text-black lg:text-2xl md:text-lg" style="line-height: 1.75rem;">Check the wanted
              vehicle’s
              history to avoid bad
              surprises.
            </p>
            <div class="text-[#FF7400] text-xs md:text-sm lg:text-lg">
              <p style="line-height: 1.75rem;">5% of sold cars were reported stolen</p>
              <p style="line-height: 1.75rem;">17% of sold cars were clocked</p>
              <p style="line-height: 1.75rem;">18% had outstanding finances</p>
            </div>
          </div>
        </div>

        <div class="flex md:flex-row flex-col lg:overflow-hidden flex-1 md:h-[11.25rem] gap-x-12 rounded-l-xl relative">
          <div class="relative flex items-center justify-center">
            <div class="w-[17.15rem] relative">
              <img src="/png/elegant-male-taxi-driver-costume-2.png" class="w-full -translate-x-4" alt="Feature Icon 1">
            </div>
            <p
              class="right-0 lg:text-[15.7rem] md:text-[14rem] text-[10rem] font-bold text-[#FF7400] translate-x-10 translate-y-1 absolute font-roboto">
              2</p>
          </div>
          <div class="flex flex-col justify-around h-full leading-tight">
            <h6 class="lg:text-4xl md:text-3xl text-xl text-[#0F1829]"><span class="font-bold">Selling</span> a car</h6>
            <p class="text-sm leading-tight text-black lg:text-2xl md:text-lg" style="line-height: 1.75rem;">Use our
              data
              to
              reassure buyers about
              history &
              market
              value</p>
            <div class="text-[#FF7400] text-xs md:text-sm lg:text-lg">
              <p style="line-height: 1.75rem;">89% of transactions backed by carcheck were successful</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>

</template>

<script setup>

</script>

<style scoped>
.custom-bg-lady-car {
  background-image: url("/assets/svg/pretty-woman.svg");
  background-size: 79.705%;
  background-position: 50% 1.9235rem !important;
  background-repeat: no-repeat;
}

/* Responsive adjustments for the background image */
@media (max-width: 768px) {
  .custom-bg-lady-car {
    background: white;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .custom-bg-lady-car {
    background-size: 85%;
    background-position: 50% 2rem !important;
  }
}

@media (min-width: 1025px) and (max-width: 1440px) {
  .custom-bg-lady-car {
    background-size: 79.705%;
    background-position: 50% 1.9235rem !important;
  }
}
</style>
