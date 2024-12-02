<script setup lang="ts">
import { ArrowLeftOnRectangleIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import { Role } from '~~/enums/Role'

const appNav = getNavigation('app')
const userNav = getNavigation('user')
const adminNav = getNavigation('admin')

const userStore = useUserStore()

const user = computed(() => {
  return userStore.getUser
})
</script>

<template>
  <div>
    <div class="hidden fixed w-64 flex-col md:flex lg:flex-shrink-0 overflow-hidden h-full">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex min-h-0 flex-1 flex-col app-card p-0 rounded-none">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <Logo :is-text="true" :is-logo="true" />
          </div>
          <nav class="mt-5 flex-1" aria-label="Sidebar">
            <div class="space-y-1 px-2">
              <NuxtLink to="/app/builder/new-flow" class="mb-2 flex items-center px-2 py-2 text-sm font-medium rounded-md text-white gradient">
                <PlusCircleIcon class="mr-3 flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                {{ $t("navigation.create flow") }}
              </NuxtLink>
              <NuxtLink
                v-for="item in appNav"
                :key="item.name"
                :to="item.to"
                :class="[
                  item.to === $route.path ? 'bg-accent-faded text-accent' : 'text-gray-600 hover:bg-accent-faded hover:text-accent',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[item.to === $route.path ? 'text-accent' : 'text-muted group-hover:text-accent', 'mr-3 flex-shrink-0 h-6 w-6']"
                  aria-hidden="true"
                />
                {{ $t("navigation." + item.name.toLowerCase()) }}
              </NuxtLink>
            </div>
            <hr class="my-5 border-t border-app-border" aria-hidden="true">
            <div class="space-y-1 px-2">
              <NuxtLink
                v-for="item in userNav"
                :key="item.name"
                :to="item.to"
                :class="[
                  item.to === $route.path ? 'bg-accent-faded text-accent' : 'text-gray-600 hover:bg-accent-faded hover:text-accent',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[item.to === $route.path ? 'text-accent' : 'text-muted group-hover:text-accent', 'mr-3 flex-shrink-0 h-6 w-6']"
                  aria-hidden="true"
                />
                {{ $t("navigation." + item.name.toLowerCase()) }}
              </NuxtLink>
            </div>
            <hr v-if="user && user.role === Role.ADMIN" class="my-5 border-t border-muted" aria-hidden="true">
            <div v-if="user && user.role === Role.ADMIN" class="flex-1 space-y-1 px-2">
              <NuxtLink
                v-for="item in adminNav"
                :key="item.name"
                :to="item.to"
                :class="[
                  item.to === $route.path ? 'bg-accent-faded text-accent' : 'text-gray-600 hover:bg-accent-faded hover:text-accent',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[item.to === $route.path ? 'text-accent' : 'text-muted group-hover:text-accent', 'mr-3 flex-shrink-0 h-6 w-6']"
                  aria-hidden="true"
                />
                {{ $t("navigation." + item.name.toLowerCase()) }}
              </NuxtLink>
            </div>
            <hr class="my-5 border-t border-app-border" aria-hidden="true">
            <div class="space-y-1 px-2">
              <button
                type="button"
                class="group w-full flex items-center rounded-md px-2 py-2 text-sm font-medium text-muted hover:bg-accent-faded hover:text-accent"
                @click="useLogout()"
              >
                <ArrowLeftOnRectangleIcon class="mr-3 h-6 w-6 flex-shrink-0 text-muted group-hover:text-accent-hover" />
                {{ $t("navigation.logout") }}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
