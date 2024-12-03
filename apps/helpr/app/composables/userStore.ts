import { defineStore } from 'pinia'
import type { User } from '~~/types/User'
import type { Subscription } from '~~/types/Subscription'

type UserState = {
  accessToken: string;
  user: User | null;
}

const defaultUserState: UserState = {
  accessToken: '',
  user: null,
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      accessToken: '',
      user: null,
    }
  },
  getters: {
    isAdmin(): boolean {
      if (this.user) {
        return this.user.role === 2
      }
      return false
    },
    getAccessToken(): string {
      return this.accessToken
    },
    getUser(): User | null {
      return this.user
    },
    getSubscription(): Subscription[] | null {
      return this.subscription
    },
  },
  actions: {
    setVerified() {
      if (this.user) {
        this.user.isVerified = true
      }
    },
    setUser(user: User) {
      this.user = user
    },
    setSubscription(subscription: Subscription[]) {
      this.subscription = subscription
    },
    logout() {
      this.$state = defaultUserState
    },
  },
})
