<template>
  <textarea
      v-model="value"
      :name="name"
      :id="$attrs.id"
      :placeholder="$attrs.placeholder"
  />
  <span v-if="errorMessage" class="error" role="alert">{{ errorMessage }}</span>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const { value, errorMessage } = useField(() => props.name)
</script>

<style scoped>
.error {
  color: #ff443d;
}
</style>