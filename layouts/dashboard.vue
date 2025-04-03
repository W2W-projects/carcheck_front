<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";
import { useHead } from '@unhead/vue';

const authStore = useAuthStore()
const user = authStore.user;

const route = useRoute();
const pageTitle = computed(() => route.meta?.title || 'Car Check');

useHead({
  title: pageTitle,
});

function makeLogout() {
  if (window.confirm("Are you sure you want to log out?"))
    authStore.logout();
}

const sideBarData = [
  {
    title: 'Home',
    icon: 'icon-home.svg',
    target: '/dashboard',
    route_name: 'dashboard'
  },
  {
    title: 'MyGarage',
    icon: 'icon-garage.svg',
    target: '/dashboard/garage',
    route_name: 'dashboard-garage'
  },
  {
    title: 'History',
    icon: 'icon-history.svg',
    target: '/dashboard/history',
    route_name: 'dashboard-history'
  },
  {
    title: 'Resources',
    icon: 'icon-resources.svg',
    target: '/dashboard/resources',
    route_name: 'dashboard-resources'
  },
  {
    title: 'Settings',
    icon: 'icon-resources.svg',
    target: '/dashboard/settings',
    route_name: 'dashboard-settings'
  }
]

const isRouteActive = (routeName: string) => route.name === routeName;

const isRouteResource = () => route.name === 'dashboard-resources';


import { useCarDetails } from '~/composables/useCarDetails';
import { useDownloadReport } from '~/composables/downloadReport';

const { isModalOpen, selectedCar } = useCarDetails();
const { downloadReport } = useDownloadReport();

function handleDownload(car: any) {
  downloadReport(car);
}

</script>

<template>
  <CarDetailsModal v-if="selectedCar" v-model:isOpen="isModalOpen" :car="selectedCar" @download="handleDownload" />
  <div class="flex flex-grow w-full min-h-screen py-5 overflow-x-hidden md:h-screen bg-white/90"
    :class="[isRouteResource() ? 'lg:pl-10' : 'lg:px-10', 'px-4 md:px-6 space-x-0 md:space-x-4 lg:space-x-12']">
    <!-- sidebar -->
    <div class="bg-[#0F1829] w-[4.25rem] hidden md:flex flex-shrink-0 rounded-lg flex-col items-center justify-between">
      <div class="flex flex-col w-full mt-[3.75rem] gap-y-10">
        <NuxtLink v-for="(item, index) in sideBarData" :key="item.route_name" :to="item.target"
          :class="[isRouteActive(item.route_name) ? 'text-white' : 'text-gray-400']"
          class="relative flex flex-col items-center">
          <img :src="`/images/svg/${item.icon}`" :alt="item.title"
            :class="{ 'opacity-70': !isRouteActive(item.route_name) }" class="w-[1.5rem] h-[1.5rem]">
          <p class="text-[9px]">{{ item.title }}</p>
          <span v-show="isRouteActive(item.route_name)" class="active-line"></span>
        </NuxtLink>
      </div>
      <div class="mb-8">
        <img :src="`/images/svg/icon-logout.svg`" v-on:click="makeLogout()" alt="Logout" style="cursor:pointer;"
          title="Log out">
      </div>
    </div>

    <!-- Mobile bottom navigation -->
    <div class="fixed bottom-0 left-0 right-0 bg-[#0F1829] md:hidden z-50 px-2 py-3 flex justify-between">
      <NuxtLink v-for="(item, index) in sideBarData" :key="item.route_name" :to="item.target"
        :class="[isRouteActive(item.route_name) ? 'text-white' : 'text-gray-400']"
        class="flex flex-col items-center flex-1">
        <img :src="`/images/svg/${item.icon}`" :alt="item.title"
          :class="{ 'opacity-70': !isRouteActive(item.route_name) }" class="w-[1.25rem] h-[1.25rem]">
        <p class="text-[8px]">{{ item.title }}</p>
      </NuxtLink>
    </div>

    <!-- body -->
    <div class="flex flex-col flex-1 pb-16 space-y-6 md:pb-0">
      <!-- body-header -->
      <div class="w-full 2xl:max-w-screen-2xl 2xl:mx-auto md:h-[3.5rem] flex flex-col md:flex-row"
        :class="{ 'lg:pr-10': isRouteResource() }">
        <!-- Logo and Mobile Header -->
        <div
          class="flex items-center justify-between w-full pb-3 border-b border-gray-100/70 md:w-auto md:pb-0 md:border-0">
          <div class="flex pl-1">
            <AppLogo class="w-[7rem] md:w-[9rem]" />
          </div>
          <!-- Mobile-only user avatar with notification indicator -->
          <div class="flex items-center space-x-4 md:hidden">
            <button @click="makeLogout()"
              class="p-1.5 bg-gray-50/80 text-gray-500 rounded-full hover:bg-gray-100 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clip-rule="evenodd" />
              </svg>
            </button>
            <div class="relative">
              <div
                class="flex items-center justify-center overflow-hidden border-2 rounded-full shadow-md border-primary/40 w-9 h-9">
                <div
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-300 to-primary/30">
                  <AppLogo class="w-full scale-[0.85]" />
                </div>
              </div>
              <!-- Notification indicator -->
              <div class="absolute w-3 h-3 border border-white rounded-full -top-1 -right-1 bg-primary"></div>
            </div>
          </div>
        </div>

        <!-- User info and Actions -->
        <div class="flex items-center justify-between flex-1 mt-3 space-x-2 md:justify-end md:mt-0 md:space-x-10">
          <!-- User greeting - desktop view (unchanged) -->
          <div class="items-center hidden space-x-5 md:flex">
            <p class="text-lg text-black">Greetings, {{ user?.first_name || user?.name }}</p>
            <div
              class="flex items-center justify-center w-12 h-12 overflow-hidden border-2 border-blue-300 rounded-full">
              <div class="flex items-center justify-center w-10 h-10 bg-pink-300 rounded-full">
                <AppLogo class="w-full" />
              </div>
            </div>
          </div>

          <!-- User greeting - elegant mobile view -->
          <div class="flex items-center md:hidden">
            <div class="bg-gradient-to-r from-gray-50/80 to-white px-3 py-1.5 rounded-lg shadow-sm">
              <p class="text-sm font-medium leading-tight">
                <span class="block text-xs text-gray-500">Welcome back,</span>
                <span class="truncate max-w-[120px] block font-semibold text-gray-800">
                  {{ user?.first_name || user?.name }}
                </span>
              </p>
            </div>
          </div>

          <!-- Enhanced Action button for mobile -->
          <NuxtLink to="/"
            class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-all rounded-lg shadow-sm bg-primary md:px-10 md:py-2 md:text-base whitespace-nowrap hover:shadow-md">
            <span class="flex items-center md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd" />
              </svg>
              <span>New</span>
            </span>
            <span class="hidden md:block">New Check</span>
          </NuxtLink>
        </div>
      </div>

      <!-- body content -->
      <div class="flex-1 max-w-screen-xl 2xl:w-full 2xl:max-w-screen-2xl 2xl:mx-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.active-line {
  content: '';
  height: 1.5px;
  width: 20px;
  background-color: #FF7400;
  position: absolute;
  bottom: -2px;
}
</style>