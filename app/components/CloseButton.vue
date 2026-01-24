<template>
  <button>
    <span class="visually-hidden">Close</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  </button>
</template>

<style scoped>
button {
  /* Reset <button> styles */
  background-color: transparent;
  /* Custom styles */
  cursor: pointer;
  color: var(--color-fg-default);
  padding: 0.25em;
  transition: border 0.2s;
  border: 1px solid var(--color-fg-mute);
  border-radius: var(--border-radius);
}
svg {
  width: 1rem;
}

/* INTERACTIONS */

button:hover,
button:focus {
  border-color: var(--color-fg-default);
}
</style>
