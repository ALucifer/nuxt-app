<template>
  <AppTabPane name="matches" tabName="tournament-view">
    <template v-slot:content>
      <template v-for="i in matches">
        <MatchCard
          :firstTeam="getTeam(i.adversaire_a, tournament.value.teams)"
          :secondTeam="getTeam(i.adversaire_b, tournament.value.teams)"
        >
          <template #action>
            <button
              class="btn btn-success"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              @click.prevent="setMatch(i)"
            >
              Score
            </button>
          </template>
          <template #information>
            <p class="match--information">
              Veuillez renseigner le score du match
            </p></template
          >
        </MatchCard>
      </template>
      <MatchModal />
    </template>
  </AppTabPane>
</template>

<script>
import MatchCard from "@/components/MatchCard.vue";
import { mapState } from "pinia";
import { useAuthStore } from "~~/store/auth";
import { filter } from "lodash";
import MatchModal from "@/components/MatchModal.vue";
import useMatchModal from "~~/composables/useMatchModal";

export default {
  components: { MatchCard, MatchModal },
  inject: ["tournament"],
  setup() {
    const { setMatch } = useMatchModal();
    return { setMatch };
  },
  computed: {
    ...mapState(useAuthStore, {
      user: "getUser",
    }),
    matches() {
      return filter(
        this.tournament.value.matches,
        (m) =>
          m.adversaire_a === this.user.id || m.adversaire_b === this.user.id
      );
    },
  },
  methods: {
    getTeam(user_id, teams) {
      return teams.find((team) => team.user_id == user_id);
    },
  },
};
</script>

<style lang="scss">
.match {
  &--container {
    background: #ffff;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &--avatar {
    border-radius: 60px;
    height: 75px;
  }
  &--action {
    display: flex;
    justify-content: space-around;
  }
  &--information {
    font-size: 12px;
    color: red;
  }
}
</style>
