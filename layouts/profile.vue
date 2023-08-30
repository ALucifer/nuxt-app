<template>
    <div>
      <ProfileBanner :isOwnProfile="true" :user="user" v-if="user" />
      <slot />
    </div>
</template>

<script setup lang="ts">
import ProfileBanner from "@/components/ProfileBanner";

const { data } = useAuth()

const user = data.value.user
</script>

<style lang="scss">
.right {
  > .text-sm {
    color: var(--body-color);
  }
}

.tournaments-slider {
  margin-top: 80px;
}
.tournaments-slider .top-area h5 {
  text-transform: uppercase;
  margin-bottom: 10px;
}
.tournaments-slider .top-area {
  margin-bottom: 30px;
}
.single-slide {
  padding: 0 10px;
}
</style>
