<script lang="ts" setup>
import Hashed from '../Includes/Hashed.vue';

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

const getCo2LabelBand = (value: number) => {
  if (value >= 0 && value <= 100) return 'A';
  if (value >= 101 && value <= 120) return 'B-C';
  if (value >= 121 && value <= 140) return 'D-E';
  if (value >= 141 && value <= 165) return 'F-G';
  if (value >= 166 && value <= 185) return 'H-I';
  if (value >= 186 && value <= 225) return 'J-K';
  if (value >= 226) return 'L';
};

onMounted(async () => {
  await carRegistrationSearchStore.fetchVehicleMotVed();
  await carRegistrationSearchStore.fetchVehicleRegistration();

  // Assign CO2 value only if data exists
  const emissions = MOTVed.value?.VedCo2Emissions ?? vehicleRegistration.value?.Co2Emissions;

  if (emissions !== undefined && emissions !== null) {
    setCo2label(emissions);
  }
});

function getPrice(priceType: string = '12month'): string {
  const standardRate = MOTVed.value?.VedRate?.Standard;
  if (!standardRate) return 'N/A';

  const annualRate = Number(standardRate.TwelveMonth);

  switch (priceType.toLowerCase()) {
    case '12month':
      return standardRate.TwelveMonth == null ? 'N/A' : String(standardRate.TwelveMonth);
    case '6month':
      return standardRate.SixMonth == null ? 'N/A' : String(standardRate.SixMonth);
    case 'monthly':
      return Number.isFinite(annualRate)
        ? (annualRate * 1.05 / 12).toFixed(2)
        : 'N/A';
    case 'total':
      return Number.isFinite(annualRate)
        ? (annualRate * 1.05).toFixed(2)
        : 'N/A';
    default:
      return 'N/A';
  }
}
const { isShowAble } = useIsShowAble();


</script>

