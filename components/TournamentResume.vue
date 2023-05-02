<template>
  <div>
    <TournamentHeader />
    <TournamentBody />
  </div>
</template>

<script setup lang="ts">
import TournamentHeader from "@/components/TournamentHeader";
import TournamentBody from "~/components/TournamentBody.vue";
</script>

<style lang="scss">
@import "@/assets/css/components/tournamentResume.scss";
</style>
