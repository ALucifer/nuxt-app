<template>
  <nav class="m-auto">
    <ul class="pagination">
      <li class="page-item" v-if="this.currentPage !== 1">
        <NuxtLink
          class="page-link"
          :to="{
            name: this.routeName,
            query: this.previousLink,
          }"
          >Previous</NuxtLink
        >
      </li>
      <li class="page-item" :class="{ active: this.currentPage === 1 }">
        <NuxtLink
          class="page-link"
          :to="{ name: this.routeName, query: this.firstPageLink }"
          >1</NuxtLink
        >
      </li>
      <template v-for="i in this.pages">
        <li
          class="page-item"
          v-if="i !== 1 && i !== this.pages"
          :class="{ active: this.currentPage === i }"
        >
          <NuxtLink
            class="page-link"
            :to="{ name: this.routeName, query: this.nthPageLink(i) }"
            >{{ i }}</NuxtLink
          >
        </li>
      </template>
      <li
        class="page-item"
        :class="{ active: this.currentPage === this.pages }"
      >
        <NuxtLink
          class="page-link"
          :to="{ name: this.routeName, query: this.lastPageLink }"
          >{{ this.pages }}</NuxtLink
        >
      </li>
      <li class="page-item" v-if="this.currentPage != this.pages">
        <NuxtLink
          class="page-link"
          :to="{ name: this.routeName, query: this.nextLink }"
          @click="this.$emit('changepage', 'toto')"
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

// export default {
  // props: {
  //   pages: {
  //     type: Number,
  //     required: true,
  //   },
  //   query: {
  //     type: String,
  //     required: false,
  //   },
  //   routeName: {
  //     type: String,
  //     required: true,
  //   },
  // },
  // computed: {
  //   currentPage: function () {
  //     const query = this.$route.query[this.query] || this.$route.query.page;
  //     return parseInt(query) || 1;
  //   },
  //   previousLink: function () {
  //     const pevious = {};
  //     pevious[this.query] = this.currentPage - 1;
  //     return pevious;
  //   },
  //   nextLink: function () {
  //     const next = {};
  //     next[this.query] = parseInt(this.currentPage) + 1;
  //     return next;
  //   },
  //   firstPageLink: function () {
  //     const first = {};
  //     first[this.query] = 1;
  //     return first;
  //   },
  //   lastPageLink: function () {
  //     const last = {};
  //     last[this.query] = this.pages;
  //     return last;
  //   },
  // },
  // methods: {
  //   nthPageLink: function (i) {
  //     const nth = {};
  //     nth[this.query] = i;
  //     return nth;
  //   },
  // },
// };
</script>
