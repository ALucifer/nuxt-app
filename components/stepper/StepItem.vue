<template>
  <div v-if="needDivider" class="step__divider" :class="{ disable: current < number }"/>
  <span v-if="showNumber" class="step__number" :class="{ disable: current < number }">{{ number }}</span>
  <span v-else class="step__icon">
    <check-icon :size="18" fill-color="#3B2D91" />
  </span>
  <span class="step__text" :class="{ disable: current < number }">{{ libelle }}</span>
</template>

<script setup lang="ts">
const props = defineProps({
  needDivider: { type: Boolean, default: false },
  number: { type: Number, default: 1},
  libelle: { type: String, required: true },
  current: { type: Number, required: true }
})

const showNumber = computed(() => {
  return props.current <= props.number;
})
</script>

<style scoped lang="scss">
.disable {
  opacity: 20%;
}
.step {
  &__number {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    border: 1px solid;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    font-size: 16px;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    border: 1px solid;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    background-color: white;
  }

  &__divider {
    width: 75px;
    height: 2px;
    background: white;
    margin: 0 8px;
  }

  &__text {
    font-size: 12px;
  }
}
</style>