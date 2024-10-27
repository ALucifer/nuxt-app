<template>
  <input
    v-model="value"
    :type="type || 'text'"
    :placeholder="$attrs.placeholder"
  >
  <span
    v-if="errorMessage"
    class="error"
  >{{ errorMessage }}</span>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{ name: string, type: string }>()

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name, undefined, { validateOnValueUpdate: false })
</script>

<style scoped>
.error {
  color: #ff443d;
}
</style>
