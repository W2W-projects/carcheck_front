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
</script>

<template>
  <div class="flex w-full h-screen py-5 space-x-12 overflow-hidden bg-white/90"
    :class="[isRouteResource() ? 'pl-10' : 'px-10']">
    <!-- sidebar -->
    <div class="bg-[#0F1829] w-[4.25rem] flex-shrink-0 rounded-lg flex flex-col items-center justify-between">
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

    <!-- body -->
    <div class="flex flex-col flex-1 space-y-6">
      <!-- body-header -->
      <div class="w-full h-[3.5rem] flex" :class="{ 'pr-10': isRouteResource() }">
        <div class="flex pl-1">
          <AppLogo class="w-[9rem]" />
        </div>
        <div class="flex items-center justify-end flex-1 space-x-10">
          <div class="flex items-center space-x-5">
            <p class="text-lg text-black">Greetings, {{ user?.name }}</p>
            <div
              class="flex items-center justify-center w-12 h-12 overflow-hidden border-2 border-blue-300 rounded-full">
              <div class="flex items-center justify-center w-10 h-10 bg-pink-300 rounded-full">
                <AppLogo class="w-full" />
              </div>
            </div>
          </div>

          <button class="px-10 py-2 text-white bg-orange-500 rounded-lg">
            New Check
          </button>
        </div>

      </div>
      <!-- body -->
      <div class="flex-1 max-w-screen-xl">
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