<template>
  <NuxtLink v-bind="$props" custom v-slot="{ isActive, href, navigate }">
    <a :href="href" @click="navigate" :class="isActive ? 'active' : ''">
      <slot />
    </a>
  </NuxtLink>
</template>
