<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'admin'],
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
