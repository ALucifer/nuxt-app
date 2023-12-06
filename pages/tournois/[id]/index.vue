<template>
  <div>
    <TournamentViewer v-if="!tournamentStore.isOwner"/>
    <TournamentAdmin v-else/>
  </div>
</template>

<script setup lang="ts">
import {useTournamentStore} from "~/store/tournament";
import TournamentAdmin from "~/components/tournament/TournamentAdmin.vue";
import TournamentViewer from "~/components/tournament/TournamentViewer.vue";

definePageMeta({
  auth: false
})

const tournamentStore = useTournamentStore()
const { getUser } = useSecurity()
const route = useRoute()
const router = useRouter()

await useAsyncData('tournament-view', () => tournamentStore.fetchTournament(+route.params.id))

const tournament = computed(() => tournamentStore.currentTournament)

onMounted(() => {
  /**
   * Passer par un middleware et ne pas renvoyer une redirection mais une 404
   */
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
