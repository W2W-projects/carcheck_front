<script lang="ts" setup>
const isTableVisible = ref(true);
const carRegistrationSearchStore = useCarRegistrationSearchStore();

const MOTVed = computed(() => carRegistrationSearchStore.motVed);
const vehicleRegistration = computed(() => carRegistrationSearchStore.vehicleRegistration);

const co2label = ref<number | null>(null);

const toggleTableVisibility = () => {
  isTableVisible.value = !isTableVisible.value;
};

const getClass = (min: number, max: number) => {
  if (co2label.value === null) return 'py-7';
  return co2label.value >= min && co2label.value <= max ? 'border-4 border-black py-6' : 'py-7';
};

const isClassActive = (min: number, max: number) => {
  return co2label.value !== null && co2label.value >= min && co2label.value <= max;
};

const co2Bands = [
  { label: "A", min: 0, max: 100, color: "#31B554", co2Value: 100 },
  { label: "B-C", min: 101, max: 120, color: "#55BB50", co2Value: 120 },
  { label: "D-E", min: 121, max: 140, color: "#92D33E", co2Value: 140 },
  { label: "F-G", min: 141, max: 165, color: "#BFC522", co2Value: 165 },
  { label: "H-I", min: 166, max: 185, color: "#FAAD1C", co2Value: 185 },
  { label: "J-K", min: 186, max: 225, color: "#F77725", co2Value: 225 },
  { label: "L", min: 226, max: Infinity, color: "#E01E20", co2Value: 226 },
];

function setCo2label(value: number | null) {
  co2label.value = value;
}

onMounted(async () => {
  await carRegistrationSearchStore.fetchVehicleMotVed();
  await carRegistrationSearchStore.fetchVehicleRegistration();

  // Assign CO2 value only if data exists
  const emissions = MOTVed.value?.VedCo2Emissions ?? vehicleRegistration.value?.Co2Emissions;

  if (emissions !== undefined && emissions !== null) {
    setCo2label(emissions);
  }
});
</script>

<template>
  <report-wrapper class="py-9">
    <div class="flex items-center justify-between text-black ">
      <div class="flex items-center space-x-4 cursor-pointer" @click.prevent="toggleTableVisibility">
        <p class="flex items-center justify-center text-2xl font-bold">TAX CALCULATION</p>
        <span>
          <img v-if="isTableVisible" src="/svg/chev-down.svg" alt="">
          <img v-else src="/svg/chev-up.svg" alt="">
        </span>
      </div>
    </div>

    <div v-show="isTableVisible" class="text-black space-y-14">
      <div>
        <table class="w-full mt-8 text-black">
          <tbody>
            <tr>
              <th>Vehicle class</th>
              <td>{{ vehicleRegistration?.VehicleClass || 'N/A' }}</td>
            </tr>
            <tr>
              <th>Band</th>
              <td>{{ MOTVed?.VedCo2Band || 'N/A' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="co2label !== null" class="relative flex items-center justify-center mt-20 lg:px-20">
        <div class="grid grid-cols-7 gap-0 relative w-[70rem]">
          <div v-for="band in co2Bands" :key="band.label" :class="getClass(band.min, band.max)"
            :style="{ backgroundColor: band.color }"
            class="relative flex flex-col items-center space-y-3 text-2xl text-center"
            @click="setCo2label(band.co2Value)">

            <div v-if="isClassActive(band.min, band.max)"
              class="hidden lg:block absolute -top-6 bg-black scale-[106%] text-white text-sm py-1 w-full text-center">
              YOUR LABEL
            </div>

            <div class="w-full font-bold text-white border-b">{{ band.label }}</div>
            <div class="text-white">{{ band.min }}</div>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6 6L11 1" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="text-white">{{ band.max === Infinity ? band.co2Value + "+" : band.max }}</div>
          </div>
        </div>
      </div>

      <div>
        <table class="w-full text-black">
          <thead>
            <tr class="header-row">
              <th colspan="2">
                <div class="flex items-center justify-between w-full">
                  <p>CO2 EMISSIONS LABEL</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>CO2 Emissions</th>
              <td v-if="MOTVed?.VedCo2Emissions || vehicleRegistration?.Co2Emissions">
                {{ MOTVed?.VedCo2Emissions || vehicleRegistration?.Co2Emissions }}
              </td>
              <td v-else>N/A</td>
            </tr>
            <tr>
              <th>CO2 Label</th>
              <td v-if="MOTVed?.VedCo2Band">{{ MOTVed?.VedCo2Band }}</td>
              <td v-else>N/A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </report-wrapper>
</template>

<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  text-align: left;
  width: 50%;
  padding: 0.68rem 1.5rem;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.header-row th {
  text-transform: uppercase;
}

.grid {
  grid-template-columns: repeat(7, 1fr);
}
</style>
