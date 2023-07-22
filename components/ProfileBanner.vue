<template>
  <AppBanner>
    <template v-slot:content>
      <div class="profile-banner">
        <div class="row justify-content-between">
          <div class="col-md-6">
            <div class="profile-banner__left profile-area">
              <div class="profile-photo">
                <AppAvatar
                  :editable="isOwnProfile"
                  src="https://imgur.com/oxJYBVT.jpg"
                  @change="changeAvatar"
                />
              </div>
              <div
                class="profile-informations"
                :class="{ 'profile-informations--verified': true }"
              >
                <h4>{{ auth.user.pseudo }}</h4>
              </div>
            </div>
          </div>
          <div class="col-md-4 profile-banner__right justify-content-md-end">
            <div class="profile-banner__actions">
              <NuxtLink
                v-if="isOwnProfile"
                :to="{ name: 'profile-messages' }"
                class="cmn-btn"
                >Mes messages</NuxtLink
              >
              <NuxtLink
                v-else
                class="cmn-btn"
                :to="{ name: 'profile-messages', query: { user: auth.user.id } }"
                >Message</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppBanner>
</template>

<script setup lang="ts">

import {useAuthStore} from "~/store/auth";

const { data: auth } = useAuth()
defineProps({ user: { type: Object, required: true }, isOwnProfile: { type: Boolean, default: false }})

const { changeAvatar } = useAuthStore()
</script>

<style lang="scss">
@import "@/assets/css/components/profileBanner.scss";
</style>
