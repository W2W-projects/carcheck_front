<script setup>
import { computed, ref } from 'vue';
import AccountSettingsForm from '~/components/Dashboard/Settings/AccountSettingsForm.vue';
import SubscriptionForm from '~/components/Dashboard/Settings/SubscriptionForm.vue';
import UpdatePasswordForm from '~/components/Dashboard/Settings/UpdatePasswordForm.vue';

const activeTab = ref(0);
const tabs = [
  { label: 'Account settings', icon: 'dash-settings.svg', component: AccountSettingsForm },
  { label: 'Reset password', icon: 'dash-password.svg', component: UpdatePasswordForm },
  { label: 'Subscription', icon: 'dash-subscription.svg', component: SubscriptionForm },
];

const activeComponent = computed(() => tabs[activeTab.value].component);

function changeTab(index) {
  activeTab.value = index;
}


definePageMeta({
  title: 'Car Check Settings',
  layout: 'dashboard',

  // middleware: ['auth'],
});

const authStore = useAuthStore();
const user = computed(() => authStore.user);

onMounted(() => {
  if (!user.value?.first_name) {
    authStore.fetchUserDetails();
  }
});

</script>

<template>
  <div class="settings-page flex h-auto min-h-[35rem] flex-col gap-[14px] md:h-[40rem] md:min-h-[50vh] md:gap-4 lg:flex-row">
    <h1 class="text-center text-[21px] font-medium leading-[26px] text-[#0f1829] md:hidden">Edit profile</h1>

    <!-- Tablet Profile Summary -->
    <div class="hidden p-4 bg-white rounded-lg shadow-sm md:block lg:hidden">
      <div class="flex items-center space-x-4">
        <div class="w-16 h-16 overflow-hidden bg-white rounded-full shadow-md">
          <img src="/images/webp/user.webp" class="object-cover w-full" alt="User profile">
        </div>
        <div>
          <h2 class="text-lg font-bold text-gray-800">{{ user?.name }}</h2>
          <p class="text-sm text-gray-600">{{ user?.email }}</p>
        </div>
      </div>
    </div>

    <!-- Left Sidebar (Hides on small screens) -->
    <div
      class="bg-panoramic bg-white rounded-lg w-full lg:w-[16.44rem] shadow-sm hidden lg:flex flex-col justify-between px-4 pt-4 pb-8"
      style="background-image: url('/images/webp/panoramic-city.webp')">
      <!-- Profile Section - unchanged -->
      <div class="space-y-6">
        <!-- Profile Image with Half Circle - unchanged -->
        <div class="relative mt-8">
          <!-- Half Circle - unchanged -->
          <div
            class="absolute -top-2 left-1/2 transform -translate-x-1/2 w-[11.875rem] h-[11.875rem] rounded-b-full overflow-hidden">
            <div class="w-full h-1/2"></div>
            <div class="w-full bg-brand h-1/2"></div>
          </div>
          <!-- Profile Image - unchanged -->
          <div
            class="relative w-[10.77rem] h-[10.77rem] flex items-center justify-center mx-auto rounded-full overflow-hidden bg-white shadow-md">
            <img src="/images/webp/user.webp" class="object-cover w-full" alt="User profile">
          </div>
        </div>

        <!-- User Info - unchanged -->
        <div class="space-y-2 text-center">
          <h2 class="text-2xl font-bold text-gray-800">{{ user?.name }}</h2>
          <p class="text-sm text-gray-600">{{ user?.email }}</p>
          <p class="text-sm text-gray-600">{{ user.phone }}</p>
          <p class="text-sm text-gray-500">{{ user.address }}</p>
        </div>
      </div>

      <!-- Delete Account Button - unchanged -->
      <div>
        <div class="flex justify-center">
          <img src="/images/webp/front-facing-car.webp" alt="Car" class="w-full scale-110">
        </div>
        <button
          class="flex items-center justify-center w-[9.02rem] h-[1.75rem] text-[0.93956rem] py-1 mx-auto space-x-2 font-medium text-black transition-colors bg-white border rounded border-brand hover:bg-red-50">
          <span>Edit details</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="settings-panel flex flex-col flex-1 w-full h-auto overflow-hidden bg-white rounded-lg shadow-sm">
      <div class="settings-mobile-profile md:hidden">
        <div class="settings-mobile-avatar">
          <img src="/images/webp/user.webp" class="object-cover" alt="User profile">
        </div>
        <h2 class="text-[31px] font-medium leading-[37px] text-[#0f1829]">{{ user?.name }}</h2>
      </div>

      <div class="settings-mobile-tabs flex md:hidden">
        <button type="button" aria-label="Previous settings section"
          @click="activeTab = (activeTab + tabs.length - 1) % tabs.length">
          <img src="/assets/svg/chevron-down.svg" class="w-4 h-4 rotate-90 brightness-0 invert" alt="">
        </button>
        <div class="flex items-center justify-center flex-1 gap-2">
          <img :src="`/assets/svg/${tabs[activeTab].icon}`" class="w-[17px] h-[18px] brightness-0 invert" alt="">
          <span class="text-[17px] font-medium text-[#fffaf0]">{{ tabs[activeTab].label }}</span>
        </div>
        <button type="button" aria-label="Next settings section"
          @click="activeTab = (activeTab + 1) % tabs.length">
          <img src="/assets/svg/chevron-down.svg" class="w-4 h-4 -rotate-90 brightness-0 invert" alt="">
        </button>
      </div>

      <div class="items-start justify-start hidden overflow-x-auto border-b border-gray-100 md:flex scrollbar-hide">
        <div v-for="(tab, index) in tabs" :key="tab.label"
          class="flex items-end px-1.5 sm:px-3 md:px-6 cursor-pointer gap-x-1 sm:gap-x-2 whitespace-nowrap"
          @click="changeTab(index)">
          <span class="flex items-center justify-center px-0.5 sm:px-1 pt-4 sm:pt-6 md:pt-10 pb-1 rounded-b"
            :class="{ 'text-black bg-brand': activeTab === index, 'text-gray-400': activeTab !== index }">
            <img :src="`/assets/svg/${tab.icon}`" alt="" class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5">
          </span>

          <p class="pb-1 text-xs font-medium transition-colors sm:text-sm md:text-base" :class="{
            'text-black': activeTab === index,
            'text-gray-400 hover:text-gray-700': activeTab !== index
          }">
            {{ tab.label }}
          </p>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="settings-content flex-1 p-0 overflow-visible md:p-6 md:overflow-auto">
        <component :is="activeComponent" class="h-full" />
      </div>

      <!-- Footer Accent -->
      <div class="w-full h-[9px] rounded-b-lg bg-brand md:h-2"></div>
    </div>
  </div>
