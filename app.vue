<template>
  <AppHeader />
  <div class="main">
    <NuxtLayout>
      <div>
        <NuxtPage :key="`${$route.path}`" />
        <AppSidebar />
      </div>
    </NuxtLayout>
  </div>
  <AppNotifications />
  <AppFooter />
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { mapActions } from "pinia";

export default {
  methods: {
    ...mapActions(useAuthStore, ["fetchUser"]),
  },
  async mounted() {
    await this.fetchUser();
  },
};
</script>

<style lang="scss">
@import "@/assets/css/common.scss";
</style>
