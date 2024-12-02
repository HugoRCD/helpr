<script setup lang="ts">
defineProps({
  nb: {
    type: Number,
    required: true,
  },
})

const providers = ['calendar', 'gmail', 'github', 'sheets', 'slack', 'linkedin', 'linear', 'notion', 'openai', 'deepl']

function getRandomProvider() {
  return providers[Math.floor(Math.random() * providers.length)]
}
</script>

<template>
  <div class="flex flex-wrap justify-center items-center gap-4">
    <div v-for="i in nb" :key="i" class="p-4 bg-secondary rounded-full shadow-2xl">
      <ProviderLogo :provider="getRandomProvider()" :size="8" />
    </div>
  </div>
</template>
