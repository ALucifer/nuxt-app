<template>
  <div class="col-10 match--container">
    <AppAvatar class="match--avatar" />
    <span>Equipe A</span>
    <span>
      <div class="match--action">
        <slot name="action"></slot>
      </div>
      <slot name="information" />
    </span>
    <span>Equipe B</span>
    <AppAvatar class="match--avatar" />
  </div>
</template>

<script>
export default {};
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
