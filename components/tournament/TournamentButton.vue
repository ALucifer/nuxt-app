<template>
  <div>
    <NuxtLink
      :to="{ name: 'tournois-id-register' }"
      class="cmn-btn register-btn"
      v-if="!isRegister(tournament) && isOpen(tournament)"
    >S'inscrire
    </NuxtLink>
    <span
      v-else-if="!isCompletlyClose(tournament) && isRegister(tournament)"
      class="cmn-btn"
      @click="unsubscribeClick()"
    >
      <template v-if="!unsubscribeLoad">Se désinscrire</template>
      <template v-else>
        <div class="spinner-border text-warning" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </template>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useTournamentStore } from "~/store/tournament";
import useFlashMessages from "~/composables/useFlashMessages";
import useSecurity from "~/composables/useSecurity";
import { TournamentModel } from "~/app/models/tournament";

const props = defineProps<{tournament: TournamentModel}>()
const { isRegister, isOpen, isCompletlyClose } = useTournament()

const { unsubscribe, setCurrentTournament, } = useTournamentStore()
const { addMessage } = useFlashMessages()
const { getUser } = useSecurity()

const unsubscribeLoad = ref(false)

function unsubscribeClick() {
  unsubscribeLoad.value = true

  unsubscribe(props.tournament.id, getUser().id).then((data) => {
    setCurrentTournament(data.data)
    unsubscribeLoad.value = false
    addMessage({
      class: 'success',
      message: 'Vous n\'etes plus inscrit a ce tournoi.'
    })
  }).catch(() => {
    addMessage({
      class: 'error',
      message: 'Une erreur est survenu lors de la désinscription au tournoi.'
    })
    unsubscribeLoad.value = false
  })
}
</script>

<style scoped>

</style>