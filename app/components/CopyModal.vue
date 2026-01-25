<template>
  <dialog ref="dialog">
    <header>
      <div>
        <h2>{{ entry?.source }}</h2>
        <p>{{ entry?.comment }}</p>
      </div>
      <CloseButton @click="close" />
    </header>
    <h3 v-if="entry?.html">HTML</h3>
    <div v-if="entry?.html" class="copy-modal__code-wrapper">
      <CopyButton v-if="entry?.html" @copy="copyCode(entry.html)" />
      <div v-html="highlightedHtml"></div>
    </div>
    <h3>CSS</h3>
    <div class="copy-modal__code-wrapper">
      <CopyButton @copy="copyCode(formattedCss)" />
      <div v-html="highlightedCss"></div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import type { Item } from '~/types/types'
import { highlight } from '~/utils/highlightCode'

const { entry, formattedCss } = defineProps<{ entry: Item | null; formattedCss: string }>()

/**
 * HIGHLIGHT CODE
 */

const highlightedCss = ref('')
const highlightedHtml = ref('')
watch(
  () => entry,
  async (val) => {
    if (!val) {
      highlightedCss.value = ''
      highlightedHtml.value = ''
      return
    }

    highlightedCss.value = await highlight(formattedCss, 'css')
    highlightedHtml.value = await highlight(val.html, 'html')
  },
  { immediate: true }
)

/**
 * COPY CODE TO CLIPBOARD
 */

const { copyCode } = useCopyCode()

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
  margin-bottom: var(--spacing-l);
}

.copy-modal__code-wrapper {
  position: relative; /* for copy button to be correctly positioned */
  margin-block: var(--spacing-s) var(--spacing-l);
}

/* Code highlighting */
:deep(.shiki) {
  padding: var(--spacing-2xl) var(--spacing-m) var(--spacing-l);
  overflow-x: auto;
}
</style>
