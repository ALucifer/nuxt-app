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
          <div class="col-lg-3 col-md-4 text-center">
            <NuxtLink
              :to="{ name: 'tournois-id-register' }"
              class="cmn-btn register-btn"
              v-if="isOpen()"
              >S'inscrire</NuxtLink
            >
            <span
              v-else-if="isRegister()"
              class="cmn-btn"
              @click="unsubscribeHandler(tournament.id, user.id)"
              >Se desinscrire</span
            >
            <span v-else class="cmn-btn">{{ closeMessage }}</span>
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
          <AppNavItem name="suivi" v-if="isOwner()" />
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from "dayjs";
import { useAuthStore } from "@/store/auth";
import { mapState, mapActions } from "pinia";
import { useTournamentStore } from "../store/tournament";
import lodash from "lodash";
import useFlashMessages from "@/composables/useFlashMessages";
import useTournamentHeader from "~~/composables/useTournamentHeader";

export default {
  data() {
    return {
      formattedAt: dayjs(this.tournament.begin_at).format(
        "D MMMM, YYYY h:mm A"
      ),
      closeMessage: "Inscriptions terminées",
      bracketLoading: false,
    };
  },
  setup() {
    const { addMessage } = useFlashMessages();
    const tournament = inject("tournament");

    const { isOwner, isHalf, isRegister, userHasMatches } =
      useTournamentHeader(tournament);

    return {
      addMessage,
      tournament,
      isOwner,
      isHalf,
      isRegister,
      userHasMatches,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user", "isAuthenticated"]),
  },
  methods: {
    isOpen: function () {
      let result = undefined;
      if (this.isAuthenticated) {
        result = lodash.find(
          this.tournament.teams,
          (i) => i.user_id === this.user.id
        );

        if (result !== undefined) {
          this.closeMessage = "Vous êtes déjà inscrit";
        }
      }

      return (
        this.tournament.state === "OPEN" &&
        result === undefined &&
        this.tournament.challonge_id !== null
      );
    },
    generate: async function () {
      this.bracketLoading = true;
      await this.start(this.tournament);
      this.addMessage({
        class: "success",
        message: "Génération de l'arbre réussi.",
      });
      this.bracketLoading = false;
    },
    unsubscribeHandler: async function (tournament_id, user_id) {
      await this.unsubscribe(tournament_id, user_id);
      this.addMessage({
        class: "success",
        message: "Vous avez bien été déinscrit du tournoi",
      });
    },
    ...mapActions(useTournamentStore, ["start", "unsubscribe"]),
    ...mapActions(useAuthStore, ["loadUserMatchs"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/css/components/tournamentHeader.scss";
</style>
