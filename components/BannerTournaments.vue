<template>
  <AppBanner v-if="!error">
    <template v-slot:content>
      <Carousel :items="data" />
    </template>
  </AppBanner>
</template>

<script setup lang="ts">
import Carousel from "~/components/Carousel.vue";

const { data, error } = await useAsyncData('tournament-highlighted', () => $fetch('/api/tournaments/highlighted'))
</script>
