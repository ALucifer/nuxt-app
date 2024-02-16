<template>
  <div
      class="container tournament-admin-card"
      :class="{'only-one-item': display !== 'all'}"
  >
    <div
        class="hero"
        :class="{
        'd-none': display !== 'all'
      }"
    >
      <div class="top-bar">
        <div class="counter-teams counter-teams--3">
          <template v-if="tournament.teams.length > 0">
            <AppAvatar
                v-for="(team, index) in tournament.teams.slice(0,3)"
                class="counter-teams__avatar"
                :class="['counter-teams__avatar--' + (index + 1)]"
                :src="getTeamAvatar(team)"
            />
          </template>
        </div>
        <div class="action" :class="{ 'd-none': hideActionButtons() }">
          <div class="dropdown">
              <span type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div class="spinner-border spinner-border-sm text-black-50" role="status" v-if="loading">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <menu-icon fillColor="black" v-else/>
              </span>
            <ul class="dropdown-menu" ref="action">
              <li v-if="showRegisterLabel">
                <NuxtLink class="dropdown-item" :to="{ name: 'tournois-id-register', params: { id: tournament.id }}">
                  S'inscrire
                </NuxtLink>
              </li>
              <li v-if="showUnsubscribeLabel">
                <button class="dropdown-item" @click="handleUnsubscribe(tournament.id)">Se désinscrire</button>
              </li>
              <li v-if="canBeStarted(tournament)">
                <button class="dropdown-item" @click="handleStart(tournament)">Démarrer</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="admin-info">
        <p class="admin-title">{{ tournament.libelle }}</p>
        <div>
          <span class="admin-sub-info">
            <calendar-icon class="mr-1" fillColor="black" :size="14"/>{{
              dateFormatted({
                date: tournament.beginAt,
                format: 'DD MMM YYYY'
              })
            }}
          </span>
          <span class="admin-sub-info">
            <calendar-icon class="mr-1" fillColor="black" :size="14"/>{{
              dateFormatted({
                date: tournament.beginAt,
                format: 'HH : mm'
              })
            }}
          </span>
        </div>
        <div class="admin-tags">
          <span class="admin-tag">{{ tournament.format }}</span>
          <span class="admin-tag admin-tag--large">Best of {{ tournament.bestOf }}</span>
          <span class="admin-tag admin-tag--large">{{ tournament.skillLevel }}</span>
          <span class="admin-tag admin-tag--large">Equipes {{ tournament.maxTeams }}</span>
        </div>
      </div>
    </div>
    <div class="d-flex flex-grow-1">
      <div class="d-flex gap-3" v-if="description">
        <div class="description">
          <p style="color: black">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi asperiores
            assumenda,
            test test consequuntur earum enim est exercitationem fugiat illum labore nihil nisi odit qui quo
            reprehenderit, repudiandae sequi tempore ut vitae.</p>
        </div>
        <div class="next" @click="description = !description">
          <chevron-right-icon fill-color="black"/>
        </div>
      </div>
      <div class="listings" v-else>
        <div class="next" @click="description = !description">
          <chevron-left-icon fill-color="black"/>
        </div>
        <div
            class="matchs-listing"
            :class="{
                'd-none-on-768': matches.length <= 0,
                'matchs-listing--full-width': display === 'matches',
                'd-none': display !== 'matches' && display !== 'all'
              }"
        >
          <template v-if="matches.length > 0">
            <div class="matchs-header">
              <span v-if="display === 'matches'"><arrow-left-icon fill-color="black" @click="display = 'all'"/></span>
              <span>Matches</span>
              <div class="dropdown">
                    <span class="matchs-listing__dropdown" type="button" data-bs-toggle="dropdown"
                          aria-expanded="false">
                      {{ currentFilter }} <filter-icon :size="14"/>
                    </span>
                <ul class="dropdown-menu">
                  <li v-for="filter in filters">
                    <button
                        v-if="filter !== currentFilter && !(filter === FiltersTournamentMatches.MY_MATCHES && !isLogged())"
                        @click="() => currentFilter = filter"
                        class="dropdown-item"
                    >{{ filter }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div class="matchs-cards" v-for="match in tournamentSorted">
              <NuxtLink
                class="match-card"
                :class="{
                  'match-card--error': match.state === 'NEED_VALIDATION',
                  'cursor': isOwner(tournament) || isUserLoggedInMatch(match)
                }"
                :to="{ name: 'matchs-id', params: { id: match.id } }"
              >
                <div>
                  <AppAvatar
                    :src="getTeamAvatar(getTeam(match.adversaire_a, tournament.teams))"
                  />
                  <span class="match-card__team-name">{{
                      getTeam(match.adversaire_a, tournament.teams).libelle
                    }}</span>
                </div>
                <span v-if="match.state === 'NEED_VALIDATION' && isOwner(tournament)" class="need-action">
                      <alert-icon fill-color="red" :size="16"/> Action requise
                    </span>
                <span v-else-if="match.state === 'FINISH'">{{ showScore(match) }}</span>
                <template v-else>
                  <span class="match-card-text">{{ showMissingScore(match) }}</span>
                </template>
                <div>
                    <span class="match-card__team-name">{{
                        getTeam(match.adversaire_b, tournament.teams).libelle
                      }}</span>
                  <AppAvatar :src="getTeamAvatar(getTeam(match.adversaire_a, tournament.teams))"/>
                </div>
              </NuxtLink>
            </div>
            <div class="d-flex justify-content-center" v-if="tournamentSorted.length >= 5"
                 :class="{'d-none': display === 'matches'}">
              <p class="show-more" @click="display = 'matches'">Voir plus</p>
            </div>
          </template>
        </div>
        <div
            class="teams-cards"
            :class="{
                'd-none': display !== 'all',
                'd-all-teams': displayAllTeams
              }"
        >
          <template v-if="tournament.teams.length > 0">
            <div class="team-card" v-for="team in teamsList">
              <AppAvatar
                :src="getTeamAvatar(team)"
              />
              <div class="team-informations">
                <p class="team-libelle">{{ team.libelle }}</p>
                <p class="team-user">
                  <nuxt-link :to="{ name: 'user-id-profile', params: { id: team.user.id }}" class="team-user">
                    {{ team.user.pseudo }}
                  </nuxt-link>
                </p>
              </div>
            </div>
            <div class="team-card team-card--show-more" v-if="tournament.teams.length > 6">
              <button v-if="!displayAllTeams" @click="displayAllTeams = !displayAllTeams">Voir plus</button>
              <button v-else @click="displayAllTeams = !displayAllTeams">Voir moins</button>
            </div>
          </template>
          <div v-else class="team-card team-card--show-more">
            <p>Aucune équipe(s)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTournamentStore} from "~/store/tournament";
