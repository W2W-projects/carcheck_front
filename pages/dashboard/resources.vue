<script lang="ts" setup>

definePageMeta({
  title: 'Car Check Resources',
  layout: 'dashboard',
  middleware: ['auth'],
});

const guides = [
  {
    title: 'How to Check and Inflate Your Tires',
    image: '/images/webp/demo-car.webp',
    description: 'Learn the proper tire pressure and inflation technique'
  },
  {
    title: 'Changing Your Oil: A Step-by-Step Guide',
    image: '/images/webp/demo-car.webp',
    description: 'Complete walkthrough of an oil change process'
  },
  {
    title: 'Jump Starting a Dead Battery Safely',
    image: '/images/webp/demo-car.webp',
    description: 'Emergency procedures to get your car running again'
  },
  {
    title: 'How to Replace Windshield Wiper Blades',
    image: '/images/webp/demo-car.webp',
    description: 'Quick and easy maintenance for better visibility'
  },
  {
    title: 'Checking and Topping Up Fluid Levels',
    image: '/images/webp/demo-car.webp',
    description: 'Essential fluids maintenance for your vehicle'
  }
];

const articles = [
  {
    title: 'Essential Maintenance Tips for New Car Owners',
    image: '/images/webp/demo-car.webp',
    description: 'Keep your new vehicle running smoothly with these essential maintenance tips. Learn about regular oil changes, tire rotations, and how to inspect fluid levels to extend the life of your car and avoid costly repairs.',
    category: 'Maintenance'
  },
  {
    title: 'Troubleshooting Common Engine Warning Lights',
    image: '/images/webp/demo-car.webp',
    description: 'Don\'t panic when dashboard warning lights appear. This guide explains what the most common warning indicators mean, when you can safely continue driving, and when immediate attention is required from a professional.',
    category: 'Repair'
  },
  {
    title: 'How to Change Your Car\'s Air Filter in 10 Minutes',
    image: '/images/webp/demo-car.webp',
    description: 'A clean air filter improves fuel efficiency and engine performance. Learn how to replace your car\'s air filter with basic tools in under 10 minutes. This simple DIY task can save you money and keep your car running better.',
    category: 'DIY'
  },
  {
    title: 'Winter Driving Safety: Preparing Your Vehicle',
    image: '/images/webp/demo-car.webp',
    description: 'Stay safe on winter roads by properly preparing your vehicle. This guide covers essential winter maintenance checks, emergency kit recommendations, and driving techniques for handling snow and ice.',
    category: 'Safety'
  },
  {
    title: 'Maximizing Fuel Economy: Driving Habits That Save Money',
    image: '/images/webp/demo-car.webp',
    description: 'Learn practical driving techniques and maintenance habits that can significantly improve your vehicle\'s fuel efficiency. Small changes in how you drive and maintain your car can lead to substantial savings at the pump.',
    category: 'Tips'
  },
  {
    title: 'Maximizing Fuel Economy: Driving Habits That Save Money',
    image: '/images/webp/demo-car.webp',
    description: 'Learn practical driving techniques and maintenance habits that can significantly improve your vehicle\'s fuel efficiency. Small changes in how you drive and maintain your car can lead to substantial savings at the pump.',
    category: 'Tips'
  },
  {
    title: 'Maximizing Fuel Economy: Driving Habits That Save Money',
    image: '/images/webp/demo-car.webp',
    description: 'Learn practical driving techniques and maintenance habits that can significantly improve your vehicle\'s fuel efficiency. Small changes in how you drive and maintain your car can lead to substantial savings at the pump.',
    category: 'Tips'
  }
];

const articleCategories = computed(() => {
  return [...new Set(articles.map((article) => article.category))]
})

</script>

<template>
  <div class="w-full h-full space-y-4 text-black">

    <!-- guides -->
    <div class="w-full space-y-2">
      <div class="flex items-center justify-between">
        <p class="text-lg font-bold">Guides</p>
        <p class="mr-10 text-lg font-bold text-gray-400">See all</p>
      </div>

      <div class="flex w-full">
        <DashboardResourcesGuides :data="guides" />
      </div>
    </div>

    <!-- articles -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <div class="flex space-x-5">
          <p class="text-lg font-bold">Article</p>
          <template v-for="(category, index) in articleCategories" :key="index">
            <p class="text-lg font-bold text-gray-400">{{ category }}</p>
          </template>

</div>
<p class="mr-10 text-lg font-bold text-gray-400">See all</p>
</div>
<div class="flex w-full gap-x-6">
  <DashboardResourcesArticles :data="articles" />
</div>

</div>
</div>
</template>

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

// Track swiper state
const isAtEnd = ref(false);
const lastVisibleIndex = ref(-1);
let swiperInstance = null;

const handleSwiperInit = (swiper) => {
  swiperInstance = swiper;
  // Initial update with a delay to ensure DOM is ready
  setTimeout(() => {
    updateLastVisibleSlide();
  }, 200);
};

const handleSlideChange = () => {
  // Update whenever slides change, with a small delay
  setTimeout(() => {
    updateLastVisibleSlide();
  }, 200);
};

// Track when we reach the last slide
const handleReachEnd = () => {
  isAtEnd.value = true;
  updateLastVisibleSlide(); // Update immediately
};

// Track when we move away from the last slide
const handleFromEdge = () => {
  isAtEnd.value = false;
  updateLastVisibleSlide(); // Update immediately
};

const updateLastVisibleSlide = () => {
  if (!swiperInstance) return;
  
  // When we're at the end of the swiper, no slides should be transparent
  if (isAtEnd.value) {
    lastVisibleIndex.value = -1;
    return;
  }
  
  const container = swiperInstance.el;
  const containerRect = container.getBoundingClientRect();
  const containerRight = containerRect.right;
  
  let candidateIndex = -1;
  
  // Loop through all slides
  Array.from(swiperInstance.slides).forEach((slide, index) => {
    const slideRect = slide.getBoundingClientRect();
    
    // If this slide extends beyond the container's right edge
    // and we haven't found a candidate yet
    if (slideRect.right > containerRight && candidateIndex === -1) {
      candidateIndex = index;
    }
  });
  
  lastVisibleIndex.value = candidateIndex;
};

const shouldBeTransparent = (index) => {
  // If we're at the last slide, nothing should be transparent
  if (isAtEnd.value) {
    return false;
  }
  
  // Only make it semi-transparent if:
  // 1. It's the last visible slide AND 
  // 2. It's NOT the last data item
  return index === lastVisibleIndex.value && index !== data.length - 1;
};

// Update on various events
onMounted(() => {
  window.addEventListener('resize', updateLastVisibleSlide);
  
  // Set up an interval to periodically check for changes
  const checkInterval = setInterval(updateLastVisibleSlide, 500);
  
  return () => {
    window.removeEventListener('resize', updateLastVisibleSlide);
    clearInterval(checkInterval);
  };
});
</script>