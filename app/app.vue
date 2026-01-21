<template>
  <AppHeader />
  <main>
    <NuxtPage />
  </main>
</template>

<style scoped>
main {
  padding: var(--spacing-m);
}

@media (width > 480px) {
  main {
    padding: var(--spacing-l);
  }
}
</style>
