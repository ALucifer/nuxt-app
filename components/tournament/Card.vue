<template>
  <div class="card__format">
    <h6>{{ title }}</h6>
    <p class="text-sm">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/components/tournament/card.scss";
</style>
