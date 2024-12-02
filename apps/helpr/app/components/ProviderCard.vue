<script setup lang="ts">
defineProps({
  size: {
    type: Number,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-wrap justify-center items-center gap-4">
    <ProviderLogo :provider :size class="p-4 bg-secondary rounded-full shadow-2xl" />
  </div>
</template>
