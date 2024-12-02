<script setup>
definePageMeta({
  name: 'Profile',
  title: 'Profile',
})

const resetError = (error) => {
  error.value = null
  useRouter().back()
}
</script>

<template>
  <div>
    <NuxtErrorBoundary>
      <NuxtPage class="-m-4" />
      <template #error="{ error }">
        <div class="p-8 rounded-md">
          <h2 class="text-4xl font-bold">
            Error
          </h2>
          <p>{{ error }}</p>
          <button class="bg-blue-500 text-white p-2 rounded-md" @click="resetError(error)">
            Retry
          </button>
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
