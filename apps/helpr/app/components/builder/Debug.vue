<script setup lang="ts">
import { ShieldExclamationIcon } from '@heroicons/vue/24/outline'

defineProps({
  flowName: {
    type: String,
    required: true,
  },
  flowDescription: {
    type: String,
    required: true,
  },
  flowEnabled: {
    type: Boolean,
    required: true,
  },
  flowPublic: {
    type: Boolean,
    required: true,
  },
  flowTrigger: {
    type: Object,
    required: true,
  },
  flowActions: {
    type: Array,
    required: true,
  },
})

const debug = ref(false)
</script>

<template>
  <div>
    <div
      v-if="debug"
      class="mt-10 flex flex-col mb-20 text-muted text-sm border border-muted p-2 cursor-pointer"
      @click="debug = false"
    >
      <span>Debug:</span><br>
      <span>Flow name: {{ flowName }}</span>
      <span>Flow description: {{ flowDescription }}</span>
      <span>Flow enabled: {{ flowEnabled }}</span>
      <span>Flow public: {{ flowPublic }}</span>
      <span>Flow trigger: {{ flowTrigger.name }}</span>
      <span>Flow actions: {{ flowActions.map((action) => action.name) }}</span>
      <span>
        Flow actions payload: <span v-for="action in flowActions" :key="action.name">{{ action.payload }}</span>
      </span>
    </div>
    <div v-else>
      <div class="mb-10 flex items-center gap-2 mt-4 cursor-pointer" @click="debug = true">
        <ShieldExclamationIcon class="h-5 w-5 text-muted" aria-hidden="true" />
        <span class="text-sm text-muted">
          {{ $t("builder.show_debug") }}
        </span>
      </div>
    </div>
  </div>
</template>
