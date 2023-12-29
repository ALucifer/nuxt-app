<template>
  <div>
    <TournamentHeader />
    <TournamentBody />
  </div>
</template>

<script setup lang="ts">
import TournamentHeader from "~/components/tournament/TournamentHeader.vue";
import TournamentBody from "~/components/tournament/TournamentBody.vue";
</script>

<style lang="scss" scoped>
@import "assets/css/components/tournamentResume";
</style>
