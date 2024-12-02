<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Bars3Icon, ArrowRightIcon } from '@heroicons/vue/24/outline'

const navigation = getNavigation('home')
const userStore = useUserStore()

const user = computed(() => {
  return userStore.getUser
})
</script>

<template>
  <header class="backdrop-blur-lg bg-primary-opacity/40 sticky top-0 z-50">
    <nav class="mx-auto flex max-w-7xl items-center justify-between py-3 px-4">
      <div class="flex flex-1 items-center">
        <div class="hidden lg:flex lg:gap-x-8">
          <NuxtLink
            v-for="item in navigation"
            :id="item.name.toLowerCase()"
            :key="item.name"
            :to="item.to"
            class="text-xs font-semibold leading-6 hover:text-gradient transition-colors duration-300 ease-in-out"
            :class="[item.name === $route.name ? 'text-gradient' : 'text-primary']"
          >
            {{ $t("navigation." + item.name.toLowerCase()) }}
          </NuxtLink>
        </div>
        <Menu as="div" class="relative inline-block text-left lg:hidden">
          <div>
            <MenuButton class="inline-flex w-full justify-center rounded-md font-medium text-primary focus:outline-none">
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="w-6 h-6" />
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute left-0 w-56 origin-top-left bg-secondary rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-600"
            >
              <div v-if="user" class="px-4 py-3">
                <p class="text-sm">
                  Signed in as
                </p>
                <p class="truncate text-sm font-medium text-accent">
                  {{ user.email }}
                </p>
              </div>
              <div>
                <MenuItem v-for="item in navigation" v-slot="{ active }" :key="item.name">
                  <NuxtLink
                    :id="item.name.toLowerCase()"
                    :to="item.to"
                    :class="[active || item.name === $route.name ? 'bg-accent-faded text-accent' : 'text-primary', 'block w-full px-4 py-2 text-left text-sm']"
                  >
                    {{ $t("navigation." + item.name.toLowerCase()) }}
                  </NuxtLink>
                </MenuItem>
              </div>
              <div v-if="!user">
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/auth/login"
                    class="w-full block text-left px-4 py-2 text-sm text-primary"
                    :class="active ? 'bg-accent-faded text-accent' : 'text-primary'"
                  >
                    {{ $t("navigation.login") }}
                  </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/auth/signup"
                    class="w-full block text-left px-4 py-2 text-sm text-primary"
                    :class="active ? 'bg-accent-faded text-accent' : 'text-primary'"
                  >
                    {{ $t("navigation.signup") }}
                  </NuxtLink>
                </MenuItem>
              </div>
              <div v-else>
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/app/settings"
                    class="w-full block text-left px-4 py-2 text-sm text-primary"
                    :class="active ? 'bg-accent-faded text-accent' : 'text-primary'"
                  >
                    {{ $t("navigation.open_app") }}
                  </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    class="w-full block text-left px-4 py-2 text-sm text-primary"
                    :class="active ? 'bg-accent-faded text-accent' : 'text-red-600'"
                    @click="useLogout()"
                  >
                    {{ $t("navigation.logout") }}
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <Logo :is-text="true" :size="6" />
      <div class="flex flex-1 justify-end items-center gap-x-4">
        <SettingsLanguageSelector />
        <div v-if="!user" class="hidden lg:flex lg:gap-x-4 items-center">
          <NuxtLink to="/auth/login" class="text-gradient text-sm py-1">
            {{ $t("navigation.login") }}
          </NuxtLink>
          <NuxtLink to="/auth/signup" class="btn-primary py-1">
            {{ $t("navigation.signup") }}
          </NuxtLink>
        </div>
        <NuxtLink v-else-if="!$route.path.includes('app')" to="/app/settings" class="btn-secondary py-1 hidden md:block">
          {{
            $t("navigation.open_app")
          }}
        </NuxtLink>
        <ArrowRightIcon v-if="user" class="w-6 h-6 text-primary cursor-pointer" @click="useLogout()" />
      </div>
    </nav>
  </header>
</template>
