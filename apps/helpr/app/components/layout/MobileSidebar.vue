<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ArrowLeftOnRectangleIcon, Bars3BottomLeftIcon, XMarkIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import { Role } from '~~/enums/Role'

const appNav = getNavigation('app')
const userNav = getNavigation('user')
const adminNav = getNavigation('admin')

const userStore = useUserStore()

const user = computed(() => {
  return userStore.getUser
})

const sidebarOpen = ref(false)
</script>

<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col app-card p-0 rounded-none focus:outline-none">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex flex-col">
                <!-- Sidebar component, swap this element with another sidebar if you like -->
                <div class="flex min-h-0 flex-1 flex-col">
                  <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                    <div class="flex flex-shrink-0 items-center px-4">
                      <Logo :is-text="true" :is-logo="true" />
                    </div>
                    <nav class="mt-5 flex-1" aria-label="Sidebar">
                      <div class="space-y-1 px-2">
                        <NuxtLink
                          to="/app/builder/new-flow"
                          class="mb-2 flex items-center px-2 py-2 text-sm font-medium rounded-md text-white gradient"
                          @click="sidebarOpen = false"
                        >
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
                          :aria-current="item.name === $route.name ? 'page' : undefined"
                          @click="sidebarOpen = false"
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
                          @click="sidebarOpen = false"
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
                          @click="sidebarOpen = false"
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
                          class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-muted hover:bg-accent-faded hover:text-accent"
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
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0" aria-hidden="true">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <div class="p-4 flex justify-between">
      <Logo :is-text="true" :is-logo="true" />
      <button type="button" class="md:hidden" @click="sidebarOpen = true">
        <Bars3BottomLeftIcon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
