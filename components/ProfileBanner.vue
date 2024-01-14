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
                  :src="user.avatar"
                  @change="changeAvatar"
                />
              </div>
              <div
                class="profile-informations"
                :class="{ 'profile-informations--verified': true }"
              >
                <h4>{{ user.pseudo }}</h4>
                <button @click="test">Update</button>
              </div>
            </div>
          </div>
          <div class="col-md-4 profile-banner__right justify-content-md-end">
            <div class="profile-banner__actions">
              <NuxtLink
                v-if="isOwnProfile"
                :to="{ name: 'profile-messages' }"
                prefetch
                class="cmn-btn"
                >Mes messages</NuxtLink
              >
              <NuxtLink
                v-else
                class="cmn-btn"
                :to="{ name: 'profile-messages', query: { user: auth.id } }"
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
const { getUser: auth } = useSecurity()
defineProps({ user: { type: Object, required: true }, isOwnProfile: { type: Boolean, default: false }})

function changeAvatar(e: Event) {
  let formData = new FormData();
  formData.append("avatar", e.target.files[0]);

  const { errorMessage } = useFlashMessages()
  const status = $fetch(
      '/api/user/uploadAvatar',
      {
        method: 'POST',
        body: formData
      }
  )

  if(!status) {
    errorMessage('Une erreur est survenu lors de la mise à jour de votre avatar.')
  }
}
</script>

<style lang="scss">
@import "@/assets/css/components/profileBanner.scss";
</style>
