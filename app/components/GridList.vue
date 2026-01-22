<template>
  <ul>
    <slot />
  </ul>
</template>

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
