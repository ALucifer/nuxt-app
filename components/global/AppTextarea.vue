<template>
  <textarea
    :id="$attrs.id"
    v-model="value"
    :name="name"
    :placeholder="$attrs.placeholder"
    @keydown="onKeydown"
  />
  <span
    v-if="errorMessage"
    class="error"
    role="alert"
  >{{ errorMessage }}</span>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const { value, errorMessage } = useField(() => props.name, undefined, { validateOnValueUpdate: false })
const emits = defineEmits(['keydown'])

const onKeydown = (e: KeyboardEvent) => {
  emits('keydown', e)
}
</script>

<style scoped>
.error {
  color: #ff443d;
}
</style>
