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
                <div class="card">
<!--                  <AppAvatar :src="match.team_a.avatar" />-->
                  <div class="p-2 text-center">
                    {{ match.team_a.libelle }}
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card">
<!--                  <AppAvatar :src="match.team_b.avatar" />-->
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
            <div class="row text-center"><span class="text-danger">Vous ne pouvez mettre seulement {{ remainingPoints }} point(s)</span></div>
            <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="toggle()"
            >
              <close-icon />
            </button>
            <button type="button" class="btn btn-success" @click="toggle()">
              <check-icon />
            </button>
          </div>
        </div>
      </div>
    </div>
</template>


<script lang="ts" setup>
import { useMatchStore } from "~/store/match";
import useMatchModal from "~/composables/useMatchModal";
import {useTournamentStore} from "~/store/tournament";

const matchStore = useMatchStore()
const { currentTournament } = useTournamentStore()

const { toggle } = useMatchModal()
const match = computed(() => matchStore.item)

const teamPointA = ref(0)
const teamPointB = ref(0)

const remainingPoints = computed(() => currentTournament.best_of - (teamPointA.value + teamPointB.value))
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
  width: 25%;
  color: initial;
  line-height: 16px;
}
</style>
