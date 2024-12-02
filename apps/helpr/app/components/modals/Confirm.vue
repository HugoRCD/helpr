<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

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
  callback: {
    type: Function,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: 'delete',
  },
})

const emit = defineEmits(['close'])

const loading = ref(false)
async function execCallback() {
  loading.value = true
  await props.callback()
  emit('close')
  loading.value = false
}

const primaryButtonClass = computed(() => {
  return `flex items-center gap-2 w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${
    props.type === 'delete' ? 'bg-red-600 hover:bg-red-500' : 'bg-accent hover:bg-accent/80'
  }`
})

const icon = computed(() => {
  return props.type === 'delete' ? ExclamationTriangleIcon : QuestionMarkCircleIcon
})

const iconColor = computed(() => {
  return props.type === 'delete' ? 'bg-red-600' : 'bg-accent'
})
</script>

<template>
  <TransitionRoot as="template" :show>
    <Dialog as="div" class="relative z-10" @close="emit('close')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-600/30 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="bg-app-secondary/80 backdrop-blur-md border-app-border border-[2px] relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button type="button" class="rounded-md text-app-text-muted hover:text-primary focus:outline-none" @click="emit('close')">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10" :class="iconColor">
                  <component :is="icon" class="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-primary">
                    {{ title }}
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-app-text-muted">
                      {{ description }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button type="button" :class="primaryButtonClass" @click="execCallback()">
                  <Loader v-if="loading" size="h-4 w-4" />
                  <span v-if="props.type === 'delete'">
                    {{ $t("action.delete") }}
                  </span>
                  <span v-if="props.type === 'update'">
                    {{ $t("action.update") }}
                  </span>
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="emit('close')"
                >
                  {{ $t("action.cancel") }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
