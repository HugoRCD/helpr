<script setup>
definePageMeta({
  name: 'Builder',
  title: 'Builder',
})

const resetError = (error) => {
  error.value = null
  useRouter().back()
}
</script>

<template>
  <div>
    <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error }">
        <div class="p-8 bg-secondary rounded-md">
          <h2 class="text-4xl font-bold text-center">
            Error !
          </h2>
          <p class="text-center text-muted mt-4">
            {{ error }}
          </p>
          <div class="flex justify-center mt-4">
            <button class="btn-primary" @click="resetError(error)">
              Go back
            </button>
          </div>
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
