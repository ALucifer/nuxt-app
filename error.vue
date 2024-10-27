<template>
  <div class="spots">
    <AppHeader />
    <div class="main">
      <ErrorMessage :code="error.statusCode" />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import ErrorMessage from '~/components/ErrorMessage.vue'
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

useSeoMeta({
  titleTemplate: 'Erreur ' + props.error.statusCode,
})
</script>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
