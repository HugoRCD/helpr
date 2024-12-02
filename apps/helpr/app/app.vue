<script setup lang="ts">
useHead({
  title: useAppConfig().appTitle,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: useAppConfig().appDescription },
    { name: 'keywords', content: 'Home' },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
})
await useUser()

const toastStore = useToastStore()
const toast = computed(() => {
  return {
    show: toastStore.getShow,
    title: toastStore.getTitle,
    message: toastStore.getMessage,
    type: toastStore.getType,
    infos: toastStore.getInfos,
  }
})
</script>

<template>
  <Html :lang="$i18n.locale">
    <Body class="bg-primary m-0 p-0 text-primary">
      <LayoutEnvChecker />
      <ToastsBasic
        :show="toast.show"
        :title="toast.title"
        :description="toast.message"
        :type="toast.type"
        :infos="toast.infos"
        @close="toastStore.closeToast()"
      />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
