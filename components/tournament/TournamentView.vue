<template>
  <div class="container tournament-admin-card">
    <div class="hero">
      <div class="top-bar">
        <div class="counter-teams counter-teams--3">
          <template v-if="tournament.teams.length > 0">
            <AppAvatar
              v-for="(team, index) in tournament.teams.slice(0,3)"
              class="counter-teams__avatar"
              :class="['counter-teams__avatar--' + (index + 1)]"
              :src="'data:image/svg+xml;base64,' + team.avatar"
            />
          </template>
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
        <template v-if="tournament.matches.length > 0">
          <div class="matchs-cards" v-for="match in tournamentSorted">
          <div class="match-card" :class="{'match-card--error': match.state === 'NEED_VALIDATION'}">
            <div>
              <AppAvatar :src="'data:image/svg+xml;base64,' + getTeam(match.adversaire_a, tournament.teams).avatar"/>
              <span class="match-card__team-name">{{ getTeam(match.adversaire_a, tournament.teams).libelle }}</span>
            </div>
            <span v-if="match.state !== 'NEED_VALIDATION'">3 - 0</span>
            <span v-else class="need-action">
              <alert-icon fill-color="red" :size="16" /> Action requise
            </span>
            <div>
              <span class="match-card__team-name">{{ getTeam(match.adversaire_b, tournament.teams).libelle }}</span>
              <AppAvatar :src="'data:image/svg+xml;base64,' + getTeam(match.adversaire_b, tournament.teams).avatar"/>
            </div>
          </div>
        </div>
        </template>
      </div>
      <div class="teams-cards">
        <template v-if="tournament.teams.length > 0">
          <div class="team-card" v-for="team in tournament.teams.slice(0, 6)">
            <AppAvatar :src="'data:image/svg+xml;base64,' + team.avatar" />
            <div class="team-informations">
              <p class="team-libelle">{{ team.libelle }}</p>
              <p class="team-user">{{ team.user.pseudo }}</p>
            </div>
          </div>
          <div class="team-card team-card--show-more" v-if="tournament.teams.length >= 6">
          <button>Voir plus</button>
        </div>
        </template>
        <div v-else class="team-card team-card--show-more">
          <p>Aucune équipe(s)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTournamentStore} from "~/store/tournament";
import {useMatchStore} from "~/store/match";
import {MatchModel, MatchWithTeamsAndScoresModel, State} from "~/app/models/match.model";

const {currentTournament: tournament} = useTournamentStore()
const {dateFormatted} = useDate()
const {items: matches} = useMatchStore()
const {toggle} = useMatchModal()
const { getTeam, findUserMatchFromMatches } = useTournament()
const { getUser } = useSecurity()

const filters = ['Tous', 'Terminé', 'Score incorrect', 'Mes matchs']
const currentFilter = ref(filters[0])

const tournamentSorted = computed(() => {
  console.log(currentFilter.value)
  let filtered: MatchModel[] = []

  switch (currentFilter.value) {
    case 'Terminé': {
      filtered = tournament!.matches!.filter((item) => item.state === State.FINISH)
      break;
    }
    case 'Score incorrect': {
      filtered = tournament!.matches!.filter((item) => item.state === State.NEED_VALIDATION)
      break;
    }
    case 'Mes matchs': {
      filtered = findUserMatchFromMatches(tournament!.matches! as MatchWithTeamsAndScoresModel[], getUser().id)
      break;
    }
    default: {
      filtered = tournament!.matches!
      break
    }
  }

  return filtered.slice(0, 5)
})
</script>

<style lang="scss" scoped>
@import "assets/css/components/tournament/tournamentAdmin";

.teams-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  padding: 16px;
  width: 30%;
  -webkit-box-shadow: 0px 2px 3px 4px rgba(0,0,0,0.25);
  box-shadow: 0px 2px 3px 4px rgba(0,0,0,0.25);

  .team-card {
    display: flex;
    padding: 8px;

    &--show-more {
      justify-content: center;

      > p {
        color: black;
      }

      button {
        background: inherit;
        color: #3B2D91;
      }
    }

    img {
      width: 30px;
      height: 30px;
      border-radius: 16px;
    }

    .team-informations {
      margin-left: 8px;
      
      .team-libelle {
        color: black;
        font-size: 14px;
        line-height: 14px;
      }

      .team-user {
        color: black;
        font-size: 10px;
        line-height: 10px;
        font-style: italic;
      }
    }
  }
}

.listings {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin: 4px 0;
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

  .need-action {
    color: red;
    font-size: 12px;
  }
}
</style>