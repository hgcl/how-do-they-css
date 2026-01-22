<template>
  <header>
    <div>
      <p class="app__title headline">{{ SITE_NAME }}</p>
      <p>{{ DEFAULT_DESCRIPTION }}</p>
    </div>
    <nav>
      <ul class="app__nav-list">
        <li v-for="page in allRoutes" :key="page.path">
          <NuxtLink :to="page.path" class="app__nav-item"> {{ page.meta.title }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { SITE_NAME, DEFAULT_DESCRIPTION } from '~/constants/seo'

const router = useRouter()
const allRoutes = router.getRoutes()
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  margin: var(--spacing-m) var(--spacing-m) var(--spacing-xl) var(--spacing-m);
  max-width: 608px;
  /* Transition between mobile and desktop */
  transition: margin 0.2s;
}

.app__title {
  font-size: var(--fontsize-xl);
  font-weight: var(--semibold);
}

.app__nav-list {
  /* Reset <ul> styles */
  padding: 0;
  list-style: none;
  /* Custom styles */
  display: flex;
  gap: var(--text-spacing-m);
  margin-top: var(--spacing-l);
}
.app__nav-item {
  /* Reset <a> styles */
  color: var(--color-fg-default);
}
/* Nuxt class: current page */
.router-link-active {
  font-weight: var(--semibold);
  text-decoration-thickness: 2px;
}

@media (width > 480px) {
  header {
    margin: var(--spacing-l);
  }
}
</style>
