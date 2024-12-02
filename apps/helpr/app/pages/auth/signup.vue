<script setup lang="ts">
import LanguageSelector from '~/components/settings/LanguageSelector.vue'

definePageMeta({
  name: 'Signup',
  title: 'Signup',
})

const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const invitationCode = ref('')

const invitation_code = useRuntimeConfig().public.invitationCode

const loading = ref(false)

const disabled = computed(() => {
  return password.value.length < 8 || password.value !== passwordConfirm.value
})

const signup = async () => {
  if (invitation_code !== invitationCode.value) {
    useToastStore().showErrorToast({ title: 'signup.invalid_invitation_code' })
    return
  }
  loading.value = true
  await useSignup({
    username: username.value,
    email: email.value,
    password: password.value,
  })
  loading.value = false
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-12 px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <Logo :is-text="false" class="flex justify-center" :size="12" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
        {{ $t("signup.signup_to_your_account") }}
      </h2>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md mt-12">
      <form class="space-y-4" @submit.prevent="signup">
        <input
          id="username"
          v-model="username"
          name="username"
          autocomplete="username"
          required
          :placeholder="$t('signup.username')"
          class="input w-full"
        >
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          :placeholder="$t('signup.email')"
          class="input w-full"
        >
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          :placeholder="$t('signup.password')"
          class="input w-full"
        >
        <input
          id="confirm-password"
          v-model="passwordConfirm"
          name="confirm-password"
          type="password"
          autocomplete="current-password"
          required
          :placeholder="$t('signup.confirm_password')"
          class="input w-full"
        >
        <input
          v-if="invitation_code"
          id="invitation-code"
          v-model="invitationCode"
          name="invitation-code"
          type="text"
          autocomplete="invitation-code"
          required
          :placeholder="$t('signup.invitation_code')"
          class="input w-full"
        >
        <ButtonPrimary
          :full-width="true"
          :pending="loading"
          type="submit"
          :disabled
          :text="$t('signup.signup')"
          :class="disabled ? 'opacity-50 cursor-not-allowed' : ''"
        />
      </form>
      <NuxtLink :to="{ name: 'Login' }" class="btn-secondary w-full mt-6">
        {{ $t("signup.already_have_an_account") }}
      </NuxtLink>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col justify-center items-center">
      <LanguageSelector :is-text="true" class="mt-6" />
    </div>
  </div>
</template>
