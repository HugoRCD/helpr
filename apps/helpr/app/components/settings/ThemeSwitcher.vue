<script setup lang="ts">
import { MoonIcon } from '@heroicons/vue/24/outline'

const themes = [
  {
    name: 'Lime',
    value: 'lime',
    icon: MoonIcon,
  },
  {
    name: 'Cosmos',
    value: 'cosmos',
    icon: MoonIcon,
  },
  {
    name: 'Ardent',
    value: 'ardent',
    icon: MoonIcon,
  },
  {
    name: 'Nebula',
    value: 'nebula',
    icon: MoonIcon,
  },
]
</script>

<template>
  <div class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
    <ClientOnly>
      <SettingsThemeCard
        v-for="theme in themes"
        :key="theme.name"
        :class="theme.value"
        :name="theme.name"
        :icon="theme.icon"
        :is-active="$colorMode.value === theme.value"
        :available-themes="themes"
        @click="$colorMode.preference = theme.value"
      />
    </ClientOnly>
  </div>
</template>
