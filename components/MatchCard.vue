<template>
  <div class="col-10 match--container mx-auto">
    <AppAvatar
      class="match--avatar"
      :src="getAvatar(firstTeam.avatar)"
    />
    <span>{{ firstTeam.libelle }}</span>
    <span class="match--middle">
      <div class="match--action">
        <slot name="action" />
      </div>
      <slot name="information" />
    </span>
    <span>{{ secondTeam.libelle }}</span>
    <AppAvatar
      class="match--avatar"
      :src="getAvatar(secondTeam.avatar)"
    />
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
  },
  backgroundColor: {
    type: String,
    default: '#ffff',
  },
})
function getAvatar(avatar: string) {
  return 'data:image/svg+xml;base64,' + avatar
}
</script>

<style lang="scss" scoped>
.match {
  &--container {
    background: v-bind('backgroundColor');
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &--middle {
    display: inline-flex;
    flex-direction: column;
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
