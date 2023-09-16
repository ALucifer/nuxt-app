<template>
    <!-- Modal -->
    <div
      class="modal fade"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      :class="{show: match}"
    >
      <div class="modal-dialog modal-dialog-centered modal-score">
        <div class="modal-content">
          <div class="modal-body p-4">
            <div class="row">
              <div class="col-6">
                <div class="card mx-4 mt-4">
                  <AppAvatar :src="getAvatar(match.team_a.avatar)" />
                  <div class="p-2 text-center">
                    {{ match.team_a.libelle }}
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card m-4">
                  <AppAvatar :src="getAvatar(match.team_b.avatar)" />
                  <div class="p-2 text-center">
                    {{ match.team_b.libelle }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6 p-2">
                <input type="number" class="mx-auto input-score" v-model="teamPointA" @input="updatePointA()">
              </div>
              <div class="col-6 p-2">
                <input type="number" class="mx-auto input-score" v-model="teamPointB" @input="updatePointB()">
              </div>
            </div>
            <div class="row text-center m-3"><span class="text-danger">Vous ne pouvez mettre seulement {{ remainingPoints }} point(s)</span></div>
            <div class="d-flex justify-content-around">
                <button
                  type="button"
                  class="btn btn-success"
                  @click="teamPointA !== teamPointB && save()"
                  :disabled="teamPointA === teamPointB"
                >
                  <div class="spinner-border spinner-border-sm" role="status" v-if="saveLoading">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <check-icon v-else />
                </button>
                <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-dismiss="modal"
                    @click="toggle()"
                >
                  <close-icon />
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<script lang="ts" setup>
import { useMatchStore } from "~/store/match";
import useMatchModal from "~/composables/useMatchModal";
import {useTournamentStore} from "~/store/tournament";
import {ScoreFormModel} from "~/app/models/scoreFormModel";

const { item, saveScore } = useMatchStore()
const { currentTournament } = useTournamentStore()

const { toggle } = useMatchModal()
const match = item

const teamPointA = ref<number>(0)
const teamPointB = ref<number>(0)

const remainingPoints = computed<number>(() => currentTournament.best_of - (teamPointA.value + teamPointB.value))
function updatePointA() {
  if (teamPointA.value + teamPointB.value > currentTournament.best_of) {
    teamPointA.value = currentTournament.best_of - teamPointB.value
  }
}

function updatePointB() {
  if (teamPointA.value + teamPointB.value > currentTournament.best_of) {
    teamPointB.value = currentTournament.best_of - teamPointA.value
  }
}

function getAvatar(avatar: string) {
  return "data:image/svg+xml;base64," + avatar;
}

const saveLoading = ref(false)
const { handleResponse } = useFlashMessages()
async function save() {
  let winner_id = match.team_a.id
  let winner_score = teamPointA.value
  let looser_id = match.team_b.id
  let looser_score = teamPointB.value

  if (teamPointB.value > teamPointA.value) {
    winner_id = match.team_b.id
    winner_score = teamPointB.value
    looser_id = match.team_a.id
    looser_score = teamPointA.value
  }

  const form: ScoreFormModel = {
    match_id: match.id,
    winner_id,
    looser_id,
    winner_score,
    looser_score,
  }

  saveLoading.value = true
  const status = await saveScore(form)
  saveLoading.value = false

  handleResponse(
      status,
      'Votre score à bien été enregistré.',
      'Un problème est survenu lors du renseignement du score.'
  )

  if (status) {
    toggle()
  }
}
</script>

<style scoped>
div.show {
  display: block;
}
h1 {
  color: black;
}

.modal-score {
  max-width: 800px;
}

.input-score {
  font-size: 25px;
  background: initial;
  border-color: grey;
  width: 20%;
  color: initial;
  line-height: 16px;
  text-align: center;
}
</style>
