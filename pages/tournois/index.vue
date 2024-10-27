<template>
  <div class="pt-4">
    <div v-if="tournaments!.meta!.total > 0 || data.length > 0">
      <div>
        <div class="container">
          <CarouselElement :items="data" />
        </div>
        <section class="tournaments-card">
          <div class="overlay pt-120 pb-120">
            <div class="container wow fadeInUp">
              <SearchFormTournament
                v-model="searching"
                @search="searchFilter($event)"
              />
              <p class="text-white">
                Nombre de résultat(s) : {{ tournaments!.meta!.total }}
              </p>
              <transition-group
                name="flip-list"
                tag="div"
                class="search__result"
              >
                <TournamentCard
                  v-for="item in tournaments.data"
                  :key="item.id"
                  :item="item"
                />
              </transition-group>
              <AppInfiniteScroll
                v-show="status = 'success'"
                :key="'infiniteKey' + infiniteKey"
                :done="tournaments.data.length === tournaments.meta.total"
                @load="fetchNextPage"
              />
              <div v-if="!tournaments.data.length">
                <h4>Aucun résultat pour votre recherche</h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div
      v-else
      class="container"
    >
      <div class="empty-slide__container">
        <h3>Aucun tournois pour le moment ...</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TournamentCard from '~/components/TournamentCard'
import SearchFormTournament, { type Schema } from '~/components/SearchFormTournament'
import CarouselElement from '~/components/CarouselElement.vue'
import type { TournamentModel, TournamentModelWithMatchesAndTeams, TournamentsApiResult } from '~/app/models/tournament'

definePageMeta({
  auth: false,
})

useHead({
  title: 'Spots : Les tournois',
})

const form = ref()
const currentPage = ref(1)
const infiniteKey = ref(0)
const searching = ref(false)

const { data: tournamentsFromApi, refresh, status } = await useAsyncData(
  'tournament-list',
  () => $fetch('/api/tournaments/all', { query: { ...form.value, page: +currentPage.value } }),
)

const tournaments = ref<TournamentsApiResult>(tournamentsFromApi)
const { data } = await useAsyncData<TournamentModel[]>(
  'tournament-highlighted',
  () => $fetch('/api/tournaments/highlighted'),
)

async function searchFilter(searchForm: Schema) {
  infiniteKey.value++
  searching.value = true
  form.value = searchForm
  currentPage.value = 1
  await refresh()
  searching.value = false
}

async function fetchNextPage() {
  currentPage.value++
  const { data } = await $fetch<TournamentModelWithMatchesAndTeams[]>('/api/tournaments/all', { query: { ...form.value, page: +currentPage.value } })
  tournaments.value.data = [...tournaments.value.data, ...data]
}
</script>

<style lang="scss">
@use "@/assets/css/pages/tournaments.scss";
@use "@/assets/css/components/carousel.scss";

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
