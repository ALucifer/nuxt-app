<template>
  <div
    ref="observerTemplate"
    class="intersection-observer"
    :class="{ 'intersection-observer--done': done }"
  >
    <AppSpinner v-if="!done" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ done: { type: Boolean, default: false } })
const emit = defineEmits(['load'])
const observer = ref()
const observerTemplate = ref()

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !props.done) {
          emit('load')
        }
      })
    },
    {
      root: null,
      rootMargin: '10px',
      threshold: 0.8,
    },
  )
  observer.value.observe(observerTemplate.value)
})

onBeforeUnmount(() => {
  observer.value.unobserve(observerTemplate.value)
})
</script>

<style lang="scss">
.intersection-observer {
  display: flex;
  justify-content: center;
  padding: 36px;
  position: relative;
  pointer-events: none;

  &--done {
    padding: 0;
  }
}
</style>
