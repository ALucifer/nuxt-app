<template>
  <NuxtLink v-slot="{ isActive, href, navigate }" v-bind="$props" custom>
    <a :href="href" :class="isActive ? 'active' : ''" @click="navigate">
      <slot />
    </a>
  </NuxtLink>
</template>
