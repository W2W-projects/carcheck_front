<script setup lang="ts">
const { appName, siteUrl } = useRuntimeConfig().public;
const termsUrl = new URL('/terms', siteUrl).toString();
const sections = [
  { id: 'information', title: 'Information Collection and Use', paragraphs: [
    'When using our Service, you may be asked to provide certain personally identifiable information that can be used to contact or identify you.',
  ] },
  { id: 'log-data', title: 'Log Data', paragraphs: [
    'We may gather information that your browser automatically sends when you access our Service ("Log Data"). This data may include your computer\'s Internet Protocol (IP) address, browser type and version, pages visited, the date and time of your visit, the time spent on those pages, and other usage statistics.',
  ] },
  { id: 'cookies', title: 'Cookies', paragraphs: [
    'Cookies are small files containing data, often including a unique anonymous identifier, which are sent to your browser and stored on your device.',
    'We use cookies to collect information. You can configure your browser to reject all cookies or to notify you when a cookie is being sent. However, if you choose not to accept cookies, certain features of our Service may not function properly.',
  ] },
  { id: 'providers', title: 'Service Providers', paragraphs: [
    'We may work with third-party companies and individuals to assist with delivering our Service, perform related services, or analyze its usage.',
    'These third parties may access your Personal Information solely to perform tasks on our behalf and are required to safeguard it and refrain from using it for any other purpose.',
  ] },
  { id: 'security', title: 'Security', paragraphs: [
    'We take the protection of your Personal Information seriously. While we implement commercially reasonable measures to secure your data, no method of transmission or storage is completely secure. Consequently, we cannot guarantee absolute security but will always comply with applicable UK and EU data protection laws.',
  ] },
  { id: 'external-links', title: 'Links to Other Websites', paragraphs: [
    'Our Service may include links to external websites that we do not operate. If you follow these links, you will be directed to those websites. We strongly encourage you to review the Privacy Policies of any sites you visit, as we are not responsible for their content, privacy practices, or services.',
  ] },
  { id: 'children', title: 'Children’s Privacy', paragraphs: [
    'Our Service is not intended for individuals under 13 years old.',
    'We do not knowingly collect personal information from children under 13. If you are a parent or guardian aware that your child has provided us with Personal Information, please contact us. Upon discovering unauthorized data collection from a child under 13, we will take steps to delete it.',
  ] },
  { id: 'changes', title: 'Changes to This Privacy Policy', paragraphs: [
    'We may revise this Privacy Policy periodically. Updates will be posted on this page, and we recommend reviewing it regularly.',
    'Significant changes will be communicated via the email address you provided or through a prominent notice on our website.',
  ] },
  { id: 'jurisdiction', title: 'Jurisdiction', paragraphs: [
    'This Privacy Policy is governed by the laws of England and Wales, excluding conflict of law principles.',
  ] },
  { id: 'contact', title: 'Contact Us', paragraphs: [
    'If you have any questions or concerns about this Privacy Policy, please reach out to us.',
  ] },
];

definePageMeta({ title: 'Privacy and Cookies Policy' });
</script>

