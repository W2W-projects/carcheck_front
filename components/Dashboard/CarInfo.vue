<template>
  <div
    class="h-[12.5rem] rounded-xl bg-white flex flex-col items-center justify-between px-[1.7rem] py-[1.25rem] text-black">
    <div class="flex w-full">
      <div class="flex items-center flex-1 space-x-1">
        <div v-show="car?.details?.vbrand_logo" class="w-7">
          <img :src="car?.details?.vbrand_logo" class="w-full" alt="Logo">
        </div>
        <div class="flex flex-col leading-3">
          <small class="font-bold">{{ car.details?.make ?? car.details?.makeModel }}</small>
          <p class="text-[0.5rem] font-bold text-[#CFCCCC]">{{ car.details?.makeModel }}</p>
        </div>
      </div>
      <div>
        <p class="text-[0.65rem] font-bold">{{ car.details?.yearOfManufacture }}</p>
      </div>
    </div>
    <div>
      <img :src="car.image" alt="" class="max-w-[9rem]">
    </div>

    <div class="flex w-full space-x-2">
      <div class="flex justify-between flex-1 space-x-1">
        <div class="leading-3">
          <div class="text-[0.5rem] space-x-1 flex items-center">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <rect x="0.67571" y="3.06058" width="6.5" height="2" transform="rotate(-21.5245 0.67571 3.06058)"
                  fill="white" stroke="#0F1829" stroke-width="0.5" stroke-linejoin="round" />
                <circle cx="1.97297" cy="3.62393" r="0.25" transform="rotate(-21.5245 1.97297 3.62393)"
                  fill="#0F1829" />
                <circle cx="6.15901" cy="1.97287" r="0.25" transform="rotate(-21.5245 6.15901 1.97287)"
                  fill="#0F1829" />
                <rect x="0.864781" y="2.90416" width="6.5" height="2" transform="rotate(-1.00816 0.864781 2.90416)"
                  fill="white" stroke="#0F1829" stroke-width="0.5" stroke-linejoin="round" />
                <circle cx="1.88229" cy="3.88643" r="0.25" transform="rotate(-1.00816 1.88229 3.88643)"
                  fill="#0F1829" />
                <circle cx="6.38156" cy="3.80721" r="0.25" transform="rotate(-1.00816 6.38156 3.80721)"
                  fill="#0F1829" />
                <rect x="1.59627" y="2.71498" width="6.5" height="2" transform="rotate(25.5727 1.59627 2.71498)"
                  fill="white" stroke="#0F1829" stroke-width="0.5" stroke-linejoin="round" />
                <circle cx="2.06657" cy="4.04869" r="0.25" transform="rotate(25.5727 2.06657 4.04869)" fill="#0F1829" />
                <circle cx="6.1259" cy="5.99114" r="0.25" transform="rotate(25.5727 6.1259 5.99114)" fill="#0F1829" />
              </svg>
            </span>
            <span>Plate</span>
          </div>
          <div class="text-[0.7rem] uppercase font-bold">
            {{ car.reg_number }}
          </div>
        </div>
        <div class="leading-3">
          <div class="text-[0.5rem] space-x-1 flex items-center">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                <g clip-path="url(#clip0_959_361)">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3.5 0C5.4348 0 7 1.5659 7 3.49532C7 5.42473 5.4348 6.99063 3.5 6.99063C1.5652 6.99063 0 5.42473 0 3.49532C0 1.5659 1.568 0 3.5 0Z"
                    fill="#0F1829" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3.50008 0.433411C5.19408 0.433411 6.56608 1.80357 6.56608 3.49531C6.56608 5.18704 5.19408 6.5572 3.50008 6.5572C1.80608 6.5572 0.434082 5.18704 0.434082 3.49531C0.434082 1.80357 1.80608 0.433411 3.50008 0.433411Z"
                    fill="white" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3.39347 1.5519C2.31827 1.61342 1.49507 2.53059 1.55667 3.60435C1.58467 4.13843 1.83107 4.6138 2.20067 4.94375L1.86187 5.32404H1.86467C1.39427 4.9074 1.08627 4.309 1.04707 3.63231C0.97427 2.27892 2.01027 1.12128 3.36547 1.04578L3.39347 1.5519Z"
                    fill="#0F1829" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3.63713 1.04578C4.99233 1.12128 6.02833 2.27892 5.95273 3.63231C5.91633 4.309 5.60553 4.9074 5.13513 5.32404H5.13793L4.79913 4.94655C5.17153 4.6138 5.41513 4.14123 5.44593 3.60435C5.50473 2.53059 4.68433 1.61342 3.60913 1.5519L3.63713 1.04578Z"
                    fill="#0F1829" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M6.08438 2.13916L4.27278 2.98642L2.46118 3.83649L2.53958 3.98469L2.61798 4.13568L4.35118 3.13742L6.08438 2.13916Z"
                    fill="#0F1829" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3.49974 2.99481C3.77694 2.99481 4.00374 3.21851 4.00374 3.49534C4.00374 3.77217 3.77694 3.99587 3.49974 3.99587C3.22254 3.99587 2.99854 3.77217 2.99854 3.49534C2.99854 3.21851 3.22254 2.99481 3.49974 2.99481Z"
                    fill="#0F1829" />
                </g>
                <defs>
                  <clipPath id="clip0_959_361">
                    <rect width="7" height="6.99063" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span>Mileage</span>
          </div>
          <div class="text-[0.7rem] font-bold">
            {{ car.details?.mileage }}
          </div>
        </div>
        <div class="leading-3">
          <div class="text-[0.5rem] space-x-1 flex items-center">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
                <path
                  d="M7.85328 2.37078H7.70515V3.55625H7.55702V2.51906C7.55702 2.27386 7.35769 2.07453 7.11249 2.07453H6.51984V1.48187C6.51984 1.31892 6.38654 1.18547 6.22343 1.18547H5.03796V1.03734H6.96421V0H2.22265V1.03719H4.1489V1.18531H2.96344C2.80048 1.18531 2.66703 1.31861 2.66703 1.48172V2.07438C2.42184 2.07438 2.2225 2.27371 2.2225 2.51891V2.57547L1.74296 2.81531H1.18531V3.55625H1.03719V2.07453H0V5.92703H1.03719V4.44531H1.18531V5.18624H1.74296L2.2225 5.42609V5.48265C2.2225 5.72784 2.42184 5.92718 2.66703 5.92718H2.81516V6.22358C2.81516 6.38654 2.94846 6.51999 3.11156 6.51999H4.88969C5.05264 6.51999 5.18609 6.38669 5.18609 6.22358V5.92718H7.11234C7.35753 5.92718 7.55687 5.72784 7.55687 5.48265V4.44546H7.705V5.63521H7.85312C8.26158 5.63521 8.59406 5.30288 8.59406 4.89427V3.11187C8.59406 2.70341 8.26173 2.37093 7.85312 2.37093L7.85328 2.37078ZM0.740936 5.63062H0.296405V2.37078H0.740936V5.63062ZM1.18547 4.1489H1.03734V3.8525H1.18547V4.1489ZM1.63 4.88984H1.48187V3.11172H1.63V4.88984ZM2.22265 5.09452L1.92625 4.9464V3.05516L2.22265 2.90703V5.09468V5.09452ZM2.51891 0.740936V0.296405H6.66781V0.740936H2.51891ZM4.74156 1.03734V1.18547H4.44516V1.03734H4.74156ZM2.96344 1.48187H6.22328V2.07453H2.96344V1.48187ZM4.88969 6.22343H3.11156V5.92703H4.88969V6.22343ZM7.26047 5.4825C7.26047 5.56413 7.19397 5.63062 7.11234 5.63062H2.66718C2.58556 5.63062 2.51906 5.56413 2.51906 5.4825V2.51891C2.51906 2.43728 2.58556 2.37078 2.66718 2.37078H7.11234C7.19397 2.37078 7.26047 2.43728 7.26047 2.51891V5.48234V5.4825ZM7.705 4.1489H7.55687V3.8525H7.705V4.1489ZM8.29765 4.89412C8.29765 5.08734 8.17383 5.25213 8.00125 5.31327V2.69256C8.17368 2.75371 8.29765 2.91849 8.29765 3.11172V4.89412Z"
                  fill="black" />
                <path d="M6.37168 2.96344H2.81543V3.25984H6.37168V2.96344Z" fill="black" />
                <path d="M6.37168 4.74158H2.81543V5.03798H6.37168V4.74158Z" fill="black" />
                <path d="M6.37168 3.85254H2.81543V4.14894H6.37168V3.85254Z" fill="black" />
                <path d="M6.37168 2.96344H2.81543V3.25984H6.37168V2.96344Z" fill="black" />
                <path d="M6.37168 4.74158H2.81543V5.03798H6.37168V4.74158Z" fill="black" />
                <path d="M6.37168 3.85254H2.81543V4.14894H6.37168V3.85254Z" fill="black" />
              </svg>
            </span>
            <span>Type</span>
          </div>
          <div class="text-[0.7rem] font-bold">
            {{ car.details?.fuelType }}
          </div>
        </div>
        <button @click="handleSeeMoreClick(car)"
          class="flex items-center space-x-1 text-[0.58rem]  font-bold text-[#C2C2C2]">
          <p>See more</p>
          <span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.00001 9.16668C7.3012 9.16668 9.16668 7.3012 9.16668 5.00001C9.16668 2.69882 7.3012 0.833344 5.00001 0.833344C2.69882 0.833344 0.833344 2.69882 0.833344 5.00001C0.833344 7.3012 2.69882 9.16668 5.00001 9.16668Z"
                stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M4.4751 6.47084L5.94176 5.00001L4.4751 3.52917" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>

  <CarDetailsModal v-if="selectedCar" v-model:isOpen="isModalOpen" :car="selectedCar" @download="downloadReport" />
</template>

<script lang="ts" setup>
import CarDetailsModal from './CarDetailsModal.vue';

defineProps({
  car: {
    type: Object,
    required: true
  }
});

const { isModalOpen, selectedCar, showCarDetailsModal } = useCarDetails();
const { downloadReport } = useDownloadReport();

function handleSeeMoreClick(data: any) {
  showCarDetailsModal(data);
}
</script>

<style></style>