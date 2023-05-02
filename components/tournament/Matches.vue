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

<script setup lang="ts">
import MatchCard from "@/components/MatchCard.vue";
import { mapState } from "pinia";
import { useAuthStore } from "~~/store/auth";
import { filter } from "lodash";
import MatchModal from "@/components/MatchModal.vue";
import useMatchModal from "~~/composables/useMatchModal";

const tournament = inject('tournament')
const { setMatch } = useMatchModal()
const { user } = useAuthStore()

const matches = computed(() => {
  return filter(
      tournament.value.matches,
      (m) =>
          m.adversaire_a === user.id || m.adversaire_b === user.id
  )
})

function getTeam(user_id, teams) {
  return teams.find((team) => team.user_id == user_id);
}
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
