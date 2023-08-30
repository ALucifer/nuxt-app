<template>
  <AppBanner>
    <template v-slot:content>
      <Carousel :items="data" />
    </template>
  </AppBanner>
</template>

<script setup lang="ts">
import Carousel from "~/components/Carousel.vue";

const { data, error } = await useFetch('/api/tournaments/highlighted')
</script>

<style></style>
