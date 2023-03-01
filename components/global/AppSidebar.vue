<template>
  <div class="offcanvas offcanvas-end" :class="{ show: isOpen() }">
    <div class="offcanvas-header">
      <button
        type="button"
        class="btn-close"
        @click="toggle()"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul>
        <li class="sidebar--menu-item">
          <NuxtLink :to="{ name: 'profile' }" class="link-action--full">
            <account-icon class="me-2" />
            Profile
          </NuxtLink>
        </li>
        <li class="sidebar--menu-item">
          <button @click="auth_logout()" class="link-action--full text-start">
            <logout-icon class="me-2" />
            <span>Se deconnecter</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import useSidebar from "@/composables/useSidebar";
import auth from "~~/mixins/auth";

export default {
  setup() {
    const { isOpen, toggle } = useSidebar();
    return { isOpen, toggle };
  },
  mixins: [auth],
};
</script>

<style lang="scss">
.btn-action {
  background-color: inherit;
}
.offcanvas {
  width: 350px !important;
  background-color: #6610f2;
}

.sidebar {
  &--menu-item {
    &:hover {
      background-color: #4e12af;
      border-radius: 6px;
    }
  }
}

.link-action {
  &--full {
    padding: 16px;
    background-color: inherit;
    width: 100%;
    height: 100%;
  }
}
</style>
