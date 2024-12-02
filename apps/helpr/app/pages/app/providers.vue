<script lang="ts" setup>
definePageMeta({
  name: 'Providers',
  title: 'Connect Services',
})
</script>

<template>
  <div>
    <div class="bg-secondary mb-5 px-4 py-5 shadow rounded-lg sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-primary">
        {{ $t("providers.title") }}
      </h3>
      <p class="mt-1 text-sm text-muted">
        {{ $t("providers.description") }}
      </p>
      <div class="mt-5">
        <!--        <ProvidersGoogleConnect />-->
        <ProvidersGithubConnect />
      </div>
    </div>
  </div>
</template>
