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

<script>
import { mapActions } from "pinia";
import { useTabStore } from "@/store/tab";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    libelle: {
      type: String,
      required: false,
    },
  },
  methods: {
    ...mapActions(useTabStore, [
      "isActiveTabByKeyName",
      "setActiveTabByKeyName",
    ]),
  },
};
</script>

<style></style>