<template>
  <div class="px-4 pb-16 font-norms text-[#0f1829] sm:px-6 sm:pb-24">
    <div class="mx-auto max-w-[1240px]">
      <header class="relative flex min-h-[300px] items-center overflow-hidden rounded-[20px] bg-[#0f1829] px-7 py-10 text-white sm:min-h-[330px] sm:rounded-[28px] sm:px-[7%] sm:py-14">
        <div class="relative z-10 max-w-[660px]">
          <p class="flex items-center gap-2.5 text-xs font-bold tracking-[.18em] text-[#ff9a46]"><span class="h-0.5 w-6 bg-brand"></span> {{ appName.toUpperCase() }} / LEGAL</p>
          <h1 class="mb-3.5 mt-5 text-5xl font-bold leading-none tracking-[-.045em] sm:text-6xl lg:text-[76px]">Privacy <span class="text-brand">and</span><br>Cookies Policy</h1>
        </div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-[70%] overflow-hidden opacity-[.28] sm:w-[43%] sm:opacity-60" aria-hidden="true"><span class="absolute -right-[110px] -top-[120px] h-[520px] w-[520px] rounded-full border border-[#526174]"></span><span class="absolute -right-[180px] -top-[190px] h-[660px] w-[660px] rounded-full border border-[#526174]"></span><span class="absolute -right-[250px] -top-[260px] h-[800px] w-[800px] rounded-full border border-[#526174]"></span><span class="absolute -top-10 right-[170px] h-[420px] rotate-[29deg] border-l-[3px] border-dashed border-brand"></span><span class="absolute -top-10 right-[205px] h-[420px] rotate-[29deg] border-l-[3px] border-dashed border-[#526174]"></span></div>
      </header>

      <div class="mt-4 grid items-start gap-4 lg:mt-7 lg:grid-cols-[255px_minmax(0,1fr)] lg:gap-7">
        <aside class="lg:sticky lg:top-6" aria-label="Page sections">
          <nav class="rounded-2xl border border-[#e1e4e8] bg-white px-3.5 pb-3.5 pt-6 lg:rounded-[22px]">
            <p class="mx-3 mb-2.5 text-xs font-bold tracking-[.18em] text-[#87909e] lg:mb-4">ON THIS PAGE</p>
            <a v-for="(section, index) in sections" :key="section.id" :href="`#${section.id}`" class="m-0.5 inline-flex items-center gap-3 rounded-lg px-2 py-2 text-[13px] leading-tight text-[#354153] transition-colors hover:bg-[#fff2e8] hover:text-[#0f1829] focus-visible:bg-[#fff2e8] focus-visible:outline-none lg:m-0 lg:flex lg:px-3 lg:py-2.5 lg:text-sm"><span class="text-[11px] font-bold text-brand">{{ String(index + 1).padStart(2, '0') }}</span>{{ section.title }}</a>
          </nav>
          <div class="mt-3.5 rounded-[22px] border border-[#e1e4e8] bg-[#fff8f2] px-6 py-5"><p class="mb-1.5 text-[15px] font-bold">Need a hand?</p><NuxtLink to="/contact" class="text-sm font-bold text-[#bd5100] hover:underline">Contact our team <span aria-hidden="true">↗</span></NuxtLink></div>
        </aside>

        <article class="min-w-0 rounded-2xl border border-[#e1e4e8] bg-white px-[22px] text-[15px] leading-7 text-[#465163] sm:px-12 sm:text-base lg:rounded-[22px] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:text-[#c35400] [&_a]:underline [&_a]:underline-offset-4">
          <div class="py-8 sm:pb-10 sm:pt-12">
            <p>{{ appName }} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) manages the website <a :href="siteUrl">{{ siteUrl }}</a> (referred to as the &quot;Service&quot;).</p>
            <p>This document outlines our policies concerning the collection, use, and disclosure of your personal information when you access or utilize our Service.</p>
            <p>We are committed to using and sharing your information solely as described in this Privacy Policy.</p>
            <p>Your personal information is utilized to provide and enhance the Service. By accessing or using the Service, you consent to the collection and usage of your information in alignment with this policy. Unless otherwise specified, the terms in this Privacy Policy carry the same definitions as those in our Terms and Conditions, which can be accessed at <NuxtLink to="/terms">{{ termsUrl }}</NuxtLink>.</p>
          </div>

          <section v-for="(section, index) in sections" :id="section.id" :key="section.id" class="scroll-mt-6 border-t border-[#e8ebee] py-8 last:pb-12 sm:py-10">
            <div class="mb-6 flex items-baseline gap-3 sm:gap-4"><span class="text-sm font-bold text-brand">{{ String(index + 1).padStart(2, '0') }}</span><h2 class="text-2xl font-bold leading-tight tracking-tight text-[#0f1829] md:text-3xl">{{ section.title }}</h2></div>
            <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>
