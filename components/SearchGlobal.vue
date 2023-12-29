<template>
  <div class="search-popup">
    <form
      action=""
      class="search-form"
      v-click-outside="() => emit('close')"
    >
      <input
        v-model="text"
        @keyup="suggestUsers"
        type="text"
        placeholder="Rechercher"
      />
      <ul style="padding: 8px" v-if="isValidSearch() || searching">
        <li v-if="searching">
          <div class="text-center p-2">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </li>
        <li v-if="userNotFound()" class="p-2">
          <p>
            Pas d'utilisateur ayant le pseudo <b>{{ text }}</b>
          </p>
        </li>
        <template v-if="users.length > 0 && !searching">
          <li v-for="user in users" class="p-2">
            <NuxtLink
              :to="{ name: 'user-id-profile', params: { id: user.id } }"
              class="search-link"
              @click="this.$emit('close')"
            >
              <nuxt-img
                :src="user.avatar"
                placeholder="/user-placeholder.png"
                class="search-avatar"
                alt=""
              />
              {{ user.pseudo }}
            </NuxtLink>
          </li>
        </template>
      </ul>
    </form>
  </div>
</template>

<script setup lang="ts">
import SearchClient from "~/app/client/SearchClient";

const searchClient = new SearchClient()

const text = ref('')
const searching = ref(false)
const users = ref([])

const emit = defineEmits(['close'])

function isValidSearch() {
    return text.value.length >= 4
}

function userNotFound() {
    return users.value.length <= 0 && isValidSearch()
}

async function suggestUsers() {
    searching.value = false;
    if (isValidSearch()) {
        searching.value = true;
        users.value = await searchClient.user(text.value);
        searching.value = false;
    }
}
</script>

<style>
@import "@/assets/css/components/searchGlobal.scss";
</style>
