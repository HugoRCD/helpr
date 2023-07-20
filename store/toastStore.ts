import { defineStore } from "pinia";

type toastState = {
  show: boolean;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
};

export const useToastStore = defineStore({
  id: "toast",
  state: (): toastState => ({
    show: false,
    title: "",
    message: "",
    type: "success",
  }),
  getters: {
    getShow(): boolean {
      return this.show;
    },
    getTitle(): string {
      return this.title;
    },
    getMessage(): string {
      return this.message;
    },
    getType(): "success" | "error" | "warning" | "info" {
      return this.type;
    },
  },
  actions: {
    showSuccessToast(title = "success", message?: string) {
      this.show = true;
      this.message = message || "";
      this.title = title;
      this.type = "success";
    },
    showErrorToast(title = "error", message?: string) {
      this.show = true;
      this.message = message || "";
      this.title = title;
      this.type = "error";
    },
    closeToast() {
      this.show = false;
    },
  },
});
