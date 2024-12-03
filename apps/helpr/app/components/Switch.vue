<script setup lang="ts">
import { Switch } from '@headlessui/vue'
import { CheckIcon, XCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const enabled = ref(props.modelValue)

const emit = defineEmits(['update:value'])

const emitChange = () => {
  emit('update:value', enabled.value)
}

watch(enabled, emitChange)
</script>

<template>
  <Switch
    v-model="enabled"
    :class="[
      enabled ? 'bg-accent' : 'bg-gray-300',
      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
    ]"
  >
    <span
      :class="[
        enabled ? 'translate-x-5' : 'translate-x-0',
        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
      ]"
    >
      <span
        :class="[
          enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
          'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
        ]"
        aria-hidden="true"
      >
        <XCircleIcon class="h-3 w-3 text-muted" />
      </span>
      <span
        :class="[
          enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
          'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
        ]"
        aria-hidden="true"
      >
        <CheckIcon class="h-3 w-3 text-accent" />
      </span>
    </span>
  </Switch>
</template>
