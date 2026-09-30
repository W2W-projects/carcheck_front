<script setup>
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

const autoplay = {
  delay: 3000,
  disableOnInteraction: true,
};

const companies = [
  { src: '/svg/lanndrover.svg', alt: 'Land Rover', width: '12.220cqw', height: '6.517cqw', top: '.815cqw' },
  { src: '/svg/Nissan_2020_logo.svg', alt: 'Nissan', width: '9.107cqw', height: '7.669cqw', top: '.116cqw', opacity: '.3' },
  { src: '/svg/Audi-Logo_2016.svg', alt: 'Audi', width: '13.805cqw', height: '4.793cqw', top: '1.650cqw' },
  { src: '/svg/BMW-logo.svg', alt: 'BMW', width: '7.669cqw', height: '7.669cqw', top: '.116cqw' },
  { src: '/svg/Logo_Toyota.svg', alt: 'Toyota', width: '20.515cqw', height: '5.848cqw', top: '.979cqw' },
  { src: '/svg/Vauxhall_2019_Logo.svg', alt: 'Vauxhall', width: '8.820cqw', height: '7.573cqw', top: '.116cqw' },
  { src: '/svg/Ford_logo_flat.svg', alt: 'Ford', width: '15.338cqw', height: '5.560cqw', top: '1.171cqw' },
  { src: '/svg/volkswagen-logo.svg', alt: 'Volkswagen', width: '7.094cqw', height: '7.094cqw', top: '.404cqw' },
  { src: '/svg/Mercedes-Benz_Logo_2010.svg', alt: 'Mercedes-Benz', width: '19.652cqw', height: '4.889cqw', top: '1.458cqw' },
  { src: '/svg/Kia-logo.svg', alt: 'Kia', width: '14.431cqw', height: '8.147cqw', top: '0' },
];


</script>

<template>
  <div class="trusted-by flex w-full flex-col items-center justify-start md:h-[10rem] md:justify-center md:pt-0">
    <div class="brand-marquee w-full overflow-hidden md:hidden">
      <div class="brand-track">
        <div v-for="copyIndex in 2" :key="copyIndex" class="brand-set" :aria-hidden="copyIndex === 2">
          <img
            v-for="company in companies"
            :key="`${copyIndex}-${company.alt}`"
            :src="company.src"
            :alt="copyIndex === 1 ? company.alt : ''"
            class="brand-logo"
            :style="{
              '--brand-width': company.width,
              '--brand-height': company.height,
              '--brand-top': company.top,
              '--brand-opacity': company.opacity || '1',
            }"
          >
        </div>
      </div>
    </div>

    <div class="relative hidden w-full mx-auto overflow-hidden md:block">
      <swiper :modules="[Autoplay]" :autoplay="autoplay" :slides-per-view="'auto'" :space-between="39"
        :speed="800" :effect="'slide'" :slides-per-group="1" :draggable="true" :grab-cursor="true"
        :centered-slides="true" :initial-slide="companies.length / 2" class="brand-swiper w-full">
        <swiper-slide v-for="company in companies" :key="company.alt"
          class="flex items-center justify-center my-auto">
          <img :src="company.src" :alt="company.alt" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style scoped>
.swiper-slide {
  width: auto !important;
}

@media screen and (max-width: 767px) {
  .trusted-by {
    container-type: inline-size;
    height: 24.444cqw;
    padding-top: 6.389cqw;
  }

  .brand-marquee {
    height: 8.147cqw;
  }

  .brand-track {
    display: flex;
    width: max-content;
    height: 100%;
    animation: brand-marquee 36s linear infinite;
    will-change: transform;
  }

  .brand-set {
    display: flex;
    flex: none;
    align-items: flex-start;
    gap: 5.237cqw;
    margin-right: 5.237cqw;
  }

  .brand-logo {
    flex: none;
    width: var(--brand-width);
    height: var(--brand-height);
    margin-top: var(--brand-top);
    max-width: none;
    object-fit: contain;
    opacity: var(--brand-opacity);
  }

  @keyframes brand-marquee {
    from { transform: translate3d(-35.278cqw, 0, 0); }
    to { transform: translate3d(-216.299cqw, 0, 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .brand-track {
      animation: none;
      transform: translate3d(-35.278cqw, 0, 0);
    }
  }
}
</style>
