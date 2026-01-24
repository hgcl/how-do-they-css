<template>
  <li v-for="(entry, index) in list" :key="entry.id">
    <button class="card__wrapper" @click="() => openModal(entry)" :style="cssVariables(entry)">
      <p class="card__label">
        <span class="card__label--index">{{ index }} /</span> {{ entry.source }}
      </p>
      <component
        :is="entry.type ? entry.type : 'div'"
        :class="`card__example neutral-font ${itemStyle}`"
        :style="[...entry.css]"
        tabindex="-1"
      >
        {{ entry.comment }}
      </component>
    </button>
  </li>

  <CopyModal ref="copyModalRef" :entry="currentEntry" />
</template>

<script lang="ts" setup>
import type { Item } from '~/types/types'
import type CopyModal from './CopyModal.vue'

const { list, itemStyle } = defineProps<{
  list: Item[]
  itemStyle?: 'square' | ''
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
 * CSS VARIABLES
 * add variables based on data
 * returns `{ "--x-color": "red", "--x-color-hover": "blue" }`
 */

const cssVariables = (entry: Item): Record<string, string> => {
  if (!entry.interactiveCss) return {}

  let variables: Record<string, string> = {}

  for (const [key, value] of Object.entries(entry.interactiveCss.default ?? {})) {
    variables[`--x-${key}`] = String(value ?? '')
  }
  if (entry.interactiveCss.hover) {
    for (const [key, value] of Object.entries(entry.interactiveCss.hover)) {
      variables[`--x-${key}-hover`] = String(value ?? '')
    }
  }
  return variables
}
</script>

<style scoped>
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
  font-weight: var(--bold);
}

.card__example {
  margin: var(--spacing-xl) auto;
  background-color: var(--x-background-color);
  color: var(--x-color);
}

/* Examples should be a square */
.card__example.square {
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
  transform: translateY(-4px);
  box-shadow: var(--box-shadow);
}

.card__wrapper:focus .card__label,
.card__wrapper:hover .card__label {
  color: var(--color-fg-black);
}

.card__wrapper:focus .card__example,
.card__wrapper:hover .card__example {
  background-color: var(--x-background-color-hover);
  color: var(--x-color-hover);
}
</style>
