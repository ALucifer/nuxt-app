<template>
  <div class="tournament-counter">
    <div class="time-parameter left">
      <h5>{{ dayBeginAt }}</h5>
      <span>{{ monthBeginAt }}</span>
    </div>
    <div class="tournament-counter__date-area head">
      <div
        class="d-flex justify-content-center"
        :data-countdown="formattedAt"
      >
        <h6>{{ jours }}</h6>
        <h6>{{ heures }}</h6>
        <h6>{{ minutes }}</h6>
        <h6>{{ secondes }}</h6>
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
import dayjs from 'dayjs'

const props = defineProps({ beginAt: { type: String, required: true } })

const formattedAt = dayjs(props.beginAt).format('YYYY/MM/DD')
const dayBeginAt = dayjs(props.beginAt).format('DD')
const monthBeginAt = dayjs(props.beginAt).format('MMM')

const jours = ref(0)
const heures = ref(0)
const minutes = ref(0)
const secondes = ref(0)

const { isAfterNow } = useDate()
const beginAt = dayjs(props.beginAt)
const showTimer = ref(false)

function updateTimer() {
  const diff = dayjs.duration(beginAt.diff(dayjs()))

  showTimer.value = isAfterNow(beginAt.toISOString())
  if (showTimer.value === true) {
    jours.value = diff.days()
    heures.value = diff.hours()
    minutes.value = diff.minutes()
    secondes.value = diff.seconds()
  }
}

onMounted(() => {
  if (showTimer.value) {
    setInterval(updateTimer, 1000)
  }
})
</script>

<style lang="scss">
@import "@/assets/css/components/counterTournament.scss";
</style>
