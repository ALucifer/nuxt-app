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
          <div class="search-icon">
            <a
              style="padding: 40px 15px"
              @click.stop="searchGlobalActive = true"
            >
              <img src="/images/search_btn.png" alt="icon" />
            </a>
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
            <div
              class="user-link__heading"
              @click.prevent="userDropdownActive = !userDropdownActive"
              v-click-outside="() => (userDropdownActive = false)"
            >
              <span class="">
                {{ user.pseudo }}
              </span>
              <img :src="user.avatar" alt="" class="user-link__picture" />
            </div>
            <div
              class="user-link__actions"
              :class="{ 'active-drop': userDropdownActive }"
            >
              <div class="triangle-drop"></div>
              <ul class="user-dropdown dropdown-menu">
                <li class="user-dropdown__item">
                  <NuxtLink :to="{ name: 'profile' }">Profile</NuxtLink>
                </li>
                <li class="user-dropdown__item">
                  <a @click.prevent="logout()">Deconnexion</a>
                </li>
                <li class="user-dropdown__item">
                  <NuxtLink :to="{ name: 'profile-messages' }"
                    >Messages
                    <span
                      v-if="getUnreadMessagesByConversationId(null).length > 0"
                      class="badge rounded-pill bg-warning text-dark"
                      >{{
                        getUnreadMessagesByConversationId(null).length
                      }}</span
                    ></NuxtLink
                  >
                </li>
              </ul>
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

export default {
  components: { SearchGlobal },
  data() {
    return {
      userDropdownActive: false,
      searchGlobalActive: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, {
      user: "getUser",
      isAuthenticated: "isAuthenticated",
    }),
    ...mapState(useConversationStore, ["getUnreadMessagesByConversationId"]),
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
