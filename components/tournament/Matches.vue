<template>
  <AppTabPane name="matches" tabName="tournament-view">
    <template v-slot:content>
      <template v-for="i in 10">
        <MatchCard>
          <template #action>
            <button class="btn btn-success">Score</button>
            <button class="btn btn-success">Valider</button>
          </template>
          <template #information>
            <p class="match--information">
              Un justificatif est necessaire pour passer à la manche suivante
            </p></template
          >
        </MatchCard>
      </template>
    </template>
  </AppTabPane>
</template>

<script>
import MatchCard from "@/components/MatchCard.vue";
export default { components: { MatchCard } };
</script>

<style lang="scss">
.match {
  &--container {
    background: #ffff;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &--avatar {
    border-radius: 60px;
    height: 75px;
  }
  &--action {
    display: flex;
    justify-content: space-around;
  }
  &--information {
    font-size: 12px;
    color: red;
  }
}
</style>
