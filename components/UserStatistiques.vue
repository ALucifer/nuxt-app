<template>
  <section v-if="tournaments.length > 0" id="all-trophies" class="pb-120">
    <div class="container">
      <h3>Mes tournois</h3>
      <TournamentCard
        v-for="item in tournaments"
        :item="item"
        :key="item.id"
      />
    </div>
  </section>
</template>

<script>
import TournamentCard from "@/components/TournamentCard";

export default {
  components: { TournamentCard },
  data() {
    return {
      tournaments: []
    }
  },
  async mounted() {

  }
};
</script>

<style></style>
