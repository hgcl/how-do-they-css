<template>
  <button :class="isCopied ? 'copied' : ''">
    <span>{{ label }}</span>
    <svg
      v-if="!isCopied"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  </button>
</template>

<script lang="ts" setup>
const { isCopied } = defineProps<{ isCopied: boolean }>()

const label = computed(() => (isCopied ? 'Copied to clipboard!' : 'Copy'))
</script>

<style scoped>
button {
  position: absolute;
  top: var(--spacing-s);
  right: var(--spacing-s);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.25em 0.5em;
  color: var(--color-fg-default);
  background-color: transparent;
  padding: 0.5em;
  border: 1px solid var(--color-fg-mute);
  border-radius: var(--border-radius);
}
svg {
  width: 1rem;
}

/* IF COPIED */

button.copied,
button.copied:hover,
button.copied:focus {
  border-color: #85e89d;
  color: #85e89d;
}

/* INTERACTIONS */

button:hover,
button:focus {
  border-color: var(--color-fg-default);
}
</style>
