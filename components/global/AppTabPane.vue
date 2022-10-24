<template>
  <div
    class="tab-pane fade"
    :class="{
      'show active': isActiveTabByKeyName(tabName, name),
    }"
    :id="name"
    role="tabpanel"
    :aria-labelledby="name + '-tab'"
  >
    <div class="container pb-120">
      <div class="row justify-content-center">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { useTabStore } from "~~/store/tab";
import { mapActions } from "pinia";

export default {
  props: {
    name: { type: String, required: true },
    tabName: { type: String, require: true },
  },
  methods: {
    ...mapActions(useTabStore, ["isActiveTabByKeyName"]),
  },
};
</script>

<style></style>
