<template>
  <div class="container" style="margin-top: 150px; margin-bottom: 150px">
    <div class="row justify-content-center">
      Mon futur container du profile d'un autre user {{ $route.params.id }}
    </div>
  </div>
</template>

<script>
definePageMeta({
  middleware: "auth",
});

export default {};
</script>

<style></style>
