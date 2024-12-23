import { useAuthStore } from "@/stores/authStore";

export default function ({ redirect }) {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return redirect("/login");
  }
}
