<template>
  <div class="pt-4">
    <div v-if="tournamentStore.total !== 0 || searched">
      <div class="container">
        <CarouselElement :items="data" />
      </div>
      <section class="tournaments-card">
        <div class="overlay pt-120 pb-120">
          <div class="container wow fadeInUp">
            <client-only>
              <SearchFormTournament v-model="searching" @search="searchFilter($event)" />
              <p class="text-white">Nombre de résultat(s) : {{ tournamentStore.total }}</p>
              <transition-group name="flip-list" tag="div" class="search__result">
                <TournamentCard
                  v-for="item in tournamentStore.filteredItems"
                  :key="item.id"
                  :item="item"
                />
              </transition-group>
              <AppInfiniteScroll
                  v-show="!pending"
                  :key="'infiniteKey' + infiniteKey"
                  :done="tournamentStore.items.length === tournamentStore.total"
                  @load="tournamentStore.fetchNextItems()"
              />
              <div v-if="!tournamentStore.filteredItems.length">
                <h4>Aucun résultat pour votre recherche</h4>
              </div>
            </client-only>
          </div>
        </div>
      </section>
    </div>
    <div v-else class="container">
      <div class="empty-slide__container">
        <h3>Aucun tournois pour le moment ...</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TournamentCard from "@/components/TournamentCard"
import SearchFormTournament from "@/components/SearchFormTournament";
import { useTournamentStore } from "~/store/tournament";
import CarouselElement from '~/components/CarouselElement.vue';
import type { TournamentModel } from "~/app/models/tournament";

definePageMeta({
  auth: false
})

useHead({
  title: "Spots : Les tournois",
  description:
      "Spots est un site de gaming qui regroupe les utilisateurs qui souhaitent créer leur propre tournois gratuitement.",
})

const tournamentStore = useTournamentStore()

const { pending } = await useAsyncData('tournament-list', () => tournamentStore.fetchTournaments())
const { data } = await useAsyncData<Array<TournamentModel>>('tournament-highlighted', () => $fetch('/api/tournaments/highlighted'))
const searched = ref(false)
const infiniteKey = ref(0)

const searching = ref(false)

function searchFilter(event) {
    infiniteKey.value++;
    searching.value = true
    tournamentStore.sendSearch({ form: event.form })
    searching.value = false
    searched.value = true
}
</script>

<style lang="scss">
@import "@/assets/css/pages/tournaments.scss";
@import "@/assets/css/components/carousel.scss";

.flip-list-move {
  transition: transform 1s ease;
}

.empty-slide {

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 236px;
    background: #130757;
    color: white;
    border-radius: 10px;
    width: 100%;
  }

  &__text {

  }
}
</style>
