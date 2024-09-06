<template>
  <div class="dropdown">
    <span type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <div
        v-if="loading"
        class="spinner-border spinner-border-sm text-black-50"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <menu-icon v-else fill-color="black"/>
    </span>
    <ul ref="action" class="dropdown-menu">
      <li v-if="showRegisterLabel">
        <NuxtLink
         class="dropdown-item"
         :to="{ name: 'tournois-id-register', params: { id: tournament.id } }"
        >S'inscrire</NuxtLink>
      </li>
      <li v-if="showUnsubscribeLabel">
        <button class="dropdown-item" @click="unsubscribe()"> Se désinscrire</button>
      </li>
      <li v-if="canBeStarted(tournament)">
        <button class="dropdown-item" @click="start">Démarrer</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type {TournamentModelWithMatchesAndTeams} from "#build/app/models/tournament";

const props = defineProps<{ tournament: TournamentModelWithMatchesAndTeams }>()
const emits = defineEmits(['unsubscribe', 'start'])

const { canBeStarted, isRegister, isCompletlyClose, isRunning, isComplete } = useTournament()
const { errorMessage, successMessage } = useFlashMessages();
const { isLogged } = useSecurity()
const route = useRoute()

const loading = ref(false)
const action = ref(null)

defineExpose({ action })

const showRegisterLabel = ref(
  (!isLogged() && !isRunning(props.tournament) && !isCompletlyClose(props.tournament))
  || (!isRegister(props.tournament) && !isRunning(props.tournament) && !isCompletlyClose(props.tournament))
)

const showUnsubscribeLabel = ref(
    isRegister(props.tournament) &&
    !isCompletlyClose(props.tournament) &&
    !isRunning(props.tournament)
);

const start = async () => {
    loading.value = true

    try {
        await $fetch(
            `/api/tournaments/${route.params.id}/start`,
            {
                method: 'POST'
            }
        )

        successMessage('Le tournoi est maintenant démarré')
    } catch {
        errorMessage('Un problème est survenu lors du lancement du tournoi')
    }

    emits('start')
    loading.value = false
}

const unsubscribe = async () => {
    loading.value = true

    try {
        await $fetch(
            `/api/tournaments/${route.params.id}/unsubscribe`,
            {
                method: 'POST'
            }
        )

        successMessage('Vous êtes bien désincrit au tournois')

    } catch (e) {
        errorMessage('Une erreur est survenu')
    }
    emits('unsubscribe')
    loading.value = false
}
</script>