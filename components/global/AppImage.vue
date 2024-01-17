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
      alt=""
  />
</template>

<script setup lang="ts">
interface Props {
  src ?: String,
  placeholder ?: String,
}

withDefaults(
    defineProps<Props>(),
    {
      placeholder: 'user-placeholder.png'
    }
)
</script>