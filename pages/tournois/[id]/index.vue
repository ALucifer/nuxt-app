<template>
  <div>
    <TournamentResume v-if="!pending" />
    <div class="container my-4" v-else >
      <div class="col-10 mx-auto">
        <AppLoader />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TournamentResume from "@/components/TournamentResume";
import { useTournamentStore } from "~/store/tournament";
import { useMatchStore } from "~/store/match";

definePageMeta({
  auth: false
})

const tournamentStore = useTournamentStore()
const { isLogged } = useSecurity()
const matchStore = useMatchStore()
const route = useRoute()
const router = useRouter()

const { data, pending } = await useFetch(
  `/api/tournaments/${route.params.id}`,
  {
    key: 'test'
  }
)
const tournament = computed(() => tournamentStore.currentTournament)


onMounted(() => {
    if (!tournamentStore.currentTournament) {
        router.push({ name: 'index' })
    }
    if (isLogged()) {
      matchStore.fetchUserMatches(+route.params.id)
    }
})

useSeoMeta({
    titleTemplate: 'Tournoi: %s',
    title: tournamentStore.currentTournament.libelle,
    description: 'test'
})
</script>
