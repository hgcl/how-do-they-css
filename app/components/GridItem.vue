<template>
  <li v-for="(entry, index) in list" :key="entry.id">
    <button
      class="card__wrapper"
      :style="
        entry.cssHover
          ? {
              '--example-bg': entry.cssHover.defaultBackgroundColor,
              '--example-hover-bg': entry.cssHover.hoverBackgroundColor
            }
          : {}
      "
    >
      <div class="card__label label">
        <p>{{ index }}</p>
        <p>{{ entry.source }}</p>
      </div>
      <component
        :is="htmlEl ? htmlEl : 'div'"
        :class="`card__example ${itemStyle}`"
        :style="[...entry.css]"
        tabindex="-1"
      >
        {{ entry.comment }}
      </component>
    </button>
  </li>
</template>

<script lang="ts" setup>
import type { ShadowsCollectionItem, ButtonsCollectionItem } from '@nuxt/content'

const { list, itemStyle, htmlEl } = defineProps<{
  list: ShadowsCollectionItem[] | ButtonsCollectionItem[]
  itemStyle?: 'square' | ''
  htmlEl?: keyof HTMLElementTagNameMap
}>()
</script>

<style scoped>
li {
  /* Reset <li> styles */
  list-style: none;
  /* Custom styles */
  flex: 1 0 25%;
  min-width: 144px;
  /* Setup to draw grid borders */
  background: var(--color-border);
}
.card__wrapper {
  /* Reset <button> styles */
  border: none;
  background-color: transparent;
  /* Custom styles */
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-m) var(--spacing-m) var(--spacing-xl) var(--spacing-m);
  /* Setup to draw grid borders */
  position: relative;
  background-color: var(--color-bg);
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
  font-weight: 600;
}
.card__example {
  margin: var(--spacing-l) auto 0;
  background-color: var(--example-bg);
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
}

/* INTERACTIONS */

li:focus-within .card__wrapper::after,
li:hover .card__wrapper::after {
  border-top: var(--grid-border);
}

.card__wrapper:focus,
.card__wrapper:hover {
  transition: transform 0.2s;
  transform: translateY(-4px);
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.card__wrapper:focus .card__label,
.card__wrapper:hover .card__label {
  color: var(--color-fg);
}

.card__wrapper:focus .card__example,
.card__wrapper:hover .card__example {
  background-color: var(--example-hover-bg);
}
</style>
