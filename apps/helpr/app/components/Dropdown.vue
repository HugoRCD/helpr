<script setup lang="ts">
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/24/outline'
import { PropType } from 'vue'

type DropdownItem = {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  logo?: string;
};

const props = defineProps({
  items: {
    type: Array as PropType<DropdownItem[]>,
    required: true,
  },
  isLogo: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const userStore = useUserStore()

const selectedItem = ref()

function setItem(item) {
  selectedItem.value = item
}

const filteredItems = computed(() => (selectedItem.value ? selectedItem.value : props.items))

const baseUrl = 'https://uynsrkwqyplqhfrmdaqw.supabase.co/storage/v1/object/public/logo/'

const theme = computed(() => {
  const currentTheme = useGlobalStore().getTheme
  if (currentTheme.includes('light')) {
    return 'dark'
  }
  return 'light'
})

function canAccess(item) {
  if (item.premium) {
    if (userStore.isAdmin) {
      return true
    }
    return userStore.isPremium
  }
  return true
}
</script>

<template>
  <Combobox v-model="selectedItem" as="div" class="w-full">
    <ComboboxLabel class="block text-sm font-medium text-primary">
      {{ label }}
    </ComboboxLabel>
    <div class="relative mt-1">
      <ComboboxInput
        class="w-full rounded-md border border-muted bg-primary py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm"
        :display-value="(item) => item?.title || item?.name"
        :class="selectedItem ? 'text-primary' : 'text-muted'"
        @change="selectedItem = $event.target.value"
      />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon class="h-5 w-5 text-muted" aria-hidden="true" />
      </ComboboxButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <ComboboxOptions
          v-if="filteredItems.length > 0"
          class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-primary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ComboboxOption
            v-for="item in filteredItems"
            :key="item.id"
            v-slot="{ active }"
            :value="item"
            as="div"
            class="cursor-pointer"
            :disabled="!canAccess(item)"
            :class="!canAccess(item) ? 'opacity-50 cursor-not-allowed' : ''"
            @click="setItem(item)"
          >
            <li :class="['relative select-none py-2 pl-3 pr-9', active ? 'bg-secondary' : 'text-primary']">
              <div class="flex items-center">
                <nuxt-img
                  v-if="isLogo"
                  class="h-6 w-6 flex-shrink-0"
                  :src="'/assets/provider/' + theme + '/' + item.name.toLowerCase() + '-logo.svg'"
                />
                <span :class="isLogo ? 'ml-3' : ''" class="block truncate">
                  {{ item.title || item.name }}
                </span>
                <span class="ml-3 truncate text-muted hidden sm:block">
                  {{ item.description }}
                </span>
                <span
                  v-if="item.premium"
                  class="bg-amber-400 text-white px-2 py-0.5 rounded-md text-xs font-medium uppercase ml-2"
                >
                  Premium
                </span>
              </div>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </transition>
    </div>
  </Combobox>
</template>
