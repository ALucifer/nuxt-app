<template>
  <div class="tournament-counter">
    <div class="time-parameter left">
      <h5>{{ dayBeginAt }}</h5>
      <span>{{ monthBeginAt }}</span>
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

<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps({ beginAt: { type: String, required: true }})

const formattedAt = ref(dayjs(props.beginAt).format('YYYY/MM/DD'))
const dayBeginAt = ref(dayjs(props.beginAt).format('DD'))
const monthBeginAt = ref(dayjs(props.beginAt).format('MMM'))
</script>

<style lang="scss">
@import "@/assets/css/components/counterTournament.scss";
</style>
