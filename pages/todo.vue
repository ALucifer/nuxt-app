<template>
  <h1>Hello</h1>
</template>

<script lang="ts" setup>
import {useRequestHeaders} from "#imports";

const headers = useRequestHeaders(['cookie']) as HeadersInit
await useAsyncData(
    'test',
    () => $fetch('/api/conversations/list', { headers }).then(() => true)
)
</script>