<template>
  <AppHeader />
  <div class="main">
    <ErrorMessage />
  </div>
</template>

<script setup lang="ts">
import ErrorMessage from '~/components/ErrorMessage.vue'

useSeoMeta({
  titleTemplate: 'Erreur 404',
})
</script>
