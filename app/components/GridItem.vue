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
      <p class="card__label">
        <span class="card__label--index">{{ index }} /</span> {{ entry.source }}
      </p>
      <component
        :is="htmlEl ? htmlEl : 'div'"
        :class="`card__example neutral-font ${itemStyle}`"
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
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.card__wrapper:focus .card__label,
.card__wrapper:hover .card__label {
  color: var(--color-fg-black);
}

.card__wrapper:focus .card__example,
.card__wrapper:hover .card__example {
  background-color: var(--example-hover-bg);
}
</style>
