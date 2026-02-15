<template>
  <GridList>
    <template v-if="pending">
      <LoadingSpinner />
    </template>
    <template v-else-if="error">
      <p>Error loading content</p>
    </template>
    <template v-else>
      <GridItem v-for="(entry, index) in shadows" :key="entry.id" :entry="entry" :index="index" />
    </template>
  </GridList>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Box shadows'
})

// Get all shadows entries
const {
  data: shadows,
  pending,
  error
} = await useAsyncData(
  'shadows',
  () => {
    return queryCollection('shadows').order('source', 'ASC').all()
  },
  {
    default: () => []
  }
)
</script>
