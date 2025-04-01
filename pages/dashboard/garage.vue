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
    if (!car.details?.motHistory?.RecordList) return;

    car.details.motHistory.RecordList.forEach(record => {
      if (!record.TestDate) return;

      // Improved date parsing for the format DD/MM/YYYY
      try {
        // Check if the date format is DD/MM/YYYY
        if (record.TestDate.includes('/')) {
          const [day, month, year] = record.TestDate.split('/');
          const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          if (!isNaN(date.getTime())) {
            months.add(date.toLocaleString('default', { month: 'long' }));
          }
        } else {
          // Fallback to regular date parsing
          const date = new Date(record.TestDate);
          if (!isNaN(date.getTime())) {
            months.add(date.toLocaleString('default', { month: 'long' }));
          }
        }
      } catch (e) {
        console.error("Error parsing date:", record.TestDate);
      }
    });
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

    let matchesMonth = true;
    if (selectedMonth.value && car.details.motHistory?.RecordList) {
      matchesMonth = car.details.motHistory.RecordList.some((record) => {
        if (!record.TestDate) return false;

        // Improved date parsing for the format DD/MM/YYYY
        try {
          if (record.TestDate.includes('/')) {
            const [day, month, year] = record.TestDate.split('/');
            const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            if (!isNaN(date.getTime())) {
              return date.toLocaleString('default', { month: 'long' }) === selectedMonth.value;
            }
          } else {
            const date = new Date(record.TestDate);
            if (!isNaN(date.getTime())) {
              return date.toLocaleString('default', { month: 'long' }) === selectedMonth.value;
            }
          }
        } catch (e) {
          return false;
        }
        return false;
      });
    }

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

onMounted(async () => {
  document.addEventListener('click', handleClickOutside);

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
});
</script>

<template>
  <div class="space-y-3">
    <!-- Loading State -->
    <div v-if="isLoading"
      class="h-[5.625rem] bg-white border border-gray-50 rounded-lg flex items-center justify-center">
      <div class="w-6 h-6 border-2 rounded-full border-t-primary border-primary-light animate-spin"></div>
    </div>

    <div v-else class="h-[5.625rem] bg-white border border-gray-50 rounded-lg flex items-center justify-around">
      <div class="grid flex-1 grid-cols-4 pl-10">
        <!-- Car Brand Dropdown -->
        <div class="relative px-5 border-r dropdown">
          <label for="car-brand" class="block mb-1 text-sm font-semibold text-gray-500">Car brand</label>
          <div class="relative text-black">
            <button type="button" class="flex items-center justify-between w-full py-2 text-left cursor-pointer "
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
        <div class="relative px-5 border-r dropdown">
          <label for="car-year" class="block mb-1 text-sm font-semibold text-gray-500">Car year</label>
          <div class="relative text-black">
            <button type="button" class="flex items-center justify-between w-full py-2 text-left cursor-pointer "
              @click="yearOpen = !yearOpen">
              <span class="text-sm font-bold">{{ tempSelectedYear || 'All years' }}</span>
              <img src="/public/assets/svg/chevron-down.svg" alt="dropdown"
                :class="{ 'transform rotate-180': yearOpen }">
            </button>
            <div v-if="yearOpen" class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div @click="tempSelectedYear = ''; yearOpen = false" class="px-3 py-2 cursor-pointer hover:bg-gray-100">
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
        <div class="relative px-5 border-r dropdown">
          <label for="engine-type" class="block mb-1 text-sm font-semibold text-gray-500">Engine type</label>
          <div class="relative text-black">
            <button type="button" class="flex items-center justify-between w-full py-2 text-left cursor-pointer "
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
              <div v-for="engine in engineTypes" :key="engine" @click="tempSelectedEngine = engine; engineOpen = false"
                class="px-3 py-2 cursor-pointer hover:bg-gray-100">
                {{ engine }}
              </div>
            </div>
          </div>
        </div>

        <!-- Month of Check Dropdown -->
        <div class="relative px-5 border-r dropdown">
          <label for="check-month" class="block mb-1 text-sm font-semibold text-gray-500">Month of check</label>
          <div class="relative text-black">
            <button type="button" class="flex items-center justify-between w-full py-2 text-left cursor-pointer "
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
      <div class="w-[8.25rem]">
        <button @click="applyFilters"
          class="h-[3rem] w-[3rem] bg-primary rounded flex items-center justify-center mx-auto">
          <img src="/public/assets/svg/search-sm.svg" alt="">
        </button>
      </div>
    </div>

    <div class="space-y-3">
      <H3 class="text-black font-bold text-[1.25rem]">
        My Checks
      </H3>

      <!-- Empty state -->
      <div v-if="filteredCars.length === 0 && !isLoading" class="flex items-center justify-center py-12 text-gray-500">
        <div class="text-center">
          <p>No cars match your search criteria</p>
        </div>
      </div>

      <!-- Cars grid - keep the same design -->
      <div v-else
        class="grid max-h-[32.5rem] grid-cols-4 gap-4 overflow-y-auto custom-scrollbar pr-6 transition-all duration-300">
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