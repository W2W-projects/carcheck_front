<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const redirectMessage = ref(route.query.message || '');

// Clear the redirectMessage after 3 seconds if it exists
if (redirectMessage.value) {
  setTimeout(() => {
    redirectMessage.value = "";
  }, 3000);
}

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
      <div class="plans-mobile md:hidden">
        <img src="/images/home/plan-map.svg" alt="" class="plans-map">
        <h2>We have the best<br><strong>plans around</strong></h2>
        <span class="plans-title-line"></span>

        <div class="plans-cards">
          <PlanSection home />
        </div>

        <div class="plans-info">
          <img src="/images/home/plan-mark.svg" alt="" class="plans-info-mark">
          <h3>Pick your <strong>ideal<br>trial plan</strong> above.</h3>
          <div class="plans-info-copy">
            <p>After the 48-hour trial period expires, unless you cancel, you'll be upgraded to our monthly membership.</p>
            <p><strong>This entitles you to make 7 full reports for £39.95 per month - only £5.70 per report!</strong></p>
            <p>Enjoy the benefits of your membership, which also includes ressources, reminders for saved vehicles and access to special offers. And don't worry if you run out - you can always purchase more reports with special members-only discounts.</p>
          </div>
        </div>
      </div>

      <div class="hidden mx-auto max-w-screen-2xl md:block">
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
      <img src="/svg/plan-end-track.svg" alt="Plan End Track" class="hidden w-full md:block" />
    </section>
  </div>
</template>

<style scoped>
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

.plans-mobile {
  position: relative;
  width: 100%;
  height: 360.556cqw;
  overflow: hidden;
  container-type: inline-size;
  background: #eee;
  color: #0f1829;
  font-family: "TT Norms Pro", sans-serif;
}

.plans-mobile > h2 {
  position: absolute;
  z-index: 2;
  top: 15.278cqw;
  left: 9.167cqw;
  width: 53.333cqw;
  margin: 0;
  font-size: 6.758cqw;
  font-weight: 500;
  line-height: 1.19;
  white-space: nowrap;
}

.plans-mobile > h2 strong { font-weight: 700; }

.plans-title-line {
  position: absolute;
  z-index: 3;
  top: 25.227cqw;
  left: 42.765cqw;
  width: 5.256cqw;
  height: .751cqw;
  border-radius: 999px;
  background: #ff7400;
}

.plans-map {
  position: absolute;
  z-index: 0;
  top: -155.082cqw;
  left: -102.32cqw;
  width: 173.145cqw;
  height: 428.192cqw;
  max-width: none;
  opacity: .03;
  transform: rotate(-90deg);
}

.plans-cards {
  position: absolute;
  z-index: 2;
  top: 34.167cqw;
  left: 0;
  width: 100%;
}

.plans-info {
  position: absolute;
  z-index: 2;
  top: 221.667cqw;
  left: -3.889cqw;
  width: 107.778cqw;
  height: 138.889cqw;
  overflow: hidden;
  border-radius: 5.263cqw;
  background: #0f1829;
  color: white;
}

.plans-info-mark {
  position: absolute;
  top: 37.481cqw;
  left: 59.357cqw;
  width: 8.868cqw;
  height: 31.092cqw;
  max-width: none;
  transform: rotate(180deg);
}

.plans-info h3 {
  position: absolute;
  z-index: 1;
  top: 12.368cqw;
  left: 27.863cqw;
  width: 54.118cqw;
  height: 16.973cqw;
  margin: 0;
  font-size: 6.506cqw;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
}

.plans-info h3 strong {
  color: #ff7400;
  font-weight: 700;
}

.plans-info-copy {
  position: absolute;
  z-index: 1;
  top: 43.056cqw;
  left: 13.611cqw;
  width: 81.667cqw;
  text-align: justify;
}

.plans-info-copy p {
  margin: 0;
  font-size: 4.487cqw;
  font-weight: 400;
  line-height: 1;
}

.plans-info-copy p + p { margin-top: 5.556cqw; }

.plans-info-copy p:nth-child(2) {
  font-size: 5.609cqw;
  font-weight: 700;
}

.plans-info-copy p:nth-child(3) { margin-top: 4.444cqw; }
</style>
