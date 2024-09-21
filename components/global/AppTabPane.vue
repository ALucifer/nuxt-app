<template>
  <div
    :id="name"
    class="tab-pane fade"
    :class="{
      'show active': isActiveTabByKeyName(tabName, name),
    }"
    role="tabpanel"
    :aria-labelledby="name + '-tab'"
  >
    <div class="container pb-120">
      <div class="row justify-content-center">
        <slot name="content"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTabStore } from "~/store/tab";

defineProps({
  name: { type: String, required: true },
  tabName: { type: String, require: true },
})

const { isActiveTabByKeyName } = useTabStore()
</script>

<style></style>
