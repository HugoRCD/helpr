<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { PlayIcon } from '@heroicons/vue/24/solid'

const open = ref(false)
</script>

<template>
  <div>
    <div
      class="h-16 w-16 rounded-full flex gradient items-center transform justify-center hover:scale-110 transition-all cursor-pointer duration-300 ease-in-out"
      @click="open = !open"
    >
      <PlayIcon class="h-8 w-8 text-inverted -pl-4" />
    </div>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-800/30 transition-opacity" />
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
              <DialogPanel class="relative transform overflow-hidden rounded-lg shadow-xl transition-all w-2/3">
                <div>
                  <video
                    :class="{
                      'opacity-0': !open,
                      'opacity-100': open,
                    }"
                    autoplay
                    loop
                    muted
                  >
                    <source src="https://uynsrkwqyplqhfrmdaqw.supabase.co/storage/v1/object/public/assets/helpr-promo" type="video/mp4">
                  </video>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
