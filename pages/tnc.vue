<script setup>
import { usePlanStore } from '~/stores/plan';
import { trialPrice } from '~/utils/trialPrice';

const {
  appName,
  siteUrl,
  contactEmail,
  contactPhone,
  termsEffectiveDate,
} = useRuntimeConfig().public;

const planStore = usePlanStore();
const { data: plans } = await useAsyncData('terms-plans', () => planStore.fetchPlans());
const basicPrice = computed(() => trialPrice(plans.value || [], '48h-basic-subscription'));
const premiumPrice = computed(() => trialPrice(plans.value || [], 'premium'));
const expertPrice = computed(() => trialPrice(plans.value || [], '48h-expert-subscription'));

const siteHost = new URL(siteUrl).host;
const contactHref = `mailto:${contactEmail}`;
const phoneHref = `tel:${contactPhone.replace(/[^\d+]/g, '')}`;
const sections = [
  ['purpose', 'Purpose'],
  ['definitions', 'Definitions'],
  ['account', 'Your account'],
  ['services', 'Services & subscriptions'],
  ['payment', 'Payment & fees'],
  ['access', 'Access & conduct'],
  ['cancellation', 'Refunds & cancellation'],
  ['privacy', 'Personal information'],
  ['legal', 'Intellectual property & law'],
  ['contact', 'Contact'],
];

definePageMeta({ title: 'Terms and Conditions', alias: '/terms' });
</script>

