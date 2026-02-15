<template>
  <GridList>
    <GridItem v-for="(entry, index) in buttons" :key="entry.id" :entry="entry" :index="index" />
  </GridList>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Buttons & links'
})

// Get all buttons entries
const { data: buttons } = await useAsyncData(
  'buttons',
  () => {
    return queryCollection('buttons').order('source', 'ASC').all()
  },
  {
    default: () => []
  }
)
</script>
