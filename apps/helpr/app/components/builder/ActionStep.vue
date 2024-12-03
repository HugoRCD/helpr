<script setup lang="ts">
import { TrashIcon, CheckBadgeIcon } from '@heroicons/vue/24/outline'
import { SparklesIcon, LanguageIcon, ArrowRightIcon } from '@heroicons/vue/24/solid'

const { t } = useI18n()

const props = defineProps({
  providers: {
    type: Array,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  action: {
    type: Object,
    required: true,
  },
})
const flowStore = useFlowStore()
const userStore = useUserStore()

const { isPremium } = userStore

const flow = flowStore.getFlow

const selectedProvider = ref(
  flow.actions?.find((action) => action.index === props.index)?.endpoint
    ? props.providers.find(
      (provider) =>
        provider.name.toLowerCase() === flow.actions.find((action) => action.index === props.index)?.endpoint,
    )
    : ref(),
)

const filteredProviders = computed(() => {
  return props.providers.filter((provider) => provider._count.actions > 0)
})

const selectedAction = ref(flow.actions.find((action) => action.index === props.index)) || ref()
const payload = ref(selectedAction.value?.payload) || ref({})

function saveAction() {
  if (selectedAction.value?.name !== 'empty') {
    selectedAction.value.payload = payload.value
    flowStore.saveAction(props.index, selectedAction.value)
    useSuccessToast(t('builder.action_saved'))
  } else {
    useErrorToast(t('builder.need_action'))
  }
}

type VariablesValues = {
  [key: string]: any;
};

const variablesValues = ref<VariablesValues>({})
const variable_loading = ref(false)

function removeAction() {
  flowStore.deleteAction(props.index)
  variablesValues.value = {}
}

async function getProviderDataForAction(provider: string) {
  try {
    variable_loading.value = true
    const { data } = await useAPI(`/${provider}/data`, 'POST', {
      variables: payload.value,
    })
    variablesValues.value = data
    variable_loading.value = false
  } catch (error) {
    useErrorToast('Error while fetching data from provider')
    variable_loading.value = false
  }
}

const loading_ai = ref(false)
const loading_translate = ref(false)
const to_language = ref('en-US')
const from_language = ref('en-US')
const action_loading = ref(false)

const locales = [
  {
    value: 'en-US',
    name: '🇺🇸 English',
  },
  {
    value: 'FR',
    name: '🇫🇷 French',
  },
  {
    value: 'ES',
    name: '🇪🇸 Spanish',
  },
  {
    value: 'IT',
    name: '🇮🇹 Italian',
  },
  {
    value: 'DE',
    name: '🇩🇪 German',
  },
  {
    value: 'CH',
    name: '🇨🇭 Chinese',
  },
  {
    value: 'JP',
    name: '🇯🇵 Japanese',
  },
]

async function enhanceByAI(key: string, value: string) {
  try {
    loading_ai.value = true
    const { data } = await useAPI('/openai/enhance', 'POST', {
      text: value,
    })
    const { openai_response } = data
    if (openai_response) {
      payload.value[key] = openai_response
    }
    loading_ai.value = false
  } catch (error) {
    useErrorToast(t('builder.enhance_error'))
    loading_ai.value = false
  }
}

async function translateText(key: string, text: string) {
  try {
    const { data } = await useAPI('/deepl', 'POST', {
      text,
      from: from_language.value,
      to: to_language.value,
    })
    const { deepl_response } = data
    if (deepl_response) {
      payload.value[key] = deepl_response
    }
  } catch (error) {
    useErrorToast(t('builder.translate_error'))
  }
}

async function testAction() {
  if (selectedAction.value?.name !== 'empty') {
    action_loading.value = true
    const variables = payload.value
    const { data } = await useAPI(
      `/${selectedProvider.value.name.toLowerCase()}/${selectedAction.value.name.toLowerCase()}`,
      'POST',
      {
        ...variables,
      },
    )
    if (data) {
      useSuccessToast(t('builder.test_success'))
      action_loading.value = false
    } else {
      useErrorToast(t('builder.test_error'))
      action_loading.value = false
    }
  }
}
</script>

<template>
  <form class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6" @submit.prevent="saveAction">
    <div class="flex flex-row justify-between">
      <div>
        <h3 class="text-lg leading-6 font-medium text-primary">
          {{ action.title || $t("builder.select_action") }}
        </h3>
        <h4 class="text-sm text-muted">
          {{ action.description || "" }}
        </h4>
      </div>
      <TrashIcon class="h-6 w-6 text-muted cursor-pointer hover:text-red-600" @click="removeAction" />
    </div>
    <div class="flex flex-wrap gap-4 mt-4">
      <Dropdown
        v-model="selectedProvider"
        :placeholder="'Linear, Github, etc...'"
        :items="filteredProviders"
        :label="$t('builder.select_provider')"
        :is-logo="true"
      />
      <Dropdown
        v-if="selectedProvider"
        v-model="selectedAction"
        :items="selectedProvider.actions"
        :placeholder="'Create a new issue, etc...'"
        :label="$t('builder.select_action')"
        :is-logo="false"
      />
      <div v-if="selectedAction" id="createPayload" class="flex flex-col gap-4 w-full">
        <div v-for="(field, key) in selectedAction.variables" :key class="flex flex-col gap-2">
          <div class="flex flex-row gap-2">
            <label class="text-primary">{{ field.title }}</label>
            <span v-if="field.required" class="text-red-600">*</span>
          </div>
          <div v-if="variablesValues && Object.keys(variablesValues).length > 0">
            <div v-if="field.type === 'textarea'">
              <textarea
                v-model="payload[field.key]"
                type="text"
                rows="3"
                class="w-full rounded-md border border-muted bg-primary py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm"
                :required="field.required"
              />
              <div v-if="isPremium" class="flex flex-col gap-6 md:items-center md:flex-row">
                <button
                  type="button"
                  class="flex flex-row gap-2 mt-2 cursor-pointer group items-center"
                  :disabled="!(payload[field.key] !== undefined && payload[field.key] !== '')"
                  :class="{
                    'opacity-50 cursor-not-allowed': !(payload[field.key] !== undefined && payload[field.key] !== ''),
                  }"
                  @click="enhanceByAI(field.key, payload[field.key])"
                >
                  <SparklesIcon class="h-5 w-5 text-muted cursor-pointer group-item group-hover:text-blue-600" />
                  <span class="group-item text-muted text-sm">
                    {{ $t("builder.enhance_by_ia") }}
                  </span>
                  <Loader v-if="loading_ai" name="line-md:loading-twotone-loop" size="1em" />
                </button>
                <div class="flex flex-col gap-2 mt-2 md:items-center md:flex-row">
                  <button
                    type="button"
                    class="flex flex-row gap-2 cursor-pointer group items-center"
                    :disabled="!(payload[field.key] !== undefined && payload[field.key] !== '')"
                    :class="{
                      'opacity-50 cursor-not-allowed': !(payload[field.key] !== undefined && payload[field.key] !== ''),
                    }"
                    @click="translateText(field.key, payload[field.key])"
                  >
                    <LanguageIcon class="h-5 w-5 text-muted cursor-pointer group-item group-hover:text-blue-600" />
                    <span class="group-item text-muted text-sm">
                      {{ $t("builder.translate") }}
                    </span>
                    <Loader v-if="loading_translate" name="line-md:loading-twotone-loop" size="1em" />
                  </button>
                  <div class="flex flex-row gap-2 items-center">
                    <select
                      v-model="from_language"
                      class="rounded-md border border-muted bg-primary py-1 px-2 shadow-sm focus:outline-none sm:text-sm"
                    >
                      <option v-for="locale in locales" :key="locale.value" :value="locale.value">
                        {{ locale.name }}
                      </option>
                    </select>
                    <ArrowRightIcon class="h-5 w-5 text-muted" />
                    <select
                      v-model="to_language"
                      class="rounded-md border border-muted bg-primary py-1 px-2 shadow-sm focus:outline-none sm:text-sm"
                    >
                      <option v-for="locale in locales" :key="locale.value" :value="locale.value">
                        {{ locale.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <Switch v-else-if="field.type === 'boolean'" v-model="payload[field.key]" :required="field.required" />
            <select
              v-else-if="field.type === 'select'"
              v-model="payload[field.key]"
              class="w-full rounded-md border border-muted bg-primary py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm"
              :required="field.required"
            >
              <option v-for="data in variablesValues[field.key]" :key="data.value" :value="data.value">
                {{ data.name }}
              </option>
            </select>
            <input
              v-else
              v-model="payload[field.key]"
              :type="field.type"
              class="w-full rounded-md border border-muted bg-primary py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm"
              :required="field.required"
            >
          </div>
          <div v-else>
            <textarea
              v-model="payload[field.key]"
              type="text"
              rows="2"
              class="w-full rounded-md border border-muted bg-primary py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm"
              :required="field.required"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-4 flex-col md:flex-row">
      <div class="flex flex-row gap-2 items-center">
        <button class="btn-secondary" type="submit">
          {{ $t("builder.save_action") }}
        </button>
        <button
          class="btn-secondary flex flex-row gap-2 items-center"
          type="button"
          :disabled="!selectedProvider"
          :class="{ 'cursor-not-allowed': !selectedProvider }"
          @click="getProviderDataForAction(selectedProvider.name)"
        >
          <span>{{ $t("builder.get_data_action") }}</span>
          <Loader v-if="variable_loading" name="line-md:loading-twotone-loop" size="1em" class="text-primary" />
        </button>
        <div v-if="variablesValues && Object.keys(variablesValues).length > 0" class="flex flex-row gap-2 items-center">
          <CheckBadgeIcon class="h-6 w-6 text-muted text-green-600" />
          <span class="text-sm text-muted">
            {{ $t("builder.data_fetched") }}
          </span>
        </div>
      </div>
      <button class="btn-secondary mt-4 md:mt-0" type="button" @click="testAction">
        <span>{{ $t("builder.test_action") }}</span>
        <Loader v-if="action_loading" name="line-md:loading-twotone-loop" size="1em" class="text-primary" />
      </button>
    </div>
  </form>
</template>
