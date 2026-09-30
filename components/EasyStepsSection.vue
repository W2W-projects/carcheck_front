<template>
  <div class="bg-[#EEEEEE]">
    <section class="easy-steps-desktop relative hidden w-full overflow-hidden font-['TT_Norms_Pro'] text-[#0F1829] md:block">
      <div class="desktop-steps-car absolute overflow-hidden" aria-hidden="true">
        <img src="/images/png/home-steps-car.png" class="absolute max-w-none" alt="">
      </div>
      <img src="/images/png/home-steps-man.png" class="desktop-steps-man pointer-events-none absolute" alt="">
      <div class="desktop-steps-man-shadow absolute" aria-hidden="true">
        <img src="/images/home/steps-man-shadow.svg" class="absolute max-w-none" alt="">
      </div>

      <p class="desktop-steps-eyebrow absolute">How does it work ?</p>
      <h2 class="desktop-steps-heading absolute font-medium leading-[normal]">
        Perform a check in<br><strong class="font-bold">3 easy steps</strong>
      </h2>
      <span class="desktop-steps-underline absolute bg-[#FF7400]" aria-hidden="true"></span>

      <ol class="desktop-steps-list absolute">
        <li class="desktop-step relative">
          <div class="desktop-step-icon relative">
            <img src="/assets/svg/car-icon-1.svg" class="desktop-car-icon absolute" alt="">
          </div>
          <div class="desktop-step-copy absolute">
            <strong>Type in the<br>registration number</strong>
            <span>of the car you want to check</span>
          </div>
        </li>
        <li class="desktop-step relative">
          <div class="desktop-step-icon desktop-step-icon-active relative">
            <img src="/assets/svg/history-search-icon.svg" class="desktop-history-icon absolute" alt="">
          </div>
          <div class="desktop-step-copy absolute">
            <strong>Let us run a<br>detailed history check</strong>
            <span>and analyse the data</span>
          </div>
        </li>
        <li class="desktop-step relative">
          <div class="desktop-step-icon relative">
            <img src="/assets/svg/report-icon.svg" class="desktop-report-icon absolute" alt="">
          </div>
          <div class="desktop-step-copy absolute">
            <strong>Get a complete<br>report generated</strong>
            <span>to plan your transaction</span>
          </div>
        </li>
      </ol>
    </section>
    <section class="easy-steps-mobile relative w-full overflow-hidden font-['TT_Norms_Pro'] text-[#0F1829] md:hidden">
      <p class="steps-eyebrow absolute whitespace-nowrap">How does it work ?</p>
      <h2 class="steps-heading absolute whitespace-nowrap font-medium leading-[normal]">
        Perform a check in<br><strong class="font-bold">3 easy steps</strong>
      </h2>
      <span class="steps-underline absolute bg-[#FF7400]" aria-hidden="true"></span>

      <img src="/images/home/steps-line-short.svg" class="steps-line steps-line-short absolute" alt="" aria-hidden="true">
      <img src="/images/home/steps-line-long.svg" class="steps-line steps-line-long absolute" alt="" aria-hidden="true">

      <div class="step step-one absolute">
        <div class="step-card relative bg-[#EEEEEE]">
          <img src="/assets/svg/car-icon-1.svg" class="step-car-icon absolute" alt="">
        </div>
        <div class="step-copy absolute">
          <p class="step-title font-bold">Type in the<br>registration number</p>
          <p class="step-description">of the car you want to<br>check</p>
        </div>
      </div>

      <div class="step step-two absolute">
        <div class="step-card step-card-active relative bg-[#FF7400]">
          <img src="/assets/svg/history-search-icon.svg" class="step-history-icon absolute" alt="">
        </div>
        <div class="step-copy absolute">
          <p class="step-title font-bold">Let us run a<br>detailed history check</p>
          <p class="step-description">and analyse the data</p>
        </div>
      </div>

      <div class="step step-three absolute">
        <div class="step-card relative bg-[#EEEEEE]">
          <img src="/assets/svg/report-icon.svg" class="step-report-icon absolute" alt="">
        </div>
        <div class="step-copy absolute">
          <p class="step-title font-bold">Get a complete<br>report generated</p>
          <p class="step-description">to plan your transaction</p>
        </div>
      </div>

      <div class="steps-car absolute overflow-hidden" aria-hidden="true">
        <img src="/images/png/home-steps-car.png" class="absolute max-w-none" alt="">
      </div>
      <img src="/images/png/home-steps-man.png" class="steps-man pointer-events-none absolute object-cover" alt="">
      <div class="steps-man-shadow absolute" aria-hidden="true">
        <img src="/images/home/steps-man-shadow.svg" class="absolute max-w-none" alt="">
      </div>
    </section>
  </div>
</template>

<style scoped>
.easy-steps-desktop {
  container-type: inline-size;
  height: 45.556cqw;
}

.desktop-steps-car {
  left: -36.657cqw;
  top: 7.252cqw;
  width: 90.744cqw;
  height: 35.803cqw;
}

.desktop-steps-car img {
  left: -2.41%;
  top: -38.36%;
  width: 118.76%;
  height: 169.4%;
}

.desktop-steps-man {
  left: 22.361cqw;
  top: 7.986cqw;
  width: 17.917cqw;
  height: 37.569cqw;
}

