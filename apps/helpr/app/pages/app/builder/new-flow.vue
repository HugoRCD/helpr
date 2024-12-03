<script setup lang="ts">
import { PlusIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import type { flowBuilderData } from '~~/types/Flow'

definePageMeta({
  name: 'New Flow',
  title: 'New Flow',
})

const { data: providers, pending } = await useLazyAsyncData<flowBuilderData>(async () => {
  return await getUserProviders()
})
if (!providers) {
  throw new Error('No providers found')
}
const flowStore = useFlowStore()

const flow = computed(() => flowStore.getFlow)

async function createFlow() {
  await addFlow(flow.value, flow.value.where)
}

useHead({
  title: flow.value.name,
})
</script>

<template>
  <div>
    <div>
      <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
        <div class="flex items-center gap-4 justify-between">
          <div>
            <input
              v-model="flow.name"
              class="bg-transparent border-none w-full text-3xl font-bold text-primary focus:outline-none"
              @input="flow.name = $event.target.value"
            >
            <p class="mt-1 text-sm text-muted">
              {{ $t("builder.change_name") }}
            </p>
            <div class="group flex items-center gap-2 mt-4 cursor-pointer" @click="flowStore.reset">
              <ArrowPathIcon class="h-5 w-5 text-muted group-hover:animate-spin" aria-hidden="true" />
              <span class="text-sm text-muted">
                {{ $t("builder.reset_flow") }}
              </span>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <label class="text-sm text-muted">
                {{ $t("builder.enable") }}
              </label>
              <Switch :model-value="flow.enabled" @update:value="flow.enabled = $event" />
            </div>
            <div class="flex items-center gap-2">
              <label class="text-sm text-muted">
                {{ $t("builder.public") }}
              </label>
              <Switch :model-value="flow.public" @update:value="flow.public = $event" />
            </div>
          </div>
        </div>
        <textarea
          v-model="flow.description"
          class="bg-transparent mt-6 border-none w-full text-sm text-muted focus:outline-none mt-4"
          :placeholder="$t('builder.add_description')"
          @input="flow.description = $event.target.value"
        />
      </div>
      <FlowLoader v-if="pending" :nb-items="4" />
      <div v-else class="flex flex-col gap-4 mt-4">
        <BuilderTriggerStep :providers />
        <BuilderVariablesSelector :flow />
        <div class="flex flex-col gap-4 mt-4" @dragover.prevent @dragenter.prevent @drop="onDrop">
          <BuilderActionStep
            v-for="action in flow.actions"
            :key="action.index"
            :action
            :index="action.index"
            :providers
            class="drag-el"
            draggable="false"
            @dragstart="startDrag($event, action.index)"
            @dragend="endDrag"
            @dragenter="onDragEnter($event, action.index)"
            @dragover="onDragOver"
          />
        </div>
        <div class="relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-muted" />
          </div>
          <div class="relative flex justify-center">
            <button
              type="button"
              class="inline-flex items-center rounded-full border border-muted bg-secondary px-4 py-1.5 text-sm font-medium leading-5 text-muted"
              @click="flowStore.addAction"
            >
              <PlusIcon class="-ml-1.5 mr-1 h-5 w-5 text-muted" aria-hidden="true" />
              <span>
                {{ $t("builder.add_action") }}
              </span>
            </button>
          </div>
        </div>
        <button class="btn-primary w-full" @click="createFlow">
          {{ $t("builder.create_flow") }}
        </button>
        <BuilderDebug
          :flow-actions="flow.actions"
          :flow-trigger="flow.trigger"
          :flow-enabled="flow.enabled"
          :flow-public="flow.public"
          :flow-name="flow.name"
          :flow-description="flow.description"
        />
      </div>
    </div>
  </div>
</template>
