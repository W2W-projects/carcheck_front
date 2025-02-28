<script setup lang="ts">
import ApiService from '~/services/apiService';
import Hashed from '../Includes/Hashed.vue';
// import Hashed from '../Includes/Hashed.vue';
const errorMessage = ref(null);
const reportText = ref("Get full report");
const tokenStore = useTokenStore();
const authStore = useAuthStore();
const subscriptionStore = useSubscriptionStore();
const reg_number = ref(null);

const carRegistrationSearchStore = useCarRegistrationSearchStore();

const vbrand_logo = computed(() => carRegistrationSearchStore.vbrand_logo);
const vehicle_image = computed(() => carRegistrationSearchStore.vehicleImageUrl);
const smmtDetail = computed(() => carRegistrationSearchStore.smmtDetails);
const totalNumberOfLooksUp = computed(() => carRegistrationSearchStore.totalNumberOfLooksUp);
const hasSubscription = computed(() => subscriptionStore.hasSubscription);

onMounted(async () => {
  await carRegistrationSearchStore.fetchVehicleLogo();
  await carRegistrationSearchStore.fetchVehicleImageUrl();
  await carRegistrationSearchStore.fetchSmmtDetails();
  await carRegistrationSearchStore.fetchNumberOfLooksUp();

  if (typeof window !== 'undefined') {
    const regNumber = localStorage.getItem('reg_number');
    if (regNumber) {
      reg_number.value = regNumber;
    } else {
      reg_number.value = "";
    }
  }

});
const downloadReport = async () => {
  reportText.value = "Downloading...";
  if (tokenStore.getToken && tokenStore.getStatus) {
    let subscription = await subscriptionStore.getUserSubscription();
    let hasSubscription = subscriptionStore.hasSubscription;

    if ((hasSubscription.request_count > 0) && hasSubscription.active) {
      try {
        let report_type = "";
        if (subscription?.plan?.plan_code == "48h-export-subscription") {
          report_type = "export";
        } else if (subscription?.plan?.plan_code == "48h-basic-subscription") {
          report_type = "basic";
        } else {
          report_type = "single-offer";
        }
        const response = await ApiService.post('users/download-report', {
          email: authStore.user?.email,
          report_type: report_type
        }, { responseType: 'blob' });

        if (response.success && response.payload) {
          const downloadUrl = response.payload;

          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `report-${reportDate()}.pdf`;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          reportText.value = "Downloaded";
        } else {
          reportText.value = "Get full report";
          errorMessage.value = "Failed to retrieve the report data";
          console.error("Error: Invalid response status", response.success);
        }

      } catch (error) {
        reportText.value = "Get full report";
        if (error.data)
          errorMessage.value = error.data.error;
      }
    } else {
      reportText.value = "Get full report";
      console.error("No remaining report downloads available.");
      navigateTo('/payment/plans')
    }
  } else {
    navigateTo('/auth/login');
  }
};
const currentDateTime = () => {
  const date = new Date();

  let day = String(date.getDate()).padStart(2, '0');
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;
  return currentDate;
}
</script>

<template>
  <report-wrapper class="w-full py-5 bg-white">
    <div class="flex flex-col h-full space-x-8 space-y-5 text-black lg:flex-row lg:space-y-0">
      <div class="lg:w-[24%] flex flex-col items-center justify-center">

        <img :src="vbrand_logo" v-if="vbrand_logo" alt="">
        <h3 class="font-bold">{{ smmtDetail?.ModelVariant ?? "HONDA CIVIC TYPE-R GT I-VTEC" }}</h3>
        <div class="bg-[#FFA500] h-[42px] flex items-center justify-center rounded border w-full">
          <h4 class="text-xl w-1/2 rounded border py-[2px] text-center font-bold">{{ reg_number ?? "XXXX XXX" }}</H4>
        </div>
        <div class="flex items-center justify-center">
          <label class="font-extralight">
            Report date: &nbsp;
          </label>
          <p class="font-bold">{{ currentDateTime() }}</p>
        </div>
        <div class="flex items-center justify-center">
          <label class="font-extralight">
            Number of look ups: &nbsp;
          </label>
          <p class="font-bold" v-if="hasSubscription?.active">{{ totalNumberOfLooksUp }}</p>
          <Hashed v-else />
        </div>
      </div>

      <!-- ---------------------------------------------------- -->

      <div class="lg:w-[36.5%] flex items-center justify-center">
        <img :src="vehicle_image" v-if="vehicle_image" alt="" class="w-full rounded-lg">
        <!-- <img src="/images/png/report/demo car 1.png" v-else alt=""> -->
      </div>

      <!-- ---------------------------------------------------- -->

      <div class="flex flex-col items-center justify-center flex-1 space-y-4">
        <h3 class="text-3xl font-bold">
          Your report is ready !
        </h3>
        <div>
          <ul class="grid w-full grid-cols-3 gap-x-2">
            <li class="flex items-center justify-start col-span-1 space-x-2">
              <img src="/assets/svg/damage-check.svg" class="w-4" alt="">
              <small class="font-extralight">Damage Check</small>
            </li>
            <li class="flex items-center justify-start col-span-1 space-x-2">
              <img src="/assets/svg/owner-history.svg" class="w-4" alt="">

              <small class="font-extralight">Owners History</small>
            </li>
            <li class="flex items-center justify-start col-span-1 space-x-2">
              <img src="/assets/svg/theft-check.svg" class="w-4" alt="">

              <small class="font-extralight">Theft Check</small>
            </li>
            <li class="flex items-center justify-start col-span-1 space-x-2">
              <img src="/assets/svg/milage-history.svg" class="w-4" alt="">

              <small class="font-extralight">Mileage History</small>
            </li>
            <li class="flex items-center justify-start col-span-1 space-x-2">
              <img src="/assets/svg/car-features.svg" class="w-4" alt="">

              <small class="font-extralight">Car Features</small>
            </li>
            <li class="col-span-1">
              <p class="text-lg font-bold text-[#FF7400]">And more...</p>
            </li>
          </ul>
        </div>
        <Includes-get-full-report get-full-report="Get full report" class="w-full"></Includes-get-full-report>
        <!-- <button @click.prevent="downloadReport"
          class="bg-[#FF7400] w-full rounded text-xl py-2 font-bold text-white">{{ reportText }}</button> -->
        <!-- <p class="font-light">Gain full access now for £0.00</p> -->
      </div>
    </div>
  </report-wrapper>

</template>