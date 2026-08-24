<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useCarStore } from '@/stores/car';

definePageMeta({
  title: 'Car Check Garage',
  layout: 'dashboard',
});

// Get data from store instead of static import
const carStore = useCarStore();
const isLoading = ref(true);

// Dropdown state variables - keep exactly as is
const brandOpen = ref(false);
const yearOpen = ref(false);
const engineOpen = ref(false);
const monthOpen = ref(false);

// Selected values - keep exactly as is
const selectedBrand = ref('');
const selectedYear = ref('');
const selectedEngine = ref('');
const selectedMonth = ref('');

// Temporary filter values - keep exactly as is
const tempSelectedBrand = ref('');
const tempSelectedYear = ref('');
const tempSelectedEngine = ref('');
const tempSelectedMonth = ref('');

// Store the normalized car data from API
const normalizedCarData = ref([]);
// Filtered data based on selected filters
const filteredCars = ref([]);

// Compute unique values for dropdowns - these will update when car data changes
const carBrands = computed(() => {
  const brands = normalizedCarData.value
    .map(car => car.details?.make)
    .filter(Boolean);
  return [...new Set(brands)];
});

const carYears = computed(() => {
  const years = normalizedCarData.value
    .map(car => car.details?.yearOfManufacture)
    .filter(Boolean);
  return [...new Set(years)];
});

const engineTypes = computed(() => {
  const engines = normalizedCarData.value
    .map(car => car.details?.fuelType)
    .filter(Boolean);
  return [...new Set(engines)];
});

const monthsOfCheck = computed(() => {
  const months = new Set();
  normalizedCarData.value.forEach(car => {
    (car.details?.checkMonths ?? []).forEach(month => months.add(month));
  });
  return [...months];
});

// Apply filters function - keep the same functionality
const applyFilters = () => {
  selectedBrand.value = tempSelectedBrand.value;
  selectedYear.value = tempSelectedYear.value;
  selectedEngine.value = tempSelectedEngine.value;
  selectedMonth.value = tempSelectedMonth.value;

  filteredCars.value = normalizedCarData.value.filter((car) => {
    // Check if car and car.details exist
    if (!car || !car.details) return false;

    const matchesBrand = !selectedBrand.value || car.details.make === selectedBrand.value;
    const matchesYear = !selectedYear.value || car.details.yearOfManufacture === selectedYear.value;
    const matchesEngine = !selectedEngine.value || car.details.fuelType === selectedEngine.value;

    const matchesMonth = !selectedMonth.value
      || (car.details.checkMonths ?? []).includes(selectedMonth.value);

    return matchesBrand && matchesYear && matchesEngine && matchesMonth;
  });
};

// Close dropdowns when clicking outside - keep the same
const closeDropdowns = () => {
  brandOpen.value = false;
  yearOpen.value = false;
  engineOpen.value = false;
  monthOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.dropdown')) {
    closeDropdowns();
  }
};

// Add a new ref to track window width
const windowWidth = ref(0);
const isFilterVisible = ref(false);

// Toggle filter visibility function
const toggleFilters = () => {
  isFilterVisible.value = !isFilterVisible.value;
};

// Check if window width is mobile size
const isMobileWidth = computed(() => {
  return windowWidth.value < 768;
});

// Update window width on resize
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(async () => {
  document.addEventListener('click', handleClickOutside);

  // Set initial window width
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    // Add resize event listener
    window.addEventListener('resize', updateWindowWidth);
  }

  try {
    // Fetch car data from store
    await carStore.fetchCarsUserList();

    // Process the data
    normalizedCarData.value = carStore.userCarsList || [];

    // Initialize filtered cars with all cars
    filteredCars.value = [...normalizedCarData.value];
  } catch (error) {
    console.error("Failed to load cars:", error);
  } finally {
    isLoading.value = false;
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);

  // Remove resize event listener
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateWindowWidth);
  }
});
</script>

