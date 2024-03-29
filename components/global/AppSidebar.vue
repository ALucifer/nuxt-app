<template>
  <div class="offcanvas offcanvas-end" :class="{ show: isOpen() }" v-click-outside="() => close()" >
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
          <NuxtLink :to="{ name: 'profile-slug', params: { slug: 'general' } }" class="link-action--full" @click="toggle()">
            <account-icon class="me-2" />
            Profile
          </NuxtLink>
        </li>
        <li class="sidebar--menu-item">
          <NuxtLink :to="{ name: 'tournois-create'}" class="link-action--full" @click="toggle()">
            <plus-icon class="me-2" />
            Créer un tournoi
          </NuxtLink>
        </li>
        <li class="sidebar--menu-item">
          <button @click="logout()" class="link-action--full text-start text-white">
            <logout-icon class="me-2" />
            <span>Se deconnecter</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSidebar from "@/composables/useSidebar";

const { isOpen, toggle } = useSidebar();
const { close } = useSidebar()
const router = useRouter()

function logout () {
  const { signOut } = useAuth()

  signOut()
  close()
  router.push({ name: 'index' })
}
</script>

<style lang="scss">
.btn-action {
  background-color: inherit;
}
.offcanvas {
  width: 300px !important;
  background-color: #6610f2;
  color: white;
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
