<script setup>
import { ref, reactive } from 'vue';
import { useCarStore } from '@/stores/car.js';
const auth = useAuthStore();
const token = useTokenStore();
const carStore = useCarStore();
const { $event } = useNuxtApp();
const subscriptionStore = useSubscriptionStore();
const loginSubmit = ref("Submit");
const isProcessing = ref(false);
const errorMessage = ref(null);

definePageMeta({
    title: 'Login',
    meta: [
        { hid: 'Login for fetching Registration number details', name: 'Login for fetching Registration number details', content: 'Login for fetching Registration number details' }
    ],
    middleware: ['guest'],
});

const form = reactive({
    email: "",
    password: "",
    procedure: "login_form"
});

const errors = reactive({
    email: null,
    password: null
});

// Validate form
const validateForm = () => {
    errors.email = null;
    errors.password = null;

    if (!form.email) {
        errors.email = "Email is required";
    }
    if (!form.password) {
        errors.password = "Password is required";
    }

    return !errors.email && !errors.password;
};

const handleLoginSubmit = async () => {
    errorMessage.value = null;

    if (!validateForm()) return;

    isProcessing.value = true;
    loginSubmit.value = "Processing...";

    try {
        let response = await auth.makeLogin(form);
        if (response.success && response.payload) {
            const { hasSubscription, subscription, user } = response.payload;
            await subscriptionStore.setHasSubscription(hasSubscription);
            await subscriptionStore.setCurrentSubscription(subscription);
            await auth.setUser(user);

            if (localStorage.getItem('redirect-url')) {
                navigateTo('/payment/plans');
            }

            if (hasSubscription.active || user.request_count > 0) {
                const reg_number = localStorage.getItem('reg_number');
                reg_number ? navigateTo('/report') : navigateTo('/');
                carStore.setRequestCounts(user.request_count);
            } else {
                navigateTo('/payment/plans');
            }
        } else {
            throw new Error("Invalid login credentials");
        }
    } catch (error) {
        errorMessage.value = error?.data?.message || error?.response?.message || "An unexpected error occurred while trying to log in.";
        console.log("error:", errorMessage.value);
    } finally {
        loginSubmit.value = "Submit";
        isProcessing.value = false;
    }
};

// Navigation helpers
const navigateToRegister = () => navigateTo('/auth/register');
const navigateToForgotPassword = () => navigateTo('/auth/password-reset-token');
</script>
<template>
    <div class="flex items-center py-10">
        <div class="w-full">
            <div
                class="p-8 mx-auto bg-white border-2 border-solid rounded-lg shadow-xl card border-dark-500 md:w-3/4 lg:w-1/3">
                <h3 class="text-2xl font-semibold text-center text-black">User Login</h3>

                <form @submit.prevent="handleLoginSubmit">
                    <div class="mb-6">
                        <FormLabel for="email">Email</FormLabel>
                        <FormInputText id="email" v-model="form.email" placeholder="Enter your email address"
                            type="text" />
                        <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
                    </div>

                    <div class="mb-6">
                        <FormLabel for="password">Password</FormLabel>
                        <FormInputText id="password" v-model="form.password" placeholder="Enter password"
                            type="password" />
                        <span v-if="errors.password" class="text-red-500">{{ errors.password }}</span>
                    </div>

                    <div class="mb-2 row" v-if="errorMessage">
                        <div class="alert alert-danger">
                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                                    class="font-medium">Oops!</span> {{ errorMessage }}</p>
                        </div>

                    </div>

                    <div class="flex items-center justify-between">
                        <ButtonPrimary :disabled="isProcessing">{{ loginSubmit }}</ButtonPrimary>

                        <NuxtLink to="/auth/password-reset-token">
                            <small class="underline cursor-pointer text-brand hover:text-brand/90">
                                Forgot Password
                            </small>
                        </NuxtLink>
                    </div>

                    <div class="flex items-center justify-center mt-4">
                        <span @click="navigateToRegister" class="text-black cursor-pointer">
                            <i class="fa fa-user"></i> Create new user
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>