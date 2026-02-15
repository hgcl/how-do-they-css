<template>
  <GridList>
    <template v-if="pending">
      <LoadingSpinner />
    </template>
    <template v-else-if="error">
      <p>Error loading content</p>
    </template>
    <template v-else>
      <GridItem v-for="(entry, index) in buttons" :key="entry.id" :entry="entry" :index="index" />
    </template>
  </GridList>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Buttons & links'
})

// Get all buttons entries
const {
  data: buttons,
  pending,
  error
} = await useAsyncData(
  'buttons',
  () => {
    return queryCollection('buttons').order('source', 'ASC').all()
  },
  {
    default: () => []
  }
)
</script>
