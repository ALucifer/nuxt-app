<template>
  <div>
    <BannerTournaments :items="hightlighted" />
    <section class="tournaments-card">
      <div class="overlay pt-120 pb-120">
        <div class="container wow fadeInUp">
          <SearchFormTournament @search="searchFilter($event)" />
          <p>Nombre de résultat(s) : {{ itemsShow }}</p>
          <transition-group name="flip-list" tag="div" class="search__result">
            <TournamentCard
              v-for="item in filteredItems"
              :key="item.id"
              :item="item"
            />
          </transition-group>
          <AppInfiniteScroll
            @load="loadNextItems()"
            :done="isFullyLoaded"
            :key="'infiniteKey' + infiniteKey"
          />
          <div v-if="!filteredItems.length">
            <h4>Aucun résultat pour votre recherche</h4>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BannerTournaments from "@/components/BannerTournaments";
import TournamentCard from "@/components/TournamentCard";
import SearchFormTournament from "@/components/SearchFormTournament";
import { useTournamentStore } from "@/store/tournament";
import { mapState, mapActions } from "pinia";

export default defineNuxtComponent({
  head() {
    return {
      title: "Spots : Les tournois",
      description:
        "Spots est un site de gaming qui regroupe les utilisateurs qui souhaitent créer leur propre tournois gratuitement.",
    };
  },
  components: {
    BannerTournaments,
    TournamentCard,
    SearchFormTournament,
  },
  data() {
    return {
      infiniteKey: 0,
    };
  },
  async asyncData({ $pinia }) {
    const tournamentStore = useTournamentStore($pinia);
    await tournamentStore.fetchItems();
    await tournamentStore.fetchHightlighted();

    return {};
  },
  computed: {
    ...mapState(useTournamentStore, {
      tournaments: "items",
      hightlighted: "hightlighted",
      itemsShow: "itemsShow",
      filteredItems: "filteredItems",
      isFullyLoaded: "isFullyLoaded",
    }),
  },
  methods: {
    searchFilter(event) {
      this.infiniteKey++;
      this.setSearch({ form: event.form });
    },
    loadNextItems() {
      this.fetchNextItems();
    },
    ...mapActions(useTournamentStore, ["fetchNextItems", "setSearch"]),
  },
});
</script>

<style lang="scss">
@import "@/assets/css/pages/tournaments.scss";
.flip-list-move {
  transition: transform 1s ease;
}
</style>
