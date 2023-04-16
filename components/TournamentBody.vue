<template>
  <section class="tournaments-content">
    <div class="tab-content" id="myTabContent">
      <Overview />
      <Bracket v-if="tournament.image_bracket" />
      <Players v-if="isOwner()" />
      <Matches v-if="userHasMatches()" />
      <Suivi v-if="isOwner() && hasMatches()" />
    </div>
  </section>
</template>

<script setup lang="ts">
import Overview from "@/components/tournament/Overview";
import Bracket from "@/components/tournament/Bracket";
import Players from "@/components/tournament/Players";
import Matches from "@/components/tournament/Matches";
import Suivi from "@/components/tournament/Suivi";
import useTournamentHeader from "~~/composables/useTournamentHeader";

const tournament = inject("tournament");

const { isOwner, userHasMatches, hasMatches } =
    useTournamentHeader(tournament)
</script>

<style lang="scss">
.tournaments-content {
  padding-top: 60px;
}
</style>
