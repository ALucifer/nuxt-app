<template>
  <nuxt-img
      v-if="src"
      :src="src"
      :placeholder="usePlaceholder ? placeholder : false"
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
  usePlaceholder ?: Boolean,
}

withDefaults(
    defineProps<Props>(),
    {
      placeholder: 'user-placeholder.png',
      usePlaceholder: true,
    }
)
</script>