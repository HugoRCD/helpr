<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  isText: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'h-6 w-6',
  },
})
</script>

<template>
  <div class="text-center">
    <ArrowPathIcon class="animate-spin text-primary" :class="size" />
    <p v-if="props.isText" class="text">
      {{ $t("loading") }}
    </p>
  </div>
</template>
