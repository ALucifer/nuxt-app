<template>
  <section class="tournaments-content">
    <div class="tab-content" id="myTabContent">
      <Overview />
      <Bracket />
      <Players />
      <Matches />
      <Suivi />
    </div>
  </section>
</template>

<script>
import Overview from "@/components/tournament/Overview";
import Bracket from "@/components/tournament/Bracket";
import Players from "@/components/tournament/Players";
import Matches from "@/components/tournament/Matches";
import Suivi from "@/components/tournament/Suivi";

export default {
  components: { Overview, Bracket, Players, Matches, Suivi },
};
</script>

<style lang="scss">
.tournaments-content {
  padding-top: 60px;
}
</style>
