<template>
  <AppBanner>
    <template v-slot:content>
      <Carousel :items="data" />
    </template>
  </AppBanner>
</template>

<script setup lang="ts">
import Carousel from "~/components/Carousel.vue";
import { useTournamentStore } from "~/store/tournament";

const store = useTournamentStore()
const { data, error } = await useAsyncData('highlighted', async () => await store.fetchHightlighted())
</script>

<style></style>
