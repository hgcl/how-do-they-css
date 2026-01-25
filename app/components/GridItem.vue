<template>
  <li>
    <div tabindex="0" role="button" class="card__wrapper" @click="() => openModal(entry)">
      <p class="card__label">
        <span class="card__label--index">{{ index }} /</span> {{ entry.source }}
      </p>
      <!-- If HTML -->
      <div
        v-if="entry.html"
        class="card__example"
        :data-scope="index"
        v-html="entry.html"
        tabindex="-1"
      ></div>
      <!-- If no HTML (square) -->
      <div v-if="!entry.html" :data-scope="index" tabindex="-1">
        <div :class="`card__example square`">{{ entry.comment }}</div>
      </div>
    </div>
  </li>

  <CopyModal ref="copyModalRef" :entry="currentEntry" :formatted-css="formattedCss" />
</template>

<script lang="ts" setup>
import type { Item } from '~/types/types'
import type CopyModal from './CopyModal.vue'

const { entry, index } = defineProps<{
  entry: Item
  index: number
}>()

/**
 * MODAL
 */
const currentEntry = ref<Item | null>(null)
const copyModalRef = ref<InstanceType<typeof CopyModal> | null>(null)

const openModal = (entry: Item) => {
  // Open modal with current entry data
  currentEntry.value = entry
  copyModalRef.value?.open()
}

/**
 * INJECT EXAMPLE CSS
 */

const styleEl = ref<HTMLStyleElement | null>(null)
const formattedCss = ref<string>('')

const generateCss = (entry: Item, index: number): { injectedCss: string; formattedCss: string } => {
  const scope = `[data-scope="${index}"]`
  const tabs = '  '
  let formattedCss = ''
  let injectedCss = ''

  if (!entry.css) return { injectedCss, formattedCss }

  for (const rule of entry.css) {
    const { rest, hover, hoverParent } = rule.code
    const parentSelector = rule.parent ? rule.parent.selector : ''

    // If direct parent > child, add ">"
    // If not direct parent, add single space
    // If no parent, add no space
    const connection =
      rule.parent && rule.parent.direct ? ' > ' : rule.parent && !rule.parent.direct ? ' ' : ''

    const restCss = rest?.length
      ? `${parentSelector}${connection}${rule.selector} ` +
        wrapCss(rest.map((line) => `${tabs}${line};`).join('\n'))
      : ''

    const hoverCss = hover
      ? `${parentSelector}${connection}${rule.selector}:hover ` +
        wrapCss(
          Object.entries(hover)
            .map(([k, v]) => `${tabs}${k}: ${v};`)
            .join('')
        )
      : ''

    const hoverParentCss = hoverParent
      ? `${parentSelector}:hover${connection}${rule.selector} ` +
        wrapCss(
          Object.entries(hoverParent)
            .map(([k, v]) => `${tabs}${k}: ${v};`)
            .join('')
        )
      : ''

    injectedCss += `${scope} ${restCss} ${hoverCss && scope} ${hoverCss && hoverCss} ${hoverParentCss && scope} ${hoverParentCss && hoverParentCss}`
    formattedCss += `${restCss}${hoverCss && hoverCss}${hoverParentCss && hoverParentCss}\n`
  }

  return { injectedCss, formattedCss }
}

const wrapCss = (cssCode: string) => `{\n${cssCode}\n}\n`

onMounted(() => {
  const style = document.createElement('style')
  formattedCss.value = generateCss(entry, index).formattedCss
  style.textContent = generateCss(entry, index).injectedCss
  document.head.appendChild(style)
  styleEl.value = style
})

onBeforeUnmount(() => {
  styleEl.value?.remove()
})
</script>

<style scoped>
/* GENERAL CARD STYLES */

li {
  /* Reset <li> styles */
  list-style: none;
  /* Custom styles */
  width: 100%;
}
.card__wrapper {
  /* Custom styles */
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-m);
  /* Setup to draw grid borders */
  position: relative;
  background-color: var(--color-bg-white);
  border: var(--grid-border);
}

.card__wrapper::after {
  pointer-events: none; /* important, so that :hover works in .card__example */
  /* Setup to draw grid borders */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card__label {
  color: var(--color-fg-mute);
  font-size: var(--fontsize-s);
  text-align: left;
}
.card__label--index {
  color: var(--color-fg-black);
  font-weight: var(--semibold);
}

/* CARD EXAMPLE */

.card__example {
  width: 100%;
  margin-block: var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--fontfamily-neutral);
}

.card__example.square {
  margin: var(--spacing-xl) auto;
  aspect-ratio: 1/1;
  min-width: 96px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-fg-mute);
  font-size: var(--fontsize-s);
}

/* INTERACTIONS */

li:focus-within .card__wrapper::after,
li:hover .card__wrapper::after {
  border-top: var(--grid-border);
}

.card__wrapper:focus,
.card__wrapper:hover {
  transition: 0.2s;
  transition-property: transform, box-shadow;
  transform: translateY(-3px);
  box-shadow: var(--box-shadow);
}

.card__wrapper:focus .card__label,
.card__wrapper:hover .card__label {
  color: var(--color-fg-black);
}
</style>
