<template>
  <div ref="observerTemplate" class="inersection-observer"></div>
</template>
<script setup lang="ts">
const props = defineProps({ done: { type: Boolean, default: false }})
const emit = defineEmits(['load'])
let observer: IntersectionObserver = null
const observerTemplate = ref()

onMounted(() => {
  observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            emit('load')
          }
        })
      },
      {
        root: null,
        rootMargin: '10px',
        threshold: 0.8,
      }
  )
  observer.observe(observerTemplate.value)
})

onBeforeUnmount(() => {
  observer.unobserve(observerTemplate.value)
})
</script>
<style scoped>
div {
  position: relative;
  z-index: -1;
  pointer-events: none;
  bottom: 200px;
}
</style>
