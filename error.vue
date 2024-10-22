<template>
  <AppHeader />
  <div class="main">
    <ErrorMessage :code="error?.statusCode" />
  </div>
</template>

<script setup lang="ts">
import ErrorMessage from '~/components/ErrorMessage.vue'
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

useSeoMeta({
  titleTemplate: 'Erreur ' + props.error?.statusCode,
})
</script>
