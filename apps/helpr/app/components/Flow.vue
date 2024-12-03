<script setup lang="ts">
import { TrashIcon, GlobeAltIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
import { updateFlowPublicStatus } from '~/composables/useFlow'

const props = defineProps({
  flow: {
    type: Object,
    required: true,
  },
  refresh: {
    type: Function,
    required: false,
  },
  isMine: {
    type: Boolean,
    default: false,
  },
})

const enable = ref(props.flow.enabled)
const publicStatus = ref(props.flow.public)

const flowStore = useFlowStore()

function goToFlow() {
  console.log(props.flow)
  flowStore.loadFlow(props.flow)
  useRouter().push('/app/builder/new-flow')
}

async function changeStatus() {
  await updateFlowStatus(props.flow.id, enable.value)
}

async function changePublic() {
  publicStatus.value = !publicStatus.value
  await updateFlowPublicStatus(props.flow.id, publicStatus.value)
}

watch(enable, changeStatus)
</script>

<template>
  <div class="bg-secondary shadow rounded-lg">
    <div>
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <h3 class="text-lg font-medium leading-6 text-primary cursor-pointer hover:underline" @click="goToFlow">
              {{ flow.name }}
            </h3>
            <GlobeAltIcon
              v-if="publicStatus && isMine"
              class="h-5 w-5 text-muted mt-1 hover:text-accent cursor-pointer transition-colors duration-300 ease-in-out"
              aria-hidden="true"
              @click="changePublic"
            />
            <LockClosedIcon
              v-else-if="!publicStatus && isMine"
              class="h-5 w-5 text-muted mt-1 hover:text-accent cursor-pointer transition-colors duration-300 ease-in-out"
              aria-hidden="true"
              @click="changePublic"
            />
          </div>
          <Switch v-if="isMine" :model-value="flow.enabled" @update:value="enable = $event" />
        </div>
        <div class="mt-2 max-w-xl text-sm text-muted">
          <p>{{ flow.description }}</p>
        </div>
        <div class="mt-6 flex items-center justify-between">
          <div class="flex gap-4">
            <ProviderLogo
              v-for="provider in flow.providers"
              :key="provider.id"
              :provider="provider.name.toLowerCase()"
              class="h-6 w-6 rounded-full"
              :alt="provider.name"
            />
          </div>
          <div>
            <TrashIcon
              v-if="isMine"
              class="h-5 w-5 text-muted hover:text-red-500 cursor-pointer"
              @click="deleteFlow(flow.id, refresh)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
