<template>
  <div v-if="needDivider" class="step__divider"></div>
  <span class="step__number">{{ number }}</span>
  <span>{{ libelle }}</span>
</template>

<script setup lang="ts">
defineProps({
  needDivider: { type: Boolean, default: false },
  number: { type: Number, default: 1},
  libelle: { type: String, required: true }
})
</script>

<style scoped lang="scss">
.step {
  &__number {
    margin-right: 4px;
    border: 1px solid;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    text-align: center;
    vertical-align: center;
  }

  &__divider {
    width: 75px;
    height: 2px;
    background: white;
    margin: 0 8px;
  }
}
</style>