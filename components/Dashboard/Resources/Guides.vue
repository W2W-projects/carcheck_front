<template>
  <div class="guides-mobile-shell">
    <swiper :slides-per-view="1" :space-between="12" :modules="mobileModules" :grab-cursor="true"
      :pagination="{ clickable: true }" class="guides-mobile">
      <swiper-slide v-for="(guide, index) in data.slice(0, 3)" :key="index" class="guide-mobile-slide">
        <article class="guide-mobile-card" :style="{ backgroundImage: `url('${guide.image}')` }">
          <div class="guide-mobile-content">
            <p>{{ guide.title }}</p>
            <img src="/images/svg/icon-play.svg" alt="">
          </div>
        </article>
      </swiper-slide>
    </swiper>
  </div>

  <div class="guides-desktop relative w-full min-h-[19.625rem] overflow-hidden">
    <swiper :slides-per-view="'auto'" :space-between="25" :free-mode="true" :modules="modules"
      class="w-full guides-swiper" @slideChange="handleSlideChange" @init="handleSwiperInit" @reachEnd="handleReachEnd"
      @fromEdge="handleFromEdge" @transitionEnd="updateLastVisibleSlide">
      <swiper-slide v-for="(_, index) in data" :key="index" :class="[
        index === 0 ? 'first-slide' : 'other-slide',
        shouldBeTransparent(index) ? 'semi-transparent' : ''
      ]">
        <div class="guide-card h-[19.625rem] rounded-xl w-full" :style="{
          backgroundImage: `url('${data[index].image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }">
          <div class="guide-card-content flex items-end justify-between h-full px-5 pb-6">
            <div class="flex items-center justify-between" :class="[index === 0 ? 'gap-x-[6rem]' : 'gap-x-[1.25rem]']">
              <div>
                <p class="guide-card-title overflow-hidden font-bold text-white line-clamp-2 text-ellipsis"
                  :class="[index === 0 ? 'text-[1.5rem]' : 'text-[1.0625rem] leading-5']">
                  {{ data[index].title }}
                </p>
              </div>
              <div class="guide-play" :class="[index === 0 ? 'w-[3.24256rem] h-[3.06725rem]' : 'w-[1.93375rem] h-[1.82919rem]']">
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
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { ref, onMounted, onUnmounted } from 'vue';

const modules = [FreeMode];
const mobileModules = [Pagination];
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

.guides-mobile-shell {
  display: none;
}

@media (max-width: 767px) {
  .guides-desktop {
    display: none;
  }

  .guides-mobile-shell {
    position: relative;
    display: block;
    width: 100%;
    height: 187px;
    overflow: hidden;
    border-radius: 11px;
  }

  .guides-mobile {
    width: 100%;
    height: 100%;
  }

  .guide-mobile-slide {
    width: 100% !important;
    min-width: 100% !important;
    height: 100% !important;
  }

  .guide-mobile-card {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 11px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .guide-mobile-card::after {
    position: absolute;
    inset: 55% 0 0;
    content: '';
    background: linear-gradient(to top, rgb(0 0 0 / 65%), transparent);
  }

  .guide-mobile-content {
    position: absolute;
    z-index: 1;
    right: 15px;
    bottom: 19px;
    left: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .guide-mobile-content p {
    display: -webkit-box;
    max-width: 180px;
    overflow: hidden;
    color: white;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .guide-mobile-content img {
    flex: 0 0 auto;
    width: 31px;
    height: 30px;
  }

  .guides-mobile :deep(.swiper-pagination) {
    bottom: 10px;
  }

  .guides-mobile :deep(.swiper-pagination-bullet) {
    width: 10px;
    height: 10px;
    margin: 0 1px !important;
    background: transparent;
    border: 1px solid #c2c2c2;
    opacity: 1;
  }

  .guides-mobile :deep(.swiper-pagination-bullet-active) {
    background: #ff7400;
    border-color: #ff7400;
  }
}
</style>
