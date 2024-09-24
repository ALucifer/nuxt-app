<template>
  <AppTabPane name="bracket" tab-name="tournament-view">
    <template #content>
      <div class="row">
        <AppImage :src="tournament.image_bracket" alt="" />
      </div>
    </template>
  </AppTabPane>
</template>

<script setup lang="ts">
import type {TournamentModel} from "~/app/models/tournament";

defineProps<{tournament: TournamentModel}>()
</script>

<style></style>
