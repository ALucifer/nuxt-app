<template>
  <div class="profile__container">
    <div class="profile__banner">
      <div class="profile__banner-user-info">
        <AppAvatar class="profile__avatar" :src="getUser().avatar" />
      </div>
      <div class="profile__banner-user-pseudo">{{ getUser().pseudo }}</div>
    </div>
    <div class="container-main">
      <div class="profile__sidebar">
        <ul class="d-none d-sm-block">
          <li>
            <NuxtLink
              :to="{ name: 'profile-slug', params: { slug: 'general' }}"
              :class="{ 'tab-active': $route.params.slug === 'general'}">
              Général
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'profile-slug', params: { slug: 'tournaments' }}"
              :class="{ 'tab-active': $route.params.slug === 'tournaments'}">
              Tournois
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'profile-slug', params: { slug: 'bugs' }}"
              :class="{ 'tab-active': $route.params.slug === 'bugs'}">
              Bug report
            </NuxtLink>
          </li>
        </ul>
        <div class="d-block d-sm-none">
          <NuxtLink
              class="mobile-tab"
              :to="{ name: 'profile-slug', params: { slug: 'general' }}"
              :class="{ 'mobile-tab-active': $route.params.slug === 'general'}">
            Général
          </NuxtLink>
          <NuxtLink
              class="mobile-tab"
              :to="{ name: 'profile-slug', params: { slug: 'tournaments' }}"
              :class="{ 'mobile-tab-active': $route.params.slug === 'tournaments'}">
            Tournois
          </NuxtLink>
          <NuxtLink
              class="mobile-tab"
              :to="{ name: 'profile-slug', params: { slug: 'bugs' }}"
              :class="{ 'mobile-tab-active': $route.params.slug === 'bugs'}">
            Bug report
          </NuxtLink>
        </div>
      </div>
      <div class="profile-main">
        <div class="general active" v-if="$route.params.slug === 'general'">Général</div>
        <div class="tournaments active" v-if="$route.params.slug === 'tournaments'">
          <TournamentListing />
        </div>
        <div class="bugs" v-if="$route.params.slug === 'bugs'">Bug report</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TournamentListing from "~/components/profile/TournamentListing.vue";

definePageMeta({
  layout: 'profile',
  validate: async (route) => {
    return ['general', 'tournaments', 'bugs'].includes(<string>route.params.slug)
  }
})

useSeoMeta({
  title: 'Profile',
})

const { getUser } = useSecurity()
</script>

<style lang="scss">
.general, .tournaments, .bugs {
  display: none;
}

.general.active, .tournaments.active, .bugs.active {
  display: flex;
}

.tournaments.active {
  flex-grow: 1;
  flex-direction: column;
}

.profile {
  &__container {
    display: flex;
    flex-direction: column;
    width: 1200px;
    min-height: 800px;
    position: absolute;
    top: 20%;
    background-color: white;

    @media (max-width: 1199px) {
      width: 900px;
    }

    @media (max-width: 991px) {
      width: 800px;
    }

    @media (max-width: 767px) {
      width: 600px;
    }

    @media (max-width: 576px)  {
      width: 400px;
    }


    > * + * {
      color: black;
    }
  }

  &__banner {
    display: flex;
    flex-direction: column;

    &-user-info {
      background-image: url('~/assets/images/profile-banner.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      height: 100px;
      width: 100%;
      object-fit: cover;
      position: relative;
    }

    &-user-pseudo {
      margin-left: 125px;
      font-size: 16px;
    }
  }

  &__avatar {
    position: absolute;
    bottom: -40px;
    margin-left: 40px;
    height: 80px;
    width: 80px;
    background-color: white;
    border-radius: 50%;
    border: 2px solid white;
  }

  &__sidebar {
    color: black!important;
    width: 20%;

    @media (max-width: 576px)  {
      width: 100%;
    }

    .mobile-tab {
      color: black;
      border: 1px solid darkgrey;
      padding: 8px;
      margin: 0 4px;
      border-radius: 8px;

      &-active {
        background-color: black;
        color: white;
      }
    }

    > ul > li > a {
      font-size: 24px;
      color: black;
      padding: 4px;

      &.tab-active {
       color: red;
      }
    }
  }
}

.profile-main {
  display: flex;
  flex-grow: 1;
}

.container-main {
  display: flex;
  flex-grow: 1;
  gap: 16px;
  margin: 48px 16px 16px 16px;

  @media (max-width: 576px)  {
    flex-direction: column;
  }

}
</style>
