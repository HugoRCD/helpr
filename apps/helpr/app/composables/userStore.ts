import { defineStore } from 'pinia'
import type { Subscription } from '@prisma/client'
import type { User } from '~~/types/User'

type UserState = {
  accessToken: string;
  user: User | null;
  subscription: Subscription[] | null;
}

const defaultUserState: UserState = {
  accessToken: '',
  user: null,
  subscription: null,
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      accessToken: '',
      user: null,
      subscription: null,
    }
  },
  getters: {
    isAdmin(): boolean {
      if (this.user) {
        return this.user.role === 2
      }
      return false
    },
    isPremium(): boolean {
      if (this.subscription) {
        return this.subscription[0] && this.subscription[0].name === 'Premium'
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
