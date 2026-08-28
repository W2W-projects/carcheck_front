<template>
  <div ref="carousel" class="articles-mobile" @pointerdown="startDrag" @pointermove="drag"
    @pointerup="endDrag" @pointercancel="endDrag" @pointerleave="endDrag">
    <article v-for="(article, index) in data" :key="index" class="article-mobile-card">
      <div class="article-mobile-image" :style="{
        backgroundImage: `url('${article.image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }">
        <img src="/images/svg/icon-play.svg" class="article-mobile-play" alt="">
      </div>
      <p class="article-mobile-title">{{ article.title }}</p>
      <small class="article-mobile-description">{{ article.description }}</small>
    </article>
  </div>

  <div class="articles-desktop relative w-full min-h-[16.625rem] overflow-hidden">
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
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, onUnmounted, ref } from 'vue';

const modules = [FreeMode];
const { carousel, startDrag, drag, endDrag } = useCarousel();
const { data } = defineProps<{
  data: any[];
}>();

const isAtEnd = ref(false);
const lastVisibleIndex = ref(-1);
let swiperInstance: any = null;
let checkIntervalId: any = null;

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
  if (isAtEnd.value) {
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

.articles-mobile {
  display: none;
}

@media (max-width: 767px) {
  .articles-desktop {
    display: none;
  }

  .articles-mobile {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(2, auto);
    grid-auto-columns: 45.9vw;
    gap: 17px;
    padding-right: clamp(1.25rem, 8.9vw, 2rem);
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    touch-action: pan-x;
    cursor: grab;
    user-select: none;
  }

  .articles-mobile:active {
    cursor: grabbing;
  }

  .articles-mobile::-webkit-scrollbar {
    display: none;
  }

  .article-mobile-card {
    width: 45.9vw;
    min-height: 184px;
    color: #0f1829;
  }

  .article-mobile-image {
    position: relative;
    width: 100%;
    aspect-ratio: 165 / 103;
    overflow: hidden;
    border-radius: 13px;
  }

  .article-mobile-play {
    position: absolute;
    right: 8px;
    bottom: 5px;
    width: 26px;
    height: 25px;
  }

  .article-mobile-title {
    display: -webkit-box;
    height: 28px;
    margin-top: 7px;
    overflow: hidden;
    font-size: 12px;
    font-weight: 700;
    line-height: 13px;
    text-align: left;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .article-mobile-description {
    display: -webkit-box;
    height: 36px;
    margin-top: 5px;
    overflow: hidden;
    color: #8e9197;
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}
</style>
