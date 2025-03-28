<template>
  <div class="relative w-full min-h-[19.625rem] overflow-hidden">
    <swiper :slides-per-view="'auto'" :space-between="25" :free-mode="true" :modules="modules"
      class="w-full guides-swiper" @slideChange="handleSlideChange" @init="handleSwiperInit">
      <swiper-slide v-for="(_, index) in 4" :key="index" :class="[
        index === 0 ? 'first-slide' : 'other-slide',
        isLastVisible(index) ? 'semi-transparent' : ''
      ]">
        <div class="h-[19.625rem] rounded-xl w-full" :style="{
          backgroundImage: `url('${data[index].image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }">
          <div class="flex items-end justify-between h-full px-5 pb-6">
            <div class="flex items-center justify-between" :class="[index === 0 ? 'gap-x-[6rem]' : 'gap-x-[1.25rem]']">
              <div>
                <p class="overflow-hidden font-bold text-white line-clamp-2 text-ellipsis"
                  :class="[index === 0 ? 'text-[1.5rem]' : 'text-[1.0625rem] leading-5']">
                  {{ data[index].title }}
                </p>
              </div>
              <div class="" :class="[index === 0 ? 'w-[3.24256rem] h-[3.06725rem]' : 'w-[1.93375rem] h-[1.82919rem]']">
                <img src="/images/svg/icon-play.svg" class="w-full h-full" alt="">
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { ref } from 'vue';

const modules = [FreeMode];
const { data } = defineProps<{
  data: any[];
}>();

const lastVisibleIndex = ref(-1);
let swiperInstance = null;

const handleSwiperInit = (swiper) => {
  swiperInstance = swiper;
  updateLastVisibleSlide();
};

const handleSlideChange = () => {
  updateLastVisibleSlide();
};

const updateLastVisibleSlide = () => {
  if (!swiperInstance) return;

  const swiperWidth = swiperInstance.width;
  const slides = swiperInstance.slides;

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const slideLeft = slide.offsetLeft;
    const slideWidth = slide.offsetWidth;
    const slideRight = slideLeft + slideWidth;

    if (slideLeft < swiperWidth && slideRight > swiperWidth - 200) {
      lastVisibleIndex.value = i;
      break;
    }
  }
};

const isLastVisible = (index) => {
  return index === lastVisibleIndex.value && index !== data.length - 1;
};
</script>

<style scoped>
.guides-swiper {
  width: 100%;
  height: auto;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto !important;
  height: auto !important;
  transition: opacity 0.3s ease;
}

.first-slide {
  width: 31.4375rem !important;
  min-width: 31.4375rem !important;
}

.other-slide {
  width: 14.9375rem !important;
  min-width: 14.9375rem !important;
}

.semi-transparent {
  opacity: 0.5;
  position: relative;
}

.semi-transparent::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  pointer-events: none;
  z-index: 5;
}
</style>