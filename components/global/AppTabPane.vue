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

<script setup lang="ts">
import { useTabStore } from "~/store/tab";
import { mapActions } from "pinia";

defineProps({
  name: { type: String, required: true },
  tabName: { type: String, require: true },
})

const { isActiveTabByKeyName } = useTabStore()
</script>

<style></style>
