import { Action, Trigger } from '~~/types/Flow'

type createFlowInput = {
  name: string;
  description: string;
  enabled: boolean;
  public: boolean;
  trigger: Trigger;
  actions: Action[];
}

async function createWebhook(provider: string, flowName: string, where: string) {
  const response = await useAPI<ApiResponse>(`/${provider}/create-webhook`, 'POST', {
    name: 'Helpr - ' + flowName,
    where: where,
  })
  if (response.statusCode === 201) {
    return response.data
  }
  useErrorToast(response.message)
}

export async function addFlow(flowData: createFlowInput, where: string) {
  if (flowData.trigger.webhook) {
    await createWebhook(flowData.trigger.provider, flowData.name, where)
  }
  if (!flowData.trigger || flowData.actions.length === 0) {
    useErrorToast('Please select a trigger and at least one action')
    return
  }
  const response = await useAPI<ApiResponse>('/flow', 'POST', {
    name: flowData.name,
    description: flowData.description,
    enabled: flowData.enabled,
    public: flowData.public,
    triggerId: flowData.trigger.id,
    actions: flowData.actions,
  })
  if (response.statusCode === 201) {
    useSuccessToast('Flow created successfully')
    useRouter().push('/app/my-flows')
  } else {
    useErrorToast(response.message)
  }
}

export async function updateFlowStatus(flowId: number, status: boolean) {
  const response = await useAPI<ApiResponse>(`/flow/${flowId}/status`, 'PUT', {
    enabled: status,
  })
  if (response.statusCode === 200) {
    useSuccessToast('Flow status updated successfully')
  } else {
    useErrorToast(response.message)
  }
}

export async function updateFlowPublicStatus(flowId: number, status: boolean) {
  const response = await useAPI<ApiResponse>(`/flow/${flowId}/public`, 'PUT', {
    public: status,
  })
  if (response.statusCode === 200) {
    useSuccessToast('Flow public status updated successfully')
  } else {
    useErrorToast(response.message)
  }
}

export async function deleteFlow(flowId: number, refresh: () => void) {
  if (confirm('Are you sure you want to delete this flow?')) {
    const response = await useAPI<ApiResponse>(`/flow/${flowId}`, 'DELETE')
    if (response.statusCode === 200) {
      useSuccessToast('Flow deleted successfully')
      refresh()
    } else {
      useErrorToast(response.message)
    }
  }
}

export async function getUserFlows() {
  const response = await useAPI<ApiResponse>('/flow', 'GET')
  if (response.statusCode === 200) {
    return response.data
  }
  useErrorToast(response.message)
}

export async function getUserFlowsById(userId: number) {
  const response = await useAPI<ApiResponse>(`/flow/user/${userId}`, 'GET')
  if (response.statusCode === 200) {
    return response.data
  }
  useErrorToast(response.message)
}
