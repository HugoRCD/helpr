<script setup lang="ts">
const applicationName = useAppConfig().appName
defineProps({
  isText: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 6,
  },
})
</script>

<template>
  <div>
    <NuxtLink id="logo" to="/" class="flex flex-shrink-0 items-center">
      <nuxt-img class="block w-auto lg:hidden" :class="size ? 'h-' + size : 'h-6'" src="assets/helpr-logo-light.svg" alt="Helpr Logo" />
      <nuxt-img class="hidden w-auto lg:block" :class="size ? 'h-' + size : 'h-6'" src="assets/helpr-logo-light.svg" alt="Helpr Logo" />
      <span v-if="isText" class="text-md font-bold text-primary ml-2">
        {{ applicationName }}
      </span>
    </NuxtLink>
  </div>
</template>
