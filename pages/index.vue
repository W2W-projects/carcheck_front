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
      <div class="max-w-screen-2xl">
        <div class="bg-[#EEEEEE] lg:px-[10.7rem] 3xl:px-0 md:px-44 px-5">
          <div class="flex flex-row items-center justify-between mt-[6.75rem]">
            <div class="mx-auto">
              <h3 class="text-4xl text-gray-800 text-start">We have the best
                <b> plans arou<span class="upper-border">nd</span></b>
              </h3>
            </div>
          </div>
          <div class="mt-14">
            <PlanSection />
          </div>
          <div
            class="w-full md:h-[23.5rem] bg-[#0F1829] mt-14 rounded-t-[27px] md:px-[4rem] px-4 py-5 text-justify md:py-0 flex flex-col justify-center text-white">
            <p class="text-2xl font-bold text-center lg:text-3xl">Pick your <span class="text-[#FF7400]">ideal trial
                plan</span>
              above.
            </p>
            <p class="mt-8 md:text-xl font-extralight">After the 48-hour trial period expires, unless you cancel, you'll
              be
              upgraded to our
              monthly
              membership.</p>
            <p class="mt-10 text-xl font-bold lg:text-2xl">This entitles you to make 7 full reports for £39.95 per month
              - only
              £5.70
              per
              report!
            </p>
            <p class="mt-8 text-lg leading-6 md:text-xl font-extralight">Enjoy the benefits of your membership, which
              also includes
              ressources,
              reminders for
              saved
              vehicles and access
              to special offers. And don't worry if you run out - you can always purchase more reports with special
              members-only discounts.</p>
          </div>
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

.upper-border {
  position: relative;
}

.upper-border::before {
  content: "";
  height: 5px;
  width: 30px;
  background: #FF7400;
  position: absolute;
  top: 0.5rem;
  right: 9px;
  border-radius: 999px;
}
</style>
