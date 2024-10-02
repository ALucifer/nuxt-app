<template>
  <div>
    <IntroductionElement />
    <PlayProcess />
  </div>
</template>

<script setup lang="ts">
import IntroductionElement from '~/components/IntroductionElement.vue'
import PlayProcess from '@/components/PlayProcess'

definePageMeta({
  auth: false,
  layout: 'custom',
})

useHead({
  title: 'Spots : Une platforme pour les gameurs fait par les gameurs',
})
</script>
