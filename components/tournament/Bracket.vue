<template>
  <AppTabPane name="bracket" tabName="tournament-view">
    <template v-slot:content>
      <div class="row">
        <img :src="tournament.image_bracket" alt="" />
      </div>
    </template>
  </AppTabPane>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    const tournament = inject("tournament");
    return { tournament: tournament.value };
  },
};
</script>

<style></style>
