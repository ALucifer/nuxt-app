<template>
  <AppTabPane name="matches" tabName="tournament-view">
    <template v-slot:content>
      <template v-for="match in matches">
        <MatchCard
          :firstTeam="match.team_a"
          :secondTeam="match.team_b"
        >
          <template #action>
            <button
              class="btn btn-success"
              type="button"
              @click.prevent="fetchMatch(match)"
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
      <MatchModal v-if="isOpen()" />
    </template>
  </AppTabPane>
</template>

<script setup lang="ts">
import MatchCard from "@/components/MatchCard.vue";
import { useAuthStore } from "~~/store/auth";
import MatchModal from "@/components/MatchModal.vue";
import {useMatchStore} from "~/store/match";
import useMatchModal from "~/composables/useMatchModal";
import {MatchModel} from "~/app/models/match";

const props = defineProps<{matches: MatchModel}>()
const { user } = useAuthStore()
const matchStore = useMatchStore()
const { toggle, isOpen } = useMatchModal()


async function fetchMatch(match: any) {
  await matchStore.fetchMatch(match)
  toggle()
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
