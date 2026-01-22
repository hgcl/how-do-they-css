<template>
  <ul v-if="shadows">
    <GridItem :list="shadows" :item-style="'square'" />
  </ul>
  <!-- <ul v-if="buttons">
    <GridItem :list="buttons" html-el="button" />
  </ul> -->
</template>

<script lang="ts" setup>
// Get all shadows entries
const { data: shadows } = await useAsyncData('shadows', () => {
  return queryCollection('shadows').order('source', 'DESC').all()
})

// Get all buttons entries
const { data: buttons } = await useAsyncData('buttons', () => {
  return queryCollection('buttons').order('source', 'DESC').all()
})
</script>

<style scoped>
ul {
  /* Reset <ul> styles */
  padding: 0;
  margin: 0;
  /* Custom styles */
  display: flex;
  flex-wrap: wrap;
  /* Setup to draw grid borders */
  border: var(--grid-border);
}
</style>
