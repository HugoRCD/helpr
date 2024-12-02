<script setup lang="ts">
defineProps({
  provider: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: false,
  },
  size: {
    type: Number,
    required: false,
    default: 6,
  },
})
</script>

<template>
  <div class="flex flex-shrink-0 items-center">
    <div v-if="!source">
      <nuxt-img
        class="block lg:hidden"
        :src="'/assets/provider/light/' + provider + '-logo.svg'"
        :class="['w-' + size, 'h-' + size]"
        :alt="provider + ' logo'"
      />
      <nuxt-img
        class="hidden w-auto lg:block"
        :src="'/assets/provider/light/' + provider + '-logo.svg'"
        :class="['w-' + size, 'h-' + size]"
        :alt="provider + ' logo'"
      />
    </div>
    <div v-else>
      <nuxt-img class="block w-auto lg:hidden" :src="source" :alt="provider + ' logo'" :class="['h-' + size]" />
      <nuxt-img class="hidden w-auto lg:block" :src="source" :alt="provider + ' logo'" :class="['h-' + size]" />
    </div>
  </div>
</template>
