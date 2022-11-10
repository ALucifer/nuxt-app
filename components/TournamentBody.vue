<template>
  <section class="tournaments-content">
    <div class="tab-content" id="myTabContent">
      <Overview />
      <Bracket v-if="tournament.image_bracket" />
      <Players v-if="isOwner()" />
      <Matches v-if="userHasMatches()" />
      <Suivi v-if="isOwner()" />
    </div>
  </section>
</template>

<script>
import Overview from "@/components/tournament/Overview";
import Bracket from "@/components/tournament/Bracket";
import Players from "@/components/tournament/Players";
import Matches from "@/components/tournament/Matches";
import Suivi from "@/components/tournament/Suivi";
import useTournamentHeader from "~~/composables/useTournamentHeader";

export default {
  components: { Overview, Bracket, Players, Matches, Suivi },
  setup() {
    const tournament = inject("tournament");

    const { isOwner, userHasMatches } = useTournamentHeader(tournament);

    return { tournament, isOwner, userHasMatches };
  },
};
</script>

<style lang="scss">
.tournaments-content {
  padding-top: 60px;
}
</style>
