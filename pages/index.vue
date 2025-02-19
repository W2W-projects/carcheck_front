<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const redirectMessage = ref(route.query.message || '');
const isMonthlyActive = ref(true);

// Clear the redirectMessage after 3 seconds if it exists
if (redirectMessage.value) {
  setTimeout(() => {
    redirectMessage.value = "";
  }, 3000);
}


const toggleBilling = (type) => {
  isMonthlyActive.value = (type === 'monthly');
};


definePageMeta({
  title: 'Welcome to Car check',
  meta: [
    {
      hid: 'Car report generated.', name: 'Download all data of the car', content: 'Download all data of the car'
    }

  ],
});

</script>

<template>
  <div>
    <!-- Show the alert if there's a redirect message -->
    <div v-if="redirectMessage" class="alert alert-danger">
      {{ redirectMessage }}
    </div>

    <!-- Rest of your home page sections -->
    <SearchCarSection />
    <TrustedBy />
    <EasyStepsSection />
    <WhyNeedCarCheck />
    <ReportInfoSection />
    <section>
      <div class="bg-[#EEEEEE] lg:px-[10.7rem] md:px-44 px-10">
        <div class="flex flex-row items-center justify-between mt-[6.75rem]">
          <div>
            <h3 class="text-4xl text-gray-800 text-start">We have the best <br />
              <b> plans aro<span class="border-t-orange-500 border-t-4">un</span>d</b>
            </h3>
          </div>

          <div class="border-2 rounded-lg p-0.5 border-[#0F1829] text-xl tracking-wider ">
            <button :class="{ 'bg-[#0F1829] text-white': isMonthlyActive, 'text-[#0F1829]': !isMonthlyActive }"
              class="px-[1.1rem] py-2 rounded" @click="toggleBilling('monthly')">
              Monthly billing
            </button>
            <button :class="{ 'bg-[#0F1829] text-white': !isMonthlyActive, 'text-[#0F1829]': isMonthlyActive }"
              class="px-[1.1rem] py-2" @click="toggleBilling('yearly')">
              Yearly billing
            </button>
          </div>
        </div>
        <div class="mt-14">
          <PlanSection />
        </div>
        <div
          class="w-full h-[23.5rem] bg-[#0F1829] mt-14 rounded-t-[27px] px-[4rem] flex flex-col justify-center text-white">
          <p class="text-center text-3xl font-bold">Pick your <span class="text-[#FF7400]">ideal trial plan</span>
            above.
          </p>
          <p class="mt-8 text-xl font-extralight">After the 48-hour trial period expires, unless you cancel, you'll be
            upgraded to our
            monthly
            membership.</p>
          <p class="mt-10 text-2xl font-bold">This entitles you to make 7 full reports for £39.95 per month - only £5.70
            per
            report!
          </p>
          <p class="mt-8 text-xl leading-6 font-extralight">Enjoy the benefits of your membership, which also includes
            ressources,
            reminders for
            saved
            vehicles and access
            to special offers. And don't worry if you run out - you can always purchase more reports with special
            members-only discounts.</p>
        </div>
      </div>
      <img src="/svg/plan-end-track.svg" alt="Plan End Track" class="w-full" />
    </section>
  </div>
</template>

<style scoped>
/* Your CSS styles here */
.section-1-bg {
  background-color: #f5f5f5;
}

/* Alert styling */
.alert {
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  border-radius: 0.25rem;
}
</style>
