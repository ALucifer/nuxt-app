<template>
    <div class="time-area bg" v-if="checkIfDateIsBefore(tournament)">
      <img src="images/waitng-icon.png" alt="image" class="tournament-card__wait" />
      <span>Début {{ isRegister() }}</span>
      <span class="time">{{ dateToNow(tournament.begin_at) }}</span>
    </div>
    <div class="date-area bg bg-danger" v-if="isCompletlyClose()">Terminé</div>
    <div class="date-area bg bg-warning" v-if="isRegister()">Inscrit</div>
    <div class="date-area bg">
      <span class="date">{{ formattedDate }}</span>
    </div>

</template>

<script setup lang="ts">
import { TournamentModel } from "~/app/models/tournament";
import useTournamentHeader from "~~/composables/useTournamentHeader";
import useDate from "~/composables/useDate";
const { dateToNow, dateFormatted, checkIfDateIsBefore } = useDate()

const props = defineProps<{ tournament: TournamentModel }>()

const { isCompletlyClose, isRegister } = useTournamentHeader(props.tournament)


const formattedDate = computed(() => dateFormatted({ date: props.tournament.begin_at, format: "dddd DD MMM YYYY" }))
</script>