<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  icon: {
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  availableThemes: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div>
    <div class="cursor-pointer bg-primary rounded-md p-3 w-full" :class="{ 'border-2 border-accent': isActive }">
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <component :is="icon" class="w-5 h-5 text-accent" />
          <h3 class="text-sm font-medium text-primary">
            {{ name }}
          </h3>
        </div>
        <div id="preview" class="mt-2 w-full flex flex-col gap-2">
          <div class="flex gap-2 w-full">
            <div class="bg-secondary rounded-full h-4 w-4" />
            <div class="bg-secondary rounded-md h-4 w-full" />
          </div>
          <div class="flex gap-2 w-full">
            <div class="bg-secondary rounded-md h-4 w-1/2" />
            <div class="bg-secondary rounded-md h-4 w-1/2" />
          </div>
          <div class="flex gap-2 w-full justify-center">
            <div class="bg-secondary rounded-full h-4 w-4" />
            <div class="bg-secondary rounded-full h-4 w-4" />
            <div class="bg-secondary rounded-full h-4 w-4" />
          </div>
          <div class="flex gap-2 w-full">
            <div class="gradient rounded-md h-4 w-1/3" />
          </div>
          <div class="flex gap-2 w-full">
            <div class="bg-secondary rounded-md h-4 w-1/2" />
            <div class="bg-secondary rounded-md h-4 w-1/2" />
          </div>
          <div class="bg-secondary rounded-md h-4 w-full" />
        </div>
      </div>
    </div>
  </div>
</template>
