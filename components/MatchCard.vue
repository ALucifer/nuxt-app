<template>
  <div class="col-10 match--container">
    <AppAvatar class="match--avatar" :src="getAvatar(firstTeam.avatar)" />
    <span>{{ firstTeam.libelle }}</span>
    <span>
      <div class="match--action">
        <slot name="action"></slot>
      </div>
      <slot name="information" />
    </span>
    <span>{{ secondTeam.libelle }}</span>
    <AppAvatar class="match--avatar" :src="getAvatar(secondTeam.avatar)" />
  </div>
</template>

<script lang="ts" setup>

defineProps({
  firstTeam: {
    type: Object,
    required: true,
  },
  secondTeam: {
    type: Object,
    required: true,
  }
})
function getAvatar(avatar: string) {
  if (avatar === '') {
    return "data:image/svg+xml;base64," + avatar;
  }

  return avatar;
}
</script>
<style lang="scss" scoped>
.match {
  &--container {
    background: #ffff;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &--avatar {
    border-radius: 60px;
    height: 75px;
  }
  &--action {
    display: flex;
    justify-content: space-around;
  }
  &--information {
    font-size: 12px;
    color: red;
  }
}

span,
p {
  color: black;
}
</style>
