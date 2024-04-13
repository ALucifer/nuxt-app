<template>
    <div v-for="tournament in tournaments" class="item" :key="tournament.id">
        <div class="item__header">
            <span>{{ tournament.skillLevel }}</span>
            <span>{{ $dayjs(tournament.beginAt).format('DD MMM YYYY') }}</span>
        </div>
        <p class="item__description">{{ tournament.libelle }}</p>
        <p class="item__motivation">{{ tournament.speech }}</p>
        <div class="item__action">
            <nuxt-link :to="{ name: 'tournois-id', params: { id: tournament.id } }">Voir</nuxt-link>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ owner: boolean, user: boolean, page: number }>()

onMounted(async () => {
    const { data: tournaments } = await useFetch(
        '/api/tournaments/all',
        {
            query: {
                owner: selected.value === 1 ? getUser().id : null,
                user: selected.value === 2 ? getUser().id : null,
                pagination: 6,
                page
            }
        }
    )
})
</script>