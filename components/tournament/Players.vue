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

<script>
import { inject } from "vue";

export default {
  setup() {
    const tournament = inject("tournament");
    return { tournament: tournament.value };
  },
  methods: {
    getAvatar(avatar) {
      if (avatar) {
        return "data:image/svg+xml;base64," + avatar;
      }

      return avatar;
    },
  },
};
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
    background: #ffb9f2;
    margin-right: 15px;
  }
}
</style>
