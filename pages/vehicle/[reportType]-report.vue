<script setup lang="ts">
import carDefaultImage from '/images/car-icon.png';
const carRegistrationSearchStore = useCarRegistrationSearchStore();

const vbrand_logo = computed(() => carRegistrationSearchStore.vbrand_logo);
const errorMessage = ref(null);
const reportText = ref("Download Report")

const { downloadReport: runDownload, isDownloading, isAnyDownloading, errorMessage: downloadError, reportDate } = useDownloadReport();

const downloadReport = async () => {
    reportText.value = "Downloading...";
    const result = await runDownload(carRegistrationSearchStore.reg_number);
    reportText.value = result?.success ? "Downloaded" : "Download Report";
    errorMessage.value = downloadError.value;
};

</script>


<template>
    <div>
        <div class="flex flex-row justify-center gap-28 py-10 border-2">
            <div class="flex flex-col justify-center items-center">
                <SearchBar />
                <p class="mt-6 text-xs"><span class="font-bold">Report Date:</span> {{ reportDate() }}</p>
                <p class="font-bold my-5 text-lg">BMW Model 2016</p>
                <img :src="vbrand_logo" v-if="vbrand_logo" class="w-26" alt="Brand Logo">
                <img :src="carDefaultImage" v-else alt="" class="w-full rounded-lg">
            </div>
            <div>
                <div class="flex flex-col justify-center items-center">
                    <h1 class="text-2xl font-bold">YOUR <span class="text-orange-500">CAR REPORT</span> IS READY!</h1>
                    <button @click.prevent="downloadReport" :disabled="isAnyDownloading" :aria-busy="isDownloading"
                        class="flex items-center justify-center gap-2 rounded bg-brand text-white text-lg px-20 py-2 mt-6 disabled:cursor-not-allowed"
                        :class="isDownloading ? 'opacity-70' : isAnyDownloading ? 'opacity-80' : ''">
                        <span v-if="isDownloading" class="w-5 h-5 border-2 rounded-full border-white/40 border-t-white animate-spin" aria-hidden="true"></span>
                        {{ isDownloading ? 'Downloading...' : reportText }}
                    </button>

                    <p v-if="errorMessage" id="standard_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">
                        <span class="font-medium"></span> {{ errorMessage }}</p>
                </div>
                <Features></Features>
            </div>
        </div>
        <VehicleGeneralInformation />
        <VehicleEngineAndFuel />
        <VehicleDamageHistory />
        <VehiclePlateChanged />
        <VehicleValuation />
        <VehicleRiskAssessments />
        <VehicleOwnerHistory />
        <VehicleRegistrations />
        <VehicleTaxCalculation />
        <VehicleFinanceCheck />
        <VehicleWriteOff />
        <VehicleMotHistory />
    </div>
</template>
