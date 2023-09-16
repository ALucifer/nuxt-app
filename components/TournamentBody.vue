<template>
  <section class="tournaments-content">
    <div class="tab-content" id="myTabContent">
      <Overview />
      <Bracket v-if="tournament.image_bracket" :tournament="tournament" />
      <Players v-if="isLogged() && isOwner(tournament)" :tournament="tournament" />
      <Matches v-if="matches?.length > 0" :matches="matches" />
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
import {useTournamentStore} from "~/store/tournament";
import {useMatchStore} from "~/store/match";

const { currentTournament } = useTournamentStore()
const { isOwner, hasMatches } =
    useTournamentHeader()

const { isLogged } = useSecurity()
const { items: matches } = useMatchStore()
const tournament = computed(() => currentTournament)
</script>

<style lang="scss">
.tournaments-content {
  padding-top: 60px;
}
</style>
