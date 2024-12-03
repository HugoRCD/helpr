<script setup lang="ts">
defineProps({
  nbItems: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col gap-4 mt-4">
    <div v-for="i in nbItems" :key="i" class="bg-secondary border border-muted rounded-md px-4 py-8 w-full">
      <div class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 bg-primary rounded" />
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-primary rounded col-span-2" />
              <div class="h-2 bg-primary rounded col-span-1" />
            </div>
            <div class="h-2 bg-primary rounded" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
