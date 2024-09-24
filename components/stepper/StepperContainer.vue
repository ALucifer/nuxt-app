<template>
  <div class="stepper__container">
    <StepItem
        v-for="(step, index) in steps"
        :key="index"
        :libelle="step"
        :number="index + 1"
        :need-divider="index !== 0"
        :current="current + 1"
    />
  </div>
</template>

<script setup lang="ts">
import StepItem from "~/components/stepper/StepItem.vue";

defineProps({ current: { type: Number, required: true  }})

const steps = ['Informations', 'Paramètres', 'Déroulé']
</script>

<style lang="scss" scoped>
.stepper {
  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px;
    color: white;
  }
}
</style>