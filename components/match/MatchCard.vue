<template>
  <div>
    <AppAvatar :src="getAvatar(getTeam(match.adversaireA, tournament.teams))" />
    <span class="match-card__team-name">{{ getTeam(match.adversaireA, tournament.teams)?.libelle }}</span>
  </div>
  <span
    v-if="match.state === 'NEED_VALIDATION' && isOwner(tournament)"
    class="need-action"
  >
    <alert-icon
      fill-color="red"
      :size="16"
    /> Action requise
  </span>
  <span v-else-if="match.state === 'FINISH'">{{ showScore(match) }}</span>
  <span
    v-else
    class="match-card-text"
  >{{ showMissingScore(match) }}</span>
  <div>
    <span class="match-card__team-name">{{ getTeam(match.adversaireB, tournament.teams)?.libelle }}</span>
    <AppAvatar :src="getAvatar(getTeam(match.adversaireB, tournament.teams))" />
  </div>
</template>

<script setup lang="ts">
import type { MatchWithTeamsAndScoresModel } from '~/app/models/match.model'
import { ScoreType, type ScoreModel } from '~/app/models/scoreFormModel'
import type { TournamentModelWithTeams } from '~/app/models/tournament'

defineProps<{ match: MatchWithTeamsAndScoresModel, tournament: TournamentModelWithTeams }>()

const { isOwner, getTeam } = useTournament()
const { getAvatar } = useTeam()

function showScore(match: MatchWithTeamsAndScoresModel) {
  const score = match.scores.find((score: ScoreModel) => score.type === ScoreType.FINAL)

  if (score == undefined) {
    return 'Match terminé'
  }

  const leftScore = score.winnerId === match.team_a.id ? score.winnerScore : score.looserScore
  const rightScore = score.winnerId === match.team_b.id ? score.winnerScore : score.looserScore

  return `${leftScore} - ${rightScore}`
}

function showMissingScore(match: MatchWithTeamsAndScoresModel) {
  if (match.scores.length === 0) {
    return 'En attente des scores'
  }

  const teamAScored = match.scores.filter(score => score.reporterId === match.team_a.id)
  const teamBScored = match.scores.filter(score => score.reporterId === match.team_b.id)

  if (teamAScored.length !== 0 && teamBScored.length !== 0) {
    return 'Tout les scores ont été renseignés.'
  }

  if (teamAScored.length === 0 && teamBScored.length !== 0) {
    return `L'équipe ${match.team_a.libelle} n'a pas encore renseigné de score`
  }

  if (teamAScored.length !== 0 && teamBScored.length === 0) {
    return `L'équipe ${match.team_b.libelle} n'a pas encore renseigné de score`
  }
}
</script>

<style lang="scss" scoped>
@import "assets/css/components/tournament/tournamentView";
</style>
