<script setup lang="ts">
import { User } from "~/types/User";

definePageMeta({
  name: "Edit Profile",
  title: "Edit Profile",
});

const userStore = useUserStore();

const user = userStore.getUser as User;
const confirmDeleteModal = ref(false);
const confirmUpdateModal = ref(false);
</script>

<template>
  <div class="space-y-6">
    <div class="app-card">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-primary">{{ $t("profile.title") }}</h3>
          <p class="mt-1 text-sm text-muted">
            {{ $t("profile.description") }}
          </p>
        </div>
        <div class="mt-5 space-y-6 md:col-span-2 md:mt-0">
          <div id="username" class="block text-sm font-medium text-muted">
            <label for="username" class="block text-sm font-medium text-muted">{{ $t("profile.username") }}</label>
            <input :placeholder="$t('login.login')" class="input w-full" v-model="user.username" />
          </div>
          <div>
            <label for="about" class="block text-sm font-medium text-muted">{{ $t("profile.bio") }}</label>
            <div class="mt-1">
              <textarea
                id="about"
                name="about"
                rows="3"
                class="input p-3 block w-full rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-accent focus:border-accent"
                placeholder="Hi there! I'm new here."
                v-model="user.bio"
              />
            </div>
          </div>
          <div class="col-span-6 sm:col-span-3 flex items-center">
            <div class="rounded-full w-20 h-20">
              <nuxt-img :src="user.avatar" class="rounded-full object-cover" />
            </div>
            <div class="w-full ml-5">
              <label for="first-name" class="block text-sm font-medium text-muted">
                {{ $t("profile.avatar") }}
              </label>
              <input :placeholder="$t('profile.firstname')" class="input w-full" v-model="user.avatar" />
            </div>
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium text-muted">
              {{ $t("profile.cover") }}
            </label>
            <nuxt-img :src="user.cover" class="h-20 w-full object-cover my-2" quality="10" />
            <input :placeholder="$t('profile.firstname')" class="input w-full" v-model="user.cover" />
          </div>
          <div class="flex justify-end mt-5 gap-2">
            <button class="btn-primary py-1" @click="confirmUpdateModal = true">
              {{ $t("profile.save") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="app-card">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-primary">
            {{ $t("profile.personal_information") }}
          </h3>
          <p class="mt-1 text-sm text-muted">
            {{ $t("profile.personal_information_description") }}
          </p>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium text-muted">
                {{ $t("profile.firstname") }}
              </label>
              <input :placeholder="$t('profile.firstname')" class="input w-full" v-model="user.firstname" />
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium text-muted">
                {{ $t("profile.lastname") }}
              </label>
              <input :placeholder="$t('profile.lastname')" class="input w-full" v-model="user.lastname" />
            </div>
          </div>
          <div class="flex justify-end mt-5 gap-2">
            <button class="btn-primary py-1" @click="confirmUpdateModal = true">
              {{ $t("profile.save") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="app-card">
      <h3 class="text-lg font-medium leading-6 text-primary">{{ $t("profile.delete_my_account") }}</h3>
      <div class="mt-2 max-w-xl text-sm text-muted">
        <p>{{ $t("profile.delete_my_account_description") }}</p>
      </div>
      <div class="mt-5">
        <button type="button" class="bg-red-600 text-inverted px-4 py-2 rounded-md sm:text-sm" @click="confirmDeleteModal = true">
          {{ $t("profile.delete_my_account") }}
        </button>
      </div>
      <ModalsConfirm
        :title="$t('profile.profile_delete_confirmation')"
        :description="$t('profile.profile_delete_confirmation_description')"
        :show="confirmDeleteModal"
        @close="confirmDeleteModal = false"
        :callback="useDeleteUser"
        type="delete"
      />
      <ModalsConfirm
        :title="$t('profile.profile_update_confirmation')"
        :description="$t('profile.profile_update_confirmation_description')"
        :show="confirmUpdateModal"
        @close="confirmUpdateModal = false"
        :callback="useUpdateUser"
        type="update"
      />
    </div>
  </div>
</template>
