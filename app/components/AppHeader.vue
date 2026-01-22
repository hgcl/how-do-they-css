<template>
  <header>
    {{ SITE_NAME }}
    <nav>
      <ul>
        <li v-for="page in allRoutes" :key="page.path">
          <NuxtLink :to="page.path"> {{ page.meta.title }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { SITE_NAME } from '~/constants/seo'

const router = useRouter()
const allRoutes = router.getRoutes()
</script>

<style scoped>
header {
  padding: var(--spacing-m);
  text-align: center;
}

ul {
  /* Reset <ul> styles */
  padding: 0;
  list-style: none;
}

@media (width > 480px) {
  header {
    padding: var(--spacing-l);
  }
}
</style>
