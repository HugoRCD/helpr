import { defineStore } from "pinia";
import { User } from "~/types/User";

interface UserState {
  accessToken: string;
  user: User | null;
}

const defaultUserState: UserState = {
  accessToken: "",
  user: null,
};

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      accessToken: "",
      user: null,
    };
  },
  getters: {
    isAdmin(): boolean {
      if (this.user) {
        return this.user.role === 2;
      } else {
        return false;
      }
    },
    getAccessToken(): string {
      return this.accessToken;
    },
    getUser(): User | null {
      return this.user;
    },
  },
  actions: {
    setVerified() {
      if (this.user) {
        this.user.isVerified = true;
      }
    },
    setUser(user: User) {
      this.user = user;
    },
    logout() {
      this.$state = defaultUserState;
    },
    async updateUser(toast = true, confirmation = true) {
      if (!this.user) return;
      const { data: updatedUser, error } = await useFetch<User>(`/api/user/${this.user.id}`, {
        method: "PUT",
        body: this.user,
      });
      if (error.value?.statusMessage === "username_or_email_already_exists") {
        useErrorToast("Username already exists");
        return;
      }
      this.user = updatedUser.value;
      if (toast) {
        useSuccessToast("Profile updated");
      }
    },
  },
});
