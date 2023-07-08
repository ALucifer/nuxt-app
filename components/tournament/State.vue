<template>
    <div class="time-area bg" v-if="isAfterNow(tournament.begin_at)">
      <img src="images/waitng-icon.png" alt="image" class="tournament-card__wait" />
      <span>Début</span>
      <span class="time">{{ dateToNow(tournament.begin_at) }}</span>
    </div>
    <div class="date-area bg bg-danger" v-if="isCompletlyClose(tournament)">Terminé</div>
    <div class="date-area bg bg-success" v-if="isRunning(tournament)">En cours</div>
    <div class="date-area bg bg-warning" v-if="isRegister(tournament)">Inscrit</div>
    <div class="date-area bg">
      <span class="date">{{ formattedDate }}</span>
    </div>

</template>

<script setup lang="ts">
import { TournamentModel } from "~/app/models/tournament";
import useTournamentHeader from "~~/composables/useTournamentHeader";
import useDate from "~/composables/useDate";
const { dateToNow, dateFormatted, isAfterNow } = useDate()

const props = defineProps<{ tournament: TournamentModel }>()

const { isCompletlyClose, isRegister, isRunning } = useTournamentHeader()

const formattedDate = computed(() => dateFormatted({ date: props.tournament.begin_at, format: "dddd DD MMM YYYY" }))
</script>