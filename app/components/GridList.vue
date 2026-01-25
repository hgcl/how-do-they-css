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
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%/1, max(208px, 100%/5)), 1fr)
  ); /* 1-5 cols, with min-width of 144px per column */
  /* Setup to draw grid borders */
  background: var(--color-bg-default);
}
</style>
