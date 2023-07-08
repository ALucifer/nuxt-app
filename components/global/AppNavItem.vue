<template>
  <li class="nav-item">
    <a
      class="nav-link"
      :id="name + '-tab'"
      data-toggle="tab"
      @click="setActiveTabByKeyName('tournament-view', name)"
      :class="{
        active: isActiveTabByKeyName('tournament-view', name),
      }"
      role="tab"
      aria-controls="{{ name }}"
      aria-selected="true"
      >{{ libelle ?? name }}</a
    >
  </li>
</template>

<script setup lang="ts">
import { useTabStore } from "@/store/tab";

defineProps({
  name: { type: String, required: true},
  libelle: { type: String, required: false }
})

const { isActiveTabByKeyName, setActiveTabByKeyName } = useTabStore()
</script>

<style scoped>
.nav-item:hover {
  cursor: pointer
}
.nav-item > a.active {
  cursor: auto;
}
</style>