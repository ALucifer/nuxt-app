<template>
  <div
    class="container"
    style="margin-top: 150px; margin-bottom: 150px; color: red"
  >
    <div class="row justify-content-center">
      Mon futur container du profile d'un autre user {{ $route.params.id }}
      {{ user }}
    </div>
  </div>
</template>

<script>
import { useUserStore } from "~/store/user";

definePageMeta({
  // middleware: "auth",
});

export default {
  name: "ExternalUserProfile",
  data() {
    return {
      user: null,
    };
  },
  async fetch({ $pinia }) {
    const route = useRoute();
    const userStore = useUserStore($pinia);

    this.user = await userStore.fetchUserById(+route.params.id);
  },
};
</script>

<style></style>
