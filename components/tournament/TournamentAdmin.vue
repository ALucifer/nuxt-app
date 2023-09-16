<template>
  <div class="container-fluid p-5">
    <div class="admin-card-tournament">

    </div>
  </div>
</template>

<script setup lang="ts">
import { useTournamentStore } from "~/store/tournament";
import {useMatchStore} from "~/store/match";

const { currentTournament: tournament } = useTournamentStore()
const { items: matches } = useMatchStore()
const { toggle, isOpen } = useMatchModal()
</script>

<style lang="scss" scoped>
.admin-card-tournament {
  width: 300px;
  height: 200px;
  background: #3b2d91;
  border-radius: 15px;
}
</style>