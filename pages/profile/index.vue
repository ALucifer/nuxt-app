<template>
  <div>
    <UserStatistiques />
  </div>
</template>

<script setup lang="ts">
import UserStatistiques from "~/components/UserStatistiques.vue";

definePageMeta({
  layout: 'profile'
})

useSeoMeta({
  title: 'Profile',
})
</script>

<style></style>
