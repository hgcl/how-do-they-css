<template>
  <GridList>
    <template v-if="pending">
      <LoadingSpinner />
    </template>
    <template v-else-if="error">
      <p>Error loading content</p>
    </template>
    <template v-else>
      <GridItem v-for="(entry, index) in loading" :key="entry.id" :entry="entry" :index="index" />
    </template>
  </GridList>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Loading'
})

// Get all loading entries
const {
  data: loading,
  pending,
  error
} = await useAsyncData(
  'loading',
  () => {
    return queryCollection('loading').order('source', 'ASC').all()
  },
  {
    default: () => []
  }
)
</script>
