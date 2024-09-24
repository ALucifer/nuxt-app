<template>
    <div v-if="isAfterNow(tournament.begin_at) && !isCompletlyClose(tournament)" class="time-area bg">
      <div>
        <AppImage src="/images/waitng-icon.png" alt="image" class="tournament-card__wait" />
        <span>Début</span>
      </div>
      <span class="time">{{ dateToNow(tournament.begin_at) }}</span>
    </div>
    <div v-if="isCompletlyClose(tournament) && !isRunning(tournament)" class="date-area bg bg-danger">Terminé</div>
    <div v-if="isRunning(tournament)" class="date-area bg bg-success">En cours</div>
    <div v-if="isLogged() && isRegister(tournament)" class="date-area bg bg-warning">Inscrit</div>
    <div class="date-area bg">
      <span class="date">{{ formattedDate }}</span>
    </div>

</template>

<script setup lang="ts">
import type { TournamentModel } from "~/app/models/tournament";
import useTournament from "~/composables/useTournament";
import useDate from "~/composables/useDate";

const props = defineProps<{ tournament: TournamentModel }>()

const { dateToNow, dateFormatted, isAfterNow } = useDate()
const { isCompletlyClose, isRegister, isRunning } = useTournament()
const { isLogged } = useSecurity()

const formattedDate = computed(() => dateFormatted({ date: props.tournament.begin_at, format: "dddd DD MMM YYYY" }))
</script>