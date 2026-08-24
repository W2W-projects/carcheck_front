<script setup>
const auth = useAuthStore();

definePageMeta({
    title: 'Create new user',
    meta: [
        { hid: 'Register for fetching Registration number details', name: 'Register for fetching Registration number details', content: 'Register for fetching Registration number details' }

    ],
    middleware: ['guest'],
});


const form = reactive({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    password_confirmation: null,
});
const errors = ref({});
const errorMessage = ref('');
const successMessage = ref('');
const registerButtonText = ref("Submit");

const handleRegisterSubmit = async () => {
    registerButtonText.value = "Processing...";
    try {
        if (form.password !== form.password_confirmation) {
            errors.value.password_confirmation = ['Passwords do not match'];
            return;
        }
        const response = await auth.createNewUser(form);
        successMessage.value = response.message;
        setTimeout(() => {
            successMessage.value = '';
            navigateTo('/auth/login');
        }, 3000);
        registerButtonText.value = "Submit";

    } catch (error) {
        console.error('Register error:', error.data);
        errorMessage.value = error.data?.message || 'An error occurred while registering user.';
        errors.value = error.data?.errors || {};

        registerButtonText.value = "Submit";
    }
}
</script>

<template>
    <div>
        <div class="flex items-center min-h-screen">
            <div
                class="p-8 py-4 mx-auto bg-white border-2 border-solid rounded-lg shadow-xl card border-dark-500 md:w-3/4 lg:w-1/3">
                <h3 class="text-2xl font-semibold text-center"> User Registration</h3>

                <form @submit.prevent="handleRegisterSubmit">
                    <div v-if="successMessage" class="p-3 text-green-800 bg-green-200 rounded">
                        {{ successMessage }}
                    </div>
                    <div v-if="errorMessage" class="p-3 text-red-800 bg-red-100 rounded">
                        {{ errorMessage }}
                    </div>
                    <div class="mb-6">
                        <FormLabel for="first_name">First name </FormLabel>
                        <FormInputText id="first_name" v-model="form.first_name" placeholder="Enter first name"
                            type="text" required />
                        <span class="text-red-500" v-if="errors['first_name']">{{ errors['first_name'][0] }}</span>

                    </div>
                    <div class="mb-6">
                        <FormLabel for="last_name">Last name</FormLabel>
                        <FormInputText id="last_name" v-model="form.last_name" placeholder="Enter last name" type="text"
                            required />
                        <span class="text-red-500" v-if="errors['last_name']">{{ errors['last_name'][0] }}</span>

                    </div>
                    <div class="mb-6">
                        <FormLabel for="email">Email</FormLabel>
                        <FormInputText id="email" v-model="form.email" placeholder="user@email.com" type="text"
                            required />
                        <span class="text-red-500" v-if="errors['email']">{{ errors['email'][0] }}</span>

                    </div>
                    <div class="mb-6">
                        <FormLabel for="password">Password</FormLabel>
                        <FormInputText id="password" v-model="form.password" placeholder="password" type="password"
                            required />

                        <span class="text-red-500" v-if="errors['password']">{{ errors['password'][0] }}</span>
                    </div>
                    <div class="mb-6">
                        <FormLabel for="password_confirmation">Confirm Password</FormLabel>
                        <FormInputText id="password_confirmation" v-model="form.password_confirmation"
                            placeholder="Confirm password" type="password" required />

                        <span class="text-red-500" v-if="errors.password_confirmation">{{
                            errors.password_confirmation[0] ?? errors.password_confirmation }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex">
                            <div class="flex items-center h-5">
                                <FormInputText id="remember" v-model="form.terms" placeholder="password"
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                                    type="checkbox" required />
                            </div>
                            <FormLabel for="remember" class="text-sm font-medium text-gray-900 ms-2">
                                Remember me</FormLabel>

                        </div>

                        <ButtonPrimary>{{ registerButtonText }}</ButtonPrimary>
                    </div>
                </form>
                <div class="flex items-start mb-6" v-if="(errorMessage && errors.length == 0)">
                    <p class="text-danger text-red">{{ errorMessage }}</p>
                </div>

                <!-- <SocialLogin></SocialLogin> -->
            </div>
        </div>
    </div>
</template>