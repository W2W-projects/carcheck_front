<template>
  <div class="relative w-full min-h-[19.625rem] overflow-hidden">
    <swiper :slides-per-view="'auto'" :space-between="25" :free-mode="true" :modules="modules"
      class="w-full guides-swiper" @slideChange="handleSlideChange" @init="handleSwiperInit" @reachEnd="handleReachEnd"
      @fromEdge="handleFromEdge" @transitionEnd="updateLastVisibleSlide">
      <swiper-slide v-for="(_, index) in data" :key="index" :class="[
        index === 0 ? 'first-slide' : 'other-slide',
        shouldBeTransparent(index) ? 'semi-transparent' : ''
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
import { ref, onMounted, onUnmounted } from 'vue';

const modules = [FreeMode];
const { data } = defineProps<{
  data: any[];
}>();

const isAtEnd = ref(false);
const lastVisibleIndex = ref(-1);
let swiperInstance: any = null;

let checkIntervalId = null;

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
  if (!swiperInstance || !swiperInstance.el || !swiperInstance.slides) return;

  try {
    if (isAtEnd.value) {
      lastVisibleIndex.value = -1;
      return;
    }

    const container = swiperInstance.el;

    if (!container || !document.body.contains(container)) return;

    const containerRect = container.getBoundingClientRect();
    const containerRight = containerRect.right;

    let candidateIndex = -1;

    const slides = Array.from(swiperInstance.slides || []);

    for (let index = 0; index < slides.length; index++) {
      const slide = slides[index];

      if (!slide || !document.body.contains(slide)) continue;

      const slideRect = slide.getBoundingClientRect();

      if (slideRect.right > containerRight && candidateIndex === -1) {
        candidateIndex = index;
        break;
      }
    }

    lastVisibleIndex.value = candidateIndex;
  } catch (error) {
    console.error('Error updating last visible slide:', error);
  }
};

const shouldBeTransparent = (index) => {
  if (isAtEnd.value || index === 0) {
    return false;
  }

  return index === lastVisibleIndex.value && index !== data.length - 1;
};

onMounted(() => {
  window.addEventListener('resize', updateLastVisibleSlide);

  checkIntervalId = setInterval(updateLastVisibleSlide, 500);
});

onUnmounted(() => {
  if (checkIntervalId !== null) {
    clearInterval(checkIntervalId);
    checkIntervalId = null;
  }

  window.removeEventListener('resize', updateLastVisibleSlide);

  if (swiperInstance) {
    swiperInstance.destroy();
    swiperInstance = null;
  }
});
</script>

<style scoped>
.guides-swiper {
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto !important;
  height: auto !important;
  transition: opacity 0.3s ease;
  margin-left: 0 !important;
}

.swiper-wrapper {
  padding-left: 0 !important;
  margin-left: 0 !important;
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