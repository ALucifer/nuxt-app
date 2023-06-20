<template>
  <section class="record-tournament">
    <div class="container">
      <div class="record-tournament--resume-area">
        <div class="row resume-wrapper">
          <div class="col-lg-8 col-md-8 justify-content-sm-center d-grid">
            <h3>{{ tournament.libelle }}</h3>
            <div class="title-bottom d-flex">
              <State :tournament="tournament" />
              <div
                class="start-area bg--action"
                v-if="isHalf()"
                @click="generate()"
              >
                <span
                  :class="{ 'spinner-border text-warning': bracketLoading }"
                  >{{ bracketLoading ? "" : "Générer l'arbre" }}</span
                >
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 text-center" v-if="isOpen()">
            <NuxtLink
              :to="{ name: 'tournois-id-register' }"
              class="cmn-btn register-btn"
              v-if="!isCompletlyClose() && !isRegister()"
              >S'inscrire</NuxtLink
            >
            <span
              v-else-if="!isCompletlyClose() && isRegister()"
              class="cmn-btn"
              @click="unsubscribeClick()"
              >
              <template v-if="!unsubscribeLoad">Se desinscrire</template>
              <template v-else>
                <div class="spinner-border text-warning" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>

              </template>
            </span
            >
          </div>
        </div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <AppNavItem name="overview" />
          <AppNavItem name="bracket" v-if="tournament.image_bracket" />
          <AppNavItem name="participants" v-if="isOwner()" />
          <AppNavItem
            name="matches"
            libelle="Mes matchs"
            v-if="userHasMatches()"
          />
          <AppNavItem name="suivi" v-if="isOwner() && hasMatches()" />
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useAuthStore } from "@/store/auth";
import useFlashMessages from "@/composables/useFlashMessages";
import useTournamentHeader from "~~/composables/useTournamentHeader";
import {useTournamentStore} from "~/store/tournament";

const tournament = inject('tournament')
const { isOwner, isHalf, isRegister, userHasMatches, hasMatches, isCompletlyClose } =
    useTournamentHeader(tournament.value)
const { addMessage } = useFlashMessages()
const authStore = useAuthStore()
const { start, unsubscribe } = useTournamentStore()
import State from '@/components/tournament/State.vue'

const bracketLoading = ref(false)
const unsubscribeLoad = ref(false)
const user = computed(() => authStore.user)
function isOpen() {
    return (tournament.value.state === "OPEN" && tournament.value.challonge_id !== null)
}

function unsubscribeClick() {
  unsubscribeLoad.value = true

  unsubscribe(tournament.value.id, user.value.id).then(() => {
    unsubscribeLoad.value = false
  }).catch(() => {
    addMessage({
      class: 'error',
      message: 'Une erreur est survenu lors de la désinscription au tournoi.'
    })
    unsubscribeLoad.value = false
  })
}
async function generate() {
    bracketLoading.value = true;
    await start(tournament.value);
    addMessage({
        class: "success",
        message: "Génération de l'arbre réussi.",
    });
    bracketLoading.value = false;
}
</script>

<style lang="scss">
@import "@/assets/css/components/tournamentHeader.scss";
@import "@/assets/css/components/tournamentCard.scss";
</style>
