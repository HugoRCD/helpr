import type { FetchContext, FetchResponse } from 'ofetch'
import type { User } from '~~/types/User'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiResponse = {
  statusCode: number;
  message: string;
  data: any;
};

export async function useAPI<T>(url: string, method: RequestMethod, body?: object | User | null): Promise<T> {
  const config = useRuntimeConfig()
  const fullURL = `${config.public.apiUrl}${url}`
  const user = useUserStore().getUser
  try {
    return (await $fetch<T>(fullURL, {
      method,
      body,
      headers: {
        authorization: `Bearer ${user?.authToken || ''}`,
      },
      credentials: 'include',
    })) as T
  } catch (error) {
    const context = error as FetchContext & { response: FetchResponse<T> }
    if (context.response.status === 401) {
      try {
        const refreshedUser = await useAPI<User>('/auth/refresh', 'POST')
        useUserStore().setUser(refreshedUser as User)
        return useAPI<T>(url, method, body)
      } catch (error) {
        useUserStore().logout()
        useRouter().push('/')
      }
    }
    throw error
  }
}
