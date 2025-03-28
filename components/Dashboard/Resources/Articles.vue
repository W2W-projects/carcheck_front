<template>
  <div class="relative w-full min-h-[16.625rem] overflow-hidden">
    <swiper :slides-per-view="'auto'" :space-between="25" :free-mode="true" :modules="modules"
      class="w-full articles-swiper" @slideChange="handleSlideChange" @init="handleSwiperInit">
      <swiper-slide v-for="(_, index) in data" :key="index" class="article-slide"
        :class="isLastVisible(index) ? 'semi-transparent' : ''">
        <div class="w-[14.9375rem] h-[16.625rem]">
          <div class="h-[9.3125rem] w-full  rounded-2xl" :style="{
            backgroundImage: `url('${data[index].image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }"></div>
          <p class="h-[3rem] line-clamp-2 overflow-hidden text-ellipsis text-justify leading-5 mt-2">
            {{ data[index].title }}
          </p>
          <small class="h-[3.69rem] line-clamp-3 overflow-hidden text-ellipsis text-start text-gray-500">
            {{ data[index].description }}
          </small>
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
  let foundIndex = -1;

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const slideLeft = slide.offsetLeft;
    const slideWidth = slide.offsetWidth;
    const slideRight = slideLeft + slideWidth;

    if (slideLeft < swiperWidth && slideRight > swiperWidth) {
      foundIndex = i;
      break;
    }
  }

  lastVisibleIndex.value = foundIndex;
};

const isLastVisible = (index) => {
  return index === lastVisibleIndex.value && index !== data.length - 1;
};
</script>

<style scoped>
.articles-swiper {
  width: 100%;
  padding: 0;
  margin: 0;
  height: auto;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto !important;
  height: auto !important;
  margin-left: 0 !important;
  transition: opacity 0.3s ease;
}

.swiper-wrapper {
  padding-left: 0 !important;
  margin-left: 0 !important;
}

.article-slide {
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