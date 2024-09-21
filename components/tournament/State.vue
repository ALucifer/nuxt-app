<template>
    <div class="time-area bg" v-if="isAfterNow(tournament.begin_at) && !isCompletlyClose(tournament)">
      <div>
        <AppImage src="/images/waitng-icon.png" alt="image" class="tournament-card__wait" />
        <span>Début</span>
      </div>
      <span class="time">{{ dateToNow(tournament.begin_at) }}</span>
    </div>
    <div class="date-area bg bg-danger" v-if="isCompletlyClose(tournament) && !isRunning(tournament)">Terminé</div>
    <div class="date-area bg bg-success" v-if="isRunning(tournament)">En cours</div>
    <div class="date-area bg bg-warning" v-if="isLogged() && isRegister(tournament)">Inscrit</div>
    <div class="date-area bg">
      <span class="date">{{ formattedDate }}</span>
    </div>

</template>

<script setup lang="ts">
import { TournamentModel } from "~/app/models/tournament";
import useTournament from "~/composables/useTournament";
import useDate from "~/composables/useDate";

const props = defineProps<{ tournament: TournamentModel }>()

const { dateToNow, dateFormatted, isAfterNow } = useDate()
const { isCompletlyClose, isRegister, isRunning } = useTournament()
const { isLogged } = useSecurity()

const formattedDate = computed(() => dateFormatted({ date: props.tournament.begin_at, format: "dddd DD MMM YYYY" }))
</script>