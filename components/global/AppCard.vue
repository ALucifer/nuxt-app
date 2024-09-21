<template>
  <div class="card-admin">
    <div class="card-admin__top">
      <slot name="information"/>
      <slot name="icon"/>
    </div>
    <div
      class="card-admin__bottom"
      :class="'card-admin__bottom--' + color"
    >
      <slot name="footer"/>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  color: { type: String, default: 'taupe' },
  width: { type: String, default: '33%' }
})
</script>

<style scoped lang="scss">
$colors: (taupe: #6C5875, bleu: #604DDB, jaune: #E0CB86, marron: #A87E2A);

.card-admin {
  height: 150px;
  background-color: white;
  width: v-bind('width');
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 8px;

  &__top {
    width: 100%;
    height: 65%;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__bottom {
    width: 100%;
    height: 35%;
    display: flex;
    align-items: center;
    padding: 6px;

    @each $name, $code in $colors {
      &--#{$name} {
        background-color: #{$code};
      }
    }
  }
}
</style>