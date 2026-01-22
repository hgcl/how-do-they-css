<template>
  <AppHeader />
  <main>
    <h1>{{ route.meta.title }}</h1>
    <NuxtPage />
  </main>
</template>

<script lang="ts" setup>
import { SITE_NAME, DEFAULT_DESCRIPTION } from './constants/seo'

const route = useRoute()

useSeoMeta({
  title: () => (route.meta.title ? `${route.meta.title} | ${SITE_NAME}` : SITE_NAME),
  ogSiteName: SITE_NAME,
  ogTitle: () => (route.meta.title ? `${route.meta.title} | ${SITE_NAME}` : SITE_NAME),
  description: DEFAULT_DESCRIPTION,
  ogType: 'website'
})
</script>

<style scoped>
main {
  margin: 0 var(--spacing-m) var(--spacing-m);
}
h1 {
  font-size: var(--fontsize-xl);
  /* Transition between mobile and desktop */
  transition: text-align 0.2s;
}

@media (width > 480px) {
  main {
    margin: 0 var(--spacing-l) var(--spacing-l);
  }
  h1 {
    text-align: right;
  }
}
</style>
