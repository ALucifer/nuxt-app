<template>
  <content-loader
    viewBox="0 0 700 80"
    :speed="2"
    primaryColor="#0e063d"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="572" height="16" />
    <rect x="320" y="30" rx="0" ry="0" width="250" height="16" />
    <rect x="31" y="69" rx="0" ry="0" width="293" height="0" />
    <rect x="0" y="30" rx="0" ry="0" width="300" height="16" />
    <rect x="0" y="56" rx="0" ry="0" width="571" height="42" />
  </content-loader>
</template>

<script setup lang="ts">
import { ContentLoader } from "vue-content-loader";
</script>
