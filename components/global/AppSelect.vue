<template>
  <client-only>
    <div
      class="nice-select"
      tabindex="0"
      :class="{ open: open }"
      @click="open = !open"
    >
      <span class="current">{{ customLibelle ? customLibelle : libelle }}</span>
      <ul class="list">
        <li
          data-value="Format du tournoi"
          class="option selected"
          @click.prevent="change({ id: undefined })"
        >
          {{ libelle }}
        </li>
        <li
          v-for="(item, index) in items"
          :key="index"
          :data-value="item.id"
          class="option"
          @click.prevent="change(item)"
        >
          {{ item.libelle }}
        </li>
      </ul>
    </div>
    <AppField
      type="hidden"
      :name="name"
    />
    <AppErrorMessage
      class="error"
      :name="name"
    />
  </client-only>
</template>

<script setup lang="ts">
defineProps({
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
})
const emit = defineEmits(['change'])

const open = ref(false)
const customLibelle = ref(null)

function change(item) {
  customLibelle.value = null
  if (item.libelle) {
    customLibelle.value = item.libelle
  }
  emit('change', { value: item.id })
}
</script>

<style lang="scss" scoped>
* + * {
  color: white;
}

.nice-select {
  color: var(--body-color);
}
</style>
