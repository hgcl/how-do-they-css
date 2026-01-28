<template>
  <GridList v-if="loading">
    <GridItem v-for="(entry, index) in loading" :key="entry.id" :entry="entry" :index="index" />
  </GridList>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Loading'
})

// Get all loading entries
const { data: loading } = await useAsyncData('loading', () => {
  return queryCollection('loading').order('source', 'ASC').all()
})
</script>
