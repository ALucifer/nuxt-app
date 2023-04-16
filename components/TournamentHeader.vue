<template>
  <section class="record-tournament">
    <div class="container">
      <div class="record-tournament--resume-area">
        <div class="row resume-wrapper">
          <div class="col-lg-8 col-md-8 justify-content-sm-center d-grid">
            <h3>{{ tournament.libelle }}</h3>
            <div class="title-bottom d-flex">
              <div class="date-area bg">
                <span class="date">{{ formattedAt }}</span>
              </div>
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
              v-if="isOpen() && !isRegister()"
              >S'inscrire</NuxtLink
            >
            <span
              v-else-if="isRegister()"
              class="cmn-btn"
              @click="unsubscribe(tournament.id, user.id)"
              >Se desinscrire</span
            >
            <span v-else class="cmn-btn">Vous êtes déjà inscrit</span>
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
const { isOwner, isHalf, isRegister, userHasMatches, hasMatches } =
    useTournamentHeader(tournament.value)
const { addMessage } = useFlashMessages()
const authStore = useAuthStore()
const { start, unsubscribe } = useTournamentStore()

const bracketLoading = ref(false)
const formattedAt = computed(() => dayjs(tournament.value.begin_at).format("D MMMM, YYYY h:mm A"))
const user = computed(() => authStore.user)
function isOpen() {
    return (tournament.value.state === "OPEN" && tournament.value.challonge_id !== null)
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
</style>
