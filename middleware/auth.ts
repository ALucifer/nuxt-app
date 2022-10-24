import { useAuthStore } from "~~/store/auth";
export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        const authStore = useAuthStore()
        if (!localStorage.getItem('token') && !authStore.isAuthenticated) {
            return { name: "login", query: { redirectTo: to.path } }
        }
	}
});