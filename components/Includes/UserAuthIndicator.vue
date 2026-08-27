<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

const dropdownOpen = ref(false);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function handleClickOutside(event: MouseEvent) {
  const dropdown = document.querySelector('.relative');
  if (dropdown && !dropdown.contains(event.target as Node) && dropdownOpen.value) {
    dropdownOpen.value = false;
  }
}
const errors = ref([]);
const auth = useAuthStore();

const handleLogout = async () => {
  try {
    await auth.logout();
  } catch (error) {
    console.log("login error: ", error);
    errors.value = error?.data?.errors
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="relative" @click.stop>
    <div class="flex items-center justify-center py-1 px-1 pr-2 rounded space-x-2 transition-all hover:cursor-pointer"
      :class="[dropdownOpen ? 'bg-brand' : 'bg-gray-300']" @click="toggleDropdown">
      <div class="w-9 h-9 rounded overflow-hidden">
        <img src="/images/placeholder/user-icon.png" class="w-full" alt="">
      </div>
      <span>
        <svg class="transition-all" :class="{ 'rotate-180': dropdownOpen }" width="13" height="9" viewBox="0 0 13 9"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.18164 1.9092L6.40891 7.13647" stroke="#292929" stroke-width="2.09091" stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M6.40918 7.13647L11.6365 1.9092" stroke="#292929" stroke-width="2.09091" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </span>
    </div>
    <div v-if="dropdownOpen"
      class="absolute right-1/2 mt-2 w-36 translate-x-1/2 bg-white border rounded shadow-lg text-sm text-center">
      <a href="/dashboard" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dashboard</a>
      <button @click="handleLogout"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-center w-full">Logout</button>
    </div>
  </div>
</template>

<style></style>