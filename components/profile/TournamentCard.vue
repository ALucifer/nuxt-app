<template>
  <div v-if="!pending && tournaments.meta.total !== 0" class="container-card">
    <div v-for="tournament in tournaments.data" :key="tournament.id">
      <div class="item__header">
        <span>{{ tournament.skillLevel }}</span>
        <span>{{ $dayjs(tournament.beginAt).format('DD MMM YYYY') }}</span>
      </div>
      <p class="item__description">{{ tournament.libelle }}</p>
      <p class="item__motivation">{{ tournament.speech }}</p>
      <div class="item__action">
        <nuxt-link :to="{ name: 'tournois-id', params: { id: tournament.id } }">Voir</nuxt-link>
      </div>
    </div>
  </div>
  <nav v-if="!pending && tournaments.meta.lastPage > 1">
    <ul class="pagination justify-content-center pt-2">
      <li class="page-item" :class="{ 'disabled': currentPage <= 1}">
        <NuxtLink class="page-link" :to="{ name: route.name, params: { slug: route.params.slug }, query: { [paginationName]: currentPage - 1 } }">
          Précédent
        </NuxtLink>
      </li>
      <li v-for="i in range" :key="i" class="page-item" :class="{'active': currentPage === i}">
        <NuxtLink class="page-link" :to="{ name: route.name, params: { slug: route.params.slug }, query: { [paginationName]: i } }">
          {{ i }}
        </NuxtLink>
      </li>
      <li class="page-item" :class="{ 'disabled': tournaments.meta.lastPage <= currentPage}">
        <NuxtLink class="page-link" :to="{ name: route.name, params: { slug: route.params.slug }, query: { [paginationName]: currentPage + 1 } }">
          Suivant
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type {TournamentModelWithMatchesAndTeams} from "~/app/models/tournament";

const props = defineProps<{ owner: boolean, user: boolean, paginationName: string }>()

const {getUser} = useSecurity()
const route = useRoute()
const {range, currentPage} = pagination()

const {execute, pending, data: tournaments} = await useFetch<TournamentModelWithMatchesAndTeams[]>(
    '/api/tournaments/all',
    {
      query: {
        owner: props.owner ? getUser().id : null,
        user: props.user ? getUser().id : null,
        pagination: 2,
        page: currentPage
      },
      lazy: true,
      watch: [ currentPage ]
    }
)


function pagination() {
  const currentPage = computed(() => route.query[props.paginationName] ? +route.query[props.paginationName] : 1)

  const range = computed(() => {
    let end = currentPage.value + 2
    end = end > tournaments.value!.meta.lastPage ? tournaments.value!.meta.lastPage : end
    let start = currentPage.value - 2
    start = start >= 1 ? start : 1;
    return Array.from({length: end - start + 1}, (v, k) => k + start)
  })

  return {currentPage, range}
}

onMounted(async () => {
  await execute()
})
</script>

<style lang="scss" scoped>
.container-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: 4px;
  column-gap: 4px;
  flex-grow: 1;
  background-color: #C7C7C729;
  padding: 4px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }

  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
  }
}

.item {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  max-height: 200px;
  padding: 8px;

  &__header {
    display: flex;
    justify-content: space-between;
    font-size: 10px;

    > span {
      color: grey;
      font-size: 14px;
    }
  }

  &__description {
    margin: 8px 0;
    overflow: hidden;
    text-overflow: ellipsis;

    > a {
      color: black;
    }
  }

  &__motivation {
    color: grey;
    font-size: 16px;
  }

  &__action {
    display: flex;
    justify-content: flex-end;

    a {
      background-color: black;
      padding: 4px 8px;
      border-radius: 8px;;
    }
  }
}
</style>