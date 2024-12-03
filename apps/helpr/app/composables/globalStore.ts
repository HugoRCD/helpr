import { defineStore } from 'pinia'

type GlobalState = {
  loading: boolean;
  theme: string;
  locale: string;
};

export const useGlobalStore = defineStore({
  id: 'global',
  state: (): GlobalState => ({
    loading: false,
    theme: 'cosmos',
    locale: 'en',
  }),
  getters: {
    isLoading(): boolean {
      return this.loading
    },
    getTheme(): string {
      return this.theme
    },
    getLocale(): string {
      return this.locale
    },
  },
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },
    setTheme(theme: string) {
      this.theme = theme
    },
    setLocale(locale: string) {
      this.locale = locale
    },
  },
})
