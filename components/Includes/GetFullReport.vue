<script setup lang="ts">
import { navigateTo } from 'nuxt/app';
import { computed, defineProps, reactive, ref, watch } from 'vue';

// Store initialization
const carRegistrationSearchStore = useCarRegistrationSearchStore();
const authStore = useAuthStore();

const errorMessage = ref<string | null>(null);
const showPasswordField = ref(false);
const reportText = ref<string>('');
const form = reactive({
    email: '',
    password: '',
});
const getFullReportButton = ref('Get full report');
const getFullReportY = ref('Get full report');

// Props
const props = defineProps({
    getFullReport: {
        type: String,
        default: 'Get full report',
    },
    class: {
        type: String,
        default: 'w-72',
    },
    showForm: {
        type: Boolean,
        default: true,
    }
});
const { downloadReport: runDownload, isDownloading, isAnyDownloading, errorMessage: downloadError } = useDownloadReport();

const downloadReport = async () => {
    getFullReportY.value = "Downloading...";
    const result = await runDownload(carRegistrationSearchStore.reg_number);

    if (result?.success) {
        getFullReportY.value = "Downloaded";
        return;
    }

    getFullReportButton.value = "Get full report";
    getFullReportY.value = "Get full report";
    errorMessage.value = downloadError.value;
    if (errorMessage.value) {
        setTimeout(() => { errorMessage.value = ""; }, 3000);
    }
};

const handleGetFullReport = async () => {
    getFullReportY.value = "Processing...";
    try {
        const response = await authStore.checkEmailExists({ email: form.email });
        if (response.success && response.payload) {
            // The store has already signed a newly created user in by this point.
            if (response.payload.user_type === "newlyCreatedUser") {
                // navigateTo('payment/plans');
                navigateTo('pricing');
            } else {
                showPasswordField.value = true;
                getFullReportY.value = "Submit";
            }
        } else {
            getFullReportY.value = "Get full report";
            throw new Error('Failed to retrieve the report data.');
        }
    } catch (error) {
        getFullReportY.value = "Get full report";
        errorMessage.value = error?.data?.message || 'Error occurred while verifying email.';
    }
};

// const handleLoginSubmit = async () => {
//     getFullReportY.value = "Processing...";

//     try {
//         const response = await authStore.makeLogin(form);
//         if (!response.success) {
//             errorMessage.value = "Login failed.";
//             getFullReportY.value = "Get full report";
//         } else {
//             let payload = response.payload;
//             if (response.success) {
//                 showPasswordField.value = false;
//             }
//             //make frontend log in
//             const tokenStore = useTokenStore();
//             tokenStore.setToken(payload.access_token, payload.access_token);
//             await authStore.setUser(payload.user);

//             if (payload.hasSubscription) {
//                 let hasSubscription = payload.hasSubscription;

//                 if (hasSubscription.active) {
//                     downloadReport()
//                 } else {
//                     navigateTo('payment/plans');
//                 }
//             } else {
//                 navigateTo('payment/plans');
//             }
//             getFullReportY.value = "Get full report";
//         }
//     } catch (error) {
//         getFullReportY.value = "Get full report";
//         errorMessage.value = error?.data?.message || 'Something went wrong. Please try again!';
//     }
// };


const handleLoginSubmit = async () => {
    getFullReportY.value = "Processing...";

    try {
        const response = await authStore.makeLogin(form);
        if (!response.success) {
            errorMessage.value = "Login failed.";
            getFullReportY.value = "Get full report";
        } else {
            let payload = response.payload;
            showPasswordField.value = false;

            // Make frontend log in
            const tokenStore = useTokenStore();
            tokenStore.setToken(payload.access_token, payload.access_token);
            await authStore.setUser(payload.user);

            if (payload.hasSubscription?.active) {
                downloadReport();
            } else {
                navigateTo('payment/plans');
            }
            getFullReportY.value = "Get full report";
        }
    } catch (error) {
        getFullReportY.value = "Get full report";
        errorMessage.value = error?.data?.message || 'Something went wrong. Please try again!';
    }
};

// Watch for updates to the full report text
watch(
    () => carRegistrationSearchStore.getFullReportText,
    (textVal) => {
        if (textVal) {
            reportText.value = textVal;
        }
    },
    { immediate: true }
);
</script>

<template>

    <div v-if="showForm" :class="props.class">
        <form @submit.prevent="handleGetFullReport"
            v-if="(!authStore.user || Object.keys(authStore.user).length === 0) && !showPasswordField"
            class="space-y-2">
            <FormInputText id="email" v-model="form.email" placeholder="Enter your email address" type="text" />
            <button class="w-full" :class="['bg-[#FF7400] text-white text-xl rounded-lg py-2']">
                {{ getFullReportY }}
            </button>
        </form>

        <form @submit.prevent="handleLoginSubmit" v-else-if="showPasswordField" class="space-y-2">
            <FormInputText id="password" v-model="form.password" placeholder="Enter your password" type="password" />
            <button class="w-full" :class="['bg-[#FF7400] text-white text-xl rounded-lg py-2']">
                {{ getFullReportY }}
            </button>
        </form>
        <button v-else @click.prevent="downloadReport" :disabled="isAnyDownloading" :aria-busy="isDownloading"
            class="flex items-center justify-center w-full gap-2 bg-[#FF7400] text-white text-xl rounded-lg py-2 disabled:cursor-not-allowed"
            :class="isDownloading ? 'opacity-70' : isAnyDownloading ? 'opacity-80' : ''">
            <span v-if="isDownloading" class="w-5 h-5 border-2 rounded-full border-white/40 border-t-white animate-spin" aria-hidden="true"></span>
            {{ isDownloading ? 'Downloading...' : getFullReportY }}
        </button>
        <div class="w-full text-center">
            <small v-if="errorMessage" class="mt-2 text-red-500">{{ errorMessage }}</small>
        </div>
        <!-- <NuxtLink to="/pricing" v-if="hasSubscription?.active"
            class="block ml-auto text-right text-blue-500 hover:underline">
            Buy Single Offer
        </NuxtLink>
        <NuxtLink to="/pricing" v-if="hasSubscription?.subscription == null"
            class="block ml-auto text-right text-blue-500 hover:underline">
            Buy Plan
        </NuxtLink> -->
    </div>
    <div v-else class="bg-red-400 w-[22rem] flex items-center justify-end rounded-lg">
        <a href="#report" class="w-full px-20 py-2 text-center text-white rounded-lg bg-brand">Get full report</a>
    </div>

</template>