<template>

  <report-wrapper class="py-9">
    <div class="flex items-center justify-between text-black ">
      <div class="flex items-center space-x-4 cursor-pointer" @click.prevent="toggleTableVisibility">
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="31" viewBox="0 0 23 31" fill="none">
          <ellipse cx="11.6741" cy="7.22998" rx="6.00804" ry="6" fill="white" />
          <path
            d="M0 1.46634V2.32268H2.94835V1.46634C2.94835 0.656919 2.29055 0 1.48005 0C0.669546 0 0 0.656919 0 1.46634Z"
            fill="#0F1829" />
          <path
            d="M6.76552 26.1008H18.6999V2.0646C18.6999 0.926725 17.7719 0 16.6325 0H3.547C3.84066 0.422305 4.01685 0.926725 4.01685 1.46634V29.7608C4.01685 29.8781 4.06384 29.9719 4.13432 30.054L5.46166 29.7608C6.36614 29.5613 6.78901 28.7637 6.78901 28.1067C6.78901 27.6962 6.6363 27.3091 6.35439 26.9923C6.21343 26.8281 6.17819 26.6052 6.26042 26.4175C6.34264 26.2181 6.54233 26.1008 6.75377 26.1008H6.76552ZM11.2644 1.84172C14.1423 1.84172 16.4915 4.18786 16.4915 7.06188C16.4915 9.9359 14.1423 12.282 11.2644 12.282C8.38652 12.282 6.03724 9.9359 6.03724 7.06188C6.03724 4.18786 8.37477 1.84172 11.2644 1.84172ZM6.57757 16.2705H15.4109C15.7045 16.2705 15.9512 16.5168 15.9512 16.8101C15.9512 17.1034 15.7045 17.3497 15.4109 17.3497H6.57757C6.28391 17.3497 6.03724 17.1034 6.03724 16.8101C6.03724 16.5168 6.28391 16.2705 6.57757 16.2705ZM14.1305 19.5316C14.1305 19.8249 13.8838 20.0712 13.5902 20.0712H8.41001C8.11635 20.0712 7.86968 19.8249 7.86968 19.5316C7.86968 19.2383 8.11635 18.992 8.41001 18.992H13.5902C13.8838 18.992 14.1305 19.2383 14.1305 19.5316ZM6.03724 22.2531C6.03724 21.9599 6.28391 21.7135 6.57757 21.7135H15.4109C15.7045 21.7135 15.9512 21.9599 15.9512 22.2531C15.9512 22.5464 15.7045 22.7927 15.4109 22.7927H6.57757C6.28391 22.7927 6.03724 22.5464 6.03724 22.2531Z"
            fill="#0F1829" />
          <path
            d="M11.2656 11.2028C13.5562 11.2028 15.4121 9.34932 15.4121 7.06183C15.4121 4.77435 13.5562 2.9209 11.2656 2.9209C8.97507 2.9209 7.11914 4.77435 7.11914 7.06183C7.11914 9.34932 8.97507 11.2028 11.2656 11.2028ZM10.7253 4.23474V3.73032C10.7253 3.43705 10.972 3.1907 11.2656 3.1907C11.5593 3.1907 11.806 3.43705 11.806 3.73032V4.23474C12.6047 4.44589 13.192 5.10281 13.192 5.87703C13.192 6.1703 12.9454 6.41665 12.6517 6.41665C12.358 6.41665 12.1114 6.1703 12.1114 5.87703C12.1114 5.52511 11.7237 5.23185 11.2656 5.23185C10.8075 5.23185 10.4199 5.52511 10.4199 5.87703C10.4199 6.22895 10.8075 6.52222 11.2656 6.52222C12.0174 6.52222 12.7104 6.92107 13.0158 7.53106C13.2273 7.94164 13.2508 8.39913 13.0863 8.82144C12.9101 9.27893 12.5107 9.65432 12.0057 9.84201C11.9352 9.86547 11.8764 9.8772 11.806 9.90066V10.4051C11.806 10.6983 11.5593 10.9447 11.2656 10.9447C10.972 10.9447 10.7253 10.6983 10.7253 10.4051V9.91239C10.2084 9.78335 9.76208 9.44316 9.51541 8.97394C9.43319 8.82144 9.3862 8.66894 9.36271 8.50471C9.31572 8.21144 9.51541 7.9299 9.80907 7.88298C10.1027 7.83606 10.3846 8.03548 10.4316 8.32875C10.4316 8.37567 10.4551 8.43432 10.4786 8.48125C10.6078 8.73932 10.925 8.89182 11.2656 8.89182C11.3831 8.89182 11.5123 8.86836 11.6298 8.83317C11.8412 8.75105 12.0056 8.61029 12.0761 8.43432C12.1114 8.34048 12.1349 8.19971 12.0526 8.02375C11.9234 7.77741 11.6063 7.61318 11.2656 7.61318C10.2084 7.61318 9.33921 6.83895 9.33921 5.88876C9.33921 5.10281 9.92653 4.45762 10.7253 4.24647V4.23474Z"
            fill="#0F1829" />
          <path
            d="M20.9315 30.2297C21.8007 30.2297 22.5173 29.5258 22.5173 28.646V27.1797H7.70503C7.81075 27.473 7.86948 27.7897 7.86948 28.1181C7.86948 28.9628 7.50534 29.7252 6.89453 30.2297H20.9315Z"
            fill="#0F1829" />
        </svg>
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
            <tr>
              <th>Single payment (12 months)</th>
              <td>
                <p v-if="isShowAble">
                  {{ getPrice('12month') }}
                </p>
                <Hashed contain="stars" v-else />
              </td>
            </tr>
            <tr>
              <th>Single six month payment</th>

              <td>
                <p v-if="isShowAble">{{ getPrice('6month') }}
                </p>
                <Hashed contain="stars" v-else />
              </td>
            </tr>
            <tr>
              <th>Total payable by 12 monthly installments</th>
              <td>
                <p v-if="isShowAble">{{ getPrice('total') }}</p>
                <Hashed contain="stars" v-else />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="co2label !== null" class="relative flex items-center justify-center mt-20 lg:px-20">
        <div class="grid grid-cols-7 gap-0 relative w-[70rem]">
          <div v-for="band in co2Bands" :key="band.label" :class="getClass(band.min, band.max)"
            :style="{ backgroundColor: band.color }"
            class="relative flex flex-col items-center space-y-3 text-2xl text-center">

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
              <td v-else>{{ co2label ? getCo2LabelBand(co2label) : 'N/A' }}</td>
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

/* tr:nth-child(even) {
  background-color: #f9f9f9;
} */

.header-row th {
  text-transform: uppercase;
}

.grid {
  grid-template-columns: repeat(7, 1fr);
}
</style>
