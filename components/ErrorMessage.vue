<template>
  <section
    class="error-section"
    :class="{ 'error-section--404': code === 404, 'error-section--403': code === 403 }"
  >
    <div class="overlay pb-120 pt-120">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="main-content pt-120 pb-120 text-center">
              <h3>Whoops..</h3>
              <h5>{{ message }}</h5>
              <NuxtLink
                :to="{ name: 'register' }"
                class="cmn-btn"
              >Join now!</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  code: {
    type: Number,
    required: true,
    default: 404,
  },
})

const message = computed(() => {
  switch (props.code) {
    case 404:
      return 'Page not found.'
    case 403:
      return 'You are not authorized.'
    default:
      return 'An error occurred.'
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/error.scss";
</style>
