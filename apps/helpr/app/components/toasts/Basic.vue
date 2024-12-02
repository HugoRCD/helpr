<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ShieldExclamationIcon } from '@heroicons/vue/24/outline'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { PropType } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String as PropType<'success' | 'error' | 'warning' | 'info'>,
    default: 'success',
  },
  duration: {
    type: Number,
    default: 4000,
  },
  infos: {
    type: String,
  },
})

const emit = defineEmits(['close'])

watch(
  () => props.show,
  (value) => {
    if (value) {
      setTimeout(() => {
        emit('close')
      }, props.duration)
    }
  },
)
</script>

<template>
  <div aria-live="assertive" class="pointer-events-none z-[9999] fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-secondary shadow-lg border-primary border-[1px]">
          <div class="p-4">
            <div class="flex justify-between" :class="description ? 'items-start' : 'items-center'">
              <div class="flex gap-2">
                <div>
                  <CheckCircleIcon v-if="type === 'success'" class="h-6 w-6 text-green-400" aria-hidden="true" />
                  <XCircleIcon v-if="type === 'error'" class="h-6 w-6 text-red-400" aria-hidden="true" />
                  <InformationCircleIcon v-if="type === 'warning'" class="h-6 w-6 text-yellow-400" aria-hidden="true" />
                  <ShieldExclamationIcon v-if="type === 'info'" class="h-6 w-6 text-blue-400" aria-hidden="true" />
                </div>
                <div class="flex flex-col gap-1">
                  <div class="flex items-center gap-1">
                    <p class="text-base font-medium text-primary">
                      {{ $t(title) }}
                    </p>
                    <p v-if="infos" class="text-base font-medium text-primary">
                      {{ infos }}
                    </p>
                  </div>
                  <p v-if="description" class="text-sm text-muted">
                    {{ $t(description) }}
                  </p>
                </div>
              </div>
              <button type="button" class="inline-flex rounded-md bg-secondary text-gray-400 hover:text-gray-500 focus:outline-none" @click="emit('close')">
                <span class="sr-only">Close</span>
                <XMarkIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
