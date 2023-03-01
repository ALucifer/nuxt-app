<template>
  <AppBanner>
    <template v-slot:content>
      <carousel v-show="items.length > 0" :items="items" />
    </template>
  </AppBanner>
</template>

<script>
import Carousel from "@/components/Carousel";

export default {
  components: {
    Carousel,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getClass(isRegisterOpen) {
      return isRegisterOpen ? "" : "text-danger";
    },
  },
};
</script>

<style></style>
