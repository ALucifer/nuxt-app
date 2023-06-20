<template>
  <div>
    <BannerTournaments v-if="componentAVisible"/>
    <pre>{{ data }}</pre>
    <section class="tournaments-card" v-if="componentBVisible">
          <div class="overlay pt-120 pb-120">
            <div class="container wow fadeInUp">
              <SearchFormTournament @search="searchFilter($event)" />
              <p>Nombre de résultat(s) : {{ tournamentStore.itemsShow }}</p>
              <transition-group name="flip-list" tag="div" class="search__result">
                <tournamentCard
                  v-for="item in tournamentStore.filteredItems"
                  :key="item.id"
                  :item="item"
                />
              </transition-group>
              <AppInfiniteScroll
                  v-if="loaded"
                @load="tournamentStore.fetchNextItems()"
                :done="tournamentStore.isFullyLoaded"
                :key="'infiniteKey' + infiniteKey"
              />
              <div v-if="!tournamentStore.filteredItems.length">
                <h4>Aucun résultat pour votre recherche</h4>
              </div>
            </div>
          </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import TournamentCard from "@/components/TournamentCard"
import SearchFormTournament from "@/components/SearchFormTournament";
import { useTournamentStore } from "~/store/tournament";
import BannerTournaments from "~/components/BannerTournaments.vue";

const tournamentStore = useTournamentStore()
const loaded = ref(false)
const componentAVisible = ref(false)
const componentBVisible = ref(false)

const { data } = await useFetch('/api/hello')

tournamentStore.fetchHightlighted().then(() => {
  componentAVisible.value = true
  tournamentStore.fetchItems().then( () => {
    componentBVisible.value = true
    loaded.value = true
  })
})

useHead({
    title: "Spots : Les tournois",
    description:
        "Spots est un site de gaming qui regroupe les utilisateurs qui souhaitent créer leur propre tournois gratuitement.",
})

const infiniteKey = ref(0)

function searchFilter(event: any) {
    infiniteKey.value++;
    tournamentStore.setSearch({ form: event.form })
}
</script>

<style lang="scss">
@import "@/assets/css/pages/tournaments.scss";
.flip-list-move {
  transition: transform 1s ease;
}
</style>
