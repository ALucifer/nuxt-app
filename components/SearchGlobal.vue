<template>
  <div class="search-popup">
    <form
      v-click-outside="() => emit('close')"
      class="search-form"
    >
      <input
        v-model="text"
        type="text"
        placeholder="Rechercher"
        @keyup="suggestUsers"
      >
      <ul v-if="isValidSearch() || searching" style="padding: 8px">
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
          <li v-for="user in users" :key="user.id" class="p-2">
            <NuxtLink
              :to="{ name: 'user-id-profile', params: { id: user.id } }"
              class="search-link"
              @click="$emit('close')"
            >
              <AppAvatar class="search-avatar" :src="user.avatar" />
              {{ user.pseudo }}
            </NuxtLink>
          </li>
        </template>
      </ul>
    </form>
  </div>
</template>

<script setup lang="ts">
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
        const { data } = await useFetch(
            '/api/user/search',
            {
              method: 'POST',
              body: {
                text: text.value
              }
            }
        )
        users.value = data.value
        searching.value = false;
    }
}
</script>

<style>
@import "@/assets/css/components/searchGlobal.scss";
</style>
