<script setup>
defineProps({
  error: Object,
})

function handleError() {
  clearError({ redirect: '/' })
}

function goBack() {
  clearError()
  useRouter().back()
}
</script>

<template>
  <main class="grid min-h-full place-items-center bg-primary py-24 px-6 sm:py-32 lg:px-8">
    <div class="text-center max-w-2xl mx-auto">
      <p class="text-base font-semibold text-accent">
        {{ error.statusCode }}
      </p>
      <h1 class="mt-4 font-bold text-white text-xl sm:text-2xl md:text-3xl">
        Uh oh! Something went wrong.
      </h1>
      <p class="mt-6 text-base text-muted text-xl">
        {{ error.message }}
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <NuxtLink
          class="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-hover cursor-pointer"
          @click="handleError"
        >
          Go back home
        </NuxtLink>
        <button class="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-hover cursor-pointer" @click="goBack">
          Go back
        </button>
      </div>
    </div>
  </main>
</template>
