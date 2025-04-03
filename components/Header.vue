<script setup>
import SearchBar from "~/components/SearchBar.vue";

import { ref } from 'vue';

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
const token = useTokenStore();
const auth = useAuthStore();

const isAuthenticated = computed(() => {
  return auth.getCurrentUser;
});

const route = useRoute();
const currentPath = computed(() => route.name);
</script>

<template>
  <nav class="relative">
    <div class="flex flex-wrap items-center justify-between mx-auto py-6 lg:py-10 px-4 sm:px-8 lg:px-[9.12rem]">
      <AppLogo class="w-[7.5rem] sm:w-[9.15rem]" />

      <!-- Mobile toggle button with improved styling -->
      <button type="button"
        class="inline-flex items-center justify-center w-10 h-10 p-2 text-gray-700 rounded-lg md:hidden focus:outline-none"
        aria-controls="navbar-cta" aria-expanded="false" @click="toggleMenu">
        <span class="sr-only">Toggle menu</span>
        <svg v-if="!isMenuOpen" class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
        <svg v-else class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Desktop navigation (unchanged) -->
      <div class="items-center justify-between hidden w-auto md:flex">
        <ul
          class="flex items-center font-medium space-x-8 lg:space-x-[2.8rem] rtl:space-x-reverse text-black text-xl tracking-wide">
          <li>
            <NuxtLink to="/how-it-works" class="p-0 hover:text-orange-500">How It Works</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" class="p-0 hover:text-orange-500">About Us</NuxtLink>
          </li>
          <li v-show="currentPath !== 'pricing'">
            <NuxtLink href="/pricing" class="p-0 hover:text-orange-500">Pricing</NuxtLink>
          </li>
          <li v-show="currentPath !== 'report'">
            <NuxtLink href="/report" class="p-0 hover:text-orange-500">Reports</NuxtLink>
          </li>
          <li class="flex items-center space-x-4">
            <includes-user-auth-indicator v-show="isAuthenticated" />
            <SearchBar width="w-[16.5rem]" input-height="h-[2.35rem]" />
          </li>
        </ul>
      </div>

      <!-- Mobile menu (enhanced) -->
      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
        <div v-if="isMenuOpen"
          class="absolute left-0 right-0 z-50 w-full px-4 py-3 bg-white border-t border-gray-100 rounded-b-lg shadow-lg top-full md:hidden">

          <!-- User account section (when logged in) -->
          <div v-if="isAuthenticated" class="pb-4 mb-4 border-b border-gray-100">
            <div class="flex items-center mb-3 space-x-3">
              <div
                class="flex items-center justify-center flex-shrink-0 w-10 h-10 overflow-hidden rounded-full bg-gradient-to-br from-blue-300 to-primary/30">
                <AppLogo class="w-full scale-90" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ auth.getCurrentUser?.first_name || auth.getCurrentUser?.name || 'Account' }}
                </p>
                <p class="text-xs text-gray-500 truncate">
                  {{ auth.getCurrentUser?.email || '' }}
                </p>
              </div>
            </div>

            <!-- Account navigation buttons -->
            <div class="flex items-center space-x-2">
              <NuxtLink to="/dashboard"
                class="inline-flex items-center justify-center flex-1 px-3 py-2 space-x-4 text-sm font-medium text-white transition-colors rounded-lg bg-primary hover:bg-primary/90 active:bg-primary/80">
                <span>Dashboard</span>
                <img src="/images/svg/icon-home.svg" class="w-3" alt="">
              </NuxtLink>
              <NuxtLink to="/dashboard/settings"
                class="inline-flex items-center justify-center flex-1 px-3 py-2 space-x-4 text-sm font-medium text-gray-700 transition-colors rounded-lg bg-primary/50 hover:bg-gray-200 active:bg-gray-300">
                <span>Garage</span>
                <img src="/images/svg/icon-garage.svg" class="w-5" alt="">
              </NuxtLink>
            </div>
          </div>

          <!-- Search bar visible at top of mobile menu -->
          <div class="w-full pb-4 mb-4 border-b border-gray-100">
            <SearchBar width="w-full" input-height="h-[2.35rem]" />
          </div>

          <!-- Mobile navigation links -->
          <ul class="flex flex-col w-full gap-2 font-medium text-black">
            <!-- Login/Register button when not authenticated -->
            <li v-if="!isAuthenticated" class="pb-3 mb-2 border-b border-gray-100">
              <NuxtLink to="/login"
                class="flex justify-center items-center px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 active:bg-primary/80 transition-colors">
                Login / Register
              </NuxtLink>
            </li>

            <!-- Regular navigation items -->
            <li>
              <NuxtLink to="/how-it-works"
                class="flex items-center px-3 py-2.5 rounded-lg hover:bg-gray-50 active:bg-gray-100">
                <span class="text-lg">How It Works</span>
                <svg class="w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd" />
                </svg>
              </NuxtLink>
            </li>

            <li>
              <NuxtLink to="/about"
                class="flex items-center px-3 py-2.5 rounded-lg hover:bg-gray-50 active:bg-gray-100">
                <span class="text-lg">About Us</span>
                <svg class="w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd" />
                </svg>
              </NuxtLink>
            </li>

            <li v-show="currentPath !== 'pricing'">
              <NuxtLink href="/pricing"
                class="flex items-center px-3 py-2.5 rounded-lg hover:bg-gray-50 active:bg-gray-100">
                <span class="text-lg">Pricing</span>
                <svg class="w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd" />
                </svg>
              </NuxtLink>
            </li>

            <li v-show="currentPath !== 'report'">
              <NuxtLink href="/report"
                class="flex items-center px-3 py-2.5 rounded-lg hover:bg-gray-50 active:bg-gray-100">
                <span class="text-lg">Reports</span>
                <svg class="w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd" />
                </svg>
              </NuxtLink>
            </li>
          </ul>

          <!-- Logout button for mobile (when authenticated) -->
          <div v-if="isAuthenticated" class="pt-4 mt-4 border-t border-gray-100">
            <button @click="auth.logout"
              class="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 active:bg-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                class="w-4 h-4 mr-2 text-gray-500">
                <path fill-rule="evenodd"
                  d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                  clip-rule="evenodd" />
                <path fill-rule="evenodd"
                  d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
                  clip-rule="evenodd" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>
