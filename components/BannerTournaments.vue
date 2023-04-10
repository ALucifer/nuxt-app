<template>
  <AppBanner>
    <template v-slot:content>
      <Carousel v-show="highlighted.length > 0" :items="highlighted" />
    </template>
  </AppBanner>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { useTournamentStore } from "~/store/tournament";
import Carousel from "~/components/Carousel.vue";

export default {
  components: {
    Carousel,
  },
  computed: {
    ...mapState(useTournamentStore, ["highlighted"])
  }
};
</script>

<style></style>
