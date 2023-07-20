import { User } from "~~/types/User";
import { useUserStore } from "~~/store/userStore";

export async function useUser(): Promise<User | null> {
  const authCookie = useCookie("authToken").value;
  const user = useUserStore().getUser;

  if (authCookie && !user) {
    const cookieHeaders = useRequestHeaders(["cookie"]);
    const { data } = await useFetch<User>("/api/auth/currentUser", {
      method: "GET",
      headers: cookieHeaders as HeadersInit,
    });
    if (!data.value) {
      return null;
    }
    useUserStore().setUser(data.value);
  }
  return user;
}

export async function useLogout(): Promise<void> {
  const userStore = useUserStore();
  const toastStore = useToastStore();
  await useFetch("/api/auth/logout", {
    method: "POST",
  });
  toastStore.showSuccessToast("profile.logout");
  userStore.logout();
  await useRouter().push("/auth/login");
}
