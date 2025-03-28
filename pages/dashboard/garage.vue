<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import carData from '@/static/carData.json'; // Import car data

definePageMeta({
  title: 'Car Check Garage',
  layout: 'dashboard',
});

// Normalize carData to always be an array
const normalizedCarData = Array.isArray(carData) ? carData : [carData];

// Dropdown state variables
const brandOpen = ref(false);
const yearOpen = ref(false);
const engineOpen = ref(false);
const monthOpen = ref(false);

// Selected values
const selectedBrand = ref('');
const selectedYear = ref('');
const selectedEngine = ref('');
const selectedMonth = ref('');

// Temporary filter values (used before applying filters)
const tempSelectedBrand = ref('');
const tempSelectedYear = ref('');
const tempSelectedEngine = ref('');
const tempSelectedMonth = ref('');

// Extract unique values for dropdowns
const carBrands = [...new Set(normalizedCarData.map((car) => car.details.make))];
const carYears = [...new Set(normalizedCarData.map((car) => car.details.yearOfManufacture))];
const engineTypes = [...new Set(normalizedCarData.map((car) => car.details.fuelType).filter((type) => type))];
const monthsOfCheck = [
  ...new Set(
    normalizedCarData.flatMap((car) =>
      car.details.motHistory?.RecordList?.map((record) => {
        const date = new Date(record.TestDate);
        return date.toLocaleString('default', { month: 'long' });
      }) || []
    )
  ),
];

// Filtered data based on selected filters
const filteredCars = ref(normalizedCarData);

const applyFilters = () => {
  selectedBrand.value = tempSelectedBrand.value;
  selectedYear.value = tempSelectedYear.value;
  selectedEngine.value = tempSelectedEngine.value;
  selectedMonth.value = tempSelectedMonth.value;

  filteredCars.value = normalizedCarData.filter((car) => {
    const matchesBrand = !selectedBrand.value || car.details.make === selectedBrand.value;
    const matchesYear = !selectedYear.value || car.details.yearOfManufacture === selectedYear.value;
    const matchesEngine = !selectedEngine.value || car.details.fuelType === selectedEngine.value;
    const matchesMonth =
      !selectedMonth.value ||
      car.details.motHistory?.RecordList?.some((record) => {
        const date = new Date(record.TestDate);
        const month = date.toLocaleString('default', { month: 'long' });
        return month === selectedMonth.value;
      });

    return matchesBrand && matchesYear && matchesEngine && matchesMonth;
  });
};

// Close dropdowns when clicking outside
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

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="space-y-3">
    <div class="h-[5.625rem] bg-white border border-gray-50 rounded-lg flex items-center justify-around">
      <div class="grid flex-1 grid-cols-4 pl-10">
        <!-- Car Brand Dropdown -->
        <div class="relative dropdown">
          <label for="car-brand" class="block mb-1 text-sm text-gray-600">Car brand</label>
          <div class="relative pr-3 text-black">
            <button type="button" class="flex items-center justify-between w-full py-2 pr-3 text-left cursor-pointer "
              @click="brandOpen = !brandOpen">
              <span class="text-sm font-bold">{{ tempSelectedBrand || 'All brands' }}</span>
              <img src="/assets/svg/chevron-down.svg" alt="dropdown" :class="{ 'transform rotate-180': brandOpen }">
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
        <div class="relative dropdown">
          <label for="car-year" class="block mb-1 text-sm text-gray-600">Car year</label>
          <div class="relative pr-3 text-black">
            <button type="button" class="flex items-center justify-between w-full py-2 pr-3 text-left cursor-pointer "
              @click="yearOpen = !yearOpen">
              <span class="text-sm font-bold">{{ tempSelectedYear || 'All years' }}</span>
              <img src="/assets/svg/chevron-down.svg" alt="dropdown" :class="{ 'transform rotate-180': yearOpen }">
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
        <div class="relative dropdown">
          <label for="engine-type" class="block mb-1 text-sm text-gray-600">Engine type</label>
          <div class="relative pr-3 text-black">
            <button type="button" class="flex items-center justify-between w-full py-2 pr-3 text-left cursor-pointer "
              @click="engineOpen = !engineOpen">
              <span class="text-sm font-bold">{{ tempSelectedEngine || 'All types' }}</span>
              <img src="/assets/svg/chevron-down.svg" alt="dropdown" :class="{ 'transform rotate-180': engineOpen }">
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
        <div class="relative dropdown">
          <label for="check-month" class="block mb-1 text-sm text-gray-600">Month of check</label>
          <div class="relative pr-3 text-black">
            <button type="button" class="flex items-center justify-between w-full py-2 pr-3 text-left cursor-pointer "
              @click="monthOpen = !monthOpen">
              <span class="text-sm font-bold">{{ tempSelectedMonth || 'All months' }}</span>
              <img src="/assets/svg/chevron-down.svg" alt="dropdown" :class="{ 'transform rotate-180': monthOpen }">
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
          <img src="/assets/svg/search-sm.svg" alt="">
        </button>
      </div>
    </div>

    <div class="space-y-3">
      <H3 class="text-black font-bold text-[1.25rem]">
        My Checks
      </H3>
      <div
        class="grid max-h-[32.5rem] grid-cols-4 gap-4 overflow-y-auto custom-scrollbar pr-6 transition-all duration-300">
        <DashboardCarInfo v-for="(car, index) in filteredCars" :key="index" :car="car" />
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