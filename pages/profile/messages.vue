<template>
  <div class="container">
    <div
        class="row g-0"
        style="background-color: #665494; min-height: 350px"
    >
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTournamentStore} from "~/store/tournament";

const tournamentStore = useTournamentStore()
const date = new Date().getMilliseconds()
const { data, pending } = await useFetch('/api/tournaments/list', { key: date.toString() })
</script>

<style lang="scss">
@import "@/assets/css/pages/profile/messageList.scss";
</style>
