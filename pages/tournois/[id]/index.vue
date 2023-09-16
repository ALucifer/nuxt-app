<template>
  <div v-if="!pending">
    <TournamentViewer v-if="!tournamentStore.isOwner"/>
    <TournamentAdmin v-else/>
  </div>
</template>

<script setup lang="ts">
import {useTournamentStore} from "~/store/tournament";
import {useMatchStore} from "~/store/match";
import useFetchTournamentById from "~/composables/api/useFetchTournamentById";
import TournamentAdmin from "~/components/tournament/TournamentAdmin.vue";
import TournamentViewer from "~/components/tournament/TournamentViewer.vue";
import useFetchMatchsByTournamentId from "~/composables/api/useFetchMatchsByTournamentId";

definePageMeta({
  auth: false
})

const tournamentStore = useTournamentStore()
const { getUser } = useSecurity()
const route = useRoute()
const router = useRouter()

const { pending } = await useFetchTournamentById()
await useFetchMatchsByTournamentId()

const tournament = computed(() => tournamentStore.currentTournament)

/*function isOwner() {
  return tournament.value.owner === getUser().id
}*/

onMounted(() => {
  if (!tournamentStore.currentTournament) {
    router.push({name: 'index'})
  }
})

useSeoMeta({
  titleTemplate: 'Tournoi: %s',
  title: tournamentStore.currentTournament.libelle,
  description: 'test'
})
</script>
