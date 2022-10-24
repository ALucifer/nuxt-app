<template>
  <AppHeader />
  <div class="main">
    <NuxtPage :key="`${$route.path}`" />
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
