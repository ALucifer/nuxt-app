<template>
  <div class="search-popup">
    <form
      action=""
      class="search-form"
      v-click-outside="() => this.$emit('close')"
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
              <img :src="user.avatar" class="search-avatar" alt="" />
              {{ user.pseudo }}
            </NuxtLink>
          </li>
        </template>
      </ul>
    </form>
  </div>
</template>

<script>
import { search } from "~~/client/user";

export default {
  data() {
    return {
      text: "",
      searching: false,
      users: [],
      searchCount: 0,
    };
  },
  methods: {
    async suggestUsers() {
      this.searching = false;
      if (this.isValidSearch()) {
        this.searching = true;
        this.users = await search.user(this.text);
        this.searching = false;
      }
    },
    isValidSearch() {
      return this.text.length >= 4;
    },
    userNotFound() {
      return this.users.length <= 0 && this.isValidSearch();
    },
  },
};
</script>

<style>
@import "@/assets/css/components/searchGlobal.scss";
</style>
