<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const { locale, setLocaleCookie } = useI18n()

defineProps({
  isText: {
    type: Boolean,
    default: false,
  },
})

const locales = [
  {
    name: 'English',
    iso: 'en',
    flag: '🇺🇸',
  },
  {
    name: 'Français',
    iso: 'fr',
    flag: '🇫🇷',
  },
]

watch(locale, (newLocale) => {
  setLocaleCookie(newLocale)
})
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton as="button" class="inline-flex gap-2 justify-center w-full px-4 py-2 text-sm font-medium text-primary border border-transparent rounded-md">
      <span>{{ locales.find((l) => l.iso === $i18n.locale).flag }}</span>
      <span v-if="isText">{{ locales.find((l) => l.iso === $i18n.locale).name }}</span>
    </MenuButton>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems as="div" class="absolute mt-2 origin-center bg-primary border border-muted divide-y divide-muted rounded-md shadow-lg outline-none">
        <MenuItem
          v-for="locale in $i18n.availableLocales"
          :key="locale"
          as="button"
          class="flex justify-between w-full px-4 py-2 text-sm text-primary hover:bg-secondary"
          @click="() => ($i18n.locale = $i18n.locale === 'en' ? 'fr' : 'en')"
        >
          <div class="flex items-center gap-2">
            <span class="text-muted">
              {{ locales.find((l) => l.iso === locale).flag }}
            </span>
            <span v-if="isText">
              {{ locales.find((l) => l.iso === locale).name }}
            </span>
          </div>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
