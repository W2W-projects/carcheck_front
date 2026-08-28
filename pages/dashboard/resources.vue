<script lang="ts" setup>

definePageMeta({
  title: 'Car Check Resources',
  layout: 'dashboard',
  middleware: ['auth'],
});

const guides = [
  {
    title: 'How to put air back into your tyre',
    image: '/images/guides/inflate-tyre.png',
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

const selectedArticleCategory = ref<string | null>(null);
const filteredArticles = computed(() => articles.filter((article) =>
  !selectedArticleCategory.value || article.category === selectedArticleCategory.value
));

</script>

<template>
  <div class="resources-page h-full overflow-hidden text-black">
    <!-- guides -->
    <div class="w-full space-y-2">
      <div class="flex items-center justify-between">
        <p class="resources-heading text-base font-bold sm:text-lg">Guides</p>
        <p class="hidden mr-3 text-base font-bold text-gray-400 md:block sm:mr-6 md:mr-10 sm:text-lg">See all</p>
      </div>

      <div class="resource-guides-viewport w-full md:max-w-none md:w-auto overflow-hidden">
        <DashboardResourcesGuides :data="guides" />
      </div>
    </div>

    <!-- articles -->
    <div class="resources-articles mt-6 space-y-2 sm:mt-4">
      <div class="flex flex-col justify-between sm:flex-row sm:items-center">
        <div class="article-tabs flex flex-wrap pb-2 overflow-x-auto gap-x-3 sm:pb-0 scrollbar-hide sm:gap-x-5"
          aria-label="Filter articles by category">
          <button type="button" class="article-tab text-base font-bold sm:text-lg whitespace-nowrap"
            :class="{ 'article-tab--active': selectedArticleCategory === null }"
            :aria-pressed="selectedArticleCategory === null" @click="selectedArticleCategory = null">
            Articles
          </button>
          <button v-for="category in articleCategories" :key="category" type="button"
            class="article-tab text-base font-bold sm:text-lg whitespace-nowrap"
            :class="{ 'article-tab--active': selectedArticleCategory === category }"
            :aria-pressed="selectedArticleCategory === category" @click="selectedArticleCategory = category">
            {{ category }}
          </button>
        </div>
        <p class="hidden mt-2 mr-3 text-base font-bold text-gray-400 md:block sm:mr-6 md:mr-10 sm:text-lg sm:mt-0">See all</p>
      </div>

      <div class="resource-articles-viewport w-full max-w-[91vw] md:max-w-none md:w-auto overflow-hidden">
        <DashboardResourcesArticles :key="selectedArticleCategory || 'all'" :data="filteredArticles" />
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

.article-tab {
  color: #9ca3af;
  cursor: pointer;
}

.article-tab--active {
  color: #0f1829;
}

.article-tab:focus-visible {
  border-radius: 2px;
  outline: 2px solid #ff7400;
  outline-offset: 3px;
}

@media (max-width: 767px) {
  .resources-page {
    --resources-gutter: clamp(1.25rem, 8.9vw, 2rem);
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: auto;
    margin-top: -10px;
    padding-inline: var(--resources-gutter);
    overflow-x: hidden;
    overflow-y: visible;
  }

  .resources-heading,
  .article-tab {
    font-size: 14px;
    line-height: 17px;
  }

  .resource-guides-viewport {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .resources-articles {
    margin-top: 11px;
  }

  .article-tabs {
    width: calc(100% + var(--resources-gutter));
    flex-wrap: nowrap;
    gap: 10px;
    padding-bottom: 0;
  }

  .article-tab:not(.article-tab--active) {
    color: rgb(15 24 41 / 20%);
  }

  .resource-articles-viewport {
    width: calc(100% + var(--resources-gutter));
    max-width: none;
    overflow: visible;
  }
}
</style>