<template>
  <div class="px-4 pb-16 font-norms text-[#0f1829] sm:px-6 sm:pb-24">
    <div class="mx-auto max-w-[1240px]">
      <header class="relative flex min-h-[300px] items-center overflow-hidden rounded-[20px] bg-[#0f1829] px-7 py-10 text-white sm:min-h-[330px] sm:rounded-[28px] sm:px-[7%] sm:py-14">
        <div class="relative z-10 max-w-[660px]">
          <p class="flex items-center gap-2.5 text-xs font-bold tracking-[.18em] text-[#ff9a46]"><span class="h-0.5 w-6 bg-brand"></span> {{ appName.toUpperCase() }} / LEGAL</p>
          <h1 class="mb-3.5 mt-5 text-5xl font-bold leading-none tracking-[-.045em] sm:text-6xl lg:text-[76px]">Terms <span class="text-brand">and</span><br>Conditions</h1>
          <p class="max-w-[490px] text-base leading-6 text-[#cbd2dd] sm:text-lg">The important details about using {{ appName }}, your account, and our vehicle reports.</p>
          <div v-if="termsEffectiveDate" class="mt-7 inline-flex items-center gap-2 rounded-full border border-[#536071] px-3.5 py-2 text-[13px] text-[#e5e8ed]"><span class="h-[7px] w-[7px] rounded-full bg-brand"></span> Effective as of {{ termsEffectiveDate }}</div>
        </div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-[70%] overflow-hidden opacity-[.28] sm:w-[43%] sm:opacity-60" aria-hidden="true"><span class="absolute -right-[110px] -top-[120px] h-[520px] w-[520px] rounded-full border border-[#526174]"></span><span class="absolute -right-[180px] -top-[190px] h-[660px] w-[660px] rounded-full border border-[#526174]"></span><span class="absolute -right-[250px] -top-[260px] h-[800px] w-[800px] rounded-full border border-[#526174]"></span><span class="absolute -top-10 right-[170px] h-[420px] rotate-[29deg] border-l-[3px] border-dashed border-brand"></span><span class="absolute -top-10 right-[205px] h-[420px] rotate-[29deg] border-l-[3px] border-dashed border-[#526174]"></span></div>
      </header>
      <div class="mt-4 grid items-start gap-4 lg:mt-7 lg:grid-cols-[255px_minmax(0,1fr)] lg:gap-7">
        <aside class="lg:sticky lg:top-6" aria-label="Page sections">
          <nav class="rounded-2xl border border-[#e1e4e8] bg-white px-3.5 pb-3.5 pt-6 lg:rounded-[22px]">
            <p class="mx-3 mb-2.5 text-xs font-bold tracking-[.18em] text-[#87909e] lg:mb-4">ON THIS PAGE</p>
            <a v-for="([id, label], index) in sections" :key="id" :href="`#${id}`" class="m-0.5 inline-flex items-center gap-3 rounded-lg px-2 py-2 text-[13px] leading-tight text-[#354153] transition-colors hover:bg-[#fff2e8] hover:text-[#0f1829] focus-visible:bg-[#fff2e8] focus-visible:outline-none lg:m-0 lg:flex lg:px-3 lg:py-2.5 lg:text-sm"><span class="text-[11px] font-bold text-brand">{{ String(index + 1).padStart(2, '0') }}</span>{{ label }}</a>
          </nav>
          <div class="mt-3.5 rounded-[22px] border border-[#e1e4e8] bg-[#fff8f2] px-6 py-5"><p class="mb-1.5 text-[15px] font-bold">Need a hand?</p><NuxtLink to="/contact" class="text-sm font-bold text-[#bd5100] hover:underline">Contact our team <span aria-hidden="true">↗</span></NuxtLink></div>
        </aside>
        <article class="min-w-0 rounded-2xl border border-[#e1e4e8] bg-white px-[22px] text-[15px] leading-7 text-[#465163] sm:px-12 sm:text-base lg:rounded-[22px] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_h3]:mb-2.5 [&_h3]:mt-7 [&_h3]:text-[19px] [&_h3]:font-bold [&_h3]:text-[#0f1829] [&_h4]:mb-2 [&_h4]:mt-5 [&_h4]:font-bold [&_h4]:text-[#0f1829] [&_a]:text-[#c35400] [&_a]:underline [&_a]:underline-offset-4">
          <div class="py-8 sm:pb-10 sm:pt-12">
            <p class="mb-3 text-xs font-bold tracking-[.18em] text-[#e36600]">THE AGREEMENT</p>
            <h2 class="mb-5 text-3xl font-bold tracking-tight text-[#0f1829] sm:text-4xl">A clear road ahead.</h2>
            <p>The website <a :href="siteUrl">{{ siteHost }}</a> (&quot;Website&quot;) is owned and operated by Nero Digital LTD, a limited liability company. The company is registered in England and Wales under company numbe 13664416, with its registered office located at 71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ (&quot;{{ appName }}&quot; or &quot;We&quot;).</p>
            <p>{{ appName }} is the sole owner and operator of the <a :href="siteUrl">{{ siteHost }}</a> Website. The hosting services for the Website are provided by Amazon Web Services, a U.S. corporation headquartered at 1200 12th Avenue South, Suite 1200, Seattle, WA 98114.</p>
          </div>
          <section id="purpose" class="scroll-mt-6 border-t border-[#e8ebee] py-8 last:pb-12 sm:py-10">
            <div class="mb-6 flex items-baseline gap-3 sm:gap-4"><span class="text-sm font-bold text-brand">01</span><h2 class="text-2xl font-bold leading-tight tracking-tight text-[#0f1829] md:text-3xl">Purpose</h2></div>
            <p>{{ appName }} provides its members with assistance services related to the purchase and sale of used vehicles through the Website <a :href="siteUrl">{{ siteHost }}</a>. These services are available to companies and individuals, who use them at their own discretion and responsibility.</p>
            <p>The present Terms and Conditions govern your access to and use of the Website and its associated services (&quot;Services&quot;).</p>
            <p>By registering on the Website, you will be required to acknowledge and agree to these Terms and Conditions of Service (&quot;TOS&quot;) by checking a confirmation box. This action constitutes a binding agreement between you and {{ appName }}.</p>
            <p>For the purposes of these TOS, the terms listed below, whether capitalized or presented in all capital letters, shall have the meanings assigned to them, regardless of whether they appear in singular or plural form:</p>
          </section>
          <section id="definitions" class="scroll-mt-6 border-t border-[#e8ebee] py-8 last:pb-12 sm:py-10">
            <div class="mb-6 flex items-baseline gap-3 sm:gap-4"><span class="text-sm font-bold text-brand">02</span><h2 class="text-2xl font-bold leading-tight tracking-tight text-[#0f1829] md:text-3xl">Definitions</h2></div>
            <ul class="mb-5 list-none space-y-0 pl-0 [&_li]:border-b [&_li]:border-[#eef0f2] [&_li]:py-3 [&_li:last-child]:border-0 [&_strong]:text-[#0f1829]">
              <li><strong>TOS:</strong> Refers to these Terms and Conditions of Use.</li>
              <li><strong>Company:</strong> Refers to the legal entity that owns and operates the Website.</li>
              <li><strong>Site:</strong> Refers to the online platform published by the Company, accessible at <a :href="siteUrl">{{ siteHost }}</a>, including all associated components and content.</li>
              <li><strong>Services:</strong> Refers to all features, products, technologies, content, and functionalities accessible through the Site.</li>
              <li><strong>Plate Number Check:</strong> Refers to a specific feature enabling verification of certain vehicle details through its license plate number.</li>
              <li><strong>Member:</strong> Refers to any individual or legal entity holding an account on the Site.</li>
              <li><strong>Login:</strong> Refers to the user interface provided to Members for accessing vehicle reports, viewing car advertisements, downloading guides, and contacting the Site.</li>
              <li><strong>Online Support:</strong> Refers to support services available to Members, including assistance provided by chat, email, or the Site&#x27;s contact page.</li>
              <li><strong>Subscription:</strong> Refers to the monthly membership fee for Services offered on the Site. Subscriptions are valid indefinitely from the date of activation by the Company and are non-binding, allowing Members to cancel at any time.</li>
              <li><strong>Promotional Offer:</strong> Refers to a temporary offer granting Members unlimited access to Services during the Trial Period. Enrolment in a Promotional Offer result in automatic activation of the Subscription. The Promotional Offer allows Members to evaluate the Services before committing to a Subscription.</li>
              <li><strong>Trial Period:</strong> Refers to a fourty-eight (48) hour period during which Members enjoy unlimited access to the Services at no charge. The Trial Period is included as part of any Promotional Offer.</li>
            </ul>
          </section>
          <section id="account" class="scroll-mt-6 border-t border-[#e8ebee] py-8 last:pb-12 sm:py-10">
            <div class="mb-6 flex items-baseline gap-3 sm:gap-4"><span class="text-sm font-bold text-brand">03</span><h2 class="text-2xl font-bold leading-tight tracking-tight text-[#0f1829] md:text-3xl">Opening an Account and Member Consent</h2></div>
            <h3>Conditions</h3>
            <p>To access and use our Services, Members must be at least 18 years of age, which you confirm, where applicable, upon creating an Account.</p>
            <p>If you are acting on behalf of a company, you must have the legal authority to bind the company or entity you represent. By using our Services on behalf of a company or entity, you affirm that you possess such authority and that the company or entity unconditionally accepts these Terms and Conditions (&quot;T&amp;C&quot;).</p>
            <h3>Creating an Account</h3>
            <p>The Company provides its Services to Members exclusively through the Website. Members must follow the registration process outlined on the Website to subscribe to these Services.</p>
            <p>During registration, Members are required to complete all fields necessary for identification, select their desired Services, and arrange payment.</p>
            <p>Prior to using the Website, Members must ensure they possess the appropriate technical and computer equipment and that their browser allows secure access to the Website. Members are also responsible for confirming that their devices and computer systems are in good working order, free of viruses, and capable of supporting the required functionality.</p>
            <p>By accessing the Website and using the Services, Members confirm that they have read, understood, and unconditionally accepted the current T&amp;C.</p>
            <p>Access to the Services is restricted to Members only. Non-members will not be able to use our Services.</p>
            <h3>Password</h3>
            <p>Members are responsible for maintaining the confidentiality of their account password. In the event of unauthorized access to an Account or a breach of security—including theft or loss of login credentials—Members agree to notify us promptly.</p>
          </section>
          <section id="services" class="scroll-mt-6 border-t border-[#e8ebee] py-8 last:pb-12 sm:py-10">
            <div class="mb-6 flex items-baseline gap-3 sm:gap-4"><span class="text-sm font-bold text-brand">04</span><h2 class="text-2xl font-bold leading-tight tracking-tight text-[#0f1829] md:text-3xl">{{ appName }} Services</h2></div>
            <p>By purchasing a {{ appName }} package, customers receive 48 hours of access to the Services included in their selected package:</p>
            <ul class="mb-5 list-disc space-y-1 pl-6">
              <li>Basic – <span v-if="basicPrice">{{ basicPrice }}</span><NuxtLink v-else to="/pricing">see current price</NuxtLink>: one Basic report for one vehicle check.</li>
              <li>Premium – <span v-if="premiumPrice">{{ premiumPrice }}</span><NuxtLink v-else to="/pricing">see current price</NuxtLink>: one Premium report for one vehicle check.</li>
              <li>Expert – <span v-if="expertPrice">{{ expertPrice }}</span><NuxtLink v-else to="/pricing">see current price</NuxtLink>: Premium reports for up to three vehicle checks.</li>
            </ul>
            <p>Depending on the package selected, reports may include services such as:</p>
            <ul class="mb-5 list-disc space-y-1 pl-6">
              <li>Damage and written-off checks.</li>
              <li>Mileage and MOT history.</li>
              <li>Ownership history.</li>
              <li>Theft checks.</li>
              <li>Finance history.</li>
              <li>Tax calculations.</li>
              <li>Vehicle technical data.</li>
            </ul>
            <p class="!my-6 rounded-r-xl border-l-4 border-brand bg-[#fff5ed] px-5 py-4 font-medium text-[#283345]">At the end of the initial 48-hour access period, the selected package will automatically convert into a monthly subscription. The applicable monthly subscription fee will then be charged on a recurring monthly basis unless the subscription is cancelled before the next billing date.</p>
            <h3>Subscription to Services on the Website</h3>
            <p>The Services provided by {{ appName }} are described as accurately as possible above. The Company reserves the right to modify the content on the Website at any time without prior notice to Members.</p>
            <p>During the order process, Members will be presented with a summary of the Services included in their subscription. Members may edit their selected plate number and associated information prior to subscribing to any Promotional Offer.</p>
            <p>Before finalizing a subscription, Members must check the designated validation box, confirming acceptance of these T&amp;C. To ensure that Members fully understand their payment obligations, a clear and visible payment notification will be displayed near the order confirmation option.</p>
            <p>Once the Member accepts the T&amp;C and confirms their subscription to the Promotional Offer, including the associated payment obligation, a binding contract will be formed between the Member and the Company.</p>
            <p>The Company will provide the Member with an order confirmation via email. This confirmation will include the details of the order and login credentials required to access the Member’s account.</p>
          </section>
          <section id="payment" class="scroll-mt-6 border-t border-[#e8ebee] py-8 last:pb-12 sm:py-10">
            <div class="mb-6 flex items-baseline gap-3 sm:gap-4"><span class="text-sm font-bold text-brand">05</span><h2 class="text-2xl font-bold leading-tight tracking-tight text-[#0f1829] md:text-3xl">Payment and Fees</h2></div>
            <h3>Fees, Taxes, and Third-Party Fees</h3>
            <p>The fees and prices for our Services are subject to change at any time. In the event of such changes, we will provide you with a minimum of ten (10) days&#x27; notice by either posting the updated fees on our Website or notifying you via email. If you do not agree to the revised fees, you may cancel the Services or terminate this Agreement within the same month by using your personal account dashboard or by contacting us via email or in writing.</p>
            <p>You agree to pay all applicable fees, taxes, and any third-party charges associated with your purchase of our paid Services. These may include, but are not limited to, telephone toll charges, mobile carrier fees, ISP charges, data plan costs, credit card processing fees, foreign exchange or transaction fees. We disclaim liability for any third-party charges you incur. If you have concerns regarding such charges, you should contact your banking institution or service provider directly.</p>
            <p>In cases of unpaid fees, we reserve the right to take legal action to recover the amounts owed.</p>
            <p>You will be responsible for all associated costs and expenses incurred in the collection process.</p>
            <h3>Credit Card Details</h3>
            <p>To ensure uninterrupted service, you authorize us to participate in card issuer-supported programs to update your payment information, if necessary. If your payment method changes or expires and you do not notify us, we may use updated payment information obtained through these programs to continue processing payments.</p>
            <h3>Invoicing</h3>
            <p>Unless your subscription is canceled or terminated, we will bill you for the membership fees according to the selected plan, pricing, and payment method. Subscriptions are subject to automatic renewal unless canceled.</p>
            <p>You or {{ appName }} may cancel or terminate a subscription at any time. Any cancellation will take effect at the start of the next billing cycle, meaning it will only apply to future charges. Refunds are not provided unless required by law or explicitly communicated to you within the permissible timeframe.</p>
            <p>All fees are exclusive of applicable taxes, levies, or duties imposed by relevant authorities. You are solely responsible for paying any such taxes, levies, or duties in connection with your subscription.</p>
          </section>
          <section id="access" class="scroll-mt-6 border-t border-[#e8ebee] py-8 last:pb-12 sm:py-10">
            <div class="mb-6 flex items-baseline gap-3 sm:gap-4"><span class="text-sm font-bold text-brand">06</span><h2 class="text-2xl font-bold leading-tight tracking-tight text-[#0f1829] md:text-3xl">Access to Services and Login</h2></div>
            <p>The Company is committed to providing Members with access to the Services as specified in these Terms and Conditions.</p>
            <p>Upon commencement of the Trial Period, Members will be issued the necessary credentials (password) to access their accounts. Members are solely responsible for maintaining the confidentiality and accuracy of their login information. Any unauthorized use of login credentials must be reported to the Company immediately. The Member bears full responsibility for any loss or damage resulting from a failure to safeguard their login information.</p>
            <p>The Company is not liable for service inaccessibility caused by third parties or circumstances beyond its control.</p>
            <h3>Service of Assistance</h3>
            <p>Upon purchasing a Trial Period or Subscription, Members may contact the Company&#x27;s online support for assistance, inquiries, or to file complaints.</p>
            <h3>Rules of Conduct for Members on the Website</h3>
            <p>Members agree to adhere to the provisions outlined in these Terms and Conditions and to comply with the Company&#x27;s instructions when using the Website and its Services.</p>
            <p>The use of the Website is governed by specific rules designed to ensure fairness and functionality for all Members. By using the Website, Members agree to:</p>
            <ul class="mb-5 list-disc space-y-1 pl-6">
              <li>Use the Website in a lawful manner and refrain from any activity that violates applicable laws or these Terms and Conditions.</li>
              <li>Respect the rights of {{ appName }} and its affiliates, including intellectual property rights.</li>
              <li>Avoid unauthorized access to the Website&#x27;s systems and refrain from using any tools, devices, or programs that could disrupt the normal operation of the Website.</li>
              <li>Refrain from disparaging the Website, Services, or the Company through social media or any other communication channels.</li>
            </ul>
            <p>If the Company determines that a Member is in violation of these Terms and Conditions, it reserves the right to terminate the Member’s access to the Website and pursue all legal remedies.</p>
          </section>
          <section id="cancellation" class="scroll-mt-6 border-t border-[#e8ebee] py-8 last:pb-12 sm:py-10">
            <div class="mb-6 flex items-baseline gap-3 sm:gap-4"><span class="text-sm font-bold text-brand">07</span><h2 class="text-2xl font-bold leading-tight tracking-tight text-[#0f1829] md:text-3xl">Refund Policy and Cancellation Policy</h2></div>
            <p>Refund requests for Subscriptions made more than fourteen (14) days after the initial subscription will be denied.</p>
            <p>Refund requests submitted within the fourteen (14) day period must be made through the Company&#x27;s customer support via email. The support team will respond within forty-eight (48) hours, and approved refunds will be processed within 5-10 days.</p>
            <h3>Cancellation Policy</h3>
            <h4>By the Member:</h4>
            <p>Members may terminate their Subscription or cease using the Services at any time via browsing to their account’s dashboard on the website. However, termination does not exempt the Member from settling any outstanding fees.</p>
            <p>If a Member disagrees with revised fees or pricing, they may terminate the Agreement or Services accordingly.</p>
            <h4>By the Company:</h4>
            <p>The Company reserves the right to terminate a Member’s access to the Services if:</p>
            <ul class="mb-5 list-disc space-y-1 pl-6">
              <li>The Member breaches any provision of these Terms and Conditions or demonstrates an intent or inability to comply with them.</li>
              <li>The Member fails to make timely payments for the Services.</li>
              <li>Legal obligations require the Company to cease providing the Services (e.g., if the Services become unlawful).</li>
              <li>The Company decides to discontinue the Services, whether wholly or partially, due to impracticality or legal changes in certain regions.</li>
              <li>There is prolonged inactivity in a Member’s free account.</li>
            </ul>
            <h3>Survival Clause</h3>
            <p>The perpetual licenses you have granted, your indemnification obligations, the Company&#x27;s warranty disclaimers, limitations of liability, and the dispute resolution provisions outlined in these Terms will remain in effect even after the expiration or termination of these Terms.</p>
            <p>Additionally, certain or all functionalities of the Software may cease to operate without prior notice if the Services are terminated or expire.</p>
          </section>
          <section id="privacy" class="scroll-mt-6 border-t border-[#e8ebee] py-8 last:pb-12 sm:py-10">
            <div class="mb-6 flex items-baseline gap-3 sm:gap-4"><span class="text-sm font-bold text-brand">08</span><h2 class="text-2xl font-bold leading-tight tracking-tight text-[#0f1829] md:text-3xl">Personal Information</h2></div>
            <p>To complete the order process seamlessly, the Site requires access to certain personal information, including your surname, first name, and email address.</p>
            <p>Service providers, including hosting providers outside the European Union, may access Members’ personal data as necessary. The Company has established agreements with these service providers, incorporating the European Commission-approved standard contractual clauses to ensure lawful data transfers.</p>
            <p>Members retain the right to object to, rectify, delete, or access their personal data. They may also object for legitimate reasons by emailing the Company at <a :href="contactHref">{{ contactEmail }}</a>, providing their surname, first name, email address, and order number.</p>
            <p>The Company shares Members’ personal information only with service providers involved in maintaining the Site, hosting, and processing orders, and only to the extent necessary to perform these functions correctly.</p>
            <p>The Company also informs Members that cookies may store specific information on their hard drive. This data is used to analyze Site traffic and offer tailored services based on prior user preferences. Upon visiting the Site, a banner will notify Members about the use of cookies and ask for their consent.</p>
            <p>Optional Cookies will not be stored or accessed unless the Member has explicitly given consent. Members can disable cookies or adjust their settings by clicking the link in the banner.</p>
            <p>If a Member continues browsing, this action will be interpreted as consent to the use of essential cookies.</p>
          </section>
          <section id="legal" class="scroll-mt-6 border-t border-[#e8ebee] py-8 last:pb-12 sm:py-10">
            <div class="mb-6 flex items-baseline gap-3 sm:gap-4"><span class="text-sm font-bold text-brand">09</span><h2 class="text-2xl font-bold leading-tight tracking-tight text-[#0f1829] md:text-3xl">Intellectual Property</h2></div>
            <p>This Website is operated by {{ appName }} and its affiliates.</p>
            <p>All elements of the Website, including logos, trademarks, trade names, images, texts, illustrations, audio and video files, and their arrangement, are the exclusive property of the Company. These elements are protected under copyright, trademark law, and other intellectual property laws, with rights reserved globally.</p>
            <p>Members are granted a non-exclusive, revocable, personal, and non-transferable license to use the Site solely for personal or business purposes aligned with the Site’s intended function.</p>
            <p>Links to this Website without prior authorization from the Company are strictly prohibited, as is the unauthorized use of the Company&#x27;s trade names, trademarks, and other distinguishing features.</p>
            <h3>Governing Law</h3>
            <p>These Legal Terms are governed by and interpreted following the laws of the United Kingdom, and the use of the United Nations Convention of Contracts for the International Sales of Goods is expressly excluded. If your habitual residence is in the EU, and you are a consumer, you additionally possess the protection provided to you by obligatory provisions of the law in your country to residence. The Company and yourself both agree to submit to the non-exclusive jurisdiction of the Courts of England and Wales, which means that you may make a claim to defend your consumer protection rights in regards to these Legal Terms in the United Kingdom, or in the EU country in which you reside.</p>
            <p>Before initiating mediation, Members are required to contact the Company via chat or email at <a :href="contactHref">{{ contactEmail }}</a> to exercise their right to a refund or address any concerns.</p>
            <p>If mediation fails or if the Member chooses to proceed with court action, the rules set forth in the Code of Civil Procedure will apply.</p>
          </section>
          <section id="contact" class="scroll-mt-6 border-t border-[#e8ebee] py-8 last:pb-12 sm:py-10">
            <div class="mb-6 flex items-baseline gap-3 sm:gap-4"><span class="text-sm font-bold text-brand">10</span><h2 class="text-2xl font-bold leading-tight tracking-tight text-[#0f1829] md:text-3xl">Contact</h2></div>
            <p>To resolve a complaint regarding the Services, or to receive further information in regards to the use of the Services, please send an email to <a :href="contactHref">{{ contactEmail }}</a> or send a mail to:</p>
            <address class="not-italic">Nero Digital Ltd<br>71-75 Shelton Street, Covent Garden, London,<br>United Kingdom, WC2H 9JQ<br>Registration 13664416 and VAT 411325742<br>Phone: <a :href="phoneHref">{{ contactPhone }}</a></address>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>
