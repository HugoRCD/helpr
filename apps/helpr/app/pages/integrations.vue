<script setup lang="ts">
import { PlusSmallIcon } from '@heroicons/vue/24/outline'
import FlowPreview from '~/components/FlowPreview.vue'
import ProviderCard from '~/components/ProviderCard.vue'

const { t } = useI18n()
definePageMeta({
  title: 'Integrations',
  name: 'Integrations',
})

const featuredFlows = [
  {
    title: 'Connect Linear ticket with GitHub issue',
    description: 'Create a new GitHub issue when a new ticket is created on Linear',
    providerTrigger: 'linear',
    providerActions: ['github'],
  },
  {
    title: 'Create a Linear ticket when you receive a new email from a specific sender',
    description: 'Give the content to OpenAI to generate a new ticket with a good content',
    providerTrigger: 'gmail',
    providerActions: ['openai', 'linear'],
    premium: true,
  },
  {
    // providerActions: ["openai", "linear", "gmail", "notion"],
    title: 'Create a new Linear ticket when a new customer is created on Stripe',
    description:
      'When you have a new customer on Stripe, create a ticket to follow up, a draft email to chat with the customer and a new Notion page to track the customer',
    providerTrigger: 'stripe',
    providerActions: ['openai', 'linear', 'gmail', 'notion'],
    premium: true,
  },
  {
    title: 'Create a new Notion page when a new issue is created on GitHub',
    description: 'Create a new Notion page when a new issue is created on GitHub',
    providerTrigger: 'github',
    providerActions: ['calendar', 'linear'],
    premium: false,
  },
]

const integrations = [
  {
    name: 'GitHub',
    description: 'GitHub is a web-based hosting service for version control using Git.',
  },
  {
    name: 'Notion',
    description: 'Notion is a web-based, collaborative, and cross-platform wiki and productivity tool.',
  },
  {
    name: 'OpenAI',
    description: 'OpenAI is a non-profit artificial intelligence research company.',
  },
  {
    name: 'Linear',
    description: 'Linear is a project management tool for software teams.',
  },
  {
    name: 'Calendar',
    description: 'Calendar is a time-management and scheduling calendar service developed by Google.',
  },
  {
    name: 'Slack',
    description: 'Slack is a proprietary business communication platform developed by Slack Technologies.',
  },
  {
    name: 'Deepl',
    description: 'DeepL is a translation service that uses artificial intelligence to translate texts.',
  },
  {
    name: 'Gmail',
    description: 'Gmail is a free, advertising-supported email service developed by Google.',
  },
  {
    name: 'Sheets',
    description: 'Google Sheets is a spreadsheet program included as part of the free, web-based Google Docs Editors & Spreadsheets.',
  },
  {
    name: 'Stripe',
    description: 'Stripe is a technology company that offers online payment processing for internet businesses.',
  },
  {
    name: 'LinkedIn',
    description: 'LinkedIn is a business and employment-oriented service that operates via websites and mobile apps.',
  },
]
</script>

<template>
  <div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative py-16">
      <div class="backdrop-shadow bg-accent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute z-0" />
      <div class="flex justify-center items-center gap-4">
        <ProviderCard :size="4" provider="notion" />
        <ProviderCard :size="6" provider="github" />
        <ProviderCard :size="8" provider="linear" />
        <NuxtLink
          class="flex relative justify-center items-center p-4 gradient rounded-full shadow-2xl group hover:scale-110 transition-all cursor-pointer duration-300 ease-in-out"
        >
          <div class="group-hover:animate-ping absolute inline-flex h-full w-full rounded-full gradient opacity-75 delay-300 duration-700" />
          <div class="absolute inline-flex rounded-full h-2/3 w-2/3 gradient animate-spin delay-300 duration-700" />
          <PlusSmallIcon class="h-20 w-20 text-primary z-10" />
        </NuxtLink>
        <ProviderCard :size="8" provider="openai" />
        <ProviderCard :size="6" provider="slack" />
        <ProviderCard :size="4" provider="calendar" />
      </div>
      <div class="drop-shadow-2xl">
        <h1 class="drop-shadow-2xl text-4xl font-bold tracking-tight text-primary sm:text-5xl text-center mt-4">
          <span class="drop-shadow-2xl">
            {{ t("integrations.title_start") }}<br>
            <span class="text-gradient">
              {{ t("integrations.title_end") }}
            </span>
          </span>
        </h1>
        <p class="mt-3 text-xl text-muted text-center max-w-2xl mx-auto">
          {{ t("integrations.description") }}
        </p>
      </div>
    </div>
    <hr class="my-8 md:my-24 border-secondary w-3/4 mx-auto">
    <div class="absolute mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
      <div class="backdrop-shadow bg-accent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute z-0" />
      <h3 class="text-3xl font-bold tracking-tight text-gradient sm:text-4xl mt-4">
        {{ t("integrations.featured") }}<span class="text-primary ml-2">.</span>
      </h3>
      <p class="mt-3 text-xl text-muted">
        {{ t("integrations.featured_description") }}
      </p>
      <div class="scroll-section flex scroll-px-4 overflow-x-auto mt-10 gap-6 -mx-8">
        <FlowPreview
          v-for="flow in featuredFlows"
          :key="flow.title"
          :flow
          :title="flow.title"
          :description="flow.description"
          :provider-actions="flow.providerActions"
          :provider-trigger="flow.providerTrigger"
          :premium="flow.premium"
        />
      </div>
    </div>
    <hr class="my-8 md:my-24 border-secondary w-3/4 mx-auto">
    <div class="absolute mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
      <div class="backdrop-shadow bg-accent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute z-0" />
      <h3 class="text-3xl font-bold tracking-tight text-gradient sm:text-4xl mt-4">
        {{ t("integrations.all") }}<span class="text-primary ml-2">.</span>
      </h3>
      <p class="mt-3 text-xl text-muted">
        {{ t("integrations.all_description") }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div
          v-for="integration in integrations"
          :key="integration.name"
          class="flex flex-col items-center justify-center p-4 rounded-lg z-10 bg-primary-opacity/10"
        >
          <ProviderLogo :provider="integration.name.toLowerCase()" />
          <h4 class="text-xl font-bold text-center mt-4">
            {{ integration.name }}
          </h4>
          <p class="text-center mt-2 text-muted">
            {{ integration.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-section {
  &::-webkit-scrollbar {
    height: 0;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
