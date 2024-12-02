<script setup lang="ts">
import { ImplicitFlowErrorResponse, ImplicitFlowSuccessResponse } from 'vue3-google-signin'

async function handleOnSuccess(response: ImplicitFlowSuccessResponse) {
  await useFetch('/api/providers/google', {
    method: 'POST',
    body: JSON.stringify({
      code: response.code,
    }),
  })
}
function handleOnError(errorResponse: ImplicitFlowErrorResponse) {
  console.log('Error: ', errorResponse)
}

const { login } = useCodeClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
})
</script>

<template>
  <button class="btn-secondary flex flex-row gap-3 items-center py-2" @click="login()">
    <ProviderLogo provider="google" />
    <span>{{ $t("providers.connect_google") }}</span>
  </button>
</template>

