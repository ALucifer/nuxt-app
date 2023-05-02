<template>
    <div>
        <ClientOnly>
            <TournamentResume v-if="loaded" />
            <div class="container my-4" v-else >
                <div class="col-10 mx-auto">
                    <AppLoader />
                </div>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import TournamentResume from "@/components/TournamentResume";
import { useTournamentStore } from "~/store/tournament";

const loaded = ref(false)
const tournamentStore = useTournamentStore()
const route = useRoute()
const router = useRouter()

await useAsyncData(async() => {
  await tournamentStore.fetchItem(route.params.id)

  loaded.value = true
})

onMounted(() => {
    if (!tournamentStore.currentTournament) {
        router.push({ name: 'index' })
    }
})

const tournament = ref(tournamentStore.currentTournament)
useSeoMeta({
    titleTemplate: 'Tournoi: %s',
    title: tournament.value.libelle,
    description: 'test'
})
provide('tournament', tournament)
</script>
