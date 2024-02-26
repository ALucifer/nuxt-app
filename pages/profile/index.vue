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
        <ul>
          <li>
            <a href="#general" :class="{'tab-active': tab === '#general' }">Général</a>
          </li>
          <li>
            <a href="#tournaments" :class="{'tab-active': tab === '#tournaments' }">Tournois</a>
          </li>
          <li>
            <a href="#bugs" :class="{'tab-active': tab === '#bugs' }">Bug report</a>
          </li>
        </ul>
      </div>
      <div class="profile-main">
        <div id="general" :class="{'active': tab === '#general' }">Général</div>
        <div id="tournaments" :class="{'active': tab === '#tournaments' }">
          <div class="pb-3">
            <h5>Gestion des tournois</h5>
            <p class="text-14">Tournois auquel vous êtes inscrit ou bien que vous avez créé</p>
          </div>
          <div>
            <p class="text-14">Trier par:
              <select class="selector-option">
                <option v-for="filter in filters" :value="filter.id">{{ filter.libelle }}</option>
              </select>
            </p>
          </div>
          <div class="a">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
          </div>
        </div>
        <div id="bugs" :class="{'active': tab === '#bugs' }">Bug report</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'profile'
})

useSeoMeta({
  title: 'Profile',
})

const { getUser } = useSecurity()

const tab = ref('')
const filters = ref([
  { id: 1, libelle: 'Mes tournois'},
  { id: 2, libelle: 'Mes participations'},
])
const route = useRoute()

watch(
    () => route.hash,
    function (newValue) {
      tab.value = newValue
    },
)

onMounted(() => {
  tab.value = ['#general', '#tournaments', '#bugs'].includes(route.hash) ? route.hash : '#general'
})

</script>

<style lang="scss" scoped>
.a {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.item {
  flex: 0 0 32%;
  padding: 8px;
  background-color: red;
  height: 150px;
}
.selector-option {
  background-color: white;
  font-weight: bold;
}

#general, #tournaments, #bugs {
  display: none;
}

#general.active, #tournaments.active, #bugs.active {
  display: flex;
}

#tournaments {
  display: flex;
  flex-direction: column;
}

.profile {
  &__container {
    width: 1200px;
    height: 800px;
    position: absolute;
    top: 20%;
    background-color: white;

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
    width: 15%;

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
  flex-grow: 1;
}

.container-main {
  display: flex;
  margin: 48px 16px 0 16px;
}
</style>
