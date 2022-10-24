<template>
  <div class="tournament-counter">
    <div class="time-parameter left">
      <h5>{{ dayBeginAt }}</h5>
      <span>{{ mounthBeginAt }}</span>
    </div>
    <div class="tournament-counter__date-area head">
      <div class="d-flex justify-content-center" :data-countdown="formattedAt">
        <h6>10</h6>
        <h6>10</h6>
        <h6>10</h6>
        <h6>10</h6>
      </div>
      <div class="time-parameter">
        <span>DAY</span>
        <span>HRS</span>
        <span>MIN</span>
        <span>SEC</span>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    beginAt: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formattedAt: dayjs(this.beginAt).format("YYYY/MM/DD"),
      dayBeginAt: dayjs(this.beginAt).format("DD"),
      mounthBeginAt: dayjs(this.beginAt).format("MMM"),
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/css/components/counterTournament.scss";
</style>
