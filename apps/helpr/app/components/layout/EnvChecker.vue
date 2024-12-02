<script setup lang="ts">
const env = process.env.NODE_ENV
</script>

<template>
  <div v-if="env !== 'production'" class="env-checker fixed bottom-0 z-10 p-1 text-center" :class="env">
    {{ env }}
  </div>
</template>

<style scoped>
.env-checker {
  .env-checker.production {
    background-color: darkgreen;
  }
  .env-checker.staging {
    background-color: yellow;
  }
}
</style>
