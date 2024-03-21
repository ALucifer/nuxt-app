<template>
  <AppBanner v-if="!error">
    <template v-slot:content>
      <Carousel :items="data" />
    </template>
  </AppBanner>
</template>

<script setup lang="ts">
import Carousel from "~/components/Carousel.vue";
import type {TournamentModel} from "~/app/models/tournament";

const { data, error } = await useAsyncData<TournamentModel[]>('tournament-highlighted', () => $fetch('/api/tournaments/highlighted'))
</script>
