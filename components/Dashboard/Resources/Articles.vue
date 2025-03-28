<template>
  <div class="relative w-full min-h-[16.625rem] overflow-hidden">
    <swiper :slides-per-view="'auto'" :space-between="25" :free-mode="true" :modules="modules"
      class="w-full articles-swiper" @slideChange="handleSlideChange" @init="handleSwiperInit"
      @reachEnd="handleReachEnd" @fromEdge="handleFromEdge" @transitionEnd="updateLastVisibleSlide">
      <swiper-slide v-for="(_, index) in data" :key="index" class="article-slide"
        :class="shouldBeTransparent(index) ? 'semi-transparent' : ''">
        <div class="w-[14.9375rem] h-[16.625rem]">
          <div class="h-[9.3125rem] w-full rounded-2xl" :style="{
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
import { ref, onMounted, watch } from 'vue';

const modules = [FreeMode];
const { data } = defineProps<{
  data: any[];
}>();

const isAtEnd = ref(false);
const lastVisibleIndex = ref(-1);
let swiperInstance: any = null;

const handleSwiperInit = (swiper: any) => {
  swiperInstance = swiper;
  setTimeout(() => {
    updateLastVisibleSlide();
  }, 200);
};

const handleSlideChange = () => {
  setTimeout(() => {
    updateLastVisibleSlide();
  }, 200);
};

const handleReachEnd = () => {
  isAtEnd.value = true;
  updateLastVisibleSlide();
};

const handleFromEdge = () => {
  isAtEnd.value = false;
  updateLastVisibleSlide();
};

const updateLastVisibleSlide = () => {
  if (!swiperInstance) return;

  if (isAtEnd.value) {
    lastVisibleIndex.value = -1;
    return;
  }

  const container = swiperInstance.el;
  const containerRect = container.getBoundingClientRect();
  const containerRight = containerRect.right;

  let candidateIndex = -1;

  Array.from(swiperInstance.slides).forEach((slide, index) => {
    const slideRect = slide.getBoundingClientRect();

    if (slideRect.right > containerRight && candidateIndex === -1) {
      candidateIndex = index;
    }
  });

  lastVisibleIndex.value = candidateIndex;
};

const shouldBeTransparent = (index) => {
  if (isAtEnd.value) {
    return false;
  }

  return index === lastVisibleIndex.value && index !== data.length - 1;
};

onMounted(() => {
  window.addEventListener('resize', updateLastVisibleSlide);

  const checkInterval = setInterval(updateLastVisibleSlide, 500);

  return () => {
    window.removeEventListener('resize', updateLastVisibleSlide);
    clearInterval(checkInterval);
  };
});
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