<template>
  <div>
    <UserStatistiques />
  </div>
</template>

<script>
import Trophy from "@/components/profile/Trophy";
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    UserStatistiques: defineAsyncComponent(() => {
      import('@/components/UserStatistiques.vue')
    }),
    Trophy },
};
</script>

<style></style>
