<template>
  <div>
    <BannerTournaments/>
    <section class="tournaments-card">
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
            v-show="!pending"
            @load="tournamentStore.fetchNextItems()"
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

definePageMeta({
  auth: false
})

useHead({
  title: "Spots : Les tournois",
  description:
      "Spots est un site de gaming qui regroupe les utilisateurs qui souhaitent créer leur propre tournois gratuitement.",
})

const tournamentStore = useTournamentStore()

const { data, pending } = await useFetch('/api/tournaments/list', { key: 'test' })

const infiniteKey = ref(0)

function searchFilter(event: any) {
    infiniteKey.value++;
    tournamentStore.sendSearch({ form: event.form })
}
</script>

<style lang="scss">
@import "@/assets/css/pages/tournaments.scss";
.flip-list-move {
  transition: transform 1s ease;
}
</style>
