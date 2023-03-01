import { useAuthStore } from "@/store/auth";
import { mapActions } from "pinia";
import useSidebar from "~~/composables/useSidebar";

export default {
  methods: {
    ...mapActions(useAuthStore, { authStoreLogout: "logout" }),
    auth_logout() {
      const { close } = useSidebar();
      this.authStoreLogout();
      this.$router.push({ name: "index" });
      close();
    },
  },
};
