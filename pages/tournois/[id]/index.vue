<template>
    <TournamentView />
</template>

<script setup lang="ts">
import {useTournamentStore} from "~/store/tournament";
import TournamentView from "~/components/tournament/TournamentView.vue";

definePageMeta({
  auth: false
})

const tournamentStore = useTournamentStore()
const { getUser } = useSecurity()
const route = useRoute()
const router = useRouter()

const { data } = await useAsyncData('tournament-view' + route.params.id, () => tournamentStore.fetchTournament(+route.params.id))

useSeoMeta({
  titleTemplate: 'Tournoi: %s',
  title: data.value.libelle,
  description: 'test'
})
</script>
