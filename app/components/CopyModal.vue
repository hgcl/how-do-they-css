<template>
  <dialog ref="dialog">
    <header>
      <div>
        <h2>{{ entry?.source }}</h2>
        <p>{{ entry?.comment }}</p>
      </div>
      <CloseButton @click="close" />
    </header>
    <div class="copy-modal__code-wrapper">
      <CopyButton @click="copyCode" :isCopied="copied" />
      <div v-html="highlightedCss" />
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import type { Item } from '~/types/types'
import { highlight } from '~/utils/highlightCode'

const { entry } = defineProps<{ entry: Item | null }>()

/**
 * HIGHLIGHT CODE
 */

const formattedCss = ref('')
const highlightedCss = ref('')
watch(
  () => entry,
  async (val) => {
    if (!val) {
      highlightedCss.value = ''
      return
    }

    formattedCss.value = formatCss(val)
    highlightedCss.value = await highlight(formattedCss.value, 'css')
  },
  { immediate: true }
)

/**
 * FORMAT CSS CODE
 * TODO: refactor formatCss
 */

const formatCss = (entry: Item) => {
  if (!entry.type)
    return entry.css.map((line) => (line.endsWith(';') ? line : `${line};`)).join('\n')

  const defaultCssAttr = entry.css
    .map((line) => (line.endsWith(';') ? line : `  ${line};`))
    .concat(
      Object.entries(entry.interactiveCss?.default ?? {}).map(([prop, val]) => `  ${prop}: ${val};`)
    )
    .join('\n')

  const fullDefaultCss = `${entry.type} {\n${defaultCssAttr}\n}`

  const hoverCssAttr = Object.entries(entry.interactiveCss?.hover ?? {})
    .map(([prop, val]) => `  ${prop}: ${val};`)
    .join('\n')

  const fullHoverCss = `${entry.type}:hover, ${entry.type}:focus {\n${hoverCssAttr}\n}`

  return `${fullDefaultCss}\n\n${fullHoverCss}`
}

/**
 * COPY CODE TO CLIPBOARD
 */

const copied = ref(false)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(formattedCss.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 3000)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

/**
 * MODAL FUNCTIONS
 */
const dialog = ref<HTMLDialogElement | null>(null)

const close = () => dialog.value?.close()

defineExpose({
  open: () => dialog.value?.showModal()
})
</script>

<style scoped>
dialog {
  /* Reset <dialog> styles */
  border: none;
  /* Custom styles */
  max-width: 640px;
  width: 100%;
  padding: var(--spacing-m);
  background-color: var(--color-bg-dark);
  box-shadow: var(--box-shadow);
  color: var(--color-fg-default);
}
header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: var(--spacing-m);
}

.copy-modal__code-wrapper {
  position: relative; /* for copy button to be correctly positioned */
}

/* Code highlighting */
:deep(.shiki) {
  padding: var(--spacing-2xl) var(--spacing-m) var(--spacing-l);
  overflow-x: auto;
}
</style>
