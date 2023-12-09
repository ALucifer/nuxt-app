<template>
  <div class="container tournament-admin-card">
    <div class="hero">
      <div class="top-bar">
        <div class="counter-teams counter-teams--3">
          <AppAvatar src="/images/user-placeholder.png" class="counter-teams__avatar counter-teams__avatar--1"/>
          <AppAvatar src="/images/game-1.png" class="counter-teams__avatar counter-teams__avatar--2"/>
          <AppAvatar src="/images/game-2.png" class="counter-teams__avatar counter-teams__avatar--3"/>
        </div>
        <div class="action">
          <menu-icon fillColor="black"/>
        </div>
      </div>
      <div class="admin-info">
        <p class="admin-title">{{ tournament.libelle }}</p>
        <div>
          <span class="admin-sub-info">
            <calendar-icon class="mr-1" fillColor="black" :size="14"/>{{
              dateFormatted({
                date: tournament.begin_at,
                format: 'DD MMM YYYY'
              })
            }}
          </span>
          <span class="admin-sub-info">
            <calendar-icon class="mr-1" fillColor="black" :size="14"/>{{
              dateFormatted({
                date: tournament.begin_at,
                format: 'HH : mm'
              })
            }}
          </span>
        </div>
        <div class="admin-tags">
          <span class="admin-tag">{{ tournament.format }}</span>
          <span class="admin-tag">Best of {{ tournament.best_of }}</span>
          <span class="admin-tag">{{ tournament.skill_level }}</span>
        </div>
      </div>
    </div>
    <div class="listings">
      <div class="matchs-listing">
        <div class="matchs-header">
          <span>Matches</span>
          <div class="dropdown">
            <span class="matchs-listing__dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ currentFilter }} <filter-icon :size="14" />
            </span>
            <ul class="dropdown-menu">
              <li v-for="filter in filters">
                <button
                  v-if="filter !== currentFilter"
                  @click="() => currentFilter = filter"
                  class="dropdown-item"
                >{{ filter }}</button>
              </li>
            </ul>
          </div>
        </div>
        <div class="matchs-cards" v-for="match in tournament.matches">
          <div class="match-card" :class="{'match-card--error': match.state === 'NEED_VALIDATION'}">
            <div>
              <AppAvatar src="/images/user-placeholder.png"/>
              <span class="match-card__team-name">{{ getTeam(match.adversaire_a, tournament.teams).libelle }}</span>
            </div>
            <span v-if="match.state !== 'NEED_VALIDATION'">3 - 0</span>
            <span v-else class="need-action">
              <alert-icon fill-color="red" :size="16" /> Action requise
            </span>
            <div>
              <span class="match-card__team-name">{{ getTeam(match.adversaire_b, tournament.teams).libelle }}</span>
              <AppAvatar src="/images/user-placeholder.png"/>
            </div>
          </div>
        </div>
      </div>
      <div class="teams-cards"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTournamentStore} from "~/store/tournament";
import {useMatchStore} from "~/store/match";

const {currentTournament: tournament} = useTournamentStore()
const {dateFormatted} = useDate()
const {items: matches} = useMatchStore()
const {toggle} = useMatchModal()
const { getTeam } = useTournament()

const filters = ['Tous', 'Terminé', 'Score incorrect']
const currentFilter = ref(filters[0])
</script>

<style lang="scss" scoped>
@import "assets/css/components/tournament/tournamentAdmin";

.match-card {
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  border: 0.1px solid rgba(143, 148, 154, 0.5);
  margin: 16px 16px 16px 0;
  padding: 8px;
  -webkit-box-shadow: 5px 5px 7px 1px rgba(143, 148, 154, 0.5);
  box-shadow: 5px 5px 7px 1px rgba(143, 148, 154, 0.5);
  cursor: pointer;

  &:hover {
    -webkit-box-shadow: 5px 5px 7px 1px rgba(92, 51, 126, 0.45);
    box-shadow: 5px 5px 7px 1px rgba(34, 26, 80, 0.5);
  }

  &--error {
    border: 0.1px solid #E74C3CD6;
    -webkit-box-shadow: 5px 5px 7px 1px #E74C3CD6;
    box-shadow: 5px 5px 7px 1px #E74C3CD6;

    &:hover {
      -webkit-box-shadow: 5px 5px 7px 1px #E74C3CD6;
      box-shadow: 5px 5px 7px 1px #E74C3CD6;
    }
  }

  &__team-name {
    font-size: 10px;
    margin: 0 8px;
  }

  img {
    width: 30px;
    height: 30px;
  }
}

.listings {
  display: flex;
  margin: 4px 0;
  background-color: red;
  flex-grow: 1;
}

.matchs {

  &-listing {
    height: 100%;
    width: 70%;
    background-color: white;

    &__dropdown {
      background-color: #BCBABA;
      border-radius: 16px;
      padding: 0 16px;
      font-size: 12px;
    }

    * { color: black; }
  }

  &-header {
    display: flex;
    justify-content: space-between;
    margin: 0 16px 0 0;
  }
}

.teams-cards {
  height: 100%;
  width: 30%;
  background-color: green;
}

.need-action {
  color: red;
  font-size: 12px;
}
</style>