<template>
  <!-- Add h-full class to the root div to fill available space -->
  <div class="flex flex-col h-full space-y-3">
    <div v-if="isLoading" class="space-y-3" role="status" aria-label="Loading garage">
      <div class="grid grid-cols-2 gap-4 p-4 bg-white border rounded-lg md:grid-cols-4 border-gray-50">
        <div v-for="item in 4" :key="item" class="space-y-2">
          <UtilitiesSkeleton class="w-16 h-3" />
          <UtilitiesSkeleton class="w-full h-8" />
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="item in 6" :key="item" class="h-[12.5rem] p-5 bg-white rounded-xl">
          <UtilitiesSkeleton class="w-24 h-3" />
          <UtilitiesSkeleton class="w-32 h-20 mx-auto mt-4" />
          <UtilitiesSkeleton class="w-full h-3 mt-4" />
        </div>
      </div>
      <span class="sr-only">Loading garage...</span>
    </div>

    <div v-else class="bg-white border rounded-lg border-gray-50">
      <!-- Filter toggle button (mobile only) -->
      <div class="flex items-center justify-between p-3 border-b md:hidden">
        <p class="font-medium text-black">Filters</p>
        <button @click="toggleFilters" class="flex items-center space-x-1 text-brand">
          <span>{{ isFilterVisible ? 'Hide' : 'Show' }}</span>
          <img src="/public/assets/svg/chevron-down.svg" alt="toggle"
            :class="{ 'transform rotate-180': isFilterVisible }">
        </button>
      </div>

      <!-- Filter section - toggleable on mobile -->
      <div class="flex flex-col md:flex-row" :class="{ 'hidden': !isFilterVisible && isMobileWidth }">
        <!-- Filters container - stacks vertically on mobile -->
        <div class="flex-1 p-4 md:pl-4 lg:pl-10">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-0">
            <!-- Car Brand Dropdown -->
            <div class="relative dropdown md:px-3 lg:px-5 md:border-r">
              <label class="block mb-1 text-sm font-semibold text-gray-500">Car brand</label>
              <div class="relative text-black">
                <button type="button" class="flex items-center justify-between w-full py-2 text-left cursor-pointer"
                  @click="brandOpen = !brandOpen">
                  <span class="text-sm font-bold">{{ tempSelectedBrand || 'All brands' }}</span>
                  <img src="/public/assets/svg/chevron-down.svg" alt="dropdown"
                    :class="{ 'transform rotate-180': brandOpen }">
                </button>
                <div v-if="brandOpen"
                  class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div @click="tempSelectedBrand = ''; brandOpen = false"
                    class="px-3 py-2 cursor-pointer hover:bg-gray-100">
                    All brands
                  </div>
                  <div v-for="brand in carBrands" :key="brand" @click="tempSelectedBrand = brand; brandOpen = false"
                    class="px-3 py-2 cursor-pointer hover:bg-gray-100">
                    {{ brand }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Car Year Dropdown -->
            <div class="relative dropdown md:px-3 lg:px-5 md:border-r">
              <label class="block mb-1 text-sm font-semibold text-gray-500">Car year</label>
              <div class="relative text-black">
                <button type="button" class="flex items-center justify-between w-full py-2 text-left cursor-pointer"
                  @click="yearOpen = !yearOpen">
                  <span class="text-sm font-bold">{{ tempSelectedYear || 'All years' }}</span>
                  <img src="/public/assets/svg/chevron-down.svg" alt="dropdown"
                    :class="{ 'transform rotate-180': yearOpen }">
                </button>
                <div v-if="yearOpen"
                  class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div @click="tempSelectedYear = ''; yearOpen = false"
                    class="px-3 py-2 cursor-pointer hover:bg-gray-100">
                    All years
                  </div>
                  <div v-for="year in carYears" :key="year" @click="tempSelectedYear = year; yearOpen = false"
                    class="px-3 py-2 cursor-pointer hover:bg-gray-100">
                    {{ year }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Engine Type Dropdown -->
            <div class="relative dropdown md:px-3 lg:px-5 md:border-r">
              <label class="block mb-1 text-sm font-semibold text-gray-500">Engine type</label>
              <div class="relative text-black">
                <button type="button" class="flex items-center justify-between w-full py-2 text-left cursor-pointer"
                  @click="engineOpen = !engineOpen">
                  <span class="text-sm font-bold">{{ tempSelectedEngine || 'All types' }}</span>
                  <img src="/public/assets/svg/chevron-down.svg" alt="dropdown"
                    :class="{ 'transform rotate-180': engineOpen }">
                </button>
                <div v-if="engineOpen"
                  class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div @click="tempSelectedEngine = ''; engineOpen = false"
                    class="px-3 py-2 cursor-pointer hover:bg-gray-100">
                    All types
                  </div>
                  <div v-for="engine in engineTypes" :key="engine"
                    @click="tempSelectedEngine = engine; engineOpen = false"
                    class="px-3 py-2 cursor-pointer hover:bg-gray-100">
                    {{ engine }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Month of Check Dropdown -->
            <div class="relative dropdown md:px-3 lg:px-5">
              <label class="block mb-1 text-sm font-semibold text-gray-500">Month of check</label>
              <div class="relative text-black">
                <button type="button" class="flex items-center justify-between w-full py-2 text-left cursor-pointer"
                  @click="monthOpen = !monthOpen">
                  <span class="text-sm font-bold">{{ tempSelectedMonth || 'All months' }}</span>
                  <img src="/public/assets/svg/chevron-down.svg" alt="dropdown"
                    :class="{ 'transform rotate-180': monthOpen }">
                </button>
                <div v-if="monthOpen"
                  class="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-48">
                  <div @click="tempSelectedMonth = ''; monthOpen = false"
                    class="px-3 py-2 cursor-pointer hover:bg-gray-100">
                    All months
                  </div>
                  <div v-for="month in monthsOfCheck" :key="month" @click="tempSelectedMonth = month; monthOpen = false"
                    class="px-3 py-2 cursor-pointer hover:bg-gray-100">
                    {{ month }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Search button - centered and full width on mobile -->
        <div class="p-4 flex justify-center md:w-[8.25rem]">
          <button @click="applyFilters; isFilterVisible = false"
            class="h-[3rem] w-full md:w-[3rem] bg-brand rounded flex items-center justify-center">
            <img src="/public/assets/svg/search-sm.svg" alt="Search">
            <span class="ml-2 md:hidden">Apply Filters</span>
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-col flex-grow space-y-3">
      <div class="flex items-center justify-between">
        <H3 class="text-black font-bold text-xl sm:text-[1.25rem]">
          My Checks
        </H3>

        <!-- Filter indicator/button -->
        <button v-if="!isFilterVisible && (selectedBrand || selectedYear || selectedEngine || selectedMonth)"
          @click="toggleFilters"
          class="flex items-center px-3 py-1 space-x-1 text-sm rounded-full md:hidden text-brand bg-brand/10">
          <span>Filters ({{ [selectedBrand, selectedYear, selectedEngine, selectedMonth].filter(Boolean).length
          }})</span>
        </button>
      </div>

      <!-- Empty state -->
      <div v-if="filteredCars.length === 0 && !isLoading" class="flex items-center justify-center py-12 text-gray-500">
        <div class="text-center">
          <p>No cars match your search criteria</p>
        </div>
      </div>

      <!-- Update the cars grid to fill available space -->
      <div v-else
        class="grid flex-grow h-full grid-cols-1 gap-4 pr-2 overflow-y-auto transition-all duration-300 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 custom-scrollbar md:pr-6"
        :class="{
          'pb-20': isFilterVisible && isMobileWidth,
          'max-h-[32.5rem]': !isMobileWidth,
          'min-h-[50vh]': isMobileWidth
        }">
        <DashboardCarInfo v-for="(car, index) in filteredCars" :key="car.id || index" :car="car" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 116, 0, 0.8);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #ff7400;
  cursor: pointer;
}
</style>
