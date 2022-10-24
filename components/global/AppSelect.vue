<template>
  <div>
    <div
      class="nice-select"
      @click="open = !open"
      tabindex="0"
      :class="{ open: open }"
    >
      <span class="current">{{ customLibelle ? customLibelle : libelle }}</span>
      <ul class="list">
        <li
          data-value="Format du tournoi"
          class="option selected"
          @click.prevent="change({ id: null })"
        >
          {{ libelle }}
        </li>
        <li
          v-for="item in items"
          :data-value="item.id"
          class="option"
          @click.prevent="change(item)"
        >
          {{ item.libelle }}
        </li>
      </ul>
    </div>
    <AppField type="hidden" :name="name" />
    <AppErrorMessage class="error" :name="name" />
  </div>
</template>

<script>
export default {
  props: {
    libelle: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  emits: ["change"],
  data() {
    return {
      open: false,
      customLibelle: null,
    };
  },
  methods: {
    change(item) {
      this.customLibelle = null;
      if (item.libelle) {
        this.customLibelle = item.libelle;
      }
      this.$emit("change", { value: item.id });
    },
  },
};
</script>

<style></style>
