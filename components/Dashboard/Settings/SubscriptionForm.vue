<script setup>
import { useForm, usePage } from '@inertiajs/vue3';
import axios from "axios";
import { onBeforeMount, onMounted, ref } from "vue";

const currentCancelSectionView = ref('index');
const user = usePage().props.auth.user;
const subsInfo = ref({});
const feedbacks = ref([]);
const offerInfo = ref({});
const lang=usePage().props.lang.current;

const form = useForm({
    name: user.name ?? '',
    card: '',
    expiration: '',
    cvv: '',
    errors: {}
});

const feedbackForm = useForm({
    id: '',
    custom_message: '',
});


async function getSubscriptionInfo() {
    try {
        const { data } = await axios.get(route('customer.subscription.info'));
        subsInfo.value = data.subsInfo;
    } catch (error) {
        console.error(error);
    }
}

function cancelSubscription(subscription_id) {
    axios.post(route('payment.subscription.cancel'), { subscription_id,lang })
        .then(response => {
            getSubscriptionInfo();
            changeCancelSectionView('index');
        })
        .catch(error => {
            console.error(error);
        });

}

function changeCancelSectionView(key) {
    currentCancelSectionView.value = key;
}

function submitFeedbackForm() {
    feedbackForm.post(route('user.feedbacks.store'), {
        onSuccess: async () => {
            feedbackForm.reset();
            await getSubscriptionInfo();
            changeCancelSectionView('offer');
        },
        onError: () => {
            console.error(feedbackForm.errors);
        },
    });

}

function fetchFeedbackReasons() {
    axios.get(route('feedback.reasons.fetch'))
        .then(response => {
            feedbacks.value = response.data;
        })
        .catch(error => {
            console.error(error);
        });
}

function fetchOfferAmount() {
    axios.get(route('payment.offer'))
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

async function acceptOffer() {
    await axios.post(route('payment.discount'),{lang}).then(response => {
        getSubscriptionInfo();
        changeCancelSectionView('index');
    }).catch(error => {
        console.error(error);
    });
}

function fetchOfferPrice() {
    axios.get(route('payment.discount.fetch'))
        .then(response => {
            offerInfo.value = response.data.data;
        })
        .catch(error => {
            console.error(error);
        });
}

onBeforeMount(() => {
    fetchFeedbackReasons();
});

onMounted(() => {
    getSubscriptionInfo();
    fetchOfferPrice();
});
</script>

<template>
    <!-- section feedback -->
    <div v-if="currentCancelSectionView === 'feedback'">
        <form @submit.prevent="submitFeedbackForm" class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg px-6 py-5">
            <h2 class="text-2xl font-bold text-gray-800 border-b pb-2">
                {{ $t('dashboard.help.subscription.feedback.heading') }}
            </h2>
            <p class="text-gray-600 mt-2">
                {{ $t('dashboard.help.subscription.feedback.sub-heading') }}
            </p>

            <div class="mt-1 space-y-2">
                <label v-for="(feedback, index) in feedbacks" :key="index" class="block">
                    <input type="radio" name="feedback" v-model="feedbackForm.id" :value="feedback?.id" class="mr-2">
                    <span class="text-gray-700">{{ $t('dashboard.help.subscription.feedback.reasons.' +
                        feedback?.reason) }}</span>
                </label>

                <div>
                    <label for="custom_message" class="block text-gray-700 font-semibold">
                        {{ $t('dashboard.help.subscription.feedback.reasons.other') }}
                    </label>
                    <textarea id="custom_message" v-model="feedbackForm.custom_message" rows="2"
                        class="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                </div>
            </div>

            <button type="submit"
                class="mt-2 w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition">Next</button>
        </form>
    </div>

    <!-- section offer -->
    <div class="3xl:max-w-4xl max-w-2xl mx-auto mt-1 bg-white shadow-lg rounded-lg p-6"
        v-else-if="currentCancelSectionView === 'offer'">
        <div v-if="subsInfo?.discount_applied" class="flex flex-col space-y-2">
            <h2 class="text-xl font-bold text-gray-800">
                {{
                    $t('dashboard.help.subscription.cancel.p')
                }}
            </h2>
            <button @click="cancelSubscription(subsInfo.subscription_id)"
                class="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition">
                {{ $t('dashboard.help.subscription.offer.cta-cancel-2') }}
            </button>
        </div>
        <div v-else>
            <h2 class="text-xl font-bold text-gray-800">
                {{
                    $t('dashboard.help.subscription.offer.heading')
                }}
            </h2>
            <p class="text-gray-600 mt-2"
                v-html="$t('dashboard.help.subscription.offer.p', { price: offerInfo?.discounted_price })">

            </p>
            <div class="mt-6 flex justify-between">
                <button @click="acceptOffer"
                    class="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition">
                    {{ $t('dashboard.help.subscription.offer.cta') }}
                </button>
                <button @click="cancelSubscription(subsInfo.subscription_id)"
                    class="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition">{{
                        $t('dashboard.help.subscription.offer.cta-2') }}</button>
            </div>
        </div>


    </div>

    <!-- section index -->
    <div v-else class="flex flex-col">
        <div class="max-w-4xl min-w-[25rem] mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 border-b pb-4">
                {{ $t('dashboard.help.subscription.current-plan') }}
            </h2>

            <div class="mt-4">
                <p class="text-gray-700 font-semibold">
                    Plan: <span class="text-gray-900 font-extralight text-sm">{{ subsInfo.subscription_type }}</span>
                </p>
                <p class="text-gray-700 font-semibold">

                    {{ $t('dashboard.help.subscription.sub-status') }}

                    <span :class="subsInfo.status === 'active' ? 'text-green-600' : 'text-red-600'"
                        class="text-sm font-extralight">
                        {{ subsInfo.status }}
                    </span>
                </p>
                <p class="text-gray-700 font-semibold">
                    <span>
                        {{ $t(`dashboard.help.subscription.${subsInfo.status === 'active' ? 'next-due' :
                            'access-until'}`) }}
                    </span>
                    <span class="text-gray-900 font-extralight text-sm">{{ subsInfo.ends_at }}</span>
                </p>
                <p class="text-gray-700 font-semibold" v-if="subsInfo.status === 'active'">

                    {{ $t('dashboard.help.subscription.amount') }}
                    <span class="text-gray-900 font-extralight text-sm">{{ subsInfo.next_price }}</span>
                </p>
            </div>

            <button @click="changeCancelSectionView('feedback')" v-if="subsInfo.status === 'active'"
                class="mt-6 w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition">
                {{
                    $t('dashboard.help.subscription.cta')
                }}
            </button>
            <!-- <button @click="acceptOffer" v-if="subsInfo.status === 'active'"
                class="mt-6 w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition">
                Start Cancellation Process
            </button> -->

        </div>
        <div class="flex items-center justify-between bg-primary-blue py-6 px-8 text-white">
            <Transition enter-active-class="transition ease-in-out" enter-from-class="opacity-0"
                leave-active-class="transition ease-in-out" leave-to-class="opacity-0">
                <p v-if="form.recentlySuccessful" class="text-sm text-gray-600">Saved.</p>
            </Transition>
        </div>
    </div>
</template>
