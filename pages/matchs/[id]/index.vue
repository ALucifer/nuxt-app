<template>
  <div class="container d-flex justify-content-center">
    <div class="match-card--container">
      <div class="match-card--header">
        <div class="card-team">
          <AppAvatar :src="getTeamAvatar(match.team_a)" />
          <p>{{ match.team_a.libelle }}</p>
        </div>
        <AppImage class="versus-small" src="images/versus.png" />
        <div class="card-team">
          <AppAvatar :src="getTeamAvatar(match.team_b)" />
          <p>{{ match.team_b.libelle }}</p>
        </div>
      </div>
      <div class="match-card--body">
        <div v-for="score in match.scores" :key="score.id" class="information">
          <p v-if=score.reporter>Score indiqué par l'équipe : <b>{{ score.reporter.libelle }}</b></p>
          <p v-else>Score indiqué par l'administrateur</p>
          <p>
            <AppAvatar data-bs-toggle="tooltip" data-bs-placement="top" :data-bs-title="score.winner.libelle"
              class="avatar-information" :src="getTeamAvatar(score.winner)" />
            <span class="score">{{ score.winnerScore + ' - ' + score.looserScore }}</span>
            <AppAvatar data-bs-toggle="tooltip" data-bs-placement="top" :data-bs-title="score.looser.libelle"
              class="avatar-information avatar-information--looser" :src="getTeamAvatar(score.looser)" />
          </p>
        </div>
        <div v-if="match.scores.length === 0" class="information">
          <p>Aucun score pour le moment</p>
        </div>
      </div>
      <div class="match-card--footer">
        <button v-if="!userHasScored()" class="btn btn--score" @click.prevent="openModal">
          <template v-if="isFirstScore()">
            Donner son score
          </template>
          <template v-else>
            Donne le score en tant qu'administrateur
          </template>
        </button>
        <p v-if="match.state === State.FINISH" class="badge badge--danger">Match terminé</p>
      </div>
    </div>
    <Teleport to="body">
      <ModalScore :match="match" @scored="handleScored()" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import { TeamModel } from "~/app/models/team.model";
import ModalScore from "~/components/match/ModalScore.vue";
import { State, type MatchWithTeamsAndScoresModel } from "~/app/models/match.model";
import type { ScoreModel } from "~/app/models/scoreFormModel";

definePageMeta({
  middleware: ['show-score'],
})

const { $bootstrap } = useNuxtApp()
const route = useRoute()
const match = ref<MatchWithTeamsAndScoresModel>(route.meta.match as MatchWithTeamsAndScoresModel)

onMounted(() => {
  try {
    [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].map(tooltipTriggerEl => new $bootstrap.Tooltip(tooltipTriggerEl))
  } catch (e) {
    console.log('Bootstrap error: ', e);
  }
})

const { getUser } = useSecurity()

function userHasScored() {
  if (match.value.state === 'FINISH') {
    return true
  }

  if (match.value.tournament.owner === getUser().id) {
    return false
  }

  const score = match.value.scores.find((score: ScoreModel) => score.reporter?.userId === getUser().id)

  return score !== undefined ? true : false
}

function isFirstScore() {
  const score = match.value.scores.find((score: ScoreModel) => score.reporter?.userId === getUser().id)

  return score !== undefined ? false : true
}

const myModal = ref()

const { openModal, closeModal } = modal()

function modal() {
  function openModal() {
    myModal.value = new $bootstrap.Modal(document.getElementById('myModal'))

    myModal.value.show(myModal)
  }

  function closeModal() {
    myModal.value.hide()
  }

  return { openModal, closeModal }
}

async function handleScored() {
  const { data } = await useFetch<MatchWithTeamsAndScoresModel>(`/api/matches/${route.params.id}`)

  if (data.value) {
    match.value = data.value
  }

  closeModal()
}

function getTeamAvatar(team?: TeamModel) {
  return (team && team.avatar) ? 'data:image/svg+xml;base64,' + team.avatar : null
}
</script>

<style scoped lang="scss">
.card-team {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  &-information {
    width: 75px;
    height: 75px;

    &--looser {
      opacity: 0.3;
    }
  }
}

.badge {
  padding: 4px;

  &--danger {
    background-color: red;
  }
}

.btn {
  padding: 10px;

  &--score {
    background-color: #7552BF;
    color: white;
  }
}

.versus-small {
  height: 80px;
}

.avatar-img {
  width: 150px;
  height: 150px;
}

.information {
  padding: 16px;
  background-color: rgba(10, 10, 10, 0.1);
  height: 140px;
  width: 80%;
  border-left: 1px solid #2CC832;

  .score {
    margin: 0 16px;
    font-size: 20px;
    font-weight: bold;
  }
}

.match-card {
  &--container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    background-color: white;
    padding: 16px;
    border-radius: 32px;
    margin-top: 100px;
    height: 790px;
    width: 800px;
  }

  &--header {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  &--body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }

  &--footer {
    display: flex;
    justify-content: center;
  }
}
</style>