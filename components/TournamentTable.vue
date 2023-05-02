<template>
  <div>
    <table class="table table-light">
      <thead>
        <tr>
          <th scope="col">Intitulé</th>
          <th scope="col">Niveau</th>
          <th scope="col">BestOf</th>
          <th scope="col">Format</th>
          <th scope="col">Participants</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in params.items" :key="item.id">
          <td>
            <NuxtLink
              :to="{ name: 'tournois-id', params: { id: item.id } }"
              class="link--table"
            >
              {{ item.libelle }}
            </NuxtLink>
          </td>
          <td>{{ item.skill_level }}</td>
          <td>{{ item.best_of }}</td>
          <td>{{ item.format }}</td>
          <td>{{ item.max_teams }}</td>
          <td>{{ item.begin_at }}</td>
        </tr>
      </tbody>
    </table>
    <AppPagination
      v-if="this.params.pagination.pages > 1"
      :pages="this.params.pagination.pages"
      :query="this.params.query"
      routeName="profile-tournois"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({ params: { type: Object, required: true }})
</script>

<style></style>
