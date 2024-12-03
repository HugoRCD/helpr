<script setup lang="ts">
import { ArrowPathIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  name: 'My Flows',
  title: 'My Flows',
})

const {
  data: flows,
  pending,
  refresh,
} = await useLazyAsyncData(async () => {
  const { data } = await getUserFlows()
  return data
})
</script>

<template>
  <div>
    <div class="bg-secondary shadow rounded-lg mb-4">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-primary">
          {{ $t("my_flows.title") }}
        </h3>
        <div class="mt-2 max-w-xl text-sm text-muted">
          <p>
            {{ $t("my_flows.description") }}
          </p>
        </div>
      </div>
    </div>
    <FlowLoader v-if="pending" :nb-items="4" />
    <div v-else-if="flows && flows.length > 0" id="flows-wrapper" class="flex flex-col gap-4">
      <Flow v-for="flow in flows" :key="flow.id" :flow :refresh :is-mine="true" />
    </div>
    <div v-else class="bg-secondary shadow rounded-lg p-4">
      <h3 class="text-lg font-medium leading-6 text-primary text-center">
        {{ $t("my_flows.no_flows") }}
      </h3>
      <div class="mt-2 text-sm text-muted text-center">
        <p>
          {{ $t("my_flows.no_flows_description") }}
        </p>
        <div class="mt-5 flex gap-8 justify-center">
          <ArrowPathIcon class="h-8 w-8 text-muted hover:text-primary cursor-pointer" @click="refresh" />
          <PlusCircleIcon
            class="h-8 w-8 text-muted hover:text-accent cursor-pointer"
            @click="useRouter().push('/app/builder/new-flow')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
