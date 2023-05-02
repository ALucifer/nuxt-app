<template>
  <div class="container">
    <h3 class="p-4">Mes tournois</h3>
    <template v-if="myTournaments.loaded && myTournaments.items.length > 0">
      <TournamentTable :params="myTournaments" />
    </template>
    <div v-else class="px-4">
      <h5>Aucun tournoi pour le moment</h5>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import TournamentTable from "@/components/TournamentTable";
import TournamentClient from "~/app/client/TournamentClient";

const tournamentClient = new TournamentClient()

useHead({
    title: 'Liste de mes tournois'
})

const route = useRoute()
const myTournaments = ref({
    loaded: false,
    items: [],
    query: 'mytournament',
    pagination: {
        page: 0,
        range: 10,
    }
})

const { user } = useAuthStore()

function fetchTournament() {
  tournamentClient.all(
    {
      user: user.id,
      pagination: myTournaments.value.pagination.range,
      page: queryParamValue.value,
    }
  ).then((result) => {
    myTournaments.value.items = result.data;
    myTournaments.value.pagination.pages = Math.ceil(
        result.total / myTournaments.value.pagination.range
    );
    myTournaments.value.loaded = true;
  });
}

const queryParamValue = computed(() => route.query[myTournaments.value.query] || 1)
watch(queryParamValue, () => fetchTournament())
fetchTournament()

</script>
