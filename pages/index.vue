<template>
  <div>
    <Introduction />
    <PlayProcess />
  </div>
</template>

<script setup lang="ts">
import Introduction from "@/components/Introduction";
import PlayProcess from "@/components/PlayProcess";

definePageMeta({
  auth: false
})

useHead({
  title: "Spots : Une platforme pour les gameurs fait par les gameurs",
})
</script>
