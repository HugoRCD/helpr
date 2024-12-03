<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  providerTrigger: {
    type: String,
    required: true,
  },
  providerActions: {
    type: Array,
    required: true,
  },
  premium: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="flowCard glass-card relative">
    <div
      v-if="premium"
      class="absolute -top-0 right-0 px-6 bg-yellow-400 rounded-bl-md rounded-tr-md flex items-center gap-2"
    >
      <span class="text-xs font-medium text-white"> premium </span>
    </div>
    <div class="flex flex-col gap-2 justify-between h-full">
      <div
        class="h-full flex items-center justify-center divide-accent divide-x-md p-8 bg-gradient-to-r from-primary to-secondary rounded-md"
      >
        <ProviderLogo v-for="provider in providerActions" :key="provider" :provider :size="8" class="px-6" />
      </div>
      <div class="flex items-center gap-4 mt-2">
        <ProviderLogo :provider="providerTrigger" :size="8" />
        <div class="flex flex-col gap-1">
          <span class="text-sm font-medium text-primary">{{ title }}</span>
          <span class="text-xs text-muted">{{ description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flowCard {
  max-width: 400px;
  flex-shrink: 0;
  position: relative;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
