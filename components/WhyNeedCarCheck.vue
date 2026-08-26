<template>
  <section class="need-mobile relative w-full overflow-hidden bg-[#EEEEEE] md:hidden">
    <div class="need-hero-band"></div>
    <div class="need-hero-photo">
      <img src="/images/home/need-heading.png" alt="Woman sitting on a car">
    </div>
    <h2 class="need-title">
      When do y<span>ou n</span>eed <strong>CarCheck</strong>
    </h2>

    <div class="need-track-bg"></div>
    <swiper
      :modules="[Pagination]"
      :pagination="{ clickable: true }"
      :slides-per-view="'auto'"
      :slides-offset-after="24"
      :grab-cursor="true"
      class="need-swiper"
    >
      <swiper-slide class="need-slide need-slide--buying">
        <article class="need-card need-card--buying">
          <div class="need-number">1</div>
          <div class="need-photo">
            <img src="/images/home/need-buying.png" alt="Driver buying a car">
          </div>
          <div class="need-copy">
            <h3><strong>Buying</strong> a car</h3>
            <p class="need-description">Check the wanted vehicle’s history to avoid bad surprises.</p>
            <div class="need-facts">
              <p>17% of sold cars were clocked</p>
              <p>5% of sold cars were reported stolen</p>
              <p>18% had outstanding finances</p>
            </div>
          </div>
        </article>
      </swiper-slide>

      <swiper-slide class="need-slide need-slide--selling">
        <article class="need-card need-card--selling">
          <div class="need-number">2</div>
          <div class="need-photo">
            <img src="/images/home/need-selling.png" alt="Car owner selling a car">
          </div>
          <div class="need-copy">
            <h3><strong>Selling</strong> a car</h3>
            <p class="need-description">Use our data to reassure buyers about history &amp; market value</p>
            <div class="need-facts">
              <p>89% of transactions backed by carcheck were successful</p>
            </div>
          </div>
        </article>
      </swiper-slide>
    </swiper>
  </section>

  <section class="hidden md:block">
    <div
      class="md:px-32 px-10 text-center flex justify-center relative lg:h-[32.85rem] custom-bg-lady-car mx-auto max-w-screen-2xl">
      <h1
        class="relative z-10 mt-5 text-4xl text-black lg:tracking-widest xl:text-7xl lg:text-6xl md:text-3xl sm:text-2xl lg:font-bold lg:mt-32 md:mt-24">
        When do
        y<span class="lg:text-white">o<span class="md:text-white text-brand">u n</span></span>eed Car
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
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
</script>

<style scoped>
.need-mobile {
  container-type: inline-size;
  height: 105.278cqw;
  font-family: "TT Norms Pro", sans-serif;
}

.need-hero-band {
  position: absolute;
  z-index: 1;
  top: 19.519cqw;
  left: 6.389cqw;
  width: 89.023cqw;
  height: 23.574cqw;
  border-radius: .62cqw;
  background: #ff7400;
}

.need-hero-photo {
  position: absolute;
  z-index: 2;
  top: 2.249cqw;
  left: 6.389cqw;
  width: 89.023cqw;
  height: 40.975cqw;
  overflow: hidden;
  border-radius: .853cqw;
}

.need-hero-photo img {
  position: absolute;
  top: -12.49%;
  left: -.13%;
  width: 100.26%;
  height: 122.55%;
  max-width: none;
}

.need-title {
  position: absolute;
  z-index: 3;
  top: 8.721cqw;
  left: 6.389cqw;
  width: 92.222cqw;
  color: #0f1829;
  font-size: 6.497cqw;
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
}

.need-title span {
  color: white;
}

.need-title strong {
  font-weight: 700;
}

.need-swiper {
  position: absolute;
  z-index: 4;
  top: 37.778cqw;
  left: 0;
  width: 100%;
  height: 67.5cqw;
}

.need-swiper :deep(.swiper-wrapper) {
  box-sizing: border-box;
  height: 57.222cqw;
  padding-left: 5.931cqw;
}

