<template>
  <AppTabPane name="participants" tabName="tournament-view">
    <template v-slot:content>
      <div class="col-lg-12">
        <div class="pb-120">
          <div class="participant-item" v-for="team in tournament.teams">
            <div class="left-area d-flex align-items-center">
              <AppAvatar :src="getAvatar(team.avatar)" />
              <div class="right-side">
                <h6>{{ team.libelle }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppTabPane>
</template>

<script setup lang="ts">
import type {TournamentModel} from "~/app/models/tournament";

defineProps<{tournament: TournamentModel}>()

function getAvatar(avatar: string) {
  return "data:image/svg+xml;base64," + avatar;
}
</script>

<style lang="scss">
.participant-item {
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  &:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ffff;
    margin-right: 15px;
  }
}
</style>
