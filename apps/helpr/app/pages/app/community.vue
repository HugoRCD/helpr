<script setup lang="ts">
definePageMeta({
  title: 'Community',
  description: 'Community page',
})

const { data: users, pending } = await useLazyFetch('/api/community/getSomeUsers', {
  method: 'GET',
})

function goToProfile(userId: number) {
  useRouter().push(`/app/profile/${userId}`)
}

const search = ref('')
const searchedUsers = ref()

async function searchUser() {
  const { data } = await useLazyFetch('/api/community/searchUser', {
    method: 'GET',
    query: {
      search: search.value,
    },
  })
  searchedUsers.value = data.value
  console.log(searchedUsers.value)
}

watchEffect(() => {
  if (search.value === '') {
    searchedUsers.value = undefined
  }
})
</script>

<template>
  <div>
    <FlowLoader v-if="pending" :nb-items="3" />
    <div v-else class="bg-secondary rounded-lg p-4">
      <div class="flex flex-col items-center justify-center gap-4">
        <h2 class="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          {{ $t("community.title") }}
        </h2>
        <p class="max-w-2xl text-xl text-muted text-center">
          {{ $t("community.description") }}
        </p>
        <div class="flex items-center justify-center gap-4 w-full">
          <input
            v-model="search"
            type="text"
            class="w-full px-4 py-2 bg-primary border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            :placeholder="$t('community.search_members')"
            @keyup.enter="searchUser"
          >
          <button type="button" class="btn btn-primary" :disabled="search === ''" @click="searchUser">
            {{ $t("community.search") }}
          </button>
        </div>
      </div>
      <ul
        v-if="search === ''"
        role="list"
        class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <li
          v-for="user in users"
          :key="user.name"
          class="col-span-1 flex flex-col text-center cursor-pointer"
          @click="goToProfile(user.id)"
        >
          <Avatar :user size="community" />
          <h3 class="mt-6 text-center text-lg font-medium text-primary">
            {{ user.firstname }} {{ user.lastname }}
          </h3>
          <p class="mt-2 text-center text-sm text-muted">
            {{ user.bio }}
          </p>
        </li>
      </ul>
    </div>
    <div v-if="searchedUsers && searchedUsers.length > 0" class="mt-4">
      <div
        v-for="user in searchedUsers"
        :key="user.id"
        class="bg-secondary rounded-lg p-4 flex cursor-pointer items-center gap-4"
        @click="goToProfile(user.id)"
      >
        <nuxt-img class="h-20 w-20 rounded-full object-cover" :src="user.avatar" sizes="sm:100vw md:50vw lg:400px" />
        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-medium text-primary">
            {{ user.firstname }} {{ user.lastname }}
          </h3>
          <p class="text-sm text-muted">
            {{ user.bio }}
          </p>
        </div>
      </div>
    </div>
    <div v-else-if="searchedUsers && searchedUsers.length === 0" class="bg-secondary rounded-lg p-4 mt-4">
      <p class="text-center text-muted">
        {{ $t("community.no_members_found") }}
      </p>
      <p class="text-center text-muted">
        {{ $t("community.try_other_search") }}
      </p>
    </div>
  </div>
</template>
