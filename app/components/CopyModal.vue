<template>
  <dialog ref="dialog">
    <header class="copy-modal__header">
      <button @click="close">Close</button>
    </header>
    <pre><code>{{ entry ? formatCss(entry) : "" }}</code></pre>
  </dialog>
</template>

<script lang="ts" setup>
import type { Item } from '~/types/types'

const { entry } = defineProps<{ entry: Item | null }>()

// TODO: refactor formatCss
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
 * MODAL FUNCTIONS
 */
const dialog = ref<HTMLDialogElement | null>(null)

const close = () => dialog.value?.close()

defineExpose({
  open: () => dialog.value?.showModal()
})
</script>

<style scoped>
* {
  background-color: var(--color-bg-default);
}
</style>
