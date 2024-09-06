<template>
  <div class="container-grey">
    <div class="pb-3">
      <h5>Gestion des tournois</h5>
      <p class="text-14">Tournois auquel vous êtes inscrit ou bien que vous avez créé</p>
    </div>
    <div>
      <p class="text-14">Trier par:
        <select class="selector-option" v-model="selected">
          <option v-for="filter in filters" :value="filter.id">{{ filter.libelle }}</option>
        </select>
      </p>
    </div>
  </div>
  <div class="container-card">
    <TournamentCard :owner="true" :user="false" />
    <TournamentCard :owner="false" :user="true" />
  </div>
  <div class="container-card">Vous n'avez actuellement aucun tournois.</div>
<!--  <nav v-if="!pending && tournaments.meta.lastPage > 1">-->
<!--    <ul class="pagination justify-content-center pt-2">-->
<!--      <li class="page-item" :class="{ 'disabled': currentPage <= 1}">-->
<!--        <NuxtLink class="page-link" :to="{ name: route.name, params: { slug: route.params.slug }, query: { page: currentPage - 1 } }">Précédent</NuxtLink>-->
<!--      </li>-->
<!--      <li class="page-item" v-for="i in range" :class="{'active': currentPage === i}">-->
<!--        <NuxtLink class="page-link" :to="{ name: route.name, params: { slug: route.params.slug }, query: { page: i } }">{{ i }}</NuxtLink>-->
<!--      </li>-->
<!--      <li class="page-item" :class="{ 'disabled': tournaments.meta.lastPage <= currentPage}">-->
<!--        <NuxtLink class="page-link" :to="{ name: route.name, params: { slug: route.params.slug }, query: { page: currentPage + 1 } }">Suivant</NuxtLink>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </nav>-->
</template>

<script setup lang="ts">
import type {TournamentModel} from "~/app/models/tournament";
import TournamentCard from '@/components/profile/TournamentCard'

const { getUser } = useSecurity()
const route = useRoute()
// const { currentPage, range } = pagination()
const nuxtApp = useNuxtApp()

const filters = ref([
  { id: 1, libelle: 'Mes tournois'},
  { id: 2, libelle: 'Mes participations'},
])
const selected = ref(1)

// const { data: tournaments, pending } = await useAsyncData<TournamentModel[]>(
//     'user-tournament-list-' + (selected.value === 1 ? 'owner' : 'user'),
//     async () => await $fetch(
//         '/api/tournaments/all',
//         {
//           query: {
//             owner: selected.value === 1 ? getUser().id : null,
//             user: selected.value === 2 ? getUser().id : null,
//             pagination: 6,
//             page: currentPage.value
//           }
//         }
//     ),
//     {
//       transform(input) {
//         return {
//           ...input,
//           fetchedAt: new Date()
//         }
//       },
//       getCachedData(key) {
//         const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
//         if (!data) {
//           return
//         }
//
//         const expirationDate = new Date(data.fetchedAt)
//         expirationDate.setTime(expirationDate.getTime() + 10 * 1000)
//         const isExpired = expirationDate.getTime() < Date.now()
//         if(isExpired) {
//           return
//         }
//
//         return data
//       },
//       watch: [ currentPage, selected ]
//     }
// )
// function pagination() {
//   const currentPage = computed(() => route.query.page! ? +route.query.page : 1)
//
//   const range = computed(() => {
//     let end = currentPage.value + 2
//     end = end > tournaments.value!.meta.lastPage ? tournaments.value!.meta.lastPage : end
//     let start = currentPage.value - 2
//     start = start >=1 ? start : 1;
//     return Array.from({ length: end - start + 1 }, (v, k) => k + start)
//   })
//
//   return { currentPage, range }
// }
</script>

<style lang="scss">
.container-grey {
  background-color: #C7C7C729;
  padding: 16px;
  margin-bottom: 10px;
}

.selector-option {
  background-color: white;
  font-weight: bold;
}

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

  @media (max-width: 576px)  {
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