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
                v-if="isHalf(tournament)"
                @click="generate()"
              >
                <span
                  :class="{ 'spinner-border text-warning': bracketLoading }"
                  >{{ bracketLoading ? "" : "Générer l'arbre" }}</span
                >
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 text-center" v-if="isOpen(tournament)">
            <NuxtLink
              :to="{ name: 'tournois-id-register' }"
              class="cmn-btn register-btn"
              v-if="!isRegister(tournament) && isOpen(tournament)"
              >S'inscrire</NuxtLink
            >
            <span
              v-else-if="!isCompletlyClose(tournament) && isRegister(tournament)"
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
          <AppNavItem name="participants" v-if="isOwner(tournament)" />
          <AppNavItem
            name="matches"
            libelle="Mes matchs"
            v-if="matchStore.userMatches?.length > 0"
          />
          <AppNavItem name="suivi" v-if="isOwner(tournament) && hasMatches(tournament)" />
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import useFlashMessages from "@/composables/useFlashMessages";
import useTournamentHeader from "~~/composables/useTournamentHeader";
import {useTournamentStore} from "~/store/tournament";
import State from '@/components/tournament/State.vue'
import { useMatchStore } from "~/store/match";

const { isOwner, isHalf, isRegister, hasMatches, isCompletlyClose, isOpen } =
    useTournamentHeader()
const { addMessage } = useFlashMessages()

const authStore = useAuthStore()
const tournamentStore = useTournamentStore()
const matchStore = useMatchStore()

const bracketLoading = ref(false)
const unsubscribeLoad = ref(false)
const user = computed(() => authStore.user)
const tournament = computed(() => tournamentStore.currentTournament)

function unsubscribeClick() {
  unsubscribeLoad.value = true

  tournamentStore.unsubscribe(tournamentStore.currentTournament.id, user.value.id).then((data) => {
    tournamentStore.setCurrentTournament(data.data)
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
async function generate() {
    bracketLoading.value = true;
    await tournamentStore.start(tournamentStore.currentTournament).then((data) => {
      tournamentStore.setCurrentTournament(data.data)
      addMessage({
        class: "success",
        message: "Génération de l'arbre réussi.",
      });
      bracketLoading.value = false;
    })
}
</script>

<style lang="scss">
@import "@/assets/css/components/tournamentHeader.scss";
@import "@/assets/css/components/tournamentCard.scss";
</style>
