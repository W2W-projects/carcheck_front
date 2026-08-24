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
  <div class="w-full h-full space-y-4 overflow-hidden text-black">
    <!-- guides -->
    <div class="w-full space-y-2 ">
      <div class="flex items-center justify-between">
        <p class="text-base font-bold sm:text-lg">Guides</p>
        <p class="mr-3 text-base font-bold text-gray-400 sm:mr-6 md:mr-10 sm:text-lg">See all</p>
      </div>

      <div class="w-full max-w-[91vw] md:max-w-none md:w-auto overflow-hidden">
        <DashboardResourcesGuides :data="guides" />
      </div>
    </div>

    <!-- articles -->
    <div class="mt-6 space-y-2 sm:mt-4">
      <div class="flex flex-col justify-between sm:flex-row sm:items-center">
        <div class="flex flex-wrap pb-2 overflow-x-auto gap-x-3 sm:pb-0 scrollbar-hide sm:gap-x-5">
          <p class="text-base font-bold sm:text-lg whitespace-nowrap">Article</p>
          <template v-for="(category, index) in articleCategories" :key="index">
            <p class="text-base font-bold text-gray-400 sm:text-lg whitespace-nowrap">{{ category }}</p>
          </template>
        </div>
        <p class="mt-2 mr-3 text-base font-bold text-gray-400 sm:mr-6 md:mr-10 sm:text-lg sm:mt-0">See all</p>
      </div>

      <div class="w-full max-w-[91vw] md:max-w-none md:w-auto overflow-hidden">
        <DashboardResourcesArticles :data="articles" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>