.desktop-steps-man-shadow {
  left: 26.875cqw;
  top: 43.056cqw;
  width: 8.472cqw;
  height: 2.5cqw;
}

.desktop-steps-man-shadow img {
  inset: -74.55% -22.78%;
  width: 145.56%;
  height: 249.1%;
}

.desktop-steps-eyebrow {
  left: 57.567cqw;
  top: 2.222cqw;
  font-size: 1.505cqw;
  line-height: normal;
}

.desktop-steps-heading {
  left: 57.347cqw;
  top: 4.356cqw;
  font-size: 2.648cqw;
  white-space: nowrap;
}

.desktop-steps-underline {
  left: 59.583cqw;
  top: 10.347cqw;
  width: 3.819cqw;
  height: .278cqw;
  border-radius: .139cqw;
}

.desktop-steps-list {
  top: 13.845cqw;
  left: 57.273cqw;
  width: 42.727cqw;
  margin: 0;
  padding: 0;
  list-style: none;
}

.desktop-step {
  height: 11.77cqw;
}

.desktop-step-icon {
  width: 6.694cqw;
  height: 6.694cqw;
  border: .113cqw solid white;
  border-radius: .794cqw;
  background: #eee;
  box-shadow: 0 .908cqw 2.723cqw rgba(0, 0, 0, .15);
}

.desktop-step-icon-active {
  border-color: #eee;
  background: #ff7400;
}

.desktop-step:not(:last-child) .desktop-step-icon::after {
  content: "";
  position: absolute;
  top: calc(100% - .183cqw);
  left: 50%;
  height: 5.26cqw;
  border-left: .221cqw dashed #0f1829;
  transform: translateX(-50%);
}

.desktop-car-icon {
  left: .809cqw;
  top: 2.207cqw;
  width: 5.296cqw;
  height: 2.354cqw;
}

.desktop-history-icon {
  left: 1.324cqw;
  top: 1.177cqw;
  width: 4.34cqw;
  height: 4.34cqw;
}

.desktop-report-icon {
  left: 1.302cqw;
  top: 1.373cqw;
  width: 3.937cqw;
  height: 4.291cqw;
}

.desktop-step-copy {
  left: 10.593cqw;
  top: .294cqw;
  white-space: nowrap;
}

.desktop-step-copy strong,
.desktop-step-copy span {
  display: block;
  font-size: 1.765cqw;
  line-height: normal;
}

.desktop-step-copy span {
  margin-top: .102cqw;
  font-weight: 400;
}

.easy-steps-mobile {
  container-type: inline-size;
  height: 203.889cqw;
}

.steps-eyebrow {
  left: 9.641cqw;
  top: 0;
  font-size: 3.844cqw;
  line-height: normal;
}

.steps-heading {
  left: 9.077cqw;
  top: 5.451cqw;
  font-size: 6.766cqw;
}

.steps-underline {
  left: 14.792cqw;
  top: 20.759cqw;
  width: 9.759cqw;
  height: 0.71cqw;
  border-radius: 0.355cqw;
}

.steps-line {
  left: 17.535cqw;
  width: 0.563cqw;
  transform: translateX(-50%);
}

.steps-line-short {
  top: 46.33cqw;
  height: 13.439cqw;
}

.steps-line-long {
  top: 76.944cqw;
  height: 51.667cqw;
}

.step {
  left: 8.889cqw;
  width: 91.111cqw;
  height: 17.104cqw;
}

.step-one { top: 29.696cqw; }
.step-two { top: 59.769cqw; }
.step-three { top: 89.842cqw; }

.step-card {
  z-index: 1;
  width: 17.104cqw;
  height: 17.104cqw;
  border: 0.29cqw solid white;
  border-radius: 2.029cqw;
  box-shadow: 0 2.319cqw 6.957cqw rgba(0, 0, 0, 0.15);
}

.step-card-active { border-color: #EEEEEE; }

.step-car-icon {
  left: 2.068cqw;
  top: 5.639cqw;
  width: 13.533cqw;
  height: 6.014cqw;
}

.step-history-icon {
  left: 3.383cqw;
  top: 3.007cqw;
  width: 11.089cqw;
  height: 11.089cqw;
}

.step-report-icon {
  left: 3.326cqw;
  top: 3.508cqw;
  width: 10.058cqw;
  height: 10.963cqw;
}

.step-copy {
  left: 27.065cqw;
  top: 0.752cqw;
  font-size: 4.511cqw;
  line-height: 5.278cqw;
  white-space: nowrap;
}

.step-title { height: 10.556cqw; }
.step-description { margin-top: 0.378cqw; }

.steps-car {
  left: -63.333cqw;
  top: 116.944cqw;
  width: 187.907cqw;
  height: 74.099cqw;
}

.steps-car img {
  left: -2.41%;
  top: -38.36%;
  width: 118.76%;
  height: 169.4%;
}

.steps-man {
  left: 58.909cqw;
  top: 118.464cqw;
  width: 37.104cqw;
  height: 77.804cqw;
}

.steps-man-shadow {
  left: 67.5cqw;
  top: 191.111cqw;
  width: 20cqw;
  height: 6.111cqw;
}

.steps-man-shadow img {
  inset: -74.55% -22.78%;
  width: 145.56%;
  height: 249.1%;
}
</style>
