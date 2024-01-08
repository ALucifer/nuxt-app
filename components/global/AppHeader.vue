<template>
  <header class="header">
    <div class="container">
      <div class="header-container nav-menu">
        <div class="nav-menu__logo">
          <NuxtLink :to="{ name: 'index' }" class="site-logo">
            <NuxtImg src="/images/logo.png" alt="site-logo" class="logo-header"/>
          </NuxtLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                  aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <menu-icon />
          </button>
        </div>

        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <NuxtLink class="nav-link" :to="{ name: 'index' }">Home</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" :to="{ name: 'tournois' }">Tournois</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" :to="{ name: 'contact' }">Contact</NuxtLink>
              </li>
              <hr class="separator"/>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  Rechercher<nuxt-img
                    src="/images/search_btn.png"
                    alt="icon"
                    class="search"
                />
                </a>
              </li>
              <li class="nav-item" v-if="status !== 'authenticated'">
                <NuxtLink class="nav-link" :to="{ name: 'login' }">Login</NuxtLink>
              </li>
              <li class="nav-item" v-if="status !== 'authenticated'">
                <NuxtLink class="nav-link" :to="{ name: 'register' }">Inscription</NuxtLink>
              </li>
              <li class="nav-item" v-if="status === 'authenticated'">
                <NuxtLink class="nav-link" :to="{ name: 'profile' }">Profile</NuxtLink>
              </li>
              <li class="nav-item" v-if="status === 'authenticated'">
                <a class="nav-link" @click="signOut()">Deconnexion</a>
              </li>
            </ul>
          </div>
        </div>
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
          </div>
        </nav>
        <div class="d-none d-lg-flex right-area nav-menu__actions">
          <div class="search-icon" v-if="status === 'authenticated'">
            <button
                class="button--action"
                @click.stop="searchGlobalActive = true"
            >
              <search-icon class="search--button"/>
            </button>
          </div>

          <NuxtLink
              v-if="status !== 'authenticated'"
              :to="{ name: 'login' }"
              class="login-btn"
          >Login
          </NuxtLink
          >
          <NuxtLink
              v-if="status !== 'authenticated'"
              :to="{ name: 'register' }"
              class="cmn-btn"
          >Inscription
          </NuxtLink
          >
          <a v-if="status === 'authenticated'" href="#" class="user-link">
            <div class="user-link__heading" @click.stop="toggle()">
              <span class="">
                {{ data.user.pseudo }}
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

<script setup lang="ts">
import SearchGlobal from "@/components/SearchGlobal";
import useSidebar from "@/composables/useSidebar";

const {toggle} = useSidebar()
const searchGlobalActive = ref(false)

const {status, data, signOut} = useAuth()

const avatar = computed(() => data.value!.user!.avatar ?? '/')
</script>
<style lang="scss">
@import "@/assets/css/components/global/AppHeader.scss";
</style>

<style lang="scss">
.search {
  margin-left: 8px;
}
</style>