</template>


<style>
.settings-mobile-profile {
  height: 258px;
  padding-top: 1px;
  text-align: center;
  background-image: url('/images/webp/panoramic-city.webp');
  background-repeat: no-repeat;
  background-position: center 7px;
  background-size: auto 127px;
}

.settings-mobile-avatar {
  position: relative;
  width: 205px;
  height: 205px;
  margin: 1px auto 9px;
  overflow: hidden;
  border: 9px solid #FF7400;
  border-top-color: transparent;
  border-radius: 9999px;
}

.settings-mobile-avatar img {
  width: 100%;
  height: 100%;
}

.settings-mobile-tabs {
  height: 36px;
  margin: 0 19px;
  background: #FF7400;
  border-radius: 3px 3px 0 0;
}

.settings-mobile-tabs button {
  display: flex;
  width: 38px;
  align-items: center;
  justify-content: center;
}

@media (max-width: 767px) {
  .settings-page {
    min-height: 0;
    margin-top: -8px;
  }

  .settings-panel {
    flex: none;
    width: min(303px, calc(100% - 40px));
    margin: 0 auto;
    border-radius: 14px;
  }
}

.bg-panoramic {
  background-size: 80rem;
  background-position: 40% 85%;
  background-repeat: no-repeat;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari and Opera */
}
</style>
