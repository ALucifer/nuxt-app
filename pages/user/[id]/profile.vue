<template>
  <div
    class="container"
    style="margin-top: 150px; margin-bottom: 150px; color: red"
  >
    <div class="row justify-content-center">
      Mon futur container du profile d'un autre user {{ $route.params.id }}
      <nuxt-link :to="{ name: 'profile-messages', query: { user: user.id } }">Envoyer un message</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UserModel } from "~/app/models/user.model";

definePageMeta({
  auth: false
})

const route = useRoute()
const { data: user } = await useFetch<UserModel>(`/api/user/${route.params.id}`)
</script>

<style></style>
