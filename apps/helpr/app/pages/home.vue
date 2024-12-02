<script setup lang="ts">
import { ArrowLongRightIcon } from '@heroicons/vue/24/outline'
import dayjs from 'dayjs'

const { t } = useI18n()

definePageMeta({
  title: 'Home',
  name: 'Home',
  path: '/',
  description: 'Home page',
  keywords: 'Home',
})

const features = computed(() => [
  {
    name: t('home.features.fast'),
    description: t('home.features.fastDescription'),
    image: 'fast.webp',
  },
  {
    name: t('home.features.dynamic'),
    description: t('home.features.dynamicDescription'),
    image: 'dynamic.webp',
  },
  {
    name: t('home.features.integrations'),
    description: t('home.features.integrationsDescription'),
    image: 'integrations.webp',
  },
  {
    name: t('home.features.secure'),
    description: t('home.features.secureDescription'),
    image: 'secure.webp',
  },
  {
    name: t('home.features.crossPlatform'),
    description: t('home.features.crossPlatformDescription'),
    image: 'cross-platform.webp',
  },
  {
    name: t('home.features.customizable'),
    description: t('home.features.customizableDescription'),
    image: 'customize.webp',
  },
  {
    name: t('home.features.console'),
    description: t('home.features.consoleDescription'),
    image: 'console.webp',
  },
  {
    name: t('home.features.keyboard_first'),
    description: t('home.features.keyboardDescription'),
    image: 'keyboard-first.webp',
  },
  {
    name: t('home.features.privacy'),
    description: t('home.features.privacyDescription'),
    image: 'privacy.webp',
  },
])
</script>

<template>
  <div>
    <main>
      <!-- Hero section -->
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative py-16">
        <div class="backdrop-shadow bg-accent scale-150 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute z-0" />
        <div class="flex-col items-center justify-center z-10 gap-4 hidden lg:flex">
          <ProviderRow :nb="6" />
          <ProviderRow :nb="10" />
          <ProviderRow :nb="6" />
        </div>
        <div class="lg:-mt-32 drop-shadow-2xl">
          <div class="flex items-center justify-center drop-shadow-xl">
            <div class="gradient rounded-md px-6 py-4 drop-shadow-xl">
              <Logo :size="12" />
            </div>
          </div>
          <h1 class="drop-shadow-2xl text-4xl font-bold tracking-tight text-primary sm:text-5xl text-center mt-4">
            <span class="drop-shadow-2xl">
              Take the work out of your<br>
              <span class="text-gradient">
                {{ t("home.workflow") }}
              </span>
            </span>
          </h1>
          <NuxtLink class="drop-shadow-xl mt-5 flex justify-center gap-6" to="/auth/signup">
            <button type="button" class="hover-shadow-gradient btn-primary py-1 px-10 mt-4 flex items-center group">
              {{ t("home.start") }}
              <ArrowLongRightIcon class="w-5 h-5 ml-2 text-inverted group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </NuxtLink>
        </div>
      </div>

      <div class="relative w-3/4 mx-auto my-16">
        <hr class="border-white/10">
        <Promo class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <!-- Details section -->
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div class="backdrop-shadow bg-accent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute z-0" />
        <div class="flex flex-col items-center justify-center">
          <div class="flex flex-col items-center">
            <h2 class="text-2xl font-bold tracking-tight text-primary sm:text-3xl text-center">
              {{ t("home.details.first") }}
              <span class="text-gradient"> {{ t("home.details.tool") }} </span><br>
              {{ t("home.details.second") }}
            </h2>
            <p class="mt-3 text-xl text-muted text-center">
              {{ t("home.details.description") }}
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            <div v-for="feature in features" :key="feature.name" class="glass-card">
              <nuxt-img class="w-full h-48 object-cover" :src="'/assets/landing/' + feature.image" :alt="feature.name" sizes="sm:100vw md:50vw lg:400px" />
              <div class="card-content">
                <h3 class="text-xl font-bold tracking-tight text-primary sm:text-2xl text-center mt-4">
                  <span>{{ feature.name }}</span>
                </h3>
                <p class="mt-3 text-lg text-muted text-center">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="my-16 border-secondary w-3/4 mx-auto">

      <!-- CTA section -->
      <div class="mx-auto mb-10 max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div class="backdrop-shadow bg-accent scale-150 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute z-0" />
        <div class="backdrop-blur-md bg-primary-opacity/30 rounded-lg py-12 px-6 sm:py-16 sm:px-12 lg:py-20 lg:px-16 flex flex-col items-center">
          <div class="flex items-center justify-center">
            <Logo :size="12" />
          </div>
          <h2 class="text-2xl font-bold tracking-tight text-primary sm:text-3xl text-center mt-4">
            {{ t("home.cta.title") }}
            <span class="text-gradient">
              {{ t("home.workflow") }}
            </span>
          </h2>
          <p class="mt-3 text-xl text-muted text-center">
            {{ t("home.cta.description") }}
          </p>
          <div class="mt-10 flex justify-center gap-6 flex-col sm:flex-row">
            <NuxtLink to="/auth/signup" class="flex justify-center">
              <button type="button" class="btn-primary py-1">
                {{ t("home.start") }}
              </button>
            </NuxtLink>
            <!--            <a class="flex justify-center">
              <button type="button" class="btn-secondary py-1">
                {{ t("home.cta.download") }}
              </button>
            </a>-->
          </div>
        </div>
      </div>
      <div class="linebreak" />
      <div class="spotlight p-8">
        <SettingsThemeSwitcher class="max-w-6xl mx-auto" />
      </div>
    </main>
  </div>
</template>
