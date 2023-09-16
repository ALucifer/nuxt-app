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
              v-if="!userAlreadyScored(match)"
            >
              Score
            </button>
          </template>
          <template #information>
            <p class="match--information" v-if="!userAlreadyScored(match)">
              Veuillez renseigner le score du match
            </p>
            <p class="match--information" v-if="userAlreadyScored(match)">En attente de validation</p>
            <span
              class="badge"
              v-if="userAlreadyScored(match)"
              :class="{
                'text-bg-success': scoreInformation(match).win,
                'text-bg-danger': !scoreInformation(match).win,
              }"
            >
              {{ scoreInformation(match).score }}
            </span>
          </template
          >
        </MatchCard>
      </template>
      <Teleport to="body">
        <MatchModal v-if="isOpen()" />
      </Teleport>
    </template>
  </AppTabPane>
</template>

<script setup lang="ts">
import MatchCard from "@/components/MatchCard.vue";
import MatchModal from "@/components/MatchModal.vue";
import {useMatchStore} from "~/store/match";
import useMatchModal from "~/composables/useMatchModal";
import {MatchWithTeamsAndScoresModel} from "~/app/models/match.model";
import { find } from 'lodash'

const props = defineProps<{matches: MatchWithTeamsAndScoresModel}>()
const { getUser } = useSecurity()
const matchStore = useMatchStore()
const { toggle, isOpen } = useMatchModal()

async function fetchMatch(match: any) {
  await matchStore.fetchMatch(match)
  toggle()
}

function scoreInformation(match: MatchWithTeamsAndScoresModel) {
  let team = match.team_a

  if (match.team_b.user_id === getUser().id) {
    team = match.team_b
  }
  const score = find(match.scores, (i) => {
    return i.winner_id === team.id || i.looser_id === team.id
  })

  const win = team.id === score?.winner_id

  let result = score?.winner_score + ' - ' + score?.looser_score

  if (!win) {
    result = score?.looser_score + ' - ' + score?.winner_score
  }
  return { win , score: result }
}

function userAlreadyScored(match: MatchWithTeamsAndScoresModel) {
  return find(match.scores, { 'reporter_id': getUser().id }) !== undefined
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
