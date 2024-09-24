<template>
  <nav class="m-auto">
    <ul class="pagination">
      <li v-if="currentPage !== 1" class="page-item">
        <NuxtLink
          class="page-link"
          :to="{
            name: routeName,
            query: previousLink,
          }"
          >Previous</NuxtLink
        >
      </li>
      <li class="page-item" :class="{ active: currentPage === 1 }">
        <NuxtLink
          class="page-link"
          :to="{ name: routeName, query: firstPageLink }"
          >1</NuxtLink
        >
      </li>
      <template v-for="i in pages">
        <li
          v-if="i !== 1 && i !== pages"
          :key="i"
          class="page-item"
          :class="{ active: currentPage === i }"
        >
          <NuxtLink
            class="page-link"
            :to="{ name: routeName, query: nthPageLink(i) }"
            >{{ i }}</NuxtLink
          >
        </li>
      </template>
      <li
        class="page-item"
        :class="{ active: currentPage === pages }"
      >
        <NuxtLink
          class="page-link"
          :to="{ name: routeName, query: lastPageLink }"
          >{{ pages }}</NuxtLink
        >
      </li>
      <li v-if="currentPage != pages" class="page-item">
        <NuxtLink
          class="page-link"
          :to="{ name: routeName, query: nextLink }"
          @click="$emit('changepage', 'toto')"
          >Next</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps({
  pages: {
    type: Number,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  routeName: {
    type: String,
    required: true,
  }
})

defineEmits(['changepage'])

const route = useRoute()

const currentPage = computed(() => {
  const query = route.query[props.query] || route.query.page;
  return parseInt(query) || 1;
})

const previousLink = computed(() => {
  const previous = {}
  previous[props.query] = currentPage.value - 1
  return previous
})

const nextLink = computed(() => {
  const next = {};
  next[props.query] = currentPage.value + 1;
  return next;
})

const firstPageLink = computed(() => {
  const first = {};
  first[props.query] = 1;
  return first;
})

const lastPageLink = computed(() => {
  const last = {};
  last[props.query] = props.pages;
  return last;
})

function nthPageLink(i: number) {
  const nth = {};
  nth[props.query] = i;
  return nth;
}
</script>
