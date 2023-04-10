<template>
  <header class="header">
    <div class="container">
      <div class="header-container nav-menu">
        <div class="nav-menu__logo">
          <NuxtLink :to="{ name: 'index' }" class="site-logo">
            <img src="/images/logo.png" alt="site-logo" />
          </NuxtLink>
        </div>
        <button
          class="navbar-toggler ml-auto collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>
        <nav class="navbar navbar-expand-lg p-0 nav-menu__navigation">
          <div class="navbar-collapse collapse" id="navbarSupportedContent">
            <ul class="navbar-nav main-menu ml-auto">
              <li>
                <NuxtLink :to="{ name: 'index' }">Home</NuxtLink>
              </li>

              <li>
                <NuxtLink :to="{ name: 'tournois' }">Tournois</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="{ name: 'contact' }">Contact</NuxtLink>
              </li>
            </ul>
            <hr class="separator" />
            <ul class="d-md-flex d-lg-none navbar-nav actions-menu ml-auto">
              <li>
                <a href="#">
                  Rechercher<img
                    src="/images/search_btn.png"
                    alt="icon"
                    class="search"
                  />
                </a>
              </li>
              <li v-if="!isAuthenticated">
                <NuxtLink :to="{ name: 'login' }">Login</NuxtLink>
              </li>
              <li v-if="!isAuthenticated">
                <NuxtLink :to="{ name: 'register' }">Inscription</NuxtLink>
              </li>
              <li v-if="isAuthenticated">
                <NuxtLink :to="{ name: 'profile' }">Profile</NuxtLink>
              </li>
              <li v-if="isAuthenticated">
                <a @click.prevent="logout()">Deconnexion</a>
              </li>
            </ul>
          </div>
        </nav>
        <div class="d-none d-lg-flex right-area nav-menu__actions">
          <div class="search-icon" v-if="isAuthenticated">
            <button
              class="button--action"
              @click.stop="searchGlobalActive = true"
            >
              <search-icon class="search--button" />
            </button>
          </div>

          <NuxtLink
            v-if="!isAuthenticated"
            :to="{ name: 'login' }"
            class="login-btn"
            >Login</NuxtLink
          >
          <NuxtLink
            v-if="!isAuthenticated"
            :to="{ name: 'register' }"
            class="cmn-btn"
            >Inscription</NuxtLink
          >
          <a v-if="isAuthenticated" href="#" class="user-link">
            <div class="user-link__heading" @click.prevent="toggle()">
              <span class="">
                {{ user.pseudo }}
              </span>
              <nuxt-img
                :src="avatar"
                placeholder="/user-placeholder.png"
                alt=""
                class="user-link__picture"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  </header>
  <SearchGlobal
    v-show="searchGlobalActive"
    @close="searchGlobalActive = false"
  />
</template>

<script>
import SearchGlobal from "@/components/SearchGlobal";
import { NotificationRegister } from "@/services/sse";
import { useAuthStore } from "@/store/auth";
import { useConversationStore } from "~~/store/conversation";
import { mapState, mapActions } from "pinia";
import useSidebar from "@/composables/useSidebar";

export default {
  components: { SearchGlobal },
  data() {
    return {
      userDropdownActive: false,
      searchGlobalActive: false,
    };
  },
  setup() {
    const { toggle } = useSidebar();
    return { toggle };
  },
  computed: {
    ...mapState(useAuthStore, {
      user: "getUser",
      isAuthenticated: "isAuthenticated",
    }),
    ...mapState(useConversationStore, ["getUnreadMessagesByConversationId"]),
    avatar() {
      if (this.user.avatar) {
        return this.user.avatar
      }
      return '/'
    }
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
  },
  mounted() {
    if (this.user.id) {
      NotificationRegister.registerToNewTeam(this.user);
    }
  },
};
</script>
<style lang="scss">
@import "@/assets/css/components/global/AppHeader.scss";
</style>
