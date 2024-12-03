<script lang="ts" setup>
definePageMeta({
  name: 'Providers',
  title: 'Connect Services',
})

const {
  data: userProviders,
  refresh: refreshUserProviders,
  pending: pendingUserProviders,
} = await useLazyAsyncData(async () => {
  return await getUserProviders()
})

const {
  data: providers,
  refresh: refreshProviders,
  pending: pendingProviders,
} = await useLazyAsyncData(async () => {
  return await getProviders()
})

const code = computed(() => {
  const route = useRoute()
  return route.query.code
})

const linkedinCode = computed(() => {
  const route = useRoute()
  return route.query.code
})

const publicConfig = useRuntimeConfig().public

const githubUrl =
  'https://github.com/login/oauth/authorize' +
  '?client_id=' +
  publicConfig.github.clientId +
  '&redirect_uri=' +
  publicConfig.appUrl +
  '&response_type=code' +
  '&scope=repo,read:user,user:email'

const tokenProviders = ['github', 'linear', 'stripe', 'notion']
const filteredProviders = computed(() => {
  if (!providers.value) return []
  return providers.value.filter((provider) => tokenProviders.includes(provider.name.toLowerCase()))
})

const connectedProviders = computed(() => {
  if (!userProviders.value) return []
  return userProviders.value.filter((provider) => tokenProviders.includes(provider.name.toLowerCase()))
})

const deconnectedProviders = computed(() => {
  if (!userProviders.value) return []
  return filteredProviders.value.filter(
    (provider) =>
      !userProviders.value.some((userProvider) => userProvider.name.toLowerCase() === provider.name.toLowerCase()),
  )
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
      <ProvidersGoogleConnect class="p-2" />
      <button class="btn-secondary p-2">
        <NuxtLink :to="githubUrl" class="flex flex-row gap-5 items-center">
          <ProviderLogo :provider="'github'" />
          <span>Connect Github</span>
        </NuxtLink>
      </button>
      <button v-if="code" class="btn-secondary flex flex-row gap-5 items-center" @click="getGithubToken(code)">
        <ProviderLogo :provider="'github'" />
        <span>Github Token</span>
      </button>
      <Loader v-if="pendingProviders" />
      <div v-else class="flex flex-col mt-10 gap-4">
        <hr class="border-primary">
        <label class="block text-sm font-medium text-primary">
          {{ $t("providers.connected_providers") }}
        </label>
        <CreateCredential
          v-for="provider in connectedProviders"
          :key="provider.provider"
          :is-connected="false"
          :refresh-user-providers
          :provider-name="provider.name"
          :token-link="provider.tokenLink"
        />
        <hr class="border-primary">
        <label class="block text-sm font-medium text-primary mt-5">
          {{ $t("providers.connect_provider") }}
        </label>
        <CreateCredential
          v-for="provider in deconnectedProviders"
          :key="provider.provider"
          :is-connected="true"
          :refresh-user-providers
          :provider-name="provider.name"
          :token-link="provider.tokenLink"
        />
      </div>
    </div>
  </div>
</template>
