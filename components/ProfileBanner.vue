<template>
  <AppBanner :isDefault="true">
    <template v-slot:content>
      <div class="profile-banner">
        <div class="row justify-content-between">
          <div class="col-md-6">
            <div class="profile-banner__left profile-area">
              <div class="profile-photo">
                <AppAvatar
                  :editable="isOwnProfile"
                  :src="user.avatar"
                  @change="changeAvatar"
                />
              </div>
              <div
                class="profile-informations"
                :class="{ 'profile-informations--verified': user.verified }"
              >
                <h4>{{ user.pseudo }}</h4>
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
                :to="{ name: 'profile-messages', query: { user: user.id } }"
                >Message</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppBanner>
</template>

<script>
import { useAuthStore } from "../store/auth";
import { mapActions } from "pinia";

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    isOwnProfile: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions(useAuthStore, ["changeAvatar"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/css/components/profileBanner.scss";
</style>
