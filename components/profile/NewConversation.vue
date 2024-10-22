<template>
  <h1>Hello world !</h1>
  <pre>
    {{ conversation }}
  </pre>
</template>

<script setup lang="ts">
import type { NewConversationMessage } from '~/types/api/conversations'

defineProps<{ conversation: NewConversationMessage }>()
</script>
