<template>
  <GridList v-if="shadows">
    <GridItem v-for="(entry, index) in shadows" :key="entry.id" :entry="entry" :index="index" />
  </GridList>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Box shadows'
})

// Get all shadows entries
const { data: shadows } = await useAsyncData('shadows', () => {
  return queryCollection('shadows').order('source', 'ASC').all()
})
</script>
