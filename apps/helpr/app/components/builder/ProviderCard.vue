<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex border rounded-lg p-4">
    <div class="mr-4 flex-shrink-0 self-center">
      <img :src="logo" class="h-8 w-8 rounded-full" :alt="name">
    </div>
    <div>
      <h4 class="text-md font-bold">
        {{ name }}
      </h4>
      <p class="mt-1">
        {{ description }}
      </p>
    </div>
  </div>
</template>
