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
      <div class="w-full 2xl:max-w-screen-2xl 2xl:mx-auto h-auto md:h-[3.5rem] flex flex-col md:flex-row"
        :class="{ 'lg:pr-10': isRouteResource() }">
        <div class="flex pl-1">
          <AppLogo class="w-[7rem] md:w-[9rem]" />
        </div>
        <div class="flex items-center justify-between flex-1 mt-3 space-x-2 md:justify-end md:mt-0 md:space-x-10">
          <div class="flex items-center space-x-2 md:space-x-5">
            <p class="text-sm md:text-lg text-black truncate max-w-[120px] md:max-w-none">Greetings, {{ user?.name }}
            </p>
            <div
              class="flex items-center justify-center w-8 h-8 overflow-hidden border-2 border-blue-300 rounded-full md:w-12 md:h-12">
              <div class="flex items-center justify-center bg-pink-300 rounded-full w-7 h-7 md:w-10 md:h-10">
                <AppLogo class="w-full" />
              </div>
            </div>
          </div>

          <NuxtLink to="/"
            class="px-4 py-2 text-sm text-white bg-orange-500 rounded-lg md:px-10 md:text-base whitespace-nowrap">
            New Check
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