<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

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
    title: 'Resources',
    icon: 'icon-resources.svg',
    target: '/dashboard/resources',
    route_name: 'dashboard-resources'
  }
]

const isRouteActive = (routeName: string) => route.name === routeName;

const isRouteResource = () => route.name === 'dashboard-resources';


import { useCarDetails } from '~/composables/useCarDetails';
import { useDownloadReport } from '~/composables/downloadReport';

const { isModalOpen, selectedCar } = useCarDetails();
const { downloadReport, isDownloading, isAnyDownloading } = useDownloadReport();

function handleDownload(car: any) {
  downloadReport(car);
}

</script>

<template>
  <CarDetailsModal v-if="selectedCar" v-model:isOpen="isModalOpen" :car="selectedCar"
    :is-downloading="isDownloading" :is-any-downloading="isAnyDownloading" @download="handleDownload" />
  <div class="dashboard-shell flex flex-grow w-full min-h-screen pt-12 pb-5 overflow-x-hidden md:h-screen md:py-5 bg-[#eeeeee] md:bg-white/90"
    :class="[isRouteResource() ? 'lg:pl-10' : 'lg:px-10', 'px-0 md:px-6 space-x-0 md:space-x-4 lg:space-x-12']">
    <!-- sidebar -->
    <div class="bg-[#0F1829] w-[4.25rem] hidden md:flex flex-shrink-0 rounded-lg flex-col items-center justify-between">
      <div class="flex flex-col w-full mt-[3.75rem] gap-y-10">
        <NuxtLink v-for="item in sideBarData" :key="item.route_name" :to="item.target"
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
    <div class="flex flex-col flex-1 pb-24 space-y-[31px] md:pb-0 md:space-y-6">
      <!-- body-header -->
      <div class="flex flex-col w-full h-[27px] px-[clamp(1.25rem,8.9vw,2rem)] md:px-0 2xl:max-w-screen-2xl 2xl:mx-auto md:h-[3.5rem] md:flex-row"
        :class="{ 'lg:pr-10': isRouteResource() }">
        <!-- Logo and Mobile Header -->
        <div class="flex items-center justify-between w-full md:w-auto">
          <div class="flex md:pl-1">
            <AppLogo class="w-[5.25rem] md:w-[9rem]" />
          </div>
          <img src="/images/home/menu.svg" class="h-5 w-[27px] md:hidden" alt="" aria-hidden="true">
        </div>

        <!-- User info and Actions -->
        <div class="items-center justify-between flex-1 hidden space-x-2 md:flex md:justify-end md:space-x-10">
          <!-- User greeting - desktop view (unchanged) -->
          <div class="items-center hidden space-x-5 md:flex">
            <p class="text-lg text-black">Greetings, {{ user?.first_name || user?.name }}</p>
            <details class="relative">
              <summary aria-label="Open account menu"
                class="flex items-center justify-center w-12 h-12 overflow-hidden border-2 border-blue-300 rounded-full cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <div class="flex items-center justify-center w-10 h-10 bg-pink-300 rounded-full">
                  <AppLogo class="w-full" />
                </div>
              </summary>
              <div
                class="absolute z-50 w-40 py-2 mt-2 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-lg left-1/2 top-full">
                <NuxtLink to="/dashboard/settings"
                  class="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                  <img src="/assets/svg/dash-settings.svg" class="w-4 h-4 brightness-0" alt="">
                  <span>Settings</span>
                </NuxtLink>
                <button type="button" @click="makeLogout"
                  class="flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100">
                  <img src="/images/svg/icon-logout.svg" class="w-4 h-4 brightness-0" alt="">
                  <span>Logout</span>
                </button>
              </div>
            </details>
          </div>

          <NuxtLink to="/"
            class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-all rounded-lg shadow-sm bg-brand md:px-10 md:py-2 md:text-base whitespace-nowrap hover:shadow-md">
            <span>New Check</span>
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
@media (max-width: 767px) {
  .dashboard-shell {
    background-image:
      linear-gradient(rgba(238, 238, 238, 0.88), rgba(238, 238, 238, 0.88)),
      url("~/assets/webp/tracks.webp");
    background-position: left top;
    background-repeat: no-repeat;
    background-size: auto 990px;
  }
}

.active-line {
  content: '';
  height: 1.5px;
  width: 20px;
  background-color: #FF7400;
  position: absolute;
  bottom: -2px;
}
</style>
