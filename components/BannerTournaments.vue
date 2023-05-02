<template>
  <AppBanner>
    <template v-slot:content>
      <Carousel :items="highlighted" />
    </template>
  </AppBanner>
</template>

<script setup lang="ts">
import { useTournamentStore } from "~/store/tournament";
import Carousel from "~/components/Carousel.vue";

const tournamentStore = useTournamentStore()
const highlighted = computed(() => tournamentStore.highlighted)
</script>

<style></style>
