<script setup lang="ts">
import { PropType } from 'vue'
import { User } from '~~/types/User'

defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
  size: {
    type: String,
    required: false,
    default: 'normal',
  },
})

const normal = 'h-12 w-12'
const profile = 'h-24 w-24 sm:h-32 sm:w-32'
const community = 'h-24 w-24'
</script>

<template>
  <div class="flex items-center justify-center">
    <NuxtImg
      preload
      class="w-full object-cover rounded-full"
      :class="size === 'normal' ? normal : size === 'profile' ? profile : community"
      :src="`${user.avatar}?${new Date().getTime()}`"
      sizes="sm:100vw md:50vw lg:400px"
      :alt="user.firstname + ' ' + user.lastname"
    />
  </div>
</template>
