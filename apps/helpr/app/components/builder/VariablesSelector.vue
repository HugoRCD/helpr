<script setup lang="ts">
import { Action } from '~/types/Flow'

const props = defineProps({
  flow: {
    type: Object,
    required: true,
  },
})

const variables = computed((): string[] => {
  const triggerVariables = props.flow.trigger?.variables?.map((variable) => variable.value) || []
  const actionVariables =
    props.flow.actions?.flatMap((action: Action) => action.variables?.map((variable) => variable.value)) || []
  if (props.flow.actions?.some((action: Action) => action.endpoint === 'openai')) {
    actionVariables.push('{openai_response}')
  }
  if (props.flow.actions?.some((action: Action) => action.endpoint === 'deepl')) {
    actionVariables.push('{deepl_response}')
  }
  return [...triggerVariables, ...actionVariables]
})
</script>

<template>
  <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
    <h3 class="text-lg leading-6 font-medium text-primary">
      {{ $t("builder.variables") }}
    </h3>
    <p class="text-sm text-muted">
      {{ $t("builder.variables_description") }}
    </p>
    <div v-if="variables.length > 0" class="flex flex-wrap gap-2 mt-4">
      <button
        v-for="variable in variables"
        :key="variable"
        class="bg-primary text-muted px-2 py-1 rounded-md cursor-pointer border border-gray-800 hover:border-gray-400 transition-colors duration-300 ease-in-out"
        @click="copyToClipboard(variable)"
      >
        {{ variable }}
      </button>
    </div>
    <div v-else class="text-muted text-center mt-4">
      {{ $t("builder.no_variables") }}
    </div>
  </div>
</template>
