<template>
  <section id="all-trophies" class="pb-120">
    <div class="container">
      <h3 v-if="user.tournaments.length > 0">Mes tournois</h3>
      <h3 v-else>Vous n'avez actuellement aucun tournois</h3>
      <TournamentCard
        v-for="item in user.tournaments"
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
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
