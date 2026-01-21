<template>
  <li v-for="(entry, index) in list" :key="entry.id">
    <button
      class="card__wrapper"
      :style="
        entry.cssHover
          ? {
              '--bg': entry.cssHover.defaultBackgroundColor,
              '--hover-bg': entry.cssHover.hoverBackgroundColor
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
  width: 100%;
}
.card__wrapper {
  /* Reset <button> styles */
  border: none;
  background-color: transparent;
  /* Custom styles */
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-m) var(--spacing-m) var(--spacing-xl) var(--spacing-m);
  border: solid transparent;
  border-width: 2px 2px 4px 2px;
}
.card__label {
  color: var(--color-fg-mute);
}
.card__example {
  margin: var(--spacing-l) auto 0;
  background-color: var(--bg);
}

/* Examples should be a square */
.card__example.square {
  aspect-ratio: 1/1;
  min-width: 96px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* INTERACTIONS */

.card__wrapper:focus,
.card__wrapper:hover {
  border-color: var(--color-fg);
  transition: transform 0.2s;
  transform: translateY(-2px);
}

.card__wrapper:focus-within .card__label,
.card__wrapper:hover .card__label {
  color: var(--color-fg);
}

.card__wrapper:focus-within .card__example,
.card__wrapper:hover .card__example {
  background-color: var(--hover-bg);
}
</style>
