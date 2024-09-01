<template>
  <div class="spots-container">
    <div class="profile__container">
      <div class="profile__banner">
        <div class="profile__banner-user-info">
          <AppAvatar
            class="profile__avatar"
            :src="getUser().avatar"
            :editable="true"
            @change="handleChangeAvatar($event)"
          />
        </div>
        <div class="profile__banner-user-pseudo">{{ getUser().pseudo }}</div>
      </div>
      <div class="container-main">
        <div class="profile__sidebar">
          <ul class="d-none d-sm-block">
            <li>
              <NuxtLink
                class="tab-active"
                :to="{ name: 'profile-slug', params: { slug: 'tournaments' }}"
              >
                Tournois
              </NuxtLink>
            </li>
          </ul>
          <div class="d-block d-sm-none">
            <NuxtLink
                class="mobile-tab mobile-tab-active"
                :to="{ name: 'profile-slug', params: { slug: 'tournaments' }}"
            >
              Tournois
            </NuxtLink>
          </div>
        </div>
        <div class="profile-main">
          <div class="tournaments active">
            <TournamentListing />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TournamentListing from "~/components/profile/TournamentListing.vue";

definePageMeta({
  layout: 'profile',
  validate: async (route) => {
    return ['general', 'tournaments'].includes(<string>route.params.slug)
  }
})

useSeoMeta({
  title: 'Profile',
})

const { getUser } = useSecurity()
const auth = useAuth()

async function handleChangeAvatar(e: any) {
  let formData = new FormData();
  formData.append("avatar", e.target.files[0]);

  const { errorMessage } = useFlashMessages()

  const { error } = await useFetch(
      '/api/user/uploadAvatar',
      {
        method: 'POST',
        body: formData,
      }
  )

  if(error.value !== null) {
    errorMessage('Une erreur est survenu lors de la mise à jour de votre avatar.')
  } else {
    await auth.getSession({ required: false })
  }
}
</script>

<style lang="scss">
.avatar {
  &-edit {
    width: 100%;
    height: 100%;
  }

  &-img {
    position: initial;
    margin-left: initial;
    border-radius: 50%;
  }
}

.spots-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 1;
}

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

    :hover .avatar-img {
      opacity: 0.25;
    }
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
