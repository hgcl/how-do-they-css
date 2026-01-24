<template>
  <GridList v-if="shadows">
    <GridItem :list="shadows" :item-style="'square'" />
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
