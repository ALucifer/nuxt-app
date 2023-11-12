<template>
  <StepItem v-for="(step, index) in steps" :libelle="step" :number="index + 1" :need-divider="index !== 0" />
</template>

<script setup lang="ts">
import StepItem from "~/components/stepper/StepItem.vue";

const steps = ['Informations', 'Paraètres', 'Déroulé', 'Extra']
</script>

<style scoped lang="scss">

</style>