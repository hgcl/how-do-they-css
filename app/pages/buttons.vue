<template>
  <GridList v-if="buttons">
    <GridItem :list="buttons" html-el="button" />
  </GridList>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Buttons'
})

// Get all buttons entries
const { data: buttons } = await useAsyncData('buttons', () => {
  return queryCollection('buttons').order('source', 'DESC').all()
})
</script>
