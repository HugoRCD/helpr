<script setup lang="ts">
const config = useRuntimeConfig().public

const githubUrl = `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&redirect_uri=${config.appDomain}/app/providers&response_type=code&scope=repo,read:user,user:email`

const code = computed(() => {
  const route = useRoute()
  return route.query.code
})

watch(code, async (code) => {
  console.log('code', code)
  if (!code) return
  console.log('code', code)
  await useFetch('/api/providers/github', {
    method: 'POST',
    body: {
      code,
    },
  })
})
</script>

<template>
  <button class="btn-secondary py-2">
    <NuxtLink :to="githubUrl" class="flex flex-row gap-3 items-center">
      <ProviderLogo provider="github" />
      <span>{{ $t("providers.connect_github") }}</span>
    </NuxtLink>
  </button>
</template>

