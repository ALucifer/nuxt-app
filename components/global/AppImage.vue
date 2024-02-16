<template>
  <nuxt-img
      v-if="src"
      :src="src"
      placeholder
      alt=""
  />
  <nuxt-img
      v-else
      :src="placeholder"
      placeholder
      preload
      alt=""
  />
</template>

<script setup lang="ts">
interface Props {
  src ?: string|null,
  placeholder ?: string,
}

withDefaults(
    defineProps<Props>(),
    {
      placeholder: 'user-placeholder.png'
    }
)
</script>