.need-slide {
  height: 57.222cqw;
  margin-right: 5.147cqw;
}

.need-slide--buying {
  width: 82.597cqw;
}

.need-slide--selling {
  width: 91.141cqw;
}

.need-swiper :deep(.swiper-pagination) {
  top: 50.278cqw;
  bottom: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.need-swiper :deep(.swiper-pagination-bullet) {
  width: 1.944cqw;
  height: 1.944cqw;
  margin: 0 .389cqw;
  border: .13cqw solid #000;
  background: transparent;
  opacity: 1;
}

.need-swiper :deep(.swiper-pagination-bullet-active) {
  border-color: #ff4d00;
  background: #ff4d00;
}

.need-track-bg {
  position: absolute;
  z-index: 3;
  top: 42.697cqw;
  left: 0;
  width: 100%;
  height: 50.49cqw;
  background: white;
  box-shadow: 0 1.154cqw 3.462cqw rgb(0 0 0 / 15%);
}

.need-card {
  position: absolute;
  top: 0;
  height: 57.222cqw;
  color: #0f1829;
}

.need-card--buying {
  left: 0;
  width: 100%;
}

.need-card--selling {
  left: 0;
  width: 100%;
}

.need-number {
  position: absolute;
  z-index: 3;
  color: #ff7400;
  font-family: "TT Norms Pro", sans-serif;
  font-weight: 700;
  line-height: normal;
}

.need-photo {
  position: absolute;
  z-index: 2;
  top: 12.687cqw;
  height: 33.401cqw;
  overflow: hidden;
  border-radius: 1.731cqw;
}

.need-photo img {
  position: absolute;
  max-width: none;
}

.need-copy {
  position: absolute;
  z-index: 4;
  top: 0;
}

.need-copy h3 {
  position: absolute;
  width: 40cqw;
  font-size: 5.193cqw;
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
}

.need-copy h3 strong {
  font-weight: 700;
}

.need-description {
  position: absolute;
  width: 36.767cqw;
  font-size: 3.667cqw;
  font-weight: 400;
  line-height: 1.18;
}

.need-facts {
  position: absolute;
  color: #ff7400;
  font-weight: 500;
}

.need-card--buying .need-number {
  top: 0;
  left: 25.248cqw;
  font-size: 47.764cqw;
}

.need-card--buying .need-photo {
  left: 0;
  width: 38.321cqw;
}

.need-card--buying .need-photo img {
  top: -1.42%;
  left: -7.23%;
  width: 142.71%;
  height: 105.7%;
}

.need-card--buying .need-copy {
  left: 45.83cqw;
}

.need-card--buying h3 {
  top: 11.652cqw;
}

.need-card--buying .need-description {
  top: 19.419cqw;
}

.need-card--buying .need-facts {
  top: 33.919cqw;
  width: 36.767cqw;
  font-size: 2.495cqw;
  line-height: 3.056cqw;
}

.need-card--buying .need-facts p:nth-child(2) {
  margin-top: 0;
}

.need-card--selling .need-number {
  top: 3.107cqw;
  left: 23.303cqw;
  font-size: 44.522cqw;
}

.need-card--selling .need-photo {
  left: 0;
  width: 40.651cqw;
  -webkit-mask: url("/images/home/need-selling-mask.svg") center / 100% 100% no-repeat;
  mask: url("/images/home/need-selling-mask.svg") center / 100% 100% no-repeat;
}

.need-card--selling .need-photo img {
  top: -13.35%;
  left: -43.72%;
  width: 144.11%;
  height: 113.35%;
}

.need-card--selling .need-copy {
  left: 52.561cqw;
}

.need-card--selling h3 {
  top: 12.772cqw;
}

.need-card--selling .need-description {
  top: 22.267cqw;
}

.need-card--selling .need-facts {
  top: 38.839cqw;
  width: 38.58cqw;
  font-size: 2.813cqw;
  line-height: 1.18;
}

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
