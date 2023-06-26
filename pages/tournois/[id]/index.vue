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

const tournamentStore = useTournamentStore()
const route = useRoute()
const router = useRouter()

const { data, pending } = await useAsyncData(async() => await tournamentStore.fetchItem(route.params.id))

const tournament = computed(() => tournamentStore.currentTournament)

onMounted(() => {
    if (!tournamentStore.currentTournament) {
        router.push({ name: 'index' })
    }
})

useSeoMeta({
    titleTemplate: 'Tournoi: %s',
    title: tournamentStore.currentTournament.libelle,
    description: 'test'
})
</script>
