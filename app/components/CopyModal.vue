<template>
  <dialog ref="dialog">
    <header class="copy-modal__header">
      <button @click="close">Close</button>
    </header>
    <pre><code>{{ formattedCss(entry?.css) }}</code></pre>
  </dialog>
</template>

<script lang="ts" setup>
import type { Item } from '~/types/types'

const { entry } = defineProps<{ entry: Item | null }>()

const formattedCss = (cssLines?: string[]) =>
  cssLines &&
  cssLines
    .map(
      (line) => (line.endsWith(';') ? line : `${line};`) // add semicolon if missing
    )
    .join('\n')

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
