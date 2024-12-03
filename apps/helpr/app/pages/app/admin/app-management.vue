<script setup lang="ts">
import LanguageSelector from '~/components/settings/LanguageSelector.vue'

definePageMeta({
  name: 'App Management',
  title: 'App Management',
})
</script>

<template>
  <div class="bg-secondary shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-primary">
        Settings
      </h3>
      <div class="mt-2 max-w-xl text-sm text-muted">
        <p>Here you can change the application settings.</p>
      </div>
      <div class="mt-5 flex gap-4">
        <LanguageSelector :is-text="true" />
      </div>
    </div>
  </div>
</template>
