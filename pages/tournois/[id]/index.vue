<template>
  <div
    class="container tournament-admin-card"
    :class="{ 'only-one-item': display !== 'all' }"
  >
    <div
      class="hero"
      :class="{
        'd-none': display !== 'all',
      }"
    >
      <div class="top-bar">
        <div class="counter-teams counter-teams--3">
          <template v-if="tournament.teams.length > 0">
            <AppAvatar
              v-for="(team, index) in tournament.teams.slice(0, 3)"
              :key="team.id"
              class="counter-teams__avatar"
              :class="['counter-teams__avatar--' + (index + 1)]"
              :src="getAvatar(team)"
            />
          </template>
        </div>
        <div class="action" :class="{ 'd-none': hideActionButtons() }">
          <div class="dropdown">
            <span type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <div
                v-if="topRightButtonLoading"
                class="spinner-border spinner-border-sm text-black-50"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <menu-icon v-else fill-color="black" />
            </span>
            <ul ref="action" class="dropdown-menu">
              <li v-if="showRegisterLabel">
                <NuxtLink
                  class="dropdown-item"
                  :to="{
                    name: 'tournois-id-register',
                    params: { id: tournament.id },
                  }"
                >
                  S'inscrire
                </NuxtLink>
              </li>
              <li v-if="showUnsubscribeLabel">
                <button
                  class="dropdown-item"
                  @click="unsubscribe()"
                >
                  Se désinscrire
                </button>
              </li>
              <li v-if="canBeStarted(tournament)">
                <button class="dropdown-item" @click="start">
                  Démarrer
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="admin-info">
        <p class="admin-title">{{ tournament.libelle }}</p>
        <div>
          <span class="admin-sub-info">
            <calendar-icon class="mr-1" fill-color="black" :size="14" />{{
              dateFormatted({
                date: tournament.beginAt,
                format: "DD MMM YYYY",
              })
            }}
          </span>
          <span class="admin-sub-info">
            <calendar-icon class="mr-1" fill-color="black" :size="14" />{{
              dateFormatted({
                date: tournament.beginAt,
                format: "HH : mm",
              })
            }}
          </span>
          <span
            v-if="
              ['RUNNING', 'FINISH', 'CLOSE', 'OPEN'].includes(tournament.state)
            "
          >
            <p
              class="admin-tag admin-tag--large"
              :class="{
                'admin-tag--success': tournament.state === 'RUNNING',
                'admin-tag--error': ['FINISH', 'CLOSE'].includes(
                  tournament.state
                ),
                'admin-tag--info': tournament.state === 'OPEN',
              }"
            >
              {{ tournament.state }}
            </p>
          </span>
        </div>
        <div class="admin-tags">
          <span class="admin-tag">{{ tournament.format }}</span>
          <span class="admin-tag admin-tag--large"
            >Best of {{ tournament.bestOf }}</span
          >
          <span class="admin-tag admin-tag--large">{{
            tournament.skillLevel
          }}</span>
          <span class="admin-tag admin-tag--large"
            >Equipes {{ tournament.maxTeams }}</span
          >
        </div>
      </div>
    </div>
    <div class="d-flex flex-grow-1">
      <div v-if="description" class="d-flex gap-3 flex-grow-1">
        <div class="description">
          <template v-if="tournament.progress" v-html="tournament.progress"/>
          <template v-else
            >Pas de description du déroulement du tournoi actuellement</template
          >
        </div>
        <div class="next" @click="description = !description">
          <chevron-right-icon fill-color="black" />
        </div>
      </div>
      <div v-else class="listings">
        <div class="next" @click="description = !description">
          <chevron-left-icon fill-color="black" />
        </div>
        <div
          class="matchs-listing"
          :class="{
            'd-none-on-768': tournament.matches.length <= 0,
            'matchs-listing--full-width': display === 'matches',
            'd-none': display !== 'matches' && display !== 'all',
          }"
        >
          <template v-if="tournament.matches.length > 0">
            <div class="matchs-header">
              <span v-if="display === 'matches'"
                ><arrow-left-icon fill-color="black" @click="display = 'all'"
              /></span>
              <span>Matches</span>
              <div class="dropdown">
                <span
                  class="matchs-listing__dropdown"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ currentFilter }} <filter-icon :size="14" />
                </span>
                <ul class="dropdown-menu">
                  <li v-for="(filter, index) in filters" :key="index">
                    <button
                      v-if="
                        filter !== currentFilter &&
                        !(
                          filter === FiltersTournamentMatches.MY_MATCHES &&
                          !isLogged()
                        )
                      "
                      class="dropdown-item"
                      @click="() => (currentFilter = filter)"
                    >
                      {{ filter }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div class="matchs-cards">
              <template v-for="match in tournamentSorted">
                <NuxtLink
                  v-if="isOwner(tournament) || isUserLoggedInMatch(match)"
                  :key="match.id"
                  class="match-card"
                  :class="{
                    'match-card--error': match.state === 'NEED_VALIDATION',
                    'remove-cursor':
                      !isOwner(tournament) && !isUserLoggedInMatch(match),
                  }"
                  :to="{ name: 'matchs-id', params: { id: match.id } }"
                >
                  <MatchCard :match="match" :tournament="tournament" />
                </NuxtLink>
                <p
                  v-else
                  :key="match.id"
                  class="match-card"
                  :class="{
                    'match-card--error': match.state === 'NEED_VALIDATION',
                    'remove-cursor':
                      !isOwner(tournament) && !isUserLoggedInMatch(match),
                  }"
                >
                  <MatchCard :match="match" :tournament="tournament" />
                </p>
              </template>
            </div>
            <div
              v-if="tournamentSorted.length >= 5"
              class="d-flex justify-content-center"
              :class="{ 'd-none': display === 'matches' }"
            >
              <p class="show-more" @click="display = 'matches'">Voir plus</p>
            </div>
          </template>
          <template v-else> Aucun match pour le moment</template>
        </div>
        <div
          class="teams-cards"
          :class="{
            'd-none': display !== 'all',
            'd-all-teams': displayAllTeams,
          }"
        >
          <template v-if="tournament.teams.length > 0">
            <div 
              v-for="team in teamsList"
              :key="team.id"
              class="team-card">
              <AppAvatar :src="getAvatar(team)" />
              <div class="team-informations">
                <p class="team-libelle">{{ team.libelle }}</p>
                <p class="team-user">
                  <nuxt-link
                    :to="{
                      name: 'user-id-profile',
                      params: { id: team.user.id },
                    }"
                    class="team-user"
                  >
                    {{ team.user.pseudo }}
                  </nuxt-link>
                </p>
              </div>
            </div>
            <div
              v-if="tournament.teams.length > 6"
              class="team-card team-card--show-more"
            >
              <button
                v-if="!displayAllTeams"
                @click="displayAllTeams = !displayAllTeams"
              >
                Voir plus
              </button>
              <button v-else @click="displayAllTeams = !displayAllTeams">
                Voir moins
              </button>
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
import { FiltersTournamentMatches } from "~/app/vo/Filters";
import {
  type MatchWithTeamsAndScoresModel,
  State,
} from "~/app/models/match.model";
import type {TournamentModelWithMatchesAndTeams} from "~/app/models/tournament";
import MatchCard from "@/components/match/MatchCard";

