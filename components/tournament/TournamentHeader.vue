<template>
  <section class="record-tournament">
    <div class="container">
      <div class="record-tournament--resume-area">
        <div class="row resume-wrapper">
          <AppImage src="/images/game-img-1.png" class="col-lg-2"></AppImage>
          <div class="col-lg-10 col-md-10 d-grid">
            <div class="d-inline-flex justify-content-between">
              <h3>{{ tournament.libelle }}</h3>
              <TournamentButton v-if="isOpen(tournament) && isLogged()" />
            </div>
            <div class="title-bottom d-flex align-items-end">
              <State :tournament="tournament" v-if="tournament" />
              <div
                class="start-area bg--action"
                v-if="isLogged() && isHalf(tournament)"
                @click="generate()"
              >
                <span
                  :class="{ 'spinner-border text-warning': bracketLoading }"
                  >{{ bracketLoading ? "" : "Générer l'arbre" }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <AppNavItem name="overview" />
          <AppNavItem name="bracket" v-if="tournament.image_bracket" />
          <AppNavItem name="participants" v-if="isLogged() && isOwner(tournament)" />
          <AppNavItem
            name="matches"
            libelle="Mes matchs"
            v-if="matches?.length > 0"
          />
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import useFlashMessages from "~/composables/useFlashMessages";
import useTournament from "~/composables/useTournament";
import {useTournamentStore} from "~/store/tournament";
import State from '~/components/tournament/State.vue'
import { useMatchStore } from "~/store/match";
import useSecurity from "~/composables/useSecurity";
import TournamentButton from "~/components/tournament/TournamentButton.vue";

const { isOwner, isHalf, isOpen } =
    useTournament()
const { addMessage } = useFlashMessages()

const { isLogged } = useSecurity()

const { data: auth } = useAuth()
const { getCurrentTournament, start, setCurrentTournament } = useTournamentStore()
const { items: matches } = useMatchStore()

const bracketLoading = ref(false)
const tournament = computed(() => getCurrentTournament)

async function generate() {
    bracketLoading.value = true;
    await start(tournament).then((data) => {
      setCurrentTournament(data.data)
      addMessage({
        class: "success",
        message: "Génération de l'arbre réussi.",
      });
      bracketLoading.value = false;
    })
}
</script>

<style lang="scss">
@import "assets/css/components/tournamentHeader";
@import "assets/css/components/tournamentCard";
</style>
