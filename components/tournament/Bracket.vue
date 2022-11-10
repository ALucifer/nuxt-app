<template>
  <AppTabPane name="bracket" tabName="tournament-view">
    <template v-slot:content>
      <div class="row">
        <img :src="tournament.value.image_bracket" alt="" />
      </div>
    </template>
  </AppTabPane>
</template>

<script>
export default {
  inject: ["tournament"],
};
</script>

<style></style>
