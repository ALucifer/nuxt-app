<template>
  <li class="nav-item">
    <a
      :id="name + '-tab'"
      class="nav-link"
      data-toggle="tab"
      :class="{
        active: isActiveTabByKeyName('tournament-view', name),
      }"
      role="tab"
      aria-controls="{{ name }}"
      aria-selected="true"
      @click="setActiveTabByKeyName('tournament-view', name)"
      >{{ libelle ?? name }}</a
    >
  </li>
</template>

<script setup lang="ts">
import { useTabStore } from "~/store/tab";

defineProps({
  name: { type: String, required: true},
  libelle: { type: String, required: false, default: "Add libelle for this tab" }
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