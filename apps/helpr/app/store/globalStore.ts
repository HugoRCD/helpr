import { defineStore } from 'pinia'

type GlobalState = {
  loading: boolean;
};

export const useGlobalStore = defineStore({
  id: 'global',
  state: (): GlobalState => ({
    loading: false,
  }),
  getters: {
    isLoading(): boolean {
      return this.loading
    },
  },
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },
  },
})