definePageMeta({
  auth: false,
});

const route = useRoute();

const { data, refresh } = await useFetch<TournamentModelWithMatchesAndTeams>(`/api/tournaments/${route.params.id}`, { key: `init-tournament-${route.params.id}`})

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const tournament = ref(data.value)

useSeoMeta({
  titleTemplate: "Tournoi: %s",
  title: tournament.value.libelle,
  description: "test",
});

const { dateFormatted } = useDate();
const {
  findUserMatchFromMatches,
  isUserLoggedInMatch,
  canBeStarted,
  isOwner,
} = useTournament();
const { getUser, isLogged } = useSecurity();
const { getAvatar } = useTeam();

const filters = Object.values(FiltersTournamentMatches);
const currentFilter = ref(filters[0]);

const tournamentSorted = computed(() => {
  let filtered: MatchWithTeamsAndScoresModel[] = [];

  switch (currentFilter.value) {
    case "Terminé": {
      filtered = tournament.value.matches.filter((item) => item.state === State.FINISH) as MatchWithTeamsAndScoresModel[]
      break;
    }
    case "Score incorrect": {
      filtered = tournament.value.matches.filter((item) => item.state === State.NEED_VALIDATION) as MatchWithTeamsAndScoresModel[]
      break;
    }
    case "Mes matchs": {
      filtered = findUserMatchFromMatches(
        tournament.value.matches as MatchWithTeamsAndScoresModel[],
        getUser().id
      );
      break;
    }
    default: {
      return tournament.value.matches;
    }
  }

  return filtered.slice(0, 5);
})
const teamsList = computed(() => displayAllTeams.value ? tournament.value.teams : tournament.value.teams.slice(0, 6))

const action = ref();
const display = ref("all");
const displayAllTeams = ref(false);
const description = ref(true);
const {
  showUnsubscribeLabel, showRegisterLabel, hideActionButtons,
  handleUnsubscribe, topRightButtonLoading, handleStart
} = topRightButton(tournament.value, action)

async function unsubscribe()
{
  await handleUnsubscribe()
  await refresh()

}

async function start()
{
  await handleStart()
  await refresh()
}

function topRightButton(tournament: TournamentModelWithMatchesAndTeams, element: Ref<HTMLDivElement>) {
  const { errorMessage, successMessage } = useFlashMessages();
  const { isRegister, isCompletlyClose, isRunning, isComplete } = useTournament();

  const topRightButtonLoading = ref(false);
  const showUnsubscribeLabel = ref(
      isRegister(tournament) &&
      !isCompletlyClose(tournament) &&
      !isRunning(tournament)
  );
  const showRegisterLabel = ref(
      !isRegister(tournament) &&
      !isCompletlyClose(tournament) &&
      !isRunning(tournament) &&
      !isComplete(tournament)
  );

  function hideActionButtons() {
    return element.value?.childElementCount === 0;
  }

  async function handleUnsubscribe() {
    topRightButtonLoading.value = true;

    try {
      await $fetch(
          `/api/tournaments/${route.params.id}/unsubscribe`,
          {
            method: 'POST'
          }
      )

      successMessage('Vous êtes bien désincrit au tournois')

    } catch (e) {
      errorMessage('Une erreur est survenu')
    }
    topRightButtonLoading.value = false;
  }

  async function handleStart() {
    topRightButtonLoading.value = true;
    try {
      await $fetch(
          `/api/tournaments/${route.params.id}/start`,
          {
            method: 'POST'
          }
      )

      successMessage('Le tournoi est maintenant démarré')
    } catch {
      errorMessage('Un problème est survenu lors du lancement du tournoi')
    }

    topRightButtonLoading.value = false;
  }

  return { showUnsubscribeLabel, showRegisterLabel, hideActionButtons, handleUnsubscribe, handleStart, topRightButtonLoading }
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

.remove-cursor:hover {
  cursor: initial;
}

.description :deep(p) {
  color: black;
}
</style>
