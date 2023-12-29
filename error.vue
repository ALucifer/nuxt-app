<template>
  <AppHeader />
  <div class="main">
    <Error />
  </div>
</template>

<script setup lang="ts">
import Error from "@/components/Error.vue";

useSeoMeta({
  titleTemplate: 'Erreur 404',
})
</script>
