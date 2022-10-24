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
                v-if="halfParticipants()"
                @click="generate()"
              >
                <span>Générer l'arbre</span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 text-center">
            <NuxtLink
              :to="{ name: 'tournois-id-register' }"
              class="cmn-btn register-btn"
              v-if="this.isOpen()"
              >S'inscrire</NuxtLink
            >
            <span
              v-else-if="alreadyRegister()"
              class="cmn-btn"
              @click="unsubscribe(tournament.id, user.id)"
              >Se desinscrire</span
            >
            <span v-else class="cmn-btn">{{ closeMessage }}</span>
          </div>
        </div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <AppNavItem name="overview" />
          <AppNavItem name="bracket" v-if="tournament.image_bracket" />
          <AppNavItem name="participants" v-if="authUserTournament()" />
          <AppNavItem
            name="matches"
            libelle="Mes matchs"
            v-if="isAuthenticated()"
          />
          <AppNavItem name="suivi" />
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
import { inject } from "vue";
import useAuth from "@/composables/useAuth";

export default {
  data() {
    return {
      formattedAt: dayjs(this.tournament.begin_at).format(
        "D MMMM, YYYY h:mm A"
      ),
      closeMessage: "Inscriptions terminées",
    };
  },
  setup() {
    const tournament = inject("tournament");
    const { isAuthenticated } = useAuth();
    return { tournament: tournament.value, isAuthenticated };
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
  methods: {
    isOpen: function () {
      let result = undefined;
      if (this.user !== null) {
        result = lodash.find(
          this.tournament.teams,
          (i) => i.user_id === this.user.id
        );

        if (result !== undefined) {
          this.closeMessage = "Vous êtes déjà inscrit";
        }
      }

      return this.tournament.state === "OPEN" && result === undefined;
    },
    authUserTournament: function () {
      return this.tournament.owner === this.user?.id;
    },
    halfParticipants: function () {
      return (
        this.tournament.teams.length >= this.tournament.max_teams / 2 &&
        this.tournament.state === "OPEN" &&
        this.tournament.image_bracket === null &&
        this.authUserTournament()
      );
    },
    generate: async function () {
      await this.generateTournamentTree(this.tournament);
    },
    alreadyRegister: function () {
      return find(this.user?.tournaments, (i) => i.id === this.tournament.id);
    },
    ...mapActions(useTournamentStore, [
      "generateTournamentTree",
      "unsubscribe",
    ]),
  },
};
</script>

<style lang="scss">
@import "@/assets/css/components/tournamentHeader.scss";
</style>
