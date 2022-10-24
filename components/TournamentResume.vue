<template>
  <TournamentHeader />
  <TournamentBody />
</template>

<script>
import TournamentHeader from "@/components/TournamentHeader";
import TournamentBody from "@/components/TournamentBody";

export default {
  components: { TournamentHeader, TournamentBody },
};
</script>

<style lang="scss">
@import "@/assets/css/components/tournamentResume.scss";
</style>
