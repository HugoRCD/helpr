<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/outline'
import { Plan, Plans } from '~/types/Pricing'

definePageMeta({
  name: 'Pricing',
  title: 'Pricing',
  description: 'Pricing page',
})

const subscription = useUserStore().getSubscription

const premiumPlan: Plan = {
  id: 'prod_NEMP9hBJdE3WNV',
  name: 'Premium',
  price: 7.99,
  priceId: Plans.PREMIUM.priceId,
  description: 'Upgrade to Premium to unlock all the features of Helpr !!!',
  features: ['Unlimited flows', 'Unlimited actions', 'Unlimited triggers', 'Unlimited integrations', 'Unlimited team members', 'Priority support'],
}

const user = useUserStore().getUser

async function redirectToLogin() {
  if (!user) {
    useRouter().push('/login')
  }
}
</script>

<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          {{ $t("pricing.title_start") }}<span class="text-gradient">{{ $t("pricing.era") }}</span>{{ $t("pricing.title_end") }}
        </h2>
        <p class="mt-6 text-lg leading-8 text-muted">
          {{ $t("pricing.description") }}
        </p>
      </div>
      <div
        class="relative backdrop-blur-md bg-primary-opacity/30 mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-secondary sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
      >
        <div class="backdrop-shadow-sm bg-accent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute z-0" />
        <div class="p-8 sm:p-10 lg:flex-auto">
          <h3 class="text-2xl font-bold tracking-tight text-primary">
            Premium Membership
          </h3>
          <p class="mt-6 text-base leading-7 text-muted">
            {{ premiumPlan.description }}
          </p>
          <div class="mt-10 flex items-center gap-x-4">
            <h4 class="flex-none text-sm font-semibold leading-6 text-muted">
              {{ $t("pricing.whats_included") }}
            </h4>
            <div class="h-px flex-auto bg-secondary" />
          </div>
          <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-muted sm:grid-cols-2 sm:gap-6">
            <li v-for="feature in premiumPlan.features" :key="feature" class="flex gap-x-3">
              <CheckIcon class="h-6 w-5 flex-none text-accent" aria-hidden="true" />
              {{ feature }}
            </li>
          </ul>
        </div>
        <form action="/api/stripe/subscribe" method="post" class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div class="rounded-2xl backdrop-blur-md bg-primary-opacity/60 shadow-2xl py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div class="mx-auto max-w-xs px-8">
              <p class="text-base font-semibold text-muted">
                {{ $t("pricing.boost") }}
              </p>
              <p class="mt-6 flex items-baseline justify-center gap-x-2">
                <span class="text-5xl font-bold tracking-tight text-primary">{{ premiumPlan.price }}€</span>
                <span class="text-sm font-semibold leading-6 tracking-wide text-muted">/m</span>
              </p>
              <input type="hidden" name="userId" :value="user?.id">
              <button
                :type="user ? 'submit' : 'button'"
                name="priceId"
                :value="premiumPlan.priceId"
                class="btn-primary mt-8 w-full"
                :aria-describedby="user ? null : 'login-required'"
                :disabled="subscription && subscription[0]?.name === premiumPlan.name"
                :class="subscription && subscription[0]?.name === premiumPlan.name ? 'cursor-not-allowed' : ''"
                @click="user ? null : redirectToLogin()"
              >
                {{ $t("pricing.subscribe") }}
              </button>
              <p class="mt-6 text-xs leading-5 text-muted">
                {{ $t("pricing.terms") }}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
