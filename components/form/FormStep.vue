<template>
  <div v-if="shouldShow">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';

const currentIdx = inject('STEP_COUNTER').value++;
const formStepIdx = inject('CURRENT_STEP_INDEX');

const shouldShow = computed(() => {
  return currentIdx === formStepIdx.value;
});
</script>