import {MatchWithTeamsAndScoresModel, State} from "~/app/models/match.model";
import {ScoreModel} from "~/app/models/scoreFormModel";
import {TournamentModel} from "~/app/models/tournament";
import {FiltersTournamentMatches} from "~/app/vo/Filters";
import {TeamModel} from "~/app/models/team.model";

const {currentTournament: tournament, start, unsubscribe} = useTournamentStore()
const {dateFormatted} = useDate()
const {
  getTeam, findUserMatchFromMatches, isRegister, isUserLoggedInMatch,
  isCompletlyClose, canBeStarted, isRunning, isOwner, isComplete
} = useTournament()
const {getUser, isLogged} = useSecurity()
const {handleResponse} = useFlashMessages()

const filters = Object.values(FiltersTournamentMatches)
const currentFilter = ref(filters[0])
const loading = ref(false)

function fetchMatches(tournament_id: number) {
  return useFetch<MatchWithTeamsAndScoresModel[]>(
      `/api/tournaments/${tournament_id}/matches`,
  );
}

const useFetcheMatchesResult = await fetchMatches(tournament.id)
const matches = ref(useFetcheMatchesResult.data)

const tournamentSorted = computed(() => {
  let filtered: MatchWithTeamsAndScoresModel[] = []

  switch (currentFilter.value) {
    case 'Terminé': {
      filtered = matches.value.filter((item) => item.state === State.FINISH)
      break;
    }
    case 'Score incorrect': {
      filtered = matches.value.filter((item) => item.state === State.NEED_VALIDATION)
      break;
    }
    case 'Mes matchs': {
      filtered = findUserMatchFromMatches(matches.value as MatchWithTeamsAndScoresModel[], getUser().id)
      break;
    }
    default: {
      return matches.value
    }
  }

  return filtered.slice(0, 5)
})
const teamsList = computed(() => displayAllTeams.value ? tournament.teams : tournament.teams.slice(0, 6))
const showUnsubscribeLabel = ref(isRegister(tournament) && !isCompletlyClose(tournament) && !isRunning(tournament))
const showRegisterLabel = ref(!isRegister(tournament) && !isCompletlyClose(tournament) && !isRunning(tournament) && !isComplete(tournament))

const action = ref()
const display = ref('all')
const displayAllTeams = ref(false)
const description = ref(true)

function hideActionButtons() {
  return action.value?.childElementCount === 0;
}

function showScore(match: MatchWithTeamsAndScoresModel) {
  let score = match.scores.at(0)
  if (match.scores.length === 3) {
    score = match.scores.filter((item: ScoreModel) => item.reporter_id === getUser().id).at(0)
  }

  let leftScore = score.winner_id === match.team_a.id ? score.winner_score : score.looser_score
  let rightScore = score.winner_id === match.team_b.id ? score.winner_score : score.looser_score

  return `${leftScore} - ${rightScore}`
}

function showMissingScore(match: MatchWithTeamsAndScoresModel) {
  if (match.scores.length === 0) {
    return 'Aucune équipe n\'a renseigné de score'
  }

  if (match.scores.filter((score: ScoreModel) => score.reporter_id === match.team_a.id)) {
    return `L'équipe ${match.team_b.libelle} n'a pas encore renseigné de score`
  }

  return `L'équipe ${match.team_a.libelle} n'a pas encore renseigné de score`
}

async function handleUnsubscribe(tournament_id: number) {
  loading.value = true
  const {status} = await unsubscribe(tournament_id)
  loading.value = false

  handleResponse(
      status,
      'Vous êtes bien désincrit au tournois',
      'Une erreur est survenu'
  )
  status ? showUnsubscribeLabel.value = false : null;
  status ? showRegisterLabel.value = true : null;
}

async function handleStart(tournament: TournamentModel) {
  loading.value = true
  const success = await start(tournament)

  if (success) {
    const useFetcheMatchesResult = await fetchMatches(tournament.id)
    matches.value = useFetcheMatchesResult.data.value
  }

  loading.value = false

  handleResponse(
      success,
      'Le tournois est maintenant démarré',
      'Un problème est survenu lors du lancement du tournoi'
  )
}

function getTeamAvatar(team?: TeamModel) {
  return (team && team.avatar) ?  'data:image/svg+xml;base64,' + team.avatar : null
}
</script>

<style lang="scss" scoped>
@import "assets/css/components/tournament/tournamentView";

.only-one-item {
  overflow: scroll;
  scrollbar-width: none;
}

.d-all-teams {
  max-height: 400px;
  overflow: scroll;
}

.cursor:hover {
  cursor: pointer;
}
</style>