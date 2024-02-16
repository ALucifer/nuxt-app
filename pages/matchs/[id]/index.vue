<template>
  <div class="container d-flex justify-content-center">
    <div class="match-card--container" v-if="!pending">
      <div class="match-card--header">
        <AppAvatar :src="getTeamAvatar(match.team_a)"/>
        <AppImage class="versus-small" src="images/versus.png"/>
        <AppAvatar :src="getTeamAvatar(match.team_b)"/>
      </div>
      <div class="match-card--body">
        <div class="information">
          <p>Score indiqué par l'équipe : <b>Team A</b></p>
          <p>
            <AppAvatar class="avatar-information" :src="getTeamAvatar(match.team_a)" />
            <span class="score">3 - 0</span>
            <AppAvatar class="avatar-information avatar-information--looser" :src="getTeamAvatar(match.team_b)"/>
          </p>
        </div>
        <div class="information">
          <p>Score indiqué par l'équipe : <b>Team B</b></p>
        </div>
        <div class="information">
          <p>Score final</p>
        </div>
      </div>
      <div class="match-card--footer">
        <button class="btn btn--score">Donner son score</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Penser a checker que le user à bien le droit de donner le score
import {TeamModel} from "~/app/models/team.model";
import {definePageMeta} from "#imports";

definePageMeta({
  middleware: ['show-score'],
})

const route = useRoute()
const {data: match, pending} = useFetch(`/api/matches/${route.params.id}`)

function getTeamAvatar(team?: TeamModel) {
  return (team && team.avatar) ? 'data:image/svg+xml;base64,' + team.avatar : null
}
</script>

<style scoped lang="scss">
* {
  color: black
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

.btn {
  padding: 10px;

  &--score {
    background-color: #7552BF;
    color: white;
  }
}

.versus-small {
  width: 80px;
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