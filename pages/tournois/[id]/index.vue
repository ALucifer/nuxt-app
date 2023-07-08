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

const tournamentStore = useTournamentStore()
const matchStore = useMatchStore()
const route = useRoute()
const router = useRouter()

const { pending } = await useAsyncData(async() => await tournamentStore.fetchItem(+route.params.id))

const tournament = computed(() => tournamentStore.currentTournament)


onMounted(() => {
    if (!tournamentStore.currentTournament) {
        router.push({ name: 'index' })
    }
    matchStore.fetchUserMatches(+route.params.id)
})

useSeoMeta({
    titleTemplate: 'Tournoi: %s',
    title: tournamentStore.currentTournament.libelle,
    description: 'test'
})
</script>
