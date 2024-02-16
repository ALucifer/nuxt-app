<template>
  <AppTabPane name="bracket" tabName="tournament-view">
    <template v-slot:content>
      <div class="row">
        <AppImage :src="tournament.image_bracket" alt="" />
      </div>
    </template>
  </AppTabPane>
</template>

<script setup lang="ts">
import {TournamentModel} from "~/app/models/tournament";

defineProps<{tournament: TournamentModel}>()
</script>

<style></style>
